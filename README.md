# RHEL AI Full-Stack Setup Manager

Eine umfassende grafische Oberfläche zur Verwaltung und Installation von KI/KI-Tools für Red Hat Enterprise Linux (RHEL) 9/10.

## 🚀 Features

- **85+ AI/ML Tools** - LLM Inference, lokale Modelle, Vektor-Datenbanken, Frameworks
- **Grafische Oberfläche** - Intuitive GUI zur Auswahl und Konfiguration von Tools
- **Installations-Skripte** - Automatisch generierte Bash-Skripte für RHEL
- **Docker Compose** - Container-basierte Deployment-Konfigurationen
- **Kategorien** - 12 organisierte Kategorien für einfache Navigation
- **Konfiguration** - Individuelle Einstellungen pro Tool

## 📦 Tool-Kategorien

### 1. LLM Inference
- **Ollama** - Lokale LLM-Ausführung
- **vLLM** - Hochleistungs-Inferenz-Server
- **LocalAI** - OpenAI-kompatible API
- **llama.cpp** - C/C++ Inferenz
- **TGI** - Hugging Face Text Generation
- **LM Studio** - Desktop-GUI für LLMs
- **Jan** - Offline ChatGPT-Alternative
- **GPT4All** - CPU-optimierte Modelle

### 2. Lokale Modelle
- **Llama 3** - Meta's neuestes Open-Source LLM
- **Mistral 7B** - Effizientes 7B-Modell
- **Mixtral 8x7B** - Sparse Mixture of Experts
- **Code Llama** - Code-Spezialisiert
- **Qwen 2.5** - Multilingual von Alibaba
- **DeepSeek R1** - Reasoning-fokussiert
- **Phi-3 Mini** - Microsoft's kompaktes Modell
- **StarCoder 2** - 600+ Programmiersprachen

### 3. AI Desktop Apps
- **PyGPT** - Desktop-Assistent mit Plugins
- **Open WebUI** - ChatGPT-ähnliche Weboberfläche
- **Chatbox** - Multi-Model-Desktop-Client
- **LibreChat** - Enhanced ChatGPT Clone
- **AnythingLLM** - All-in-One mit RAG
- **Continue** - VS Code/JetBrains Extension
- **Tabby** - Self-hosted Coding Assistant
- **Aider** - Terminal-basiertes Pair Programming

### 4. Vector Databases
- **Milvus** - Enterprise Vektor-Datenbank
- **Qdrant** - Hochperformante Ähnlichkeitssuche
- **ChromaDB** - AI-native Embedding-DB
- **Weaviate** - GraphQL Vektor-DB
- **Pinecone** - Managed Vektor-Service

### 5. AI Frameworks
- **PyTorch** - Deep Learning Framework
- **TensorFlow** - End-to-End ML Platform
- **JAX** - Numerisches Computing
- **Hugging Face Transformers** - Pre-trained Models
- **ONNX Runtime** - Cross-Platform Inference
- **LangChain** - LLM Application Framework

### 6. RAG & Agents
- **LlamaIndex** - Data Framework für LLMs
- **LangGraph** - Stateful Multi-Agent
- **CrewAI** - Agent-Teams orchestrieren
- **AutoGen** - Microsoft Multi-Agent
- **Semantic Kernel** - Microsoft AI SDK
- **Haystack** - NLP Framework

### 7. GPU & Compute
- **NVIDIA CUDA** - Parallel Computing
- **cuDNN** - Deep Neural Network Library
- **TensorRT** - Inference Optimierung
- **DCGM** - GPU Management
- **Ray** - Distributed Computing

### 8. Monitoring
- **Prometheus** - Metrics & Alerting
- **Grafana** - Visualization Dashboards
- **Weights & Biases** - ML Experiment Tracking
- **MLflow** - ML Lifecycle Management

### 9. Containers
- **Docker** - Container Platform
- **Podman** - Daemonless Containers
- **Kubernetes** - Container Orchestration
- **NVIDIA Container Toolkit** - GPU Containers

### 10. Security
- **HashiCorp Vault** - Secrets Management
- **SELinux** - Kernel Security
- **Firewalld** - Dynamic Firewall

### 11. Multimodal AI
- **ComfyUI** - Stable Diffusion GUI
- **Automatic1111** - SD WebUI
- **Whisper** - Speech Recognition
- **Tortoise TTS** - Text-to-Speech
- **FFmpeg** - Multimedia Framework

### 12. Development
- **VS Code** - Code Editor
- **Cursor** - AI-first Editor
- **Zed** - High-performance Editor
- **Windsurf** - AI IDE by Codeium
- **GitHub Copilot** - AI Pair Programmer
- **Gemini CLI** - Google Gemini CLI

## 🛠️ Installation

### Voraussetzungen
- RHEL 9/10 oder kompatible Distribution
- Root/Sudo-Zugriff
- Internetverbindung

### Schnellstart

1. Repository klonen:
```bash
git clone https://github.com/YOUR_USERNAME/rhel-ai-setup-manager.git
cd rhel-ai-setup-manager
```

2. Abhängigkeiten installieren:
```bash
./scripts/install-dependencies.sh
```

3. GUI starten:
```bash
bun run dev
```

4. Browser öffnen: `http://localhost:3000`

### Docker Deployment

```bash
docker-compose up -d
```

## 📋 Verwendung

1. **Tools durchsuchen** - Nutzen Sie die Kategorien oder die Suche
2. **Tools auswählen** - Klicken Sie auf Tools zur Auswahl
3. **Konfiguration** - Passen Sie Einstellungen in den Details an
4. **Skript generieren** - Erstellen Sie Installations-Skripte
5. **Ausführen** - Führen Sie das Skript auf Ihrem System aus

## 🔧 Konfiguration

### Umgebungsvariablen

```bash
# GPU-Einstellungen
NVIDIA_VISIBLE_DEVICES=all
CUDA_VISIBLE_DEVICES=0,1,2,3

# Modell-Einstellungen
DEFAULT_MODEL=llama3
MODEL_PATH=/models

# Container-Einstellungen
PODMAN_RUNTIME=nvidia
```

### Docker Compose Beispiel

```yaml
version: '3.8'
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
  
  openwebui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
```

## 🖥️ Systemanforderungen

### Minimum
- CPU: 4 Kerne
- RAM: 16 GB
- Disk: 100 GB SSD

### Empfohlen (mit GPU)
- CPU: 8+ Kerne
- RAM: 64 GB
- GPU: NVIDIA RTX 3090/4090 oder A100
- Disk: 500 GB NVMe SSD

### Für große Modelle (70B+)
- RAM: 128 GB
- GPU: 2x A100 80GB oder H100
- Disk: 1 TB NVMe SSD

## 🔒 Sicherheit

- SELinux-Profile für Container
- Rootless Podman-Unterstützung
- Secrets-Verschlüsselung mit Vault
- Netzwerk-Isolation mit Firewalld

## 📊 Monitoring

- GPU-Nutzung mit DCGM
- Prometheus Metrics
- Grafana Dashboards
- W&B Experiment Tracking

## 🤝 Beitragen

1. Fork erstellen
2. Feature-Branch: `git checkout -b feature/neues-feature`
3. Commits: `git commit -m 'Neues Feature hinzugefügt'`
4. Push: `git push origin feature/neues-feature`
5. Pull Request erstellen

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE)

## 🙏 Danksagung

- [Ollama](https://ollama.ai)
- [vLLM](https://vllm.ai)
- [Hugging Face](https://huggingface.co)
- [LangChain](https://langchain.com)
- [Red Hat](https://redhat.com)
- [NVIDIA](https://nvidia.com)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/rhel-ai-setup-manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/rhel-ai-setup-manager/discussions)
- **Wiki**: [GitHub Wiki](https://github.com/YOUR_USERNAME/rhel-ai-setup-manager/wiki)

---

**Made with ❤️ for the AI Community**
