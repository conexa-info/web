import luaImg from "@/assets/lua-sansat.webp";
import luaCut from "@/assets/lua-sin-fondo.webp";
import spikyImg from "@/assets/spiky2.webp";
import spikyCut from "@/assets/spiky-sin-fondo.webp";
import felbuckImg from "@/assets/felbuck.webp";
import felbuckCut from "@/assets/felbuck-sin-fondo.webp";
import goddermannImg from "@/assets/goddermann.webp";
import goddermannCut from "@/assets/goddermann-sin-fondo.webp";
import lowkeyImg from "@/assets/lowkey.webp";
import lowkeyCut from "@/assets/lowkey-sin-fondo.webp";
import type { Lang } from "@/lib/i18n";

// Single source of truth for creator profiles. Add a new object to TALENTS to
// publish a new creator: the cards, profile page, forms and sitemap pick it up.

type L = Record<Lang, string>;

export interface Metric {
  value: string | number;
  format?: "percent";
  label: L;
  note?: L;
}
export interface MetricGroup {
  title: L;
  period?: L;
  metrics: Metric[];
}
export interface Share {
  label: L;
  value: number; // percent
}
export interface FeaturedVideo {
  title: L;
  platform: "Instagram" | "TikTok";
  url: string;
  embedUrl: string;
  sourceUrl: string;
}
/**
 * Metrics shown on talent cards. Exact numbers; display helpers handle locale.
 * `followersPrefix` / `viewsApprox` flag figures summed across platforms or periods.
 */
export interface KeyStats {
  followers: number;
  followersPrefix?: "+" | "≈";
  monthlyViews: number;
  viewsApprox?: boolean;
}
export interface Strength {
  k: L;
  v: string | number;
  d: L;
}
export interface Talent {
  slug: string;
  name: string;
  handle: string;
  photo?: string; // real photo only; undefined shows a labelled upload slot
  cutout?: string; // transparent-background version for previews
  featured?: boolean;
  categories: L[];
  intro: L;
  bio?: L[];
  location?: L;
  audienceReach?: L;
  audienceNote?: L;
  audienceDecimals?: number;
  languages?: Share[];
  socials: { platform: "Instagram" | "TikTok"; url: string }[];
  videos?: FeaturedVideo[];
  sources?: { url: string; label: L }[];
  headline?: { value: string | number; label: L };
  whyWork: L[];
  skills: L[];
  groups: MetricGroup[];
  age?: { title: L; highlight?: L; items: Share[] };
  gender?: { items: Share[]; note?: L };
  countries?: { flag: string; label: L; value: number }[];
  pillars?: { title: L; text: L }[];
  pendingReview?: L[];
  keyStats: KeyStats;
  /** Big-number band right after the bio. */
  highlights?: Metric[];
  greeting?: L;
  platformFollowers?: { platform: "TikTok" | "Instagram"; value: number }[];
  geo?: { title: L; text: L };
  pillarsIntro?: { title: L; text: L };
  pillarsNote?: L;
  pitch?: { title: L; text: L; strengths: Strength[] };
}

const l = (es: string, en: string): L => ({ es, en });

export const TALENTS: Talent[] = [
  {
    slug: "lua-sansat",
    photo: luaImg,
    cutout: luaCut,
    name: "Lua Sansat",
    handle: "@luasansat",
    featured: true,
    categories: [
      l("Lifestyle", "Lifestyle"),
      l("Beauty", "Beauty"),
      l("Entretenimiento", "Entertainment"),
      l("Viajes", "Travel"),
      l("Experiencias", "Experiences"),
      l("Moda", "Fashion"),
    ],
    intro: l(
      "Transformo ideas, experiencias y productos en contenido que entretiene, genera curiosidad y conecta con las personas.",
      "I turn ideas, experiences and products into content that entertains, sparks curiosity and connects with people.",
    ),
    bio: [
      l(
        "Soy creadora de contenido argentina y me dedico a transformar ideas, experiencias y productos en videos que entretienen, generan curiosidad y conectan con las personas.",
        "I'm an Argentine content creator and I turn ideas, experiences and products into videos that entertain, spark curiosity and connect with people.",
      ),
      l(
        "Mi contenido combina creatividad, storytelling, guiones dinámicos y edición para captar la atención desde los primeros segundos.",
        "My content blends creativity, storytelling, dynamic scripts and editing to capture attention from the very first seconds.",
      ),
      l(
        "Cuando trabajo con una marca, mi objetivo no es simplemente mostrar un producto, sino integrarlo de forma natural a una historia o experiencia que mi audiencia quiera ver, disfrutar y recordar.",
        "When I work with a brand, my goal isn't just to show a product, but to weave it naturally into a story or experience my audience wants to watch, enjoy and remember.",
      ),
      l(
        "Disfruto explorar nuevos formatos, contar historias y crear propuestas que despierten curiosidad y mantengan a la audiencia involucrada.",
        "I enjoy exploring new formats, telling stories and creating ideas that spark curiosity and keep the audience engaged.",
      ),
    ],
    location: l("Argentina · 22 años", "Argentina · 22 years old"),
    audienceReach: l(
      "Argentina y Latinoamérica, con presencia también en otros países.",
      "Argentina and Latin America, with presence in other countries too.",
    ),
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/luasansat/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@luasansat" },
    ],
    headline: {
      value: "≈1.6M",
      label: l("seguidores entre TikTok e Instagram", "followers across TikTok and Instagram"),
    },
    // Monthly views ≈ Instagram 4.62M (30 days) + TikTok 13.6M / 2 (60 days).
    keyStats: {
      followers: 1590000,
      followersPrefix: "≈",
      monthlyViews: 11420000,
      viewsApprox: true,
    },
    greeting: l("Hola, soy Luana.", "Hi, I'm Luana."),
    highlights: [
      { value: "1.4M", label: l("seguidores en TikTok", "TikTok followers") },
      { value: "190K", label: l("seguidores en Instagram", "Instagram followers") },
      { value: "13.6M", label: l("visualizaciones TikTok · 60 días", "TikTok views · 60 days") },
      {
        value: "4.62M",
        label: l("visualizaciones Instagram · 30 días", "Instagram views · 30 days"),
      },
      {
        value: 73.5,
        format: "percent",
        label: l("audiencia de 18 a 34 años", "audience aged 18–34"),
      },
    ],
    platformFollowers: [
      { platform: "TikTok", value: 1400000 },
      { platform: "Instagram", value: 190000 },
    ],
    geo: {
      title: l(
        "Una comunidad que conecta con Argentina y Latinoamérica.",
        "A community that connects with Argentina and Latin America.",
      ),
      text: l(
        "Lua combina una identidad de creadora argentina con una audiencia que también se extiende a otros mercados de Latinoamérica y España.",
        "Lua combines an Argentine creator identity with an audience that also reaches other markets in Latin America and Spain.",
      ),
    },
    pillarsIntro: {
      title: l(
        "Contenido que entretiene, conecta y genera curiosidad.",
        "Content that entertains, connects and sparks curiosity.",
      ),
      text: l(
        "Mi contenido combina entretenimiento, espontaneidad y una mirada personal sobre las tendencias y experiencias del día a día. Me gusta experimentar con ideas, formatos y recursos narrativos para crear videos que inviten a mirar, participar y compartir.",
        "My content blends entertainment, spontaneity and a personal take on everyday trends and experiences. I like experimenting with ideas, formats and storytelling devices to create videos that invite people to watch, join in and share.",
      ),
    },
    pillarsNote: l(
      "2.9M visualizaciones en contenido de juegos y entretenimiento informado.",
      "2.9M views on the reported games & entertainment content.",
    ),
    pitch: {
      title: l(
        "Una creadora que convierte ideas en experiencias.",
        "A creator who turns ideas into experiences.",
      ),
      text: l(
        "Con una comunidad de aproximadamente 1.6 millones de seguidores entre TikTok e Instagram, Lua desarrolla contenido de lifestyle, entretenimiento, moda, beauty y experiencias. Su estilo combina storytelling, creatividad y formatos dinámicos para integrar marcas en historias que despiertan curiosidad y conectan con una audiencia joven.",
        "With a community of roughly 1.6 million followers across TikTok and Instagram, Lua creates lifestyle, entertainment, fashion, beauty and experience content. Her style blends storytelling, creativity and dynamic formats to integrate brands into stories that spark curiosity and connect with a young audience.",
      ),
      strengths: [
        {
          k: l("Escala", "Scale"),
          v: "≈1.6M",
          d: l("seguidores entre TikTok e Instagram", "followers across TikTok and Instagram"),
        },
        {
          k: l("Atención", "Attention"),
          v: "13.6M",
          d: l(
            "visualizaciones en TikTok · últimos 60 días informados",
            "TikTok views · last 60 reported days",
          ),
        },
        {
          k: l("Diversidad", "Range"),
          v: "4.62M",
          d: l(
            "visualizaciones en Instagram · últimos 30 días informados",
            "Instagram views · last 30 reported days",
          ),
        },
      ],
    },
    groups: [
      {
        title: l("Comunidad", "Community"),
        metrics: [
          { value: "1.4M", label: l("Seguidores en TikTok", "TikTok followers") },
          { value: "190K", label: l("Seguidores en Instagram", "Instagram followers") },
          {
            value: "≈1.6M",
            label: l("Comunidad total aproximada", "Approximate total community"),
            note: l(
              "Suma de seguidores (1.59M). Puede haber personas que sigan ambas cuentas.",
              "Sum of followers (1.59M). Some people may follow both accounts.",
            ),
          },
        ],
      },
      {
        title: l("TikTok · últimos 60 días", "TikTok · last 60 days"),
        metrics: [
          { value: "13.6M", label: l("Visualizaciones de videos", "Video views") },
          { value: "1.3M", label: l("Likes", "Likes") },
          { value: "25.3K", label: l("Compartidos", "Shares") },
          { value: "10.5K", label: l("Comentarios", "Comments") },
          {
            value: "1.4M",
            label: l("Alcance / nuevos espectadores", "Reach / new viewers"),
            note: l("Según la información suministrada.", "As reported in the data provided."),
          },
        ],
      },
      {
        title: l("Instagram · últimos 30 días", "Instagram · last 30 days"),
        metrics: [
          { value: "4.62M", label: l("Visualizaciones totales", "Total views") },
          { value: "1.2M", label: l("Cuentas alcanzadas", "Accounts reached") },
          { value: "3.1M", label: l("Visualizaciones de Reels", "Reels views") },
          { value: "1.4M", label: l("Visualizaciones de Stories", "Stories views") },
        ],
      },
    ],
    age: {
      title: l("Distribución por edades", "Age distribution"),
      highlight: l(
        "El 73.5% de la audiencia tiene entre 18 y 34 años.",
        "73.5% of the audience is between 18 and 34.",
      ),
      items: [
        { label: l("18–24 años", "18–24"), value: 32.7 },
        { label: l("25–34 años", "25–34"), value: 40.8 },
        { label: l("35–44 años", "35–44"), value: 18.1 },
        { label: l("45–54 años", "45–54"), value: 6.2 },
        { label: l("55 años o más", "55+"), value: 2.2 },
      ],
    },
    gender: {
      items: [
        { label: l("Hombres", "Men"), value: 57 },
        { label: l("Mujeres", "Women"), value: 42 },
        { label: l("Sin clasificar", "Unclassified"), value: 1 },
      ],
    },
    countries: [
      { flag: "🇦🇷", label: l("Argentina", "Argentina"), value: 26.7 },
      { flag: "🇲🇽", label: l("México", "Mexico"), value: 14.6 },
      { flag: "🇨🇱", label: l("Chile", "Chile"), value: 4.0 },
      { flag: "🇪🇸", label: l("España", "Spain"), value: 3.8 },
      { flag: "🇨🇴", label: l("Colombia", "Colombia"), value: 3.6 },
    ],
    pillars: [
      {
        title: l("Lifestyle y vida cotidiana", "Lifestyle & everyday life"),
        text: l(
          "Rutinas, tendencias, experiencias personales y situaciones con las que la audiencia se identifica.",
          "Routines, trends, personal experiences and situations the audience relates to.",
        ),
      },
      {
        title: l("Viajes y experiencias", "Travel & experiences"),
        text: l(
          "Destinos, actividades, lugares y experiencias contadas desde una perspectiva cercana y entretenida.",
          "Destinations, activities, places and experiences told from a close, entertaining perspective.",
        ),
      },
      {
        title: l("Entretenimiento y storytelling", "Entertainment & storytelling"),
        text: l(
          "Ideas originales, juegos, opiniones, anécdotas y guiones pensados para despertar curiosidad y mantener la atención.",
          "Original ideas, games, opinions, anecdotes and scripts designed to spark curiosity and hold attention.",
        ),
      },
      {
        title: l("Contenido para marcas", "Branded content"),
        text: l(
          "Videos creativos que integran productos, servicios y experiencias de forma natural, sin perder la identidad de la creadora ni la esencia de la marca.",
          "Creative videos that integrate products, services and experiences naturally, without losing the creator's identity or the brand's essence.",
        ),
      },
    ],
    whyWork: [
      l(
        "Integra la marca dentro de una historia, no como un aviso aparte.",
        "Weaves the brand into a story, not a separate ad.",
      ),
      l(
        "Comunidad grande y joven: el 73.5% tiene entre 18 y 34 años.",
        "Large, young community: 73.5% is aged 18–34.",
      ),
      l(
        "Alcance en Argentina, México, Chile, España y Colombia.",
        "Reach across Argentina, Mexico, Chile, Spain and Colombia.",
      ),
    ],
    skills: [
      l("Storytelling", "Storytelling"),
      l("Guiones dinámicos", "Dynamic scripts"),
      l("Edición", "Editing"),
      l("Ganchos en los primeros segundos", "First-second hooks"),
      l("Nuevos formatos", "New formats"),
    ],
    videos: [
      {
        title: l("Video destacado de Lua", "Lua's featured video"),
        platform: "TikTok",
        url: "https://www.tiktok.com/@luasansat/video/7702910257969909000",
        embedUrl: "https://www.tiktok.com/player/v1/7702910257969909000",
        sourceUrl: "https://www.tiktok.com/@luasansat/video/7702910257969909000",
      },
    ],
  },
  {
    slug: "spiky",
    photo: spikyImg,
    cutout: spikyCut,
    name: "Spiky",
    handle: "@juanilecot",
    categories: [
      l("Humor urbano", "Urban humor"),
      l("Formato corto", "Short-form"),
      l("Tendencias", "Trends"),
    ],
    intro: l(
      "Hago contenido corto de humor urbano y tendencias que la gente comparte.",
      "I make short-form urban humor and trend content that people share.",
    ),
    socials: [
      { platform: "TikTok", url: "https://www.tiktok.com/@spikiiiii" },
      { platform: "Instagram", url: "https://www.instagram.com/juanilecot/" },
    ],
    headline: {
      value: "+460K",
      label: l("audiencia acumulada TikTok + Instagram", "combined TikTok + Instagram audience"),
    },
    // Monthly views = TikTok 26.4M + Instagram 8.5M.
    keyStats: { followers: 460000, followersPrefix: "+", monthlyViews: 34900000 },
    highlights: [
      { value: "+460K", label: l("audiencia TikTok + Instagram", "TikTok + Instagram audience") },
      { value: "26.4M", label: l("vistas mensuales en TikTok", "monthly TikTok views") },
      { value: "8.5M", label: l("vistas mensuales en Instagram", "monthly Instagram views") },
      {
        value: 79.9,
        format: "percent",
        label: l("audiencia TikTok de 18 a 34 años", "TikTok audience aged 18–34"),
      },
    ],
    geo: {
      title: l(
        "Una comunidad que conecta con Argentina y Latinoamérica.",
        "A community that connects with Argentina and Latin America.",
      ),
      text: l(
        "El 42.7% de su audiencia está en Argentina, con presencia en México, Chile, Perú y Colombia.",
        "42.7% of his audience is in Argentina, with presence in Mexico, Chile, Peru and Colombia.",
      ),
    },
    pitch: {
      title: l("Humor urbano que la gente comparte.", "Urban humor people share."),
      text: l(
        "Con más de 460K seguidores entre TikTok e Instagram, Spiky hace videos cortos de humor urbano y tendencias. Suma 26.4M de vistas mensuales en TikTok y le habla a una audiencia joven: el 79.9% tiene entre 18 y 34 años.",
        "With 460K+ followers across TikTok and Instagram, Spiky makes short urban-humor and trend videos. He gets 26.4M monthly views on TikTok and speaks to a young audience: 79.9% is aged 18–34.",
      ),
      strengths: [
        {
          k: l("Escala", "Scale"),
          v: "+460K",
          d: l("audiencia acumulada TikTok + Instagram", "combined TikTok + Instagram audience"),
        },
        {
          k: l("Atención", "Attention"),
          v: "26.4M",
          d: l("vistas mensuales en TikTok", "monthly TikTok views"),
        },
        {
          k: l("Alcance", "Reach"),
          v: "8.2M",
          d: l(
            "vistas mensuales de no seguidores en Instagram",
            "monthly Instagram views from non-followers",
          ),
        },
      ],
    },
    groups: [
      {
        title: l("Métricas mensuales", "Monthly metrics"),
        metrics: [
          {
            value: "+460K",
            label: l(
              "Audiencia acumulada (TikTok + Instagram)",
              "Combined audience (TikTok + Instagram)",
            ),
          },
          {
            value: "26.4M",
            label: l("Vistas mensuales en TikTok", "Monthly TikTok views"),
            note: l("14.1M espectadores únicos", "14.1M unique viewers"),
          },
          {
            value: "8.5M",
            label: l("Vistas mensuales en Instagram", "Monthly Instagram views"),
            note: l("8.2M no seguidores", "8.2M non-followers"),
          },
          { value: "2.4M+", label: l("Me gusta en TikTok (mensual)", "Monthly TikTok likes") },
        ],
      },
    ],
    age: {
      title: l("Rango etario (TikTok)", "Age range (TikTok)"),
      highlight: l(
        "El 79.9% de su audiencia en TikTok tiene entre 18 y 34 años.",
        "79.9% of his TikTok audience is between 18 and 34.",
      ),
      items: [
        { label: l("18–24 años", "18–24"), value: 35.2 },
        { label: l("25–34 años", "25–34"), value: 44.7 },
        { label: l("35–44 años", "35–44"), value: 11.8 },
      ],
    },
    gender: {
      items: [
        { label: l("Hombres", "Men"), value: 72 },
        { label: l("Mujeres", "Women"), value: 27 },
      ],
    },
    countries: [
      { flag: "🇦🇷", label: l("Argentina", "Argentina"), value: 42.7 },
      { flag: "🇲🇽", label: l("México", "Mexico"), value: 9.9 },
      { flag: "🇨🇱", label: l("Chile", "Chile"), value: 4.2 },
      { flag: "🇵🇪", label: l("Perú", "Peru"), value: 4.2 },
      { flag: "🇨🇴", label: l("Colombia", "Colombia"), value: 4.1 },
    ],
    bio: [
      l(
        "Soy Spiky. Hago videos cortos para TikTok e Instagram combinando humor urbano y tendencias: me encanta tomar lo que está pasando y darle mi propio giro.",
        "I'm Spiky. I make short videos for TikTok and Instagram blending urban humor and trends: I love taking what's happening and giving it my own twist.",
      ),
      l(
        "Además de crear contenido, soy socio y cofundador de Conexa, así que conozco de cerca cómo se arma una buena colaboración entre una marca y un creador.",
        "Besides creating content, I'm a partner and co-founder of Conexa, so I know first-hand what makes a good brand–creator collaboration.",
      ),
      l(
        "Mi comunidad está en Argentina, México, Chile, Perú y Colombia, y me gusta hablarle como si estuviéramos charlando entre amigos.",
        "My community is in Argentina, Mexico, Chile, Peru and Colombia, and I like talking to them as if we were chatting among friends.",
      ),
    ],
    sources: [
      {
        url: "https://www.conexa-agency.com.ar/#spiky",
        label: l("Perfil y equipo de Conexa", "Conexa profile and team"),
      },
    ],
    whyWork: [
      l("26.4M de vistas mensuales en TikTok.", "26.4M monthly views on TikTok."),
      l(
        "Audiencia joven: el 79.9% tiene entre 18 y 34 años.",
        "Young audience: 79.9% is aged 18–34.",
      ),
      l(
        "Experiencia en contenido corto y desarrollo creativo como cofundador de Conexa.",
        "Short-form content and creative development experience as Conexa's co-founder.",
      ),
    ],
    skills: [
      l("Humor", "Humor"),
      l("Lectura de tendencias", "Trend spotting"),
      l("Formato corto", "Short-form"),
      l("Alcance a no seguidores", "Reach beyond followers"),
    ],
    videos: [
      {
        title: l("Video destacado de Spiky", "Spiky's featured video"),
        platform: "TikTok",
        url: "https://www.tiktok.com/@spikiiiii/video/7691810806278753544",
        embedUrl: "https://www.tiktok.com/player/v1/7691810806278753544",
        sourceUrl: "https://www.tiktok.com/@spikiiiii/video/7691810806278753544",
      },
    ],
  },
  {
    slug: "felbuck",
    photo: felbuckImg,
    cutout: felbuckCut,
    name: "FelBuck_",
    handle: "@felbuck_",
    categories: [
      l("Entretenimiento", "Entertainment"),
      l("Experimentos sociales", "Social experiments"),
      l("Formato corto", "Short-form"),
    ],
    intro: l(
      "Hago entretenimiento y experimentos sociales en la calle, con situaciones que nadie espera.",
      "I make entertainment and street social experiments built on situations nobody expects.",
    ),
    socials: [
      { platform: "TikTok", url: "https://www.tiktok.com/@felbuck" },
      { platform: "Instagram", url: "https://www.instagram.com/felbuck_/" },
    ],
    headline: {
      value: "+205K",
      label: l("audiencia acumulada TikTok + Instagram", "combined TikTok + Instagram audience"),
    },
    // Monthly views = TikTok 9.6M + Instagram 11.7M.
    keyStats: { followers: 205000, followersPrefix: "+", monthlyViews: 21300000 },
    highlights: [
      { value: "+205K", label: l("audiencia TikTok + Instagram", "TikTok + Instagram audience") },
      { value: "9.6M", label: l("vistas mensuales en TikTok", "monthly TikTok views") },
      { value: "11.7M", label: l("vistas mensuales en Instagram", "monthly Instagram views") },
      {
        value: 80.1,
        format: "percent",
        label: l("audiencia TikTok de 18 a 34 años", "TikTok audience aged 18–34"),
      },
    ],
    geo: {
      title: l("Una comunidad con base en Argentina.", "A community rooted in Argentina."),
      text: l(
        "El 55.3% de su audiencia está en Argentina; también lo siguen desde España, México, Perú y Chile.",
        "55.3% of his audience is in Argentina; he's also followed from Spain, Mexico, Peru and Chile.",
      ),
    },
    pitch: {
      title: l("Experimentos sociales que nadie espera.", "Social experiments nobody sees coming."),
      text: l(
        "FelBuck_ hace entretenimiento y experimentos sociales en la calle. Suma 21.3M de vistas mensuales entre TikTok e Instagram, con una audiencia equilibrada entre mujeres y hombres, y formatos donde la marca forma parte de la dinámica.",
        "FelBuck_ makes entertainment and street social experiments. He reaches 21.3M monthly views across TikTok and Instagram, with an audience balanced between women and men, and formats where the brand is part of the game.",
      ),
      strengths: [
        {
          k: l("Escala", "Scale"),
          v: "+205K",
          d: l("audiencia acumulada TikTok + Instagram", "combined TikTok + Instagram audience"),
        },
        {
          k: l("Atención", "Attention"),
          v: "11.7M",
          d: l(
            "vistas mensuales en Instagram, sobre todo Reels",
            "monthly Instagram views, mostly Reels",
          ),
        },
        {
          k: l("Equilibrio", "Balance"),
          v: "49% / 48%",
          d: l("audiencia de mujeres y hombres", "women and men in the audience"),
        },
      ],
    },
    groups: [
      {
        title: l("Métricas mensuales", "Monthly metrics"),
        metrics: [
          {
            value: "+205K",
            label: l(
              "Audiencia acumulada (TikTok + Instagram)",
              "Combined audience (TikTok + Instagram)",
            ),
          },
          { value: "9.6M", label: l("Vistas mensuales en TikTok", "Monthly TikTok views") },
          {
            value: "11.7M",
            label: l("Vistas mensuales en Instagram", "Monthly Instagram views"),
            note: l("Principalmente en Reels", "Mostly on Reels"),
          },
          { value: "692K+", label: l("Me gusta en TikTok (mensual)", "Monthly TikTok likes") },
        ],
      },
    ],
    age: {
      title: l("Rango etario (TikTok)", "Age range (TikTok)"),
      highlight: l(
        "El 80.1% de su audiencia en TikTok tiene entre 18 y 34 años.",
        "80.1% of his TikTok audience is between 18 and 34.",
      ),
      items: [
        { label: l("18–24 años", "18–24"), value: 41.7 },
        { label: l("25–34 años", "25–34"), value: 38.4 },
        { label: l("35–44 años", "35–44"), value: 10.4 },
      ],
    },
    gender: {
      items: [
        { label: l("Mujeres", "Women"), value: 49 },
        { label: l("Hombres", "Men"), value: 48 },
      ],
    },
    countries: [
      { flag: "🇦🇷", label: l("Argentina", "Argentina"), value: 55.3 },
      { flag: "🇪🇸", label: l("España", "Spain"), value: 7.2 },
      { flag: "🇲🇽", label: l("México", "Mexico"), value: 6.8 },
      { flag: "🇵🇪", label: l("Perú", "Peru"), value: 4.2 },
      { flag: "🇨🇱", label: l("Chile", "Chile"), value: 3.4 },
    ],
    bio: [
      l(
        "Soy FelBuck_. Hago videos cortos de humor situacional: interacciones cotidianas, propuestas inesperadas y reacciones espontáneas. Me encontrás como @felbuck en TikTok y @felbuck_ en Instagram.",
        "I'm FelBuck_. I make short situational-humor videos: everyday interactions, unexpected requests and spontaneous reactions. You'll find me as @felbuck on TikTok and @felbuck_ on Instagram.",
      ),
      l(
        "Un ejemplo de mi estilo es el video en el que pido cargar diez pesos de nafta y juego con la confusión de los playeros; La Plata 1 lo publicó en octubre de 2025. El humor nace del intercambio y de lo absurdo de la situación.",
        "One example of my style is the video where I ask to buy ten pesos of fuel and play on the attendants' confusion; La Plata 1 covered it in October 2025. The humor comes from the exchange and the absurdity of the situation.",
      ),
      l(
        "Me gusta llevar las ideas de marca a escenas cotidianas, para que formen parte de la dinámica sin perder naturalidad.",
        "I like bringing brand ideas into everyday scenes, so they become part of the game without losing authenticity.",
      ),
    ],
    videos: [
      {
        title: l("¿Diez mil? No, diez", "Ten thousand? No, ten"),
        platform: "TikTok",
        url: "https://www.tiktok.com/@felbuck/video/7539353314798914872",
        embedUrl: "https://www.tiktok.com/player/v1/7539353314798914872",
        sourceUrl:
          "https://www.laplata1.com/2025-10-11/diez-mil-no-diez-un-joven-fue-a-cargar-10-pesos-de-nafta-los-playeros-no-lo-podian-creer-y-se-volvio-viral-120137/",
      },
    ],
    sources: [
      { url: "https://www.conexa-agency.com.ar/", label: l("Perfil de Conexa", "Conexa profile") },
      {
        url: "https://www.laplata1.com/2025-10-11/diez-mil-no-diez-un-joven-fue-a-cargar-10-pesos-de-nafta-los-playeros-no-lo-podian-creer-y-se-volvio-viral-120137/",
        label: l("La Plata 1 · video destacado", "La Plata 1 · featured video"),
      },
    ],
    whyWork: [
      l(
        "11.7M de vistas mensuales en Instagram, sobre todo en Reels.",
        "11.7M monthly views on Instagram, mostly on Reels.",
      ),
      l(
        "Audiencia equilibrada: 49% mujeres y 48% hombres.",
        "Balanced audience: 49% women and 48% men.",
      ),
      l(
        "Formatos participativos donde la marca forma parte de la dinámica.",
        "Participatory formats where the brand is part of the game.",
      ),
    ],
    skills: [
      l("Experimentos sociales", "Social experiments"),
      l("Contenido en la calle", "Street content"),
      l("Humor situacional", "Situational humor"),
      l("Formato corto", "Short-form"),
    ],
  },
  {
    slug: "goddermann",
    photo: goddermannImg,
    cutout: goddermannCut,
    name: "Goddermann",
    handle: "@goddermann",
    categories: [
      l("Creador de contenido", "Content creator"),
      l("Audiencia Italia", "Italian audience"),
    ],
    intro: l(
      "Soy creador italiano y le hablo a una comunidad adulta que no para de crecer: +11.6M de visualizaciones en 30 días.",
      "I'm an Italian creator speaking to a fast-growing adult community: 11.6M+ views in 30 days.",
    ),
    location: l("Italia", "Italy"),
    audienceReach: l(
      "93% de su audiencia está en Italia; 94% habla italiano.",
      "93% of his audience is in Italy; 94% speaks Italian.",
    ),
    socials: [{ platform: "Instagram", url: "https://www.instagram.com/goddermann/" }],
    // videos: [
    //   {
    //     title: l("Video destacado de Goddermann", "Goddermann's featured video"),
    //     platform: "Instagram",
    //     url: "https://www.instagram.com/p/DdKA0tfRvY0/",
    //     embedUrl: "https://www.instagram.com/p/DdKA0tfRvY0/embed",
    //     sourceUrl: "https://www.instagram.com/p/DdKA0tfRvY0/",
    //   },
    // ],
    headline: {
      value: "11.6M",
      label: l("visualizaciones en Instagram (30 días)", "Instagram views (30 days)"),
    },
    keyStats: { followers: 48762, monthlyViews: 11658802 },
    highlights: [
      { value: 48762, label: l("seguidores en Instagram", "Instagram followers") },
      { value: "11.6M", label: l("visualizaciones · 30 días", "views · 30 days") },
      {
        value: 18.7,
        format: "percent",
        label: l("crecimiento de seguidores · 30 días", "follower growth · 30 days"),
      },
      { value: 93.3, format: "percent", label: l("audiencia en Italia", "audience in Italy") },
    ],
    geo: {
      title: l("Una puerta directa al mercado italiano.", "A direct door to the Italian market."),
      text: l(
        "El 93.3% de su audiencia está en Italia y el 93.9% habla italiano.",
        "93.3% of his audience is in Italy and 93.9% speaks Italian.",
      ),
    },
    pitch: {
      title: l("Alcance viral en Italia.", "Viral reach in Italy."),
      text: l(
        "Goddermann le habla a una comunidad italiana, masculina y adulta. Con menos de 50K seguidores alcanzó 11.6M de visualizaciones en 30 días, 11M solo en Reels.",
        "Goddermann speaks to an Italian, male, adult community. With under 50K followers he reached 11.6M views in 30 days, 11M from Reels alone.",
      ),
      strengths: [
        {
          k: l("Atención", "Attention"),
          v: "11.6M",
          d: l("visualizaciones en Instagram · 30 días", "Instagram views · 30 days"),
        },
        {
          k: l("Crecimiento", "Growth"),
          v: "+18.7%",
          d: l("seguidores en el último mes", "followers in the last month"),
        },
        {
          k: l("Mercado", "Market"),
          v: "93.3%",
          d: l("de la audiencia en Italia", "of the audience in Italy"),
        },
      ],
    },
    groups: [
      {
        title: l("Instagram — últimos 30 días", "Instagram — last 30 days"),
        period: l("Últimos 30 días", "Last 30 days"),
        metrics: [
          {
            value: "11.658.802",
            label: l("Visualizaciones de contenidos", "Content views"),
            note: l("11M solo en Reels", "11M from Reels alone"),
          },
          {
            value: "48.762",
            label: l("Seguidores totales", "Total followers"),
            note: l("+18.7% en 30 días", "+18.7% in 30 days"),
          },
          { value: "+7.687", label: l("Crecimiento neto de seguidores", "Net follower growth") },
          { value: "93.9%", label: l("Audiencia de habla italiana", "Italian-speaking audience") },
        ],
      },
    ],
    age: {
      title: l("Rango etario (Instagram)", "Age range (Instagram)"),
      highlight: l(
        "Más del 61% de su público tiene entre 25 y 44 años.",
        "Over 61% of his audience is aged 25–44.",
      ),
      items: [
        { label: l("25–34 años", "25–34"), value: 32.3 },
        { label: l("35–44 años", "35–44"), value: 29.2 },
        { label: l("45–54 años", "45–54"), value: 15.7 },
      ],
    },
    gender: {
      items: [
        { label: l("Hombres", "Men"), value: 81.7 },
        { label: l("Mujeres", "Women"), value: 18.3 },
      ],
    },
    countries: [
      { flag: "🇮🇹", label: l("Italia", "Italy"), value: 93.3 },
      { flag: "🇨🇭", label: l("Suiza", "Switzerland"), value: 1.0 },
      { flag: "🇩🇪", label: l("Alemania", "Germany"), value: 0.9 },
      { flag: "🇪🇸", label: l("España", "Spain"), value: 0.5 },
      { flag: "🇬🇧", label: l("Reino Unido", "United Kingdom"), value: 0.4 },
    ],
    bio: [
      l(
        "Soy Goddermann, creador de contenido italiano. Mi comunidad es mayoritariamente italiana, masculina y adulta, y se identifica con lo que cuento.",
        "I'm Goddermann, an Italian content creator. My community is mostly Italian, male and adult, and it relates to what I share.",
      ),
      l(
        "Mi alcance va mucho más allá de mis seguidores: 11.6M de visualizaciones en un mes con menos de 50K seguidores, impulsado por Reels.",
        "My reach goes far beyond my followers: 11.6M views in one month with under 50K followers, driven by Reels.",
      ),
    ],
    whyWork: [
      l(
        "Alcance viral: 11.6M de visualizaciones en 30 días, 11M en Reels.",
        "Viral reach: 11.6M views in 30 days, 11M from Reels.",
      ),
      l(
        "Comunidad en crecimiento: +18.7% de seguidores en el último mes.",
        "Growing community: +18.7% followers in the last month.",
      ),
      l(
        "Acceso directo al mercado italiano: 93% de la audiencia en Italia.",
        "Direct access to the Italian market: 93% of the audience in Italy.",
      ),
      l(
        "Público adulto: más del 61% tiene entre 25 y 44 años.",
        "Adult audience: over 61% is aged 25–44.",
      ),
    ],
    skills: [
      l("Reels de alto alcance", "High-reach Reels"),
      l("Audiencia masculina 25–44", "Male audience 25–44"),
      l("Mercado italiano", "Italian market"),
      l("Crecimiento orgánico", "Organic growth"),
    ],
  },
  {
    slug: "lowkey",
    photo: lowkeyImg,
    cutout: lowkeyCut,
    name: "Lowkey Santo",
    handle: "@lowkeysanto.stz",
    categories: [l("Creador de contenido", "Content creator")],
    intro: l(
      "Creo contenido en Instagram y TikTok para una comunidad de 52.812 seguidores que habla español.",
      "I create content on Instagram and TikTok for a Spanish-speaking community of 52,812 followers.",
    ),
    socials: [
      { platform: "Instagram", url: "https://www.instagram.com/lowkeysanto.stz/" },
      { platform: "TikTok", url: "https://www.tiktok.com/@lowkeysanto.stz" },
    ],
    videos: [
      {
        title: l("Video destacado de Lowkey Santo", "Lowkey Santo's featured video"),
        platform: "TikTok",
        url: "https://www.tiktok.com/@lowkeysanto.stz/video/7602372812128521493",
        embedUrl: "https://www.tiktok.com/player/v1/7602372812128521493",
        sourceUrl: "https://www.tiktok.com/@lowkeysanto.stz/video/7602372812128521493",
      },
    ],
    headline: { value: 52812, label: l("seguidores totales", "total followers") },
    // Monthly views ≈ Instagram 4,452,764 (30 days) + TikTok 3.7M (28 days).
    keyStats: { followers: 52812, monthlyViews: 8152764, viewsApprox: true },
    highlights: [
      { value: 52812, label: l("seguidores totales", "total followers") },
      {
        value: "4.45M",
        label: l("reproducciones Instagram · 30 días", "Instagram plays · 30 days"),
      },
      { value: "3.7M", label: l("visualizaciones TikTok · 28 días", "TikTok views · 28 days") },
      {
        value: 96.6,
        format: "percent",
        label: l("alcance en no seguidores (Instagram)", "reach among non-followers (Instagram)"),
      },
    ],
    geo: {
      title: l("Una comunidad hispanohablante.", "A Spanish-speaking community."),
      text: l(
        "El 98.6% de su audiencia habla español y la mitad está en Argentina; también lo siguen desde México, Chile, España y Colombia.",
        "98.6% of his audience speaks Spanish and half is in Argentina; he's also followed from Mexico, Chile, Spain and Colombia.",
      ),
    },
    pitch: {
      title: l("Alcance más allá de sus seguidores.", "Reach beyond his followers."),
      text: l(
        "Lowkey Santo crea contenido en Instagram y TikTok para una comunidad de 52.812 seguidores. En Instagram, el 96.6% del alcance llega a personas que todavía no lo siguen.",
        "Lowkey Santo creates content on Instagram and TikTok for a community of 52,812 followers. On Instagram, 96.6% of his reach goes to people who don't follow him yet.",
      ),
      strengths: [
        { k: l("Comunidad", "Community"), v: 52812, d: l("seguidores totales", "total followers") },
        {
          k: l("Atención", "Attention"),
          v: "4.45M",
          d: l("reproducciones en Instagram · 30 días", "Instagram plays · 30 days"),
        },
        {
          k: l("Alcance", "Reach"),
          v: "96.6%",
          d: l("en no seguidores (Instagram)", "among non-followers (Instagram)"),
        },
      ],
    },
    groups: [
      {
        title: l("Comunidad", "Community"),
        metrics: [{ value: 52812, label: l("Seguidores totales", "Total followers") }],
      },
      {
        title: l("Instagram", "Instagram"),
        period: l("Últimos 30 días", "Last 30 days"),
        metrics: [
          { value: 4452764, label: l("Reproducciones", "Plays") },
          {
            value: 96.6,
            format: "percent",
            label: l("Alcance en no seguidores", "Reach among non-followers"),
          },
        ],
      },
      {
        title: l("TikTok", "TikTok"),
        period: l("Últimos 28 días", "Last 28 days"),
        metrics: [
          { value: 3700000, label: l("Visualizaciones de publicaciones", "Post views") },
          { value: 444700, label: l("Me gusta", "Likes") },
          { value: 19700, label: l("Compartidos", "Shares") },
          { value: 1900, label: l("Comentarios", "Comments") },
        ],
      },
    ],
    audienceDecimals: 1,
    age: {
      title: l("Distribución por edades", "Age distribution"),
      highlight: l(
        "El 68,8% de la audiencia tiene entre 18 y 34 años.",
        "68.8% of the audience is between 18 and 34.",
      ),
      items: [
        { label: l("13–17 años", "13–17"), value: 14.7 },
        { label: l("18–24 años", "18–24"), value: 30.6 },
        { label: l("25–34 años", "25–34"), value: 38.2 },
        { label: l("35–44 años", "35–44"), value: 11.1 },
      ],
    },
    gender: {
      items: [
        { label: l("Hombres", "Men"), value: 85.8 },
        { label: l("Mujeres", "Women"), value: 14.2 },
      ],
    },
    countries: [
      { flag: "🇦🇷", label: l("Argentina", "Argentina"), value: 50.0 },
      { flag: "🇲🇽", label: l("México", "Mexico"), value: 14.6 },
      { flag: "🇨🇱", label: l("Chile", "Chile"), value: 5.4 },
      { flag: "🇪🇸", label: l("España", "Spain"), value: 4.2 },
      { flag: "🇨🇴", label: l("Colombia", "Colombia"), value: 4.0 },
    ],
    languages: [{ label: l("Español", "Spanish"), value: 98.6 }],
    bio: [
      l(
        "Soy Lowkey Santo y publico contenido en Instagram y TikTok, donde me siguen 52.812 personas.",
        "I'm Lowkey Santo and I post content on Instagram and TikTok, where 52,812 people follow me.",
      ),
      l(
        "Mi comunidad habla español (98,6%) y la mitad está en Argentina; también me siguen desde México, Chile, España y Colombia.",
        "My community speaks Spanish (98.6%) and half of it is in Argentina; people also follow me from Mexico, Chile, Spain and Colombia.",
      ),
    ],
    whyWork: [
      l(
        "Audiencia de habla hispana con presencia en Argentina y otros mercados.",
        "Spanish-speaking audience spanning Argentina and other markets.",
      ),
      l(
        "El 68,8% de la audiencia informada tiene entre 18 y 34 años.",
        "68.8% of the reported audience is aged 18–34.",
      ),
      l(
        "Instagram registra un 96,6% de alcance en no seguidores durante los 30 días informados.",
        "Instagram records 96.6% reach among non-followers during the reported 30 days.",
      ),
    ],
    skills: [
      l("Formato corto", "Short-form"),
      l("Alcance a no seguidores", "Reach beyond followers"),
      l("Audiencia hispanohablante", "Spanish-speaking audience"),
      l("TikTok + Instagram", "TikTok + Instagram"),
    ],
  },
];

export const getTalent = (slug: string) => TALENTS.find((t) => t.slug === slug);
