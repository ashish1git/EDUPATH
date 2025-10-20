import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import { generateRoadmap } from './services/geminiService';
import type { UserInput, RoadmapResponse } from './types';
import { AcademicCapIcon } from './constants';

const App: React.FC = () => {
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserInput) => {
    setIsLoading(true);
    setError(null);
    setRoadmap(null);
    try {
      const result = await generateRoadmap(data);
      setRoadmap(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
                <AcademicCapIcon className="w-12 h-12 text-indigo-400" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                    EduPath<span className="text-indigo-400">Advisor</span>
                </h1>
            </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Your personal AI guide to a successful career in tech. Fill out the form below to generate your custom learning roadmap.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="p-[1px] bg-gradient-to-br from-indigo-500/30 to-gray-800/30 rounded-xl">
            <UserInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && !error && (
            <div className="mt-12 text-center">
                 <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="relative h-16 w-16">
                      <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-gray-700 animate-spin"></div>
                      <AcademicCapIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" />
                    </div>
                    <span className="text-indigo-300 text-lg">Crafting your personalised roadmap...</span>
                    <span className="text-gray-500 text-sm">This may take a moment. Great things are coming!</span>
                </div>
            </div>
          )}
          
          {roadmap && !isLoading && !error && <RoadmapDisplay data={roadmap} />}
        </div>
         <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>Happily made by Ashish.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;