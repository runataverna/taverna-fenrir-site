// ============================================================
// TAVERNA FENRIR — ARQUIVO DE CONTEÚDO
// Edite aqui. O index.html e script.js não precisam ser tocados.
// ============================================================

// ============================================================
// DICIONÁRIO DE RUNAS NO TEXTO
// ============================================================
const RUNAS_TEXTO = {
  'proteção': 'algiz', 'protecao': 'algiz', 'abrigo': 'algiz',
  'escudo': 'algiz', 'defender': 'algiz', 'guardar': 'algiz', 'amigo': 'algiz',
  'gelo': 'isa', 'inverno': 'isa', 'neve': 'isa', 'frio': 'isa',
  'espera': 'isa', 'silêncio': 'isa', 'silencio': 'isa',
  'fogo': 'kenaz', 'tocha': 'kenaz', 'luz': 'kenaz',
  'aprender': 'kenaz', 'ensinar': 'kenaz',
  'ouro': 'fehu', 'prata': 'fehu', 'riqueza': 'fehu', 'tesouro': 'fehu',
  'batalha': 'thurisaz', 'sangue': 'thurisaz', 'machado': 'thurisaz',
  'espada': 'thurisaz', 'luta': 'thurisaz', 'matar': 'thurisaz',
  'riso': 'wunjo', 'festa': 'wunjo', 'alegria': 'wunjo',
  'dança': 'wunjo', 'danca': 'wunjo', 'canção': 'wunjo', 'cancao': 'wunjo',
  'brinde': 'wunjo',
  'família': 'othala', 'familia': 'othala', 'lar': 'othala',
  'casa': 'othala', 'pai': 'othala', 'mãe': 'othala', 'mae': 'othala',
  'memória': 'mannaz', 'memoria': 'mannaz', 'alma': 'mannaz'
};

const CONTOS_ABERTURA = 'runa-contos.jpg';

// ============================================================
// CONFIGURAÇÕES GERAIS
// ============================================================
const CONFIG = {
  intro: 'ma_aCbNxNQc',
  heroHall: 'odB5EuYGaCM',
  delays: { boasVindas: 900, fimIntro: 8000, musicaSubir: 25000, ducking: 500 },
  volumes: { musicaPadrao: 0.20, musicaBaixa: 0.05, boasVindas: 0.85 },
  redes: {
    instagram: 'https://www.instagram.com/runataverna',
    facebook: 'https://www.facebook.com/61594517399917/',
    tiktok: 'https://www.tiktok.com/@runa.taverna',
    youtube: 'https://youtube.com/@runatavernafenrir',
    email: 'runa.fenrir.oficial@gmail.com'
  },
  textos: {
    redesAcima: 'Já faz parte de nossas redes?',
    redesAbaixo: 'Siga nossas redes sociais',
    historiaNaoContada: 'A HISTÓRIA NÃO CONTADA',
    historiaNaoContadaSub: 'NÃO ABRA ESSA PORTA',
    lojasTitulo: 'AS SALAS DA TAVERNA',
    mitologiaIntro: 'Yggdrasil, Thor e Fenrir abrem as portas da casa. Novos deuses chegam toda semana.',
    vikingIntro: 'Um povo novo a cada semana. O norte não cabe num só conto.'
  }
};

// ============================================================
// AS 9 PORTAS DO HALL
// ============================================================
const PORTAS = [
  { id: 'contos',      num: 1, titulo: 'Contos',                    tag: 'Histórias',     desc: 'Noites junto ao fogo: batalhas, juramentos e a caneca que nunca esfria.', video: 'iQ_rePerQKo', duracao: 8000,  img: 'runa-contos.jpg' },
  { id: 'sobre',       num: 2, titulo: 'Sobre a Runa',              tag: 'Ela mesma',     desc: 'A guerreira que trocou a espada pelo avental — a história completa na voz dela.', video: 's4RftBijF0Q', duracao: 8000,  img: 'runa-retrato.jpg' },
  { id: 'universo',    num: 3, titulo: 'Universo Viking',           tag: 'Mundo',         desc: 'Rotas, clãs, navios e costumes que moldaram a guerreira taberneira.', video: '1LZkHAPm5GQ', duracao: 13000, img: 'runa-viking.jpg' },
  { id: 'mitologia',   num: 4, titulo: 'Mitologia Nórdica',         tag: 'Mitos',         desc: 'Yggdrasil, os Nove Mundos, Fenrir e os deuses que observam a taverna.', video: '0Gs4CzPLMwM', duracao: 11000, img: 'runa-mitologia.jpg' },
  { id: 'aneis',       num: 5, titulo: 'Anéis & Pingentes',         tag: 'Relíquias',     desc: 'Peças ligadas às histórias: o pingente da raiz, o ferro do fiorde.', video: 'kVn2eI32yyU', duracao: 8000,  img: 'runa-aneis.jpg' },
  { id: 'facas',       num: 6, titulo: 'Facas & Utensílios',        tag: 'Do balcão',     desc: 'Ferro batido, fio firme — o kit da taverna.', video: 'WX1lHp6vH1c', duracao: 8000,  img: 'runa-facas.jpg' },
  { id: 'casacos',     num: 7, titulo: 'Casacos',                   tag: 'Vestir',        desc: 'Contra a neve lá fora: camadas quentes com espírito do norte.', video: 'Z38aRgWU9Wg', duracao: 11000, img: 'runa-casacos.jpg' },
  { id: 'heavymetal',  num: 8, titulo: 'Heavy Metal & Camisetas',   tag: 'Som & Vestir',  desc: 'A trilha da casa e as runas para vestir.', video: 'GLe-29BBcws', duracao: 8000,  img: 'runa-heavymetal.jpg' },
  { id: 'arte',        num: 9, titulo: 'Arte Conceitual',           tag: 'Bastidores',    desc: 'Onde tudo começou. Esboços que nunca entraram nas histórias oficiais.', video: '49CYH2HEyoY', duracao: 12000, img: 'runa-arte.jpg' }
];

// ============================================================
// OS CONTOS (abertura + 7 principais)
// ============================================================
const CONTOS = [
  {
    id: 'abertura',
    titulo: 'As Runas da Porta',
    subtitulo: 'Abertura · Antes de entrar',
    imagemAbertura: 'runa-abertura.jpg',
    propaganda: null,
    texto: `Se você chegou até aqui, presta atenção numa coisa antes de entrar.

Toda porta de taverna tem marca. A minha tem sete. Eu gravei cada uma à faca, na madeira da soleira, antes de abrir a casa pela primeira vez.

A primeira é ᛉ Algiz. É a runa da proteção — a mão aberta sobre quem entra. Fica na soleira, virada pra rua. Quem passa por ela não sai do mesmo jeito. Algiz é a runa que eu uso quando alguém chega ferido. E quando alguém chega com medo, também.

A segunda é ᛁ Isa. É a runa do gelo — e do silêncio. Fica no batente esquerdo. Isa não é sobre morte. É sobre a pausa antes da decisão. Quando o mundo trava, é Isa que ensina a esperar.

A terceira é ᚲ Kenaz. É a runa da tocha. Fica acima da lareira, iluminando a casa. Foi a Svala que me ensinou Kenaz. Ela dizia que aprender é acender fogo dentro do peito, e que a gente nunca mais apaga.

A quarta é ᚦ Thurisaz. É a runa da batalha — do martelo do Thor. Fica no batente direito, contra quem chega armado. Não é sobre violência. É sobre saber que ninguém aqui levanta a mão contra ninguém.

A quinta é ᚹ Wunjo. É a runa da alegria. Fica no balcão, bem no centro. É a marca da festa, do riso, do brinde que a gente levanta quando a noite é boa.

A sexta é ᛟ Othala. É a runa da família — do lar. Fica na viga central, onde ninguém toca. Othala é herança. É o que a gente carrega dos que vieram antes.

A sétima é ᛗ Mannaz. É a runa do eu. Fica no coração da casa — onde eu mesma me sento. Mannaz é o que sobra de mim quando a noite acaba. E é por ela que eu ainda estou aqui.

Agora você já sabe as sete. Vai reconhecer elas quando aparecerem.

Senta. A casa é sua.`,
    rodape: 'gravado na soleira, antes da primeira noite.',
    imagens: null, video: null, link: null, linkTexto: null, abas: null, audio: null
  },
  {
    id: 'caneca',
    titulo: 'A caneca que nunca esfria',
    subtitulo: 'Conto I · Noite de neve',
    imagemAbertura: 'runa-caneca.jpg',
    propaganda: 'propaganda-caneca.jpg',
    texto: `A neve batia na porta como quem pede licença, e o viajante entrou a rir-se do frio. «Quentinho, dizes?»

Runa não respondeu: pousou a caneca de carvalho no balcão e deixou o hidromel acender-se num sopro azul. Dizem que o fogo da Taverna Fenrir não queima a mão de quem chega em paz — só aquece a coragem.

O viajante bebeu de um gole, tossiu, riu, e pediu outra. Runa, de braços cruzados, murmurou a frase que a casa inteira já conhece.

Desde essa noite, ninguém duvida da caneca. E quem duvida, volta — porque o frio lá fora é real, mas o fogo aqui dentro é teimoso.`,
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/1pQy38B', linkTexto: 'Obter essa relíquia', abas: null, audio: null
  },
  {
    id: 'bardo',
    titulo: 'Bardo e a sua caneca',
    subtitulo: 'Conto V · O cliente fiel',
    imagemAbertura: 'runa-bardo-conto.jpg',
    propaganda: 'propaganda-bardo.jpg',
    texto: `Senta. Essa história é sobre um velho cliente. O nome dele é Bardo. Não é anão, não é ferreiro, não é deus. É um velho teimoso que aparece aqui toda quinta-feira, senta no mesmo canto, e pede a mesma coisa: hidromel na caneca dele.

E ele tem uma caneca específica. Não aceita outra.

— Runa, essa caneca aqui tem história — ele diz. E tem. Ele comprou de um mercador que passou por aqui há uns dez invernos. Pagou caro.

O que eu sei é que ele chega, senta, e a caneca já está esperando. Uma vez eu perguntei por que ele gostava tanto daquela caneca. Ele respondeu:

— Porque ela é minha. E porque, quando eu seguro ela, eu lembro de quem eu era antes de ficar velho.

Tem coisas que a gente carrega não pelo valor. Carrega pelo peso.`,
    rodape: 'contado por Runa, atrás do balcão.',
    imagens: null, video: null, link: 'https://meli.la/1TCwkER', linkTexto: 'Obter essa relíquia', abas: null, audio: null
  },
  {
    id: 'brokkr',
    titulo: 'Brokkr e Eitri',
    subtitulo: 'O conto dos anões',
    imagemAbertura: 'runa-brokkr.jpg',
    propaganda: 'propaganda-ferramentas.jpg',
    abas: [
      {
        titulo: 'O martelo que nasceu do fogo',
        texto: `Senta que essa é antiga, de antes dos homens contarem o tempo direito.

Você conhece o martelo do Thor? Aquele que racha montanha, que faz o céu trovejar? Pois é. Ele não caiu do céu. Foi feito. Por dois irmãos anões chamados Brokkr e Eitri — os melhores ferreiros que os Nove Mundos já viram.

A história começa com uma aposta. Loki, sempre ele, apostou a própria cabeça com os irmãos que eles não conseguiam fazer três tesouros melhores que os que os deuses já tinham. E se perdessem? Loki ficava com a cabeça deles. Se ganhassem? Loki perdia a dele.

Os irmãos aceitaram sem piscar.

Eitri era quem moldava o metal. Brokkr era quem soprava o fole — o fole que mantém o fogo vivo. Um trabalhava na forja, o outro segurava a respiração do fogo. Os dois juntos, um só corpo.

Começaram pelo javali de Frey. Depois veio o anel de Odin. E por fim, o martelo do Thor.

No meio da forja do martelo, Loki se transformou num moscardo e começou a picar o pescoço e as pálpebras de Brokkr. Doía. Sangrava. Cada picada era um convite pra ele largar o fole — porque se o fole parasse, o martelo estragava.

Brokkr não parou.

Enxugou o sangue com o ombro e continuou soprando, soprando, soprando, até o metal estar pronto. O martelo saiu de cabo mais curto do que devia, por causa da provocação. Mas saiu perfeito — no peso, no equilíbrio, na força.

Os deuses julgaram. O Mjolnir era o melhor tesouro dos três. Loki perdeu a aposta. E os irmãos anões entraram na história pra sempre.

É por isso que eu carrego o pingente no peito. Não é enfeite. É lembrança de que coisa boa nasce no fogo, com teimosia, e com alguém do lado soprando o fole.`
      },
      {
        titulo: 'Sobre ferramentas',
        texto: `Agora deixa eu te contar uma coisa que ninguém pensa quando ouve essa história.

Brokkr e Eitri não fizeram o Mjolnir com magia. Fizeram com ferramenta.

Martelo. Bigorna. Tenaz. Fole. Não é a mão que forja o metal — é a ferramenta que dá forma ao que a mão quer. Sem elas, os irmãos eram só dois anões com boas intenções.

Isso me faz pensar numa coisa que a gente esquece.

Na minha época, ninguém sobrevivia sem ferramenta. A mesma foice que colhia o trigo em setembro era a que defendia a casa em outubro. O mesmo machado que rachava lenha rachava escudo. A mesma faca de entalhe que gravava runa na madeira era a que limpava o peixe do jantar.

Não existia ferramenta de casa e ferramenta de guerra. Existia uma ferramenta que fazia o que precisava ser feito.

Brokkr e Eitri entenderam isso antes de todo mundo. Não foram grandes porque eram fortes. Foram grandes porque sabiam usar o que tinham. E porque trabalhavam um com o outro. Eitri moldava, Brokkr soprava. Um sem o outro não fazia nada.

Aprende isso, se puder levar uma coisa dessa história:

Ferramenta boa não é a mais bonita. É a que você usa. É a que você cuida. É a que você conhece bem o suficiente pra saber quando ela precisa de afiação.

E se tiver alguém do seu lado soprando o fole enquanto você trabalha — melhor ainda. Ninguém forja Mjolnir sozinho.`
      }
    ],
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/32RTZd9', linkTexto: 'Conhecer as ferramentas da Runa', audio: null
  },
  {
    id: 'yggdrasil',
    titulo: 'Juramento sob Yggdrasil',
    subtitulo: 'Conto IV · A raiz',
    imagemAbertura: 'runa-yggdrasil.jpg',
    propaganda: 'propaganda-jardim.jpg',
    abas: [
      {
        titulo: 'O Juramento',
        texto: `Antes da taverna, eu andava sem rumo. Sem casa, sem nome, sem pra onde voltar.

Foi numa tarde de chuva que encontrei uma cabana em pedaços no meio da floresta. Queimada. Abandonada. Ninguém morava ali há muito tempo.

E ao lado dela, no chão, uma raiz gigantesca. Yggdrasil partida. Queimada por um raio.

Eu fiquei parada olhando aquilo por um tempo que nem sei medir. A árvore que sustenta os Nove Mundos — reduzida a um pedaço de madeira retorcida no meio do mato.

Foi ali que eu decidi.

Peguei a faca de entalhe, ajoelhei na terra molhada, e coloquei minha primeira runa após sair do bando do Lobo Cinzento. Algiz. Proteção.

E jurei uma coisa que carrego até hoje: nenhum ferido fica lá fora.

Do resto da árvore, fiz a porta da taverna. Você já passou por ela quando entrou aqui. É de raiz. Está lá até hoje, pesada, cheia de marcas. Cada vez que ela range ao abrir, eu lembro daquele dia.

A taverna inteira é isso. É a lição que a floresta me ensinou quando eu mais precisava.`
      },
      {
        titulo: 'O que a árvore me ensinou',
        texto: `Você já parou pra olhar uma árvore de verdade?

Não de passagem. Parar. Olhar. Entender o que ela faz.

Yggdrasil sustenta Nove Mundos. A nossa árvore aqui na porta da taverna não sustenta mundos, mas sustenta a vida que passa por ela. Dá sombra pra quem senta. Dá madeira pra quem precisa. Dá ar pra quem respira.

A raiz que eu encontrei naquele dia me ensinou uma coisa simples: quem não cuida, perde.

Eu não sou boa com plantas. Mas aprendi a cuidar do que tenho. Um vaso, uma horta, um pedaço de terra. Não é sobre ter um jardim bonito. É sobre honrar a terra que te sustenta.

Se você quer começar, começa pequeno. Terra boa, paciência, e a mão disposta a sujar. A floresta corrige quem tenta. E quem insiste, colhe.`
      }
    ],
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/1xdP4cC', linkTexto: 'Conhecer o Kit de Jardinagem da Runa', audio: null
  },
  {
    id: 'neve',
    titulo: 'Neve e sangue na porta',
    subtitulo: 'Conto III · O inverno do lobo',
    imagemAbertura: 'runa-neve.jpg',
    propaganda: 'propaganda-mantas.jpg',
    abas: [
      {
        titulo: 'A noite em que o lobo uivou',
        texto: `O uivo desceu da montanha e apagou as tochas do cais.

Lá fora, os mercenários riram. Os pescadores rezaram. E eu sabia que a noite ia ser longa.

Fenrir uivou — e quando Fenrir uiva, as pessoas lembram que são pequenas.

Eu limpei o balcão. Pendurei a espada ao alcance da mão, do lado de dentro. E mantive a porta aberta.

A primeira coisa que eu digo pra quem entra é sempre a mesma: "Quem entra com sangue na bota, limpa na esteira."

Não é sobre limpeza. É sobre deixar lá fora o que não pertence aqui dentro.

Naquela noite, entraram inimigos. Gente que se mataria na rua. Gente que tinha motivo de sobra pra não dividir a mesma mesa.

Sentaram juntos. Comeram juntos. Bebaram juntos.

Não porque viraram amigos. Porque aqui dentro, a trégua dura até a caneca esvaziar. E enquanto houver hidromel, ninguém levanta a mão.

Quando o lobo calou, lá fora a neve cobria tudo. A soleira da porta, porém, estava limpa. O fogo tinha vencido outra vez.`
      },
      {
        titulo: 'O que fica do lado de fora',
        texto: `Tem uma coisa que eu nunca disse pra ninguém.

Aprendi isso com o Halvar, na primeira noite em que dormi no abrigo do bando. Todo mundo ali tinha motivo pra matar alguém. Gente que tinha perdido irmão, mãe, filho. Gente que dormia com a faca na mão por medo de acordar no meio da noite com o aço de alguém na garganta.

E, no entanto, naquela noite, todos sentaram à mesma fogueira. Comeram do mesmo pote. Beberam da mesma caneca passando de mão em mão.

Halvar só disse uma coisa antes de todo mundo dormir. Palavras que eu carrego há vinte anos:

"Lá fora é lá fora. Aqui dentro, todos comem do mesmo prato."

Eu nunca esqueci.

Quando abri a Taverna Fenrir, essa foi a única regra que eu gravei na porta. Não está em pedra. Não está em runa. Está no jeito que eu sirvo.

Um prato para o mercenário. Um prato para o pescador. Um prato para o homem que ontem tentou matar o outro. Prato igual para todos.

É por isso que eu escolho cada peça da minha cozinha com cuidado. Não é sobre ter a louça mais bonita. É sobre ter a louça que diz, sem palavras: aqui dentro, todos são iguais.

A neve vai continuar caindo lá fora. O sangue vai continuar secando nas botas. Mas o que atravessa a soleira da minha porta encontra uma mesa posta. E uma mesa posta é o que separa a gente da barbárie.

Se um dia você tiver uma casa sua, lembra disso: o cuidado com a mesa é cuidado com quem senta à mesa.`
      }
    ],
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/1UxNvkB', linkTexto: 'Conhecer a mesa da Runa', audio: null
  },
  {
    id: 'bando',
    titulo: 'O Bando do Lobo Cinzento',
    subtitulo: 'Conto II · A família escolhida',
    imagemAbertura: 'runa-bando.jpg',
    propaganda: 'propaganda-presentes.jpg',
    abas: [
      {
        titulo: 'Como eu entrei',
        texto: `Depois que enterrei minha família, eu não sabia o que fazer com a raiva que sobrava em mim.

Andei sozinha por muito tempo. Roubava comida quando precisava. Dormia com um olho aberto. Não confiava em ninguém — e com razão.

Até o dia em que encontrei o bando do Lobo Cinzento.

Não foi bonito. Não foi acolhedor. Foi rápido. Eles surgiram do nada, me cercaram, me estudaram como quem avalia se vale a pena perder tempo.

Eu tinha catorze invernos. Estava magra, suja, com uma faca que eu nem sabia usar direito.

Foi um velho que me olhou primeiro. Alto, barba grisalha, mão cheia de cicatrizes de corda. Halvar. O líder.

Ele não me perguntou nada. Ficou me olhando por um tempo que parecia um ano. Depois virou as costas e disse, sem olhar:

"Ela fica."

E foi assim que entrei.

Fiquei anos com eles. Vi gente morrer. Vi gente nascer — filhos de bando, criados no convés. Chorei com eles, ri com eles, briguei com eles.

O bando era isso: remadores, ferreiros, gente que tinha perdido tudo e decidido não ficar de luto. Tinham uma regra só, que eu nunca esqueci: o bando cuida do bando. Ninguém fica pra trás. Ninguém é deixado na neve.

Foi a primeira família que eu tive depois de perder a minha. Não pelos laços de sangue. Pelos laços da guerra.

E aprendi uma coisa que carrego até hoje: estar perdido não é o mesmo que estar sozinho. Às vezes, estar perdido é só o começo de ser encontrado.

Saí quando percebi que vingança não cura nada. Mas essa história eu já contei.`
      },
      {
        titulo: 'O valor de pertencer',
        texto: `Tem uma coisa que eu aprendi com o bando que eu nunca esqueci.

Antes deles, eu achava que presente era coisa de gente rica. Gente que tem o que dar porque tem de sobra. Eu nunca tive de sobra. Nem comida, nem roupa, nem tempo. Presente, pra mim, era luxo de quem nunca passou necessidade.

O bando me ensinou diferente.

A primeira coisa que ganhei não foi ouro nem arma. Foi uma corda trançada. Feita à mão por Halvar, na primeira noite que dormi no abrigo deles. Ele me entregou sem dizer uma palavra. Jogou no meu colo e virou as costas.

Eu não entendi na hora. Depois entendi. Aquele bando não dava presentes bonitos. Dava presentes úteis. Coisas que diziam: "eu vi você, eu sei do que você precisa, e eu me importo o bastante pra fazer isso com minhas próprias mãos."

Halvar nunca me explicou por que me deixou ficar. Anos depois, perguntei. Ele só disse: "Porque você ia morrer se eu não deixasse. E eu já deixei gente demais morrer antes de aprender a parar."

Foi ali que eu comecei a entender o valor de pertencer.

Um bando não é uma família que você nasce. É uma família que você escolhe. E escolher alguém é uma coisa séria. Você não escolhe só nos dias bons. Você escolhe nos dias de tempestade, quando o barco tá afundando e não tem ninguém pra te salvar além da pessoa do lado.

Presentear alguém é parecido. Não é sobre o objeto. É sobre dizer: "eu pensei em você antes de você precisar."

Eu guardo até hoje essa corda. Não uso mais. Mas ela tá comigo. E cada vez que eu dou um presente pra alguém — pequeno, simples, do jeito que a gente dava no bando — eu lembro do velho Halvar.

Presentear é uma forma de dizer "eu te escolhi."

E ser escolhido, meu caro, é uma das poucas coisas na vida que valem a pena.`
      }
    ],
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/2WLCGD1', linkTexto: 'Conhecer a lista de presentes da Runa', audio: null
  },
  {
    id: 'runas',
    titulo: 'Como Runa aprendeu as runas',
    subtitulo: 'Conto VI · A velha do bando',
    imagemAbertura: 'runa-runas.jpg',
    propaganda: 'propaganda-oficio.jpg',
    abas: [
      {
        titulo: 'A velha do bando',
        texto: `No bando do Lobo Cinzento, tinha uma velha.

Ninguém sabia de onde ela veio. Ninguém perguntava. Svala era o nome dela — e isso era tudo o que a gente sabia.

Ela não lutava. Não remava. Não carregava arma. Mas ninguém no bando ousava dizer que ela não trabalhava.

Svala cuidava dos animais quando o bando encontrava cavalos perdidos no caminho. Era ela que tratava os feridos com ervas que ninguém mais conhecia. Era ela que organizava os suprimentos antes de cada viagem — dizia o que levar, o que deixar, o que ia faltar. Quando a água escasseava, era a Svala que sabia onde cavar.

Nos tempos livres, quando não tinha nada urgente pra fazer, ela sentava num canto do abrigo com um pedaço de madeira numa mão e uma faca de entalhe na outra. Entalhava coisa que a gente não entendia.

Ninguém conversava com ela. Não por medo — por respeito. Svala falava pouco e, quando falava, todo mundo calava.

E tinha mais uma coisa que a gente não dizia em voz alta, mas todo mundo sentia: o bando acreditava que vencia as batalhas por causa dela. Não pelas espadas. Não pelos machados. Pelas runas. Antes de cada confronto, alguém pedia uma bênção. Ela nunca negava. Riscava um símbolo no ar, dizia uma palavra antiga, e virava as costas. E o bando saía confiante. E o bando voltava vivo.

Talvez fossem só as espadas. Talvez fosse superstição. Mas quem luta sabe: quem luta com fé na frente, luta diferente de quem luta com medo atrás.

Eu tinha catorze invernos e um buraco no peito. Havia três semanas que eu estava no bando. Dormia com a faca na mão, comia com um olho aberto, e não falava com ninguém. Raiva em cada osso, medo em cada sonho.

Foi numa noite de chuva que ela me chamou.

Ela não levantou a voz. Não apontou. Só olhou pra mim do canto, e disse uma palavra:

"Senta."

Eu não sei por que eu obedeci. Nunca obedecia ninguém. Mas naquela noite, sentei.

Ela me entregou a faca de entalhe. Colocou um pedaço de madeira na minha mão. E disse:

"Lê."

Eu não entendi nada. Nunca tinha visto uma runa na vida. Falei isso pra ela, com aquela raiva de menina que ainda não aprendeu a ser gente.

Ela olhou pra mim com aquele olhar que corta. Levou um tempo. Depois respondeu, sem pressa:

"Então aprende. A espada decide depressa. A runa decide certo."

Eu não entendi. Levei meses pra entender.

Passei três invernos sentada ao lado dela. Isa riscada no gelo. Algiz gravada na soleira de cada abrigo. Othala desenhada de memória antes que o vento apagasse.

Svala nunca explicava duas vezes. Apontava para a madeira, para o céu, para a cicatriz no próprio pulso, e dizia sempre a mesma coisa:

"Lê. Se errares, a floresta corrige."

Eu lia. Errava. Era corrigida. Lia de novo.

No começo, era só medo de errar. Depois virou vício. A runa deixou de ser traço. Virou linguagem. As madeiras começaram a falar comigo, o gelo começou a responder, o vento começou a soprar coisas que eu não sabia que dava pra ouvir.

Ela nunca me ensinou a lutar — isso eu já sabia. Ela me ensinou a ler.

E me ensinou outra coisa que só entendi anos depois: que a violência é resposta rápida pra pergunta errada. Quem lê, entende. Quem entende, escolhe melhor. A runa não salva a sua vida durante a batalha. Ela te ajuda a nunca mais precisar entrar em uma.

Svala morreu no inverno do meu décimo sétimo ano. Não foi em batalha. Foi dormindo. A gente encontrou ela de manhã, sentada no banco de sempre, com um pedaço de madeira inacabado no colo.

Eu não chorei na frente de ninguém. Mas no dia seguinte, peguei a faca de entalhe dela, sentei no banco dela, e gravei minha primeira runa sozinha.

ᛉ — Algiz, proteção.

Pra ela. Pra mim. Pra quem viesse depois.`
      },
      {
        titulo: 'Três runas que eu carrego comigo',
        texto: `Vou te ensinar três das runas que a Svala me ensinou. Não são todas — são as três que eu mais uso. Guarda elas, se puder.

ᛉ — Algiz. Proteção.

É a primeira que eu gravei. Ela lembra uma mão aberta, com os dedos pra cima. É a runa da soleira, da porta, do abrigo. Quando você entrar numa casa amiga, se quiser agradecer, entalha um Algiz na madeira perto da entrada. Um pedido de proteção pra quem mora ali.

ᛁ — Isa. Gelo.

Parece um traço reto. É a runa da pausa, do inverno, do silêncio. Aprendi a respeitar ela quando passei meu primeiro inverno no norte sem lenha suficiente. Isa não é sobre morte — é sobre aprender a esperar. Quando tudo trava, quando nada anda, quando você não sabe pra onde ir: Isa é o aviso. Para. Respira. Espera o gelo derreter.

ᛗ — Mannaz. O eu.

Parece uma letra M. É a runa da humanidade, do que você é, da marca pessoal. É essa que eu gravei no card da história que você acabou de ler — porque quando você curte uma história, você está deixando sua marca nela. Mannaz é isso: o que sobra de você no mundo depois que você passa.

Tem outras. Kenaz, a tocha. Berkana, a bétula. Gebo, o presente. Frases que eu vou guardando pra quando você voltar.

Mas essas três, se você levar, já é o bastante pra caminhar com um pouco mais de cuidado.

A Svala dizia: "quem lê, sabe onde pisa." Eu ainda estou aprendendo. Mas já piso melhor do que pisei.

Se você quiser começar, começa por onde eu comecei. Uma faca de entalhe, um pedaço de madeira e a mão disposta a errar antes de acertar. Não precisa de mais nada. A floresta corrige quem tenta. E quem insiste, colhe.`
      }
    ],
    rodape: 'contado por Runa, atrás do balcão. ᛟ ᚾ ᛁ',
    imagens: null, video: null, link: 'https://meli.la/2CYf4XY', linkTexto: 'Conhecer o ofício da Runa', audio: null
  }
];

// ============================================================
// MICROCONTOS — A DANÇA DAS CHAMAS
// ============================================================
const MICROCONTOS = [
  {
    titulo: 'A Mulher do Mar',
    texto: `Faz poucos dias que Sigrid começou a frequentar o balcão.

Não sei muito sobre ela. Sei que vem no fim da tarde, pede hidromel, senta perto da janela. Não fala com ninguém. Bebe devagar. Vai embora antes da lua subir.

Na terceira noite, perguntei ao Bardo se ele sabia quem ela era. Ele disse:

— É do vilarejo do sul. O marido partiu em jornada faz mais de seis meses. Sem notícia desde então.

Eu não entendi na hora. Depois entendi.

Aquele olhar. Eu conhecia aquele olhar.

Não é olhar de quem perdeu. É olhar de quem ainda não sabe o que perdeu. Eu vi nas mulheres do bando quando os homens partiam. E vi na minha própria cara no reflexo da água depois que perdi alguém que eu não vou contar hoje.

Reconhecer é perigoso. Porque quando a gente reconhece, a gente sente junto. E sentir junto dá trabalho. É mais fácil servir a bebida, dizer boa noite, deixar a pessoa ir.

Mas eu não abri essa taverna pra isso.

Na quarta noite, sentei na frente dela. Puxei o banco, dobrei os braços na mesa, e disse:

— Sigrid.

Ela ergueu os olhos.

— Eu não sei do teu marido. Ninguém aqui sabe. Não tem carta que atravesse o mar. O que existe é knarr — e quando um knarr volta, ele traz notícia ou traz silêncio. O teu ainda não voltou. Isso não é resposta. É só espera.

Ela não chorou. Ficou olhando pra mesa.

— Eu vi batalha, Sigrid. Muita. Mais do que mulher deveria ver. E vou te dizer uma coisa que talvez não sirva pra ti agora, mas que é a única verdade que eu carrego: guerra não volta atrás. Homem que entra numa jornada ou volta, ou fica. Não existe terceira opção. E enquanto ele não volta, tu tá aqui. Viva. Sentada no meu balcão. Bebendo do meu hidromel. Isso não é pouco.

Ela ficou um tempo quieta. Depois bebeu de um gole. Depois comeu o que eu trouxe. Depois dormiu num dos quartos de cima.

Faz quatro dias que ela dorme aqui.

Não sei se o marido volta. Não sei se tá vivo. Não sei se merece a espera dela. Só sei que enquanto ela tiver cama quente, caneca cheia e banco reservado perto do fogo, ela tá viva. E enquanto ela tá viva, tem esperança. E enquanto tem esperança, tem motivo pra acender o fogo amanhã.

A taverna não devolve maridos. Não cura luto. Mas segura a vela enquanto a tempestade passa.`
  }
];

// ============================================================
// SOBRE A RUNA — MONÓLOGO COMPLETO
// ============================================================
const SOBRE_RUNA = {
  ficha: {
    nome: 'Runa',
    idade: '27 anos',
    origem: 'Vila pequena no norte, onde o inverno dura mais que a vida',
    ocupacao: 'Ex-guerreira, dona da Taverna Fenrir'
  },
  aparencia: [
    'Cabelo ruivo vibrante com duas tranças grossas e contas',
    'Olhos verde-esmeralda penetrantes',
    'Sardas leves no nariz',
    'Tatuagens rúnicas nos antebraços',
    'Cicatrizes pelo corpo — memória da batalha',
    'Pingente de Mjolnir retangular de prata',
    'Capa de pele de lobo cinza com broche celta',
    'Corset de couro escuro, braçadeiras de couro'
  ],
  personalidade: [
    'Fofa sem ser ingênua', 'Bruta sem ser grosseira', 'Sexy sem ser vulgar',
    'Forte sem precisar provar força', 'Inteligente sem ser arrogante',
    'Irônica quando apropriado', 'Sensível sem ser frágil'
  ],
  audio: 'assets/audio/runa-historia-completa-v1.mp3',
  videoPropaganda: 'LW2SnwzstJM',
  linkPropaganda: 'https://meli.la/2d46Yr4',
  linkPropagandaTexto: 'Conhecer o pingente da Runa',
  monologo: [
    { tipo: 'p', texto: 'E não, eu não disse que era quentinho.' },
    { tipo: 'p', texto: 'Antes de eu te contar qualquer coisa, você precisa entender uma coisa: eu não nasci dona de taverna. Eu nasci numa vila pequena, no norte, onde o inverno dura mais que a vida. Tinha pai, tinha mãe, tinha um irmão mais novo que ria de tudo.' },
    { tipo: 'p', texto: 'Um dia, homens com machados e tochas chegaram.' },
    { tipo: 'p', texto: 'Eu não vou te contar os detalhes. Algumas coisas não precisam ser lembradas em voz alta.' },
    { tipo: 'citacao', texto: 'Eu tinha doze invernos quando enterrei o último deles.' },
    { tipo: 'p', texto: 'Passei a adolescência vagando. Não era uma escolha, era o que sobrava. Aprendi a roubar comida, a dormir com um olho aberto, a não confiar em ninguém.' },
    { tipo: 'p', texto: 'Até o dia em que encontrei o bando do Lobo Cinzento.' },
    { tipo: 'p', texto: 'Eles não me acolheram por bondade. Me acolheram porque viram em mim algo que eles conheciam bem: raiva.' },
    { tipo: 'p', texto: 'Eles ouviram a minha história. E fizeram o que nenhum outro grupo tinha feito: me deram um propósito. Uma jornada de vingança.' },
    { tipo: 'p', texto: 'Eu não sabia, na época, que a vingança era uma armadilha. Só descobri depois.' },
    { tipo: 'p', texto: 'No bando, havia uma velha. Svala. Vidente, diziam.' },
    { tipo: 'p', texto: 'Ela não me ensinou a lutar — isso eu já sabia. Ela me ensinou a ler. Runas.' },
    { tipo: 'citacao', texto: 'A velha dizia: "A espada decide depressa. A runa decide certo."' },
    { tipo: 'p', texto: 'Passei três invernos aprendendo.' },
    { tipo: 'p', texto: 'Isa riscada no gelo. Algiz gravada na soleira de cada abrigo. Othala desenhada de memória antes que o vento apagasse.' },
    { tipo: 'p', texto: 'Ela nunca explicava duas vezes. Apontava para a madeira, para o céu, para a cicatriz no próprio pulso:' },
    { tipo: 'citacao', texto: '"Lê. Se errares, a floresta corrige."' },
    { tipo: 'p', texto: 'Eu lia. Errava. Era corrigida. Lia de novo.' },
    { tipo: 'p', texto: 'Quando finalmente encontrei os homens que mataram a minha família, eu tinha vinte e três invernos e uma faca afiada.' },
    { tipo: 'p', texto: 'Não vou te contar como foi.' },
    { tipo: 'p', texto: 'Só vou te dizer o que senti depois: nada.' },
    { tipo: 'citacao', texto: 'A vingança não devolve os mortos. Ela só ocupa o vazio por um tempo, e depois deixa um vazio maior.' },
    { tipo: 'p', texto: 'Foi nesse vazio que eu comecei a andar sem rumo. O bando queria mais guerras. Eu não queria mais nada.' },
    { tipo: 'p', texto: 'Até que, numa tarde de chuva, vi uma cabana em pedaços no meio da floresta. Estava queimada, abandonada.' },
    { tipo: 'p', texto: 'E, ao lado dela, algo que parecia uma raiz gigantesca: Yggdrasil partida, queimada por um raio.' },
    { tipo: 'p', texto: 'Eu não sei explicar o que senti. Mas o pingente que carrego no peito — o Mjolnir que encontrei num campo de batalha, entre corpos — começou a esquentar. Como se respondesse a algo.' },
    { tipo: 'citacao', texto: 'Naquele momento, eu entendi: eu não precisava mais destruir. Eu precisava construir.' },
    { tipo: 'p', texto: 'Foi assim que a Taverna Fenrir nasceu. Não por acaso. Por escolha.' },
    { tipo: 'p', texto: 'Fenrir, o lobo, mordeu a mão de um deus para se libertar das correntes. Eu fiz o mesmo. Mordi a mão da guerra, do bando, da vingança, e me libertei.' },
    { tipo: 'p', texto: 'A taverna é isso: liberdade.' },
    { tipo: 'p', texto: 'Um refúgio onde armas não são empunhadas. Onde a trégua dura até a caneca esvaziar. Onde quem chega com sangue na bota limpa na esteira e senta ao lado do inimigo.' },
    { tipo: 'citacao', texto: 'Aqui dentro, ninguém precisa ser o que foi lá fora.' },
    { tipo: 'p', texto: 'E o dia do trovão? Você quer saber do dia do trovão.' },
    { tipo: 'p', texto: 'Foi antes da taverna. Antes de tudo isso.' },
    { tipo: 'p', texto: 'Uma tarde chuvosa, mais de trezentos homens no campo inimigo. O céu escureceu, o dia virou noite, os raios rasgavam as nuvens. Eu estava preocupada. Não por mim, mas pelos homens ao meu lado.' },
    { tipo: 'p', texto: 'Então um raio cortou o campo inimigo.' },
    { tipo: 'p', texto: 'E, naquele instante entre a luz e a chuva, vi algo que parecia a silhueta de um homem. Alto. Imóvel. Observando tudo enquanto o trovão rugia ao redor.' },
    { tipo: 'citacao', texto: 'Não sei o que vi naquele dia.' },
    { tipo: 'p', texto: 'Mas, depois da batalha, andando em meio aos corpos, encontrei o pingente. Desde então, carrego comigo. A lembrança dessa batalha, carrego em cicatrizes pelo corpo.' },
    { tipo: 'p', texto: 'Agora você sabe quem eu sou.' },
    { tipo: 'p', texto: 'Não sou deusa. Não sou heroína. Sou uma mulher que sobreviveu, que aprendeu a ler as runas, que fundou uma taverna no meio do nada porque não sabia fazer outra coisa.' },
    { tipo: 'p', texto: 'Se você chegou até aqui, é porque o fogo te chamou.' },
    { tipo: 'p', texto: 'Então senta, bebe, e me conta a sua história.' },
    { tipo: 'final', texto: 'A noite é longa. E eu tenho tempo.' },
    { tipo: 'assinatura', texto: '— contado por Runa, atrás do balcão.' }
  ]
};

// ============================================================
// A HISTÓRIA NÃO CONTADA (versão suave, sem spoiler)
// ============================================================
const HISTORIA_NAO_CONTADA = {
  titulo: 'A HISTÓRIA NÃO CONTADA',
  subtitulo: 'NÃO ABRA ESSA PORTA',
  texto: `Todo mundo que senta aqui já ouviu alguma coisa sobre mim.

Vocês sabem da vingança. Sabem da família que enterrei. Sabem do bando do Lobo Cinzento, que me acolheu quando eu não tinha mais ninguém. Sabem das runas, que a Svala me ensinou. Sabem do pingente de Mjolnir, que carrego no peito desde o Dia do Trovão. Sabem que troquei a guerra pelo avental, e que essa taverna nasceu de uma escolha.

Vocês sabem quase tudo.

Quase.

Tem um pedaço no meio. Um pedaço que eu deixo de fora quando alguém me pede pra contar minha história. Não porque é segredo. Porque algumas coisas eu ainda não aprendi a dizer em voz alta.

Esse pedaço começa no bando.

Eu já contei como cheguei lá. Contei do Halvar, que me olhou por um tempo que parecia um ano e disse só "ela fica". Contei da Svala, da faca de entalhe, do jeito que ela ensinava sem explicar duas vezes. Contei dos anos de frio, de fome, de aprender a remar e a segurar um machado.

O que eu não contei foi o resto.

No bando, tinha um homem. Não vou dizer o nome dele. Não porque ele não mereça ser lembrado — mas porque o nome dele é meu. É a única coisa que eu tenho que é só minha.

Ele não era bonito. Não era gentil. Não era nada que vocês chamariam de herói. Era um homem quieto, com o olhar voltado para algum lugar que eu nunca alcancei. Falava pouco. Sorria menos. Lutava como quem já perdeu tudo e não tinha mais medo de nada.

Ninguém no bando entendia ele. Eu também não entendia.

Mas a gente se reconheceu.

Não foi num momento bonito. Foi no meio de uma festa, depois de uma batalha, com tambores e fogo e gente gritando. Eu olhei pra ele. Ele olhou pra mim. Ficou assim. Nada mais. E naquele olhar a gente já sabia.

Vocês sabem como é isso, né? Quando alguém te olha e não precisa dizer nada porque você já entendeu tudo.

A gente começou a lutar junto. Não como quem protege. Como quem confia. Ele segurava um flanco, eu segurava o outro. A gente não combinava nada. A gente já sabia.

Foram anos. Anos de estrada, de batalha, de silêncio. Anos em que ele foi a única pessoa pra quem eu não precisava fingir nada. Nem força. Nem medo. Nem raiva. Nada.

E depois, numa outra noite, numa outra fogueira, ele me deu uma coisa. Uma pulseira de bronze. Trançada à mão. Do jeito que a gente fazia quando queria dizer algo que a boca não dava conta.

Na nossa tradição, uma pulseira entregue assim é uma promessa. É dizer "eu tô contigo, aconteça o que acontecer." É um juramento sem testemunha, sem deus, sem papel. Só entre duas pessoas.

Eu carrego essa pulseira até hoje.

E carrego o resto também.

Porque depois do juramento, aconteceu uma coisa. Uma coisa que eu não vou contar agora. Não hoje. Talvez nunca. Ou talvez só quando você tiver sentado aqui, na frente do fogo, e me pedir de um jeito que eu não consiga negar.

Se você quer ouvir essa história — a história inteira, com nome, com data, com o que aconteceu de verdade naquela emboscada — precisa me dizer. Aqui na taverna, ou lá fora, nas suas redes. Comente. Acenda essa história.

Se o fogo pegar, eu conto.

A noite é longa. E eu tenho tempo.`
};

// ============================================================
// OS 6 SÍMBOLOS
// ============================================================
const SIMBOLOS = [
  { id: 'halvar',  nome: 'Halvar',         icone: '🪢', historia: 'bando' },
  { id: 'brokkr',  nome: 'Brokkr & Eitri', icone: '⚒️', historia: 'brokkr' },
  { id: 'svala',   nome: 'Svala',          icone: '🪨', historia: 'runas' },
  { id: 'mjolnir', nome: 'Dia do Trovão',  icone: '⚡', historia: 'sobre' },
  { id: 'bardo',   nome: 'Bardo',          icone: '🍺', historia: 'bardo' },
  { id: 'ulf',     nome: 'A Pulseira',     icone: '⭕', historia: 'historia' }
];

// ============================================================
// UNIVERSO VIKING
// ============================================================
const VIKING = {
  intro: 'Um povo novo a cada semana. O norte não cabe num só conto.',
  imagem: 'runa-viking.jpg',
  link: 'https://meli.la/2YmDDte',
  linkTexto: 'Explorar o Universo Viking',
  grupos: [
    {
      id: 'povo', titulo: 'O Povo do Norte', subtitulo: 'Quem eram, como se organizavam, como viviam.',
      cards: [
        { titulo: 'As Raízes do Norte', subtitulo: 'De onde viemos.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Pirâmide Social', subtitulo: 'Reis, nobres e homens livres.', texto: '[A PREENCHER]', voceSabia: 'O Althing, na Islândia, é considerado o parlamento mais antigo do mundo ainda em funcionamento.' },
        { titulo: 'A Vida no Campo', subtitulo: 'Onde a verdadeira vida acontecia.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Justiça e o Thing', subtitulo: 'A assembleia que ditava as regras.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Mulher do Norte', subtitulo: 'Mais poder do que você imagina.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Arte e a Poesia', subtitulo: 'A alma do povo do norte.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'guerra', titulo: 'A Guerra', subtitulo: 'Aço, escudos e o preço da vitória.',
      cards: [
        { titulo: 'Aço e Madeira', subtitulo: 'As armas do dia a dia.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'O Muro de Escudos', subtitulo: 'A formação que definia batalhas.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Berserkers', subtitulo: 'A fúria que não sentia dor.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'As Invasões das Ilhas Britânicas', subtitulo: 'O terror que veio do mar.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'O que faziam com os mortos', subtitulo: 'A passagem para o outro lado.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'rotas', titulo: 'As Rotas', subtitulo: 'Os navios que ligaram o mundo.',
      cards: [
        { titulo: 'Dracares', subtitulo: 'A máquina de guerra e comércio.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Linhagem de Ragnar e a Pedra do Sol', subtitulo: 'A ambição de ser maior que o pai.', texto: '[A PREENCHER]', voceSabia: 'A "pedra do sol" (solarsteinn) era um cristal que polarizava a luz, permitindo encontrar a posição do sol mesmo em dias nublados.' },
        { titulo: 'Rotas Comerciais', subtitulo: 'Do Báltico ao Oriente.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Expansão para o Ocidente', subtitulo: 'O segredo do mar.', texto: '[A PREENCHER]', voceSabia: 'Os vikings chegaram à América do Norte (Vinland) por volta do ano 1000, quase 500 anos antes de Colombo.' }
      ]
    },
    {
      id: 'inverno', titulo: 'O Inverno', subtitulo: 'Sobreviver à estação mais longa.',
      cards: [
        { titulo: 'Sobrevivência', subtitulo: 'O maior inimigo era o frio.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Média de Vida', subtitulo: 'Uma vida breve e intensa.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Rituais de Passagem', subtitulo: 'Marcando o fim da infância.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'crencas', titulo: 'As Crenças', subtitulo: 'Os deuses no cotidiano do povo.',
      cards: [
        { titulo: 'A Fé no Dia a Dia', subtitulo: 'O sagrado no mundano.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Rituais e Ofertas', subtitulo: 'O que se dava aos deuses.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Amuletos e Símbolos', subtitulo: 'Proteção para levar no peito.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'A Transição para o Cristianismo', subtitulo: 'O crepúsculo dos deuses antigos.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    }
  ]
};

// ============================================================
// MITOLOGIA NÓRDICA
// ============================================================
const MITOLOGIA = {
  intro: 'Yggdrasil, Thor e Fenrir abrem as portas da casa. Novos deuses chegam toda semana.',
  imagem: 'runa-mitologia.jpg',
  link: 'https://meli.la/1oByRB2',
  linkTexto: 'Conhecer relíquias dos Deuses',
  grupos: [
    {
      id: 'arvore', titulo: 'A Árvore do Mundo', subtitulo: 'Onde tudo se conecta.',
      cards: [
        { titulo: 'Yggdrasil', subtitulo: 'A árvore que sustenta o cosmos.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Os Nove Reinos', subtitulo: 'Asgard, Midgard, Jotunheim...', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Os Poços Sagrados', subtitulo: 'Onde o saber foi buscado.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'aesir', titulo: 'Os Aesir — Deuses da Guerra', subtitulo: 'Os deuses de Asgard.',
      cards: [
        { titulo: 'Odin, o Pai de Todos', subtitulo: 'Sabedoria a qualquer preço.', texto: '[A PREENCHER]', voceSabia: 'Odin sacrificou um olho no poço de Mimir para obter sabedoria.' },
        { titulo: 'Thor, o Senhor do Trovão', subtitulo: 'O mais forte e o mais amado.', texto: '[A PREENCHER]', voceSabia: 'Thor era o deus dos camponeses — o povo simples o chamava em batalha.' },
        { titulo: 'Frigg, a Rainha de Asgard', subtitulo: 'A que sabe o destino de todos.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Tyr, o Deus da Justiça', subtitulo: 'O que sacrificou a mão pela lei.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Baldr, o Belo', subtitulo: 'O primeiro a morrer.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Heimdall, o Vigia', subtitulo: 'O que nunca dorme.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'vanir', titulo: 'Os Vanir — Deuses da Natureza', subtitulo: 'Os deuses da paz.',
      cards: [
        { titulo: 'Frey, o Senhor da Colheita', subtitulo: 'Deus dos campos e dos reis.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Freya, a Senhora da Magia', subtitulo: 'Metade dos mortos é dela.', texto: '[A PREENCHER]', voceSabia: 'Freya comanda metade dos guerreiros mortos em batalha (a outra metade é de Odin).' },
        { titulo: 'Njord, o Senhor dos Mares', subtitulo: 'Protege quem navega.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'gigantes', titulo: 'Loki, os Gigantes e as Criaturas', subtitulo: 'O que ameaça a ordem dos deuses.',
      cards: [
        { titulo: 'Loki, o Trapaceiro', subtitulo: 'Deus ou problema?', texto: '[A PREENCHER]', voceSabia: 'Loki é um jötunn (gigante) aceito entre os Aesir — nunca foi totalmente um deles.' },
        { titulo: 'Fenrir, o Lobo', subtitulo: 'O destino preso por correntes.', texto: '[A PREENCHER]', voceSabia: 'Fenrir é o lobo que dá nome à taverna de Runa — o aviso de que até o destino pode sentar à mesa.' },
        { titulo: 'Jörmungandr, a Serpente do Mundo', subtitulo: 'O que morde a própria cauda.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Hel, a Senhora do Submundo', subtitulo: 'Rainha dos que morrem de doença.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'Os Jotuns', subtitulo: 'Os gigantes que vieram antes dos deuses.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' }
      ]
    },
    {
      id: 'ragnarok', titulo: 'Ragnarok — O Fim e o Recomeço', subtitulo: 'Tudo o que morre, retorna.',
      cards: [
        { titulo: 'Os Sinais do Fim', subtitulo: 'Fimbulwinter, a morte de Baldr.', texto: '[A PREENCHER]', voceSabia: 'Fimbulwinter são três invernos seguidos sem verão — prenúncio do Ragnarok.' },
        { titulo: 'A Última Batalha', subtitulo: 'Odin contra Fenrir.', texto: '[A PREENCHER]', voceSabia: '[A PREENCHER]' },
        { titulo: 'O Recomeço', subtitulo: 'Depois do fogo, uma nova terra.', texto: '[A PREENCHER]', voceSabia: 'Depois do Ragnarok, dois humanos sobrevivem e repovoam o mundo — Lif e Lifthrasir.' }
      ]
    },
    {
      id: 'quem-escreveu', titulo: 'Quem Escreveu Tudo Isso', subtitulo: 'A verdade sobre a mitologia.',
      cards: [
        { titulo: 'As Eddas e o Cristianismo', subtitulo: 'Quem contou a história dos deuses pagãos.', texto: '[A PREENCHER]', voceSabia: 'A Edda em Prosa foi escrita por Snorri Sturluson, um político cristão islandês, no século XIII — 200 anos depois da Era Viking.' }
      ]
    }
  ]
};

// ============================================================
// AS 4 SALAS DE VENDA (textos reescritos, menos vendedores)
// ============================================================
const SALAS_VENDA = {
  facas: {
    titulo: 'Facas & Utensílios',
    subtitulo: 'A cozinha da taverna.',
    imagem: 'runa-facas.jpg',
    propaganda: 'propaganda-facas.jpg',
    link: 'https://meli.la/1BjvLGd',
    linkTexto: 'Conhecer a cozinha da Runa',
    texto: `Antes de eu saber manejar uma espada, eu sabia manejar uma colher.

Tem uma coisa que a gente esquece quando fala dos vikings: eles não viviam só de batalha. A maior parte da vida deles era na cozinha. Fazendo pão, defumando peixe, mexendo o caldo no caldeirão pendurado sobre a fogueira.

E naquele tempo, não existia comprar pronto. Existia fazer com as próprias mãos. Panela de ferro fundido, colher de madeira entalhada no inverno, prato trabalhado à mão por alguém da família. Cada peça carregava o nome de quem a fez.

A primeira coisa que eu fiz quando abri a taverna não foi armar uma parede. Foi pendurar um caldeirão no gancho da fogueira central. Achei que ninguém ia reparar. Mas os viajantes reparam. Um cozinheiro de passagem me disse: "É esse caldeirão que faz uma taverna ser casa. Não a porta, não a cama. O cheiro que sai dele."

Nunca esqueci.

Os utensílios que eu uso aqui seguem essa mesma lógica. Não é sobre ser bonito — é sobre ser usado. Faca que corta sem esforço. Panela que aguenta o fogo alto. Colher que não racha quando o caldo engrossa.

Nada aqui é enfeite. Tudo aqui é pra estar na mão.`
  },
  aneis: {
    titulo: 'Anéis & Pingentes',
    subtitulo: 'O que se carrega no peito.',
    imagem: 'runa-aneis.jpg',
    propaganda: 'propaganda-aneis.jpg',
    link: 'https://meli.la/2d46Yr4',
    linkTexto: 'Conhecer as relíquias da Runa',
    texto: `Tem uma coisa que a gente esquece quando fala de anel e pingente: na minha época, ninguém usava joia por moda. Não existia vitrine. Não existia tendência. Se você via um homem com um anel, ele tinha uma história. Se você via uma mulher com um colar, ele carregava um nome. O metal era só o que segurava a memória no lugar.

Na tradição do norte, um anel não era adorno. Era juramento. O anel de braço — o que vocês chamam hoje de pulseira — selava acordos entre homens e entre clãs. E o pingente, pendurado no peito, era a lembrança que a pessoa escolhia carregar pelo resto da vida.

Eu tenho um pingente. Você já viu ele — tá no meu peito desde antes de a taverna existir. É um Mjolnir. Encontrei num campo de batalha, no meio dos corpos, num dia que eu já contei pra vocês. Faz dez invernos isso.

Não sei de quem era. Não sei se a pessoa que usava ele voltou pra casa. Nunca vou saber. Mas carrego esse pingente desde então — não pelo ouro, não pela forma. Carrego porque enquanto ele tá comigo, aquela pessoa continua sendo lembrada. Mesmo que eu nunca tenha sabido o nome dela. Mesmo que ela tenha morrido antes de qualquer um de nós nascer.

É isso que um anel faz. Não é sobre brilhar. Não é sobre mostrar. É sobre lembrar. E sobre ser lembrado.

Os que eu escolhi pra colocar aqui são peças que podem carregar algo. Nada muito cheio de detalhe — assim você pode gravar tua runa, ou o nome de alguém. Ou deixar como tá. E lembrar do que quiser lembrar.`
  },
  casacos: {
    titulo: 'Casacos',
    subtitulo: 'O frio que não perdoa.',
    imagem: 'runa-casacos.jpg',
    propaganda: 'propaganda-casacos.jpg',
    link: 'https://meli.la/2E1qZ6V',
    linkTexto: 'Conhecer os casacos da Runa',
    texto: `No norte, quem não se cobre, morre.

Não é força de expressão. Eu vi acontecer.

No inverno, os viajantes chegam aqui com o mesmo olhar: cansados, com frio, querendo fogo. Alguns chegam inteiros. Alguns chegam com os dedos roxos. Alguns não chegam. A estrada entre o norte e a taverna tem mais gente enterrada do que qualquer campo de batalha que eu já pisei.

Aprendi uma coisa na marra, e é isso que eu levo pra quem me pergunta sobre roupa de inverno: casaco bom não é o mais bonito. É o que aguenta o dia mais frio e ainda tá inteiro no inverno seguinte.

Pele de lobo aquece mais. Pele de raposa esquenta rápido mas gasta. Lã de ovelha aguenta a umidade. E camada em cima de camada — linho por baixo, lã no meio, pele por cima — é o que segura o calor dentro do corpo quando o vento aperta.

Não é ciência complicada. É prática de quem viveu.

Se você mora no frio, sabe do que eu tô falando. Se não mora, e vai passar por um inverno de verdade, leva a sério. Um casaco ruim é a diferença entre voltar pra casa e virar estátua de gelo na estrada.`
  },
  heavymetal: {
    titulo: 'Heavy Metal & Camisetas',
    subtitulo: 'O que a gente veste e o que a gente canta.',
    imagem: 'runa-heavymetal.jpg',
    propaganda: 'propaganda-heavymetal.jpg',
    link: 'https://meli.la/272cpsh',
    linkTexto: 'Conhecer a tribo da Runa',
    texto: `Tem uma ideia errada que corre por aí, de que viking era um bando de gente suja coberta de trapo. Não era. A gente se importava com o que vestia. Muito.

Cada peça tinha um motivo. As cores não eram escolhidas por acaso — vermelho vinha da raiz de ruiva, azul do pastel, amarelo da cebola. Os bordados contavam de que família você vinha. As tranças no cabelo diziam se você era casada, solteira, ou se tava de luto. Não era moda. Era linguagem. Era dizer, sem abrir a boca, quem você era e de onde vinha.

Eu gostava das peças escuras. Preto e cinza, com bordado vermelho discreto. Não por moda — porque combinava com o que eu sentia por dentro.

E a música… isso é outra coisa que a gente esquece. Viking não era só batalha e silêncio. Depois de cada vitória, a gente fazia festa. Fogueira alta, hidromel correndo, gente rindo até cair. E cada festa tinha música. Só que a música variava.

Alguns gostavam das canções antigas. Sérias, lentas, contando as sagas dos deuses. A voz do bardo subia e todo mundo calava. Era bonito.

Eu não. Eu gostava das que faziam o chão tremer.

Tinha um batedor no bando, o Kalf, que tocava tambor com as mãos nuas até sangrar. E tinha uma velha que puxava um canto grave, gutural, que subia pelas paredes do salão como se o próprio chão estivesse cantando. Aquilo sim mexia comigo. Aquilo falava com uma parte de mim que as canções serenas não alcançavam. A parte que ainda tinha raiva. A parte que precisava gritar, mesmo quando tudo já tinha sido resolvido.

É isso que eu ainda carrego. Esse som pesado. Essa batida que não pede licença, que vem de dentro, que faz o peito vibrar antes de a cabeça entender.

Aqui, a gente canta o que a gente é.`
  }
};

// ============================================================
// FIM
// ============================================================
