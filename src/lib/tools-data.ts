// RHEL AI Full-Stack Tools Database
// Complete collection of AI/ML tools for Linux

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  subcategory?: string;
  icon: string;
  tags: string[];
  homepage?: string;
  repository?: string;
  documentation?: string;
  requirements?: {
    os: string[];
    cpu?: string;
    ram?: string;
    gpu?: string;
    disk?: string;
  };
  installCommand?: string;
  dockerImage?: string;
  dockerCompose?: string;
  isPopular?: boolean;
  status: 'available' | 'installed' | 'running' | 'error';
  version?: string;
  configOptions?: ConfigOption[];
}

export interface ConfigOption {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'password';
  default?: string | number | boolean;
  options?: { value: string; label: string }[];
  description?: string;
  required?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'llm-inference',
    name: 'LLM Inference',
    description: 'Large Language Model inference engines and servers',
    icon: 'Brain',
    color: 'bg-purple-500'
  },
  {
    id: 'local-models',
    name: 'Local Models',
    description: 'Pre-trained models for local deployment',
    icon: 'Database',
    color: 'bg-blue-500'
  },
  {
    id: 'ai-desktop',
    name: 'AI Desktop Apps',
    description: 'Desktop applications with AI capabilities',
    icon: 'Monitor',
    color: 'bg-green-500'
  },
  {
    id: 'vector-db',
    name: 'Vector Databases',
    description: 'Vector storage for embeddings and RAG',
    icon: 'Layers',
    color: 'bg-orange-500'
  },
  {
    id: 'ai-frameworks',
    name: 'AI Frameworks',
    description: 'Machine learning and AI frameworks',
    icon: 'Code',
    color: 'bg-red-500'
  },
  {
    id: 'rag-tools',
    name: 'RAG & Agents',
    description: 'Retrieval Augmented Generation and AI agents',
    icon: 'GitBranch',
    color: 'bg-cyan-500'
  },
  {
    id: 'gpu-tools',
    name: 'GPU & Compute',
    description: 'GPU management and optimization tools',
    icon: 'Cpu',
    color: 'bg-yellow-500'
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    description: 'System monitoring and observability',
    icon: 'Activity',
    color: 'bg-pink-500'
  },
  {
    id: 'containerization',
    name: 'Containers',
    description: 'Container and orchestration tools',
    icon: 'Container',
    color: 'bg-teal-500'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security and encryption tools',
    icon: 'Shield',
    color: 'bg-slate-500'
  },
  {
    id: 'multimodal',
    name: 'Multimodal AI',
    description: 'Image, audio, and video AI tools',
    icon: 'Image',
    color: 'bg-indigo-500'
  },
  {
    id: 'development',
    name: 'Development',
    description: 'IDE and development tools with AI',
    icon: 'Terminal',
    color: 'bg-emerald-500'
  }
];

export const aiTools: Tool[] = [
  // LLM Inference
  {
    id: 'ollama',
    name: 'Ollama',
    slug: 'ollama',
    description: 'Get up and running with large language models locally',
    longDescription: 'Ollama is a lightweight, extensible framework for running large language models locally. It supports Llama 3, Mistral, Gemma, and many other models with easy model management.',
    category: 'llm-inference',
    icon: '🦙',
    tags: ['llm', 'inference', 'local', 'models'],
    homepage: 'https://ollama.ai',
    repository: 'https://github.com/ollama/ollama',
    documentation: 'https://github.com/ollama/ollama/blob/main/docs/api.md',
    requirements: {
      os: ['Linux', 'macOS', 'Windows'],
      ram: '8GB',
      disk: '20GB'
    },
    installCommand: 'curl -fsSL https://ollama.ai/install.sh | sh',
    dockerImage: 'ollama/ollama:latest',
    isPopular: true,
    status: 'available',
    version: '0.1.27',
    configOptions: [
      { key: 'host', label: 'Host', type: 'text', default: '0.0.0.0', description: 'Server host' },
      { key: 'port', label: 'Port', type: 'number', default: 11434, description: 'Server port' },
      { key: 'gpu', label: 'Enable GPU', type: 'boolean', default: true, description: 'Use GPU acceleration' },
      { key: 'memory', label: 'Memory Limit', type: 'text', default: '8g', description: 'Memory limit for models' }
    ]
  },
  {
    id: 'vllm',
    name: 'vLLM',
    slug: 'vllm',
    description: 'High-throughput LLM serving with PagedAttention',
    longDescription: 'vLLM is a high-throughput LLM serving engine with PagedAttention, continuous batching, and optimized CUDA kernels. It achieves near-linear scaling on multi-GPU setups.',
    category: 'llm-inference',
    icon: '⚡',
    tags: ['llm', 'inference', 'gpu', 'high-performance'],
    homepage: 'https://vllm.ai',
    repository: 'https://github.com/vllm-project/vllm',
    requirements: {
      os: ['Linux'],
      gpu: 'NVIDIA GPU with CUDA 11.8+',
      ram: '32GB'
    },
    installCommand: 'pip install vllm',
    dockerImage: 'vllm/vllm-openai:latest',
    isPopular: true,
    status: 'available',
    configOptions: [
      { key: 'model', label: 'Model', type: 'text', default: 'meta-llama/Llama-2-7b-hf', description: 'Model name or path' },
      { key: 'tensor_parallel_size', label: 'GPU Count', type: 'number', default: 1, description: 'Number of GPUs' },
      { key: 'max_model_len', label: 'Max Context', type: 'number', default: 4096, description: 'Maximum context length' }
    ]
  },
  {
    id: 'localai',
    name: 'LocalAI',
    slug: 'localai',
    description: 'Self-hosted, drop-in alternative to OpenAI API',
    longDescription: 'LocalAI is a drop-in replacement OpenAI API compatible REST API. It runs locally with no GPU required and supports multiple model formats including GGUF.',
    category: 'llm-inference',
    icon: '🏠',
    tags: ['api', 'openai-compatible', 'cpu', 'gpu'],
    homepage: 'https://localai.io',
    repository: 'https://github.com/go-skynet/LocalAI',
    dockerImage: 'localai/localai:latest',
    isPopular: true,
    status: 'available',
    configOptions: [
      { key: 'models_path', label: 'Models Path', type: 'text', default: '/models', description: 'Path to store models' },
      { key: 'threads', label: 'CPU Threads', type: 'number', default: 4, description: 'Number of CPU threads' }
    ]
  },
  {
    id: 'llamacpp',
    name: 'llama.cpp',
    slug: 'llamacpp',
    description: 'Port of Facebook LLaMA model in C/C++ for efficient inference',
    longDescription: 'llama.cpp provides efficient LLM inference in pure C/C++ with no external dependencies. Supports quantization, GPU offloading, and runs on various hardware.',
    category: 'llm-inference',
    icon: '🎯',
    tags: ['cpp', 'quantization', 'gguf', 'efficient'],
    repository: 'https://github.com/ggerganov/llama.cpp',
    installCommand: 'git clone https://github.com/ggerganov/llama.cpp && cd llama.cpp && make',
    isPopular: true,
    status: 'available',
    configOptions: [
      { key: 'n_ctx', label: 'Context Size', type: 'number', default: 4096 },
      { key: 'n_gpu_layers', label: 'GPU Layers', type: 'number', default: 35, description: 'Layers to offload to GPU' },
      { key: 'n_threads', label: 'Threads', type: 'number', default: 8 }
    ]
  },
  {
    id: 'tgi',
    name: 'Text Generation Inference (TGI)',
    slug: 'tgi',
    description: 'Large Language Model Text Generation Inference by Hugging Face',
    longDescription: 'TGI is a production-ready inference server for LLMs by Hugging Face. Features continuous batching, token streaming, and optimized transformers.',
    category: 'llm-inference',
    icon: '🤗',
    tags: ['huggingface', 'production', 'streaming'],
    homepage: 'https://huggingface.co/docs/text-generation-inference',
    repository: 'https://github.com/huggingface/text-generation-inference',
    dockerImage: 'ghcr.io/huggingface/text-generation-inference:latest',
    isPopular: true,
    status: 'available',
    configOptions: [
      { key: 'model_id', label: 'Model ID', type: 'text', default: 'meta-llama/Llama-2-7b-hf' },
      { key: 'quantize', label: 'Quantization', type: 'select', options: [
        { value: '', label: 'None' },
        { value: 'bitsandbytes', label: 'BitsAndBytes' },
        { value: 'gptq', label: 'GPTQ' }
      ]}
    ]
  },
  {
    id: 'lmstudio',
    name: 'LM Studio',
    slug: 'lmstudio',
    description: 'Run LLMs locally with a beautiful GUI',
    longDescription: 'LM Studio is a desktop application for running local LLMs with an intuitive chat interface. Supports multiple model formats and GPU acceleration.',
    category: 'llm-inference',
    icon: '💻',
    tags: ['desktop', 'gui', 'chat'],
    homepage: 'https://lmstudio.ai',
    requirements: { os: ['Linux', 'macOS', 'Windows'] },
    isPopular: true,
    status: 'available'
  },
  {
    id: 'jan',
    name: 'Jan',
    slug: 'jan',
    description: 'Open-source ChatGPT alternative that runs 100% offline',
    longDescription: 'Jan is an open-source alternative to ChatGPT that runs entirely offline on your computer. Features model management, extensions, and privacy-first design.',
    category: 'llm-inference',
    icon: '💬',
    tags: ['desktop', 'offline', 'privacy'],
    homepage: 'https://jan.ai',
    repository: 'https://github.com/janhq/jan',
    requirements: { os: ['Linux', 'macOS', 'Windows'] },
    isPopular: true,
    status: 'available'
  },
  {
    id: 'gpt4all',
    name: 'GPT4All',
    slug: 'gpt4all',
    description: 'Open-source locally-running chatbot trained on massive data',
    longDescription: 'GPT4All is an ecosystem of open-source chatbots trained on massive collections of clean assistant data. Runs on consumer CPUs.',
    category: 'llm-inference',
    icon: '🤖',
    tags: ['cpu', 'quantized', 'local'],
    homepage: 'https://gpt4all.io',
    repository: 'https://github.com/nomic-ai/gpt4all',
    installCommand: 'pip install gpt4all',
    isPopular: true,
    status: 'available'
  },

  // Local Models
  {
    id: 'llama3',
    name: 'Llama 3',
    slug: 'llama3',
    description: 'Meta Llama 3 - state-of-the-art open-source LLM',
    longDescription: 'Llama 3 is Meta\'s latest open-source large language model. Available in 8B and 70B parameter versions with excellent performance across benchmarks.',
    category: 'local-models',
    icon: '🦙',
    tags: ['meta', 'llama', 'foundation'],
    homepage: 'https://ai.meta.com/llama/',
    repository: 'https://huggingface.co/meta-llama',
    isPopular: true,
    status: 'available',
    configOptions: [
      { key: 'size', label: 'Model Size', type: 'select', options: [
        { value: '8b', label: '8B Parameters' },
        { value: '70b', label: '70B Parameters' }
      ]},
      { key: 'quantization', label: 'Quantization', type: 'select', options: [
        { value: 'q4_k_m', label: 'Q4_K_M (Recommended)' },
        { value: 'q5_k_m', label: 'Q5_K_M' },
        { value: 'q8_0', label: 'Q8_0' }
      ]}
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral 7B',
    slug: 'mistral',
    description: 'Powerful and efficient 7B parameter model',
    longDescription: 'Mistral 7B is a powerful, efficient LLM that outperforms Llama 2 13B on all benchmarks. Features sliding window attention for efficient inference.',
    category: 'local-models',
    icon: '🌀',
    tags: ['mistral', 'efficient', '7b'],
    homepage: 'https://mistral.ai',
    repository: 'https://huggingface.co/mistralai/Mistral-7B-v0.1',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'mixtral',
    name: 'Mixtral 8x7B',
    slug: 'mixtral',
    description: 'Sparse Mixture of Experts with 8 expert networks',
    longDescription: 'Mixtral 8x7B is a Sparse Mixture of Experts model that beats Llama 2 70B on most benchmarks while using less compute due to sparse activation.',
    category: 'local-models',
    icon: '🔮',
    tags: ['moe', 'sparse', 'efficient'],
    homepage: 'https://mistral.ai',
    repository: 'https://huggingface.co/mistralai/Mixtral-8x7B-v0.1',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'codellama',
    name: 'Code Llama',
    slug: 'codellama',
    description: 'State-of-the-art code generation model',
    longDescription: 'Code Llama is a code-specialized version of Llama 2, optimized for code generation, completion, and explanation tasks.',
    category: 'local-models',
    icon: '👨‍💻',
    tags: ['code', 'programming', 'specialized'],
    repository: 'https://huggingface.co/codellama',
    status: 'available'
  },
  {
    id: 'qwen2',
    name: 'Qwen 2.5',
    slug: 'qwen2',
    description: 'Alibaba\'s multilingual large language model',
    longDescription: 'Qwen 2.5 is Alibaba\'s latest multilingual LLM with excellent performance on coding, math, and multilingual tasks.',
    category: 'local-models',
    icon: '🌏',
    tags: ['multilingual', 'coding', 'alibaba'],
    repository: 'https://huggingface.co/Qwen',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek R1',
    slug: 'deepseek',
    description: 'Reasoning-focused LLM with advanced chain-of-thought',
    longDescription: 'DeepSeek R1 is a reasoning-focused LLM that excels at complex problem-solving, mathematics, and coding tasks.',
    category: 'local-models',
    icon: '🧠',
    tags: ['reasoning', 'coding', 'math'],
    repository: 'https://huggingface.co/deepseek-ai',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'phi3',
    name: 'Phi-3 Mini',
    slug: 'phi3',
    description: 'Microsoft\'s compact but powerful model',
    longDescription: 'Phi-3 Mini is Microsoft\'s 3.8B parameter model that punches above its weight class, rivaling much larger models.',
    category: 'local-models',
    icon: '🔬',
    tags: ['microsoft', 'small', 'efficient'],
    repository: 'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct',
    status: 'available'
  },
  {
    id: 'starcoder2',
    name: 'StarCoder 2',
    slug: 'starcoder2',
    description: 'Code generation model trained on 600+ languages',
    longDescription: 'StarCoder 2 is a state-of-the-art code LLM trained on over 600 programming languages with excellent code completion.',
    category: 'local-models',
    icon: '⭐',
    tags: ['code', 'multilingual', 'programming'],
    repository: 'https://huggingface.co/bigcode/starcoder2-15b',
    status: 'available'
  },

  // AI Desktop Apps
  {
    id: 'pygpt',
    name: 'PyGPT',
    slug: 'pygpt',
    description: 'Desktop AI assistant with plugins and web search',
    longDescription: 'PyGPT is an open-source desktop AI assistant supporting chat, agents, web search, Python execution, TTS/STT, and plugins.',
    category: 'ai-desktop',
    icon: '🐍',
    tags: ['desktop', 'plugins', 'agents'],
    homepage: 'https://pygpt.net',
    repository: 'https://github.com/szczyglis-dev/py-gpt',
    installCommand: 'pip install pygpt',
    status: 'available'
  },
  {
    id: 'openwebui',
    name: 'Open WebUI',
    slug: 'openwebui',
    description: 'ChatGPT-style web interface for local models',
    longDescription: 'Open WebUI is a feature-rich, self-hosted ChatGPT-style UI for local LLMs. Supports Ollama, OpenAI-compatible APIs, RAG, and more.',
    category: 'ai-desktop',
    icon: '🌐',
    tags: ['web-ui', 'chat', 'rag'],
    homepage: 'https://openwebui.com',
    repository: 'https://github.com/open-webui/open-webui',
    dockerImage: 'ghcr.io/open-webui/open-webui:main',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'chatbox',
    name: 'Chatbox',
    slug: 'chatbox',
    description: 'Desktop client for ChatGPT and local models',
    longDescription: 'Chatbox is a desktop application that provides a beautiful interface for ChatGPT, Claude, and local LLM APIs.',
    category: 'ai-desktop',
    icon: '📦',
    tags: ['desktop', 'chat', 'multi-model'],
    homepage: 'https://chatboxai.app',
    repository: 'https://github.com/Bin-Huang/chatbox',
    status: 'available'
  },
  {
    id: 'librechat',
    name: 'LibreChat',
    slug: 'librechat',
    description: 'Enhanced ChatGPT clone with multiple AI providers',
    longDescription: 'LibreChat is an enhanced ChatGPT clone supporting multiple providers, plugins, agents, and extensive customization.',
    category: 'ai-desktop',
    icon: '💬',
    tags: ['web', 'multi-provider', 'plugins'],
    repository: 'https://github.com/danny-avila/LibreChat',
    dockerImage: 'ghcr.io/danny-avila/librechat:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'anythingllm',
    name: 'AnythingLLM',
    slug: 'anythingllm',
    description: 'All-in-one desktop app for local AI with RAG',
    longDescription: 'AnythingLLM is an all-in-one desktop application for private, local AI with document RAG, multi-user support, and easy deployment.',
    category: 'ai-desktop',
    icon: '📚',
    tags: ['desktop', 'rag', 'documents'],
    homepage: 'https://useanything.com',
    repository: 'https://github.com/Mintplex-Labs/anything-llm',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'continue',
    name: 'Continue',
    slug: 'continue',
    description: 'Open-source autopilot for VS Code and JetBrains',
    longDescription: 'Continue is an open-source VS Code and JetBrains extension that brings AI-powered code completion and chat to your IDE.',
    category: 'ai-desktop',
    icon: '▶️',
    tags: ['ide', 'vscode', 'jetbrains'],
    homepage: 'https://continue.dev',
    repository: 'https://github.com/continuedev/continue',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'tabby',
    name: 'Tabby',
    slug: 'tabby',
    description: 'Self-hosted AI coding assistant',
    longDescription: 'Tabby is a self-hosted AI coding assistant that provides code completion and chat. Can be connected to your codebase for context.',
    category: 'ai-desktop',
    icon: '🐱',
    tags: ['code-completion', 'self-hosted', 'privacy'],
    homepage: 'https://tabby.tabbyml.com',
    repository: 'https://github.com/TabbyML/tabby',
    dockerImage: 'tabbyml/tabby:latest',
    status: 'available'
  },
  {
    id: 'aider',
    name: 'Aider',
    slug: 'aider',
    description: 'AI pair programming in your terminal',
    longDescription: 'Aider is an AI pair programming tool that lets you collaborate with LLMs to edit code in your local git repository.',
    category: 'ai-desktop',
    icon: '🤝',
    tags: ['terminal', 'pair-programming', 'git'],
    homepage: 'https://aider.chat',
    repository: 'https://github.com/paul-gauthier/aider',
    installCommand: 'pip install aider-chat',
    isPopular: true,
    status: 'available'
  },

  // Vector Databases
  {
    id: 'milvus',
    name: 'Milvus',
    slug: 'milvus',
    description: 'Open-source vector database for AI applications',
    longDescription: 'Milvus is a highly flexible, reliable, and blazing-fast vector database that powers AI applications with unstructured data.',
    category: 'vector-db',
    icon: '🗃️',
    tags: ['vector', 'database', 'search'],
    homepage: 'https://milvus.io',
    repository: 'https://github.com/milvus-io/milvus',
    dockerImage: 'milvusdb/milvus:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    slug: 'qdrant',
    description: 'High-performance vector similarity search',
    longDescription: 'Qdrant is a vector similarity search engine with extended filtering support, useful for AI applications and neural network matching.',
    category: 'vector-db',
    icon: '🎯',
    tags: ['vector', 'search', 'rust'],
    homepage: 'https://qdrant.tech',
    repository: 'https://github.com/qdrant/qdrant',
    dockerImage: 'qdrant/qdrant:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    slug: 'chromadb',
    description: 'AI-native open-source embedding database',
    longDescription: 'ChromaDB is the AI-native open-source embedding database, designed for building LLM applications with simple APIs.',
    category: 'vector-db',
    icon: '🌈',
    tags: ['embedding', 'database', 'python'],
    homepage: 'https://www.trychroma.com',
    repository: 'https://github.com/chroma-core/chroma',
    installCommand: 'pip install chromadb',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'weaviate',
    name: 'Weaviate',
    slug: 'weaviate',
    description: 'Open-source vector database with built-in ML',
    longDescription: 'Weaviate is an open-source vector database that stores both objects and vectors, allowing for combining vector search with structured filtering.',
    category: 'vector-db',
    icon: '🔮',
    tags: ['vector', 'search', 'graphql'],
    homepage: 'https://weaviate.io',
    repository: 'https://github.com/weaviate/weaviate',
    dockerImage: 'semitechnologies/weaviate:latest',
    status: 'available'
  },
  {
    id: 'pinecone',
    name: 'Pinecone (Local Mode)',
    slug: 'pinecone',
    description: 'Managed vector database with local development',
    longDescription: 'Pinecone is a fully managed vector database for machine learning applications. Offers local development mode.',
    category: 'vector-db',
    icon: '🌲',
    tags: ['managed', 'vector', 'cloud'],
    homepage: 'https://pinecone.io',
    status: 'available'
  },

  // AI Frameworks
  {
    id: 'pytorch',
    name: 'PyTorch',
    slug: 'pytorch',
    description: 'Deep learning framework for research and production',
    longDescription: 'PyTorch is an open-source machine learning framework that accelerates the path from research to production.',
    category: 'ai-frameworks',
    icon: '🔥',
    tags: ['deep-learning', 'training', 'inference'],
    homepage: 'https://pytorch.org',
    repository: 'https://github.com/pytorch/pytorch',
    installCommand: 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    slug: 'tensorflow',
    description: 'End-to-end platform for machine learning',
    longDescription: 'TensorFlow is an end-to-end open-source platform for machine learning with a comprehensive ecosystem of tools.',
    category: 'ai-frameworks',
    icon: '🔬',
    tags: ['deep-learning', 'training', 'tfx'],
    homepage: 'https://tensorflow.org',
    repository: 'https://github.com/tensorflow/tensorflow',
    installCommand: 'pip install tensorflow[and-cuda]',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'jax',
    name: 'JAX',
    slug: 'jax',
    description: 'High-performance numerical computing and ML',
    longDescription: 'JAX is a library for high-performance numerical computing with automatic differentiation and GPU/TPU support.',
    category: 'ai-frameworks',
    icon: '⚡',
    tags: ['numerical', 'differentiable', 'gpu'],
    homepage: 'https://jax.dev',
    repository: 'https://github.com/google/jax',
    installCommand: 'pip install "jax[cuda12_pip]" -f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html',
    status: 'available'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Transformers',
    slug: 'huggingface',
    description: 'State-of-the-art ML for PyTorch, TensorFlow, and JAX',
    longDescription: 'Transformers provides APIs to download and use pretrained models for NLP, vision, and audio tasks.',
    category: 'ai-frameworks',
    icon: '🤗',
    tags: ['transformers', 'nlp', 'pretrained'],
    homepage: 'https://huggingface.co',
    repository: 'https://github.com/huggingface/transformers',
    installCommand: 'pip install transformers accelerate datasets',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'onnx',
    name: 'ONNX Runtime',
    slug: 'onnx',
    description: 'Cross-platform ML model inference',
    longDescription: 'ONNX Runtime is a cross-platform inference and training accelerator compatible with popular ML frameworks.',
    category: 'ai-frameworks',
    icon: '🚀',
    tags: ['inference', 'cross-platform', 'optimized'],
    homepage: 'https://onnxruntime.ai',
    repository: 'https://github.com/microsoft/onnxruntime',
    installCommand: 'pip install onnxruntime-gpu',
    status: 'available'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    slug: 'langchain',
    description: 'Build context-aware reasoning applications',
    longDescription: 'LangChain is a framework for developing applications powered by language models with composable components.',
    category: 'ai-frameworks',
    icon: '🦜',
    tags: ['llm', 'agents', 'rag'],
    homepage: 'https://langchain.com',
    repository: 'https://github.com/langchain-ai/langchain',
    installCommand: 'pip install langchain langchain-community',
    isPopular: true,
    status: 'available'
  },

  // RAG & Agents
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    slug: 'llamaindex',
    description: 'Data framework for LLM applications',
    longDescription: 'LlamaIndex provides tools to ingest, structure, and access private data for LLM applications.',
    category: 'rag-tools',
    icon: '🦙',
    tags: ['rag', 'data', 'indexing'],
    homepage: 'https://docs.llamaindex.ai',
    repository: 'https://github.com/run-llama/llama_index',
    installCommand: 'pip install llama-index',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    slug: 'langgraph',
    description: 'Build stateful, multi-actor applications with LLMs',
    longDescription: 'LangGraph is a library for building stateful, multi-actor applications with LLMs, built on top of LangChain.',
    category: 'rag-tools',
    icon: '📊',
    tags: ['agents', 'state-machine', 'multi-actor'],
    homepage: 'https://langchain-ai.github.io/langgraph/',
    repository: 'https://github.com/langchain-ai/langgraph',
    installCommand: 'pip install langgraph',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    slug: 'crewai',
    description: 'Orchestrate teams of AI agents',
    longDescription: 'CrewAI is a framework for orchestrating role-playing AI agents that can collaborate on complex tasks.',
    category: 'rag-tools',
    icon: '👥',
    tags: ['agents', 'orchestration', 'collaboration'],
    homepage: 'https://crewai.com',
    repository: 'https://github.com/joaomdmoura/crewAI',
    installCommand: 'pip install crewai',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    slug: 'autogen',
    description: 'Enable next-gen LLM applications with multi-agent',
    longDescription: 'AutoGen is a framework that enables the development of LLM applications using multiple agents that can converse.',
    category: 'rag-tools',
    icon: '🤖',
    tags: ['agents', 'multi-agent', 'microsoft'],
    homepage: 'https://microsoft.github.io/autogen/',
    repository: 'https://github.com/microsoft/autogen',
    installCommand: 'pip install pyautogen',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'semantic-kernel',
    name: 'Semantic Kernel',
    slug: 'semantic-kernel',
    description: 'Microsoft\'s lightweight SDK for AI orchestration',
    longDescription: 'Semantic Kernel is an SDK that integrates Large Language Models with conventional programming languages.',
    category: 'rag-tools',
    icon: '🧩',
    tags: ['sdk', 'microsoft', 'orchestration'],
    homepage: 'https://learn.microsoft.com/semantic-kernel',
    repository: 'https://github.com/microsoft/semantic-kernel',
    installCommand: 'pip install semantic-kernel',
    status: 'available'
  },
  {
    id: 'haystack',
    name: 'Haystack',
    slug: 'haystack',
    description: 'NLP framework for search and RAG',
    longDescription: 'Haystack is an open-source NLP framework that allows you to use LLMs and transformers for search and RAG.',
    category: 'rag-tools',
    icon: '🌾',
    tags: ['nlp', 'search', 'rag'],
    homepage: 'https://haystack.deepset.ai',
    repository: 'https://github.com/deepset-ai/haystack',
    installCommand: 'pip install haystack-ai',
    status: 'available'
  },

  // GPU & Compute
  {
    id: 'cuda',
    name: 'NVIDIA CUDA Toolkit',
    slug: 'cuda',
    description: 'Parallel computing platform and programming model',
    longDescription: 'CUDA is a parallel computing platform and programming model developed by NVIDIA for general computing on GPUs.',
    category: 'gpu-tools',
    icon: '🎮',
    tags: ['nvidia', 'gpu', 'parallel'],
    homepage: 'https://developer.nvidia.com/cuda-toolkit',
    requirements: { gpu: 'NVIDIA GPU' },
    isPopular: true,
    status: 'available'
  },
  {
    id: 'cudnn',
    name: 'cuDNN',
    slug: 'cudnn',
    description: 'GPU-accelerated library for deep neural networks',
    longDescription: 'cuDNN provides highly tuned implementations for standard routines such as forward and backward convolution.',
    category: 'gpu-tools',
    icon: '⚡',
    tags: ['nvidia', 'deep-learning', 'acceleration'],
    homepage: 'https://developer.nvidia.com/cudnn',
    requirements: { gpu: 'NVIDIA GPU with CUDA' },
    status: 'available'
  },
  {
    id: 'tensorrt',
    name: 'TensorRT',
    slug: 'tensorrt',
    description: 'High-performance deep learning inference optimizer',
    longDescription: 'TensorRT is a high-performance deep learning inference optimizer and runtime library for NVIDIA GPUs.',
    category: 'gpu-tools',
    icon: '🚀',
    tags: ['inference', 'optimization', 'nvidia'],
    homepage: 'https://developer.nvidia.com/tensorrt',
    requirements: { gpu: 'NVIDIA GPU with CUDA 11.8+' },
    status: 'available'
  },
  {
    id: 'dcgm',
    name: 'DCGM (Data Center GPU Manager)',
    slug: 'dcgm',
    description: 'GPU management and monitoring for data centers',
    longDescription: 'DCGM provides monitoring, diagnostics, and management for NVIDIA GPUs in data center environments.',
    category: 'gpu-tools',
    icon: '📊',
    tags: ['monitoring', 'management', 'enterprise'],
    homepage: 'https://developer.nvidia.com/dcgm',
    dockerImage: 'nvcr.io/nvidia/k8s/dcgm-exporter:latest',
    status: 'available'
  },
  {
    id: 'ray',
    name: 'Ray',
    slug: 'ray',
    description: 'Unified framework for scaling AI applications',
    longDescription: 'Ray is a unified framework for scaling AI and Python applications, providing distributed computing primitives.',
    category: 'gpu-tools',
    icon: '🌟',
    tags: ['distributed', 'scaling', 'ml'],
    homepage: 'https://ray.io',
    repository: 'https://github.com/ray-project/ray',
    installCommand: 'pip install ray[default]',
    isPopular: true,
    status: 'available'
  },

  // Monitoring
  {
    id: 'prometheus',
    name: 'Prometheus',
    slug: 'prometheus',
    description: 'Systems and service monitoring system',
    longDescription: 'Prometheus is an open-source systems monitoring and alerting toolkit with a powerful query language.',
    category: 'monitoring',
    icon: '📈',
    tags: ['monitoring', 'metrics', 'alerting'],
    homepage: 'https://prometheus.io',
    repository: 'https://github.com/prometheus/prometheus',
    dockerImage: 'prom/prometheus:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    slug: 'grafana',
    description: 'Open-source analytics and monitoring platform',
    longDescription: 'Grafana is an open-source platform for monitoring and observability with beautiful dashboards.',
    category: 'monitoring',
    icon: '📊',
    tags: ['dashboards', 'visualization', 'monitoring'],
    homepage: 'https://grafana.com',
    repository: 'https://github.com/grafana/grafana',
    dockerImage: 'grafana/grafana:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'wandb',
    name: 'Weights & Biases',
    slug: 'wandb',
    description: 'ML experiment tracking and visualization',
    longDescription: 'W&B helps you track your machine learning experiments, visualize metrics, and share results.',
    category: 'monitoring',
    icon: '🔬',
    tags: ['experiment', 'tracking', 'ml'],
    homepage: 'https://wandb.ai',
    repository: 'https://github.com/wandb/wandb',
    installCommand: 'pip install wandb',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'mlflow',
    name: 'MLflow',
    slug: 'mlflow',
    description: 'Open-source platform for ML lifecycle',
    longDescription: 'MLflow is an open-source platform for the end-to-end machine learning lifecycle.',
    category: 'monitoring',
    icon: '🔄',
    tags: ['lifecycle', 'tracking', 'deployment'],
    homepage: 'https://mlflow.org',
    repository: 'https://github.com/mlflow/mlflow',
    installCommand: 'pip install mlflow',
    isPopular: true,
    status: 'available'
  },

  // Containerization
  {
    id: 'docker',
    name: 'Docker',
    slug: 'docker',
    description: 'Container platform for application deployment',
    longDescription: 'Docker enables you to separate your applications from your infrastructure for rapid software delivery.',
    category: 'containerization',
    icon: '🐳',
    tags: ['containers', 'deployment', 'devops'],
    homepage: 'https://docker.com',
    installCommand: 'curl -fsSL https://get.docker.com | sh',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'podman',
    name: 'Podman',
    slug: 'podman',
    description: 'Daemonless container engine for Linux',
    longDescription: 'Podman is a daemonless container engine for developing, managing, and running OCI Containers.',
    category: 'containerization',
    icon: '📦',
    tags: ['containers', 'daemonless', 'rootless'],
    homepage: 'https://podman.io',
    repository: 'https://github.com/containers/podman',
    installCommand: 'sudo dnf install podman',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    slug: 'kubernetes',
    description: 'Container orchestration platform',
    longDescription: 'Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.',
    category: 'containerization',
    icon: '☸️',
    tags: ['orchestration', 'containers', 'scaling'],
    homepage: 'https://kubernetes.io',
    repository: 'https://github.com/kubernetes/kubernetes',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'nvidia-container-toolkit',
    name: 'NVIDIA Container Toolkit',
    slug: 'nvidia-container-toolkit',
    description: 'Run GPU-accelerated containers',
    longDescription: 'The NVIDIA Container Toolkit enables users to build and run GPU-accelerated containers.',
    category: 'containerization',
    icon: '🎮',
    tags: ['nvidia', 'gpu', 'containers'],
    homepage: 'https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/',
    requirements: { gpu: 'NVIDIA GPU' },
    status: 'available'
  },

  // Security
  {
    id: 'vault',
    name: 'HashiCorp Vault',
    slug: 'vault',
    description: 'Secrets management and encryption',
    longDescription: 'Vault is a tool for securely accessing secrets, managing passwords, and encrypting data.',
    category: 'security',
    icon: '🔐',
    tags: ['secrets', 'encryption', 'security'],
    homepage: 'https://vaultproject.io',
    dockerImage: 'hashicorp/vault:latest',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'selinux',
    name: 'SELinux',
    slug: 'selinux',
    description: 'Linux kernel security module',
    longDescription: 'SELinux provides a mechanism for supporting access control security policies.',
    category: 'security',
    icon: '🛡️',
    tags: ['security', 'kernel', 'access-control'],
    status: 'available'
  },
  {
    id: 'firewalld',
    name: 'Firewalld',
    slug: 'firewalld',
    description: 'Dynamic firewall management tool',
    longDescription: 'Firewalld provides a dynamically managed firewall with support for network zones.',
    category: 'security',
    icon: '🔥',
    tags: ['firewall', 'network', 'security'],
    installCommand: 'sudo dnf install firewalld',
    status: 'available'
  },

  // Multimodal
  {
    id: 'comfyui',
    name: 'ComfyUI',
    slug: 'comfyui',
    description: 'Powerful modular GUI for Stable Diffusion',
    longDescription: 'ComfyUI is a powerful and modular GUI for Stable Diffusion with node-based workflow.',
    category: 'multimodal',
    icon: '🎨',
    tags: ['image', 'stable-diffusion', 'gui'],
    repository: 'https://github.com/comfyanonymous/ComfyUI',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'automatic1111',
    name: 'Stable Diffusion WebUI',
    slug: 'automatic1111',
    description: 'Browser interface for Stable Diffusion',
    longDescription: 'AUTOMATIC1111 WebUI is a browser interface for Stable Diffusion with extensive features.',
    category: 'multimodal',
    icon: '🖼️',
    tags: ['image', 'stable-diffusion', 'web-ui'],
    repository: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'whisper',
    name: 'OpenAI Whisper',
    slug: 'whisper',
    description: 'Robust speech recognition model',
    longDescription: 'Whisper is an automatic speech recognition system trained on a large dataset of diverse audio.',
    category: 'multimodal',
    icon: '🎤',
    tags: ['speech', 'asr', 'transcription'],
    repository: 'https://github.com/openai/whisper',
    installCommand: 'pip install openai-whisper',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'tortoise-tts',
    name: 'Tortoise TTS',
    slug: 'tortoise-tts',
    description: 'Text-to-speech with realistic voices',
    longDescription: 'Tortoise TTS is a text-to-speech program built with realistic voice synthesis.',
    category: 'multimodal',
    icon: '🔊',
    tags: ['speech', 'tts', 'voice'],
    repository: 'https://github.com/neonbjb/tortoise-tts',
    installCommand: 'pip install tortoise-tts',
    status: 'available'
  },
  {
    id: 'ffmpeg',
    name: 'FFmpeg',
    slug: 'ffmpeg',
    description: 'Complete cross-platform multimedia framework',
    longDescription: 'FFmpeg is a complete, cross-platform solution to record, convert and stream audio and video.',
    category: 'multimodal',
    icon: '🎬',
    tags: ['video', 'audio', 'multimedia'],
    homepage: 'https://ffmpeg.org',
    installCommand: 'sudo dnf install ffmpeg ffmpeg-free-devel',
    isPopular: true,
    status: 'available'
  },

  // Development
  {
    id: 'vscode',
    name: 'VS Code',
    slug: 'vscode',
    description: 'Lightweight but powerful code editor',
    longDescription: 'Visual Studio Code is a lightweight but powerful source code editor with AI extensions.',
    category: 'development',
    icon: '📝',
    tags: ['ide', 'editor', 'microsoft'],
    homepage: 'https://code.visualstudio.com',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    description: 'AI-first code editor built on VS Code',
    longDescription: 'Cursor is an AI-first code editor built for pair programming with AI, based on VS Code.',
    category: 'development',
    icon: '🎯',
    tags: ['ide', 'ai', 'editor'],
    homepage: 'https://cursor.sh',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'zed',
    name: 'Zed',
    slug: 'zed',
    description: 'High-performance multiplayer code editor',
    longDescription: 'Zed is a high-performance, multiplayer code editor from the creators of Atom.',
    category: 'development',
    icon: '⚡',
    tags: ['editor', 'performance', 'rust'],
    homepage: 'https://zed.dev',
    repository: 'https://github.com/zed-industries/zed',
    status: 'available'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    slug: 'windsurf',
    description: 'AI IDE by Codeium for next-gen development',
    longDescription: 'Windsurf is the first AI IDE that deeply understands your codebase and workflow.',
    category: 'development',
    icon: '🌊',
    tags: ['ide', 'ai', 'codeium'],
    homepage: 'https://codeium.com/windsurf',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'AI pair programmer in your editor',
    longDescription: 'GitHub Copilot is an AI pair programmer that helps you write code faster with less work.',
    category: 'development',
    icon: '✈️',
    tags: ['ai', 'pair-programming', 'github'],
    homepage: 'https://github.com/features/copilot',
    isPopular: true,
    status: 'available'
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    slug: 'gemini-cli',
    description: 'Command-line interface for Google Gemini',
    longDescription: 'Gemini CLI provides command-line access to Google\'s Gemini AI models.',
    category: 'development',
    icon: '💎',
    tags: ['cli', 'google', 'gemini'],
    status: 'available'
  }
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return aiTools.filter(tool => tool.category === categoryId);
};

export const getPopularTools = (): Tool[] => {
  return aiTools.filter(tool => tool.isPopular);
};

export const searchTools = (query: string): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return aiTools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return aiTools.find(tool => tool.slug === slug);
};
