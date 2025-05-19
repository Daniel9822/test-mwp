"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wifi } from "lucide-react";

const CreditCard = () => {
  return (
    <Card className="bg-blue-600 text-white overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="flex flex-col h-48">
          {/* Card Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Mr. Dhanoo K</h3>
            <Wifi className="h-5 w-5" />
          </div>

          {/* Card Middle */}
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="flex flex-col items-center">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-xs">
              <div className="text-blue-200">Expiry Date</div>
              <div>10/32</div>
            </div>
            <div className="text-xs">
              <div className="text-blue-200">CVV</div>
              <div>XXX</div>
            </div>
            <div className="flex items-end justify-end">
              <div className="text-2xl font-bold text-white">VISA</div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 mt-4 mr-4 flex items-center gap-1">
            <div className="text-sm font-bold">100</div>
            <div className="text-xs text-blue-200">1</div>
          </div>

          {/* Card shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400/10 to-blue-600/0 pointer-events-none"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
