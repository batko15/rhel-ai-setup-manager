import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { toolCategories, aiTools, getToolsByCategory, getPopularTools, searchTools, getToolBySlug } from '@/lib/tools-data';

// GET /api/tools - List all tools or search
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  try {
    switch (action) {
      case 'categories':
        return NextResponse.json({ categories: toolCategories });

      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
        }
        return NextResponse.json({ results: searchTools(query) });

      case 'category':
        if (!category) {
          return NextResponse.json({ error: 'Category parameter required' }, { status: 400 });
        }
        return NextResponse.json({ tools: getToolsByCategory(category) });

      case 'popular':
        return NextResponse.json({ tools: getPopularTools() });

      case 'tool':
        if (!slug) {
          return NextResponse.json({ error: 'Slug parameter required' }, { status: 400 });
        }
        const tool = getToolBySlug(slug);
        if (!tool) {
          return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
        }
        return NextResponse.json({ tool });

      case 'generate-script':
        return await generateInstallScript(searchParams);

      case 'generate-docker-compose':
        return await generateDockerCompose(searchParams);

      default:
        return NextResponse.json({ 
          tools: aiTools,
          categories: toolCategories,
          total: aiTools.length 
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/tools - Install/uninstall tools
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, toolIds, options } = body;

    switch (action) {
      case 'install':
        return await handleInstall(toolIds, options);
      
      case 'uninstall':
        return await handleUninstall(toolIds);
      
      case 'configure':
        return await handleConfigure(toolIds, options);
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateInstallScript(searchParams: URLSearchParams) {
  const tools = searchParams.getAll('tools');
  if (tools.length === 0) {
    return NextResponse.json({ error: 'No tools specified' }, { status: 400 });
  }

  let script = `#!/bin/bash
# BigLinux AI Full-Stack Installation Script
# Generated automatically by BigLinux AI Setup Manager
# Date: ${new Date().toISOString()}

set -e

echo "=========================================="
echo "BigLinux AI Full-Stack Setup"
echo "=========================================="

# Update system
sudo pacman -Syu --noconfirm

# Install base dependencies
sudo pacman -S --noconfirm --needed git curl wget python python-pip base-devel \\
    gcc make cmake podman docker-compose

`;

  for (const slug of tools) {
    const t = getToolBySlug(slug);
    if (t && t.installCommand) {
      script += `
# Install ${t.name}
echo "Installing ${t.name}..."
${t.installCommand}
echo "${t.name} installed successfully!"

`;
    }
  }

  script += `
echo "=========================================="
echo "Installation complete!"
echo "=========================================="
`;

  return NextResponse.json({ script });
}

async function generateDockerCompose(searchParams: URLSearchParams) {
  const tools = searchParams.getAll('tools');
  if (tools.length === 0) {
    return NextResponse.json({ error: 'No tools specified' }, { status: 400 });
  }

  const services: Record<string, Record<string, unknown>> = {};

  for (const slug of tools) {
    const t = getToolBySlug(slug);
    if (t && t.dockerImage) {
      const serviceConfig: Record<string, unknown> = {
        image: t.dockerImage,
        restart: 'unless-stopped'
      };

      // Add standard ports based on tool
      if (slug === 'ollama') {
        serviceConfig.ports = ['11434:11434'];
        serviceConfig.volumes = ['ollama_data:/root/.ollama'];
        serviceConfig.deploy = { resources: { reservations: { devices: [{ driver: 'nvidia', count: 'all', capabilities: ['gpu'] }] } } };
      } else if (slug === 'openwebui') {
        serviceConfig.ports = ['3000:8080'];
        serviceConfig.volumes = ['openwebui_data:/app/backend/data'];
        serviceConfig.environment = ['OLLAMA_BASE_URL=http://ollama:11434'];
      } else if (slug === 'vllm') {
        serviceConfig.ports = ['8000:8000'];
        serviceConfig.deploy = { resources: { reservations: { devices: [{ driver: 'nvidia', count: 'all', capabilities: ['gpu'] }] } } };
      } else if (slug === 'milvus') {
        serviceConfig.ports = ['19530:19530', '9091:9091'];
        serviceConfig.volumes = ['milvus_data:/var/lib/milvus'];
      } else if (slug === 'qdrant') {
        serviceConfig.ports = ['6333:6333', '6334:6334'];
        serviceConfig.volumes = ['qdrant_data:/qdrant/storage'];
      } else if (slug === 'prometheus') {
        serviceConfig.ports = ['9090:9090'];
        serviceConfig.volumes = ['prometheus_data:/prometheus', './prometheus.yml:/etc/prometheus/prometheus.yml'];
      } else if (slug === 'grafana') {
        serviceConfig.ports = ['3001:3000'];
        serviceConfig.volumes = ['grafana_data:/var/lib/grafana'];
      } else if (slug === 'vault') {
        serviceConfig.ports = ['8200:8200'];
        serviceConfig.capabilities = ['IPC_LOCK'];
      } else if (slug === 'comfyui') {
        serviceConfig.ports = ['8188:8188'];
        serviceConfig.volumes = ['comfyui_models:/app/models', 'comfyui_output:/app/output'];
        serviceConfig.deploy = { resources: { reservations: { devices: [{ driver: 'nvidia', count: 'all', capabilities: ['gpu'] }] } } };
      }

      services[slug] = serviceConfig;
    }
  }

  const compose = {
    version: '3.8',
    services,
    volumes: Object.keys(services).reduce((acc, name) => {
      acc[`${name}_data`] = {};
      return acc;
    }, {} as Record<string, unknown>)
  };

  const yamlContent = `# BigLinux AI Full-Stack Docker Compose
# Generated by BigLinux AI Setup Manager
# Date: ${new Date().toISOString()}

version: '3.8'

services:
${Object.entries(services).map(([name, config]) => {
  let serviceYaml = `  ${name}:\n    image: ${config.image}\n    restart: ${config.restart}`;
  
  if (config.ports) {
    serviceYaml += `\n    ports:\n${(config.ports as string[]).map((p: string) => `      - "${p}"`).join('\n')}`;
  }
  if (config.volumes) {
    serviceYaml += `\n    volumes:\n${(config.volumes as string[]).map((v: string) => `      - ${v}`).join('\n')}`;
  }
  if (config.environment) {
    serviceYaml += `\n    environment:\n${(config.environment as string[]).map((e: string) => `      - ${e}`).join('\n')}`;
  }
  if (config.deploy) {
    serviceYaml += `\n    deploy:\n      resources:\n        reservations:\n          devices:\n            - driver: nvidia\n              count: all\n              capabilities: [gpu]`;
  }
  return serviceYaml;
}).join('\n\n')}

volumes:
${Object.keys(compose.volumes).map(v => `  ${v}:`).join('\n')}
`;

  return NextResponse.json({ compose: yamlContent, json: compose });
}

async function handleInstall(toolIds: string[], options?: Record<string, unknown>) {
  const results: Array<{ toolId: string; success: boolean; error?: string; message?: string; installCommand?: string; dockerImage?: string }> = [];
  
  for (const toolId of toolIds) {
    const t = getToolBySlug(toolId);
    if (!t) {
      results.push({ toolId, success: false, error: 'Tool not found' });
      continue;
    }

    // Log the installation
    await db.installLog.create({
      data: {
        toolId: toolId,
        toolName: t.name,
        action: 'install',
        status: 'started',
        message: `Starting installation of ${t.name}`
      }
    });

    results.push({ 
      toolId, 
      success: true, 
      message: `${t.name} installation initiated`,
      installCommand: t.installCommand,
      dockerImage: t.dockerImage
    });
  }

  return NextResponse.json({ results });
}

async function handleUninstall(toolIds: string[]) {
  const results: Array<{ toolId: string; success: boolean; error?: string; message?: string; uninstallCommand?: string }> = [];
  
  for (const toolId of toolIds) {
    const t = getToolBySlug(toolId);
    if (!t) {
      results.push({ toolId, success: false, error: 'Tool not found' });
      continue;
    }

    results.push({ 
      toolId, 
      success: true, 
      message: `${t.name} uninstall initiated`,
      uninstallCommand: `pip uninstall ${t.name.toLowerCase()} -y`
    });
  }

  return NextResponse.json({ results });
}

async function handleConfigure(toolIds: string[], options?: Record<string, unknown>) {
  const results: Array<{ toolId: string; success: boolean; error?: string; config?: Record<string, unknown>; message?: string }> = [];
  
  for (const toolId of toolIds) {
    const t = getToolBySlug(toolId);
    if (!t) {
      results.push({ toolId, success: false, error: 'Tool not found' });
      continue;
    }

    // Generate configuration
    const config: Record<string, unknown> = {};
    if (t.configOptions && options) {
      for (const opt of t.configOptions) {
        if (options[opt.key] !== undefined) {
          config[opt.key] = options[opt.key];
        }
      }
    }

    results.push({ 
      toolId, 
      success: true, 
      config,
      message: `Configuration generated for ${t.name}`
    });
  }

  return NextResponse.json({ results });
}
