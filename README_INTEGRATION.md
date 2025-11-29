# Frontend-Backend Integration Guide

## Overview

This MVP uses **localStorage** as a temporary data layer. The backend developer can easily replace this with real database calls while keeping the same interface.

## Current Architecture

```
Frontend (Form + Display)
    ↓
Service Layer (feedbackService.ts)
    ↓
localStorage (temporary storage)
```

## Backend Integration Steps

### 1. Review the API Contract

The service layer (`src/services/feedbackService.ts`) defines two key functions:

#### POST - Submit Feedback
```typescript
submitFeedback(input: CreateFeedbackInput): Promise<{
  success: boolean;
  id: string;
  record: Feedback;
}>
```

**Expected Backend Endpoint:**
- `POST /api/feedback`
- Request body: `{ name, email?, course, rating, comments }`
- Response: `{ success: true, id: "uuid", record: {...} }`

#### GET - Retrieve Latest Feedback
```typescript
getLatestFeedback(limit?: number): Promise<{
  success: boolean;
  items: Feedback[];
}>
```

**Expected Backend Endpoint:**
- `GET /api/feedback/latest?limit=5`
- Response: `{ success: true, items: [...] }`

### 2. Database Schema

Create a `feedback` table with these columns:

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PRIMARY KEY |
| name | text | NOT NULL |
| email | text | nullable |
| course | text | NOT NULL |
| rating | integer | NOT NULL, CHECK (1..5) |
| comments | text | NOT NULL |
| submitted_at | timestamptz | NOT NULL, DEFAULT now() |

### 3. Replace localStorage with Real API

In `src/services/feedbackService.ts`, replace the localStorage implementation:

```typescript
// BEFORE (localStorage)
export const submitFeedback = async (input: CreateFeedbackInput) => {
  const newFeedback: Feedback = {
    id: crypto.randomUUID(),
    ...input,
    submitted_at: new Date().toISOString(),
  };
  const allFeedback = getAllFeedback();
  allFeedback.unshift(newFeedback);
  saveFeedback(allFeedback);
  return { success: true, id: newFeedback.id, record: newFeedback };
};

// AFTER (real API)
export const submitFeedback = async (input: CreateFeedbackInput) => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers if needed
    },
    body: JSON.stringify(input),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
  
  return response.json();
};
```

### 4. Environment Variables

If using Supabase or external APIs, add these to your `.env`:

```bash
VITE_API_URL=https://your-api.com
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
```

### 5. Testing the Integration

1. Start your backend server
2. Update the API endpoint in `feedbackService.ts`
3. Test form submission → should save to DB
4. Test feedback view → should retrieve from DB
5. Verify data persists across page refreshes

## Sample Data

The app seeds one sample record on first load. You can:
- Keep this for demos
- Remove `seedSampleData()` call from `App.tsx`
- Add your own seed data in the backend

## Export & Deployment

### Frontend Export
1. In Lovable, click "Export" → Download ZIP
2. Share with backend developer
3. Merge into main repository

### Backend Setup
1. Deploy database (Supabase, Railway, etc.)
2. Deploy API (Vercel, Netlify Functions, etc.)
3. Update frontend `VITE_API_URL` to point to deployed API

## Security Notes

- Add input validation on the backend (already done in frontend with Zod)
- Use environment variables for API keys (never commit them)
- Add rate limiting on submit endpoint
- Consider adding CORS configuration
- Add authentication if needed

## Contact

- **Frontend Developer**: [Your Name]
- **Backend Developer**: [Partner Name]
- **Repository**: [GitHub URL]

---

**Next Steps:**
1. Backend: Create database table
2. Backend: Implement POST /api/feedback
3. Backend: Implement GET /api/feedback/latest
4. Frontend: Update service layer with real endpoints
5. Test integration
6. Deploy!
