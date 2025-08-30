export interface Language {
  language: string;
  level: string;
  learnedFrom?: string; // Add where the language was learned
  certificate?: File | null;
}