"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Appointment, AppointmentStatus } from "@/types/appointments";
import { MOCK_APPOINTMENTS } from "@/data/mockAppointments";

interface AppointmentDialogProps {
  appointmentId: number;
  onClose: () => void;
}

export default function AppointmentDialog({
  appointmentId,
  onClose,
}: AppointmentDialogProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [status, setStatus] = useState<AppointmentStatus>(
    AppointmentStatus.Scheduled
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const found = MOCK_APPOINTMENTS.find(
      (a) => a.idAppointment === appointmentId
    );
    if (found) {
      setAppointment(found);
      setStatus(found.status);
      setNotes(found.notes);
    }
  }, [appointmentId]);

  const handleSave = () => {
    // In a real app, this would be an API call to update the appointment
    console.log("Saving changes:", { status, notes });
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!appointment) return null;

  const formatStatus = (status: AppointmentStatus) => {
    return (
      status.charAt(0) +
      status.slice(1).toLowerCase().replace("_", " ")
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>View and manage appointment information</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <div className="font-medium">Customer</div>
            <div>
              {appointment["Customer.User.fname"]} {appointment["Customer.User.lname"]}
            </div>
            <div className="text-sm text-muted-foreground">
              {appointment["Customer.User.email"]}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium">Date</div>
              <div>{format(new Date(appointment.appointmentDate), "MMMM d, yyyy")}</div>
            </div>
            <div>
              <div className="font-medium">Time</div>
              <div>{appointment.appointmentTime}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="font-medium">Service</div>
            <div>{appointment["Service.name"]}</div>
            <div className="text-sm text-muted-foreground">
              Duration: {appointment["Service.duration"]}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as AppointmentStatus)}
            >
              <SelectTrigger id="status" className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AppointmentStatus).map((statusValue) => (
                  <SelectItem key={statusValue} value={statusValue}>
                    {formatStatus(statusValue)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
