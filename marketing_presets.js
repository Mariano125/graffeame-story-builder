const MARKETING_PRESETS = {
  categories: [
    {
      id: "mates",
      name: "🧉 Mates Personalizados",
      icon: "🧉",
      copys: [
        {
          title: "Tradición y Estilo",
          headline: "TU MATE, TU HISTORIA 🧉✨",
          sub: "Grabado láser 100% personalizado con tu nombre, escudo o frase preferida.",
          cta: "Escribinos por MP y diseñamos el tuyo 📩",
          badge: "GRABADO LÁSER ⚡"
        },
        {
          title: "El Compañero Ideal",
          headline: "UN MATE ÚNICO COMO VOS ⚡",
          sub: "Grabados de alta precisión sobre calabaza, madera o acero.",
          cta: "Toca acá para encargar el tuyo 👉",
          badge: "100% PERSONALIZADO 🎨"
        },
        {
          title: "Regalo Especial",
          headline: "EL REGALO PERFECTO 🎁",
          sub: "Sorprendé a esa persona especial con un mate grabado a medida.",
          cta: "Pedí la plantilla de diseño ahora 📲",
          badge: "REGALO IDEAL 🎁"
        }
      ]
    },
    {
      id: "asador",
      name: "🔪🥩 Cuchillos & Tablas de Asado",
      icon: "🔪",
      copys: [
        {
          title: "Ritual del Asado",
          headline: "PARA EL REY DEL ASADO 🥩🔥",
          sub: "Tablas de algarrobo y cuchillos de disco de arado grabados a fuego y láser.",
          cta: "Consultá por combos para regalar 📩",
          badge: "EDICIÓN ASADOR 🔥"
        },
        {
          title: "Durabilidad & Elegancia",
          headline: "PIEZAS QUE DURAN PARA SIEMPRE 🗡️",
          sub: "Grabados imborrables en hojas de acero y maderas seleccionadas.",
          cta: "Envíos a todo el país 🚚",
          badge: "ACERO DE CALIDAD 💎"
        },
        {
          title: "Set Completo",
          headline: "EQUIPATE PARA EL DOMINGO 🔥",
          sub: "Tablas personalizadas con tu apellido, marca o escudo del club.",
          cta: "Pedí tu presupuesto por privado 💬",
          badge: "PREMIUM QUALITY ⭐"
        }
      ]
    },
    {
      id: "branding",
      name: "✒️🏷️ Bolígrafos & Ecocuero",
      icon: "🏷️",
      copys: [
        {
          title: "Branding Emprendedores",
          headline: "LLEVÁ TU MARCA AL SIGUIENTE NIVEL 💼✨",
          sub: "Etiquetas en ecocuero y bolígrafos personalizados para potenciar tus productos.",
          cta: "Presupuestos corporativos por MP 📩",
          badge: "BRANDING CORP 🏢"
        },
        {
          title: "Detalles en Ecocuero",
          headline: "ETIQUETAS QUE MARCAN LA DIFERENCIA 🏷️",
          sub: "Corte y grabado láser de alta definición para indumentaria y accesorios.",
          cta: "Venta por mayor y menor 📦",
          badge: "ALTA DEFINICIÓN ⚡"
        },
        {
          title: "Merchandising Exclusivo",
          headline: "BOLÍGRAFOS PERSONALIZADOS ✍️",
          sub: "El detalle ideal para eventos, regalos empresariales y promociones.",
          cta: "Consultá precios por cantidad 📲",
          badge: "VENTA X MAYOR 📦"
        }
      ]
    },
    {
      id: "llaveros",
      name: "🔑 Llaveros & Souvenirs",
      icon: "🔑",
      copys: [
        {
          title: "Detalle Diario",
          headline: "LLEVÁ TU RECUERDO A TODOS LADOS 🔑✨",
          sub: "Llaveros grabados en madera, ecocuero y acrílico. Diseños sin límite.",
          cta: "Mandanos tu idea por WhatsApp o MP 📩",
          badge: "HECHO A MEDIDA 🎨"
        },
        {
          title: "Souvenirs de Eventos",
          headline: "SOUVENIRS QUE TODOS CONSERVAN 🎁",
          sub: "Llaveros personalizados para casamientos, cumpleaños y eventos de marca.",
          cta: "Hacé tu pedido con anticipación 📲",
          badge: "EVENTOS & SOUVENIRS 🎉"
        }
      ]
    },
    {
      id: "interactivo",
      name: "🔥 Promos & Encuestas",
      icon: "🔥",
      copys: [
        {
          title: "Encuesta Interactiva",
          headline: "¿CUÁL ES TU FAVORITO? 🤔",
          sub: "Dejame en comentarios o respondé la encuesta cuál te gustaría personalizar.",
          cta: "Votá acá abajo 👇",
          badge: "ENCUESTA INSTAGRAM 📊"
        },
        {
          title: "Stock Limitado",
          headline: "¡ÚLTIMAS UNIDADES EN STOCK! ⏰",
          sub: "Encargá tu grabado hoy y retiralo esta semana.",
          cta: "Hacé clic en el enlace del perfil 🔗",
          badge: "STOCK LIMITADO ⚠️"
        },
        {
          title: "Envío Gratis / Promoción",
          headline: "SEMANA DE PROMOS EN @GRAFFEAME 🚀",
          sub: "Aprovechá tu grabado personalizado con descuento especial.",
          cta: "Pedí el tuyo antes que se agoten 📩",
          badge: "PROMO EXCLUSIVA ⭐"
        }
      ]
    }
  ],
  themes: [
    {
      id: "graffeame_official",
      name: "🖤 Graffeame Oficial (Negro, Blanco & Grises)",
      bgOverlay: "rgba(10, 10, 12, 0.45)",
      gradientTop: "rgba(0, 0, 0, 0.92)",
      gradientBottom: "rgba(18, 18, 22, 0.95)",
      textColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      badgeBg: "#27272A",
      badgeText: "#FFFFFF",
      cardBg: "rgba(24, 24, 27, 0.88)"
    },
    {
      id: "graffeame_monochrome_dark",
      name: "📓 Negro Monocromático & Plata",
      bgOverlay: "rgba(0, 0, 0, 0.55)",
      gradientTop: "rgba(0, 0, 0, 0.95)",
      gradientBottom: "rgba(12, 12, 14, 0.98)",
      textColor: "#F4F4F5",
      accentColor: "#E4E4E7",
      badgeBg: "#E4E4E7",
      badgeText: "#09090B",
      cardBg: "rgba(18, 18, 20, 0.92)"
    },
    {
      id: "graffeame_metallic_slate",
      name: "⚙️ Gris Grafito & Metal",
      bgOverlay: "rgba(24, 24, 27, 0.4)",
      gradientTop: "rgba(15, 15, 18, 0.9)",
      gradientBottom: "rgba(39, 39, 42, 0.95)",
      textColor: "#FAFAFA",
      accentColor: "#D4D4D8",
      badgeBg: "#3F3F46",
      badgeText: "#FFFFFF",
      cardBg: "rgba(30, 30, 36, 0.88)"
    },
    {
      id: "graffeame_clean_contrast",
      name: "⚪ Blanco Elegante & Bordes Negros",
      bgOverlay: "rgba(0, 0, 0, 0.4)",
      gradientTop: "rgba(0, 0, 0, 0.88)",
      gradientBottom: "rgba(10, 10, 10, 0.95)",
      textColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      badgeBg: "#FFFFFF",
      badgeText: "#000000",
      cardBg: "rgba(20, 20, 22, 0.85)"
    }
  ]
};
