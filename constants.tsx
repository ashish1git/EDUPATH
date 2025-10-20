import React from 'react';
import { Type } from '@google/genai';
// fix: Use `Schema` type instead of `JSONSchema` for response schema.
import type { Schema } from '@google/genai';

export const SYSTEM_PROMPT = `You are "EduPathAdvisor" — an AI-powered career and skill roadmap advisor for engineering students in AI & ML, Data Science, and Software Engineering.

Your task is to guide a student by analyzing their current skill level, interests, and time availability, and then generate:
1. Personalized recommended career roles
2. Required and differentiator skills
3. Mini project ideas (realistic and free to do)
4. A step-by-step weekly learning plan

Your output must be in valid JSON format.

Instructions:
- **Crucially, the generated roadmap must strictly adhere to the 'timeframe_months' provided in the user input.** All timelines, especially the 'weekly_plan', must be scaled to fit within this exact duration. For example, if the user specifies 3 months, the weekly plan should contain around 12 weeks of actionable steps. The plan must be realistic and achievable for a student within that specific timeframe.
- Generate actionable, realistic advice for a student audience.
- Weekly plans should assume 5–7 hours per week.
- Recommend free/opensource datasets or tools where needed.
- Suggest mini-projects that can be completed without paid APIs or expensive GPUs.
- Ensure the JSON is clean and machine-readable (no extra text outside the JSON).
- Be friendly and motivational in tone inside explanations.`;

// fix: Use `Schema` type for defining the response schema.
export const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    recommended_roles: {
      type: Type.ARRAY,
      description: "A list of career roles recommended for the user.",
      items: {
        type: Type.OBJECT,
        properties: {
          role_name: { type: Type.STRING, description: "The name of the career role." },
          why_fit: { type: Type.STRING, description: "Explanation of why this role is a good fit for the user." },
          core_skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Essential skills for this role." },
          differentiator_skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Skills that make a candidate stand out." },
          mini_projects: {
            type: Type.ARRAY,
            description: "A list of mini-project ideas to build skills for this role.",
            items: {
              type: Type.OBJECT,
              properties: {
                project_name: { type: Type.STRING, description: "The name of the project." },
                project_description: { type: Type.STRING, description: "A brief description of the project." },
                time_estimate_weeks: { type: Type.INTEGER, description: "Estimated time in weeks to complete the project." },
                metrics_or_deliverables: { type: Type.STRING, description: "What the final outcome or success metric is." },
              },
              required: ["project_name", "project_description", "time_estimate_weeks", "metrics_or_deliverables"],
            },
          },
          timeline_months: { type: Type.INTEGER, description: "Estimated timeline in months to become job-ready for this role." },
        },
        required: ["role_name", "why_fit", "core_skills", "differentiator_skills", "mini_projects", "timeline_months"],
      },
    },
    user_personalised_path: {
      type: Type.OBJECT,
      description: "A detailed, personalized learning path for the user.",
      properties: {
        entry_role: { type: Type.STRING, description: "The recommended entry-level role for the user's path." },
        months_to_target: { type: Type.INTEGER, description: "Total months for the learning plan." },
        weekly_plan: {
          type: Type.ARRAY,
          description: "A week-by-week breakdown of the learning plan.",
          items: {
            type: Type.OBJECT,
            properties: {
              week_number: { type: Type.INTEGER, description: "The week number in the plan." },
              focus: { type: Type.STRING, description: "The main topic or skill to focus on for the week." },
              deliverable: { type: Type.STRING, description: "A tangible outcome for the week's work." },
            },
            required: ["week_number", "focus", "deliverable"],
          },
        },
      },
      required: ["entry_role", "months_to_target", "weekly_plan"],
    },
  },
  required: ["recommended_roles", "user_personalised_path"],
};

export const AcademicCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2L1 7.5V13.5L12 19L23 13.5V7.5L12 2ZM12 4.535L19.556 9L12 13.465L4.444 9L12 4.535Z" />
        <path d="M21 14.26V10.74L12 15.5L3 10.74V14.26L12 19.5L21 14.26Z" />
    </svg>
);

export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.446-2.25 2.651-1.35.216-2.613-.24-3.555-1.182-1.02-.99-2.613-.99-3.633 0-.942.942-2.205 1.398-3.555 1.182C6.214 20.67 5.25 19.538 5.25 18.225V14.15M15.75 6.75v-1.5a2.25 2.25 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25v1.5m6 0v4.5-4.5m-6 0v4.5-4.5m6 4.5h-6.75a2.25 2.25 0 0 0-2.25 2.25v1.5a2.25 2.25 0 0 0 2.25 2.25h6.75a2.25 2.25 0 0 0 2.25-2.25v-1.5a2.25 2.25 0 0 0-2.25-2.25Z" />
    </svg>
);

export const CodeBracketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
    </svg>
);

export const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h27" />
    </svg>
);

export const BuildingStorefrontIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A.75.75 0 0 1 14.25 12h.75c.414 0 .75.336.75.75v7.5m-4.5 0v-7.5A.75.75 0 0 1 10.5 12h.75c.414 0 .75.336.75.75v7.5m-4.5 0v-7.5A.75.75 0 0 1 6.75 12h.75c.414 0 .75.336.75.75v7.5m11.25 0v-7.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v7.5m-15-12.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5Zm15 0V4.5a.75.75 0 0 0-.75-.75h-13.5a.75.75 0 0 0-.75.75v3.75m15 0a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75M4.5 21V9a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 .75.75v12" />
    </svg>
);

export const RocketLaunchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 2.18a14.98 14.98 0 0 0-12.12 6.16.98.98 0 0 0 .63 1.29l3.53.94a.98.98 0 0 0 1.29-.63l.94-3.53a14.98 14.98 0 0 1 12.12-6.16.98.98 0 0 1 1.29.63l.94 3.53a.98.98 0 0 1-.63 1.29l-3.53.94a.98.98 0 0 1-1.29-.63l-.94-3.53m-3.53 8.48a.98.98 0 0 0-1.29.63l-.94 3.53a.98.98 0 0 0 .63 1.29l3.53.94a.98.98 0 0 0 1.29-.63l.94-3.53a.98.98 0 0 0-.63-1.29l-3.53-.94Z" />
  </svg>
);

export const LightBulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-1.5c1.45-1.45 1.45-3.8 0-5.25s-3.8-1.45-5.25 0-1.45 3.8 0 5.25c.48.48.98.9 1.5 1.25m0 0v5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5Z" />
  </svg>
);

export const CheckBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);