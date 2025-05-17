import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import ServicesManager from "@/components/appointments/ServicesManager";
import NotificationSettings from "@/components/appointments/NotificationSettings";
import AppointmentsList from "@/components/appointments/AppointmentsList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateAppointmentDialog from "@/components/appointments/CreateAppointmentDialog";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Appointments</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-muted-foreground">Osen</span>
            <span className="text-muted-foreground">&gt;</span>
            <span>Appointments</span>
          </div>
        </div>
        <CreateAppointmentDialog />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="appointments">List</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Calendar</CardTitle>
              <CardDescription>
                View and manage appointments in calendar view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointments List</CardTitle>
                <CardDescription>
                  View and manage all appointments
                </CardDescription>
              </div>
              <CreateAppointmentDialog />
            </CardHeader>
            <CardContent>
              <AppointmentsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  Manage appointment services
                </CardDescription>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Service</span>
              </Button>
            </CardHeader>
            <CardContent>
              <ServicesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notification Settings</CardTitle>
              <CardDescription>
                Manage phone numbers for appointment notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
