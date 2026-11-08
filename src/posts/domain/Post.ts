export interface Post {
  id: number;
  name: string;
  description: string;
}

export interface CreatePostInput {
  name: string;
  description: string;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
