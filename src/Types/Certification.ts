export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  certificate?: File | null;
}