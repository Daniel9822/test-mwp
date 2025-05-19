"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_SERVICES, MOCK_CUSTOMERS, MOCK_NOTIFICATION_PHONES } from "@/data/mockAppointments";
import { PlusCircle, Calendar as CalendarIcon, BadgeInfo } from "lucide-react";
import { format } from "date-fns";
import { AppointmentStatus, Service } from "@/types/appointments";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CreateAppointmentDialog() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [service, setService] = useState<Service | null>(null);
  const [notificationStaff, setNotificationStaff] = useState<Array<{id: number, label: string, phone: string}>>([]);

  // Efecto para cargar la información del servicio cuando se selecciona
  useEffect(() => {
    if (selectedService) {
      const serviceId = parseInt(selectedService);
      const foundService = MOCK_SERVICES.find(s => s.idServices === serviceId);

      if (foundService) {
        setService(foundService);

        // Actualiza la lista de personal que será notificado
        if (foundService.notificationPhones && foundService.notificationPhones.length > 0) {
          const staff = foundService.notificationPhones
            .map(phoneId => {
              const phone = MOCK_NOTIFICATION_PHONES.find(p => p.id === phoneId && p.isActive);
              return phone ? { id: phone.id, label: phone.label, phone: phone.phoneNumber } : null;
            })
            .filter(Boolean) as Array<{id: number, label: string, phone: string}>;

          setNotificationStaff(staff);
        } else {
          setNotificationStaff([]);
        }
      }
    } else {
      setService(null);
      setNotificationStaff([]);
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario, ej. llamada a API
    // Por ahora, solo cerramos el diálogo
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add Appointment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Appointment</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Select required>
                <SelectTrigger id="customer" className="col-span-3">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CUSTOMERS.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name} ({customer.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service" className="text-right">
                Service
              </Label>
              <Select required onValueChange={(value) => setSelectedService(value)}>
                <SelectTrigger id="service" className="col-span-3">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_SERVICES.map((service) => (
                    <SelectItem key={service.idServices} value={service.idServices.toString()}>
                      {service.name} ({service.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {service && (
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="text-right text-sm text-muted-foreground">
                  Service Info
                </div>
                <div className="col-span-3 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Price:</span> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(service.price)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span> {service.duration}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Staff Notification:</span> {" "}
                    {notificationStaff.length === 0 ? (
                      <span className="text-muted-foreground text-sm">No staff will be notified</span>
                    ) : (
                      <div className="inline-flex items-center">
                        <span>{notificationStaff.length} staff member{notificationStaff.length > 1 ? 's' : ''}</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <BadgeInfo className="h-3.5 w-3.5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">Staff to be notified</h4>
                              <ul className="text-sm space-y-1">
                                {notificationStaff.map(staff => (
                                  <li key={staff.id} className="flex flex-col">
                                    <span className="font-medium">{staff.label}</span>
                                    <span className="text-muted-foreground">{staff.phone}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Select required>
                <SelectTrigger id="time" className="col-span-3">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 9 }).map((_, i) => {
                    const hour = i + 9; // 9 AM to 5 PM
                    return (
                      <>
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                        </SelectItem>
                        <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                          {`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`}
                        </SelectItem>
                      </>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue={AppointmentStatus.Scheduled}>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AppointmentStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
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
                placeholder="Enter appointment notes..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
