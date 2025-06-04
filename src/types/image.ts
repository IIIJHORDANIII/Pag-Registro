export interface Image {
  _id: string;
  name: string;
  description: string;
  value: number;
  imagePath: string;
  createdAt: string;
}

export interface ImageFormData {
  image: File | null;
  name: string;
  description: string;
  value: string;
}