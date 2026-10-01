// Textos em inglês. Fonte: site atual (borespot.com/en) e decisões do projeto.
// Regra: toda informação tem que bater com o site atual. Nada inventado. Sem travessões.
// Copy reescrita em 27/09 conforme plano-copy.md. Os códigos F-xx entre comentários apontam para o
// banco de fatos (plano-copy.md, seção 3), extraído de conteudo-site-atual/landing-en.txt.

export default {
  meta: {
    title: 'Bore Spot | 811 Ticket Management for Underground Contractors', // F-A1, F-C1
    description:
      'Bore Spot runs your 811 tickets end-to-end: same-day action, proactive follow-ups, interactive ticket maps and closeout, in 18+ states.', // F-A10, F-A7, F-A2, F-A3, F-D2
  },

  ui: {
    skipToContent: 'Skip to content',
    backToTop: 'Bore Spot, back to top',
    home: 'Bore Spot home',
    mainNav: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    book: 'Book a 15-Min Call', // F-B5, F-H1 (texto do site atual, mantido: decisão de Armin 27/09)
    talk: 'Talk to Our Team', // F-H1 (mantido: decisão de Armin 27/09)
    requestSupport: 'Request Support', // F-H1
    // Aviso de rolagem da intro (01/10): computador rola para baixo; no celular o dedo arrasta para cima
    scroll: 'Scroll down',
    swipe: 'Swipe up',
    keepScroll: 'Keep scrolling',
    keepSwipe: 'Keep swiping up',
    cueLabel: 'Go to the next part',
    exampleView: 'Example view',
    numberLocale: 'en-US',
  },

  nav: [ // F-H5
    { label: 'Services', to: '#services' },
    { label: 'How It Works', to: '#process' },
    { label: 'Contact', to: '#contact' },
    { label: 'Referral Program', page: '/referral' },
  ],

  intro: {
    scenes: [
      {
        promise: 'Every crew digging. No one waiting on 811.', // F-F1, F-G1 (aprovada em 24/09)
        reality: 'Bore Spot runs your 811 tickets, from call-in to closeout.', // F-A10, F-A4 (29/09: não repete o subtítulo da hero, que vem logo depois)
      },
      {
        promise: 'Your office runs lighter. You run the company.', // F-E5, F-G6
        reality: 'Locator follow-ups, renewals, interactive ticket maps and closeout. Handled by people who know underground work.', // F-A1, F-A2, F-A3, F-A8, F-E2
      },
    ],
    proofFeetLine: 'feet supported by Bore Spot.', // F-D3 (como o cliente escreve: "feet supported")
    proofClientsLine: 'contractors keep their crews moving with Bore Spot.', // PROVISÓRIO: só entra com o número de clientes
    proofSmall: ['18+ states served', 'EN, ES and PT support'], // F-D2, F-D4
    tagline: 'Operational support for underground contractors', // F-E4
  },

  // Hero: fica como aprovada (decisão de Armin 27/09).
  hero: {
    eyebrow: 'Operational support for underground contractors', // F-E4
    title: 'Your 811 tickets, handled end-to-end.', // F-A10
    sub: 'Same-day ticket action, proactive follow-ups and interactive ticket maps for underground contractors in 18+ states.', // F-A7, F-A2, F-D2
    panelLabel: 'Illustrative example of the Bore Spot ticket map', // F-A6
    cta: 'Book a 15-Min Call With a Specialist', // F-B5 (CTA do site atual). Um botão só na hero (Armin, 28/09)
  },

  logosTitle: "Companies and operations we've supported", // F-D5

  // Problema: 4 itens cobrem os 12 pontos de F-F1 e F-F3 sem repetir.
  problem: {
    eyebrow: "For contractors who can't afford delays", // F-C2
    title: "Ticket chaos doesn't stay in the office.", // F-F6
    lead: [
      "Most contractors don't call us on day one. By then, the problem isn't administrative anymore. It's operational.", // F-F2 (F-F5 fica coberto pelos 4 itens e pelo fecho; 29/09)
    ],
    items: [
      {
        title: 'Crews sit idle waiting on locates', // F-F1
        text: 'Add a crew and ticket volume jumps. As jobs grow, the stress compounds fast.', // F-F1, F-F3 (o título já diz a espera; 29/09)
        alt: 'A utility crew in high-visibility shirts standing around a small roadside excavation, with locate paint and flags on the sidewalk.',
      },
      {
        title: 'Tickets expire and jobs lose momentum', // F-F1
        text: 'A serious delay, a damage incident or a preventable issue forces a reset.', // F-F1, F-F3 (o título já diz o vencimento; 29/09)
        alt: 'Green utility locate arrows spray-painted on asphalt.',
      },
      {
        title: 'The office burns the day on calls', // F-F3
        text: "Renewals, tracking and locator follow-ups done by hand breed errors and confusion. Nobody sees what's cleared, pending or at risk.", // F-F3, F-F1
        alt: 'An office worker on the phone in front of two monitors full of spreadsheets and photos.',
      },
      {
        title: 'The owner ends up chasing tickets', // F-F1
        text: 'Instead of projects, growth and profit, the owner or a key team member spends the day on ticket management.', // F-F3, F-F1
        alt: 'A worried man in a cap on the phone at his desk.',
      },
    ],
    closing: [ // F-F4
      'When crews stop, production slows.',
      'When production slows, profit gets hit.',
      'And when this happens repeatedly, growth starts to stall.',
    ],
  },

  // Serviços: o mecanismo. Cada fase com uma frase em verbo + a lista do site atual, íntegra.
  services: {
    eyebrow: 'From ticket to closeout', // F-A9
    title: 'Before, during and after the job.', // F-A5
    lead: "We don't just open tickets. We own the workflow, with commitment, structure and real field awareness. An extension of your team, not a vendor.", // F-A8
    items: [
      {
        key: 'before',
        phase: 'Before construction', // F-A1
        title: '811 ticket management', // F-A1
        text: 'The front-end work that keeps jobs ready to move.', // F-A1 (frase do site atual; a lista abaixo diz o que é feito; 29/09)
        list: [ // F-A1, texto do site atual
          '811 ticket call-ins',
          'Status follow-up on every ticket',
          'Pushing for faster markings',
          'Contact with utilities and 811 centers',
          'Ticket renewals before expiration',
          'Technical writing for ticket submissions',
        ],
      },
      {
        key: 'during',
        phase: 'During operations', // F-A2
        title: 'Visibility, clarity and control', // F-A2
        text: 'While crews dig, you know where every ticket stands.', // F-A2 (29/09)
        list: [ // F-A2, texto do site atual
          'Interactive ticket maps',
          'Visibility into areas marked clear or pending',
          'Management reporting',
          'Better field coordination',
          'More confidence in operational decisions',
        ],
      },
      {
        key: 'after',
        phase: 'After the work is done', // F-A3
        title: 'Closeout support that finishes the job properly', // F-A3
        text: 'We close the loop, not leave it unfinished.', // F-A3 (frase do site atual; 29/09)
        list: ['Redlines', 'Production reports', 'Invoicing support'], // F-A3
      },
    ],
    // closing "What changes..." saiu em 29/09: repetia as 3 listas acima (F-A5 coberto por elas).
    cta: 'See how we can support your next project', // F-H1 (CTA do site atual)
    // Ticket carimbado (30/09): título do cartão e os carimbos, na ordem (antes: 3, durante: 2, depois: 2, e o fechamento).
    // Resumem as listas de cada fase acima. Os status do cartão (Waiting on Locate, Cleared, Active, Closed out) ficam em inglês: são rótulos do sistema.
    ticket: { title: '811 ticket', stamps: ['Called in', 'Locates cleared', 'Renewed', 'On the map', 'Reported', 'Redlines', 'Invoicing', 'Closed out'] },
    map: {
      before: 'Before · tickets called in · waiting on locate',
      during: 'During · areas cleared and active',
      after: 'After · redlines and closeout',
      cardTitle: 'Closeout support',
      card: ['Redlines', 'Production reports', 'Invoicing support'],
      legendRedlines: 'Redlines',
    },
  },

  // Por cargo: títulos das abas são as frases do site atual ("What changes when Bore Spot is involved").
  roles: {
    eyebrow: 'Built for the whole operation',
    title: "You run the company. We've got your tickets.", // F-G6 (aprovado em 24/09)
    tablistLabel: 'Choose your role',
    items: [
      {
        key: 'owner',
        tab: 'Owner',
        title: 'Get back to leading the company.', // F-G6
        text: "Without support, you're the ticket coordinator: calling in tickets, following up with locators, checking expirations, chasing markings, patching together spreadsheets and emails.", // F-B6
        list: ['Time, focus and control back for growing the business', 'Fewer interruptions across the job', 'No more acting as the ticket coordinator'], // F-B7, F-G4, F-B6
        alt: 'Two workers in high-visibility vests talking beside a large excavation while excavators work.',
      },
      {
        key: 'pm',
        tab: 'Project Manager',
        title: 'Gain operational clarity.', // F-G3
        text: 'Your team sees more and reacts faster.', // F-G3
        // "Share secure, real-time maps..." vem do card "Client map access" da imagem do produto no site atual (hero-artwork).
        list: ['Every ticket on the map, with its status', 'Organized reporting and workflow control', 'Share secure, real-time maps with your team and clients'], // F-A6, F-G3
        alt: 'The Bore Spot ticket map on a tablet and a phone, with tickets colored by status.',
      },
      {
        key: 'office',
        tab: 'Office team',
        title: 'Remove internal overload.', // F-G2
        text: 'Your office team no longer carries the full weight of ticket work.', // F-G2
        list: ['Calls, renewals, tracking and follow-ups handled for you', 'Office stress goes down', 'Jobs move with less friction'], // F-G2, F-G5
        alt: 'An office worker leaning back in his chair, hands behind his head, at a tidy desk.',
      },
      {
        key: 'foreman',
        tab: 'Field foreman',
        title: 'Keep crews digging.', // F-G1
        text: 'Faster markings and clearer communication with utilities and locators cut the delays that leave crews sitting.', // F-A1, F-A5, F-G1
        // "Everything your crew needs..." vem do card "Field-ready view" da imagem do produto no site atual (hero-artwork). Mantido: decisão de Armin 27/09.
        list: ['Crews stay productive', 'Projects keep moving', 'Everything your crew needs, anywhere, anytime'], // F-G5, F-G1, F-A6
        alt: 'A crew in hard hats and safety vests working in an underground utility excavation.',
      },
    ],
  },

  // Por que a Bore Spot: funde os antigos blocos Diferenciais e Gente de verdade (decisão de Armin 27/09). Sem prometer rostos.
  why: {
    eyebrow: 'Built for underground work', // F-E2
    title: 'Not software. Not generic outsourcing.', // F-E1
    lead: 'Real operational support, run by people who know underground work.', // F-E1, F-E2
    items: [
      { icon: 'people', title: 'Human-led', text: 'Real people run your tickets, from call-in to closeout.' }, // F-E2, F-A4
      { icon: 'route', title: 'Built around underground operations', text: '6+ years in underground operations and 3.5M+ feet supported.' }, // F-D1, F-D3 (29/09: prova no corpo)
      { icon: 'lang', title: 'English, Spanish and Portuguese', text: 'Multilingual coordination for field and office teams.' }, // F-C5, F-D4
      { icon: 'clock', title: 'Same-day action', text: 'Tickets move the day they come in. We follow up before anyone has to ask.' }, // F-A7 (o como fica no passo 02 do processo; 29/09)
    ],
    closing: ["We don't just assist.", 'We help carry the operation.'], // F-E3 (frase do cliente, com o "help")
    // Central (30/09): a equipe da Bore Spot no meio. Rótulos, histórias (idioma, pedido, resposta) e o selo de prova.
    // "Cleared" é rótulo do sistema e fica em inglês nas 3 línguas. "|" quebra o rótulo em duas linhas.
    hub: {
      sides: ['Your team', 'We handle'],
      core: 'Bore Spot team',
      nodes: { crew: 'Field crew', office: 'Office', owner: 'Owner', center: '811 center', utility: 'Utilities', locator: 'Locators' },
      proof: ['6+ years', '3.5M+ feet supported'],
      stories: [
        { from: 'crew', lang: 'ES', to: 'locator', action: 'Locator follow-up', back: 'Cleared' },
        { from: 'office', lang: 'EN', to: 'center', action: 'Ticket called in', back: 'Same day' },
        { from: 'owner', lang: 'PT', to: 'utility', action: 'Utility contact', back: 'Map updated' },
      ],
    },
    chipsLabel: 'Project types', // F-C1
    cta: 'Talk to Our Team', // F-H1 (CTA do site atual). Chips de tipo de projeto viraram rótulos (Armin, 28/09)
    alt: 'A crew in orange coveralls working in a street excavation between exposed pipes, with cones and barricades around the site.',
  },

  // Processo: os 4 passos do site atual, na ordem dele. Botão depois dos passos, como lá.
  process: {
    eyebrow: 'How it works',
    title: 'Simple process. Real execution.', // F-B8
    lead: 'We handle the operational workload behind the job. You stay focused on production and profit.', // F-B8
    center: ['Better visibility.', 'Better control.', 'Better continuity across the job.'], // texto do site atual (mantido: decisão de Armin 27/09)
    steps: [
      { n: '01', title: 'Send your project information', text: 'We receive the job details and start the ticket workflow right away.' }, // F-B1
      { n: '02', title: 'Same-day ticket action', text: "Tickets are opened fast and moved immediately, so work doesn't get buried in backlog." }, // F-B2, F-A7
      { n: '03', title: 'Ongoing follow-up and control', text: 'Updates, renewals, tracking and coordination until the ticket closes.' }, // F-B3
      { n: '04', title: 'Stay informed at every stage', text: "Interactive maps and structured reporting show your team what's happening." }, // F-B4
    ],
  },

  // FAQ (nova, decisão de Armin 27/09): só o que o site atual sabe responder.
  faq: {
    eyebrow: 'Questions contractors ask us',
    title: 'Frequently asked questions',
    // 29/09: de 11 para 6. Saíram as perguntas que repetiam a página (o que fazemos, durante, depois,
    // idiomas, quem nos procura): as respostas estão em Serviços, Por que a Bore Spot e Problema.
    items: [
      {
        q: 'How do we get started?',
        a: ['Book a 15-minute call with a specialist or fill out the form below. We receive the job details and start the ticket workflow right away.'], // F-B5, F-B1
      },
      {
        q: 'Is this software?',
        a: ['No. People run your tickets. You follow the work on interactive ticket maps and in structured reporting.'], // F-E1, F-E2, F-A2, F-B4
      },
      {
        q: 'Which states do you cover?',
        a: ["We support underground operations across 18+ states. Tell us where the project is in the form and we'll get back to you."], // F-D2, F-H3, F-B5
      },
      {
        q: 'Which types of projects do you support?',
        a: ['Underground work: HDD, fiber installation, plow, missile, aerial and plumbing. If yours is different, choose Other in the form and tell us about it.'], // F-C1, F-E1
      },
      {
        q: 'Do you have a referral program?',
        a: ['Yes. When a company you refer signs with Bore Spot and completes 5 weeks as an active client, you receive $500.'], // F-I1
        link: { label: 'See the Referral Program', page: '/referral' },
      },
      {
        q: 'How do I reach you?',
        a: ['Fill out the form on this page, call +1 (321) 237-3200 or email office@borespot.com.'], // F-H4
      },
    ],
  },

  contact: {
    title: 'Stop managing ticket chaos. Keep your crews digging.', // F-G6, F-G1 (aprovado em 24/09)
    sub: 'Bore Spot handles the execution behind the scenes. Your crews keep working, your office stays lighter, your operation stays under control.', // F-G8, F-E5
    formTitle: 'Get fast support for your next project', // F-H3
    formLead: 'Fill out the form and our team will review your project and reach out quickly.', // F-B5
    optional: '(optional)',
    fields: { // F-H3
      name: { label: 'Name', error: 'Please enter your name.' },
      company: { label: 'Company', error: 'Please enter your company name.' },
      phone: { label: 'Cellphone', error: 'Please enter a phone number so we can reach you quickly.' },
      email: { label: 'Email', error: 'Please enter a valid email, like name@company.com.' },
      state: { label: 'State', error: 'Please enter the state where the project is.' },
      projectType: { label: 'Project Type', placeholder: 'Select a project type', error: 'Please choose a project type.' },
      crews: { label: 'Number of Crews' },
      details: { label: 'Tell us a bit more about your challenges' },
    },
    projectTypes: { // F-C1
      HDD: 'HDD', 'Fiber Installation': 'Fiber Installation', Plow: 'Plow', Missile: 'Missile',
      Aerial: 'Aerial', Plumbing: 'Plumbing', Other: 'Other',
    },
    status: {
      invalid: 'Please fix the highlighted fields.',
      notConnected: 'Sending is not connected yet. This form will go live once the destination is set.',
      sending: 'Sending...',
      ok: 'Thanks. Our team will review your project and reach out quickly.',
      error: 'We could not send your request. Please try again or call us.',
    },
  },

  footer: {
    tagline: 'Operational support for underground contractors. Keeping crews moving, tickets handled, and projects on track.', // F-E6
    navTitle: 'Navigation',
    nav: [ // F-H5
      { label: 'Home', to: '#top' },
      { label: 'Services', to: '#services' },
      { label: 'How It Works', to: '#process' },
      { label: 'Contact', to: '#contact' },
      { label: 'Referral Program', page: '/referral' },
    ],
    legalTitle: 'Legal',
    legal: [{ label: 'Terms & Conditions', page: '/legal/terms-and-conditions' }],
    contactTitle: 'Contact',
    languagesTitle: 'Language support',
    rights: 'All rights reserved.',
  },
  // Página do Referral Program: texto do site atual (borespot.com/en/referral). Travessões trocados por vírgula ou ponto.
  referral: {
    meta: {
      title: 'Bore Spot Referral | Earn $500',
      description: 'Refer an underground contractor to Bore Spot. When the company you refer signs and completes 5 weeks as an active client, you receive $500.',
    },
    eyebrow: 'Bore Spot Referral Program',
    title: 'Refer a contractor. Earn $500.',
    intro: [
      "When the company you refer signs with Bore Spot and completes 5 weeks as an active client, you'll receive $500.",
      "Whether you're in the field, managing crews, or leading a company, your referral is welcome.",
    ],
    bestFit: "Best fit: underground contractors involved in the 811 process, typically with 1 to 5 crews. We're also open to larger operations when the fit is right.",
    cta: 'Submit a Referral',
    sections: [
      {
        title: 'Built on growth. Driven by gratitude.',
        text: "As Bore Spot continues to grow, we've expanded our capacity in a structured way so we can support more contractors without compromising the quality of the operation. This referral initiative is part of that growth: a way to recognize the people who help strong companies find the right support, while we continue contributing to better infrastructure across the country.",
      },
      {
        title: 'Who can submit a referral?',
        text: 'If you work in the field, manage crews, lead operations, own a company and would like to refer another company, or have a professional connection with a team that you believe could benefit from Bore Spot, you can submit a referral. The person who submits the referral form is the one eligible for the $500 reward. You may refer your own company as long as you are not the owner. Company owners are not eligible to receive a referral reward for referring their own company.',
      },
      {
        title: 'Why contractors are referred to Bore Spot',
        text: 'Bore Spot supports underground contractors across the full 811 ticket management workflow, from ticket call-in to final invoicing, with same-day action, proactive follow-ups, interactive ticket maps, and real operational support. We help teams improve visibility, reduce delays, and operate with more confidence in the field.',
      },
      {
        title: 'Who this program is built for',
        text: "This program is designed for underground contractors involved in the 811 process, especially smaller operations with around 1 to 5 crews. That said, we're always open to conversations with larger teams when there's a strong operational fit. If a contractor needs stronger ticket support, better follow-through, and more operational visibility, we'd love to hear about them.",
      },
    ],
    how: {
      title: 'How the referral works',
      steps: [
        { n: '01', title: 'Submit the referral form', text: "Tell us who you're referring, how to reach them, and what you believe Bore Spot can help with." },
        { n: '02', title: 'We review the fit and reach out', text: 'Our team is committed to contacting all referred companies with a strong fit.' },
        { n: '03', title: 'They sign and complete 5 weeks', text: 'When the referred company signs with Bore Spot and completes 5 weeks as a client, the person who submitted the referral earns $500.' },
      ],
      note: 'A direct introduction from you can help us connect faster and create a stronger first conversation.',
      quote: "This isn't a tip. It's our way of recognizing the people who help move this market forward.",
    },
    form: {
      title: 'Submit a Referral',
      lead: "Tell us who you're referring, where they operate, and what you believe Bore Spot can help improve. We'll review the information and follow up if it looks like a fit.",
      // Mesmos campos, mesma ordem e mesma obrigatoriedade do formulário do site atual.
      groups: [
        {
          fields: [
            { name: 'referrerName', label: 'Your Name', type: 'text', required: true, autocomplete: 'name', full: true },
            { name: 'referrerEmail', label: 'Your Email', type: 'email', required: true, autocomplete: 'email' },
            { name: 'referrerPhone', label: 'Your Phone Number', type: 'tel', required: true, autocomplete: 'tel' },
            { name: 'referredCompany', label: 'Referred Company Name', type: 'text', required: true, full: true },
            { name: 'helpWith', label: 'What do you believe Bore Spot can help with?', type: 'textarea', required: true, full: true },
            { name: 'serviceArea', label: 'Project States / Service Area', type: 'textarea', required: true, full: true },
            { name: 'contactName', label: 'Referred Contact Name', type: 'text', required: true },
            { name: 'contactPhone', label: 'Referred Contact Phone Number', type: 'tel', required: true },
          ],
        },
        {
          title: 'Optional',
          optional: true,
          fields: [
            { name: 'contactEmail', label: 'Referred Contact Email', type: 'email', full: true },
            { name: 'additionalNotes', label: 'Additional Notes (optional)', type: 'textarea', full: true },
          ],
        },
      ],
      consent: 'I represent that the information submitted is accurate, that I have permission or another lawful basis to share the referred contact\'s information with Bore Spot for business referral purposes, that this referral is not prohibited by any employer policy, contract, duty, or law, and that Bore Spot may contact the referred company regarding its services.',
      submit: 'Submit Referral',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'Who can participate in the referral program?', a: ["Whether you're in the field, managing crews, or leading a company, your referral is welcome."] },
        { q: 'When is the $500 paid?', a: ['The $500 referral reward is paid after the referred company signs with Bore Spot and completes 5 weeks as an active client.'] },
        { q: 'Who receives the referral reward?', a: ['The reward goes to the person who submitted the referral form.'] },
        { q: 'What kind of companies are the best fit?', a: ["Underground contractors involved in the 811 process are the strongest fit, especially smaller operations with around 1 to 5 crews. That said, we're always open to conversations with larger teams when there's a strong operational fit."] },
        { q: 'Do I need to tell the company I referred them?', a: ['No, but a warm introduction from you can help us connect faster and improve the chances of a successful fit.'] },
        { q: 'Does every referral qualify for the reward?', a: ['Not automatically. The reward applies when the referred company signs with Bore Spot and completes 5 weeks as an active client.'] },
      ],
    },
    terms: {
      title: 'Referral Program Terms',
      items: [
        { title: 'Eligibility', text: 'The Bore Spot Referral Program is open to individuals who submit a valid referral through the official referral form.' },
        { title: 'Reward Eligibility', text: 'A referral qualifies for the $500 reward only if the referred company signs a service agreement with Bore Spot and completes 5 weeks as an active client.' },
        { title: 'Who Receives the Reward', text: 'The reward is issued only to the individual who submitted the referral form.' },
        { title: 'Qualified Referrals', text: "Referred companies should be involved in underground operations and the 811 process and should be reasonably aligned with Bore Spot's service profile." },
        { title: 'Duplicate or Invalid Referrals', text: 'If the same company is referred more than once, Bore Spot may credit the first valid submission received. Bore Spot reserves the right to reject incomplete, duplicate, fraudulent, misleading, or low-quality referrals.' },
        { title: 'Payment Timing', text: 'Referral payments are issued after the qualifying conditions are met and any required payment or tax information has been provided.' },
        { title: 'Taxes', text: 'Any tax reporting, tax filing, or tax payment obligation associated with a referral reward is the sole responsibility of the recipient. Bore Spot may request additional information if required by applicable law before issuing payment.' },
        { title: 'Program Changes', text: 'Bore Spot reserves the right to modify, suspend, or terminate the Referral Program or its terms at any time.' },
      ],
    },
  },
  // Central de documentos legais: texto do site atual (borespot.com/en/legal/terms-and-conditions).
  legal: {
    meta: {
      title: 'Terms & Conditions | BoreSpot',
      description: "Access BoreSpot's current legal terms, policies, and notices.",
    },
    title: 'Terms & Conditions',
    lead: "Access BoreSpot's current legal terms, policies, and notices.",
    select: 'Select a document below to view its full page.',
    currentTitle: 'Current Legal Documents',
    versionLabel: 'Current Version:',
    effectiveLabel: 'Effective Date:',
    view: 'View Document',
    historyTitle: 'Version History',
    historyLead: 'Previous versions remain available for reference.',
    current: 'Current',
    versionWord: 'Version',
    back: 'Back to Terms & Conditions',
    pendingText: 'The full text of this document is being finalized and will be published on this page soon.',
    // Endereços iguais aos do site atual. O texto dos documentos fica em src/content/legal/en/<slug>.md
    // (no site atual, o texto dos documentos é em inglês nas 3 línguas; só título e rótulos são traduzidos).
    // pending: o site atual ainda não publicou o texto; a página mostra o aviso pendingText, como lá.
    docs: [
      { slug: 'user-terms', title: 'User Terms of Use', version: '1.0', effective: 'August 21, 2026' },
      { slug: 'acceptable-use', title: 'Acceptable Use Policy', version: '1.0', effective: 'August 21, 2026' },
      { slug: 'security', title: 'User Security Policy', version: '1.0', effective: 'August 21, 2026' },
      { slug: 'user-privacy', title: 'Customer & Authorized User Privacy Notice', version: '1.0', effective: 'August 21, 2026' },
      { slug: 'website-terms', title: 'Website Terms of Use', version: '1.0', effective: 'August 21, 2026', pending: true },
      { slug: 'website-privacy', title: 'Website Privacy Policy', version: '1.0', effective: 'August 21, 2026', pending: true },
    ],
  },
};
