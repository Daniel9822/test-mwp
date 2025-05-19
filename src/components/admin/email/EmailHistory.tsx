"use client";

import { EmailMessage } from "@/types/users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Mail, Users } from "lucide-react";

interface EmailHistoryProps {
  emails: EmailMessage[];
  onViewDetails?: (email: EmailMessage) => void;
}

export default function EmailHistory({ emails, onViewDetails }: EmailHistoryProps) {
  // Sort emails by sentAt date, newest first
  const sortedEmails = [...emails].sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email History</CardTitle>
        <CardDescription>
          View previously sent emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedEmails.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No emails have been sent yet
          </div>
        ) : (
          <div className="space-y-4">
            {sortedEmails.map((email) => (
              <div
                key={email.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewDetails && onViewDetails(email)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{email.subject}</h3>
                  <Badge variant={email.status === "sent" ? "success" : email.status === "pending" ? "outline" : "destructive"}>
                    {email.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground mb-2 line-clamp-2">
                  {email.content}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{email.recipients.length} recipients</span>
                  </div>
                  <div>
                    Sent {formatDistanceToNow(new Date(email.sentAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
