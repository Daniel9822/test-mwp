"use client";

import { useState } from "react";
import { MOCK_SERVICES, MOCK_NOTIFICATION_PHONES } from "@/data/mockAppointments";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Info, Phone, Trash2 } from "lucide-react";
import { Service, NotificationPhone } from "@/types/appointments";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export default function ServicesManager() {
  const [services, setServices] = useState(MOCK_SERVICES.map(service => ({
    ...service,
    notificationPhones: service.notificationPhones || []
  })));
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: 0,
    notificationPhones: [] as number[]
  });
  const [availablePhones] = useState(MOCK_NOTIFICATION_PHONES);

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      notificationPhones: service.notificationPhones || []
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setServices(services.filter(service => service.idServices !== id));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }));
  };

  const togglePhone = (phoneId: number) => {
    setFormData(prev => {
      const currentPhones = [...prev.notificationPhones];
      if (currentPhones.includes(phoneId)) {
        return {
          ...prev,
          notificationPhones: currentPhones.filter(id => id !== phoneId)
        };
      } else {
        return {
          ...prev,
          notificationPhones: [...currentPhones, phoneId]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingService) {
      // Update existing service
      setServices(services.map(service =>
        service.idServices === editingService.idServices
          ? { ...service, ...formData }
          : service
      ));
    } else {
      // Add new service
      const newId = Math.max(...services.map(s => s.idServices)) + 1;
      setServices([
        ...services,
        {
          idServices: newId,
          uuidServices: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
          ...formData
        }
      ]);
    }

    setIsDialogOpen(false);
    setEditingService(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      duration: "",
      price: 0,
      notificationPhones: []
    });
  };

  const handleAddNewClick = () => {
    setEditingService(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getPhonesByService = (serviceId: number) => {
    const service = services.find(s => s.idServices === serviceId);
    if (!service || !service.notificationPhones || service.notificationPhones.length === 0) {
      return "No notifications configured";
    }

    return service.notificationPhones.map(phoneId => {
      const phone = availablePhones.find(p => p.id === phoneId);
      return phone ? phone.label : "";
    }).join(", ");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleAddNewClick}
          className="hidden sm:flex" // Hide this button on mobile as it's duplicated in the main page
        >
          Add New Service
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Notifications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service.idServices}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{formatPrice(service.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2">{service.notificationPhones?.length || 0} contacts</span>
                      {service.notificationPhones && service.notificationPhones.length > 0 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">Notification Contacts</h4>
                              <ul className="text-sm">
                                {service.notificationPhones.map(phoneId => {
                                  const phone = availablePhones.find(p => p.id === phoneId);
                                  return phone ? (
                                    <li key={phone.id} className="flex items-center py-1">
                                      <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                      <span className="font-medium">{phone.label}:</span>
                                      <span className="ml-1">{phone.phoneNumber}</span>
                                    </li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(service)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(service.idServices)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the service details below."
                : "Fill out the form below to add a new service."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (HH:MM)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  placeholder="01:30"
                  className="col-span-3"
                  required
                  pattern="[0-9]{2}:[0-9]{2}"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Notification Contacts
                </Label>
                <div className="col-span-3">
                  <p className="text-sm text-muted-foreground mb-2">
                    Select who should be notified when this service is booked
                  </p>
                  {availablePhones.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No phone numbers configured. Add some in the Notifications tab.
                    </div>
                  ) : (
                    <ScrollArea className="h-[150px] rounded-md border p-2">
                      <div className="space-y-2">
                        {availablePhones.map(phone => (
                          <div key={phone.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={`phone-${phone.id}`}
                              checked={formData.notificationPhones.includes(phone.id)}
                              onCheckedChange={() => togglePhone(phone.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor={`phone-${phone.id}`} className="text-base">
                                {phone.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {phone.phoneNumber}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingService ? "Save Changes" : "Add Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
