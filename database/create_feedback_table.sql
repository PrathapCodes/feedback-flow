-- Create feedback table
-- Run this SQL in your Supabase SQL Editor to create the database schema

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  course text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comments text not null,
  submitted_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.feedback enable row level security;

-- Create policy to allow anyone to read feedback
create policy "Anyone can view feedback"
  on public.feedback
  for select
  to public
  using (true);

-- Create policy to allow anyone to insert feedback
create policy "Anyone can submit feedback"
  on public.feedback
  for insert
  to public
  with check (true);

-- Create index on submitted_at for efficient querying
create index feedback_submitted_at_idx on public.feedback (submitted_at desc);

-- Insert sample data
insert into public.feedback (name, email, course, rating, comments)
values (
  'Alex Johnson',
  'alex.j@example.com',
  'Introduction to Web Development',
  5,
  'Excellent course! The instructor explained complex concepts in a very clear and engaging way. Highly recommend to anyone starting their web dev journey.'
);
