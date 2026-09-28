// CONFIG MANUAL DAS HISTÓRIAS (VIKING + MITOLOGIA)
// IMPORTANTE: "titulo" tem que bater EXATAMENTE com o grupo citado no campo "porta:" dos .md.

module.exports = {
  VIKING: {
    intro: 'Um povo novo a cada semana. O norte não cabe num só conto.',
    imagem: 'runa-viking.jpg',
    link: 'https://meli.la/2YmDDte',
    linkTexto: 'Explorar o Universo Viking',
    grupos: [
      { id: 'povo',    titulo: 'O Povo do Norte', subtitulo: 'Quem eram, como se organizavam, como viviam.' },
      { id: 'guerra',  titulo: 'A Guerra',        subtitulo: 'Aço, escudos e o preço da vitória.' },
      { id: 'rotas',   titulo: 'As Rotas',        subtitulo: 'Os navios que ligaram o mundo.' },
      { id: 'inverno', titulo: 'O Inverno',       subtitulo: 'Sobreviver à estação mais longa.' },
      { id: 'crencas', titulo: 'As Crenças',      subtitulo: 'Os deuses no cotidiano do povo.' }
    ]
  },
  MITOLOGIA: {
    intro: 'Yggdrasil, Thor e Fenrir abrem as portas da casa. Novos deuses chegam toda semana.',
    imagem: 'runa-mitologia.jpg',
    link: 'https://meli.la/1oByRB2',
    linkTexto: 'Conhecer relíquias dos Deuses',
    grupos: [
      { id: 'arvore',         titulo: 'A Árvore do Mundo',                subtitulo: 'Onde tudo se conecta.' },
      { id: 'aesir',          titulo: 'Os Aesir',                         subtitulo: 'Os deuses de Asgard.' },
      { id: 'vanir',          titulo: 'Os Vanir',                         subtitulo: 'Os deuses da paz.' },
      { id: 'gigantes',       titulo: 'Loki, os Gigantes e as Criaturas', subtitulo: 'O que ameaça a ordem dos deuses.' },
      { id: 'ragnarok',       titulo: 'Ragnarok — O Fim e o Recomeço',    subtitulo: 'Tudo o que morre, retorna.' },
      { id: 'quem-escreveu',  titulo: 'Quem Escreveu Tudo Isso',          subtitulo: 'A verdade sobre a mitologia.' }
    ]
  }
};
