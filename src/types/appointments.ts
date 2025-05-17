export enum AppointmentStatus {
  Scheduled = "SCHEDULED",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
  NoShow = "NO_SHOW",
  InProgress = "IN_PROGRESS"
}

export interface Service {
  idServices: number;
  uuidServices: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface Appointment {
  idAppointment: number;
  customerId: number;
  uuidAppointment: string;
  appointmentDate: Date;
  appointmentTime: string;
  status: AppointmentStatus;
  serviceId: number;
  notes: string;
  'Customer.User.fname': string;
  'Customer.User.lname': string;
  'Customer.User.email': string;
  'Service.name': string;
  'Service.description': string;
  'Service.duration': string;
}

export interface NotificationPhone {
  id: number;
  phoneNumber: string;
  label: string;
  isActive: boolean;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
}
