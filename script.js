/* ============================================================
   TAVERNA FENRIR — LÓGICA
   ============================================================ */

const Taverna = (() => {

  // ============================================================
  // ESTADO INTERNO
  // ============================================================
  let musicaLiberada = false;
  let audioRunaTocando = false;
  let salaAtual = null;
  let contoAtual = null;
  let abaAtual = 0;
  const carrosselIndex = {};

  const carrosselData = {
    aneis: [],
    facas: [],
    heavymetal: []
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const musica = () => $('musicaAmbiente');
  const boasVindas = () => $('boasVindas');
  const audioRuna = () => $('audioRuna');

  // ============================================================
  // FADE DE VOLUME
  // ============================================================
  function fadeVolume(el, target, duration = 600) {
    if (!el) return;
    if (el._fade) clearInterval(el._fade);
    const steps = 20;
    const stepTime = duration / steps;
    const start = el.volume;
    const diff = target - start;
    let s = 0;
    el._fade = setInterval(() => {
      s++;
      if (s >= steps) {
        clearInterval(el._fade);
        el.volume = Math.max(0, Math.min(1, target));
        return;
      }
      el.volume = Math.max(0, Math.min(1, start + diff * (s / steps)));
    }, stepTime);
  }

  // ============================================================
  // MÚSICA PERSISTENTE
  // ============================================================
  function restaurarMusica() {
    const t = parseFloat(localStorage.getItem('tf_musica_tempo') || '0');
    if (t > 0 && isFinite(t)) {
      try { musica().currentTime = t; } catch(e) {}
    }
  }
  function salvarTempoMusica() {
    if (musica() && !musica().paused && musica().currentTime > 0) {
      localStorage.setItem('tf_musica_tempo', musica().currentTime.toFixed(2));
    }
  }

  // ============================================================
  // ENTRAR
  // ============================================================
  function entrar() {
    $('entrada').classList.add('hidden');
    $('introWrap').classList.add('active');

    // Música + boas-vindas no mesmo clique
    restaurarMusica();
    boasVindas().volume = CONFIG.volumes.boasVindas;
    boasVindas().play().catch(e => console.log('bv:', e));

    musicaLiberada = true;
    musica().volume = CONFIG.volumes.musicaBaixa;
    musica().play().catch(e => console.log('mus:', e));

    // Intro
    const src = `https://www.youtube.com/embed/${CONFIG.intro}?autoplay=1&mute=1&loop=1&playlist=${CONFIG.intro}&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3`;
    $('introIframe').src = src;

    // Revela o app atrás
    setTimeout(() => {
      $('app').classList.add('visible');
      $('navbar').classList.add('visible');
      $('playerMusicaBox').classList.add('visible');
    }, CONFIG.delays.boasVindas);

    // Fecha intro
    setTimeout(finalizarIntro, CONFIG.delays.fimIntro);

    // Sobe a música
    setTimeout(() => {
      if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaPadrao, 2000);
    }, CONFIG.delays.musicaSubir);
  }

  function finalizarIntro() {
    $('introIframe').src = '';
    $('introWrap').classList.remove('active');
  }

  // ============================================================
  // NAVEGAÇÃO ENTRE SALAS
  // ============================================================
  function irParaPortal(id) {
    const porta = PORTAS.find(p => p.id === id);
    if (!porta) return;

    $('menuLista').classList.remove('aberto');

    if (salaAtual) {
      const el = $('sala-' + salaAtual);
      if (el) el.classList.remove('ativa');
    }
    $('hall').style.display = 'none';

    const abrirSala = () => {
      const el = $('sala-' + id);
      if (el) el.classList.add('ativa');
      salaAtual = id;
      $('btnVoltar').classList.add('visible');
      window.scrollTo(0, 0);
      popularSlots();
      if (id === 'aneis') construirCarrossel('aneis');
      if (id === 'facas') construirCarrossel('facas');
      if (id === 'heavymetal') construirCarrossel('heavymetal');
    };

    if (!porta.video || porta.duracao <= 0) {
      abrirSala();
      return;
    }

    $('transicaoTitulo').textContent = porta.titulo;
    $('transicaoFallback').style.backgroundImage = "url('assets/img/entrada-taverna.jpg')";
    $('transicaoIframe').src = `https://www.youtube.com/embed/${porta.video}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3`;
    $('transicaoWrap').classList.add('active');

    setTimeout(() => {
      $('transicaoWrap').classList.remove('active');
      $('transicaoIframe').src = '';
      abrirSala();
    }, porta.duracao);
  }

  function voltarAoHall() {
    if (salaAtual) {
      const el = $('sala-' + salaAtual);
      if (el) el.classList.remove('ativa');
      salaAtual = null;
    }
    $('hall').style.display = 'block';
    $('btnVoltar').classList.remove('visible');
    // Pausa áudio da Runa se estiver tocando
    if (audioRunaTocando) {
      audioRuna().pause();
      audioRunaTocando = false;
      if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleMenu() {
    $('menuLista').classList.toggle('aberto');
  }

  // ============================================================
  // RENDERIZAR PORTAS + MENU
  // ============================================================
  function renderizarPortas() {
    const grid = $('gridPortas');
    const menu = $('menuLista');
    grid.innerHTML = '';
    menu.innerHTML = '';

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

    // Hero video
    $('heroIframe').src = `https://www.youtube.com/embed/${CONFIG.heroHall}?autoplay=1&mute=1&loop=1&playlist=${CONFIG.heroHall}&controls=0&modestbranding=1&playsinline=1&rel=0&fs=0&iv_load_policy=3`;
  }

  // ============================================================
  // CURTIDAS
  // ============================================================
  function seedCount(titulo) {
    let h = 0;
    for (let i = 0; i < titulo.length; i++) h = (h * 31 + titulo.charCodeAt(i)) % 997;
    return 3000 + (h % 500);
  }
  function lerCurtidas() { try { return JSON.parse(localStorage.getItem('tf_curtidas') || '{}'); } catch(e) { return {}; } }
  function lerCurtidasUser() { try { return JSON.parse(localStorage.getItem('tf_curtidas_user') || '[]'); } catch(e) { return []; } }
  function salvarCurtidas(o) { localStorage.setItem('tf_curtidas', JSON.stringify(o)); }
  function salvarCurtidasUser(a) { localStorage.setItem('tf_curtidas_user', JSON.stringify(a)); }

  function getCount(id) {
    const c = lerCurtidas();
    if (c[id] === undefined) {
      const conto = CONTOS.find(x => x.id === id);
      c[id] = seedCount(conto ? conto.titulo : id);
      salvarCurtidas(c);
    }
    return c[id];
  }

  function curtir(id, ev) {
    if (ev) ev.stopPropagation();
    const ja = lerCurtidasUser();
    if (ja.includes(id)) return;
    const c = lerCurtidas();
    c[id] = (c[id] || 0) + 1;
    salvarCurtidas(c);
    ja.push(id);
    salvarCurtidasUser(ja);
    atualizarBotaoCurtir(id, true);
  }

  function atualizarBotaoCurtir(id, animar) {
    const el = document.querySelector(`.conto-marca[data-id="${id}"]`);
    if (!el) return;
    el.querySelector('.marca-count').textContent = getCount(id).toLocaleString('pt-BR');
    const ja = lerCurtidasUser().includes(id);
    el.classList.toggle('curtido', ja);
    if (animar) {
      el.classList.remove('curtido');
      void el.offsetWidth;
      el.classList.add('curtido');
    }
  }

  // ============================================================
  // RENDERIZAR CONTOS
  // ============================================================
  function renderizarContos() {
    const lista = $('listaContos');
    lista.innerHTML = '';
    CONTOS.forEach(c => {
      const count = getCount(c.id).toLocaleString('pt-BR');
      const curtido = lerCurtidasUser().includes(c.id);
      const div = document.createElement('div');
      div.className = 'conto-card';
      div.onclick = () => abrirHistoria(c.id);
      div.innerHTML = `
        <span class="conto-tag">${c.subtitulo}</span>
        <h3>${c.titulo}</h3>
        <p>${extrairPreview(c)}</p>
        <div class="conto-marca ${curtido?'curtido':''}" data-id="${c.id}" onclick="Taverna.curtir('${c.id}', event)">
          <span class="runa-icon">ᛗ</span>
          <span class="marca-texto">Deixe sua marca nesta história</span>
          <span class="marca-count">${count}</span>
        </div>
        <span class="ler-conto">Ler o conto →</span>`;
      lista.appendChild(div);
    });
  }

  function extrairPreview(c) {
    const txt = c.abas ? c.abas[0].texto : c.texto;
    return txt.substring(0, 140).replace(/\n/g, ' ') + '...';
  }

  // ============================================================
  // RENDERIZAR MICROCONTOS (A Dança das Chamas)
  // ============================================================
  function renderizarMicrocontos() {
    const lista = $('listaMicrocontos');
    lista.innerHTML = '';
    MICROCONTOS.forEach(m => {
      const div = document.createElement('div');
      div.className = 'microconto';
      div.innerHTML = `
        <h4>${m.titulo}</h4>
        <div class="texto">${m.texto}</div>`;
      lista.appendChild(div);
    });
  }

  // ============================================================
  // MODAL DE CONTO
  // ============================================================
  function abrirHistoria(id) {
    const c = CONTOS.find(x => x.id === id);
    if (!c) return;
    contoAtual = c;
    abaAtual = 0;

    $('historiaTitulo').textContent = c.titulo;
    $('historiaSub').textContent = c.subtitulo;
    $('historiaRodape').textContent = c.rodape || '';

    // Abas nav
    const navAbas = $('historiaAbasNav');
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

    // Botões navegação
    $('historiaNav').style.display = 'flex';
    $('btnHistoriaAnterior').textContent = '← Voltar ao Salão';
    $('btnHistoriaProxima').textContent = (c.abas && c.abas.length > 1) ? 'Avançar →' : 'Fechar ✕';
    $('btnHistoriaAnterior').onclick = () => fecharHistoria();
    $('btnHistoriaProxima').onclick = () => {
      if (c.abas && c.abas.length > 1 && abaAtual < c.abas.length - 1) {
        abaAtual++;
        renderizarAba();
      } else {
        fecharHistoria();
      }
    };

    // Áudio
    const audioBox = $('historiaAudioBox');
    audioRuna().pause(); audioRuna().currentTime = 0;
    $('historiaAudioBtn').textContent = '▶';
    audioRunaTocando = false;
    if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    if (c.audio) {
      audioBox.classList.add('visible');
      audioRuna().src = c.audio;
    } else {
      audioBox.classList.remove('visible');
    }

    // Selos
    renderizarSelosModal();

    // Redes
    renderizarRedes('historiaRedes');
    $('historiaRedesAcima').textContent = CONFIG.textos.redesAcima;
    $('historiaRedesAbaixo').textContent = CONFIG.textos.redesAbaixo;

    renderizarAba();
    $('historiaModal').classList.add('active');
  }

  function renderizarAba() {
    const c = contoAtual;
    if (!c) return;
    const texto = c.abas ? c.abas[abaAtual].texto : c.texto;
    $('historiaTexto').textContent = texto;

    // Atualiza botões de aba
    const navAbas = $('historiaAbasNav');
    navAbas.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('ativa', i === abaAtual);
    });

    // Vitrine (carrossel + link)
    const vitrine = $('historiaVitrine');
    vitrine.innerHTML = '';

    if (c.imagens && c.imagens.length) {
      // Carrossel de imagens
      const idCar = 'modal-' + c.id;
      vitrine.innerHTML = `
        <div class="carrossel-wrapper">
          <div class="carrossel" data-carrossel="${idCar}">
            <div class="carrossel-track"></div>
            <button class="carrossel-btn prev" onclick="Taverna.moverCarrossel('${idCar}',-1)">‹</button>
            <button class="carrossel-btn next" onclick="Taverna.moverCarrossel('${idCar}',1)">›</button>
          </div>
          <div class="carrossel-indicadores" data-ind="${idCar}"></div>
        </div>`;
      carrosselData[idCar] = c.imagens.map(src => ({ tipo: 'img', src }));
      if (c.video) carrosselData[idCar].splice(1, 0, { tipo: 'video', id: c.video });
      carrosselIndex[idCar] = 0;
      setTimeout(() => construirCarrossel(idCar), 50);
    } else if (c.video) {
      vitrine.innerHTML = `
        <div class="carrossel-wrapper">
          <div class="carrossel" data-carrossel="modal-${c.id}">
            <div class="carrossel-track">
              <div class="carrossel-slide">
                <iframe src="https://www.youtube.com/embed/${c.video}?controls=1&modestbranding=1&playsinline=1&rel=0" allow="autoplay; encrypted-media"></iframe>
              </div>
            </div>
          </div>
        </div>`;
    }

    // Link de compra só na última aba
    if (c.link && c.linkTexto) {
      const ultimaAba = !c.abas || abaAtual === c.abas.length - 1;
      if (ultimaAba) {
        vitrine.innerHTML += `
          <div class="centro" style="margin-top:20px">
            <a class="btn-venda" href="${c.link}" target="_blank" rel="noopener">${c.linkTexto} →</a>
          </div>`;
      }
    }
  }

  function fecharHistoria() {
    $('historiaModal').classList.remove('active');
    audioRuna().pause();
    audioRuna().currentTime = 0;
    audioRunaTocando = false;
    $('historiaAudioBtn').textContent = '▶';
    if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    contoAtual = null;
    abaAtual = 0;
  }

  function toggleHistoriaAudio() {
    const btn = $('historiaAudioBtn');
    if (audioRunaTocando) {
      audioRuna().pause();
      btn.textContent = '▶';
      audioRunaTocando = false;
      if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaPadrao);
    } else {
      audioRuna().volume = 1;
      audioRuna().play().catch(e => console.log(e));
      btn.textContent = '❚❚';
      audioRunaTocando = true;
      if (musicaLiberada) fadeVolume(musica(), CONFIG.volumes.musicaBaixa);
    }
  }

  // ============================================================
  // SELOS NO MODAL
  // ============================================================
  function renderizarSelosModal() {
    const grid = $('historiaSelos');
    grid.innerHTML = '';
    SIMBOLOS.forEach(s => {
      const el = document.createElement('div');
      el.className = 'selo';
      el.innerHTML = `
        <div class="selo-icone">${s.icone}</div>
        <div class="selo-nome">${s.nome}</div>`;
      el.onclick = () => {
        // Se o conto vinculado é o atual, fecha modal
        const contoVinculado = CONTOS.find(c => c.id === s.historia);
        fecharHistoria();
        setTimeout(() => {
          if (contoVinculado) {
            irParaPortal('contos');
            setTimeout(() => abrirHistoria(s.historia), 500);
          } else {
            irParaPortal(s.historia);
          }
        }, 300);
      };
      grid.appendChild(el);
    });
  }

  // ============================================================
  // RENDERIZAR SIMBOLOGIA DO HALL
  // ============================================================
  function renderizarSimbologia() {
    $('simbologiaTitulo').textContent = CONFIG.textos.simbologiaTitulo;
    $('simbologiaSub').textContent = CONFIG.textos.simbologiaSub;
    const grid = $('simbologiaGrid');
    grid.innerHTML = '';
    SIMBOLOS.forEach(s => {
      const el = document.createElement('div');
      el.className = 'simbolo';
      el.innerHTML = `
        <div class="simbolo-icone">${s.icone}</div>
        <div class="simbolo-nome">${s.nome}</div>`;
      el.onclick = () => {
        const contoVinculado = CONTOS.find(c => c.id === s.historia);
        if (contoVinculado) {
          irParaPortal('contos');
          setTimeout(() => abrirHistoria(s.historia), 500);
        } else {
          irParaPortal(s.historia);
        }
      };
      grid.appendChild(el);
    });
  }

  // ============================================================
  // RENDERIZAR REDES SOCIAIS
  // ============================================================
  function renderizarRedes(containerId) {
    const el = $(containerId);
    if (!el) return;
    el.innerHTML = '';

    const r = CONFIG.redes;

    const svgs = {
      instagram: `<svg viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ig${containerId}" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#feda75"/><stop offset="25%" stop-color="#fa7e1e"/><stop offset="50%" stop-color="#d62976"/><stop offset="75%" stop-color="#962fbf"/><stop offset="100%" stop-color="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig${containerId})" stroke-width="2.4"/><circle cx="12" cy="12" r="4.2" stroke="url(#ig${containerId})" stroke-width="2.4"/><circle cx="17.8" cy="6.2" r="1.6" fill="url(#ig${containerId})"/></svg>`,
      facebook: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1877F2"/><path d="M16.5 12h-2.7v8h-3.3v-8H8.5V9.4h2v-1.5c0-2 1.2-3.4 3.4-3.4h2.2v2.6h-1.5c-.7 0-1.1.4-1.1 1v1.3h2.7L16.5 12z" fill="#fff"/></svg>`,
      tiktok: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#000"/><path d="M20 8.5a5 5 0 01-3-1V16a6 6 0 11-6-6v3.3a2.7 2.7 0 102.7 2.7V2.5h3.3a4 4 0 003.7 4V8.5z" fill="#fff"/><path d="M20 8.5a5 5 0 01-3-1V16a6 6 0 11-6-6v3.3a2.7 2.7 0 102.7 2.7V2.5h3.3a4 4 0 003.7 4V8.5z" fill="#25F4EE" opacity=".55" transform="translate(-1.5,-.5)"/><path d="M20 8.5a5 5 0 01-3-1V16a6 6 0 11-6-6v3.3a2.7 2.7 0 102.7 2.7V2.5h3.3a4 4 0 003.7 4V8.5z" fill="#FE2C55" opacity=".55" transform="translate(1.5,.5)"/></svg>`,
      youtube: `<svg viewBox="0 0 24 24"><rect x="1.5" y="4.5" width="21" height="15" rx="4" fill="#FF0000"/><path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff"/></svg>`
    };

    ['instagram', 'facebook', 'tiktok', 'youtube'].forEach(red => {
      const a = document.createElement('a');
      a.href = r[red];
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', red);
      a.innerHTML = svgs[red];
      el.appendChild(a);
    });
  }

  // ============================================================
  // SOBRE A RUNA
  // ============================================================
  function renderizarSobreRuna() {
    const container = $('sobreRunaConteudo');
    if (!container) return;
    const s = SOBRE_RUNA;

    let html = `
      <div class="sobre-grid">
        <div class="sobre-retrato">
          <img src="assets/img/runa-retrato.jpg" alt="Runa"
               onerror="this.outerHTML='&lt;div class=&quot;retrato-placeholder&quot;&gt;Retrato da Runa&lt;br&gt;(suba assets/img/runa-retrato.jpg)&lt;/div&gt;'">
        </div>
        <div>
          <div class="ficha-tecnica">
            <p><strong>Nome:</strong> ${s.ficha.nome}</p>
            <p><strong>Idade:</strong> ${s.ficha.idade}</p>
            <p><strong>Origem:</strong> ${s.ficha.origem}</p>
            <p><strong>Ocupação:</strong> ${s.ficha.ocupacao}</p>
          </div>
          <h3 style="font-size:1.05rem;margin-bottom:10px">Aparência</h3>
          <ul class="lista-atributos">
            ${s.aparencia.map(a => `<li>${a}</li>`).join('')}
          </ul>
          <h3 style="font-size:1.05rem;margin-bottom:10px">Personalidade</h3>
          <ul class="lista-atributos">
            ${s.personalidade.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="centro">
        <button class="btn-player-runa" onclick="Taverna.ouvirHistoriaRuna()">
          ▶ Ouvir a Runa contar a história dela
        </button>
      </div>

      <h3 class="hall-titulo" style="margin-top:50px">A história, contada por ela mesma</h3>
      <p class="hall-sub">Senta. A cadeira é sua. O hidromel está quente.</p>

      <div class="monologo">`;

    s.monologo.forEach(m => {
      if (m.tipo === 'p') html += `<p>${m.texto}</p>`;
      else if (m.tipo === 'citacao') html += `<p class="citacao">${m.texto}</p>`;
      else if (m.tipo === 'final') html += `<p class="citacao-final">${m.texto}</p>`;
      else if (m.tipo === 'assinatura') html += `<p class="assinatura">${m.texto}</p>`;
    });

    html += `</div>`;

    // Carrossel do pingente (dados fixos)
    html += `
      <div class="carrossel-wrapper" style="margin-top:50px">
        <h3 class="vitrine-titulo" style="text-align:center;color:#c9a227;font-family:'Cinzel',serif;letter-spacing:2px;margin-bottom:14px">O Pingente de Mjolnir</h3>
        <div class="carrossel" data-carrossel="pingente">
          <div class="carrossel-track"></div>
          <button class="carrossel-btn prev" onclick="Taverna.moverCarrossel('pingente',-1)">‹</button>
          <button class="carrossel-btn next" onclick="Taverna.moverCarrossel('pingente',1)">›</button>
        </div>
        <div class="carrossel-indicadores" data-ind="pingente"></div>
        <div class="centro" style="margin-top:20px">
          <a class="btn-venda" href="https://meli.la/2d46Yr4" target="_blank" rel="noopener">Conhecer as relíquias da Runa →</a>
        </div>
      </div>

      <h3 class="hall-titulo" style="margin-top:60px">A vida em imagens</h3>
      <p class="hall-sub">Do vilarejo aos 23 invernos. (Suba <em>runa1.png</em>, <em>runa2.png</em>... em <em>assets/img/</em>)</p>
      <div class="slot-grid" data-prefix="runa" data-count="10"></div>`;

    container.innerHTML = html;

    // Pingente carrossel
    carrosselData['pingente'] = [
      { tipo: 'img', src: 'assets/img/runapingente1.png' },
      { tipo: 'video', id: 'ACjrIQGb0tk' },
      { tipo: 'img', src: 'assets/img/runapingente2.png' },
      { tipo: 'img', src: 'assets/img/runapingente3.png' },
      { tipo: 'img', src: 'assets/img/runapingente4.png' }
    ];
    carrosselIndex['pingente'] = 0;
    setTimeout(() => construirCarrossel('pingente'), 100);

    popularSlots();
  }

  function ouvirHistoriaRuna() {
    abrirHistoria('runas');
  }

  // ============================================================
  // UNIVERSO VIKING
  // ============================================================
  function renderizarViking() {
    $('universoIntro').textContent = VIKING.intro;
    const container = $('universoGrupos');
    container.innerHTML = '';

    VIKING.grupos.forEach(g => {
      const div = document.createElement('div');
      div.className = 'grupo-mae';
      let cardsHtml = '';
      g.cards.forEach(c => {
        cardsHtml += `
          <div class="card">
            <h3>${c.titulo}</h3>
            <p>${c.texto}</p>
            ${c.voceSabia && c.voceSabia !== '[A PREENCHER]' ? `
              <div class="voce-sabia">
                <strong>💡 VOCÊ SABIA?</strong>
                ${c.voceSabia}
              </div>` : ''}
          </div>`;
      });
      div.innerHTML = `
        <h3 class="grupo-mae-titulo">${g.titulo}</h3>
        <p class="grupo-mae-sub">${g.subtitulo}</p>
        <div class="cards">${cardsHtml}</div>`;
      container.appendChild(div);
    });

    // Botão de venda
    container.innerHTML += `
      <div class="centro" style="margin-top:30px">
        <a class="btn-venda" href="${VIKING.link}" target="_blank" rel="noopener">${VIKING.linkTexto} →</a>
      </div>`;
  }

  // ============================================================
  // MITOLOGIA NÓRDICA
  // ============================================================
  function renderizarMitologia() {
    $('mitologiaIntro').textContent = MITOLOGIA.intro;
    const container = $('mitologiaGrupos');
    container.innerHTML = '';

    MITOLOGIA.grupos.forEach(g => {
      const div = document.createElement('div');
      div.className = 'grupo-mae';
      let cardsHtml = '';
      g.cards.forEach(c => {
        cardsHtml += `
          <div class="card">
            <h3>${c.titulo}</h3>
            <p>${c.texto}</p>
            ${c.voceSabia && c.voceSabia !== '[A PREENCHER]' ? `
              <div class="voce-sabia">
                <strong>💡 VOCÊ SABIA?</strong>
                ${c.voceSabia}
              </div>` : ''}
          </div>`;
      });
      div.innerHTML = `
        <h3 class="grupo-mae-titulo">${g.titulo}</h3>
        <p class="grupo-mae-sub">${g.subtitulo}</p>
        <div class="cards">${cardsHtml}</div>`;
      container.appendChild(div);
    });

    container.innerHTML += `
      <div class="centro" style="margin-top:30px">
        <a class="btn-venda" href="${MITOLOGIA.link}" target="_blank" rel="noopener">${MITOLOGIA.linkTexto} →</a>
      </div>`;
  }

  // ============================================================
  // SALAS DE VENDA
  // ============================================================
  function renderizarVendas() {
    // Anéis
    $('aneisTitulo').textContent = SALAS_VENDA.aneis.titulo;
    $('aneisSubtitulo').textContent = SALAS_VENDA.aneis.subtitulo;
    $('aneisTexto').textContent = SALAS_VENDA.aneis.texto;
    $('aneisLink').href = SALAS_VENDA.aneis.link;
    $('aneisLink').textContent = SALAS_VENDA.aneis.linkTexto + ' →';

    // Facas
    $('facasTitulo').textContent = SALAS_VENDA.facas.titulo;
    $('facasSubtitulo').textContent = SALAS_VENDA.facas.subtitulo;
    $('facasTexto').textContent = SALAS_VENDA.facas.texto;
    $('facasLink').href = SALAS_VENDA.facas.link;
    $('facasLink').textContent = SALAS_VENDA.facas.linkTexto + ' →';

    // Casacos
    $('casacosTitulo').textContent = SALAS_VENDA.casacos.titulo;
    $('casacosSubtitulo').textContent = SALAS_VENDA.casacos.subtitulo;
    $('casacosTexto').textContent = SALAS_VENDA.casacos.texto;
    $('casacosLink').href = SALAS_VENDA.casacos.link;
    $('casacosLink').textContent = SALAS_VENDA.casacos.linkTexto + ' →';

    // Heavy Metal
    $('heavymetalTitulo').textContent = SALAS_VENDA.heavymetal.titulo;
    $('heavymetalSubtitulo').textContent = SALAS_VENDA.heavymetal.subtitulo;
    $('heavymetalTexto').textContent = SALAS_VENDA.heavymetal.texto;
    $('heavymetalLink').href = SALAS_VENDA.heavymetal.link;
    $('heavymetalLink').textContent = SALAS_VENDA.heavymetal.linkTexto + ' →';

    // Carrosséis (com slots automáticos)
    carrosselData['aneis'] = [
      { tipo: 'img', src: 'assets/img/aneis1.png' },
      { tipo: 'img', src: 'assets/img/aneis2.png' },
      { tipo: 'img', src: 'assets/img/aneis3.png' },
      { tipo: 'img', src: 'assets/img/aneis4.png' },
      { tipo: 'img', src: 'assets/img/aneis5.png' },
      { tipo: 'img', src: 'assets/img/aneis6.png' }
    ];
    carrosselData['facas'] = [
      { tipo: 'img', src: 'assets/img/facas1.png' },
      { tipo: 'img', src: 'assets/img/facas2.png' },
      { tipo: 'img', src: 'assets/img/facas3.png' },
      { tipo: 'img', src: 'assets/img/facas4.png' },
      { tipo: 'img', src: 'assets/img/facas5.png' },
      { tipo: 'img', src: 'assets/img/facas6.png' }
    ];
    carrosselData['heavymetal'] = [
      { tipo: 'img', src: 'assets/img/heavymetal1.png' },
      { tipo: 'img', src: 'assets/img/heavymetal2.png' },
      { tipo: 'img', src: 'assets/img/heavymetal3.png' },
      { tipo: 'img', src: 'assets/img/heavymetal4.png' },
      { tipo: 'img', src: 'assets/img/heavymetal5.png' },
      { tipo: 'img', src: 'assets/img/heavymetal6.png' }
    ];
  }

  // ============================================================
  // CARROSSEL
  // ============================================================
  function construirCarrossel(id) {
    const el = document.querySelector(`.carrossel[data-carrossel="${id}"]`);
    if (!el) return;
    const track = el.querySelector('.carrossel-track');
    const indicadores = document.querySelector(`.carrossel-indicadores[data-ind="${id}"]`) || el.parentElement.querySelector(`.carrossel-indicadores[data-ind="${id}"]`);
    const items = carrosselData[id] || [];

    track.innerHTML = '';
    if (indicadores) indicadores.innerHTML = '';

    items.forEach((item, i) => {
      const slide = document.createElement('div');
      slide.className = 'carrossel-slide';

      if (item.tipo === 'img') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = id + '-' + i;
        img.onerror = () => slide.remove();
        slide.appendChild(img);
      } else if (item.tipo === 'video') {
        const ifr = document.createElement('iframe');
        ifr.src = `https://www.youtube.com/embed/${item.id}?autoplay=0&mute=1&loop=1&playlist=${item.id}&controls=1&modestbranding=1&playsinline=1&rel=0`;
        ifr.allow = 'autoplay; encrypted-media';
        slide.appendChild(ifr);
      }
      track.appendChild(slide);

      if (indicadores) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => { carrosselIndex[id] = i; atualizarCarrossel(id); };
        indicadores.appendChild(dot);
      }
    });

    atualizarCarrossel(id);
  }

  function moverCarrossel(id, dir) {
    const items = carrosselData[id] || [];
    let idx = carrosselIndex[id] || 0;
    idx += dir;
    if (idx < 0) idx = items.length - 1;
    if (idx >= items.length) idx = 0;
    carrosselIndex[id] = idx;
    atualizarCarrossel(id);
  }

  function atualizarCarrossel(id) {
    const el = document.querySelector(`.carrossel[data-carrossel="${id}"]`);
    if (!el) return;
    const track = el.querySelector('.carrossel-track');
    const idx = carrosselIndex[id] || 0;
    track.style.transform = `translateX(-${idx * 100}%)`;

    const indicadores = document.querySelector(`.carrossel-indicadores[data-ind="${id}"]`) || el.parentElement.querySelector(`.carrossel-indicadores[data-ind="${id}"]`);
    if (indicadores) {
      indicadores.querySelectorAll('span').forEach((s, i) => {
        s.classList.toggle('active', i === idx);
      });
    }
  }

  // Swipe mobile
  document.addEventListener('touchstart', (e) => {
    const car = e.target.closest('.carrossel');
    if (!car) return;
    car._startX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const car = e.target.closest('.carrossel');
    if (!car || !car._startX) return;
    const diff = e.changedTouches[0].clientX - car._startX;
    car._startX = null;
    if (Math.abs(diff) > 50) {
      const id = car.dataset.carrossel;
      moverCarrossel(id, diff > 0 ? -1 : 1);
    }
  }, { passive: true });

  // ============================================================
  // SLOTS AUTOMÁTICOS
  // ============================================================
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
        img.onload = () => {
          slot.classList.add('visivel');
          if (!alguma) { alguma = true; emptyMsg.style.display = 'none'; }
        };
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

  // ============================================================
  // HISTÓRIA NÃO CONTADA
  // ============================================================
  function abrirHistoriaNaoContada() {
    $('hncModalTitulo').textContent = HISTORIA_NAO_CONTADA.titulo;
    $('hncModalSub').textContent = HISTORIA_NAO_CONTADA.subtitulo;
    $('hncTexto').textContent = HISTORIA_NAO_CONTADA.texto;
    renderizarRedes('hncRedes');
    $('modalHNC').classList.add('active');
  }

  function fecharHNC() {
    $('modalHNC').classList.remove('active');
  }

  // ============================================================
  // MÚSICA
  // ============================================================
  function toggleMusica() {
    if (musica().paused) {
      musica().play();
      $('btnMusica').textContent = '❚❚';
    } else {
      musica().pause();
      $('btnMusica').textContent = '▶';
      salvarTempoMusica();
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    // Renderizar tudo
    renderizarPortas();
    renderizarContos();
    renderizarMicrocontos();
    renderizarSobreRuna();
    renderizarViking();
    renderizarMitologia();
    renderizarVendas();
    renderizarSimbologia();
    renderizarRedes('redesSociais');

    // Títulos config
    $('redesAcima').textContent = CONFIG.textos.redesAcima;
    $('redesAbaixo').textContent = CONFIG.textos.redesAbaixo;
    $('hncTitulo').textContent = CONFIG.textos.historiaNaoContada;
    $('hncSubtitulo').textContent = CONFIG.textos.historiaNaoContadaSub;
    $('dancaTitulo').textContent = CONFIG.textos.dançaTitulo;
    $('dancaSub').textContent = CONFIG.textos.dançaSub;

    // Salvar música periodicamente
    setInterval(salvarTempoMusica, 5000);
    window.addEventListener('beforeunload', salvarTempoMusica);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) salvarTempoMusica();
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      const menu = $('menuLista');
      const toggle = document.querySelector('.menu-toggle');
      if (!menu || !toggle) return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('aberto');
      }
    });

    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        fecharHistoria();
        fecharHNC();
      }
    });

    // Fechar HNC clicando fora
    $('modalHNC').addEventListener('click', (e) => {
      if (e.target.id === 'modalHNC') fecharHNC();
    });

    // Fechar conto clicando fora
    $('historiaModal').addEventListener('click', (e) => {
      if (e.target.id === 'historiaModal') fecharHistoria();
    });
  }

  // ============================================================
  // API PÚBLICA
  // ============================================================
  return {
    entrar,
    finalizarIntro,
    irParaPortal,
    voltarAoHall,
    toggleMenu,
    curtir,
    abrirHistoria,
    fecharHistoria,
    toggleHistoriaAudio,
    abaAnterior: fecharHistoria,
    proximaAba: () => {
      if (contoAtual && contoAtual.abas && abaAtual < contoAtual.abas.length - 1) {
        abaAtual++;
        renderizarAba();
      } else {
        fecharHistoria();
      }
    },
    ouvirHistoriaRuna,
    moverCarrossel,
    toggleMusica,
    abrirHistoriaNaoContada,
    fecharHNC,
    init
  };

})();

// ============================================================
// INICIALIZAR QUANDO O DOM ESTIVER PRONTO
// ============================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Taverna.init);
} else {
  Taverna.init();
                          }
