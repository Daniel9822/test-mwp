"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { User, SmsMessage } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Loader2, MessageCircle } from "lucide-react";

interface SmsComposerProps {
  users: User[];
  onSendSms: (sms: Omit<SmsMessage, "id" | "sentAt" | "status">) => Promise<void>;
}

export default function SmsComposer({ users, onSendSms }: SmsComposerProps) {
  const [content, setContent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Record<number, boolean>>({});
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MAX_SMS_LENGTH = 160;

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers({
      ...selectedUsers,
      [userId]: !selectedUsers[userId]
    });
  };

  const handleSelectAll = () => {
    const allSelected = users.every(user => selectedUsers[user.userId]);
    const newSelectedState: Record<number, boolean> = {};

    users.forEach(user => {
      newSelectedState[user.userId] = !allSelected;
    });

    setSelectedUsers(newSelectedState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const recipients = users
      .filter(user => selectedUsers[user.userId])
      .map(user => user.phoneNumber);

    if (recipients.length === 0) {
      alert("Please select at least one recipient");
      return;
    }

    if (!content.trim()) {
      alert("SMS content cannot be empty");
      return;
    }

    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);

    try {
      await onSendSms({
        content,
        recipients
      });

      setContent("");
      setSelectedUsers({});
      setCharCount(0);
      setSendSuccess(true);
    } catch (error) {
      console.error("Failed to send SMS:", error);
      setSendError(true);
    } finally {
      setIsSending(false);

      // Reset success/error message after 5 seconds
      if (setSendSuccess) {
        setTimeout(() => {
          setSendSuccess(false);
        }, 5000);
      }

      if (setSendError) {
        setTimeout(() => {
          setSendError(false);
        }, 5000);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compose SMS</CardTitle>
        <CardDescription>
          Create and send SMS messages to one or more users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Message</Label>
              <span className={`text-xs ${charCount > MAX_SMS_LENGTH ? 'text-destructive' : 'text-muted-foreground'}`}>
                {charCount}/{MAX_SMS_LENGTH} characters
              </span>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your SMS content here..."
              className="min-h-[100px] w-full"
              maxLength={MAX_SMS_LENGTH * 2} // Allow a bit more but show warning
            />
            {charCount > MAX_SMS_LENGTH && (
              <p className="text-xs text-destructive">
                Message exceeds standard SMS length and may be split into multiple messages.
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Recipients</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {users.every(user => selectedUsers[user.userId]) ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
              {users.map(user => (
                <div key={user.userId} className="flex items-center space-x-2 py-2 border-b last:border-0">
                  <Checkbox
                    id={`user-sms-${user.userId}`}
                    checked={!!selectedUsers[user.userId]}
                    onCheckedChange={() => handleCheckboxChange(user.userId)}
                  />
                  <Label
                    htmlFor={`user-sms-${user.userId}`}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                  >
                    <span className="font-semibold">{user.username}</span>
                    <span className="text-muted-foreground">{user.phoneNumber}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => {
              setContent("");
              setSelectedUsers({});
              setCharCount(0);
            }}>
              Clear
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send SMS
                </>
              )}
            </Button>
          </div>

          {sendSuccess && (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center gap-2 mt-4">
              <Check size={16} />
              <span>SMS sent successfully!</span>
            </div>
          )}

          {sendError && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 mt-4">
              <AlertCircle size={16} />
              <span>Failed to send SMS. Please try again.</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
