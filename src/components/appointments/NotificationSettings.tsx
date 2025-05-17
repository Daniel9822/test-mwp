"use client";

import { NotificationPhone } from "@/types/appointments";
import { MOCK_NOTIFICATION_PHONES } from "@/data/mockAppointments";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  PlusCircle,
  Phone,
  Tag
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PhoneFormData {
  phoneNumber: string;
  label: string;
  isActive: boolean;
}

const NotificationSettings = () => {
  const [phones, setPhones] = useState<NotificationPhone[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<NotificationPhone | null>(null);
  const [formData, setFormData] = useState<PhoneFormData>({
    phoneNumber: "",
    label: "",
    isActive: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, this would fetch from an API
    setPhones(MOCK_NOTIFICATION_PHONES);
  }, []);

  const handleAddPhone = () => {
    const newPhone: NotificationPhone = {
      id: phones.length > 0 ? Math.max(...phones.map(p => p.id)) + 1 : 1,
      phoneNumber: formData.phoneNumber,
      label: formData.label,
      isActive: formData.isActive,
    };

    setPhones([...phones, newPhone]);
    setIsAddDialogOpen(false);
    resetForm();

    toast({
      title: "Phone number added",
      description: `The phone number has been added successfully.`,
    });
  };

  const handleEditPhone = () => {
    if (!selectedPhone) return;

    const updatedPhones = phones.map(phone =>
      phone.id === selectedPhone.id
        ? {
            ...phone,
            phoneNumber: formData.phoneNumber,
            label: formData.label,
            isActive: formData.isActive,
          }
        : phone
    );

    setPhones(updatedPhones);
    setIsEditDialogOpen(false);

    toast({
      title: "Phone number updated",
      description: `The phone number has been updated successfully.`,
    });
  };

  const handleDeletePhone = (id: number) => {
    setPhones(phones.filter(phone => phone.id !== id));

    toast({
      title: "Phone number deleted",
      description: "The phone number has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleToggleActive = (id: number) => {
    setPhones(phones.map(phone =>
      phone.id === id
        ? { ...phone, isActive: !phone.isActive }
        : phone
    ));
  };

  const openEditDialog = (phone: NotificationPhone) => {
    setSelectedPhone(phone);
    setFormData({
      phoneNumber: phone.phoneNumber,
      label: phone.label,
      isActive: phone.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      phoneNumber: "",
      label: "",
      isActive: true,
    });
    setSelectedPhone(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <p>Configure phone numbers to receive SMS notifications when appointments are created or updated.</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm">
          Total phone numbers: <strong>{phones.length}</strong>
        </span>
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={() => {
            resetForm();
            setIsAddDialogOpen(true);
          }}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Phone Number</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No phone numbers found
                </TableCell>
              </TableRow>
            ) : (
              phones.map((phone) => (
                <TableRow key={phone.id}>
                  <TableCell>{phone.id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {phone.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      {phone.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={phone.isActive}
                        onCheckedChange={() => handleToggleActive(phone.id)}
                        aria-label="Toggle active status"
                      />
                      <span className={phone.isActive ? "text-primary" : "text-muted-foreground"}>
                        {phone.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(phone)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePhone(phone.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Phone Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Phone Number</DialogTitle>
            <DialogDescription>
              Add a phone number for SMS notifications
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="col-span-3"
                placeholder="+1 (123) 456-7890"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="col-span-3"
                placeholder="Office, Manager, etc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Status
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive" className={formData.isActive ? "text-primary" : "text-muted-foreground"}>
                  {formData.isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPhone}>Add Phone Number</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Phone Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Phone Number</DialogTitle>
            <DialogDescription>
              Update phone number details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="edit-phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-label" className="text-right">
                Label
              </Label>
              <Input
                id="edit-label"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-isActive" className="text-right">
                Status
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="edit-isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="edit-isActive" className={formData.isActive ? "text-primary" : "text-muted-foreground"}>
                  {formData.isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPhone}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationSettings;
