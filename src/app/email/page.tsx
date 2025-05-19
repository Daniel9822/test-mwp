"use client";

import { useState } from "react";
import { mockUsers, mockEmails } from "@/data/mockUsersData";
import EmailComposer from "@/components/admin/email/EmailComposer";
import EmailHistory from "@/components/admin/email/EmailHistory";
import { EmailMessage } from "@/types/users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function EmailPage() {
  const [emails, setEmails] = useState<EmailMessage[]>(mockEmails);

  const handleSendEmail = async (
    emailData: Omit<EmailMessage, "id" | "sentAt" | "status">
  ): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const newEmail: EmailMessage = {
          ...emailData,
          id: `email-${Date.now()}`,
          sentAt: new Date(),
          status: "sent"
        };

        setEmails((prevEmails) => [newEmail, ...prevEmails]);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Management</h1>
        <Badge variant="outline" className="px-3 py-1">
          <span className="font-semibold text-primary">
            {mockUsers.length}
          </span>
          <span className="ml-1 text-muted-foreground">
            Registered Users
          </span>
        </Badge>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList>
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="history">
            Email History
            <Badge variant="secondary" className="ml-2">
              {emails.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="compose" className="mt-4">
          <EmailComposer users={mockUsers} onSendEmail={handleSendEmail} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <EmailHistory emails={emails} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
