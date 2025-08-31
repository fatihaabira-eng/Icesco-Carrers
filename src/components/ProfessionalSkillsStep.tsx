import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import SkillDisplay from '../components/SkillDisplay'; // Assuming you have this component

interface ProfessionalSkillsStepProps {
  formData: {
    technicalSkills: string[];
    managerialSkills: string[];
    technicalSkillsEvidence: { [skill: string]: File | null };
    managerialSkillsEvidence: { [skill: string]: File | null };
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const TECHNICAL_SKILL_SUGGESTIONS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'TypeScript', 
  'HTML', 'CSS', 'SQL', 'MongoDB', 'Git', 'Docker', 'Kubernetes',
  'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin'
];

const MANAGERIAL_SKILL_SUGGESTIONS = [
  'Leadership', 'Communication', 'Problem Solving', 'Team Management',
  'Project Management', 'Strategic Planning', 'Decision Making',
  'Time Management', 'Conflict Resolution', 'Negotiation',
  'Critical Thinking', 'Adaptability', 'Creativity', 'Emotional Intelligence'
];

const ProfessionalSkillsStep: React.FC<ProfessionalSkillsStepProps> = ({
  formData,
  setFormData
}) => {
  const [technicalSkillInput, setTechnicalSkillInput] = useState('');
  const [managerialSkillInput, setManagerialSkillInput] = useState('');
  const [technicalSkillSuggestions, setTechnicalSkillSuggestions] = useState<{[key: number]: string[]}>({});
  const [managerialSkillSuggestions, setManagerialSkillSuggestions] = useState<{[key: number]: string[]}>({});

  // Handle technical skill input change
  const handleTechnicalSkillInputChange = (value: string) => {
    setTechnicalSkillInput(value);
    if (value.trim()) {
      const filtered = TECHNICAL_SKILL_SUGGESTIONS.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !formData.technicalSkills.includes(skill)
      );
      setTechnicalSkillSuggestions({ 0: filtered.slice(0, 5) });
    } else {
      setTechnicalSkillSuggestions({});
    }
  };

  // Handle managerial skill input change
  const handleManagerialSkillInputChange = (value: string) => {
    setManagerialSkillInput(value);
    if (value.trim()) {
      const filtered = MANAGERIAL_SKILL_SUGGESTIONS.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !formData.managerialSkills.includes(skill)
      );
      setManagerialSkillSuggestions({ 0: filtered.slice(0, 5) });
    } else {
      setManagerialSkillSuggestions({});
    }
  };

  // Remove technical skill
  const removeTechnicalSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(s => s !== skill),
      technicalSkillsEvidence: { ...prev.technicalSkillsEvidence, [skill]: null }
    }));
  };

  // Remove managerial skill
  const removeManagerialSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      managerialSkills: prev.managerialSkills.filter(s => s !== skill),
      managerialSkillsEvidence: { ...prev.managerialSkillsEvidence, [skill]: null }
    }));
  };

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Professional Skills</h2>

      {/* Technical Skills Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Technical Skills
        </h3>
        
        {/* Technical Skill Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={technicalSkillInput}
            onChange={(e) => handleTechnicalSkillInputChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400"
            placeholder="Type a technical skill (e.g. JavaScript, Python, AWS...)"
          />
          
          {/* Technical Skill Suggestions */}
          {technicalSkillSuggestions[0] && technicalSkillSuggestions[0].length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {technicalSkillSuggestions[0].map((suggestion, suggestionIndex) => (
                <button
                  key={suggestionIndex}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      technicalSkills: [...prev.technicalSkills, suggestion]
                    }));
                    setTechnicalSkillInput('');
                    setTechnicalSkillSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[0];
                      return newSuggestions;
                    });
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700 focus:outline-none transition-colors"
                >
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Technical Skills Display */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Your Technical Skills ({formData.technicalSkills.filter(skill => skill.trim() !== '').length})
          </h4>
          
          {formData.technicalSkills.filter(skill => skill.trim() !== '').length === 0 ? (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-sm">No technical skills added yet.</p>
              <p className="text-xs text-gray-400 mt-1">Start typing to add skills</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.technicalSkills
                .filter(skill => skill.trim() !== '')
                .map((skill, index) => (
                  <SkillDisplay 
                    key={`tech-${index}`}
                    skill={skill}
                    onRemove={() => removeTechnicalSkill(skill)}
                    formData={formData}
                    setFormData={setFormData}
                    skillType="technical"
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Managerial Skills Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Managerial/Leadership Skills
        </h3>
        
        {/* Managerial Skill Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={managerialSkillInput}
            onChange={(e) => handleManagerialSkillInputChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white shadow-sm placeholder-gray-400"
            placeholder="Type a managerial skill (e.g. Leadership, Communication, Problem Solving...)"
          />

          {/* Managerial Skill Suggestions */}
          {managerialSkillSuggestions[0] && managerialSkillSuggestions[0].length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {managerialSkillSuggestions[0].map((suggestion, suggestionIndex) => (
                <button
                  key={suggestionIndex}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      managerialSkills: [...prev.managerialSkills, suggestion]
                    }));
                    setManagerialSkillInput('');
                    setManagerialSkillSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[0];
                      return newSuggestions;
                    });
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-yellow-50 hover:text-yellow-700 focus:bg-yellow-50 focus:text-yellow-700 focus:outline-none transition-colors"
                >
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Managerial Skills Display */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Your Managerial Skills ({formData.managerialSkills.filter(skill => skill.trim() !== '').length})
          </h4>

          {formData.managerialSkills.filter(skill => skill.trim() !== '').length === 0 ? (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-sm">No Managerial skills added yet.</p>
              <p className="text-xs text-gray-400 mt-1">Start typing to add skills</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.managerialSkills
                .filter(skill => skill.trim() !== '')
                .map((skill, index) => (
                  <SkillDisplay 
                    key={`man-${index}`}
                    skill={skill}
                    onRemove={() => removeManagerialSkill(skill)}
                    formData={formData}
                    setFormData={setFormData}
                    skillType="managerial"
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSkillsStep;