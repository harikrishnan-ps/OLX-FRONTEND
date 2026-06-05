export interface AdFormData {
  category: string;
  photos: File[];
  title: string;
  description: string;
  price: number;
  location: string;
  contactMethods: string[];
}

export interface AdCategory {
  value: string;
  label: string;
  icon: string;
}
