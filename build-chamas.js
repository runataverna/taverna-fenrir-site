#!/usr/bin/env node
// build-chamas.js
// Lê .md de Entrada/Chamas, gera conteudo-chamas.js (MICROCONTOS).

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = process.env.VAULT_TAVERNA
  || path.join(process.env.HOME || '', 'storage/shared/Documents/Anderson lima/Anderson Lima /Taverna Fenrir');

const PASTA_CHAMAS = path.join(VAULT_ROOT, 'Entrada', 'Chamas');

function ts() {
  const d = new Date();
  return `[${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}]`;
}
function log(m)  { console.log(`${ts()} ${m}`); }
function ok(m)   { console.log(`${ts()} OK  ${m}`); }
function warn(m) { console.log(`${ts()} AVS ${m}`); }
function err(m)  { console.log(`${ts()} ERR ${m}`); }

function normalizar(raw) {
  return raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function parseMd(raw) {
  const clean = normalizar(raw);
  const fmMatch = clean.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*\n/);
  let body = clean;
  if (fmMatch) body = clean.slice(fmMatch[0].length);

  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  if (!h1) return { erro: 'sem H1' };
  const h1Text = h1[1].trim();

  const rcMatch = body.match(/##\s+Runa conta\s*\n([\s\S]*?)(?=\n---|\n##\s|$)/);
  const texto = rcMatch ? rcMatch[1].trim() : '';

  if (!texto) return { erro: 'sem bloco "## Runa conta"' };

  return { titulo: h1Text, texto };
}

function main() {
  log('build-chamas.js iniciado');
  log(`Pasta: ${PASTA_CHAMAS}`);

  if (!fs.existsSync(PASTA_CHAMAS)) {
    err(`Pasta nao encontrada: ${PASTA_CHAMAS}`);
    process.exit(1);
  }

  const arquivos = fs.readdirSync(PASTA_CHAMAS).filter(f => f.endsWith('.md')).sort();
  log(`${arquivos.length} arquivo(s) .md encontrado(s)`);

  const itens = [];
  let ignorados = 0;

  for (const arq of arquivos) {
    const p = parseMd(fs.readFileSync(path.join(PASTA_CHAMAS, arq), 'utf8'));
    if (p.erro) { warn(`${arq} — ${p.erro}`); ignorados++; continue; }
    itens.push({ titulo: p.titulo, texto: p.texto });
    ok(`${arq} -> "${p.titulo}" (${p.texto.length} caracteres)`);
  }

  const L = [];
  L.push('// GERADO AUTOMATICAMENTE POR build-chamas.js');
  L.push('// NAO EDITAR A MAO.');
  L.push(`// Gerado em: ${new Date().toISOString()}`);
  L.push('');
  L.push('const MICROCONTOS = [');
  for (const it of itens) {
    L.push('  {');
    L.push(`    titulo: ${JSON.stringify(it.titulo)},`);
    L.push(`    texto: ${JSON.stringify(it.texto)}`);
    L.push('  },');
  }
  L.push('];');
  L.push('');
  fs.writeFileSync(path.join(__dirname, 'conteudo-chamas.js'), L.join('\n'), 'utf8');

  log('-----------------------------');
  ok(`${itens.length} microconto(s) gerado(s), ${ignorados} ignorado(s)`);
  ok('conteudo-chamas.js gerado');
  log('build-chamas.js finalizado');
}

main();
