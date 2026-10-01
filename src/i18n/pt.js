// Textos em português (pt-BR). Fonte: site atual (borespot.com/pt) e decisões do projeto.
// Regra: toda informação tem que bater com o site atual. Nada inventado. Sem travessões.
// Copy reescrita em 27/09 conforme plano-copy.md, a partir do banco de fatos (códigos F-xx, plano-copy.md seção 3) e não
// como tradução frase a frase do inglês. Vocabulário técnico: o que o cliente já usa em borespot.com/pt
// (equipes, localizações, marcações, localizadores, encarregado); única troca: "concessionárias" virou "empresas de utilidade pública".
// Você em todo o site. Só a primeira palavra em maiúscula em botões, menus, abas e títulos.

export default {
  meta: {
    title: 'Bore Spot | Gestão de tickets 811 para empreiteiros de obras subterrâneas', // F-A1, F-C1
    description: 'A Bore Spot cuida dos seus tickets 811 do início ao fim: ação no mesmo dia, acompanhamento proativo, mapas interativos e encerramento. Mais de 18 estados.', // F-A10, F-A7, F-A2, F-A3, F-D2
  },

  ui: {
    skipToContent: 'Pular para o conteúdo',
    backToTop: 'Bore Spot, voltar ao topo',
    home: 'Início da Bore Spot',
    mainNav: 'Principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    language: 'Idioma',
    book: 'Agende uma ligação de 15 min', // F-B5, F-H1 (texto do site atual)
    talk: 'Fale com nossa equipe', // F-H1
    requestSupport: 'Solicitar suporte', // F-H1
    // Aviso de rolagem da intro (01/10): computador rola para baixo; no celular o dedo arrasta para cima
    scroll: 'Role para baixo',
    swipe: 'Arraste para cima',
    keepScroll: 'Continue rolando',
    keepSwipe: 'Continue arrastando para cima',
    cueLabel: 'Ir para a próxima parte',
    exampleView: 'Exemplo ilustrativo',
    // O site atual em português mostra "3.5M+" (com ponto), igual ao inglês.
    numberLocale: 'en-US',
  },

  nav: [ // F-H5
    { label: 'Serviços', to: '#services' },
    { label: 'Como funciona', to: '#process' },
    { label: 'Contato', to: '#contact' },
    { label: 'Programa de indicação', page: '/referral' },
  ],

  intro: {
    scenes: [
      {
        promise: 'Todas as equipes escavando. Ninguém esperando o 811.', // F-F1, F-G1
        reality: 'A Bore Spot cuida dos seus tickets 811, da abertura ao encerramento.', // F-A10, F-A4 (29/09)
      },
      {
        promise: 'Seu escritório mais leve. Você lidera a empresa.', // F-E5, F-G6
        reality: 'Acompanhamento de localizadores, renovações, mapas interativos de tickets e encerramento. Nas mãos de quem conhece obra subterrânea.', // F-A1, F-A2, F-A3, F-A8, F-E2
      },
    ],
    proofFeetLine: 'pés com suporte da Bore Spot.', // F-D3
    proofClientsLine: 'empreiteiros mantêm suas equipes em movimento com a Bore Spot.', // PROVISÓRIO: só com o número de clientes
    proofSmall: ['18+ estados atendidos', 'Suporte em EN, ES e PT'], // F-D2, F-D4
    tagline: 'Suporte operacional para empreiteiros de obras subterrâneas', // F-E4
  },

  // Hero: fica como aprovada (decisão de Armin 27/09); textos do site atual.
  hero: {
    eyebrow: 'Suporte operacional para empreiteiros de obras subterrâneas', // F-E4
    title: 'Seus tickets 811, gerenciados do início ao fim.', // F-A10
    sub: 'Ação no mesmo dia, acompanhamento proativo e mapas interativos de tickets para empreiteiros de obras subterrâneas em mais de 18 estados.', // F-A7, F-A2, F-D2
    panelLabel: 'Exemplo ilustrativo do mapa de tickets da Bore Spot', // F-A6
    cta: 'Agende uma ligação de 15 min com um especialista', // F-B5 (CTA do site atual). Um botão só na hero (Armin, 28/09)
  },

  logosTitle: 'Empresas e operações que já apoiamos', // F-D5

  problem: {
    eyebrow: 'Para empreiteiros que não podem se dar ao luxo de atrasar', // F-C2
    title: 'O caos de tickets não fica no escritório.', // F-F6
    lead: [
      'A maioria dos empreiteiros não liga para a gente no primeiro dia. Quando liga, o problema já deixou de ser administrativo. É operacional.', // F-F2
    ],
    items: [
      {
        title: 'Equipes ficam paradas esperando localizações', // F-F1
        text: 'Entra uma equipe nova e o volume de tickets dispara. Conforme as obras crescem, o estresse se acumula rápido.', // F-F1, F-F3 (29/09)
        alt: 'Uma equipe de camisas refletivas em pé em volta de uma pequena escavação na beira da rua, com tinta de marcação e bandeirinhas na calçada.',
      },
      {
        title: 'Tickets expiram e as obras perdem ritmo', // F-F1
        text: 'Um atraso sério, um incidente de dano ou um problema evitável obriga a recomeçar do zero.', // F-F1, F-F3 (29/09)
        alt: 'Setas verdes de marcação de redes subterrâneas pintadas com spray no asfalto.',
      },
      {
        title: 'O escritório perde o dia no telefone', // F-F3
        text: 'Renovação, controle e cobrança de localizador feitos na mão geram erro e confusão. Ninguém enxerga o que está liberado, pendente ou em risco.', // F-F3, F-F1
        alt: 'Um funcionário de escritório ao telefone diante de dois monitores cheios de planilhas e fotos.',
      },
      {
        title: 'O dono acaba correndo atrás de ticket', // F-F1
        text: 'Em vez de cuidar de projetos, crescimento e lucro, o dono ou alguém-chave da equipe passa o dia administrando ticket.', // F-F3, F-F1
        alt: 'Um homem preocupado, de boné, falando ao telefone na mesa de trabalho.',
      },
    ],
    closing: [ // F-F4
      'Quando as equipes param, a produção desacelera.',
      'Quando a produção desacelera, o lucro cai.',
      'E quando isso se repete, o crescimento trava.',
    ],
  },

  services: {
    eyebrow: 'Do ticket ao encerramento', // F-A9
    title: 'Antes, durante e depois da obra.', // F-A5
    lead: 'A gente não só abre tickets. Assume o fluxo inteiro, com compromisso, estrutura e conhecimento real de campo. Uma extensão da sua equipe, não um fornecedor.', // F-A8
    items: [
      {
        key: 'before',
        phase: 'Antes da construção', // F-A1
        title: 'Gestão de tickets 811', // F-A1
        text: 'O trabalho inicial que mantém as obras prontas para avançar.', // F-A1 (frase do site atual; 29/09)
        list: [ // F-A1
          'Abertura de tickets 811',
          'Acompanhamento do status de cada ticket',
          'Cobrança para acelerar as marcações',
          'Contato com empresas de utilidade pública e centros 811',
          'Renovação dos tickets antes de vencer',
          'Redação técnica para o envio de tickets',
        ],
      },
      {
        key: 'during',
        phase: 'Durante as operações', // F-A2
        title: 'Visibilidade, clareza e controle', // F-A2
        text: 'Enquanto as equipes escavam, você sabe em que pé está cada ticket.', // F-A2 (29/09)
        list: [ // F-A2
          'Mapas interativos de tickets',
          'Visibilidade das áreas marcadas como liberadas ou pendentes',
          'Relatórios gerenciais',
          'Melhor coordenação de campo',
          'Mais confiança nas decisões operacionais',
        ],
      },
      {
        key: 'after',
        phase: 'Depois da obra', // F-A3
        title: 'Suporte de encerramento que fecha o trabalho direito', // F-A3
        text: 'A gente fecha o ciclo, em vez de deixá-lo inacabado.', // F-A3 (frase do site atual; 29/09)
        list: ['Redlines', 'Relatórios de produção', 'Suporte ao faturamento'], // F-A3
      },
    ],
    // closing "O que muda..." saiu em 29/09: repetia as 3 listas (F-A5 coberto por elas).
    cta: 'Veja como podemos apoiar seu próximo projeto', // F-H1 (CTA do site atual)
    // Ticket carimbado (30/09): título do cartão e os carimbos, na ordem (antes: 3, durante: 2, depois: 2, e o fechamento).
    // Resumem as listas de cada fase acima. Os status do cartão (Waiting on Locate, Cleared, Active, Closed out) ficam em inglês: são rótulos do sistema.
    ticket: { title: 'Ticket 811', stamps: ['Ticket aberto', 'Área liberada', 'Renovado', 'No mapa', 'Relatório', 'Redlines', 'Faturamento', 'Encerrado'] },
    map: {
      before: 'Antes · tickets abertos · esperando localização',
      during: 'Durante · áreas liberadas e ativas',
      after: 'Depois · redlines e encerramento',
      cardTitle: 'Suporte de encerramento',
      card: ['Redlines', 'Relatórios de produção', 'Suporte ao faturamento'],
      legendRedlines: 'Redlines',
    },
  },

  roles: {
    eyebrow: 'Para toda a operação',
    title: 'Você lidera a empresa. Os tickets ficam com a gente.', // F-G6
    tablistLabel: 'Escolha seu cargo',
    items: [
      {
        key: 'owner',
        tab: 'Dono',
        title: 'Volte a liderar a empresa.', // F-G6
        text: 'Sem suporte, o coordenador de tickets é você: liga para abrir ticket, acompanha localizador, confere vencimento, corre atrás de marcação e remenda planilha e e-mail.', // F-B6
        list: ['Tempo, foco e controle de volta para fazer o negócio crescer', 'Menos interrupções em toda a obra', 'Você deixa de ser o coordenador de tickets'], // F-B7, F-G4, F-B6
        alt: 'Dois trabalhadores de colete refletivo conversando ao lado de uma escavação grande enquanto as escavadeiras trabalham.',
      },
      {
        key: 'pm',
        tab: 'Gerente de projeto',
        title: 'Ganhe clareza operacional.', // F-G3
        text: 'Sua equipe enxerga mais e reage mais rápido.', // F-G3
        // A terceira linha vem do card "Client map access" da imagem do produto do site atual.
        list: ['Cada ticket no mapa, com seu status', 'Relatórios organizados e controle do fluxo', 'Compartilhe mapas seguros e em tempo real com sua equipe e seus clientes'], // F-A6, F-G3
        alt: 'O mapa de tickets da Bore Spot em um tablet e um celular, com os tickets coloridos por status.',
      },
      {
        key: 'office',
        tab: 'Equipe de escritório',
        title: 'Elimine a sobrecarga interna.', // F-G2
        text: 'Sua equipe de escritório não carrega mais sozinha o peso dos tickets.', // F-G2
        list: ['Ligações, renovações e acompanhamentos: por nossa conta', 'O estresse do escritório diminui', 'As obras andam com menos atrito'], // F-G2, F-G5
        alt: 'Um funcionário de escritório recostado na cadeira, com as mãos atrás da cabeça, diante de uma mesa organizada.',
      },
      {
        key: 'foreman',
        tab: 'Encarregado de campo',
        title: 'Mantenha as equipes escavando.', // F-G1
        text: 'Marcações mais rápidas e comunicação mais clara com empresas de utilidade pública e localizadores cortam os atrasos que deixam equipe parada.', // F-A1, F-A5, F-G1
        // A terceira linha vem do card "Field-ready view" da imagem do produto do site atual. Mantida: decisão de Armin 27/09.
        list: ['As equipes continuam produzindo', 'Seus projetos continuam andando', 'Tudo o que sua equipe precisa, em qualquer lugar e a qualquer hora'], // F-G5, F-G1, F-A6
        alt: 'Uma equipe de capacete e colete refletivo trabalhando numa escavação de redes subterrâneas.',
      },
    ],
  },

  // Por que a Bore Spot: funde os antigos blocos Diferenciais e Gente de verdade (decisão de Armin 27/09).
  why: {
    eyebrow: 'Feito para obra subterrânea', // F-E2
    title: 'Não é software. Não é terceirização genérica.', // F-E1
    lead: 'Suporte operacional de verdade, feito por gente que conhece obra subterrânea.', // F-E1, F-E2
    items: [
      { icon: 'people', title: 'Gente na frente', text: 'Pessoas de verdade cuidam dos seus tickets, da abertura ao encerramento.' }, // F-E2, F-A4
      { icon: 'route', title: 'Feito para operações subterrâneas', text: 'Mais de 6 anos em operações subterrâneas e mais de 3,5 milhões de pés com suporte.' }, // F-D1, F-D3 (29/09)
      { icon: 'lang', title: 'Inglês, espanhol e português', text: 'Coordenação multilíngue para equipes de campo e escritório.' }, // F-C5, F-D4
      { icon: 'clock', title: 'Ação no mesmo dia', text: 'O ticket anda no mesmo dia em que chega. A gente acompanha antes de alguém precisar pedir.' }, // F-A7 (o como fica no passo 02 do processo; 29/09)
    ],
    closing: ['Não somos só apoio.', 'Ajudamos a carregar a operação.'], // F-E3
    // Central (30/09). "Cleared" é rótulo do sistema e fica em inglês. "|" quebra o rótulo em duas linhas.
    hub: {
      sides: ['Sua equipe', 'A gente resolve'],
      core: 'Equipe Bore Spot',
      nodes: { crew: 'Equipe de campo', office: 'Escritório', owner: 'Dono', center: 'Central 811', utility: 'Empresas de|utilidade pública', locator: 'Localizadores' },
      proof: ['6+ anos', '3.5M+ pés com suporte'],
      stories: [
        { from: 'crew', lang: 'ES', to: 'locator', action: 'Localizador acionado', back: 'Cleared' },
        { from: 'office', lang: 'EN', to: 'center', action: 'Ticket aberto', back: 'Mesmo dia' },
        { from: 'owner', lang: 'PT', to: 'utility', action: 'Empresa acionada', back: 'Mapa atualizado' },
      ],
    },
    chipsLabel: 'Tipos de projeto', // F-C1
    cta: 'Fale com nossa equipe', // F-H1 (CTA do site atual). Chips de tipo de projeto viraram rótulos (Armin, 28/09)
    alt: 'Uma equipe de macacão laranja trabalhando numa escavação na rua, entre tubulações expostas, com cones e barreiras em volta.',
  },

  process: {
    eyebrow: 'Como funciona',
    title: 'Processo simples. Execução real.', // F-B8
    lead: 'Nós cuidamos da carga operacional por trás da obra. Você foca em produção e lucro.', // F-B8
    center: ['Melhor visibilidade.', 'Melhor controle.', 'Melhor continuidade em toda a obra.'], // texto do site atual (mantido: decisão de Armin 27/09)
    steps: [
      { n: '01', title: 'Envie as informações do seu projeto', text: 'Recebemos os detalhes da obra e iniciamos o fluxo de tickets na hora.' }, // F-B1
      { n: '02', title: 'Ação no mesmo dia', text: 'Os tickets são abertos rápido e encaminhados na hora, para que o trabalho não fique enterrado em pendências.' }, // F-B2, F-A7
      { n: '03', title: 'Acompanhamento e controle contínuos', text: 'Atualizações, renovações, controle e coordenação até o ticket ser encerrado.' }, // F-B3
      { n: '04', title: 'Fique informado em cada etapa', text: 'Mapas interativos e relatórios estruturados mostram para a sua equipe o que está acontecendo.' }, // F-B4
    ],
  },

  faq: {
    eyebrow: 'O que os empreiteiros nos perguntam',
    title: 'Perguntas frequentes',
    // 29/09: de 11 para 6. Saíram as perguntas que repetiam a página (o que fazemos, durante, depois,
    // idiomas, quem nos procura): as respostas estão em Serviços, Por que a Bore Spot e Problema.
    items: [
      {
        q: 'Como a gente começa?',
        a: ['Agende uma ligação de 15 minutos com um especialista ou preencha o formulário abaixo. Recebemos os detalhes da obra e iniciamos o fluxo de tickets na hora.'], // F-B5, F-B1
      },
      {
        q: 'Isso é um software?',
        a: ['Não. Gente de verdade cuida dos seus tickets. Você acompanha o trabalho nos mapas interativos de tickets e nos relatórios estruturados.'], // F-E1, F-E2, F-A2, F-B4
      },
      {
        q: 'Em quais estados vocês atuam?',
        a: ['Apoiamos operações subterrâneas em mais de 18 estados. Diga no formulário onde fica o projeto e a gente entra em contato.'], // F-D2, F-H3, F-B5
      },
      {
        q: 'Que tipos de projeto vocês apoiam?',
        a: ['Obra subterrânea: HDD, instalação de fibra, plow, missile, aéreo e hidráulica. Se o seu é diferente, escolha Outro no formulário e nos conte.'], // F-C1, F-E1
      },
      {
        q: 'Vocês têm programa de indicação?',
        a: ['Sim. Quando a empresa que você indica assina com a Bore Spot e completa 5 semanas como cliente ativo, você recebe $500.'], // F-I1
        link: { label: 'Ver o programa de indicação', page: '/referral' },
      },
      {
        q: 'Como falo com vocês?',
        a: ['Preencha o formulário desta página, ligue para +1 (321) 237-3200 ou escreva para office@borespot.com.'], // F-H4
      },
    ],
  },

  contact: {
    title: 'Pare de gerenciar o caos de tickets. Mantenha suas equipes escavando.', // F-G6, F-G1
    sub: 'A Bore Spot cuida da execução nos bastidores. Suas equipes continuam trabalhando, seu escritório fica mais leve e sua operação, sob controle.', // F-G8, F-E5
    formTitle: 'Receba suporte rápido para seu próximo projeto', // F-H3
    formLead: 'Preencha o formulário e nossa equipe vai analisar seu projeto e entrar em contato rapidamente.', // F-B5
    optional: '(opcional)',
    fields: { // F-H3
      name: { label: 'Nome', error: 'Informe seu nome.' },
      company: { label: 'Empresa', error: 'Informe o nome da sua empresa.' },
      phone: { label: 'Celular', error: 'Informe um telefone para podermos falar com você rápido.' },
      email: { label: 'E-mail', error: 'Informe um e-mail válido, como nome@empresa.com.' },
      state: { label: 'Estado', error: 'Informe o estado onde fica o projeto.' },
      projectType: { label: 'Tipo de projeto', placeholder: 'Selecione um tipo de projeto', error: 'Escolha um tipo de projeto.' },
      crews: { label: 'Número de equipes' },
      details: { label: 'Nos conte um pouco mais sobre seus desafios' },
    },
    projectTypes: { // F-C1
      HDD: 'HDD', 'Fiber Installation': 'Instalação de fibra', Plow: 'Plow', Missile: 'Missile',
      Aerial: 'Aéreo', Plumbing: 'Hidráulica', Other: 'Outro',
    },
    status: {
      invalid: 'Corrija os campos destacados.',
      notConnected: 'O envio ainda não está conectado. Este formulário vai funcionar quando o destino for definido.',
      sending: 'Enviando...',
      ok: 'Obrigado. Nossa equipe vai analisar seu projeto e entrar em contato rapidamente.',
      error: 'Não conseguimos enviar sua solicitação. Tente de novo ou ligue para nós.',
    },
  },

  footer: {
    tagline: 'Suporte operacional para empreiteiros de obras subterrâneas. Mantendo equipes em movimento, tickets gerenciados e projetos no caminho certo.', // F-E6
    navTitle: 'Navegação',
    nav: [ // F-H5
      { label: 'Início', to: '#top' },
      { label: 'Serviços', to: '#services' },
      { label: 'Como funciona', to: '#process' },
      { label: 'Contato', to: '#contact' },
      { label: 'Programa de indicação', page: '/referral' },
    ],
    legalTitle: 'Legal',
    legal: [{ label: 'Termos e condições', page: '/legal/terms-and-conditions' }],
    contactTitle: 'Contato',
    languagesTitle: 'Idiomas',
    rights: 'Todos os direitos reservados.',
  },

  // Página do Programa de Indicação: texto do site atual (borespot.com/pt/referral). Travessões trocados por dois-pontos ou vírgula.
  // ATENÇÃO: no site atual, a versão em português diz que auto-indicações são bem-vindas, e a versão em inglês diz
  // que o dono da empresa não pode receber a recompensa por indicar a própria empresa. Cada idioma foi mantido como está no site atual.
  referral: {
    meta: {
      title: 'Programa de indicação Bore Spot | Ganhe $500',
      description: 'Indique um empreiteiro de obras subterrâneas para a Bore Spot. Se ele assinar e completar 5 semanas como cliente ativo, você ganha $500.',
    },
    eyebrow: 'Programa de indicação da Bore Spot',
    title: 'Indique um empreiteiro. Ganhe $500.',
    intro: [
      'Quando a empresa que você indicar assinar com a Bore Spot e completar 5 semanas como cliente ativo, você receberá $500.',
      'Seja no campo, gerenciando equipes ou liderando uma empresa, sua indicação é bem-vinda.',
    ],
    bestFit: 'Perfil ideal: empreiteiros de obras subterrâneas envolvidos no processo 811, normalmente com 1 a 5 equipes. Também estamos abertos a operações maiores quando há um bom encaixe.',
    cta: 'Enviar uma indicação',
    sections: [
      {
        title: 'Construído sobre crescimento. Movido por gratidão.',
        text: 'Conforme a Bore Spot continua crescendo, expandimos nossa capacidade de forma estruturada para poder apoiar mais empreiteiros sem comprometer a qualidade da operação. Esta iniciativa de indicação faz parte desse crescimento: uma forma de reconhecer as pessoas que ajudam empresas fortes a encontrar o suporte certo, enquanto continuamos contribuindo para uma infraestrutura melhor em todo o país.',
      },
      {
        title: 'Quem pode enviar uma indicação?',
        text: 'Se você trabalha no campo, gerencia equipes, lidera operações, é dono de uma empresa, ou acredita que sua própria equipe poderia se beneficiar da Bore Spot, você pode enviar uma indicação. Auto-indicações são bem-vindas. A pessoa que envia o formulário de indicação é quem tem direito à recompensa de $500.',
      },
      {
        title: 'Por que empreiteiros são indicados para a Bore Spot',
        text: 'A Bore Spot apoia empreiteiros de obras subterrâneas em todo o fluxo de trabalho de tickets 811, desde a criação do ticket até o faturamento final, com ação no mesmo dia, acompanhamento proativo, mapas interativos de tickets e suporte operacional real. Ajudamos equipes a melhorar a visibilidade, reduzir atrasos e operar com mais confiança no campo.',
      },
      {
        title: 'Para quem este programa foi criado',
        text: 'Este programa foi criado para empreiteiros de obras subterrâneas envolvidos no processo 811, especialmente operações menores com cerca de 1 a 5 equipes. Dito isso, estamos sempre abertos a conversas com equipes maiores quando há um bom encaixe operacional. Se um empreiteiro precisa de melhor suporte de tickets, melhor acompanhamento e mais visibilidade operacional, adoraríamos saber sobre ele.',
      },
    ],
    how: {
      title: 'Como a indicação funciona',
      steps: [
        { n: '01', title: 'Envie o formulário de indicação', text: 'Nos conte quem você está indicando, como entrar em contato e no que você acredita que a Bore Spot pode ajudar.' },
        { n: '02', title: 'Avaliamos o encaixe e entramos em contato', text: 'Nossa equipe avaliará a oportunidade e entrará em contato com a empresa se parecer haver um bom encaixe.' },
        { n: '03', title: 'Eles assinam e completam 5 semanas', text: 'Se a empresa indicada assinar com a Bore Spot e permanecer como cliente por 5 semanas, a pessoa que enviou a indicação ganha $500.' },
      ],
      note: 'Uma apresentação direta da sua parte pode nos ajudar a conectar mais rápido e criar uma primeira conversa mais forte.',
      quote: 'Isso não é uma gorjeta. É a nossa forma de reconhecer as pessoas que ajudam a mover este mercado para frente.',
    },
    form: {
      title: 'Enviar uma indicação',
      lead: 'Nos conte quem você está indicando, onde operam e no que você acredita que a Bore Spot pode ajudar a melhorar. Revisaremos as informações e faremos acompanhamento se parecer um bom encaixe.',
      groups: [
        {
          fields: [
            { name: 'referrerName', label: 'Seu nome', type: 'text', required: true, autocomplete: 'name', full: true },
            { name: 'referrerEmail', label: 'Seu e-mail', type: 'email', required: true, autocomplete: 'email' },
            { name: 'referrerPhone', label: 'Seu número de telefone', type: 'tel', required: true, autocomplete: 'tel' },
            { name: 'referredCompany', label: 'Nome da empresa indicada', type: 'text', required: true, full: true },
            { name: 'helpWith', label: 'No que você acredita que a Bore Spot pode ajudar?', type: 'textarea', required: true, full: true },
            { name: 'serviceArea', label: 'Estados do projeto / área de atendimento', type: 'textarea', required: true, full: true },
            { name: 'contactName', label: 'Nome do contato indicado', type: 'text', required: true },
            { name: 'contactPhone', label: 'Telefone do contato indicado', type: 'tel', required: true },
          ],
        },
        {
          title: 'Opcional',
          optional: true,
          fields: [
            { name: 'contactEmail', label: 'E-mail do contato indicado', type: 'email', full: true },
            { name: 'additionalNotes', label: 'Notas adicionais (opcional)', type: 'textarea', full: true },
          ],
        },
      ],
      consent: 'Declaro que as informações enviadas são precisas, que tenho permissão ou outra base legal para compartilhar as informações do contato indicado com a Bore Spot para fins de indicação comercial, que esta indicação não é proibida por nenhuma política de empregador, contrato, dever ou lei, e que a Bore Spot pode entrar em contato com a empresa indicada sobre seus serviços.',
      submit: 'Enviar indicação',
    },
    faq: {
      title: 'Perguntas frequentes',
      items: [
        { q: 'Quem pode participar do programa de indicação?', a: ['Seja no campo, gerenciando equipes ou liderando uma empresa, sua indicação é bem-vinda.'] },
        { q: 'Quando os $500 são pagos?', a: ['A recompensa de $500 é paga após a empresa indicada assinar com a Bore Spot e completar 5 semanas como cliente ativo.'] },
        { q: 'Quem recebe a recompensa?', a: ['A recompensa vai para a pessoa que enviou o formulário de indicação.'] },
        { q: 'Que tipo de empresas são as mais adequadas?', a: ['Empreiteiros de obras subterrâneas envolvidos no processo 811 são os mais adequados, especialmente operações menores com cerca de 1 a 5 equipes. Dito isso, estamos sempre abertos a conversas com equipes maiores quando há um bom encaixe operacional.'] },
        { q: 'Preciso dizer à empresa que a indiquei?', a: ['Não, mas uma apresentação direta da sua parte pode nos ajudar a conectar mais rápido e melhorar as chances de um bom encaixe.'] },
        { q: 'Todas as indicações dão direito à recompensa?', a: ['Não automaticamente. A recompensa se aplica quando a empresa indicada assina com a Bore Spot e completa 5 semanas como cliente ativo.'] },
      ],
    },
    terms: {
      title: 'Termos do programa de indicação',
      items: [
        { title: 'Elegibilidade', text: 'O Programa de Indicação da Bore Spot está aberto a indivíduos que enviem uma indicação válida através do formulário oficial.' },
        { title: 'Elegibilidade da recompensa', text: 'Uma indicação qualifica para a recompensa de $500 somente se a empresa indicada assinar um contrato de serviço com a Bore Spot e completar 5 semanas como cliente ativo.' },
        { title: 'Quem recebe a recompensa', text: 'A recompensa é emitida somente para a pessoa que enviou o formulário de indicação.' },
        { title: 'Indicações qualificadas', text: 'As empresas indicadas devem estar envolvidas em operações subterrâneas e no processo 811 e devem estar razoavelmente alinhadas com o perfil de serviços da Bore Spot.' },
        { title: 'Indicações duplicadas ou inválidas', text: 'Se a mesma empresa for indicada mais de uma vez, a Bore Spot pode creditar a primeira indicação válida recebida. A Bore Spot se reserva o direito de rejeitar indicações incompletas, duplicadas, fraudulentas, enganosas ou de baixa qualidade.' },
        { title: 'Prazo de pagamento', text: 'Os pagamentos de indicação são emitidos após as condições de qualificação serem cumpridas e qualquer informação de pagamento ou fiscal necessária ter sido fornecida.' },
        { title: 'Impostos', text: 'Qualquer obrigação de declaração fiscal, pagamento de impostos ou relatório fiscal associada à recompensa de indicação é de responsabilidade exclusiva do destinatário. A Bore Spot pode solicitar informações adicionais se exigido pela lei aplicável antes de emitir o pagamento.' },
        { title: 'Alterações no programa', text: 'A Bore Spot se reserva o direito de modificar, suspender ou encerrar o Programa de Indicação ou seus termos a qualquer momento.' },
      ],
    },
  },

  // Central jurídica: texto do site atual (borespot.com/pt/legal/terms-and-conditions).
  // No site atual, o texto dos documentos está em inglês também em português; só títulos e rótulos são traduzidos.
  legal: {
    meta: {
      title: 'Termos e condições | BoreSpot',
      description: 'Acesse os termos jurídicos, políticas, avisos e histórico de versões vigentes da BoreSpot.',
    },
    title: 'Termos e condições',
    lead: 'Acesse os termos jurídicos, políticas e avisos vigentes da BoreSpot.',
    select: 'Selecione um documento abaixo para ver sua página completa.',
    currentTitle: 'Documentos jurídicos vigentes',
    versionLabel: 'Versão atual:',
    effectiveLabel: 'Data de vigência:',
    view: 'Ver documento',
    historyTitle: 'Histórico de versões',
    historyLead: 'Versões anteriores permanecem disponíveis para consulta.',
    current: 'Vigente',
    versionWord: 'Versão',
    back: 'Voltar para Termos e condições',
    pendingText: 'O texto completo deste documento está sendo finalizado e será publicado nesta página em breve.',
    docs: [
      { slug: 'user-terms', title: 'Termos de uso do usuário', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'acceptable-use', title: 'Política de uso aceitável', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'security', title: 'Política de segurança do usuário', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'user-privacy', title: 'Aviso de privacidade do cliente e do usuário autorizado', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'website-terms', title: 'Termos de uso do site', version: '1.0', effective: '21 de agosto de 2026', pending: true },
      { slug: 'website-privacy', title: 'Política de privacidade do site', version: '1.0', effective: '21 de agosto de 2026', pending: true },
    ],
  },
};
