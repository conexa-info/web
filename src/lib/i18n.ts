import { useParams } from "@tanstack/react-router";

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: unknown): v is Lang => v === "es" || v === "en";

const es = {
  nav: {
    home: "Inicio",
    brands: "Para marcas",
    creators: "Para creadores",
    talents: "Talentos",
    about: "Nosotros",
    how: "Cómo trabajamos",
    contact: "Contacto",
    cta: "Hablemos",
    menu: "Abrir menú",
    close: "Cerrar menú",
    lang: "Cambiar idioma",
    skip: "Saltar al contenido",
  },
  hero: {
    eyebrow: "Desarrollo comercial y cultura de redes",
    title: "Conectamos marcas con la nueva generación.",
    subtitle:
      "Representamos creadores con audiencias reales en Argentina, Latinoamérica, España e Italia. Vos elegís el talento; nosotros pensamos la idea, escribimos el guion y coordinamos todo hasta que se publica.",
    stats: {
      talents: "talentos representados",
      followers: "seguidores en sus comunidades",
      views: "vistas por mes",
    },
    body: "Creemos en las conexiones que generan valor. Por eso, acercamos a las marcas a los talentos adecuados y ayudamos a los creadores a convertir su creatividad en nuevas oportunidades.",
    primary: "Quiero trabajar con Conexa",
    secondary: "Soy creador",
    nodes: { brands: "Marcas", creators: "Creadores", audiences: "Audiencias" },
    lines: ["Conectamos", "marcas", "con la", "nueva generación"],
    vertical: "Conexión",
    tag: "Buenos Aires · Agencia de creadores",
    scroll: "Scrolleá",
    flowTitle: "El sistema Conexa",
    flow: [
      { k: "Marcas", d: "Objetivos, identidad y presupuesto. Definimos qué tiene que pasar." },
      { k: "Creadores", d: "El talento justo, con una idea que se siente propia." },
      { k: "Audiencias", d: "Comunidades reales que miran, comparten y recuerdan." },
    ],
  },
  value: {
    eyebrow: "Propuesta de valor",
    blocks: [
      { title: "Conexiones relevantes" },
      { title: "Ideas que conectan" },
      { title: "Oportunidades reales" },
    ],
  },
  home: {
    talentsTitle: "Talentos de Conexa",
    talentsText: "Creadores con identidad propia y comunidades reales.",
    allTalents: "Ver todos los talentos",
    twoTitle: "Una agencia, dos caminos.",
    brandsCard: "Buscás creadores, ideas y campañas que conecten con tu audiencia.",
    creatorsCard: "Querés representación comercial y oportunidades con marcas.",
    discover: "Descubrir",
  },
  brands: {
    eyebrow: "Para marcas",
    title: "Tu marca tiene una historia. Encontremos quién puede contarla.",
    body: "Las audiencias evolucionan y las formas de conectar con ellas también. En Conexa ayudamos a las marcas a descubrir creadores, desarrollar ideas y generar colaboraciones que integren sus productos y servicios de manera natural.",
    servicesTitle: "Cómo ayudamos a tu marca",
    services: [
      "Selección de creadores según objetivos y público.",
      "Representación comercial y gestión de oportunidades.",
      "Desarrollo de propuestas creativas.",
      "Ideación de campañas.",
      "Guiones y conceptos para contenidos.",
      "Integración de productos y servicios.",
      "Colaboraciones de lifestyle, moda, beauty, viajes, entretenimiento y otras categorías.",
      "Coordinación comercial de campañas.",
      "Propuestas personalizadas según necesidades y presupuesto.",
      "Desarrollo de relaciones comerciales a largo plazo.",
    ],
    cta: "Contanos qué necesita tu marca.",
    cta2: "Conocé nuestros talentos.",
    legacyTitle: "También desde nuestra experiencia",
    legacy: [
      {
        title: "Ideación y guion creativo",
        text: "No imponemos mensajes rígidos. Desarrollamos ideas frescas para los videos y adaptamos tu propuesta al lenguaje de la audiencia sin perder autenticidad.",
      },
      {
        title: "Producción y locaciones",
        text: "Soporte de producción, acceso a sets y locaciones urbanas, y coordinación técnica para cuidar la calidad visual.",
      },
      {
        title: "Desarrollo comercial 360°",
        text: "Facilitamos acuerdos claros, redactamos propuestas a medida y gestionamos la relación comercial para que ambas partes ganen.",
      },
    ],
  },
  creators: {
    eyebrow: "Para creadores",
    title: "Vos creás. Nosotros buscamos nuevas oportunidades.",
    body: "Sabemos que crear contenido requiere creatividad, tiempo y una identidad propia. En Conexa queremos ayudarte a desarrollar tu potencial comercial, conectar con marcas y construir relaciones profesionales sin perder aquello que hace único a tu contenido.",
    servicesTitle: "Qué hacemos con vos",
    services: [
      "Representación comercial.",
      "Búsqueda de oportunidades con marcas.",
      "Presentación del perfil a empresas.",
      "Desarrollo de propuestas comerciales.",
      "Negociación y coordinación de colaboraciones.",
      "Acompañamiento creativo y estratégico.",
      "Desarrollo de marca personal.",
      "Identificación de nuevas oportunidades de monetización.",
    ],
    cta: "Quiero sumarme a Conexa.",
    disclaimer:
      "Completar la postulación no garantiza representación, contratos ni campañas. Revisamos cada perfil y te contactamos si vemos una oportunidad.",
  },
  talents: {
    international:
      "Desde Argentina, representamos talentos de distintos países y conectamos marcas con audiencias más allá de las fronteras.",
    eyebrow: "Talentos",
    title: "Creadores que conectan.",
    body: "Cada perfil es una mini presentación comercial con datos informados por cada creador.",
    viewProfile: "Ver perfil",
    ask: "Consultar colaboración",
    photoPending: "Foto real pendiente",
    categories: "Categorías",
    platforms: "Plataformas",
    followers: "Comunidad",
    who: "Quién es",
    why: "Por qué trabajar con",
    skills: "Habilidades",
    open: "Ver más",
    close: "Cerrar",
    soon: "Datos en carga",
    cardFollowers: "Seguidores",
    cardViews: "Vistas por mes",
    approx: "Valores aproximados: suma de plataformas y períodos informados.",
    openProfile: "Tocá un nombre para ver su perfil completo.",
  },
  profile: {
    back: "Todos los talentos",
    about: "Sobre",
    stats: "Estadísticas destacadas",
    statsNote:
      "Datos informados para los períodos indicados. No son métricas en tiempo real ni garantizan resultados de campaña.",
    audience: "Perfil de audiencia",
    gender: "Distribución por género",
    countries: "Principales países",
    countriesNote: "",
    dataNote: "Datos informados en noviembre de 2026, solicitá más información.",
    languages: "Idioma de la audiencia",
    platforms: "Plataformas",
    compare: "Comparación de plataformas (seguidores)",
    pillars: "Pilares de contenido",
    gallery: "Galería de contenido",
    featuredVideos: "Videos destacados",
    videosPending: "Selección pendiente",
    playVideo: "Reproducir video",
    originalVideo: "Ver publicación original",
    closeVideo: "Cerrar video",
    galleryCats: [
      "Lifestyle + Experiencias",
      "Juegos y entretenimiento",
      "Contenido de marca",
      "Moda y Beauty",
    ],
    galleryAll: "Todo",
    galleryEmpty:
      "Espacio reservado para videos reales. Se cargarán con enlaces a las publicaciones originales.",
    collabWith: "Consultar una colaboración con",
    whatsappWith: "Escribir por WhatsApp",
    pending: "Pendiente de revisión antes de publicar",
    opportunitiesTitle: "Oportunidades de colaboración",
    opportunitiesText:
      "Contanos tu producto, servicio o experiencia y armamos una propuesta a medida junto al creador.",
  },
  about: {
    eyebrow: "Nosotros",
    title: "Nacimos para conectar oportunidades.",
    story: [
      "Conexa no nace de una estructura corporativa ni de acuerdos preexistentes. Nace de detectar una oportunidad real en el mundo digital y construir un negocio alrededor de ella.",
      "Creemos que el crecimiento de los creadores abre nuevas posibilidades para las marcas y que, detrás de cada buena colaboración, existe una conexión que vale la pena desarrollar.",
      "Por eso construimos Conexa: para acercar marcas y talentos, desarrollar oportunidades comerciales y generar relaciones que tengan sentido para ambas partes.",
    ],
    originTitle: "La historia detrás de Conexa",
    origin: [
      "Soy Santino, emprendedor argentino con experiencia en ventas, negociación y desarrollo comercial. Me enfoqué en identificar oportunidades, conectar personas e impulsar ideas hasta convertirlas en negocios.",
      "Al trabajar en el desarrollo comercial de Spiky, entendí el potencial de los creadores: un solo video corto puede alcanzar a muchísimas personas, abrir conversaciones y dar visibilidad a locales, marcas y experiencias.",
      "Ahí vi la oportunidad: construir un proyecto que conecte el mundo del contenido con los comercios y las marcas que buscan formas nuevas de llegar a sus clientes.",
    ],
    teamTitle: "Las personas detrás de Conexa",
    team: [
      {
        name: "Santi",
        role: "Fundador · Área comercial",
        text: "Lidera el desarrollo comercial, conecta con marcas y comercios, identifica nuevas oportunidades de negocio y genera alianzas para impulsar colaboraciones.",
      },
      {
        name: "Spiky",
        role: "Socio · Co-Founder",
        text: "Aporta su audiencia y experiencia en contenido corto, desarrollando estrategias creativas que conectan con el público y potencian la visibilidad de las marcas.",
      },
      {
        name: "Emi",
        role: "Área estratégica de Marketing",
        text: "Diseña la estrategia de cada campaña, definiendo objetivos, mensajes y formatos para crear contenido relevante y conectar con las audiencias.",
      },
    ],
    more: "Conocé más",
    visionTitle: "Lo que estamos construyendo",
    vision:
      "Aspiramos a desarrollar una red sólida de oportunidades comerciales. No buscamos acuerdos aislados, sino un modelo replicable donde las relaciones evolucionen y aporten valor de forma continua.",
    baseTitle: "Base en Buenos Aires, alcance global",
    base: "Nacimos en Buenos Aires, donde trabajamos presencialmente con marcas, comercios y producciones. Desde acá representamos creadores de distintos países y unimos marcas y talentos de todo el mundo, sin importar dónde estén.",
  },
  how: {
    eyebrow: "Cómo trabajamos",
    title: "Un proceso claro, de la idea a la relación.",
    steps: [
      {
        t: "Escuchamos",
        d: "Entendemos los objetivos, las necesidades y la identidad de la marca o del creador.",
      },
      {
        t: "Conectamos",
        d: "Identificamos perfiles y oportunidades que puedan tener sentido para cada propuesta.",
      },
      {
        t: "Desarrollamos",
        d: "Trabajamos sobre ideas creativas, conceptos, guiones y propuestas comerciales según las necesidades del proyecto.",
      },
      {
        t: "Coordinamos",
        d: "Acompañamos la alineación de expectativas, condiciones y aspectos comerciales de la colaboración.",
      },
      {
        t: "Construimos relaciones",
        d: "Buscamos que las colaboraciones puedan convertirse en relaciones de valor a largo plazo.",
      },
    ],
    step: "Paso",
  },
  win: {
    eyebrow: "Nuestra filosofía",
    title: "Cuando la conexión funciona, todos crecen.",
    body: [
      "Creemos en las relaciones comerciales donde las marcas encuentran nuevas formas de conectar con sus audiencias y los creadores pueden desarrollar su potencial sin perder su esencia.",
      "No se trata solamente de hacer una campaña. Se trata de encontrar la conexión adecuada, construir una propuesta relevante y generar valor para ambas partes.",
    ],
    brands: "Marcas",
    brandsWin: "Nuevas formas de conectar con sus audiencias.",
    creators: "Creadores",
    creatorsWin: "Creatividad convertida en oportunidades reales.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu proyecto.",
    body: "Coordiná una reunión, consultá por un talento o compartinos tu perfil.",
    email: "Enviar email",
    whatsapp: "Hablar por WhatsApp",
    brandsTitle: "Soy una marca",
    creatorsTitle: "Soy creador",
    location: "Buenos Aires, Argentina",
    founder: "LinkedIn del fundador",
    instagram: "Instagram de Conexa",
    linkedin: "LinkedIn de Conexa",
    response: "Respuesta habitual: dentro de las 24 hs hábiles.",
    waBrand: "Hola, conocí Conexa y me gustaría consultar por una colaboración con sus creadores.",
    waCreator:
      "Hola, conocí Conexa y me gustaría compartir mi perfil para que conozcan mi contenido.",
    waTalent: (name: string) =>
      `Hola, conocí Conexa y me gustaría consultar por una colaboración con ${name}.`,
    mailSubject: "Consulta desde la web de Conexa",
  },
  form: {
    required: "Obligatorio",
    optional: "opcional",
    select: "Elegí una opción",
    sending: "Enviando…",
    errorTitle: "No pudimos enviar el formulario.",
    errorBody: "Probá de nuevo en unos minutos o escribinos por WhatsApp o email.",
    fixErrors: "Revisá los campos marcados.",
    consent:
      "Acepto que Conexa use estos datos solo para responder mi consulta. No se comparten con terceros.",
    errors: {
      required: "Este campo es obligatorio.",
      email: "Ingresá un email válido.",
      url: "Ingresá un enlace válido (https://…).",
      consent: "Necesitamos tu consentimiento para enviar.",
      adult: "Necesitás ser mayor de edad para postularte.",
      categories: "Elegí al menos una categoría.",
      long: "El texto es demasiado largo.",
      phone: "Ingresá un número válido con código de país (ej. +54 9 11 1234-5678).",
    },
    brand: {
      title: "Contanos qué necesita tu marca.",
      text: "Queremos conocer tu idea y ayudarte a encontrar la colaboración adecuada.",
      fullName: "Nombre y apellido",
      company: "Empresa o marca",
      email: "Email corporativo o de contacto",
      whatsapp: "WhatsApp",
      website: "Sitio web o Instagram de la marca",
      talent: "Talento de interés",
      market: "País o mercado objetivo",
      submit: "Solicitar propuesta",
      successTitle: "¡Recibimos tu consulta!",
      successBody:
        "Tu solicitud quedó registrada. Te vamos a contactar por email o WhatsApp para seguir la conversación.",
      talentOther: ["Quiero recibir recomendaciones", "Otro"],
    },
    creator: {
      title: "Tu próxima oportunidad puede empezar acá.",
      text: "Queremos conocerte, descubrir tu contenido y entender cómo podemos ayudarte a desarrollar nuevas oportunidades comerciales.",
      fullName: "Nombre y apellido",
      artisticName: "Nombre artístico",
      adult: "Confirmo que soy mayor de 18 años",
      country: "País",
      city: "Ciudad",
      email: "Email",
      whatsapp: "WhatsApp",
      igUser: "Usuario de Instagram",
      ttUser: "Usuario de TikTok",
      otherUrl: "YouTube u otras plataformas",
      followers: "Cantidad aproximada de seguidores",
      followerRanges: [
        "Menos de 10.000",
        "10.000 – 50.000",
        "50.000 – 100.000",
        "100.000 – 500.000",
        "500.000 – 1 millón",
        "Más de 1 millón",
      ],
      categories: "Categorías de contenido",
      description: "Descripción personal",
      featured: "Enlace a contenido destacado",
      extra: "Información adicional",
      submit: "Enviar mi perfil",
      successTitle: "¡Recibimos tu postulación!",
      successBody:
        "Tu perfil quedó registrado. Lo vamos a revisar y, si vemos una oportunidad, te contactamos. Postularte no implica aceptación ni contratos.",
      cats: [
        "Lifestyle",
        "Beauty",
        "Moda",
        "Viajes",
        "Entretenimiento",
        "Gaming",
        "Humor",
        "Fitness",
        "Gastronomía",
        "Educación",
        "Tecnología",
        "Otro",
      ],
    },
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos suelen preguntar.",
    groups: [
      {
        id: "brands",
        title: "Para marcas",
        items: [
          {
            q: "¿Qué hace Conexa exactamente?",
            a: "Conectamos marcas con creadores de contenido que tienen sentido para su audiencia. No solo buscamos el perfil: pensamos la idea, armamos el concepto y el guion, y coordinamos todo lo comercial para que vos no tengas que perseguir a nadie.",
          },
          {
            q: "¿Por qué trabajar con una agencia y no contactar al creador directo?",
            a: "Porque te ahorrás la búsqueda, la negociación y la coordinación. Te proponemos perfiles que encajan con tu marca, ideas que ya están pensadas para su audiencia, y un solo interlocutor para todo.",
          },
          {
            q: "¿Con qué creadores trabajan?",
            a: "Representamos talentos de humor, lifestyle, belleza, entretenimiento y experimentos sociales, con audiencias en Argentina y otros países, como Italia. Podés ver algunos en la sección Talentos.",
          },
          {
            q: "¿Pueden hacer campañas fuera de Argentina?",
            a: "Sí. Tenemos creadores con audiencias en otros países y trabajamos en español, inglés e italiano.",
          },
          {
            q: "¿Cuánto cuesta una campaña?",
            a: "Depende del alcance, de cuántos creadores sumes y del tipo de contenido. Mandanos tu brief y te armamos una propuesta a medida según tu presupuesto.",
          },
          {
            q: "¿Cómo arrancamos?",
            a: 'Completá el formulario "Quiero trabajar con Conexa" o escribinos por WhatsApp. Te respondemos a la brevedad, escuchamos qué necesitás y te traemos una propuesta.',
          },
          {
            q: "¿Hacen acciones puntuales o solo campañas largas?",
            a: "Las dos cosas. Igual nuestro objetivo es que la colaboración funcione tan bien que se convierta en una relación a largo plazo.",
          },
        ],
      },
      {
        id: "creators",
        title: "Para creadores",
        items: [
          {
            q: "¿Cómo me postulo?",
            a: 'Completá el formulario "Soy creador" con tus redes y contanos qué tipo de contenido hacés. Revisamos cada postulación.',
          },
          {
            q: "¿Necesito una cantidad mínima de seguidores?",
            a: "No miramos solo números: nos importa que tu contenido tenga identidad y una comunidad real. Tenemos creadores emergentes, lo que importa es la calidad de tu contenido.",
          },
          {
            q: "¿Tengo que cambiar mi contenido para trabajar con marcas?",
            a: "No. La idea es que crezcas sin perder tu esencia: buscamos marcas que encajen con vos, no al revés.",
          },
        ],
      },
    ],
    general: "General",
    contactQ: "¿Cómo los contacto?",
    contactA: (email: string, phone: string, ig: string) =>
      `Por mail a ${email}, por WhatsApp al ${phone}, o por Instagram en ${ig}.`,
  },
  consent: {
    title: "¿Nos dejás medir las visitas?",
    text: "Usamos Google Analytics para saber qué páginas sirven y mejorar el sitio. Solo se activa si aceptás.",
    accept: "Aceptar",
    reject: "Rechazar",
    settings: "Preferencias de cookies",
  },
  footer: {
    tagline: "Conectamos marcas, creadores y oportunidades.",
    desc: "Agencia argentina de representación de creadores de contenido y desarrollo comercial.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    privacy:
      "Aviso de privacidad: los datos enviados por formularios se usan solo para responder consultas y postulaciones. No se venden ni se comparten con terceros. Usamos Google Analytics para medir visitas solo si lo aceptás.",
    rights: "© 2026 CONEXA. Todos los derechos reservados.",
  },
  meta: {
    home: {
      title: "Conexa — Conectamos marcas con la nueva generación",
      description:
        "Agencia argentina de representación de creadores y desarrollo comercial. Unimos marcas y creadores en colaboraciones auténticas.",
    },
    brands: {
      title: "Para marcas — Conexa",
      description:
        "Encontrá creadores, ideas y campañas para tu marca. Selección de talentos, propuestas creativas y coordinación comercial.",
    },
    creators: {
      title: "Para creadores — Conexa",
      description:
        "Representación comercial para creadores de contenido: oportunidades con marcas, propuestas y desarrollo de marca personal.",
    },
    talents: {
      title: "Talentos — Conexa",
      description:
        "Conocé a los creadores de Conexa: Lua Sansat, Spiky, FelBuck_, Goddermann y Lowkey Santo. Perfiles, audiencias y categorías.",
    },
    about: {
      title: "Nosotros — Conexa",
      description:
        "La historia de Conexa, su fundador Santino Gioveni y el equipo detrás de la agencia.",
    },
    how: {
      title: "Cómo trabajamos — Conexa",
      description:
        "Escuchamos, conectamos, desarrollamos, coordinamos y construimos relaciones. Así trabajamos en Conexa.",
    },
    contact: {
      title: "Contacto — Conexa",
      description: "Escribinos por email o WhatsApp. Base en Buenos Aires, Argentina.",
    },
    talent: (name: string) => ({
      title: `${name} — Talentos de Conexa`,
      description: `Perfil comercial de ${name}: audiencia, estadísticas informadas y colaboraciones con marcas.`,
    }),
  },
};

type Dict = typeof es;

const en: Dict = {
  nav: {
    home: "Home",
    brands: "For brands",
    creators: "For creators",
    talents: "Talent",
    about: "About",
    how: "How we work",
    contact: "Contact",
    cta: "Let's talk",
    menu: "Open menu",
    close: "Close menu",
    lang: "Change language",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "Business development & social culture",
    title: "We connect brands with the new generation.",
    subtitle:
      "We represent creators with real audiences across Argentina, Latin America, Spain and Italy. You pick the talent; we shape the idea, write the script and handle everything until it goes live.",
    stats: {
      talents: "creators represented",
      followers: "followers across their communities",
      views: "views per month",
    },
    body: "We believe in connections that create value. That's why we bring brands closer to the right talent and help creators turn their creativity into new opportunities.",
    primary: "I want to work with Conexa",
    secondary: "I'm a creator",
    nodes: { brands: "Brands", creators: "Creators", audiences: "Audiences" },
    lines: ["We connect", "brands", "with the", "new generation"],
    vertical: "Connection",
    tag: "Buenos Aires · Creator agency",
    scroll: "Scroll",
    flowTitle: "The Conexa system",
    flow: [
      { k: "Brands", d: "Goals, identity and budget. We define what needs to happen." },
      { k: "Creators", d: "The right talent, with an idea that feels like their own." },
      { k: "Audiences", d: "Real communities that watch, share and remember." },
    ],
  },
  value: {
    eyebrow: "Value proposition",
    blocks: [
      { title: "Relevant connections" },
      { title: "Ideas that connect" },
      { title: "Real opportunities" },
    ],
  },
  home: {
    talentsTitle: "Conexa talent",
    talentsText: "Creators with their own identity and real communities.",
    allTalents: "See all talent",
    twoTitle: "One agency, two paths.",
    brandsCard: "You're looking for creators, ideas and campaigns that connect with your audience.",
    creatorsCard: "You want business representation and opportunities with brands.",
    discover: "Discover",
  },
  brands: {
    eyebrow: "For brands",
    title: "Your brand has a story. Let's find who can tell it.",
    body: "Audiences evolve, and so do the ways to connect with them. At Conexa we help brands discover creators, develop ideas and build collaborations that integrate their products and services naturally.",
    servicesTitle: "How we help your brand",
    services: [
      "Creator selection based on goals and audience.",
      "Business representation and opportunity management.",
      "Creative proposal development.",
      "Campaign ideation.",
      "Scripts and content concepts.",
      "Product and service integration.",
      "Lifestyle, fashion, beauty, travel, entertainment and other collaborations.",
      "Commercial campaign coordination.",
      "Custom proposals based on needs and budget.",
      "Long-term business relationships.",
    ],
    cta: "Tell us what your brand needs.",
    cta2: "Meet our talent.",
    legacyTitle: "Also from our experience",
    legacy: [
      {
        title: "Ideation & creative scripts",
        text: "We don't impose rigid messages. We develop fresh video ideas and adapt your proposal to the audience's language without losing authenticity.",
      },
      {
        title: "Production & locations",
        text: "Production support, access to sets and urban locations, and technical coordination to keep visual quality high.",
      },
      {
        title: "360° business development",
        text: "We make clear agreements, write tailored proposals and manage the business relationship so both sides win.",
      },
    ],
  },
  creators: {
    eyebrow: "For creators",
    title: "You create. We look for new opportunities.",
    body: "We know creating content takes creativity, time and an identity of your own. At Conexa we want to help you grow your business potential, connect with brands and build professional relationships without losing what makes your content unique.",
    servicesTitle: "What we do with you",
    services: [
      "Business representation.",
      "Sourcing opportunities with brands.",
      "Pitching your profile to companies.",
      "Developing business proposals.",
      "Negotiating and coordinating collaborations.",
      "Creative and strategic guidance.",
      "Personal brand development.",
      "Spotting new monetization opportunities.",
    ],
    cta: "I want to join Conexa.",
    disclaimer:
      "Applying doesn't guarantee representation, contracts or campaigns. We review every profile and reach out if we see an opportunity.",
  },
  talents: {
    international:
      "Based in Argentina, we represent talent from different countries and connect brands with audiences beyond borders.",
    eyebrow: "Talent",
    title: "Creators who connect.",
    body: "Each profile is a mini business deck with data reported by each creator.",
    viewProfile: "View profile",
    ask: "Ask about a collaboration",
    photoPending: "Real photo pending",
    categories: "Categories",
    platforms: "Platforms",
    followers: "Community",
    who: "Who they are",
    why: "Why work with",
    skills: "Skills",
    open: "Show more",
    close: "Close",
    soon: "Data coming soon",
    cardFollowers: "Followers",
    cardViews: "Views per month",
    approx: "Approximate values: sum of platforms and reported periods.",
    openProfile: "Tap a name to see the full profile.",
  },
  profile: {
    back: "All talent",
    about: "About",
    stats: "Key stats",
    statsNote:
      "Data reported for the periods shown. These are not real-time metrics and do not guarantee campaign results.",
    audience: "Audience profile",
    gender: "Gender split",
    countries: "Top countries",
    countriesNote: "",
    dataNote: "Data reported in November 2026; ask us for more information.",
    languages: "Audience language",
    platforms: "Platforms",
    compare: "Platform comparison (followers)",
    pillars: "Content pillars",
    gallery: "Content gallery",
    featuredVideos: "Featured videos",
    videosPending: "Selection pending",
    playVideo: "Play video",
    originalVideo: "View original post",
    closeVideo: "Close video",
    galleryCats: [
      "Lifestyle + Experiences",
      "Games & entertainment",
      "Branded content",
      "Fashion & Beauty",
    ],
    galleryAll: "All",
    galleryEmpty:
      "Reserved space for real videos. They'll be added with links to the original posts.",
    collabWith: "Ask about a collaboration with",
    whatsappWith: "Message on WhatsApp",
    pending: "Pending review before publishing",
    opportunitiesTitle: "Collaboration opportunities",
    opportunitiesText:
      "Tell us about your product, service or experience and we'll build a tailored proposal with the creator.",
  },
  about: {
    eyebrow: "About",
    title: "Born to connect opportunities.",
    story: [
      "Conexa wasn't born from a corporate structure or pre-existing deals. It was born from spotting a real opportunity in the digital world and building a business around it.",
      "We believe creators' growth opens new possibilities for brands, and that behind every good collaboration there's a connection worth developing.",
      "That's why we built Conexa: to bring brands and talent together, develop business opportunities and build relationships that make sense for both sides.",
    ],
    originTitle: "The story behind Conexa",
    origin: [
      "I'm Santino, an Argentine entrepreneur with experience in sales, negotiation and business development. I've focused on spotting opportunities, connecting people and pushing ideas until they become businesses.",
      "Working on Spiky's business development, I understood creators' potential: a single short video can reach a huge number of people, open conversations and give visibility to venues, brands and experiences.",
      "That's where I saw the opportunity: build a project that connects the content world with businesses and brands looking for new ways to reach their customers.",
    ],
    teamTitle: "The people behind Conexa",
    team: [
      {
        name: "Santino Gioveni",
        role: "Founder · Business",
        text: "Leads business development, connects with brands and businesses, spots new opportunities and builds partnerships to drive collaborations.",
      },
      {
        name: "Spiky",
        role: "Partner · Co-Founder",
        text: "Brings his audience and short-form expertise, developing creative strategies that connect with people and boost brand visibility.",
      },
      {
        name: "Emilia",
        role: "Marketing strategy",
        text: "Designs each campaign's strategy, defining goals, messages and formats to create relevant content and connect with audiences.",
      },
    ],
    more: "Learn more",
    visionTitle: "What we're building",
    vision:
      "We aim to build a solid network of business opportunities. We're not after one-off deals, but a repeatable model where relationships evolve and keep adding value.",
    baseTitle: "Based in Buenos Aires, reaching the world",
    base: "We were born in Buenos Aires, where we work in person with brands, businesses and productions. From here we represent creators from different countries and bring together brands and talent from all over the world, wherever they are.",
  },
  how: {
    eyebrow: "How we work",
    title: "A clear process, from idea to relationship.",
    steps: [
      { t: "We listen", d: "We understand the goals, needs and identity of the brand or creator." },
      {
        t: "We connect",
        d: "We identify profiles and opportunities that make sense for each proposal.",
      },
      {
        t: "We develop",
        d: "We work on creative ideas, concepts, scripts and business proposals based on the project's needs.",
      },
      {
        t: "We coordinate",
        d: "We help align expectations, terms and the business side of the collaboration.",
      },
      {
        t: "We build relationships",
        d: "We aim for collaborations to grow into valuable long-term relationships.",
      },
    ],
    step: "Step",
  },
  win: {
    eyebrow: "Our philosophy",
    title: "When the connection works, everyone grows.",
    body: [
      "We believe in business relationships where brands find new ways to connect with their audiences and creators can grow their potential without losing their essence.",
      "It's not just about running a campaign. It's about finding the right connection, building a relevant proposal and creating value for both sides.",
    ],
    brands: "Brands",
    brandsWin: "New ways to connect with their audiences.",
    creators: "Creators",
    creatorsWin: "Creativity turned into real opportunities.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project.",
    body: "Book a meeting, ask about a creator or share your profile with us.",
    email: "Send an email",
    whatsapp: "Chat on WhatsApp",
    brandsTitle: "I'm a brand",
    creatorsTitle: "I'm a creator",
    location: "Buenos Aires, Argentina",
    founder: "Founder's LinkedIn",
    instagram: "Conexa on Instagram",
    linkedin: "Conexa on LinkedIn",
    response: "We usually reply within 24 business hours.",
    waBrand: "Hi, I found Conexa and I'd like to ask about a collaboration with your creators.",
    waCreator: "Hi, I found Conexa and I'd like to share my profile so you can see my content.",
    waTalent: (name: string) =>
      `Hi, I found Conexa and I'd like to ask about a collaboration with ${name}.`,
    mailSubject: "Inquiry from the Conexa website",
  },
  form: {
    required: "Required",
    optional: "optional",
    select: "Choose an option",
    sending: "Sending…",
    errorTitle: "We couldn't send the form.",
    errorBody: "Please try again in a few minutes, or reach us on WhatsApp or by email.",
    fixErrors: "Please check the highlighted fields.",
    consent:
      "I agree that Conexa uses this data only to reply to my inquiry. It isn't shared with third parties.",
    errors: {
      required: "This field is required.",
      email: "Enter a valid email.",
      url: "Enter a valid link (https://…).",
      consent: "We need your consent to send this.",
      adult: "You must be 18 or older to apply.",
      categories: "Choose at least one category.",
      long: "This text is too long.",
      phone: "Enter a valid number with country code (e.g. +1 555 123 4567).",
    },
    brand: {
      title: "Tell us what your brand needs.",
      text: "We'd love to hear your idea and help you find the right collaboration.",
      fullName: "Full name",
      company: "Company or brand",
      email: "Work or contact email",
      whatsapp: "WhatsApp",
      website: "Brand website or Instagram",
      talent: "Talent of interest",
      market: "Target country or market",
      submit: "Request a proposal",
      successTitle: "We got your inquiry!",
      successBody:
        "Your request has been saved. We'll reach out by email or WhatsApp to keep the conversation going.",
      talentOther: ["I'd like recommendations", "Other"],
    },
    creator: {
      title: "Your next opportunity could start here.",
      text: "We want to get to know you, discover your content and understand how we can help you develop new business opportunities.",
      fullName: "Full name",
      artisticName: "Creator name",
      adult: "I confirm I'm 18 or older",
      country: "Country",
      city: "City",
      email: "Email",
      whatsapp: "WhatsApp",
      igUser: "Instagram username",
      ttUser: "TikTok username",
      otherUrl: "YouTube or other platforms",
      followers: "Approximate follower count",
      followerRanges: [
        "Under 10,000",
        "10,000 – 50,000",
        "50,000 – 100,000",
        "100,000 – 500,000",
        "500,000 – 1 million",
        "Over 1 million",
      ],
      categories: "Content categories",
      description: "About you",
      featured: "Link to featured content",
      extra: "Additional information",
      submit: "Send my profile",
      successTitle: "We got your application!",
      successBody:
        "Your profile has been saved. We'll review it and reach out if we see an opportunity. Applying doesn't imply acceptance or contracts.",
      cats: [
        "Lifestyle",
        "Beauty",
        "Fashion",
        "Travel",
        "Entertainment",
        "Gaming",
        "Humor",
        "Fitness",
        "Food",
        "Education",
        "Tech",
        "Other",
      ],
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "What people usually ask us.",
    groups: [
      {
        id: "brands",
        title: "For brands",
        items: [
          {
            q: "What exactly does Conexa do?",
            a: "We connect brands with content creators who make sense for their audience. We don't just find the profile: we shape the idea, build the concept and script, and handle everything commercial so you don't have to chase anyone.",
          },
          {
            q: "Why work with an agency instead of contacting the creator directly?",
            a: "Because you skip the search, the negotiation and the coordination. We suggest profiles that fit your brand, ideas already designed for their audience, and a single point of contact for everything.",
          },
          {
            q: "Which creators do you work with?",
            a: "We represent talent in humor, lifestyle, beauty, entertainment and social experiments, with audiences in Argentina and other countries, such as Italy. You can see some of them in the Talent section.",
          },
          {
            q: "Can you run campaigns outside Argentina?",
            a: "Yes. We have creators with audiences in other countries and we work in Spanish, English and Italian.",
          },
          {
            q: "How much does a campaign cost?",
            a: "It depends on the reach, how many creators you add and the type of content. Send us your brief and we'll put together a tailored proposal based on your budget.",
          },
          {
            q: "How do we get started?",
            a: 'Fill in the "I want to work with Conexa" form or message us on WhatsApp. We\'ll get back to you shortly, listen to what you need and bring you a proposal.',
          },
          {
            q: "Do you do one-off actions or only long campaigns?",
            a: "Both. That said, our goal is for the collaboration to work so well that it becomes a long-term relationship.",
          },
        ],
      },
      {
        id: "creators",
        title: "For creators",
        items: [
          {
            q: "How do I apply?",
            a: 'Fill in the "I\'m a creator" form with your socials and tell us what kind of content you make. We review every application.',
          },
          {
            q: "Do I need a minimum number of followers?",
            a: "We don't just look at numbers: we care that your content has identity and a real community. We work with emerging creators; what matters is the quality of your content.",
          },
          {
            q: "Do I have to change my content to work with brands?",
            a: "No. The idea is for you to grow without losing your essence: we look for brands that fit you, not the other way around.",
          },
        ],
      },
    ],
    general: "General",
    contactQ: "How do I contact you?",
    contactA: (email: string, phone: string, ig: string) =>
      `Email us at ${email}, message us on WhatsApp at ${phone}, or find us on Instagram at ${ig}.`,
  },
  consent: {
    title: "Can we measure visits?",
    text: "We use Google Analytics to learn which pages are useful and improve the site. It only runs if you accept.",
    accept: "Accept",
    reject: "Decline",
    settings: "Cookie preferences",
  },
  footer: {
    tagline: "We connect brands, creators and opportunities.",
    desc: "Argentine agency for content creator representation and business development.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    privacy:
      "Privacy notice: data sent through our forms is used only to reply to inquiries and applications. It is never sold or shared with third parties. We use Google Analytics to measure visits only if you accept it.",
    rights: "© 2026 CONEXA. All rights reserved.",
  },
  meta: {
    home: {
      title: "Conexa — We connect brands with the new generation",
      description:
        "Argentine creator representation and business development agency. We bring brands and creators together in authentic collaborations.",
    },
    brands: {
      title: "For brands — Conexa",
      description:
        "Find creators, ideas and campaigns for your brand. Talent selection, creative proposals and business coordination.",
    },
    creators: {
      title: "For creators — Conexa",
      description:
        "Business representation for content creators: brand opportunities, proposals and personal brand development.",
    },
    talents: {
      title: "Talent — Conexa",
      description:
        "Meet Conexa's creators: Lua Sansat, Spiky, FelBuck_, Goddermann and Lowkey Santo. Profiles, audiences and categories.",
    },
    about: {
      title: "About — Conexa",
      description: "The story of Conexa, founder Santino Gioveni and the team behind the agency.",
    },
    how: {
      title: "How we work — Conexa",
      description:
        "We listen, connect, develop, coordinate and build relationships. That's how Conexa works.",
    },
    contact: {
      title: "Contact — Conexa",
      description: "Reach us by email or WhatsApp. Based in Buenos Aires, Argentina.",
    },
    talent: (name: string) => ({
      title: `${name} — Conexa talent`,
      description: `${name}'s business profile: audience, reported stats and brand collaborations.`,
    }),
  },
};

export const DICT: Record<Lang, Dict> = { es, en };

export function useLang(): Lang {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLang(params.lang) ? params.lang : "es";
}
export function useT() {
  return DICT[useLang()];
}

const SITE = "https://www.conexa-agency.com.ar";
type PageKey = "home" | "brands" | "creators" | "talents" | "about" | "how" | "contact";

export function pageHead(
  langParam: string | undefined,
  key: PageKey | { title: string; description: string },
  path: string,
) {
  const lang: Lang = isLang(langParam) ? langParam : "es";
  const m = typeof key === "string" ? DICT[lang].meta[key] : key;
  const suffix = path ? `/${path}` : "";
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.description },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: lang === "es" ? "es_AR" : "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: m.title },
      { name: "twitter:description", content: m.description },
    ],
    links: [
      { rel: "canonical", href: `${SITE}/${lang}${suffix}` },
      { rel: "alternate", hrefLang: "es", href: `${SITE}/es${suffix}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en${suffix}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE}/es${suffix}` },
    ],
  };
}
