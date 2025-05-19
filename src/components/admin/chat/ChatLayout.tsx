"use client";

import { useState, useEffect } from "react";
import { mockChatUsers, adminUser, mockChatConversations, getConversationMessages } from "@/data/mockChatData";
import { ChatUser, ChatMessage, ChatConversation } from "@/types/chat";
import ChatSidebar from "./ChatSidebar";
import ChatConversationView from "./ChatConversationView";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChatLayout() {
  // Estado para el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtra los usuarios según la búsqueda
  const filteredUsers = mockChatUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cuando se selecciona un usuario, busca o crea su conversación
  useEffect(() => {
    if (selectedUser) {
      const conversation = mockChatConversations.find(
        conv => conv.participants.includes(selectedUser.id)
      );

      if (conversation) {
        setSelectedConversation(conversation);
        // Obtener los mensajes para esta conversación
        const conversationMessages = getConversationMessages(conversation.id);
        setMessages(conversationMessages);
      } else {
        // Si no hay conversación, crear una nueva vacía
        const newConversation: ChatConversation = {
          id: `new-conv-${Date.now()}`,
          participants: [selectedUser.id, adminUser.id],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setSelectedConversation(newConversation);
        setMessages([]);
      }
    } else {
      setSelectedConversation(null);
      setMessages([]);
    }
  }, [selectedUser]);

  // Función para enviar un nuevo mensaje
  const handleSendMessage = (content: string) => {
    if (!selectedUser || !selectedConversation || !content.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: adminUser.id,
      receiverId: selectedUser.id,
      content,
      timestamp: new Date(),
      isRead: false,
    };

    // Actualizar los mensajes localmente
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // En una implementación real, aquí enviarías el mensaje al backend
    console.log("Mensaje enviado:", newMessage);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar de Chat */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar contactos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="online" className="flex-1">En línea</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">No leídos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-auto p-0 mt-0">
              <ChatSidebar
                users={filteredUsers}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
            </TabsContent>

            <TabsContent value="online" className="flex-1 overflow-auto p-0 mt-0">
              <ChatSidebar
                users={filteredUsers.filter(user => user.status.online)}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
            </TabsContent>

            <TabsContent value="unread" className="flex-1 overflow-auto p-0 mt-0">
              <ChatSidebar
                users={filteredUsers.filter(user => user.unreadCount > 0)}
                selectedUser={selectedUser}
                onSelectUser={setSelectedUser}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Vista de la conversación */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <ChatConversationView
              user={selectedUser}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium">Chat de soporte</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Selecciona un usuario de la lista para iniciar una conversación o responder a sus mensajes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Icono de mensaje
function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
