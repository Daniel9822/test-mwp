"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const TaxCard = () => {
  return (
    <Card className="bg-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Estimated tax for this year</h3>
          <p className="text-sm text-blue-100 mb-4">
            We kindly encourage you to review your recent transactions
          </p>
          <Button className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700">
            Activate Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxCard;
