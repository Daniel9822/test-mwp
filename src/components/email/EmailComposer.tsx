"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { User, EmailMessage } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";

interface EmailComposerProps {
  users: User[];
  onSendEmail: (email: Omit<EmailMessage, "id" | "sentAt" | "status">) => Promise<void>;
}

export default function EmailComposer({ users, onSendEmail }: EmailComposerProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Record<number, boolean>>({});
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

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
      .map(user => user.email);

    if (recipients.length === 0) {
      alert("Please select at least one recipient");
      return;
    }

    if (!subject.trim()) {
      alert("Subject cannot be empty");
      return;
    }

    if (!content.trim()) {
      alert("Email content cannot be empty");
      return;
    }

    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);

    try {
      await onSendEmail({
        subject,
        content,
        recipients,
        attachments
      });

      setSubject("");
      setContent("");
      setSelectedUsers({});
      setAttachments([]);
      setSendSuccess(true);
    } catch (error) {
      console.error("Failed to send email:", error);
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
        <CardTitle>Compose Email</CardTitle>
        <CardDescription>
          Create and send emails to one or more users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              placeholder="Write your email content here..."
              className="min-h-[200px] w-full"
            />
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
                    id={`user-${user.userId}`}
                    checked={!!selectedUsers[user.userId]}
                    onCheckedChange={() => handleCheckboxChange(user.userId)}
                  />
                  <Label
                    htmlFor={`user-${user.userId}`}
                    className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                  >
                    <span className="font-semibold">{user.username}</span>
                    <span className="text-muted-foreground">{user.email}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => {
              setSubject("");
              setContent("");
              setSelectedUsers({});
              setAttachments([]);
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
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </>
              )}
            </Button>
          </div>

          {sendSuccess && (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center gap-2 mt-4">
              <Check size={16} />
              <span>Email sent successfully!</span>
            </div>
          )}

          {sendError && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 mt-4">
              <AlertCircle size={16} />
              <span>Failed to send email. Please try again.</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
