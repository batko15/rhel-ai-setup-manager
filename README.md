# RHEL AI Full-Stack Setup Manager

Eine umfassende grafische Oberfläche zur Verwaltung und Installation von KI/KI-Tools für Red Hat Enterprise Linux (RHEL) 9/10.

## 🚀 Features

- **200+ AI/ML Tools** - LLM Inference, lokale Modelle, Vektor-Datenbanken, Frameworks
- **17 Kategorien** - Organisierte Tool-Sammlung für einfache Navigation
- **Grafische Oberfläche** - Intuitive GUI zur Auswahl und Konfiguration von Tools
- **Installations-Skripte** - Automatisch generierte Bash-Skripte für RHEL
- **Docker Compose** - Container-basierte Deployment-Konfigurationen
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
- **KoboldCPP** - KI-Textgenerierung mit GGUF
- **LiteLLM** - Unified API für alle LLMs
- **Llamafile** - LLMs als einzelne Datei
- **ExLlamaV2** - Schnelle Inferenz-Engine

### 2. Lokale Modelle
- **Llama 3.1/3.2** - Meta's neuestes Open-Source LLM
- **Mistral 7B** - Effizientes 7B-Modell
- **Mixtral 8x7B/8x22B** - Sparse Mixture of Experts
- **Code Llama** - Code-Spezialisiert
- **Qwen 2.5 Coder** - Multilingual von Alibaba
- **DeepSeek R1/V3** - Reasoning-fokussiert
- **Phi-3/Phi-4** - Microsoft's kompaktes Modell
- **StarCoder 2** - 600+ Programmiersprachen
- **Gemma 2** - Google's Open-Source Modelle
- **Command R/R+** - Cohere's RAG-optimiertes Modell
- **Codestral** - Mistral's Code-Modell
- **Yi 1.5** - Bilinguales EN/CN Modell
- **Falcon 2** - TII's Foundation Model
- **Solar 10.7B** - Upstage's Depth-Upscaled LLM

### 3. AI Desktop Apps
- **PyGPT** - Desktop-Assistent mit Plugins
- **Open WebUI** - ChatGPT-ähnliche Weboberfläche
- **Chatbox** - Multi-Model-Desktop-Client
- **LibreChat** - Enhanced ChatGPT Clone
- **AnythingLLM** - All-in-One mit RAG
- **Continue** - VS Code/JetBrains Extension
- **Tabby** - Self-hosted Coding Assistant
- **Aider** - Terminal-basiertes Pair Programming
- **Dify** - LLM App Development Platform
- **Lobe Chat** - Modern Chat UI mit Plugins
- **PrivateGPT** - Private Dokumenten-Analyse
- **Khoj** - AI Personal Assistant
- **Perplexity** - KI-Suchmaschine

### 4. Vector Databases
- **Milvus** - Enterprise Vektor-Datenbank
- **Qdrant** - Hochperformante Ähnlichkeitssuche
- **ChromaDB** - AI-native Embedding-DB
- **Weaviate** - GraphQL Vektor-DB
- **Pinecone** - Managed Vektor-Service
- **pgvector** - PostgreSQL Vektor-Extension
- **FAISS** - Facebook AI Similarity Search
- **Elasticsearch** - Suche mit Vektor-Support
- **LanceDB** - Serverless Vektor-DB
- **Typesense** - Schnelle Suche
- **Meilisearch** - Lightning-fast Search
- **Marqo** - Tensor Search Engine

### 5. AI Frameworks
- **PyTorch** - Deep Learning Framework
- **TensorFlow** - End-to-End ML Platform
- **JAX** - Numerisches Computing
- **Hugging Face Transformers** - Pre-trained Models
- **ONNX Runtime** - Cross-Platform Inference
- **LangChain** - LLM Application Framework
- **PyTorch Lightning** - PyTorch Wrapper
- **fastai** - Vereinfachtes Deep Learning
- **scikit-learn** - Machine Learning
- **XGBoost/LightGBM/CatBoost** - Gradient Boosting
- **spaCy** - Industrial NLP
- **Diffusers** - Diffusion Models
- **PEFT** - Parameter-Efficient Fine-Tuning
- **BitsAndBytes** - 8-Bit Quantisierung

### 6. RAG & Agents
- **LlamaIndex** - Data Framework für LLMs
- **LangGraph** - Stateful Multi-Agent
- **CrewAI** - Agent-Teams orchestrieren
- **AutoGen** - Microsoft Multi-Agent
- **Semantic Kernel** - Microsoft AI SDK
- **Haystack** - NLP Framework
- **Mem0/MemGPT** - Memory für AI
- **Phidata** - AI Assistants mit Memory
- **AgentOps** - Agent Monitoring
- **Unstructured** - ETL für LLM-Daten
- **LangServe** - Deploy LangChain APIs

### 7. GPU & Compute
- **NVIDIA CUDA** - Parallel Computing
- **cuDNN** - Deep Neural Network Library
- **TensorRT** - Inference Optimierung
- **DCGM** - GPU Management
- **Ray** - Distributed Computing
- **DeepSpeed** - Distributed Training
- **Megatron-LM** - Large Transformer Training
- **NCCL** - Multi-GPU Communication
- **Triton Inference Server** - Model Serving
- **Horovod** - Distributed Training

### 8. Monitoring
- **Prometheus** - Metrics & Alerting
- **Grafana** - Visualization Dashboards
- **Weights & Biases** - ML Experiment Tracking
- **MLflow** - ML Lifecycle Management
- **TensorBoard** - TensorFlow Visualization
- **ClearML** - MLOps Platform
- **Neptune.ai** - Experiment Tracking
- **LangSmith** - LLM Debugging
- **Jaeger** - Distributed Tracing
- **DCGM Exporter** - GPU Metrics

### 9. Containers
- **Docker** - Container Platform
- **Podman** - Daemonless Containers
- **Kubernetes** - Container Orchestration
- **NVIDIA Container Toolkit** - GPU Containers
- **Minikube** - Local Kubernetes
- **K3s** - Lightweight Kubernetes
- **Helm** - Kubernetes Package Manager
- **Buildah** - Container Image Builder
- **Skopeo** - Container Registry Tool

### 10. Security
- **HashiCorp Vault** - Secrets Management
- **SELinux** - Kernel Security
- **Firewalld** - Dynamic Firewall
- **Trivy** - Container Security Scanner
- **Falco** - Runtime Security
- **Open Policy Agent** - Policy Engine
- **SOPS** - Secrets for Files
- **Age/GnuPG** - Encryption Tools

### 11. Multimodal AI
- **ComfyUI** - Stable Diffusion GUI
- **Automatic1111** - SD WebUI
- **Whisper/Faster-Whisper** - Speech Recognition
- **Tortoise TTS/Coqui TTS** - Text-to-Speech
- **FFmpeg** - Multimedia Framework
- **Invoke AI** - Generative AI Platform
- **Fooocus** - Easy Image Generation
- **Kohya SS** - Fine-tuning GUI
- **Real-ESRGAN** - Image Upscaling
- **Demucs** - Music Separation
- **Segment Anything** - Image Segmentation
- **MusicGen/AudioCraft** - Music Generation

### 12. Development
- **VS Code** - Code Editor
- **Cursor** - AI-first Editor
- **Zed** - High-performance Editor
- **Windsurf** - AI IDE by Codeium
- **GitHub Copilot** - AI Pair Programmer
- **Gemini CLI** - Google Gemini CLI
- **Aider** - Terminal Pair Programming
- **Tabnine** - Code Completion
- **Codeium** - Free AI Assistant
- **Sourcegraph Cody** - Codebase Context AI
- **JetBrains AI** - JetBrains AI Assistant
- **PearAI** - Open-source AI Editor

### 13. Audio AI
- **Whisper** - Speech Recognition
- **Faster-Whisper** - Optimized ASR
- **WhisperX** - Word-level Timestamps
- **Coqui TTS** - Voice Synthesis
- **Piper TTS** - Fast Local TTS
- **Suno Bark** - Generative Audio
- **AudioCraft/MusicGen** - Music Generation
- **Demucs** - Source Separation
- **RVC** - Voice Conversion

### 14. Code AI
- **StarCoder 2** - BigCode Model
- **Code Llama** - Meta's Code Model
- **DeepSeek Coder** - DeepSeek Code Model
- **Codestral** - Mistral Code Model
- **Qwen2.5-Coder** - Alibaba Code Model
- **WizardCoder** - WizardLM Code
- **CodeGemma** - Google Code Model
- **Aider** - Pair Programming
- **Continue** - IDE Autopilot
- **Tabby** - Self-hosted Assistant

### 15. Data Science
- **JupyterLab** - Interactive Notebooks
- **Pandas/Polars** - DataFrames
- **NumPy** - Scientific Computing
- **Matplotlib/Seaborn/Plotly** - Visualization
- **Streamlit/Gradio** - Web Apps
- **DuckDB** - In-process OLAP
- **Apache Spark** - Big Data Analytics
- **Dask** - Parallel Computing
- **Great Expectations** - Data Quality

### 16. MLOps
- **MLflow** - ML Lifecycle
- **Kubeflow** - ML on Kubernetes
- **ZenML** - MLOps Framework
- **ClearML** - MLOps Platform
- **BentoML** - Model Serving
- **Seldon Core** - ML Deployment
- **Feast** - Feature Store
- **DVC** - Data Version Control
- **Prefect/Airflow/Dagster** - Workflow Orchestration

### 17. AI Assistants
- **Perplexity AI** - AI Search Engine
- **Claude** - Anthropic's Assistant
- **ChatGPT** - OpenAI's Conversational AI
- **Google Gemini** - Google's Assistant
- **Microsoft Copilot** - Microsoft's AI
- **Character.AI** - AI Characters
- **Poe** - Multi-bot Platform
- **HuggingChat** - Open-source Chat
- **Mistral Le Chat** - Mistral's Chat
- **Grok** - xAI's Assistant

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

Das Projekt enthält umfassende Konfigurationsdateien für alle Komponenten:

### Konfigurationsverzeichnis

```
configs/
├── ollama/
│   └── config.yaml          # Ollama Hauptkonfiguration
├── mistral/
│   ├── config.yaml          # Mistral/OpenClaw Konfiguration
│   └── openclaw.json        # OpenClaw JSON-Konfiguration
├── mcp/
│   ├── filesystem.json      # MCP Filesystem Server
│   ├── github.json          # MCP GitHub Server
│   ├── memory.json          # MCP Memory Server
│   └── sequential.json      # MCP Sequential Thinking Server
├── system/
│   ├── sysctl.conf          # Kernel-Parameter
│   ├── limits.conf          # System-Limits
│   └── environment.sh       # Umgebungsvariablen
├── prometheus/
│   └── prometheus.yml       # Prometheus Konfiguration
└── grafana/
    └── provisioning/        # Grafana Datasources
```

### Schnellkonfiguration

```bash
# Ollama Konfiguration anwenden
cp configs/ollama/config.yaml ~/.ollama/config.yaml

# System-Parameter anwenden
sudo cp configs/system/sysctl.conf /etc/sysctl.d/99-rhel-ai.conf
sudo sysctl -p /etc/sysctl.d/99-rhel-ai.conf

# System-Limits anwenden
sudo cp configs/system/limits.conf /etc/security/limits.d/99-rhel-ai.conf

# Umgebungsvariablen laden
source configs/system/environment.sh
```

### Umgebungsvariablen

```bash
# GPU-Einstellungen
NVIDIA_VISIBLE_DEVICES=all
CUDA_VISIBLE_DEVICES=0,1,2,3

# Ollama-Einstellungen
OLLAMA_HOST=0.0.0.0
OLLAMA_ORIGINS="*"
OLLAMA_MAX_LOADED_MODELS=4
OLLAMA_GPU=true

# Modell-Einstellungen
DEFAULT_MODEL=mistral:latest
MODEL_PATH=/opt/models

# Container-Einstellungen
PODMAN_RUNTIME=nvidia
DOCKER_RUNTIME=nvidia
```

### MCP Server starten

```bash
# Filesystem MCP Server
npx @modelcontextprotocol/server-filesystem /workspace /root /opt

# GitHub MCP Server (erfordert Token)
export GITHUB_TOKEN=your_token
npx @modelcontextprotocol/server-github

# Memory MCP Server
npx @modelcontextprotocol/server-memory

# Sequential Thinking MCP Server
npx @modelcontextprotocol/server-sequential-thinking
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
