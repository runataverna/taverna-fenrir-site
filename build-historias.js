#!/usr/bin/env node
// build-historias.js v4
// Fix: strip de aspas do frontmatter agora remove par (início E fim), não só um lado.

const fs = require('fs');
const path = require('path');
const CONFIG = require('./_config-historias.js');

const VAULT_ROOT = process.env.VAULT_TAVERNA
  || path.join(process.env.HOME || '', 'storage/shared/Documents/Anderson lima/Anderson Lima /Taverna Fenrir');

const PASTA_VIKING = path.join(VAULT_ROOT, 'Universo Viking');
const PASTA_MITOLOGIA = path.join(VAULT_ROOT, 'Mitologia Nórdica');

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

// Strip de aspas CASADAS (mesmo tipo no início e fim)
function stripAspas(s) {
  let v = s.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

function extrairGrupo(porta) {
  if (!porta) return '';
  // Aspas retas
  let m = porta.match(/grupo\s+"([^"]+)"/);
  if (m) return m[1];
  // Aspas curvas (U+201C / U+201D)
  m = porta.match(/grupo\s+\u201C([^\u201D]+)\u201D/);
  if (m) return m[1];
  // Fallback sem aspas
  m = porta.match(/grupo\s+(.+?)\s*$/);
  if (m) return m[1].trim();
  return '';
}

function parseMd(raw, debug = false) {
  const clean = normalizar(raw);

  const fmMatch = clean.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*\n/);
  const fm = {};
  let body = clean;

  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const m = line.match(/^([\w-]+):\s*(.*?)\s*$/);
      if (m) fm[m[1]] = stripAspas(m[2]);
    });
    body = clean.slice(fmMatch[0].length);
  }

  const h1 = body.match(/^#\s+(.+?)\s*$/m);
  if (!h1) return { erro: 'sem H1' };
  const h1Text = h1[1].trim();

  let titulo = h1Text, subtitulo = '';
  const sep = h1Text.indexOf(' — ');
  if (sep > 0) {
    titulo = h1Text.slice(0, sep).trim();
    subtitulo = h1Text.slice(sep + 3).trim();
  }

  const rcMatch = body.match(/##\s+Runa conta\s*\n([\s\S]*?)(?=\n---|\n##\s|$)/);
  const texto = rcMatch ? rcMatch[1].trim() : '';

  const vsMatch = body.match(/##\s+Voc[êe]\s+sabia\?[\s\S]*?\n([\s\S]*?)(?=\n---|\n##\s|$)/);
  const voceSabia = vsMatch ? vsMatch[1].trim() : '';

  const grupo = extrairGrupo(fm.porta);

  if (debug) {
    log(`   DEBUG porta raw: ${JSON.stringify(fm.porta)}`);
    log(`   DEBUG grupo:     ${JSON.stringify(grupo)}`);
    log(`   DEBUG texto len: ${texto.length}, voceSabia len: ${voceSabia.length}`);
  }

  return { titulo, subtitulo, texto, voceSabia, grupo, fm, _temFm: !!fmMatch };
}

function processar(pasta, config, debugPrimeiro = false) {
  if (!fs.existsSync(pasta)) { err(`Pasta nao encontrada: ${pasta}`); return null; }

  const arquivos = fs.readdirSync(pasta).filter(f => f.endsWith('.md')).sort();
  const grupos = config.grupos.map(g => ({ ...g, cards: [] }));
  const grupoPorTitulo = {};
  grupos.forEach(g => { grupoPorTitulo[g.titulo] = g; });

  let lidos = 0, ignorados = 0, debugFeito = false;

  for (const arq of arquivos) {
    const rodarDebug = debugPrimeiro && !debugFeito;
    const p = parseMd(fs.readFileSync(path.join(pasta, arq), 'utf8'), rodarDebug);
    if (rodarDebug) debugFeito = true;

    if (p.erro) { warn(`${arq} — ${p.erro}`); ignorados++; continue; }
    if (!p.grupo) { warn(`${arq} — grupo vazio`); ignorados++; continue; }

    const g = grupoPorTitulo[p.grupo];
    if (!g) {
      warn(`${arq} — grupo "${p.grupo}" nao existe no _config-historias.js`);
      ignorados++;
      continue;
    }

    g.cards.push({ titulo: p.titulo, subtitulo: p.subtitulo, texto: p.texto, voceSabia: p.voceSabia });
    ok(`${arq} -> [${g.titulo}] "${p.titulo}"`);
    lidos++;
  }

  return { lidos, ignorados, grupos };
}

function gerar(nomeVar, config, grupos, output) {
  const L = [];
  L.push('// GERADO AUTOMATICAMENTE POR build-historias.js');
  L.push('// NAO EDITAR A MAO.');
  L.push(`// Gerado em: ${new Date().toISOString()}`);
  L.push('');
  L.push(`const ${nomeVar} = {`);
  L.push(`  intro: ${JSON.stringify(config.intro)},`);
  L.push(`  imagem: ${JSON.stringify(config.imagem)},`);
  L.push(`  link: ${JSON.stringify(config.link)},`);
  L.push(`  linkTexto: ${JSON.stringify(config.linkTexto)},`);
  L.push('  grupos: [');
  for (const g of grupos) {
    L.push('    {');
    L.push(`      id: ${JSON.stringify(g.id)},`);
    L.push(`      titulo: ${JSON.stringify(g.titulo)},`);
    L.push(`      subtitulo: ${JSON.stringify(g.subtitulo)},`);
    L.push('      cards: [');
    for (const c of g.cards) {
      L.push('        {');
      L.push(`          titulo: ${JSON.stringify(c.titulo)},`);
      L.push(`          subtitulo: ${JSON.stringify(c.subtitulo)},`);
      L.push(`          texto: ${JSON.stringify(c.texto)},`);
      L.push(`          voceSabia: ${JSON.stringify(c.voceSabia)}`);
      L.push('        },');
    }
    L.push('      ]');
    L.push('    },');
  }
  L.push('  ]');
  L.push('};');
  L.push('');
  fs.writeFileSync(output, L.join('\n'), 'utf8');
}

function main() {
  log('build-historias.js v4 iniciado');
  log(`Vault: ${VAULT_ROOT}`);

  log('Processando Universo Viking...');
  const viking = processar(PASTA_VIKING, CONFIG.VIKING, true);
  if (viking) {
    gerar('VIKING', CONFIG.VIKING, viking.grupos, path.join(__dirname, 'conteudo-viking.js'));
    log(`  -> ${viking.lidos} card(s), ${viking.ignorados} ignorado(s)`);
  }

  log('Processando Mitologia Nordica...');
  const mito = processar(PASTA_MITOLOGIA, CONFIG.MITOLOGIA, true);
  if (mito) {
    gerar('MITOLOGIA', CONFIG.MITOLOGIA, mito.grupos, path.join(__dirname, 'conteudo-mitologia.js'));
    log(`  -> ${mito.lidos} card(s), ${mito.ignorados} ignorado(s)`);
  }

  log('-----------------------------');
  ok('conteudo-viking.js e conteudo-mitologia.js gerados');
  log('build-historias.js v4 finalizado');
}

main();
