export interface Image {
  _id: string;
  name: string;
  description: string;
  value: number;
  imagePath: string;
  createdAt: string;
  url?: string;
  uploadedBy?: {
    _id: string;
    nome: string;
    email: string;
  };
}

export interface ImageFormData {
  name: string;
  description: string;
  value: string;
  image: File | null;
}