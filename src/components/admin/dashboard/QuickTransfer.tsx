"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, MoreVertical } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const recipients = [
  { id: 1, name: "John", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "James", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 4, name: "Sofia", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 5, name: "Mark", avatar: "https://i.pravatar.cc/150?img=12" },
];

const QuickTransfer = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Quick Transfer</h3>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Recipients */}
        <div className="flex justify-between mb-6">
          {recipients.map((recipient) => (
            <div key={recipient.id} className="flex flex-col items-center gap-1">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <img src={recipient.avatar} alt={recipient.name} />
              </Avatar>
            </div>
          ))}
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-sm text-muted-foreground mb-2">
            Card Number
          </label>
          <Input
            className="bg-muted/50"
            value="3658 8857 5820 0039"
            readOnly
          />
        </div>

        {/* Transfer Amount */}
        <div className="mb-6">
          <label className="block text-sm text-muted-foreground mb-2">
            Enter Amount
          </label>
          <Input
            className="bg-muted/50 text-lg font-medium"
            value="$963.25"
          />
        </div>

        {/* Submit Button */}
        <Button className="w-full">
          Transfer Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickTransfer;
