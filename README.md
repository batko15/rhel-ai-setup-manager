# BigLinux AI Setup Manager

Eine umfassende grafische Oberfläche zur Verwaltung und Installation von KI/ML-Tools für BigLinux und Manjaro.

## 🚀 Features

- **600+ AI/ML Tools** - LLM Inference, lokale Modelle, Vektor-Datenbanken, Frameworks
- **33 Kategorien** - Organisierte Tool-Sammlung für einfache Navigation
- **Grafische Oberfläche** - Intuitive GUI zur Auswahl und Konfiguration von Tools
- **Installations-Skripte** - Automatisch generierte Bash-Skripte für Arch-basierte Systeme
- **Docker Compose** - Container-basierte Deployment-Konfigurationen
- **Konfiguration** - Individuelle Einstellungen pro Tool

## 💻 System-Unterstützung

Optimiert für:
- **BigLinux** - Brazilian Arch-based Distribution
- **Manjaro** - User-friendly Arch Distribution
- **Arch Linux** - Rolling Release
- **CachyOS** - Performance-optimized Arch

## 🎯 Hardware-Optimierung

Standard-Konfiguration für:
- **CPU**: Intel i5-12400F (Alder Lake, 6C/12T)
- **GPU**: NVIDIA RTX 4070 (12GB VRAM)
- **RAM**: 32GB + 47GB ZRAM Swap

## 📦 Tool-Kategorien

### KI-Inferenz
- **Ollama** - Lokale LLM-Ausführung
- **vLLM** - Hochleistungs-Inferenz-Server
- **LocalAI** - OpenAI-kompatible API
- **llama.cpp** - C/C++ Inferenz
- **LM Studio** - Desktop-GUI für LLMs
- **Jan** - Offline ChatGPT-Alternative

### Lokale Modelle
- **Llama 3.1/3.2** - Meta's Open-Source LLM
- **Mistral 7B** - Effizientes 7B-Modell
- **DeepSeek R1/V3** - Reasoning-fokussiert
- **Qwen 2.5 Coder** - Multilingual
- **Phi-3/Phi-4** - Microsoft's kompaktes Modell
- **Gemma 2** - Google's Open-Source Modelle

### Vector Databases
- **Milvus** - Enterprise Vektor-Datenbank
- **Qdrant** - Hochperformante Ähnlichkeitssuche
- **ChromaDB** - AI-native Embedding-DB
- **FAISS** - Facebook AI Similarity Search

### AI Desktop Apps
- **Open WebUI** - ChatGPT-ähnliche Weboberfläche
- **AnythingLLM** - All-in-One mit RAG
- **Continue** - VS Code/JetBrains Extension
- **Aider** - Terminal-basiertes Pair Programming

### BigLinux/Manjaro Tools
- **Pacman** - Package Manager
- **Yay/Paru** - AUR Helper
- **Pamac** - GUI Package Manager
- **Timeshift** - System Restore
- **MHWD** - Hardware Detection

## 🛠️ Installation

### Voraussetzungen
- BigLinux, Manjaro oder Arch-basierte Distribution
- Root/Sudo-Zugriff
- Internetverbindung

### Schnellstart

1. Repository klonen:
```bash
git clone https://github.com/batko15/rhel-ai-setup-manager.git
cd rhel-ai-setup-manager
```

2. Abhängigkeiten installieren:
```bash
sudo pacman -S --needed bun nodejs npm
```

3. GUI starten:
```bash
bun run dev
```

4. Browser öffnen: `http://localhost:3000`

## 📋 Verwendung

1. **Tools durchsuchen** - Nutzen Sie die Kategorien oder die Suche
2. **Tools auswählen** - Klicken Sie auf Tools zur Auswahl
3. **Konfiguration** - Passen Sie Einstellungen in den Details an
4. **Skript generieren** - Erstellen Sie Installations-Skripte
5. **Ausführen** - Führen Sie das Skript auf Ihrem System aus

## 🎨 RTX 4070 Empfohlene Modelle

| Modell | VRAM | Quantisierung | Use Case |
|--------|------|---------------|----------|
| Llama 3.1 8B | 6GB | Q4_K_M | General |
| Mistral 7B | 5GB | Q4_K_M | Efficient |
| DeepSeek R1 14B | 10GB | Q4_K_M | Reasoning |
| Qwen 2.5 14B | 10GB | Q4_K_M | Coding |
| Gemma 2 9B | 7GB | Q4_K_M | General |
| Phi-4 14B | 10GB | Q4_K_M | Compact |

## 📁 Projektstruktur

```
configs/
├── ollama/          # Ollama Konfiguration
├── mcp/             # MCP Server Konfiguration
├── system/          # System-Parameter
├── prometheus/      # Monitoring
└── grafana/         # Dashboards

scripts/
├── setup-rtx4070.sh # RTX 4070 Setup
└── install-*.sh     # Installationsskripte
```

## 🖥️ Systemanforderungen

### Minimum
- CPU: 4 Kerne
- RAM: 16 GB
- Disk: 100 GB SSD

### Empfohlen (mit GPU)
- CPU: 6+ Kerne
- RAM: 32 GB
- GPU: NVIDIA RTX 4070 oder besser
- Disk: 500 GB NVMe SSD

## 🔒 Sicherheit

- Firewalld Konfiguration
- SELinux/AppArmor Support
- Rootless Podman-Unterstützung
- Secrets-Verschlüsselung

## 📊 Monitoring

- GPU-Nutzung mit nvtop
- Prometheus Metrics
- Grafana Dashboards
- System-Monitoring

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
- [BigLinux](https://biglinux.com.br)
- [Manjaro](https://manjaro.org)
- [NVIDIA](https://nvidia.com)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/batko15/rhel-ai-setup-manager/issues)
- **Repository**: https://github.com/batko15/rhel-ai-setup-manager

---

**Made with ❤️ for the BigLinux AI Community**
