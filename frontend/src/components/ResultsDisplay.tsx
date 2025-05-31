import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import DiseaseCharts from './DiseaseCharts';

interface PredictionResult {
  confidence: number;
  disease: string;
  infection_percentage: number;
  intensity_level: string;
  recommendation: string;
}

interface ResultsDisplayProps {
  result: PredictionResult;
  imageUrl: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, imageUrl, onReset }) => {
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(true);
  
  // Format the recommendation text
  const formatRecommendation = (text: string) => {
    // Split the text by line breaks
    const sections = text.split('\n').filter(line => line.trim());
    
    // Process each section
    return sections.map((section, index) => {
      if (section.includes('Disease:')) {
        return <h3 key={index} className="font-bold text-lg text-gray-900 mb-2">{section.replace('Disease:', '').trim()}</h3>;
      }
      
      if (section.includes('Overview:')) {
        return (
          <div key={index} className="mb-3">
            <span className="font-semibold">Overview: </span>
            {section.replace('Overview:', '').trim()}
          </div>
        );
      }
      
      if (section.includes('Symptoms:')) {
        return (
          <div key={index} className="mb-3">
            <span className="font-semibold">Symptoms: </span>
            {section.replace('Symptoms:', '').trim()}
          </div>
        );
      }
      
      if (section.includes('Treatment:')) {
        return <h4 key={index} className="font-semibold text-gray-800 mb-2 mt-4">Treatment:</h4>;
      }
      
      if (section.includes('Natural:')) {
        return (
          <div key={index} className="mb-2 pl-4">
            <span className="font-medium text-green-700">Natural: </span>
            {section.replace('Natural:', '').trim()}
          </div>
        );
      }
      
      if (section.includes('Chemical:')) {
        return (
          <div key={index} className="mb-2 pl-4">
            <span className="font-medium text-amber-700">Chemical: </span>
            {section.replace('Chemical:', '').trim()}
          </div>
        );
      }
      
      if (section.includes('Prevention:')) {
        return (
          <div key={index} className="mt-4">
            <span className="font-semibold">Prevention: </span>
            {section.replace('Prevention:', '').trim()}
          </div>
        );
      }
      
      return <div key={index} className="mb-1">{section}</div>;
    });
  };
  
  // Determine intensity level color
  const getIntensityColor = (level: string) => {
    const levelNum = parseInt(level.replace('Level ', ''));
    if (levelNum <= 2) return 'bg-green-100 text-green-800';
    if (levelNum <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden fade-in slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Preview */}
        <div className="md:col-span-1 p-6 bg-gray-50">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img src={imageUrl} alt="Analyzed plant" className="w-full h-auto" />
          </div>
          <button
            onClick={onReset}
            className="mt-6 flex items-center justify-center w-full btn btn-outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Analyze Another Image
          </button>
        </div>
        
        {/* Results Content */}
        <div className="md:col-span-2 p-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Detection Results
            </h3>
            
            {/* Results Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="card p-4">
                <p className="text-sm text-gray-500 mb-1">Disease</p>
                <p className="text-xl font-semibold text-gray-900">{result.disease}</p>
              </div>
              
              <div className="card p-4">
                <p className="text-sm text-gray-500 mb-1">Intensity</p>
                <p className="inline-flex items-center">
                  <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${getIntensityColor(result.intensity_level)}`}>
                    {result.intensity_level}
                  </span>
                </p>
              </div>
              
              <div className="card p-4">
                <p className="text-sm text-gray-500 mb-1">Confidence</p>
                <p className="text-xl font-semibold text-gray-900">{result.confidence.toFixed(1)}%</p>
              </div>
              
              <div className="card p-4">
                <p className="text-sm text-gray-500 mb-1">Infection Percentage</p>
                <p className="text-xl font-semibold text-gray-900">{result.infection_percentage.toFixed(1)}%</p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Analysis Visualization</h4>
              <DiseaseCharts 
                confidence={result.confidence} 
                infectionPercentage={result.infection_percentage}
              />
            </div>
            
            {/* Recommendation Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex items-center justify-between w-full p-4 bg-green-50 hover:bg-green-100 transition-colors text-left"
                onClick={() => setIsRecommendationOpen(!isRecommendationOpen)}
              >
                <h4 className="text-lg font-semibold text-gray-900">Treatment Recommendations</h4>
                {isRecommendationOpen ? (
                  <ChevronUp className="w-5 h-5 text-green-700" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-green-700" />
                )}
              </button>
              
              {isRecommendationOpen && (
                <div className="p-4 bg-white">
                  <div className="prose max-w-none text-gray-700">
                    {formatRecommendation(result.recommendation)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;