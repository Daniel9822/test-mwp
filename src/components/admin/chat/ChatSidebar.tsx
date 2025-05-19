"use client";

import { ChatUser } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ChatSidebarProps {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatSidebar({ users, selectedUser, onSelectUser }: ChatSidebarProps) {
  // Formatear la fecha de último acceso
  const formatLastActive = (date?: Date) => {
    if (!date) return "";
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="flex flex-col">
      {users.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No se encontraron contactos
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-4 hover:bg-muted/50 cursor-pointer ${
                selectedUser?.id === user.id ? "bg-muted" : ""
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {user.status.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-background"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{user.name}</h4>
                    {user.unreadCount > 0 && (
                      <Badge className="ml-2 bg-primary">{user.unreadCount}</Badge>
                    )}
                  </div>

                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground truncate">
                      {user.status.online
                        ? "En línea"
                        : user.status.lastActive
                        ? `Activo ${formatLastActive(user.status.lastActive)}`
                        : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.isCustomer ? "Cliente" : "Admin"}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
