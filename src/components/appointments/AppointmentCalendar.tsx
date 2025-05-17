"use client";

import { Appointment, AppointmentStatus } from "@/types/appointments";
import { MOCK_APPOINTMENTS } from "@/data/mockAppointments";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { format, parse } from "date-fns";
import AppointmentDialog from "./AppointmentDialog";
import { useToast } from "@/components/ui/use-toast";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    appointment: Appointment;
  };
  backgroundColor: string;
  borderColor: string;
}

const getStatusColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Scheduled:
      return "#3b82f6"; // blue
    case AppointmentStatus.Completed:
      return "#10b981"; // green
    case AppointmentStatus.Cancelled:
      return "#ef4444"; // red
    case AppointmentStatus.NoShow:
      return "#f59e0b"; // amber
    case AppointmentStatus.InProgress:
      return "#8b5cf6"; // purple
    default:
      return "#6b7280"; // gray
  }
};

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, this would fetch from an API
    setAppointments(MOCK_APPOINTMENTS);
  }, []);

  useEffect(() => {
    if (appointments.length === 0) return;

    const newEvents = appointments.map((appointment) => {
      // Parse the time from HH:MM format
      const time = appointment.appointmentTime;
      const [hours, minutes] = time.split(":").map(Number);

      // Create the start date by combining the date and time
      const startDate = new Date(appointment.appointmentDate);
      startDate.setHours(hours, minutes);

      // Parse the duration from HH:MM format
      const duration = appointment.["Service.duration"];
      const [durationHours, durationMinutes] = duration.split(":").map(Number);

      // Calculate the end date by adding the duration
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + durationHours);
      endDate.setMinutes(endDate.getMinutes() + durationMinutes);

      // Get color based on status
      const color = getStatusColor(appointment.status);

      return {
        id: appointment.uuidAppointment,
        title: `${appointment["Customer.User.fname"]} - ${appointment["Service.name"]}`,
        start: startDate,
        end: endDate,
        extendedProps: { appointment },
        backgroundColor: color,
        borderColor: color
      };
    });

    setEvents(newEvents);
  }, [appointments]);

  const handleEventClick = (info: any) => {
    const { appointment } = info.event.extendedProps;
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleDateClick = (info: any) => {
    toast({
      title: "Date clicked",
      description: `You clicked on ${format(info.date, "PPP")}. You can add logic to create a new appointment here.`,
    });
  };

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(appointment =>
      appointment.idAppointment === updatedAppointment.idAppointment
        ? updatedAppointment
        : appointment
    ));
    setIsDialogOpen(false);

    toast({
      title: "Appointment updated",
      description: `The appointment has been updated successfully.`,
    });
  };

  return (
    <div className="h-[700px]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        height="100%"
      />

      {selectedAppointment && (
        <AppointmentDialog
          appointment={selectedAppointment}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdate={handleAppointmentUpdate}
        />
      )}
    </div>
  );
};

export default AppointmentCalendar;
