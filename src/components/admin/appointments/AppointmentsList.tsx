"use client";

import { useState } from "react";
import { MOCK_APPOINTMENTS } from "@/data/mockAppointments";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppointmentStatus } from "@/types/appointments";
import { Edit, Search, Trash2 } from "lucide-react";
import AppointmentDialog from "./AppointmentDialog";

export default function AppointmentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  // Filter appointments
  const filteredAppointments = MOCK_APPOINTMENTS.filter(appointment => {
    const matchesSearch = searchTerm === "" ||
      `${appointment['Customer.User.fname']} ${appointment['Customer.User.lname']}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment['Service.name'].toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

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

  const formatStatus = (status: AppointmentStatus) => {
    return status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ');
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.values(AppointmentStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {formatStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.idAppointment}>
                  <TableCell>
                    <div className="font-medium">
                      {format(new Date(appointment.appointmentDate), "MMM d, yyyy")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.appointmentTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {appointment['Customer.User.fname']} {appointment['Customer.User.lname']}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment['Customer.User.email']}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{appointment['Service.name']}</div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {appointment['Service.duration']}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(appointment.status)}>
                      {formatStatus(appointment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedAppointment(appointment.idAppointment)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => console.log("Delete appointment", appointment.idAppointment)}
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

      {selectedAppointment && (
        <AppointmentDialog
          appointmentId={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}
