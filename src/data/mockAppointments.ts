import { Appointment, AppointmentStatus, Customer, NotificationPhone, Service } from "@/types/appointments";
import { addDays, addHours, addMinutes, format, setHours, setMinutes, startOfDay } from "date-fns";

// Generate a random UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Generate random time in HH:MM format between 8:00 AM and 6:00 PM
const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 10) + 8; // 8 AM to 6 PM
  const minute = Math.random() < 0.5 ? 0 : 30; // Either 0 or 30 minutes
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Mock services
export const MOCK_SERVICES: Service[] = [
  {
    idServices: 1,
    uuidServices: generateUUID(),
    name: "Window Tinting",
    description: "Professional window tinting for your vehicle",
    duration: "01:30",
    price: 149.99
  },
  {
    idServices: 2,
    uuidServices: generateUUID(),
    name: "Car Detailing",
    description: "Complete interior and exterior detailing",
    duration: "03:00",
    price: 249.99
  },
  {
    idServices: 3,
    uuidServices: generateUUID(),
    name: "Oil Change",
    description: "Standard oil change service",
    duration: "00:45",
    price: 59.99
  },
  {
    idServices: 4,
    uuidServices: generateUUID(),
    name: "Quote Review",
    description: "Consultation for custom service quote",
    duration: "01:00",
    price: 0
  },
  {
    idServices: 5,
    uuidServices: generateUUID(),
    name: "Tire Rotation",
    description: "Rotate and balance all tires",
    duration: "01:00",
    price: 79.99
  }
];

// Mock customers
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    email: "sarah.j@example.com"
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "+1 (555) 456-7890",
    email: "michael.b@example.com"
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "+1 (555) 234-5678",
    email: "emily.davis@example.com"
  },
  {
    id: 5,
    name: "David Wilson",
    phone: "+1 (555) 876-5432",
    email: "david.w@example.com"
  }
];

// Generate mock appointments
const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();

  // Generate 20 mock appointments
  for (let i = 0; i < 20; i++) {
    const serviceIndex = i % MOCK_SERVICES.length;
    const customerIndex = i % MOCK_CUSTOMERS.length;
    const service = MOCK_SERVICES[serviceIndex];
    const customer = MOCK_CUSTOMERS[customerIndex];

    // Generate date within next 14 days
    const days = Math.floor(Math.random() * 14);
    const date = addDays(today, days);
    const time = generateRandomTime();

    // Generate random status
    const statuses = Object.values(AppointmentStatus);
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    appointments.push({
      idAppointment: i + 1,
      customerId: customer.id,
      uuidAppointment: generateUUID(),
      appointmentDate: date,
      appointmentTime: time,
      status,
      serviceId: service.idServices,
      notes: `Mock appointment ${i + 1}`,
      'Customer.User.fname': customer.name.split(' ')[0],
      'Customer.User.lname': customer.name.split(' ')[1],
      'Customer.User.email': customer.email,
      'Service.name': service.name,
      'Service.description': service.description,
      'Service.duration': service.duration
    });
  }

  return appointments;
};

export const MOCK_APPOINTMENTS = generateMockAppointments();

// Mock notification phones
export const MOCK_NOTIFICATION_PHONES: NotificationPhone[] = [
  {
    id: 1,
    phoneNumber: "+1 (555) 123-4567",
    label: "Main Office",
    isActive: true
  },
  {
    id: 2,
    phoneNumber: "+1 (555) 987-6543",
    label: "Manager",
    isActive: true
  },
  {
    id: 3,
    phoneNumber: "+1 (555) 567-8901",
    label: "Front Desk",
    isActive: false
  }
];
