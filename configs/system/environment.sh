#!/bin/bash
# RHEL AI Setup - Umgebungsvariablen
# /etc/profile.d/rhel-ai.sh

# ==========================================
# Ollama Konfiguration
# ==========================================
export OLLAMA_HOST=0.0.0.0
export OLLAMA_ORIGINS="*"
export OLLAMA_MAX_LOADED_MODELS=4
export OLLAMA_GPU=true
export OLLAMA_MODELS=/root/.ollama/models
export OLLAMA_KEEP_ALIVE=24h

# ==========================================
# NVIDIA/CUDA Konfiguration
# ==========================================
export NVIDIA_VISIBLE_DEVICES=all
export NVIDIA_DRIVER_CAPABILITIES=compute,utility
export CUDA_VISIBLE_DEVICES=0,1,2,3
export CUDA_HOME=/usr/local/cuda
export CUDA_PATH=/usr/local/cuda

# CUDA zum PATH hinzufügen
if [ -d "$CUDA_HOME/bin" ]; then
    export PATH=$CUDA_HOME/bin:$PATH
    export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
fi

# ==========================================
# Python/Pip Konfiguration
# ==========================================
export PYTHONUNBUFFERED=1
export PYTHONDONTWRITEBYTECODE=1
export PIP_NO_CACHE_DIR=1
export PIP_DISABLE_PIP_VERSION_CHECK=1

# ==========================================
# Node.js Konfiguration
# ==========================================
export NODE_OPTIONS="--max-old-space-size=8192"
export NODE_ENV=development

# ==========================================
# Modell-Einstellungen
# ==========================================
export DEFAULT_MODEL=mistral:latest
export MODEL_PATH=/opt/models
export EMBEDDING_MODEL=nomic-embed-text

# ==========================================
# Container-Einstellungen
# ==========================================
export PODMAN_RUNTIME=nvidia
export DOCKER_RUNTIME=nvidia

# ==========================================
# MCP Server Ports
# ==========================================
export MCP_FILESYSTEM_PORT=4001
export MCP_GITHUB_PORT=4002
export MCP_MEMORY_PORT=4003
export MCP_SEQUENTIAL_PORT=4004

# ==========================================
# API-Keys (aus .env laden)
# ==========================================
if [ -f /root/.rhel-ai/.env ]; then
    set -a
    source /root/.rhel-ai/.env
    set +a
fi

# ==========================================
# Proxy-Einstellungen (falls benötigt)
# ==========================================
# export HTTP_PROXY=http://proxy.example.com:8080
# export HTTPS_PROXY=http://proxy.example.com:8080
# export NO_PROXY=localhost,127.0.0.1

# ==========================================
# Logging
# ==========================================
export LOG_LEVEL=info
export LOG_PATH=/var/log/rhel-ai
