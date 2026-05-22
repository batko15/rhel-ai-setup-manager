#!/bin/bash
# RHEL AI Setup Manager - GitHub Upload Script
# 
# Dieses Skript laedt das Repository auf GitHub hoch.
#
# ANLEITUNG:
# 1. Erstellen Sie ein Personal Access Token auf GitHub:
#    - Gehen Sie zu: https://github.com/settings/tokens
#    - Klicken Sie auf "Generate new token (classic)"
#    - Wählen Sie "repo" scope
#    - Kopieren Sie das Token
#
# 2. Fuehren Sie dieses Skript aus:
#    chmod +x push-to-github.sh
#    ./push-to-github.sh YOUR_TOKEN

if [ -z "$1" ]; then
    echo "Verwendung: $0 <GITHUB_TOKEN>"
    echo ""
    echo "Beispiel: $0 ghp_xxxxxxxxxxxxxxxxxxxx"
    echo ""
    echo "Erstellen Sie ein Token unter: https://github.com/settings/tokens"
    exit 1
fi

TOKEN="$1"
REPO_URL="https://${TOKEN}@github.com/batko15/rhel-ai-setup-manager.git"

echo "==> Repository wird auf GitHub hochgeladen..."

# Set remote with token
git remote set-url origin "$REPO_URL"

# Push to GitHub
git push -u origin main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ERFOLGREICH! Repository wurde hochgeladen auf:"
    echo "   https://github.com/batko15/rhel-ai-setup-manager"
    echo ""
    echo "==> Entferne Token aus Remote URL..."
    git remote set-url origin https://github.com/batko15/rhel-ai-setup-manager.git
else
    echo ""
    echo "❌ FEHLER beim Hochladen. Bitte prüfen Sie:"
    echo "   - Ist das Token korrekt?"
    echo "   - Haben Sie Zugriff auf das Repository?"
fi
