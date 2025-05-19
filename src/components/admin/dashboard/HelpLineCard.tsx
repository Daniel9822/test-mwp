"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

const HelpLineCard = () => {
  return (
    <Card className="bg-blue-900 text-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-blue-100">
          <Phone size={18} />
          <span className="font-medium">Help line:</span>
          <span>+(012) 123 456 78</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpLineCard;
