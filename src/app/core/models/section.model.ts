export interface FleetItem {
  name: string;
  capacity: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  tag?: string;
}

export interface IndustryItem {
  name: string;
  description: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
}
