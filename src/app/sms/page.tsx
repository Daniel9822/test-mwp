"use client";

import { useState } from "react";
import { mockUsers, mockSms } from "@/data/mockUsersData";
import SmsComposer from "@/components/sms/SmsComposer";
import SmsHistory from "@/components/sms/SmsHistory";
import { SmsMessage } from "@/types/users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function SmsPage() {
  const [smsMessages, setSmsMessages] = useState<SmsMessage[]>(mockSms);

  const handleSendSms = async (
    smsData: Omit<SmsMessage, "id" | "sentAt" | "status">
  ): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const newSms: SmsMessage = {
          ...smsData,
          id: `sms-${Date.now()}`,
          sentAt: new Date(),
          status: "sent"
        };

        setSmsMessages((prevMessages) => [newSms, ...prevMessages]);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SMS Management</h1>
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
          <TabsTrigger value="compose">Compose SMS</TabsTrigger>
          <TabsTrigger value="history">
            SMS History
            <Badge variant="secondary" className="ml-2">
              {smsMessages.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="compose" className="mt-4">
          <SmsComposer users={mockUsers} onSendSms={handleSendSms} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <SmsHistory smsMessages={smsMessages} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
