import React from 'react';
import type { RoadmapResponse, RecommendedRole, MiniProject, WeeklyStep } from '../types';
import { CodeBracketIcon, LightBulbIcon, RocketLaunchIcon, CheckBadgeIcon } from '../constants';

const SkillTag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`inline-block bg-gray-700/80 text-indigo-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full ${className}`}>
    {children}
  </span>
);

const ProjectCard: React.FC<{ project: MiniProject }> = ({ project }) => (
  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700/70 transition-all hover:border-indigo-500/50 hover:bg-gray-800/80">
    <h4 className="font-semibold text-indigo-400">{project.project_name}</h4>
    <p className="text-sm text-gray-400 mt-1">{project.project_description}</p>
    <div className="mt-3 text-xs text-gray-500 space-y-1">
      <p><strong>Est. Time:</strong> {project.time_estimate_weeks} weeks</p>
      <p><strong>Deliverable:</strong> {project.metrics_or_deliverables}</p>
    </div>
  </div>
);

const RoleCard: React.FC<{ role: RecommendedRole }> = ({ role }) => (
  <div className="p-[1px] bg-gradient-to-br from-indigo-500/30 to-gray-800/30 rounded-xl shadow-lg">
    <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-2xl font-bold text-indigo-400">{role.role_name}</h3>
                <p className="text-sm text-gray-400 mt-1">~{role.timeline_months} months to job-ready</p>
            </div>
            <span className="text-xs font-mono bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full border border-indigo-700/50">
                RECOMMENDED
            </span>
        </div>
        <p className="mt-4 text-gray-300">{role.why_fit}</p>
        
        <div className="mt-6">
            <h4 className="font-semibold text-gray-200 mb-2 flex items-center"><CodeBracketIcon className="w-5 h-5 mr-2 text-indigo-400" />Core Skills</h4>
            <div>{role.core_skills.map(skill => <SkillTag key={skill}>{skill}</SkillTag>)}</div>
        </div>

        <div className="mt-4">
            <h4 className="font-semibold text-gray-200 mb-2 flex items-center"><LightBulbIcon className="w-5 h-5 mr-2 text-teal-400" />Differentiator Skills</h4>
            <div>{role.differentiator_skills.map(skill => <SkillTag key={skill} className="bg-teal-900/50 text-teal-300">{skill}</SkillTag>)}</div>
        </div>

        <div className="mt-6">
            <h4 className="font-semibold text-gray-200 mb-4 flex items-center"><RocketLaunchIcon className="w-5 h-5 mr-2 text-indigo-400" />Mini Projects</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.mini_projects.map(p => <ProjectCard key={p.project_name} project={p} />)}
            </div>
        </div>
    </div>
  </div>
);

const WeeklyPlan: React.FC<{ plan: WeeklyStep[], entryRole: string }> = ({ plan, entryRole }) => (
  <div className="mt-20">
    <h2 className="text-3xl font-bold text-center mb-2">Your Personalised Path to <span className="text-indigo-400">{entryRole}</span></h2>
    <p className="text-center text-gray-400 mb-12">A step-by-step guide to help you achieve your goal.</p>
    <div className="relative mt-8 px-4">
        <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gray-700/50" aria-hidden="true"></div>
        {plan.map((step) => (
            <div key={step.week_number} className="relative mb-8 flex md:justify-center items-center w-full">
                <div className="hidden md:flex md:w-1/2"></div>
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-white z-10 ring-8 ring-gray-900">
                    {step.week_number}
                </div>
                <div className="w-full md:w-1/2 pl-12 md:pl-8">
                   <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-md">
                        <p className="font-bold text-indigo-400">{step.focus}</p>
                        <div className="flex items-start text-sm text-gray-400 mt-2">
                          <CheckBadgeIcon className="w-5 h-5 mr-2 mt-0.5 text-teal-400 flex-shrink-0" />
                          <span>{step.deliverable}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  </div>
);

interface RoadmapDisplayProps {
  data: RoadmapResponse;
}

const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ data }) => {
  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8">Recommended Career Roles</h2>
      <div className="space-y-8">
        {data.recommended_roles.map(role => <RoleCard key={role.role_name} role={role} />)}
      </div>
      <WeeklyPlan plan={data.user_personalised_path.weekly_plan} entryRole={data.user_personalised_path.entry_role} />
    </div>
  );
};

export default RoadmapDisplay;