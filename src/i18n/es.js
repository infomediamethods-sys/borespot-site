// Textos en español. Fuente: sitio actual (borespot.com/es) y decisiones del proyecto.
// Regla: toda información tiene que coincidir con el sitio actual. Nada inventado. Sin rayas (travessões).
// Copy reescrita el 27/09 según plano-copy.md, a partir del banco de hechos (códigos F-xx, plano-copy.md sección 3) y no
// como traducción frase a frase del inglés. Vocabulario técnico: el que el cliente ya usa en borespot.com/es
// (cuadrilla, localizaciones, marcaciones, localizadores, empresas de servicios públicos, capataz). Tú en todo el sitio.
// Sólo la primera palabra en mayúscula en botones, menús, pestañas y títulos.

export default {
  meta: {
    title: 'Bore Spot | Gestión de tickets 811 para contratistas de obras subterráneas', // F-A1, F-C1
    description: 'Bore Spot gestiona tus tickets 811 de principio a fin: acción el mismo día, seguimiento proactivo, mapas interactivos y cierre. Más de 18 estados.', // F-A10, F-A7, F-A2, F-A3, F-D2
  },

  ui: {
    skipToContent: 'Saltar al contenido',
    backToTop: 'Bore Spot, volver al inicio',
    home: 'Inicio de Bore Spot',
    mainNav: 'Principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    language: 'Idioma',
    book: 'Agenda una llamada de 15 min', // F-B5, F-H1 (texto del sitio actual)
    talk: 'Habla con nuestro equipo', // F-H1
    requestSupport: 'Solicitar soporte', // F-H1
    // Aviso de rolagem da intro (01/10): computador rola para baixo; no celular o dedo arrasta para cima
    scroll: 'Desplázate hacia abajo',
    swipe: 'Desliza hacia arriba',
    keepScroll: 'Sigue desplazándote',
    keepSwipe: 'Sigue deslizando hacia arriba',
    cueLabel: 'Ir a la siguiente parte',
    exampleView: 'Vista de ejemplo',
    // El sitio actual en español mostraba "3.5M+"; desde el 01/10 es "5M+" (Armin).
    numberLocale: 'en-US',
  },

  nav: [ // F-H5
    { label: 'Servicios', to: '#services' },
    { label: 'Cómo funciona', to: '#process' },
    { label: 'Contacto', to: '#contact' },
    { label: 'Programa de referidos', page: '/referral' },
  ],

  intro: {
    scenes: [
      {
        promise: 'Todas las cuadrillas excavando. Nadie esperando el 811.', // F-F1, F-G1
        reality: 'Bore Spot gestiona tus tickets 811, de la apertura al cierre.', // F-A10, F-A4 (29/09)
      },
      {
        promise: 'Tu oficina, más ligera. Tú diriges la empresa.', // F-E5, F-G6
        reality: 'Seguimiento a localizadores, renovaciones, mapas interactivos de tickets y cierre. En manos de gente que conoce la obra subterránea.', // F-A1, F-A2, F-A3, F-A8, F-E2
      },
    ],
    proofFeetLine: 'pies respaldados por Bore Spot.', // F-D3
    proofClientsLine: 'contratistas mantienen sus cuadrillas en movimiento con Bore Spot.', // PROVISIONAL: sólo con el número de clientes
    proofSmall: ['18+ estados atendidos', 'Soporte en EN, ES y PT'], // F-D2, F-D4
    tagline: 'Soporte operativo para contratistas de obras subterráneas', // F-E4
  },

  // Hero: como está aprobada (decisión de Armin 27/09); textos del sitio actual.
  hero: {
    eyebrow: 'Soporte operativo para contratistas de obras subterráneas', // F-E4
    title: 'Tus tickets 811, gestionados de principio a fin.', // F-A10
    sub: 'Acción el mismo día, seguimiento proactivo y mapas interactivos de tickets para contratistas de obras subterráneas en más de 18 estados.', // F-A7, F-A2, F-D2
    panelLabel: 'Ejemplo ilustrativo del mapa de tickets de Bore Spot', // F-A6
    cta: 'Agenda una llamada de 15 min con un especialista', // F-B5 (CTA do site atual). Um botão só na hero (Armin, 28/09)
  },

  logosTitle: 'Empresas y operaciones que hemos apoyado', // F-D5

  problem: {
    eyebrow: 'Para contratistas que no pueden permitirse retrasos', // F-C2
    title: 'El caos de tickets no se queda en la oficina.', // F-F6
    lead: [
      'La mayoría de los contratistas no nos llaman el primer día. Cuando llaman, el problema ya no es administrativo. Es operativo.', // F-F2
    ],
    items: [
      {
        title: 'Las cuadrillas se quedan paradas esperando localizaciones', // F-F1
        text: 'Se agrega una cuadrilla y el volumen de tickets se dispara. A medida que crecen las obras, el estrés se acumula rápido.', // F-F1, F-F3 (29/09)
        alt: 'Una cuadrilla con camisas de alta visibilidad de pie alrededor de una pequeña excavación junto a la calle, con pintura de localización y banderines en la acera.',
      },
      {
        title: 'Los tickets expiran y las obras pierden impulso', // F-F1
        text: 'Un retraso serio, un incidente de daño o un problema evitable obliga a empezar de cero.', // F-F1, F-F3 (29/09)
        alt: 'Flechas verdes de localización de servicios pintadas con aerosol sobre el asfalto.',
      },
      {
        title: 'La oficina se pasa el día en llamadas', // F-F3
        text: 'Renovaciones, seguimiento y contacto con localizadores hechos a mano traen errores y confusión. Nadie ve qué está despejado, pendiente o en riesgo.', // F-F3, F-F1
        alt: 'Un empleado de oficina hablando por teléfono frente a dos monitores llenos de hojas de cálculo y fotos.',
      },
      {
        title: 'El dueño termina persiguiendo tickets', // F-F1
        text: 'En vez de proyectos, crecimiento y ganancias, el dueño o alguien clave del equipo se pasa el día gestionando tickets.', // F-F3, F-F1
        alt: 'Un hombre preocupado, con gorra, hablando por teléfono en su escritorio.',
      },
    ],
    closing: [ // F-F4
      'Cuando las cuadrillas paran, la producción se desacelera.',
      'Cuando la producción se desacelera, las ganancias sufren.',
      'Y cuando esto se repite, el crecimiento se estanca.',
    ],
  },

  services: {
    eyebrow: 'Del ticket al cierre', // F-A9
    title: 'Antes, durante y después de la obra.', // F-A5
    lead: 'No solo abrimos tickets. Asumimos el flujo completo, con compromiso, estructura y verdadero conocimiento de campo. Una extensión de tu equipo, no un proveedor.', // F-A8
    items: [
      {
        key: 'before',
        phase: 'Antes de la construcción', // F-A1
        title: 'Gestión de tickets 811', // F-A1
        text: 'El trabajo inicial que mantiene las obras listas para avanzar.', // F-A1 (frase del sitio actual; 29/09)
        list: [ // F-A1
          'Apertura de tickets 811',
          'Seguimiento del estado de cada ticket',
          'Gestión para acelerar las marcaciones',
          'Contacto con empresas de servicios públicos y centros 811',
          'Renovación de tickets antes de que venzan',
          'Redacción técnica para el envío de tickets',
        ],
      },
      {
        key: 'during',
        phase: 'Durante las operaciones', // F-A2
        title: 'Visibilidad, claridad y control', // F-A2
        text: 'Mientras las cuadrillas excavan, sabes en qué punto está cada ticket.', // F-A2 (29/09)
        list: [ // F-A2
          'Mapas interactivos de tickets',
          'Visibilidad de las áreas marcadas como despejadas o pendientes',
          'Informes gerenciales',
          'Mejor coordinación de campo',
          'Más confianza en las decisiones operativas',
        ],
      },
      {
        key: 'after',
        phase: 'Después de la obra', // F-A3
        title: 'Soporte de cierre que termina bien el trabajo', // F-A3
        text: 'Cerramos el ciclo, en lugar de dejarlo sin terminar.', // F-A3 (frase del sitio actual; 29/09)
        list: ['Redlines', 'Informes de producción', 'Soporte de facturación'], // F-A3
      },
    ],
    // closing "Lo que cambia..." salió el 29/09: repetía las 3 listas (F-A5 cubierto por ellas).
    cta: 'Descubre cómo podemos apoyar tu próximo proyecto', // F-H1 (CTA do site atual)
    // Ticket carimbado (30/09): título do cartão e os carimbos, na ordem (antes: 3, durante: 2, depois: 2, e o fechamento).
    // Resumem as listas de cada fase acima. Os status do cartão (Waiting on Locate, Cleared, Active, Closed out) ficam em inglês: são rótulos do sistema.
    ticket: { title: 'Ticket 811', stamps: ['Ticket abierto', 'Área despejada', 'Renovado', 'En el mapa', 'Informe', 'Redlines', 'Facturación', 'Cerrado'] },
    map: {
      before: 'Antes · tickets abiertos · esperando localización',
      during: 'Durante · áreas despejadas y activas',
      after: 'Después · redlines y cierre',
      cardTitle: 'Soporte de cierre',
      card: ['Redlines', 'Informes de producción', 'Soporte de facturación'],
      legendRedlines: 'Redlines',
    },
  },

  roles: {
    eyebrow: 'Para toda la operación',
    title: 'Tú diriges la empresa. Nosotros nos encargamos de los tickets.', // F-G6
    tablistLabel: 'Elige tu cargo',
    items: [
      {
        key: 'owner',
        tab: 'Dueño',
        title: 'Vuelve a dirigir la empresa.', // F-G6
        text: 'Sin soporte, el coordinador de tickets eres tú: llamas para abrir tickets, das seguimiento a localizadores, revisas vencimientos, persigues marcaciones y armas hojas de cálculo y correos.', // F-B6
        list: ['Tiempo, enfoque y control de vuelta para hacer crecer el negocio', 'Menos interrupciones en toda la obra', 'Dejas de ser el coordinador de tickets'], // F-B7, F-G4, F-B6
        alt: 'Dos trabajadores con chalecos de alta visibilidad conversando junto a una excavación grande mientras trabajan las excavadoras.',
      },
      {
        key: 'pm',
        tab: 'Gerente de proyecto',
        title: 'Gana claridad operativa.', // F-G3
        text: 'Tu equipo ve más y reacciona más rápido.', // F-G3
        // La tercera línea viene de la tarjeta "Client map access" de la imagen del producto del sitio actual.
        list: ['Cada ticket en el mapa, con su estado', 'Informes organizados y control del flujo', 'Comparte mapas seguros y en tiempo real con tu equipo y tus clientes'], // F-A6, F-G3
        alt: 'El mapa de tickets de Bore Spot en una tablet y un celular, con los tickets coloreados por estado.',
      },
      {
        key: 'office',
        tab: 'Equipo de oficina',
        title: 'Elimina la sobrecarga interna.', // F-G2
        text: 'Tu equipo de oficina ya no carga con todo el trabajo de tickets.', // F-G2
        list: ['Llamadas, renovaciones y seguimientos: nos encargamos nosotros', 'El estrés de oficina baja', 'Las obras avanzan con menos fricción'], // F-G2, F-G5
        alt: 'Un empleado de oficina recostado en la silla, con las manos detrás de la cabeza, frente a un escritorio ordenado.',
      },
      {
        key: 'foreman',
        tab: 'Capataz de campo',
        title: 'Mantén las cuadrillas excavando.', // F-G1
        text: 'Marcaciones más rápidas y comunicación más clara con empresas de servicios públicos y localizadores recortan los retrasos que dejan cuadrillas paradas.', // F-A1, F-A5, F-G1
        // La tercera línea viene de la tarjeta "Field-ready view" de la imagen del producto del sitio actual. Se mantiene: decisión de Armin 27/09.
        list: ['Las cuadrillas se mantienen productivas', 'Tus proyectos siguen avanzando', 'Todo lo que tu cuadrilla necesita, en cualquier lugar y momento'], // F-G5, F-G1, F-A6
        alt: 'Una cuadrilla con cascos y chalecos de seguridad trabajando en una excavación de servicios subterráneos.',
      },
    ],
  },

  // Por qué Bore Spot: une los antiguos bloques Diferenciales y Gente de verdad (decisión de Armin 27/09).
  why: {
    eyebrow: 'Hecho para la obra subterránea', // F-E2
    title: 'No es software. No es tercerización genérica.', // F-E1
    lead: 'Soporte operativo real, a cargo de gente que conoce la obra subterránea.', // F-E1, F-E2
    items: [
      { icon: 'people', title: 'Gente al frente', text: 'Personas reales gestionan tus tickets, de la apertura al cierre.' }, // F-E2, F-A4
      { icon: 'route', title: 'Hecho para operaciones subterráneas', text: 'Más de 6 años en operaciones subterráneas y más de 5 millones de pies respaldados.' }, // F-D1, F-D3 (29/09)
      { icon: 'lang', title: 'Inglés, español y portugués', text: 'Coordinación multilingüe para equipos de campo y oficina.' }, // F-C5, F-D4
      { icon: 'clock', title: 'Acción el mismo día', text: 'Los tickets avanzan el mismo día en que llegan. Damos seguimiento antes de que alguien tenga que pedirlo.' }, // F-A7 (el cómo queda en el paso 02 del proceso; 29/09)
    ],
    closing: ['No solo damos apoyo.', 'Ayudamos a llevar la operación.'], // F-E3
    // Central (30/09). "Cleared" es rótulo del sistema y queda en inglés. "|" parte el rótulo en dos líneas.
    hub: {
      sides: ['Tu equipo', 'Nos encargamos'],
      core: 'Equipo Bore Spot',
      nodes: { crew: 'Cuadrilla', office: 'Oficina', owner: 'Dueño', center: 'Centro 811', utility: 'Empresas de|servicios públicos', locator: 'Localizadores' },
      proof: ['6+ años', '5M+ pies respaldados'],
      stories: [
        { from: 'crew', lang: 'ES', to: 'locator', action: 'Localizador contactado', back: 'Cleared' },
        { from: 'office', lang: 'EN', to: 'center', action: 'Ticket abierto', back: 'Mismo día' },
        { from: 'owner', lang: 'PT', to: 'utility', action: 'Empresa contactada', back: 'Mapa actualizado' },
      ],
    },
    chipsLabel: 'Tipos de proyecto', // F-C1
    cta: 'Habla con nuestro equipo', // F-H1 (CTA do site atual). Chips de tipo de projeto viraram rótulos (Armin, 28/09)
    alt: 'Una cuadrilla con overoles naranjas trabajando en una excavación en la calle, entre tuberías expuestas, con conos y barreras alrededor.',
  },

  process: {
    eyebrow: 'Cómo funciona',
    title: 'Proceso simple. Ejecución real.', // F-B8
    lead: 'Nosotros nos encargamos de la carga operativa detrás de la obra. Tú te enfocas en producción y ganancias.', // F-B8
    center: ['Mayor visibilidad.', 'Mayor control.', 'Mayor continuidad en toda la obra.'], // texto del sitio actual (se mantiene: decisión de Armin 27/09)
    steps: [
      { n: '01', title: 'Envía la información de tu proyecto', text: 'Recibimos los detalles de la obra y empezamos el flujo de tickets de inmediato.' }, // F-B1
      { n: '02', title: 'Acción el mismo día', text: 'Los tickets se abren rápido y se ponen en marcha de inmediato, para que el trabajo no quede enterrado en pendientes.' }, // F-B2, F-A7
      { n: '03', title: 'Seguimiento y control continuos', text: 'Actualizaciones, renovaciones, seguimiento y coordinación hasta que el ticket se cierra.' }, // F-B3
      { n: '04', title: 'Mantente informado en cada etapa', text: 'Los mapas interactivos y los informes estructurados le muestran a tu equipo qué está pasando.' }, // F-B4
    ],
  },

  faq: {
    eyebrow: 'Lo que nos preguntan los contratistas',
    title: 'Preguntas frecuentes',
    // 29/09: de 11 a 6. Salieron las preguntas que repetían la página (qué hacemos, durante, después,
    // idiomas, quién nos busca): las respuestas están en Servicios, Por qué Bore Spot y Problema.
    items: [
      {
        q: '¿Cómo empezamos?',
        a: ['Agenda una llamada de 15 minutos con un especialista o completa el formulario de abajo. Recibimos los detalles de la obra y empezamos el flujo de tickets de inmediato.'], // F-B5, F-B1
      },
      {
        q: '¿Esto es un software?',
        a: ['No. Personas gestionan tus tickets. Tú sigues el trabajo en los mapas interactivos de tickets y en los informes estructurados.'], // F-E1, F-E2, F-A2, F-B4
      },
      {
        q: '¿En qué estados trabajan?',
        a: ['Apoyamos operaciones subterráneas en más de 18 estados. Dinos en el formulario dónde está el proyecto y te contactamos.'], // F-D2, F-H3, F-B5
      },
      {
        q: '¿Qué tipos de proyecto apoyan?',
        a: ['Obra subterránea: HDD, instalación de fibra, plow, missile, aéreo y plomería. Si el tuyo es distinto, elige Otro en el formulario y cuéntanos.'], // F-C1, F-E1
      },
      {
        q: '¿Tienen programa de referidos?',
        a: ['Sí. Cuando la empresa que recomiendas firma con Bore Spot y completa 5 semanas como cliente activo, recibes $500.'], // F-I1
        link: { label: 'Ver el programa de referidos', page: '/referral' },
      },
      {
        q: '¿Cómo los contacto?',
        a: ['Completa el formulario de esta página, llama al +1 (321) 237-3200 o escribe a office@borespot.com.'], // F-H4
      },
    ],
  },

  contact: {
    title: 'Deja de gestionar el caos de tickets. Mantén tus cuadrillas excavando.', // F-G6, F-G1
    sub: 'Bore Spot se encarga de la ejecución detrás de escena. Tus cuadrillas siguen trabajando, tu oficina se mantiene más ligera y tu operación, bajo control.', // F-G8, F-E5
    formTitle: 'Recibe soporte rápido para tu próximo proyecto', // F-H3
    formLead: 'Completa el formulario y nuestro equipo revisará tu proyecto y te contactará rápido.', // F-B5
    optional: '(opcional)',
    fields: { // F-H3
      name: { label: 'Nombre', error: 'Ingresa tu nombre.' },
      company: { label: 'Empresa', error: 'Ingresa el nombre de tu empresa.' },
      phone: { label: 'Celular', error: 'Ingresa un número de teléfono para que podamos contactarte rápido.' },
      email: { label: 'Correo electrónico', error: 'Ingresa un correo válido, como nombre@empresa.com.' },
      state: { label: 'Estado', error: 'Ingresa el estado donde está el proyecto.' },
      projectType: { label: 'Tipo de proyecto', placeholder: 'Selecciona un tipo de proyecto', error: 'Elige un tipo de proyecto.' },
      crews: { label: 'Número de cuadrillas' },
      details: { label: 'Cuéntanos un poco más sobre tus desafíos' },
    },
    projectTypes: { // F-C1
      HDD: 'HDD', 'Fiber Installation': 'Instalación de fibra', Plow: 'Plow', Missile: 'Missile',
      Aerial: 'Aéreo', Plumbing: 'Plomería', Other: 'Otro',
    },
    status: {
      invalid: 'Corrige los campos marcados.',
      notConnected: 'El envío todavía no está conectado. Este formulario funcionará cuando se defina el destino.',
      sending: 'Enviando...',
      ok: 'Gracias. Nuestro equipo revisará tu proyecto y te contactará rápido.',
      error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llámanos.',
    },
  },

  footer: {
    tagline: 'Soporte operativo para contratistas de obras subterráneas. Manteniendo cuadrillas en movimiento, tickets gestionados y proyectos al día.', // F-E6
    navTitle: 'Navegación',
    nav: [ // F-H5
      { label: 'Inicio', to: '#top' },
      { label: 'Servicios', to: '#services' },
      { label: 'Cómo funciona', to: '#process' },
      { label: 'Contacto', to: '#contact' },
      { label: 'Programa de referidos', page: '/referral' },
    ],
    legalTitle: 'Legal',
    legal: [{ label: 'Términos y condiciones', page: '/legal/terms-and-conditions' }],
    contactTitle: 'Contacto',
    languagesTitle: 'Idiomas',
    rights: 'Todos los derechos reservados.',
  },

  // Página del Programa de Referidos: texto del sitio actual (borespot.com/es/referral). Rayas cambiadas por dos puntos o comas.
  // ATENCIÓN: en el sitio actual, la versión en español dice que las auto-referencias son bienvenidas, y la versión en inglés dice
  // que el dueño de la empresa no puede recibir la recompensa por referir su propia empresa. Se mantuvo cada idioma como está en el sitio actual.
  referral: {
    meta: {
      title: 'Programa de referidos Bore Spot | Gana $500',
      description: 'Recomienda un contratista de obras subterráneas a Bore Spot. Si firma y completa 5 semanas como cliente activo, tú ganas $500.',
    },
    eyebrow: 'Programa de referidos de Bore Spot',
    title: 'Recomienda un contratista. Gana $500.',
    intro: [
      'Cuando la empresa que recomiendes firme con Bore Spot y complete 5 semanas como cliente activo, recibirás $500.',
      'Ya sea que estés en campo, gestionando cuadrillas o liderando una empresa, tu referencia es bienvenida.',
    ],
    bestFit: 'Perfil ideal: contratistas de obras subterráneas involucrados en el proceso 811, generalmente con 1 a 5 cuadrillas. También estamos abiertos a operaciones más grandes cuando hay un buen encaje.',
    cta: 'Enviar una referencia',
    sections: [
      {
        title: 'Construido sobre crecimiento. Impulsado por gratitud.',
        text: 'A medida que Bore Spot continúa creciendo, hemos ampliado nuestra capacidad de forma estructurada para poder apoyar a más contratistas sin comprometer la calidad de la operación. Esta iniciativa de referidos es parte de ese crecimiento: una forma de reconocer a las personas que ayudan a empresas sólidas a encontrar el soporte adecuado, mientras seguimos contribuyendo a una mejor infraestructura en todo el país.',
      },
      {
        title: '¿Quién puede enviar una referencia?',
        text: 'Si trabajas en campo, gestionas cuadrillas, lideras operaciones, eres dueño de una empresa, o crees que tu propio equipo podría beneficiarse de Bore Spot, puedes enviar una referencia. Las auto-referencias son bienvenidas. La persona que envía el formulario de referencia es quien tiene derecho a la recompensa de $500.',
      },
      {
        title: 'Por qué los contratistas son referidos a Bore Spot',
        text: 'Bore Spot apoya a contratistas de obras subterráneas en todo el flujo de trabajo de tickets 811, desde la creación del ticket hasta la facturación final, con acción el mismo día, seguimiento proactivo, mapas interactivos de tickets y soporte operativo real. Ayudamos a los equipos a mejorar la visibilidad, reducir retrasos y operar con más confianza en campo.',
      },
      {
        title: 'Para quién está diseñado este programa',
        text: 'Este programa está diseñado para contratistas de obras subterráneas involucrados en el proceso 811, especialmente operaciones más pequeñas con alrededor de 1 a 5 cuadrillas. Dicho esto, siempre estamos abiertos a conversaciones con equipos más grandes cuando hay un buen encaje operativo. Si un contratista necesita mejor soporte de tickets, mejor seguimiento y más visibilidad operativa, nos encantaría saber de ellos.',
      },
    ],
    how: {
      title: 'Cómo funciona la referencia',
      steps: [
        { n: '01', title: 'Envía el formulario de referencia', text: 'Cuéntanos a quién estás refiriendo, cómo contactarlos y en qué crees que Bore Spot puede ayudar.' },
        { n: '02', title: 'Evaluamos el encaje y nos comunicamos', text: 'Nuestro equipo evaluará la oportunidad y contactará a la empresa si parece haber un buen encaje.' },
        { n: '03', title: 'Firman y completan 5 semanas', text: 'Si la empresa referida firma con Bore Spot y permanece como cliente por 5 semanas, la persona que envió la referencia gana $500.' },
      ],
      note: 'Una presentación directa de tu parte puede ayudarnos a conectar más rápido y crear una primera conversación más sólida.',
      quote: 'Esto no es una propina. Es nuestra forma de reconocer a las personas que ayudan a mover este mercado hacia adelante.',
    },
    form: {
      title: 'Enviar una referencia',
      lead: 'Cuéntanos a quién estás refiriendo, dónde operan y en qué crees que Bore Spot puede ayudar a mejorar. Revisaremos la información y haremos seguimiento si parece un buen encaje.',
      groups: [
        {
          fields: [
            { name: 'referrerName', label: 'Tu nombre', type: 'text', required: true, autocomplete: 'name', full: true },
            { name: 'referrerEmail', label: 'Tu correo electrónico', type: 'email', required: true, autocomplete: 'email' },
            { name: 'referrerPhone', label: 'Tu número de teléfono', type: 'tel', required: true, autocomplete: 'tel' },
            { name: 'referredCompany', label: 'Nombre de la empresa referida', type: 'text', required: true, full: true },
            { name: 'helpWith', label: '¿En qué crees que Bore Spot puede ayudar?', type: 'textarea', required: true, full: true },
            { name: 'serviceArea', label: 'Estados del proyecto / área de servicio', type: 'textarea', required: true, full: true },
            { name: 'contactName', label: 'Nombre del contacto referido', type: 'text', required: true },
            { name: 'contactPhone', label: 'Teléfono del contacto referido', type: 'tel', required: true },
          ],
        },
        {
          title: 'Opcional',
          optional: true,
          fields: [
            { name: 'contactEmail', label: 'Correo del contacto referido', type: 'email', full: true },
            { name: 'additionalNotes', label: 'Notas adicionales (opcional)', type: 'textarea', full: true },
          ],
        },
      ],
      consent: 'Declaro que la información enviada es precisa, que tengo permiso u otra base legal para compartir la información del contacto referido con Bore Spot con fines de referencia comercial, que esta referencia no está prohibida por ninguna política de empleador, contrato, deber o ley, y que Bore Spot puede contactar a la empresa referida con respecto a sus servicios.',
      submit: 'Enviar referencia',
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        { q: '¿Quién puede participar en el programa de referidos?', a: ['Ya sea que estés en campo, gestionando cuadrillas o liderando una empresa, tu referencia es bienvenida.'] },
        { q: '¿Cuándo se pagan los $500?', a: ['La recompensa de $500 se paga después de que la empresa referida firma con Bore Spot y completa 5 semanas como cliente activo.'] },
        { q: '¿Quién recibe la recompensa?', a: ['La recompensa va a la persona que envió el formulario de referencia.'] },
        { q: '¿Qué tipo de empresas son las más adecuadas?', a: ['Los contratistas de obras subterráneas involucrados en el proceso 811 son los más adecuados, especialmente operaciones más pequeñas con alrededor de 1 a 5 cuadrillas. Dicho esto, siempre estamos abiertos a conversaciones con equipos más grandes cuando hay un buen encaje operativo.'] },
        { q: '¿Necesito decirle a la empresa que los referí?', a: ['No, pero una presentación directa de tu parte puede ayudarnos a conectar más rápido y mejorar las posibilidades de un buen encaje.'] },
        { q: '¿Todas las referencias califican para la recompensa?', a: ['No automáticamente. La recompensa aplica cuando la empresa referida firma con Bore Spot y completa 5 semanas como cliente activo.'] },
      ],
    },
    terms: {
      title: 'Términos del programa de referidos',
      items: [
        { title: 'Elegibilidad', text: 'El Programa de Referidos de Bore Spot está abierto a individuos que envíen una referencia válida a través del formulario oficial.' },
        { title: 'Elegibilidad de la recompensa', text: 'Una referencia califica para la recompensa de $500 solo si la empresa referida firma un acuerdo de servicio con Bore Spot y completa 5 semanas como cliente activo.' },
        { title: 'Quién recibe la recompensa', text: 'La recompensa se emite únicamente a la persona que envió el formulario de referencia.' },
        { title: 'Referencias calificadas', text: 'Las empresas referidas deben estar involucradas en operaciones subterráneas y el proceso 811, y deben estar razonablemente alineadas con el perfil de servicios de Bore Spot.' },
        { title: 'Referencias duplicadas o inválidas', text: 'Si la misma empresa es referida más de una vez, Bore Spot puede acreditar la primera referencia válida recibida. Bore Spot se reserva el derecho de rechazar referencias incompletas, duplicadas, fraudulentas, engañosas o de baja calidad.' },
        { title: 'Plazo de pago', text: 'Los pagos de referencia se emiten después de que se cumplan las condiciones de calificación y se haya proporcionado cualquier información de pago o fiscal requerida.' },
        { title: 'Impuestos', text: 'Cualquier obligación de reporte fiscal, declaración fiscal o pago de impuestos asociada con la recompensa de referencia es responsabilidad exclusiva del destinatario. Bore Spot puede solicitar información adicional si lo requiere la ley aplicable antes de emitir el pago.' },
        { title: 'Cambios al programa', text: 'Bore Spot se reserva el derecho de modificar, suspender o terminar el Programa de Referidos o sus términos en cualquier momento.' },
      ],
    },
  },

  // Central legal: texto del sitio actual (borespot.com/es/legal/terms-and-conditions).
  // En el sitio actual, el texto de los documentos está en inglés también en español; solo títulos y etiquetas se traducen.
  legal: {
    meta: {
      title: 'Términos y condiciones | BoreSpot',
      description: 'Accede a los términos legales, políticas, avisos e historial de versiones vigentes de BoreSpot.',
    },
    title: 'Términos y condiciones',
    lead: 'Accede a los términos legales, políticas y avisos vigentes de BoreSpot.',
    select: 'Selecciona un documento para ver su página completa.',
    currentTitle: 'Documentos legales vigentes',
    versionLabel: 'Versión actual:',
    effectiveLabel: 'Fecha de vigencia:',
    view: 'Ver documento',
    historyTitle: 'Historial de versiones',
    historyLead: 'Las versiones anteriores permanecen disponibles como referencia.',
    current: 'Vigente',
    versionWord: 'Versión',
    back: 'Volver a Términos y condiciones',
    pendingText: 'El texto completo de este documento está siendo finalizado y se publicará en esta página próximamente.',
    docs: [
      { slug: 'user-terms', title: 'Términos de uso del usuario', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'acceptable-use', title: 'Política de uso aceptable', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'security', title: 'Política de seguridad del usuario', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'user-privacy', title: 'Aviso de privacidad del cliente y del usuario autorizado', version: '1.0', effective: '21 de agosto de 2026' },
      { slug: 'website-terms', title: 'Términos de uso del sitio web', version: '1.0', effective: '21 de agosto de 2026', pending: true },
      { slug: 'website-privacy', title: 'Política de privacidad del sitio web', version: '1.0', effective: '21 de agosto de 2026', pending: true },
    ],
  },
};
