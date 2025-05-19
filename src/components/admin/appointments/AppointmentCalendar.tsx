"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { MOCK_APPOINTMENTS } from "@/data/mockAppointments";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/types/appointments";
import AppointmentDialog from "./AppointmentDialog";

export default function AppointmentCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [appointmentsForDate, setAppointmentsForDate] = useState<typeof MOCK_APPOINTMENTS>([]);

  // Usar useEffect para evitar errores de hidratación
  useEffect(() => {
    // Filtrar y ordenar las citas para la fecha seleccionada
    const filtered = MOCK_APPOINTMENTS.filter(appointment =>
      isSameDay(new Date(appointment.appointmentDate), date)
    ).sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));

    setAppointmentsForDate(filtered);
  }, [date]);

  const getStatusColor = (status: AppointmentStatus) => {
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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-auto">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-lg mb-4">
          {format(date, "MMMM d, yyyy")}
          <span className="ml-1">
            - {appointmentsForDate.length} Appointments
          </span>
        </h3>

        <div className="space-y-3">
          {appointmentsForDate.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No appointments scheduled for this day
            </div>
          ) : (
            appointmentsForDate.map(appointment => (
              <Card
                key={appointment.idAppointment}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedAppointment(appointment.idAppointment)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.appointmentTime} - {appointment['Customer.User.fname']} {appointment['Customer.User.lname']}</p>
                      <p className="text-sm text-muted-foreground">{appointment['Service.name']} ({appointment['Service.duration']})</p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {formatStatus(appointment.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
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
