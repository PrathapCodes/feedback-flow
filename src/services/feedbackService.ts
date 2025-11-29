import { Feedback, CreateFeedbackInput } from "@/types/feedback";

/**
 * Feedback Service
 * 
 * This service provides a clean API layer for feedback operations.
 * Currently uses localStorage for MVP demonstration.
 * 
 * TO REPLACE WITH REAL BACKEND:
 * 1. Replace localStorage calls with fetch/axios calls to your API
 * 2. Update the endpoint URLs
 * 3. Add authentication headers if needed
 * 4. Keep the same function signatures and return types
 */

const STORAGE_KEY = "feedback_data";

// Helper to get all feedback from localStorage
const getAllFeedback = (): Feedback[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save feedback to localStorage
const saveFeedback = (feedback: Feedback[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
};

/**
 * Submit new feedback
 * 
 * Backend implementation should:
 * POST /api/feedback
 * Body: CreateFeedbackInput
 * Response: { success: true, id: string, record: Feedback }
 */
export const submitFeedback = async (
  input: CreateFeedbackInput
): Promise<{ success: boolean; id: string; record: Feedback }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newFeedback: Feedback = {
    id: crypto.randomUUID(),
    ...input,
    submitted_at: new Date().toISOString(),
  };

  const allFeedback = getAllFeedback();
  allFeedback.unshift(newFeedback); // Add to beginning
  saveFeedback(allFeedback);

  return {
    success: true,
    id: newFeedback.id,
    record: newFeedback,
  };
};

/**
 * Get latest feedback entries
 * 
 * Backend implementation should:
 * GET /api/feedback/latest?limit=5
 * Response: { success: true, items: Feedback[] }
 */
export const getLatestFeedback = async (
  limit: number = 5
): Promise<{ success: boolean; items: Feedback[] }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const allFeedback = getAllFeedback();
  const items = allFeedback.slice(0, limit);

  return {
    success: true,
    items,
  };
};

/**
 * Seed sample data for testing
 * Remove this in production
 */
export const seedSampleData = (): void => {
  const existing = getAllFeedback();
  if (existing.length === 0) {
    const sample: Feedback = {
      id: crypto.randomUUID(),
      name: "Alex Johnson",
      email: "alex.j@example.com",
      course: "Introduction to Web Development",
      rating: 5,
      comments:
        "Excellent course! The instructor explained complex concepts in a very clear and engaging way. Highly recommend to anyone starting their web dev journey.",
      submitted_at: new Date().toISOString(),
    };
    saveFeedback([sample]);
  }
};
