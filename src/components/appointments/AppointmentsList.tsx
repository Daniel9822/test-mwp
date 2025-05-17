"use client";

import { Appointment, AppointmentStatus } from "@/types/appointments";
import { MOCK_APPOINTMENTS } from "@/data/mockAppointments";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Edit,
  EyeIcon,
  Trash2
} from "lucide-react";
import AppointmentDialog from "./AppointmentDialog";
import { useToast } from "@/components/ui/use-toast";

type SortField = "date" | "time" | "customer" | "service" | "status";
type SortDirection = "asc" | "desc";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "ALL">("ALL");
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: "date",
    direction: "asc",
  });
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, this would fetch from an API
    setAppointments(MOCK_APPOINTMENTS);
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) => statusFilter === "ALL" || appointment.status === statusFilter
  );

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const { field, direction } = sortConfig;
    const multiplier = direction === "asc" ? 1 : -1;

    switch (field) {
      case "date":
        return (
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
        ) * multiplier;
      case "time":
        return (a.appointmentTime.localeCompare(b.appointmentTime)) * multiplier;
      case "customer":
        return (
          `${a["Customer.User.fname"]} ${a["Customer.User.lname"]}`.localeCompare(
            `${b["Customer.User.fname"]} ${b["Customer.User.lname"]}`
          )
        ) * multiplier;
      case "service":
        return (a["Service.name"].localeCompare(b["Service.name"])) * multiplier;
      case "status":
        return (a.status.localeCompare(b.status)) * multiplier;
      default:
        return 0;
    }
  });

  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleViewAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleUpdateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.idAppointment === updatedAppointment.idAppointment
          ? updatedAppointment
          : appointment
      )
    );
    setIsDialogOpen(false);

    toast({
      title: "Appointment updated",
      description: `The appointment has been updated successfully.`,
    });
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((a) => a.idAppointment !== id));

    toast({
      title: "Appointment deleted",
      description: `The appointment has been deleted successfully.`,
      variant: "destructive",
    });
  };

  const getStatusBadgeClass = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.Scheduled:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case AppointmentStatus.Completed:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case AppointmentStatus.Cancelled:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case AppointmentStatus.NoShow:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case AppointmentStatus.InProgress:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Filter by status:</span>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as AppointmentStatus | "ALL")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              {Object.values(AppointmentStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">
            Showing {sortedAppointments.length} of {appointments.length} appointments
          </span>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("time")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Time
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("customer")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Customer
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("service")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Service
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              sortedAppointments.map((appointment) => (
                <TableRow key={appointment.idAppointment}>
                  <TableCell>
                    {format(new Date(appointment.appointmentDate), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    {`${appointment["Customer.User.fname"]} ${appointment["Customer.User.lname"]}`}
                  </TableCell>
                  <TableCell>{appointment["Service.name"]}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAppointment(appointment.idAppointment)}
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

      {selectedAppointment && (
        <AppointmentDialog
          appointment={selectedAppointment}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdate={handleUpdateAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
