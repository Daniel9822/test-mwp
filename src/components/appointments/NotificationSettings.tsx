"use client";

import { useState } from "react";
import { MOCK_NOTIFICATION_PHONES, MOCK_SERVICES } from "@/data/mockAppointments";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NotificationPhone } from "@/types/appointments";
import { BadgeInfo, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function NotificationSettings() {
  const [phones, setPhones] = useState<NotificationPhone[]>(MOCK_NOTIFICATION_PHONES);
  const [services] = useState(MOCK_SERVICES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPhone, setNewPhone] = useState({
    phoneNumber: "",
    label: "",
  });

  // Función para obtener los servicios asociados a un número de teléfono
  const getServicesForPhone = (phoneId: number) => {
    return services.filter(service =>
      service.notificationPhones && service.notificationPhones.includes(phoneId)
    );
  };

  const handleAddPhone = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = phones.length ? Math.max(...phones.map(p => p.id)) + 1 : 1;

    setPhones([
      ...phones,
      {
        id: newId,
        phoneNumber: newPhone.phoneNumber,
        label: newPhone.label,
        isActive: true
      }
    ]);

    setNewPhone({ phoneNumber: "", label: "" });
    setIsDialogOpen(false);
  };

  const handleDeletePhone = (id: number) => {
    // Al eliminar un teléfono, verificamos si está asociado a algún servicio
    const associatedServices = getServicesForPhone(id);
    if (associatedServices.length > 0) {
      // Mostrar alerta si quieres implementar
      alert(`Este número está asociado a ${associatedServices.length} servicios. Al eliminar este número se quitará de estos servicios.`);
      // En una aplicación real aquí se actualizarían los servicios en la base de datos
    }

    setPhones(phones.filter(phone => phone.id !== id));
  };

  const togglePhoneStatus = (id: number) => {
    setPhones(phones.map(phone =>
      phone.id === id ? { ...phone, isActive: !phone.isActive } : phone
    ));
  };

  const [notificationSettings, setNotificationSettings] = useState({
    confirmationEnabled: true,
    reminderEnabled: true,
    reminderTimeHours: 24,
    followUpEnabled: true,
  });

  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    if (typeof notificationSettings[setting] === "boolean") {
      setNotificationSettings({
        ...notificationSettings,
        [setting]: !notificationSettings[setting]
      });
    }
  };

  const handleReminderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      reminderTimeHours: parseInt(e.target.value) || 24
    });
  };

  return (
    <div className="space-y-8">
      {/* Phone Numbers Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Staff Contact Numbers</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage phone numbers for staff members who receive service notifications. Assign these contacts to specific services in the Services tab.
            </p>
          </div>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Services</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phones.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No phone numbers configured
                  </TableCell>
                </TableRow>
              ) : (
                phones.map((phone) => {
                  const associatedServices = getServicesForPhone(phone.id);
                  return (
                    <TableRow key={phone.id}>
                      <TableCell className="font-medium">{phone.label}</TableCell>
                      <TableCell>{phone.phoneNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={phone.isActive}
                            onCheckedChange={() => togglePhoneStatus(phone.id)}
                          />
                          <span className={phone.isActive ? "text-green-500" : "text-muted-foreground"}>
                            {phone.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {associatedServices.length === 0 ? (
                          <span className="text-sm text-muted-foreground">Not assigned</span>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm">{associatedServices.length} services</span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-1">
                                  <BadgeInfo className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-medium">Services Assigned</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {associatedServices.map(service => (
                                      <Badge key={service.idServices} variant="secondary">
                                        {service.name}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeletePhone(phone.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmation"
              checked={notificationSettings.confirmationEnabled}
              onCheckedChange={() => toggleSetting('confirmationEnabled')}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="confirmation" className="text-base">
                Appointment Confirmation
              </Label>
              <p className="text-sm text-muted-foreground">
                Send SMS confirmation to the client when appointment is booked
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="reminder"
              checked={notificationSettings.reminderEnabled}
              onCheckedChange={() => toggleSetting('reminderEnabled')}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="reminder" className="text-base">
                Appointment Reminder
              </Label>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Send reminders to both client and staff</span>
                  <Input
                    type="number"
                    min="1"
                    max="72"
                    className="w-16 h-8"
                    value={notificationSettings.reminderTimeHours}
                    onChange={handleReminderTimeChange}
                    disabled={!notificationSettings.reminderEnabled}
                  />
                  <span>hours before appointment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="followup"
              checked={notificationSettings.followUpEnabled}
              onCheckedChange={() => toggleSetting('followUpEnabled')}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="followup" className="text-base">
                Follow-up Message
              </Label>
              <p className="text-sm text-muted-foreground">
                Send follow-up SMS to the client after appointment is completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Phone Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Contact Number</DialogTitle>
            <DialogDescription>
              Add a new staff contact for service notifications.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPhone}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="label" className="text-right">
                  Staff Name
                </Label>
                <Input
                  id="label"
                  value={newPhone.label}
                  onChange={(e) => setNewPhone({...newPhone, label: e.target.value})}
                  placeholder="e.g., John (Window Tinting)"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newPhone.phoneNumber}
                  onChange={(e) => setNewPhone({...newPhone, phoneNumber: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Contact</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
