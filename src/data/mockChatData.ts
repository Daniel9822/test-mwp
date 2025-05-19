import { ChatUser, ChatMessage, ChatConversation } from "@/types/chat";
import { mockCustomers } from "./mockEcommerceData";

// Generar avatar URL con las iniciales del nombre del usuario
const generateAvatarUrl = (name: string) => {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
};

// Crear usuarios del chat basados en los clientes existentes
export const mockChatUsers: ChatUser[] = mockCustomers.map(customer => ({
  id: customer.uuid,
  name: customer.username,
  email: customer.email,
  avatar: generateAvatarUrl(customer.username),
  status: {
    online: Math.random() > 0.7, // 30% de probabilidad de estar online
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Último activo entre 0 y 7 días atrás
  },
  unreadCount: Math.floor(Math.random() * 5), // Entre 0 y 4 mensajes no leídos
  isCustomer: true,
}));

// Agregar el usuario admin
export const adminUser: ChatUser = {
  id: "admin-001",
  name: "Admin",
  email: "admin@osen.com",
  avatar: generateAvatarUrl("Admin User"),
  status: {
    online: true,
  },
  unreadCount: 0,
  isCustomer: false,
};

// Función para generar un ID único
const generateId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

// Frases aleatorias para mensajes de clientes
const customerMessages = [
  "Hola, ¿podrías ayudarme con mi pedido?",
  "No recibí mi confirmación de pedido",
  "¿Cuánto tiempo tarda el envío?",
  "¿Tienen este producto en otros colores?",
  "Necesito cambiar mi dirección de envío",
  "¿Puedo pagar con PayPal?",
  "¿Ofrecen envío internacional?",
  "¿Tienen descuentos para compras al por mayor?",
  "¿Cuál es su política de devoluciones?",
  "Mi pedido llegó dañado, ¿qué debo hacer?",
];

// Frases aleatorias para respuestas del administrador
const adminResponses = [
  "Por supuesto, estaré encantado de ayudarte con tu pedido.",
  "Déjame verificar eso por ti, un momento por favor.",
  "El tiempo de envío estándar es de 3-5 días hábiles.",
  "Sí, ese producto está disponible en rojo, azul y negro.",
  "Claro, puedo actualizar tu dirección de envío ahora mismo.",
  "Sí, aceptamos PayPal como método de pago.",
  "Ofrecemos envío internacional a la mayoría de los países.",
  "Tenemos descuentos del 15% para pedidos de más de 10 unidades.",
  "Nuestra política permite devoluciones dentro de los 30 días posteriores a la compra.",
  "Lamento escuchar eso. Por favor, envía fotos del daño y procesaremos un reemplazo.",
];

// Crear conversaciones y mensajes para cada usuario del chat
export const mockChatConversations: ChatConversation[] = mockChatUsers.map(user => {
  // Generar entre 1 y 10 mensajes por conversación
  const messageCount = Math.floor(Math.random() * 10) + 1;
  const messages: ChatMessage[] = [];

  for (let i = 0; i < messageCount; i++) {
    // Alternar entre mensajes del cliente y el administrador
    const isCustomerMessage = i % 2 === 0;
    const timeOffset = (messageCount - i) * (Math.random() * 3600000); // Mensajes más antiguos primero, hasta 1 hora de diferencia

    messages.push({
      id: generateId(),
      senderId: isCustomerMessage ? user.id : adminUser.id,
      receiverId: isCustomerMessage ? adminUser.id : user.id,
      content: isCustomerMessage
        ? customerMessages[Math.floor(Math.random() * customerMessages.length)]
        : adminResponses[Math.floor(Math.random() * adminResponses.length)],
      timestamp: new Date(Date.now() - timeOffset),
      isRead: isCustomerMessage || i < messageCount - 2, // Los últimos mensajes enviados al cliente pueden no estar leídos
    });
  }

  // Ordenar mensajes por timestamp (más antiguos primero)
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return {
    id: generateId(),
    participants: [user.id, adminUser.id],
    lastMessage: messages[messages.length - 1],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Creado entre 0 y 30 días atrás
    updatedAt: messages[messages.length - 1].timestamp,
    messages, // Añadir los mensajes a la conversación
  };
});

// Función para obtener mensajes de una conversación
export const getConversationMessages = (conversationId: string): ChatMessage[] => {
  const conversation = mockChatConversations.find(conv => conv.id === conversationId);
  return conversation ? (conversation as any).messages || [] : [];
};
