export interface Feedback {
  id: string;
  name: string;
  email?: string;
  course: string;
  rating: number;
  comments: string;
  submitted_at: string;
}

export interface CreateFeedbackInput {
  name: string;
  email?: string;
  course: string;
  rating: number;
  comments: string;
}
