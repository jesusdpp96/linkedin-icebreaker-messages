import type { CardData, FormData, ShowMessages } from "../types";

// Sample data for the carousel cards
export const getSampleCards = (): CardData[] => [
  // Template 1: Pregunta sobre un post
  {
    cardColor: "#4CAF50", // Green
    messageCategory: "Pregunta",
    titleCategory: "Pregunta sobre un post",
    linkedinSimulationMessage: {
      receiverName: "Sofía Olivera",
      receiverProfilePicture:
        "https://randomuser.me/api/portraits/women/65.jpg",
      receiverHeadline: "Mobile App Development Lead | Engineering Manager",
      senderName: "Lisa Gosiker",
      senderProfilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      senderHeadline: "UX Designer",
      message:
        "Hola Sofía, leí tu post sobre UX en apps móviles. Coincido en que el feedback temprano es clave. ¿Cómo logran en tu equipo validar la experiencia del usuario sin frenar el ritmo ágil de desarrollo?",
    },
  },

  // Template 2: Mencionar que comentaste su post
  {
    cardColor: "#E91E63", // Pink
    messageCategory: "Mención",
    titleCategory: "Mencionar que comentaste su post",
    linkedinSimulationMessage: {
      receiverName: "Diego Ramírez",
      receiverProfilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      receiverHeadline: "Data Scientist | AI Researcher",
      senderName: "Martín Gómez",
      senderProfilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
      senderHeadline: "Machine Learning Engineer",
      message:
        "Hola Diego, soy el que te comentó el post sobre redes neuronales aplicadas a análisis de mercado. Me gustaría profundizar en ese tema, ¿tendrías unos minutos para charlar?",
    },
  },

  // Template 3: Mencionar que fuiste el primero en likear su post
  {
    cardColor: "#FFC107", //  Yellow/Amber
    messageCategory: "Mención",
    titleCategory: "Mencionar que fuiste el primero en likear su post",
    linkedinSimulationMessage: {
      receiverName: "Valentina Morales",
      receiverProfilePicture:
        "https://randomuser.me/api/portraits/women/52.jpg",
      receiverHeadline: "Content Strategist | Digital Marketing",
      senderName: "Pablo Herrera",
      senderProfilePicture: "https://randomuser.me/api/portraits/men/18.jpg",
      senderHeadline: "Social Media Manager",
      message:
        "Hola Valentina, soy el que hizo el primer like en el post sobre estrategias de marketing en TikTok :) Me pareció súper interesante tu enfoque, ¿podrías compartir algún recurso más sobre el tema?",
    },
  },

  // Template 4: Preguntar sobre un curso
  {
    cardColor: "#FF9800", // Orange
    messageCategory: "Pregunta",
    titleCategory: "Preguntar sobre un curso",
    linkedinSimulationMessage: {
      receiverName: "Javier Torres",
      receiverProfilePicture: "https://randomuser.me/api/portraits/men/36.jpg",
      receiverHeadline: "Frontend Developer | UI/UX Enthusiast",
      senderName: "Carolina Mendez",
      senderProfilePicture: "https://randomuser.me/api/portraits/women/37.jpg",
      senderHeadline: "Web Developer",
      message:
        "Hola Javier, vi que hiciste el curso de React Avanzado en Platzi, me da curiosidad saber qué te pareció y si lo recomiendas. Estoy buscando algo para mejorar mis skills en frontend y ese curso apareció en mis recomendaciones.",
    },
  },

  // Template 5: Felicitar por nuevo rol
  {
    cardColor: "#5072a1", // dark cyan
    messageCategory: "Felicitación",
    titleCategory: "Felicitar por nuevo rol",
    linkedinSimulationMessage: {
      receiverName: "Lucía Fernández",
      receiverProfilePicture:
        "https://randomuser.me/api/portraits/women/23.jpg",
      receiverHeadline: "Product Manager at TechStartup",
      senderName: "Alejandro Vargas",
      senderProfilePicture: "https://randomuser.me/api/portraits/men/27.jpg",
      senderHeadline: "Business Development Manager",
      message:
        "Hola Lucía, vi que empezaste como Product Manager en TechStartup, ¡felicitaciones! Seguro es un gran paso. Justo estoy trabajando en temas vinculados a desarrollo de producto y metodologías ágiles, y pensé que podríamos conectar para intercambiar experiencias.",
    },
  },

  // Template 6: Comentar sobre una charla o evento
  {
    cardColor: "#FF5722", // Deep Orange
    messageCategory: "Mención",
    titleCategory: "Comentar sobre una charla o evento",
    linkedinSimulationMessage: {
      receiverName: "Eduardo Pérez",
      receiverProfilePicture: "https://randomuser.me/api/portraits/men/55.jpg",
      receiverHeadline: "Cybersecurity Specialist | CISSP",
      senderName: "Marina López",
      senderProfilePicture: "https://randomuser.me/api/portraits/women/12.jpg",
      senderHeadline: "IT Security Analyst",
      message:
        "Hola Eduardo, vi que participaste en el CyberSec Summit 2025. Me interesó mucho lo que comentaste sobre las nuevas amenazas en entornos cloud. Estoy trabajando en implementar mejores prácticas de seguridad en mi empresa y pensé que podríamos intercambiar ideas.",
    },
  },

  // Template 7: Referencia a contacto en común
  {
    cardColor: "#E91E63", // Pink
    messageCategory: "Conexión",
    titleCategory: "Referencia a contacto en común",
    linkedinSimulationMessage: {
      receiverName: "Carlos Mendoza",
      receiverProfilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      receiverHeadline: "CTO at TechSolutions",
      senderName: "Ana Martínez",
      senderProfilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
      senderHeadline: "Software Engineer",
      message:
        "Hola Carlos, veo que ambos conocemos a María García. Justo estábamos hablando de arquitecturas de microservicios y me pareció interesante contactarte, dado tu experiencia en el tema.",
    },
  },

  // Template 8: Compartir artículo o recurso útil
  {
    cardColor: "#3F51B5", // Indigo
    messageCategory: "Aporte de valor",
    titleCategory: "Compartir artículo o recurso útil",
    linkedinSimulationMessage: {
      receiverName: "Gabriela Ruiz",
      receiverProfilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
      receiverHeadline: "Sustainability Manager | ESG Specialist",
      senderName: "Daniel Castro",
      senderProfilePicture: "https://randomuser.me/api/portraits/men/79.jpg",
      senderHeadline: "Environmental Consultant",
      message:
        "Hola Gabriela, vi que te interesa la economía circular. Justo leí este artículo sobre casos de éxito en Latinoamérica y pensé que podría interesarte también 👉 [link]. ¿Qué opinás del enfoque que plantea respecto a la implementación en PyMEs?",
    },
  },

  // Template 9: Felicitar por logro o publicación destacada
  {
    cardColor: "#FFC107", // Yellow/Amber
    messageCategory: "Felicitación",
    titleCategory: "Felicitar por logro o publicación destacada",
    linkedinSimulationMessage: {
      receiverName: "Roberto Sánchez",
      receiverProfilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
      receiverHeadline: "Sales Director | B2B Solutions",
      senderName: "Laura Torres",
      senderProfilePicture: "https://randomuser.me/api/portraits/women/33.jpg",
      senderHeadline: "Marketing Specialist",
      message:
        "¡Felicidades por tu ascenso a Director de Ventas, Roberto! He seguido tu trayectoria y los resultados que has logrado son impresionantes. Me encantaría conocer más sobre tus estrategias de ventas B2B que han sido tan exitosas.",
    },
  },
];

// Get category color based on category name
export const getCategoryColor = (category: string): string => {
  const categories: Record<string, string> = {
    Pregunta: "#4CAF50",
    Mención: "#E91E63",
    Felicitación: "#FFC107",
  };

  return categories[category] || "#E91E63"; // Default blue if category not found
};

export const getCategoryTitle = (category: string): string => {
  const categories: Record<string, string> = {
    Pregunta: "Pregunta sobre un post",
    Mención: "Mención de un contacto mutuo",
    Felicitación: "Felicitación por un logro",
  };
  return categories[category] || "Nueva categoria"; // Default title if category not found
};

// Mock API call to generate messages
export const generateMessages = async (
  formData: FormData
): Promise<ShowMessages> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock response
  return {
    messages: [
      {
        message:
          "Hola Florencia, vi tu post sobre formación de equipos en Kamay Code Córdoba. En MTLempresas trabajamos para potenciar equipos con evaluación de habilidades blandas, que se alinea con tu enfoque human centric. ¿Te interesaría charlar sobre cómo podemos aportar valor a Teamcubation?",
        templateTitle: "Pregunta sobre un post",
        templateCategory: "Pregunta",
        instruction:
          "Comenta el post de Florencia sobre Kamay Code Córdoba para iniciar interacción y luego envíale este mensaje.",
        sourcePosts: [
          "https://www.linkedin.com/feed/update/urn:li:activity:7313873886813544448/",
        ],
        receiverName: "Florencia",
        receiverProfilePicture:
          "https://randomuser.me/api/portraits/women/68.jpg",
        receiverHeadline: "HR Manager",
        senderName: "Pedro Gonzalez",
        senderProfilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
        senderHeadline: "Seller",
      },
      {
        message:
          "Hola Florencia, María López nos presentó en el evento de HR Tech el mes pasado. Estoy desarrollando soluciones de evaluación de habilidades blandas para equipos de trabajo y noté que en Teamcubation están innovando en formación de equipos. ¿Podríamos conversar sobre posibles sinergias?",
        templateTitle: "Mención de contacto mutuo",
        templateCategory: "Mención",
        instruction:
          "Menciona a María López como conexión mutua para establecer credibilidad inicial.",
        sourcePosts: [
          "https://www.linkedin.com/feed/update/urn:li:activity:7313873886813544448/",
          "https://www.linkedin.com/feed/update/urn:li:activity:7310873886813544123/",
        ],
        receiverName: "Florencia",
        receiverProfilePicture:
          "https://randomuser.me/api/portraits/women/68.jpg",
        receiverHeadline: "HR Manager",
        senderName: "Pedro Gonzalez",
        senderProfilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
        senderHeadline: "Seller",
      },
      {
        message:
          "¡Felicidades por el reconocimiento de Teamcubation como empresa innovadora en HR Tech Awards, Florencia! En MTLempresas desarrollamos herramientas de evaluación de habilidades blandas que podrían complementar su enfoque. ¿Te interesaría una demo personalizada?",
        templateTitle: "Felicitación por logro",
        templateCategory: "Felicitación",
        instruction:
          "Felicita a Florencia por el reconocimiento reciente de su empresa antes de ofrecer tu solución.",
        sourcePosts: [
          "https://www.linkedin.com/feed/update/urn:li:activity:7313873886813544448/",
        ],
        receiverName: "Florencia",
        receiverProfilePicture:
          "https://randomuser.me/api/portraits/women/68.jpg",
        receiverHeadline: "HR Manager",
        senderName: "Pedro Gonzalez",
        senderProfilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
        senderHeadline: "Seller",
      },
    ],
  };
};
