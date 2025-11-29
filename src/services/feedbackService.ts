import { Feedback, CreateFeedbackInput } from "@/types/feedback";
import { supabase } from "@/lib/supabase";

/**
 * Submit new feedback
 */
export const submitFeedback = async (
  input: CreateFeedbackInput
): Promise<{ success: boolean; id: string; record: Feedback }> => {
  const { data, error } = await supabase
    .from("feedback")
    .insert([input])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }

  return {
    success: true,
    id: data.id,
    record: data,
  };
};

/**
 * Get latest feedback entries
 */
export const getLatestFeedback = async (
  limit: number = 5
): Promise<{ success: boolean; items: Feedback[] }> => {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch feedback: ${error.message}`);
  }

  return {
    success: true,
    items: data || [],
  };
};

