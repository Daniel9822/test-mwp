"use client";

import { SmsMessage } from "@/types/users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";

interface SmsHistoryProps {
  smsMessages: SmsMessage[];
  onViewDetails?: (sms: SmsMessage) => void;
}

export default function SmsHistory({ smsMessages, onViewDetails }: SmsHistoryProps) {
  // Sort SMS by sentAt date, newest first
  const sortedMessages = [...smsMessages].sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SMS History</CardTitle>
        <CardDescription>
          View previously sent SMS messages
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedMessages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No SMS messages have been sent yet
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMessages.map((sms) => (
              <div
                key={sms.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewDetails && onViewDetails(sms)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-primary" />
                    <h3 className="font-medium">SMS Message</h3>
                  </div>
                  <Badge variant={sms.status === "sent" ? "success" : sms.status === "pending" ? "outline" : "destructive"}>
                    {sms.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground mb-2">
                  {sms.content}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{sms.recipients.length} recipients</span>
                  </div>
                  <div>
                    Sent {formatDistanceToNow(new Date(sms.sentAt), { addSuffix: true })}
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
