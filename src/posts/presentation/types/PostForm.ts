export interface PostFormState {
  name: string;
  description: string;
  errors: { name?: string; description?: string };
}
