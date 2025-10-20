
export interface UserInput {
  name: string;
  current_level: string;
  goal_roles: string[];
  timeframe_months: number;
  preferred_domain: string;
}

export interface MiniProject {
  project_name: string;
  project_description: string;
  time_estimate_weeks: number;
  metrics_or_deliverables: string;
}

export interface RecommendedRole {
  role_name: string;
  why_fit: string;
  core_skills: string[];
  differentiator_skills: string[];
  mini_projects: MiniProject[];
  timeline_months: number;
}

export interface WeeklyStep {
  week_number: number;
  focus: string;
  deliverable: string;
}

export interface PersonalisedPath {
  entry_role: string;
  months_to_target: number;
  weekly_plan: WeeklyStep[];
}

export interface RoadmapResponse {
  recommended_roles: RecommendedRole[];
  user_personalised_path: PersonalisedPath;
}
