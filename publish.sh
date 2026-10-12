#!/data/data/com.termux/files/usr/bin/bash
# publish.sh — roda builds + commit + push

set -euo pipefail

REPO_DIR="${REPO_DIR:-$HOME/taverna-fenrir-site}"
cd "$REPO_DIR"

ts() { date '+[%H:%M:%S]'; }
log()  { echo "$(ts) $1"; }
ok()   { echo "$(ts) OK  $1"; }
warn() { echo "$(ts) AVS $1"; }
err()  { echo "$(ts) ERR $1"; }

log "publish.sh iniciado"
log "Repo: $REPO_DIR"
echo ""

# ---------- BUILDS ----------
log "Etapa 1/3 - Rodando builds"

log "  -> build-chamas.js"
node build-chamas.js 2>&1 | grep -E "OK|AVS|ERR" || true

# DESATIVADO em 12/10/2026 pela Janela 1.4
# Motivo: build-historias.js regenera conteudo-viking.js e
# conteudo-mitologia.js do zero, apagando os campos foto e
# fotoInterna adicionados à mão para as capas dos cards.
# Esses 2 arquivos agora são editados manualmente.
# NÃO REATIVAR sem antes adaptar o build pra preservar foto/fotoInterna.
# log "  -> build-historias.js"
# node build-historias.js 2>&1 | grep -E "OK|AVS|ERR|->" || true

echo ""

# ---------- GIT DIFF ----------
log "Etapa 2/3 - Verificando mudancas"

if git diff --quiet -- conteudo.js conteudo-viking.js conteudo-mitologia.js conteudo-chamas.js; then
  ok "Nada mudou nos conteudos gerados."
  log "publish.sh finalizado (sem alteracoes)"
  exit 0
fi

MUDANCAS=$(git diff --stat -- conteudo.js conteudo-viking.js conteudo-mitologia.js conteudo-chamas.js | tail -1)
log "  Mudancas: $MUDANCAS"
echo ""

# ---------- COMMIT + PUSH ----------
log "Etapa 3/3 - Publicando no GitHub"

git add conteudo.js conteudo-viking.js conteudo-mitologia.js conteudo-chamas.js

if git diff --cached --quiet; then
  ok "Nada novo pra commitar."
  exit 0
fi

git commit -m "publish: $(date '+%Y-%m-%d %H:%M')" >/dev/null
ok "Commit criado"

git push origin main 2>&1 | tail -2
ok "Push concluido"

echo ""
log "-----------------------------"
ok "Publicado. GitHub Pages atualiza em 1-2 min."
log "Site: https://runataverna.github.io/taverna-fenrir-site/"
log "publish.sh finalizado"
