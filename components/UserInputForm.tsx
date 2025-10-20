import React, { useState } from 'react';
import type { UserInput } from '../types';
import { UserIcon, CodeBracketIcon, BriefcaseIcon, CalendarDaysIcon, BuildingStorefrontIcon } from '../constants';

interface UserInputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const SuggestionChip: React.FC<{ onSelect: (value: string) => void; children: React.ReactNode }> = ({ onSelect, children }) => (
    <button
        type="button"
        onClick={() => onSelect(children as string)}
        className="bg-gray-700 hover:bg-gray-600 text-indigo-300 text-xs font-medium mr-2 mb-2 px-3 py-1.5 rounded-full transition-colors"
    >
        {children}
    </button>
);

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<UserInput, 'goal_roles'>>({
    name: '',
    current_level: '',
    timeframe_months: 6,
    preferred_domain: '',
  });
  const [goalRoles, setGoalRoles] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'timeframe_months' ? parseInt(value, 10) : value,
    }));
  };
  
  const handleGoalRoleSelect = (role: string) => {
    setGoalRoles(prev => prev ? `${prev}, ${role}` : role);
  }
  
  const handleDomainSelect = (domain: string) => {
    setFormData(prev => ({...prev, preferred_domain: domain}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const finalData: UserInput = {
      ...formData,
      goal_roles: goalRoles.split(',').map(role => role.trim()).filter(Boolean),
    };
    onSubmit(finalData);
  };

  const goalRoleSuggestions = ["ML Engineer", "Data Scientist", "AI Product Engineer", "Software Engineer", "Computer Vision Engineer"];
  const domainSuggestions = ["Healthcare", "FinTech", "E-commerce", "Gaming", "Robotics", "Security"];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
            <UserIcon className="w-5 h-5 mr-2" /> Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Ashish"
            required
            className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white placeholder-gray-500"
          />
        </div>
         <div>
          <label htmlFor="preferred_domain" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
            <BuildingStorefrontIcon className="w-5 h-5 mr-2" /> Preferred Domain
          </label>
          <input
            type="text"
            id="preferred_domain"
            name="preferred_domain"
            value={formData.preferred_domain}
            onChange={handleChange}
            placeholder="e.g., Healthcare Imaging"
            required
            className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white placeholder-gray-500"
          />
           <div className="mt-2">
             {domainSuggestions.map(d => <SuggestionChip key={d} onSelect={handleDomainSelect}>{d}</SuggestionChip>)}
           </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="current_level" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
            <CodeBracketIcon className="w-5 h-5 mr-2" /> Current Skills & Level
        </label>
        <textarea
          id="current_level"
          name="current_level"
          rows={3}
          value={formData.current_level}
          onChange={handleChange}
          placeholder="e.g., 3rd year B.Tech CSE, Python, DSA, basic ML..."
          required
          className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white placeholder-gray-500"
        ></textarea>
        <p className="mt-2 text-xs text-gray-500">Be specific! Mention languages, frameworks, and concepts you're comfortable with.</p>
      </div>
       
       <div>
            <label htmlFor="goal_roles" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
                <BriefcaseIcon className="w-5 h-5 mr-2" /> Goal Roles
            </label>
            <input
                type="text"
                id="goal_roles"
                name="goal_roles"
                value={goalRoles}
                onChange={(e) => setGoalRoles(e.target.value)}
                placeholder="e.g., ML Engineer, AI Product Engineer"
                required
                className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3 text-white placeholder-gray-500"
            />
            <div className="mt-2">
                {goalRoleSuggestions.map(role => <SuggestionChip key={role} onSelect={handleGoalRoleSelect}>{role}</SuggestionChip>)}
            </div>
             <p className="mt-2 text-xs text-gray-500">Separate multiple roles with a comma. Click suggestions to add them.</p>
        </div>
        
        <div>
            <label htmlFor="timeframe_months" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
                <CalendarDaysIcon className="w-5 h-5 mr-2" /> Timeframe: <span className="ml-2 font-bold text-indigo-400">{formData.timeframe_months} Months</span>
            </label>
            <input
                type="range"
                id="timeframe_months"
                name="timeframe_months"
                value={formData.timeframe_months}
                onChange={handleChange}
                min="1"
                max="24"
                step="1"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Month</span>
                <span>24 Months</span>
            </div>
        </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Generate My Roadmap'}
        </button>
      </div>
    </form>
  );
};

export default UserInputForm;