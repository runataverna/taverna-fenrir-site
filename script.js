/* ============================================================
   TAVERNA FENRIR — LÓGICA (final)
   ============================================================ */

const Taverna = (() => {

  let musicaLiberada = false;
  let audioRunaTocando = false;
  let salaAtual = null;
  let contoAtual = null;
  let abaAtual = 0;

  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const musica = () => $('musicaAmbiente');
  const boasVindas = () => $('boasVindas');
  const audioRuna = () => $('audioRuna');

  // FADE
  function fadeVolume(el, target, duration = 600) {
    if (!el) return;
    if (el._fade) clearInterval(el._fade);
    const steps = 20, stepTime = duration / steps;
    const start = el.volume, diff = target - start;
    let s = 0;
    el._fade = setInterval(() => {
      s++;
      if (s >= steps) { clearInterval(el._fade); el.volume = Math.max(0, Math.min(1, target)); return; }
      el.volume = Math.max(0, Math.min(1, start + diff * (s / steps)));
    }, stepTime);
  }

  function desbloquearAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      try {
        const ctx = new AC();
        if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      } catch(e) {}
    }
  }

  function restaurarMusica() {
    const t = parseFloat(localStorage.getItem('tf_musica_tempo') || '0');
    if (t > 0 && isFinite(t)) { try { musica().currentTime = t; } catch(e) {} }
  }
  function salvarTempoMusica() {
    if (musica() && !musica().paused && musica().currentTime > 0) {
      localStorage.setItem('tf_musica_tempo', musica().currentTime.toFixed(2));
    }
  }

  // ENTRAR
  function entrar() {
    const glow = $('glowEntrada');
    if (glow) {
      glow.classList.add('ativo');
      setTimeout(() => glow.classList.remove('ativo'), 1700);
    }

    setTimeout(() => {
      const entrada = $('entrada');
      if (entrada) entrada.classList.add('hidden');
      const app = $('app');
      if (app) app.classList.add('visible');
      const nav = $('navbar');
      if (nav) nav.classList.add('visible');
      const player = $('playerMusicaBox');
      if (player) player.classList.add('visible');

      ativarHeroVideo();

      desbloquearAudio();
      restaurarMusica();
      musicaLiberada = true;

      if (musica()) {
        musica().volume = CONFIG.volumes.musicaBaixa;
        musica().play().catch(e => console.log('mus:', e.name));
      }

      setTimeout(() => {
        if (boasVindas()) {
          boasVindas().volume = CONFIG.volumes.boasVindas;
          boasVindas().play().catch(e => console.log('bv:', e.name));
        }
      }, CONFIG.delays.fimIntro);

      setTimeout(() => {
        if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao, 2000);
      }, CONFIG.delays.musicaSubir);
    }, 800);
  }

  function ativarHeroVideo() {
    const iframe = $('heroIframe');
    if (iframe && !iframe.src) {
      iframe.src = `https://www.youtube.com/embed/${CONFIG.heroHall}?autoplay=1&mute=1&loop=1&playlist=${CONFIG.heroHall}&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3`;
    }
  }

  // NAVEGAÇÃO
  function irParaPortal(id) {
    const porta = PORTAS.find(p => p.id === id);
    if (!porta) return;
    const menu = $('menuLista');
    if (menu) menu.classList.remove('aberto');

    if (salaAtual) {
      const el = $('sala-' + salaAtual);
      if (el) el.classList.remove('ativa');
    }
    const hall = $('hall');
    if (hall) hall.style.display = 'none';

    const abrirSala = () => {
      const el = $('sala-' + id);
      if (el) el.classList.add('ativa');
      salaAtual = id;
      const btn = $('btnVoltar');
      if (btn) btn.classList.add('visible');
      window.scrollTo(0, 0);
      popularSlots();
      history.pushState({ sala: id }, '', '#' + id);
    };

    if (!porta.video || porta.duracao <= 0) { abrirSala(); return; }

    const titulo = $('transicaoTitulo');
    if (titulo) titulo.textContent = porta.titulo;
    const iframe = $('transicaoIframe');
    if (iframe) iframe.src = `https://www.youtube.com/embed/${porta.video}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3`;
    const wrap = $('transicaoWrap');
    if (wrap) wrap.classList.add('active');

    setTimeout(() => {
      if (wrap) wrap.classList.remove('active');
      if (iframe) iframe.src = '';
      abrirSala();
    }, porta.duracao);
  }

  function voltarAoHall() {
    if (salaAtual) {
      const el = $('sala-' + salaAtual);
      if (el) el.classList.remove('ativa');
      salaAtual = null;
    }
    const hall = $('hall');
    if (hall) hall.style.display = 'block';
    const btn = $('btnVoltar');
    if (btn) btn.classList.remove('visible');
    if (audioRunaTocando && audioRuna()) {
      audioRuna().pause(); audioRunaTocando = false;
      if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    }
    window.scrollTo(0, 0);
    history.pushState({ sala: null }, '', location.pathname);
  }

  function toggleMenu() {
    const menu = $('menuLista');
    if (menu) menu.classList.toggle('aberto');
  }

  window.addEventListener('popstate', () => {
    const m1 = $('historiaModal');
    if (m1 && m1.classList.contains('active')) { fecharHistoria(); return; }
    const m2 = $('modalHNC');
    if (m2 && m2.classList.contains('active')) { fecharHNC(); return; }
    const m3 = $('lightbox');
    if (m3 && m3.classList.contains('active')) { fecharLightbox(); return; }
    if (salaAtual) { voltarAoHall(); }
  });

  // PORTAS
  function renderizarPortas() {
    const grid = $('gridPortas');
    const menu = $('menuLista');
    if (!grid || !menu) return;
    grid.innerHTML = ''; menu.innerHTML = '';
    PORTAS.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.className = 'porta';
      btn.innerHTML = `
        <span class="porta-num">${i+1}</span>
        <span class="porta-tag">${p.tag}</span>
        <h3>${p.titulo}</h3>
        <p>${p.desc}</p>
        <span class="seta">Entrar →</span>`;
      btn.onclick = () => irParaPortal(p.id);
      grid.appendChild(btn);
      const a = document.createElement('a');
      a.textContent = (i+1) + '. ' + p.titulo;
      a.onclick = () => irParaPortal(p.id);
      menu.appendChild(a);
    });
  }

  // RUNAS NO TEXTO
  function aplicarRunasNoTexto(html) {
    if (!html) return html;
    const nomes = ['Runa', 'Halvar', 'Svala', 'Ulf', 'Bardo', 'Brokkr', 'Eitri', 'Thor', 'Fenrir', 'Odin', 'Freya', 'Loki'];
    nomes.forEach(nome => {
      const regex = new RegExp(`\\b${nome}\\b`, 'g');
      html = html.replace(regex, `<span class="nome-proprio">${nome}</span>`);
    });
    if (typeof RUNAS_TEXTO !== 'undefined') {
      Object.entries(RUNAS_TEXTO).forEach(([palavra, runa]) => {
        const regex = new RegExp(`\\b(${palavra})\\b`, 'gi');
        html = html.replace(regex, `<span class="runa-texto ${runa}">$1</span>`);
      });
    }
    return html;
  }

  // CURTIDAS
  function seedCount(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
    return 3000 + (h % 500);
  }
  function lerCurtidas() { try { return JSON.parse(localStorage.getItem('tf_curtidas') || '{}'); } catch(e) { return {}; } }
  function lerCurtidasUser() { try { return JSON.parse(localStorage.getItem('tf_curtidas_user') || '[]'); } catch(e) { return []; } }
  function salvarCurtidas(o) { localStorage.setItem('tf_curtidas', JSON.stringify(o)); }
  function salvarCurtidasUser(a) { localStorage.setItem('tf_curtidas_user', JSON.stringify(a)); }

  function getCount(id) {
    const c = lerCurtidas();
    if (c[id] === undefined) { c[id] = seedCount(id); salvarCurtidas(c); }
    return c[id];
  }

  function curtir(id, icone, btn, contador, textoEl) {
    if (!icone || !btn || !contador || !textoEl) return;
    const ja = lerCurtidasUser();
    if (ja.includes(id)) return;
    const c = lerCurtidas();
    c[id] = (c[id] || 0) + 1;
    salvarCurtidas(c);
    ja.push(id);
    salvarCurtidasUser(ja);
    icone.textContent = 'ᛗ';
    btn.classList.add('ativo');
    setTimeout(() => { btn.classList.remove('ativo'); btn.classList.add('marcado'); }, 3000);
    contador.textContent = c[id].toLocaleString('pt-BR');
    textoEl.textContent = 'Sua marca foi gravada';
  }

  function atualizarCurtir(id, icone, btn, contador, textoEl) {
    if (!icone || !btn || !contador || !textoEl) return;
    const c = lerCurtidas();
    if (c[id] === undefined) { c[id] = seedCount(id); salvarCurtidas(c); }
    const ja = lerCurtidasUser().includes(id);
    if (ja) {
      icone.textContent = 'ᛗ';
      btn.classList.add('marcado');
      textoEl.textContent = 'Sua marca foi gravada';
    } else {
      icone.textContent = '♡';
      btn.classList.remove('ativo', 'marcado');
      textoEl.textContent = 'Acenda essa história';
    }
    contador.textContent = c[id].toLocaleString('pt-BR');
  }

  function curtirConto() {
    if (!contoAtual) return;
    curtir(contoAtual.id, $('acaoCurtirIcone'), $('acaoCurtir'), $('acaoContador'), $('acaoTexto'));
  }
  function curtirHNC() {
    curtir('hnc', $('acaoCurtirIconeHNC'), $('acaoCurtirHNC'), $('acaoContadorHNC'), $('acaoTextoHNC'));
  }

  // COMPARTILHAR
  function compartilharConto() {
    if (!contoAtual) return;
    const url = window.location.origin + window.location.pathname + '#' + contoAtual.id;
    compartilhar(contoAtual.titulo + ' — Taverna Fenrir', url);
  }
  function compartilharHNC() {
    const url = window.location.origin + window.location.pathname + '#historia-nao-contada';
    compartilhar('A História Não Contada — Taverna Fenrir', url);
  }
  function compartilhar(titulo, url) {
    if (navigator.share) {
      navigator.share({ title: titulo, url: url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => alert('Link copiado!')).catch(() => {});
    }
  }

  // CONTOS
  function renderizarContos() {
    const abertura = $('contosAbertura');
    if (abertura && typeof CONTOS_ABERTURA !== 'undefined' && CONTOS_ABERTURA) {
      abertura.innerHTML = `<img src="assets/img/${CONTOS_ABERTURA}" alt="Contos" onerror="this.parentElement.innerHTML='<div class=imagem-abertura-placeholder>Suba assets/img/${CONTOS_ABERTURA}</div>'">`;
    }
    const lista = $('listaContos');
    if (!lista) return;
    lista.innerHTML = '';
    CONTOS.forEach(c => {
      const div = document.createElement('div');
      div.className = 'conto-card';
      div.onclick = () => abrirHistoria(c.id);
      const preview = c.abas ? c.abas[0].texto : c.texto;
      const previewLimpo = preview.replace(/<[^>]+>/g, '').substring(0, 140).replace(/\n/g, ' ') + '...';
      div.innerHTML = `
        <span class="conto-tag">${c.subtitulo}</span>
        <h3>${c.titulo}</h3>
        <p>${previewLimpo}</p>
        <span class="ler-conto">Ler o conto →</span>`;
      lista.appendChild(div);
    });
  }

  function renderizarMicrocontos() {
    const lista = $('listaMicrocontos');
    if (!lista) return;
    lista.innerHTML = '';
    MICROCONTOS.forEach(m => {
      const div = document.createElement('div');
      div.className = 'microconto';
      div.innerHTML = `<h4>${m.titulo}</h4><div class="texto">${aplicarRunasNoTexto(m.texto)}</div>`;
      lista.appendChild(div);
    });
  }

  // MODAL
  function abrirHistoria(id) {
    const c = CONTOS.find(x => x.id === id);
    if (!c) return;
    contoAtual = c;
    abaAtual = 0;

    const img = $('historiaImagemAbertura');
    if (img) {
      if (c.imagemAbertura) {
        img.innerHTML = `<img src="assets/img/${c.imagemAbertura}" alt="${c.titulo}" onerror="this.parentElement.innerHTML='<div class=historia-imagem-abertura-placeholder>Suba assets/img/${c.imagemAbertura}</div>'">`;
      } else { img.innerHTML = ''; }
    }

    const titulo = $('historiaTitulo');
    if (titulo) titulo.textContent = c.titulo;
    const sub = $('historiaSub');
    if (sub) sub.textContent = c.subtitulo;

    const navAbas = $('historiaAbasNav');
    if (navAbas) {
      navAbas.innerHTML = '';
      if (c.abas && c.abas.length > 1) {
        c.abas.forEach((aba, i) => {
          const b = document.createElement('button');
          b.textContent = aba.titulo;
          b.className = i === 0 ? 'ativa' : '';
          b.onclick = () => { abaAtual = i; renderizarAba(); };
          navAbas.appendChild(b);
        });
        navAbas.style.display = 'flex';
      } else {
        navAbas.style.display = 'none';
      }
    }

    const btnProx = $('btnHistoriaProxima');
    if (btnProx) btnProx.textContent = (c.abas && c.abas.length > 1) ? 'Avançar →' : 'Fechar ✕';

    renderizarAba();

    const audioBox = $('historiaAudioBox');
    if (audioRuna()) { audioRuna().pause(); audioRuna().currentTime = 0; }
    const audioBtn = $('historiaAudioBtn');
    if (audioBtn) audioBtn.textContent = '▶';
    audioRunaTocando = false;
    if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);

    if (c.audio && audioRuna()) {
      if (audioBox) audioBox.classList.add('visible');
      audioRuna().src = c.audio;
    } else {
      if (audioBox) audioBox.classList.remove('visible');
    }

    atualizarCurtir(c.id, $('acaoCurtirIcone'), $('acaoCurtir'), $('acaoContador'), $('acaoTexto'));
    renderizarSelos('historiaSelos');
    renderizarRedes('historiaRedes');
    renderizarRedes('hncRedes');

    const modal = $('historiaModal');
    if (modal) modal.classList.add('active');
    history.pushState({ modal: id }, '', '#' + id);
  }

  function renderizarAba() {
    const c = contoAtual;
    if (!c) return;
    const texto = c.abas ? c.abas[abaAtual].texto : c.texto;
    let textoHtml = aplicarRunasNoTexto(texto);
    textoHtml = textoHtml.replace(/^([A-ZÁÉÍÓÚÂÊÔÃÕÇ])/, '<span class="drop-cap-inicio">$1</span>');
    const el = $('historiaTexto');
    if (el) el.innerHTML = textoHtml;

    const navAbas = $('historiaAbasNav');
    if (navAbas) {
      navAbas.querySelectorAll('button').forEach((b, i) => {
        b.classList.toggle('ativa', i === abaAtual);
      });
    }

    const prop = $('historiaPropaganda');
    if (prop) {
      if (c.propaganda) {
        prop.innerHTML = `<img src="assets/img/${c.propaganda}" alt="Propaganda" onerror="this.parentElement.innerHTML='<div class=imagem-propaganda-placeholder>Suba assets/img/${c.propaganda}</div>'">`;
        prop.style.display = 'block';
      } else {
        prop.innerHTML = ''; prop.style.display = 'none';
      }
    }

    const linkBox = $('historiaLinkBox');
    const ultimaAba = !c.abas || abaAtual === c.abas.length - 1;
    if (linkBox && c.link && c.linkTexto && ultimaAba) {
      const link = $('historiaLink');
      if (link) { link.href = c.link; link.textContent = c.linkTexto + ' →'; }
      linkBox.classList.add('visivel');
    } else if (linkBox) {
      linkBox.classList.remove('visivel');
    }
  }

  function fecharHistoria() {
    const modal = $('historiaModal');
    if (modal) modal.classList.remove('active');
    if (audioRuna()) { audioRuna().pause(); audioRuna().currentTime = 0; }
    audioRunaTocando = false;
    const btn = $('historiaAudioBtn');
    if (btn) btn.textContent = '▶';
    if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    contoAtual = null;
    abaAtual = 0;
  }

  function proximaAba() {
    if (contoAtual && contoAtual.abas && abaAtual < contoAtual.abas.length - 1) {
      abaAtual++;
      renderizarAba();
    } else {
      fecharHistoria();
    }
  }

  function toggleHistoriaAudio() {
    const btn = $('historiaAudioBtn');
    if (!btn || !audioRuna()) return;
    if (audioRunaTocando) {
      audioRuna().pause(); btn.textContent = '▶'; audioRunaTocando = false;
      if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    } else {
      audioRuna().volume = 1;
      audioRuna().play().catch(() => {});
      btn.textContent = '❚❚'; audioRunaTocando = true;
      if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaBaixa);
    }
  }

  // SELOS
  function renderizarSelos(containerId) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = '';
    SIMBOLOS.forEach(s => {
      const div = document.createElement('div');
      div.className = 'selo';
      div.innerHTML = `<img src="assets/img/selos/${s.id}.png" alt="${s.nome}" onerror="this.outerHTML='<div class=selo-icone-fallback>${s.icone}</div>'"><div class="selo-nome">${s.nome}</div>`;
      div.onclick = () => {
        fecharHistoria();
        setTimeout(() => {
          if (s.historia === 'historia') { abrirHistoriaNaoContada(); }
          else if (s.historia === 'sobre') { irParaPortal('sobre'); }
          else { irParaPortal('contos'); setTimeout(() => abrirHistoria(s.historia), 600); }
        }, 300);
      };
      el.appendChild(div);
    });
  }

  function renderizarSelosFooter() {
    const el = $('footerSelos');
    if (!el) return;
    el.innerHTML = '';
    SIMBOLOS.forEach(s => {
      const div = document.createElement('div');
      div.className = 'selo-footer';
      div.innerHTML = `<img src="assets/img/selos/${s.id}.png" alt="${s.nome}" onerror="this.outerHTML='<div class=selo-icone-fallback>${s.icone}</div>'"><span>${s.nome}</span>`;
      div.onclick = () => {
        if (s.historia === 'historia') { abrirHistoriaNaoContada(); }
        else if (s.historia === 'sobre') { irParaPortal('sobre'); }
        else { irParaPortal('contos'); setTimeout(() => abrirHistoria(s.historia), 600); }
      };
      el.appendChild(div);
    });
  }

  function renderizarLojasFooter() {
    const el = $('footerLojas');
    if (!el) return;
    el.innerHTML = '';
    const lojas = [
      { id: 'aneis', nome: 'Anéis & Pingentes' },
      { id: 'facas', nome: 'Facas & Utensílios' },
      { id: 'casacos', nome: 'Casacos' },
      { id: 'heavymetal', nome: 'Heavy Metal & Camisetas' },
      { id: 'arte', nome: 'Arte Conceitual' }
    ];
    lojas.forEach(l => {
      const div = document.createElement('div');
      div.className = 'footer-loja-item';
      div.innerHTML = `<span>${l.nome}</span><span class="seta">→</span>`;
      div.onclick = () => irParaPortal(l.id);
      el.appendChild(div);
    });
  }

  // REDES
  function renderizarRedes(containerId) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = '';
    const r = CONFIG.redes;
    const svgs = {
      instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#c9a227" stroke-width="2.2" fill="none"/><circle cx="12" cy="12" r="4.2" stroke="#c9a227" stroke-width="2.2" fill="none"/><circle cx="17.8" cy="6.2" r="1.5" fill="#c9a227"/></svg>`,
      facebook: `<svg viewBox="0 0 24 24"><path d="M16.5 12h-2.7v8h-3.3v-8H8.5V9.4h2v-1.5c0-2 1.2-3.4 3.4-3.4h2.2v2.6h-1.5c-.7 0-1.1.4-1.1 1v1.3h2.7L16.5 12z" fill="#c9a227"/></svg>`,
      tiktok: `<svg viewBox="0 0 24 24"><path d="M20 8.5a5 5 0 01-3-1V16a6 6 0 11-6-6v3.3a2.7 2.7 0 102.7 2.7V2.5h3.3a4 4 0 003.7 4V8.5z" fill="#c9a227"/></svg>`,
      youtube: `<svg viewBox="0 0 24 24"><rect x="1.5" y="4.5" width="21" height="15" rx="4" fill="none" stroke="#c9a227" stroke-width="2"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="#c9a227"/></svg>`
    };
    ['instagram','facebook','tiktok','youtube'].forEach(red => {
      const a = document.createElement('a');
      a.href = r[red]; a.target = '_blank'; a.rel = 'noopener';
      a.setAttribute('aria-label', red);
      a.innerHTML = svgs[red];
      el.appendChild(a);
    });
  }

  // SLOTS
  function popularSlots() {
    $$('.slot-grid').forEach(grid => {
      const prefix = grid.dataset.prefix;
      const count = parseInt(grid.dataset.count || '6');
      if (grid.dataset.pronto) return;
      grid.dataset.pronto = '1';
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'slot-empty';
      emptyMsg.innerHTML = `Espaço reservado — suba <em>${prefix}1.png</em> em <em>assets/img/</em>`;
      grid.appendChild(emptyMsg);
      let alguma = false;
      for (let i = 1; i <= count; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        const img = document.createElement('img');
        img.alt = prefix + i;
        let tentouJpg = false;
        img.onload = () => { slot.classList.add('visivel'); if (!alguma) { alguma = true; emptyMsg.style.display = 'none'; } };
        img.onerror = () => {
          if (!tentouJpg) { tentouJpg = true; img.src = `assets/img/${prefix}${i}.jpg`; }
          else { slot.remove(); }
        };
        img.src = `assets/img/${prefix}${i}.png`;
        slot.appendChild(img);
        grid.appendChild(slot);
      }
    });
  }

  // SOBRE
  function renderizarSobreRuna() {
    const c = $('sobreRunaConteudo');
    if (!c) return;
    const s = SOBRE_RUNA;
    let html = `<div class="sobre-grid"><div class="sobre-retrato">
      <img src="assets/img/runa-retrato.jpg" alt="Runa" onerror="this.outerHTML='<div class=retrato-placeholder>Suba assets/img/runa-retrato.jpg</div>'">
    </div><div>
      <div class="ficha-tecnica">
        <p><strong>Nome:</strong> ${s.ficha.nome}</p>
        <p><strong>Idade:</strong> ${s.ficha.idade}</p>
        <p><strong>Origem:</strong> ${s.ficha.origem}</p>
        <p><strong>Ocupação:</strong> ${s.ficha.ocupacao}</p>
      </div>
      <h3 style="font-size:1.05rem;margin-bottom:10px">Aparência</h3>
      <ul class="lista-atributos">${s.aparencia.map(a => `<li>${a}</li>`).join('')}</ul>
      <h3 style="font-size:1.05rem;margin-bottom:10px">Personalidade</h3>
      <ul class="lista-atributos">${s.personalidade.map(a => `<li>${a}</li>`).join('')}</ul>
    </div></div>
    <div class="centro"><button class="btn-player-runa" onclick="Taverna.ouvirHistoriaRuna()">▶ Ouvir a Runa contar a história dela</button></div>
    <h3 class="hall-titulo" style="margin-top:50px">A história, contada por ela mesma</h3>
    <p class="hall-sub">Senta. A cadeira é sua. O hidromel está quente.</p>
    <div class="monologo">`;
    s.monologo.forEach(m => {
      const txt = aplicarRunasNoTexto(m.texto);
      if (m.tipo === 'p') html += `<p>${txt}</p>`;
      else if (m.tipo === 'citacao') html += `<p class="citacao">${txt}</p>`;
      else if (m.tipo === 'final') html += `<p class="citacao-final">${txt}</p>`;
      else if (m.tipo === 'assinatura') html += `<p class="assinatura">${txt}</p>`;
    });
    html += `</div>`;
    if (s.videoPropaganda) {
      html += `
        <div class="sobre-video-propaganda">
          <iframe src="https://www.youtube.com/embed/${s.videoPropaganda}?autoplay=1&mute=1&loop=1&playlist=${s.videoPropaganda}&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3" allow="autoplay; encrypted-media" title="Runa e o pingente"></iframe>
        </div>
        <div class="sobre-link-centro">
          <a class="btn-venda" href="${s.linkPropaganda}" target="_blank" rel="noopener">${s.linkPropagandaTexto} →</a>
        </div>`;
    }
    c.innerHTML = html;
  }

  function ouvirHistoriaRuna() {
    const audio = audioRuna();
    const btn = document.querySelector('.btn-player-runa');
    if (!audio) return;
    if (audioRunaTocando) {
      audio.pause(); audio.currentTime = 0; audioRunaTocando = false;
      if (btn) btn.innerHTML = '▶ Ouvir a Runa contar a história dela';
      if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    } else {
      const srcFinal = SOBRE_RUNA.audio;
      if (!audio.src || !audio.src.endsWith(srcFinal)) audio.src = srcFinal;
      audio.volume = 1;
      if (audio.readyState >= 2) {
        tocarHistoriaRuna(audio, btn);
      } else {
        const onReady = () => {
          audio.removeEventListener('canplay', onReady);
          tocarHistoriaRuna(audio, btn);
        };
        audio.addEventListener('canplay', onReady);
        audio.load();
      }
    }
  }

  function tocarHistoriaRuna(audio, btn) {
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        audioRunaTocando = true;
        if (btn) btn.innerHTML = '❚❚ Pausar história';
        if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaBaixa);
      }).catch(e => {
        console.error('Audio falhou:', e.name, e.message);
        audioRunaTocando = false;
        if (btn) btn.innerHTML = '▶ Ouvir a Runa contar a história dela';
      });
    }
  }

  // VIKING
  function renderizarViking() {
    const intro = $('universoIntro');
    if (intro) intro.textContent = VIKING.intro;
    renderizarImagemAbertura('universoAbertura', VIKING.imagem);
    const c = $('universoGrupos');
    if (!c) return;
    c.innerHTML = '';
    VIKING.grupos.forEach(g => {
      const div = document.createElement('div');
      div.className = 'grupo-mae';
      let cards = '';
      g.cards.forEach(cd => {
        cards += `<div class="card"><h3>${cd.titulo}</h3><p>${cd.texto}</p>${cd.voceSabia && cd.voceSabia !== '[A PREENCHER]' ? `<div class="voce-sabia"><strong>💡 VOCÊ SABIA?</strong>${cd.voceSabia}</div>` : ''}</div>`;
      });
      div.innerHTML = `<h3 class="grupo-mae-titulo">${g.titulo}</h3><p class="grupo-mae-sub">${g.subtitulo}</p><div class="cards">${cards}</div>`;
      c.appendChild(div);
    });
    c.innerHTML += `<div class="centro" style="margin-top:30px"><a class="btn-venda" href="${VIKING.link}" target="_blank" rel="noopener">${VIKING.linkTexto} →</a></div>`;
  }

  // MITOLOGIA
  function renderizarMitologia() {
    const intro = $('mitologiaIntro');
    if (intro) intro.textContent = MITOLOGIA.intro;
    renderizarImagemAbertura('mitologiaAbertura', MITOLOGIA.imagem);
    const c = $('mitologiaGrupos');
    if (!c) return;
    c.innerHTML = '';
    MITOLOGIA.grupos.forEach(g => {
      const div = document.createElement('div');
      div.className = 'grupo-mae';
      let cards = '';
      g.cards.forEach(cd => {
        cards += `<div class="card"><h3>${cd.titulo}</h3><p>${cd.texto}</p>${cd.voceSabia && cd.voceSabia !== '[A PREENCHER]' ? `<div class="voce-sabia"><strong>💡 VOCÊ SABIA?</strong>${cd.voceSabia}</div>` : ''}</div>`;
      });
      div.innerHTML = `<h3 class="grupo-mae-titulo">${g.titulo}</h3><p class="grupo-mae-sub">${g.subtitulo}</p><div class="cards">${cards}</div>`;
      c.appendChild(div);
    });
    c.innerHTML += `<div class="centro" style="margin-top:30px"><a class="btn-venda" href="${MITOLOGIA.link}" target="_blank" rel="noopener">${MITOLOGIA.linkTexto} →</a></div>`;
  }

  // VENDAS
  function renderizarVendas() {
    ['aneis','facas','casacos','heavymetal'].forEach(id => {
      const v = SALAS_VENDA[id];
      if (!v) return;
      const t = $(id + 'Titulo');
      const s = $(id + 'Subtitulo');
      const txt = $(id + 'Texto');
      const link = $(id + 'Link');
      if (t) t.textContent = v.titulo;
      if (s) s.textContent = v.subtitulo;
      renderizarImagemAbertura(id + 'Abertura', v.imagem);
      if (txt) txt.innerHTML = aplicarRunasNoTexto(v.texto);
      const prop = $(id + 'Propaganda');
      if (prop && v.propaganda) {
        prop.innerHTML = `<img src="assets/img/${v.propaganda}" alt="Propaganda" onerror="this.parentElement.innerHTML='<div class=imagem-propaganda-placeholder>Suba assets/img/${v.propaganda}</div>'">`;
      }
      if (link) { link.href = v.link; link.textContent = v.linkTexto + ' →'; }
    });
  }

  function renderizarImagemAbertura(containerId, src) {
    const el = $(containerId);
    if (!el || !src) return;
    el.innerHTML = `<img src="assets/img/${src}" alt="Abertura" onerror="this.parentElement.innerHTML='<div class=imagem-abertura-placeholder>Suba assets/img/${src}</div>'">`;
  }

  // HNC
  function abrirHistoriaNaoContada() {
    const el = $('hncTexto');
    if (el) el.innerHTML = aplicarRunasNoTexto(HISTORIA_NAO_CONTADA.texto);
    renderizarRedes('hncRedes');
    atualizarCurtir('hnc', $('acaoCurtirIconeHNC'), $('acaoCurtirHNC'), $('acaoContadorHNC'), $('acaoTextoHNC'));
    const modal = $('modalHNC');
    if (modal) modal.classList.add('active');
    history.pushState({ hnc: true }, '', '#historia-nao-contada');
  }
  function fecharHNC() {
    const modal = $('modalHNC');
    if (modal) modal.classList.remove('active');
  }

  // LIGHTBOX
  function abrirLightbox(src) {
    const img = $('lightboxImg');
    const box = $('lightbox');
    if (img) img.src = src;
    if (box) box.classList.add('active');
  }
  function fecharLightbox() {
    const box = $('lightbox');
    if (box) box.classList.remove('active');
  }

  function toggleMusica() {
    if (!musica()) return;
    if (musica().paused) { musica().play(); if ($('btnMusica')) $('btnMusica').textContent = '❚❚'; }
    else { musica().pause(); if ($('btnMusica')) $('btnMusica').textContent = '▶'; salvarTempoMusica(); }
  }

  // INIT
  function init() {
    renderizarPortas();
    renderizarContos();
    renderizarMicrocontos();
    renderizarSobreRuna();
    renderizarViking();
    renderizarMitologia();
    renderizarVendas();
    renderizarSelosFooter();
    renderizarLojasFooter();
    renderizarRedes('footerRedes');

    // Listener do áudio da Runa — só depois que tudo existe
    const a = audioRuna();
    if (a) {
      a.addEventListener('ended', () => {
        audioRunaTocando = false;
        const btn = $('historiaAudioBtn');
        if (btn) btn.textContent = '▶';
        if (musicaLiberada && musica()) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
      });
    }

    setInterval(salvarTempoMusica, 5000);
    window.addEventListener('beforeunload', salvarTempoMusica);
    document.addEventListener('visibilitychange', () => { if (document.hidden) salvarTempoMusica(); });

    document.addEventListener('click', (e) => {
      const menu = $('menuLista'), toggle = document.querySelector('.menu-toggle');
      if (!menu || !toggle) return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) menu.classList.remove('aberto');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { fecharHistoria(); fecharHNC(); fecharLightbox(); }
    });

    const m1 = $('modalHNC');
    if (m1) m1.addEventListener('click', (e) => { if (e.target.id === 'modalHNC') fecharHNC(); });
    const m2 = $('historiaModal');
    if (m2) m2.addEventListener('click', (e) => { if (e.target.id === 'historiaModal') fecharHistoria(); });
  }

  return {
    entrar, irParaPortal, voltarAoHall, toggleMenu,
    abrirHistoria, fecharHistoria, toggleHistoriaAudio, ouvirHistoriaRuna,
    curtirConto, curtirHNC, compartilharConto, compartilharHNC,
    abrirHistoriaNaoContada, fecharHNC,
    abrirLightbox, fecharLightbox,
    toggleMusica, proximaAba, init
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Taverna.init);
} else {
  Taverna.init();
  }
