"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Appointment, AppointmentStatus } from "@/types/appointments";
import { format } from "date-fns";
import { useState } from "react";
import { MOCK_SERVICES } from "@/data/mockAppointments";

interface AppointmentDialogProps {
  appointment: Appointment;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (appointment: Appointment) => void;
}

const AppointmentDialog = ({
  appointment,
  isOpen,
  onClose,
  onUpdate,
}: AppointmentDialogProps) => {
  const [status, setStatus] = useState<AppointmentStatus>(appointment.status);
  const [notes, setNotes] = useState(appointment.notes);

  const handleUpdate = () => {
    onUpdate({
      ...appointment,
      status,
      notes,
    });
  };

  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };

  const getStatusBadgeClass = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Scheduled:
        return "bg-blue-100 text-blue-800";
      case AppointmentStatus.Completed:
        return "bg-green-100 text-green-800";
      case AppointmentStatus.Cancelled:
        return "bg-red-100 text-red-800";
      case AppointmentStatus.NoShow:
        return "bg-yellow-100 text-yellow-800";
      case AppointmentStatus.InProgress:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            View and edit appointment information
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Client:</span>
            <span className="col-span-3 text-sm">
              {appointment["Customer.User.fname"]} {appointment["Customer.User.lname"]}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Email:</span>
            <span className="col-span-3 text-sm">
              {appointment["Customer.User.email"]}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Service:</span>
            <span className="col-span-3 text-sm">
              {appointment["Service.name"]}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Description:</span>
            <span className="col-span-3 text-sm">
              {appointment["Service.description"]}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Date:</span>
            <span className="col-span-3 text-sm">
              {formatDate(appointment.appointmentDate)}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Time:</span>
            <span className="col-span-3 text-sm">
              {appointment.appointmentTime}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Duration:</span>
            <span className="col-span-3 text-sm">
              {appointment["Service.duration"]}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            <div className="col-span-3">
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as AppointmentStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AppointmentStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(status as AppointmentStatus)}`}>
                        {status}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Notes:</span>
            <div className="col-span-3">
              <textarea
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
