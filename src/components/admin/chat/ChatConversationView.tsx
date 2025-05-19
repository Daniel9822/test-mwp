"use client";

import { useState, useRef, useEffect } from "react";
import { ChatUser, ChatMessage } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, PaperclipIcon, Smile, MoreVertical, Phone, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { adminUser } from "@/data/mockChatData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatConversationViewProps {
  user: ChatUser;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export default function ChatConversationView({
  user,
  messages,
  onSendMessage,
}: ChatConversationViewProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al final de los mensajes cuando lleguen nuevos
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Manejar el envío de mensajes
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Enviar mensaje al presionar Enter (sin shift)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Agrupar mensajes por fecha
  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};

    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateStr = format(date, "yyyy-MM-dd");

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(message);
    });

    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }));
  };

  const messageGroups = groupMessagesByDate(messages);

  // Función para formatear la fecha
  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === format(today, "yyyy-MM-dd")) {
      return "Hoy";
    } else if (dateStr === format(yesterday, "yyyy-MM-dd")) {
      return "Ayer";
    }

    return format(date, "d 'de' MMMM, yyyy");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Encabezado del chat */}
      <div className="border-b border-border p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-xs text-muted-foreground">
              {user.status.online ? (
                <span className="text-success">En línea</span>
              ) : (
                "Desconectado"
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Buscar en el chat</DropdownMenuItem>
              <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
              <DropdownMenuItem>Exportar chat</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Bloquear usuario</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Área de mensajes */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messageGroups.map((group) => (
            <div key={group.date} className="space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <span className="relative px-2 text-xs text-muted-foreground bg-background">
                  {formatMessageDate(group.date)}
                </span>
              </div>

              <div className="space-y-4">
                {group.messages.map((message) => {
                  const isAdmin = message.senderId === adminUser.id;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex gap-3 max-w-[80%]">
                        {!isAdmin && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`space-y-1 ${isAdmin ? "items-end" : "items-start"}`}>
                          <div
                            className={`rounded-lg py-2 px-3 ${
                              isAdmin
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(message.timestamp), "h:mm a")}
                          </p>
                        </div>

                        {isAdmin && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={adminUser.avatar} />
                            <AvatarFallback>{adminUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Área de entrada de mensaje */}
      <div className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
            <Image className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Textarea
              placeholder="Escribe un mensaje..."
              className="min-h-[80px] resize-none pr-12"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2"
            >
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
