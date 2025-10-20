import React from 'react';
import type { RoadmapResponse } from '../types';
import {
    BriefcaseIcon,
    RocketLaunchIcon,
    LightBulbIcon,
    CheckBadgeIcon,
    CalendarDaysIcon
} from '../constants';

interface RoadmapDisplayProps {
  data: RoadmapResponse;
}

const SkillChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
        {children}
    </span>
);

const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ data }) => {
    const { recommended_roles, user_personalised_path } = data;

    return (
        <div className="mt-12 animate-fade-in space-y-12">
            {/* Personalized Path Section */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
                    <RocketLaunchIcon className="w-8 h-8 text-indigo-400" />
                    Your Personalised Learning Path
                </h2>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
                    <div className="flex flex-wrap gap-6 mb-6 text-center md:text-left">
                        <div className="flex-1 min-w-[200px]">
                            <p className="text-sm text-gray-400">Recommended Entry Role</p>
                            <p className="text-xl font-semibold text-indigo-300">{user_personalised_path.entry_role}</p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <p className="text-sm text-gray-400">Total Duration</p>
                            <p className="text-xl font-semibold text-indigo-300">{user_personalised_path.months_to_target} Months</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-4">Weekly Plan</h3>
                    <div className="relative">
                        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                            {user_personalised_path.weekly_plan.map((step) => (
                                <div key={step.week_number} className="flex-shrink-0 w-64 transform transition-transform duration-300 hover:-translate-y-2">
                                    <div className="h-full bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex flex-col">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-indigo-400">Week {step.week_number}</span>
                                        </div>
                                        <p className="font-semibold text-white text-base leading-tight flex-grow">{step.focus}</p>
                                        <p className="text-gray-400 text-xs mt-2 pt-2 border-t border-gray-700">
                                            <span className="font-semibold text-gray-300">Deliverable:</span> {step.deliverable}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex-shrink-0 w-64">
                                <div className="h-full bg-gray-900/50 rounded-lg p-4 border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-center">
                                    <RocketLaunchIcon className="w-8 h-8 text-green-400 mb-2"/>
                                    <p className="font-semibold text-white">Your Journey Begins!</p>
                                    <p className="text-gray-400 text-xs mt-1">Stay consistent and achieve your goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Roles Section */}
            <section>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3">
                    <BriefcaseIcon className="w-8 h-8 text-indigo-400" />
                    Recommended Career Roles
                </h2>
                <div className="space-y-8">
                    {recommended_roles.map((role, index) => (
                        <div key={index} className="p-[1px] bg-gradient-to-br from-indigo-500/30 to-gray-800/30 rounded-xl">
                            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl">
                                <h3 className="text-2xl font-bold text-indigo-300">{role.role_name}</h3>
                                <p className="mt-2 text-gray-400">{role.why_fit}</p>
                                <div className="mt-4 text-sm font-medium text-gray-300 flex items-center">
                                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-indigo-400" />
                                    Job-ready in ~{role.timeline_months} months
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
                                            <LightBulbIcon className="w-5 h-5 text-yellow-400" />
                                            Core Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {role.core_skills.map(skill => <SkillChip key={skill}>{skill}</SkillChip>)}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
                                            <CheckBadgeIcon className="w-5 h-5 text-green-400" />
                                            Differentiator Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {role.differentiator_skills.map(skill => <SkillChip key={skill}>{skill}</SkillChip>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
                                        <RocketLaunchIcon className="w-5 h-5 text-rose-400" />
                                        Mini-Projects
                                    </h4>
                                    <div className="space-y-4">
                                        {role.mini_projects.map(project => (
                                            <div key={project.project_name} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                                <p className="font-semibold text-indigo-400">{project.project_name}</p>
                                                <p className="text-sm text-gray-400 mt-1">{project.project_description}</p>
                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                                    <span>Time: ~{project.time_estimate_weeks} weeks</span>
                                                    <span>Deliverable: {project.metrics_or_deliverables}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RoadmapDisplay;