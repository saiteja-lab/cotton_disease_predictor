import React, { useState } from 'react';
import { 
  RefreshCw, 
  Sprout, 
  CalendarDays, 
  Droplets, 
  Bug, 
  ChevronRight, 
  ChevronDown
} from 'lucide-react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="card">
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

const AgricultureInfo: React.FC = () => {
  return (
    <section id="info" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Agriculture Knowledge Hub</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expand your farming knowledge with our comprehensive guides on crop rotation,
              seasonal planting, soil health, and pest management.
            </p>
          </div>
          
          <div className="space-y-6">
            <InfoCard 
              title="Crop Rotation Benefits" 
              icon={<RefreshCw className="w-5 h-5 text-green-600" />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Crop rotation is the practice of growing different types of crops in the same area across seasons. 
                  It's one of the oldest and most effective agricultural control strategies.
                </p>
                
                <h4 className="font-semibold text-gray-800">Key Benefits:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Reduces soil erosion and increases soil fertility and crop yield</li>
                  <li>Prevents pest and disease build-up in the soil</li>
                  <li>Improves soil structure and nutrient content</li>
                  <li>Decreases reliance on synthetic fertilizers</li>
                  <li>Manages weed populations more effectively</li>
                </ul>
                
                <h4 className="font-semibold text-gray-800">Recommended Cotton Rotation Sequence:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Year 1:</span> Cotton</li>
                  <li><span className="font-medium">Year 2:</span> Legumes (soybeans, peanuts)</li>
                  <li><span className="font-medium">Year 3:</span> Cereal crops (corn, sorghum)</li>
                  <li><span className="font-medium">Year 4:</span> Return to cotton</li>
                </ol>
              </div>
            </InfoCard>
            
            <InfoCard 
              title="Seasonal Crop Guide" 
              icon={<CalendarDays className="w-5 h-5 text-green-600" />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Understanding the optimal planting seasons for different crops is essential for successful farming.
                  Here's a guide to the three main cropping seasons in India and suitable crops for each:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800">Kharif (Monsoon Crops)</h4>
                    <p className="text-sm text-gray-600 mb-2">June to October</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Cotton</li>
                      <li>• Rice</li>
                      <li>• Maize</li>
                      <li>• Soybeans</li>
                      <li>• Groundnuts</li>
                      <li>• Sugarcane</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800">Rabi (Winter Crops)</h4>
                    <p className="text-sm text-gray-600 mb-2">October to March</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Wheat</li>
                      <li>• Barley</li>
                      <li>• Mustard</li>
                      <li>• Peas</li>
                      <li>• Chickpeas</li>
                      <li>• Linseed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800">Zaid (Summer Crops)</h4>
                    <p className="text-sm text-gray-600 mb-2">March to June</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Watermelon</li>
                      <li>• Muskmelon</li>
                      <li>• Cucumber</li>
                      <li>• Vegetables</li>
                      <li>• Fodder crops</li>
                    </ul>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-800">Cotton Planting Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Best planted during the Kharif season</li>
                  <li>Requires temperature between 21-30°C</li>
                  <li>Needs 150-200 days to mature</li>
                  <li>Ideally planted when monsoon is established</li>
                </ul>
              </div>
            </InfoCard>
            
            <InfoCard 
              title="Healthy Soil Practices" 
              icon={<Sprout className="w-5 h-5 text-green-600" />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Soil health is foundational to successful farming. Maintaining soil quality 
                  ensures sustainable crop production and long-term agricultural productivity.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card p-4 h-full">
                    <h4 className="font-semibold text-gray-800 mb-2">Soil Testing</h4>
                    <p className="text-sm text-gray-700">
                      Regular soil testing is crucial for understanding nutrient levels and pH balance.
                      It helps determine precise fertilization needs, preventing both under and over-application.
                      For cotton, maintain soil pH between 6.0-7.0 for optimal growth.
                    </p>
                  </div>
                  
                  <div className="card p-4 h-full">
                    <h4 className="font-semibold text-gray-800 mb-2">Organic Matter</h4>
                    <p className="text-sm text-gray-700">
                      Incorporate organic matter like compost, manure, and cover crops to improve
                      soil structure, increase microbial activity, and enhance nutrient retention.
                      For cotton fields, aim for 2-5% organic matter content.
                    </p>
                  </div>
                  
                  <div className="card p-4 h-full">
                    <h4 className="font-semibold text-gray-800 mb-2">Conservation Tillage</h4>
                    <p className="text-sm text-gray-700">
                      Reduce tillage operations to minimize soil disturbance, prevent erosion,
                      and preserve beneficial soil organisms. No-till or minimum tillage practices
                      are particularly beneficial for cotton cultivation.
                    </p>
                  </div>
                  
                  <div className="card p-4 h-full">
                    <h4 className="font-semibold text-gray-800 mb-2">Cover Crops</h4>
                    <p className="text-sm text-gray-700">
                      Plant cover crops between cotton seasons to protect soil, fix nitrogen,
                      suppress weeds, and improve soil biology. Legumes like clover or vetch
                      are excellent choices to precede cotton planting.
                    </p>
                  </div>
                </div>
              </div>
            </InfoCard>
            
            <InfoCard 
              title="Pest Management Strategies" 
              icon={<Bug className="w-5 h-5 text-green-600" />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Integrated Pest Management (IPM) combines different pest control approaches to minimize
                  economic damage while reducing reliance on chemical pesticides.
                </p>
                
                <h4 className="font-semibold text-gray-800">Common Cotton Pests:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li><span className="font-medium">Bollworms:</span> Feed on cotton squares and bolls</li>
                  <li><span className="font-medium">Aphids:</span> Suck sap from leaves and stems</li>
                  <li><span className="font-medium">Whiteflies:</span> Cause yellowing and reduce vigor</li>
                  <li><span className="font-medium">Spider Mites:</span> Create stippling on leaves</li>
                  <li><span className="font-medium">Thrips:</span> Damage young seedlings</li>
                </ul>
                
                <h4 className="font-semibold text-gray-800">IPM Strategies for Cotton:</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-medium text-green-800">Cultural Control</p>
                    <p className="text-sm text-gray-700">
                      Crop rotation, field sanitation, timely planting and harvesting, 
                      trap crops, and resistant varieties.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-800">Biological Control</p>
                    <p className="text-sm text-gray-700">
                      Encourage natural enemies like ladybugs, lacewings, predatory bugs,
                      and parasitic wasps. Consider releasing beneficial insects when necessary.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="font-medium text-amber-800">Monitoring</p>
                    <p className="text-sm text-gray-700">
                      Regular field scouting to identify pests early. Use pheromone traps
                      to monitor adult populations and determine treatment thresholds.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-medium text-purple-800">Chemical Control</p>
                    <p className="text-sm text-gray-700">
                      Use selective pesticides only when necessary and at recommended rates.
                      Rotate different chemical classes to prevent resistance development.
                    </p>
                  </div>
                </div>
              </div>
            </InfoCard>
            
            <InfoCard 
              title="Water Management" 
              icon={<Droplets className="w-5 h-5 text-green-600" />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Efficient water management is critical for cotton production, balancing the crop's
                  water needs while conserving this precious resource.
                </p>
                
                <h4 className="font-semibold text-gray-800">Cotton Water Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Requires 700-1300mm of water throughout the growing season</li>
                  <li>Most critical water need is during flowering and boll development</li>
                  <li>Sensitive to both waterlogging and drought stress</li>
                </ul>
                
                <h4 className="font-semibold text-gray-800">Irrigation Techniques:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="card p-4">
                    <h5 className="font-medium text-gray-800 mb-1">Drip Irrigation</h5>
                    <p className="text-sm text-gray-700">
                      Delivers water directly to the root zone, minimizing evaporation and runoff.
                      Highly efficient, saving 30-50% water compared to conventional methods.
                    </p>
                  </div>
                  
                  <div className="card p-4">
                    <h5 className="font-medium text-gray-800 mb-1">Furrow Irrigation</h5>
                    <p className="text-sm text-gray-700">
                      Water flows between rows in small channels. Less expensive but less efficient
                      than drip. Best suited for flat land with good drainage.
                    </p>
                  </div>
                  
                  <div className="card p-4">
                    <h5 className="font-medium text-gray-800 mb-1">Sprinkler Systems</h5>
                    <p className="text-sm text-gray-700">
                      Provides more uniform coverage than furrow irrigation. Better for 
                      germination and young plants. Moderate water efficiency.
                    </p>
                  </div>
                  
                  <div className="card p-4">
                    <h5 className="font-medium text-gray-800 mb-1">Deficit Irrigation</h5>
                    <p className="text-sm text-gray-700">
                      Strategic approach where some water stress is allowed during less sensitive
                      growth stages to improve water use efficiency.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Water Conservation Tips:</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Monitor soil moisture using sensors to irrigate only when necessary</li>
                    <li>• Apply mulch to reduce evaporation from soil surface</li>
                    <li>• Schedule irrigation during cooler parts of the day</li>
                    <li>• Maintain irrigation systems to prevent leaks and ensure uniformity</li>
                    <li>• Consider rainwater harvesting for supplemental irrigation</li>
                  </ul>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgricultureInfo;