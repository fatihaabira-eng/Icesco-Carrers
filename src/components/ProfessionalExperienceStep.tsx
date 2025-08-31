import React from 'react';
import { Briefcase, Plus, Download, FileText, X, CheckCircle } from 'lucide-react';
import InputField from './InputField';

import { Experience } from "@/Types/Experience";



interface ProfessionalExperienceStepProps {
  formData: {
    experience: Experience[];
  };
  updateExperienceField: (index: number, field: keyof Experience, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ACHIEVEMENT_TYPES = [
  { value: 'report', label: 'Performance Report' },
  { value: 'acknowledgment', label: 'Acknowledgment Letter' },
  { value: 'certificate', label: 'Thank You Certificate' },
  { value: 'press', label: 'Press Coverage' }
];

const ProfessionalExperienceStep: React.FC<ProfessionalExperienceStepProps> = ({
  formData,
  updateExperienceField,
  setFormData
}) => {
  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Professional Experience</h2>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Work History
        </h3>
        <button
          onClick={() => setFormData((prev: any) => ({ 
            ...prev, 
            experience: [...prev.experience, { 
              company: '', 
              jobTitle: '', 
              startDate: '', 
              endDate: '', 
              description: '', 
              achievements: '', 
              achievementType: '',
              achievementFile: null,
              achievementLink: '',
              current: false 
            }] 
          }))}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </button>
      </div>
      
      {formData.experience.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No work experience added yet. Click "Add" to start.</p>
        </div>
      )}
      
      {formData.experience.map((exp, index) => (
        <div key={index} className="group relative grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
          <InputField 
            label="Company" 
            id={`company-${index}`} 
            value={exp.company} 
            placeholder="Company Name" 
            onChange={(field, value) => updateExperienceField(index, 'company', value)} 
          />
          <InputField 
            label="Job Title" 
            id={`jobTitle-${index}`} 
            value={exp.jobTitle} 
            placeholder="e.g. Software Engineer" 
            onChange={(field, value) => updateExperienceField(index, 'jobTitle', value)} 
          />
          <InputField 
            label="Start Date" 
            id={`startDate-exp-${index}`} 
            type="date" 
            value={exp.startDate} 
            onChange={(field, value) => updateExperienceField(index, 'startDate', value)} 
          />
          
          <div className="space-y-2">
            {exp.current ? (
              <div className="relative">
                <div className="w-full px-4 py-3 pt-7 pb-1 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 shadow-sm">
                  Currently
                </div>
                <label className="absolute left-4 top-2 text-xs text-teal-600 font-medium pointer-events-none">
                  End Date
                </label>
              </div>
            ) : (
              <InputField 
                label="End Date" 
                id={`endDate-exp-${index}`} 
                type="date" 
                value={exp.endDate} 
                onChange={(field, value) => updateExperienceField(index, 'endDate', value)}
              />
            )}
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => {
                  const updatedExperience = [...formData.experience];
                  updatedExperience[index].current = e.target.checked;
                  if (e.target.checked) {
                    updatedExperience[index].endDate = 'Currently';
                  } else {
                    updatedExperience[index].endDate = '';
                  }
                  setFormData({ ...formData, experience: updatedExperience });
                }}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="text-gray-600">I currently work here</span>
            </label>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Tasks</label>
            <textarea
              value={exp.description}
              onChange={e => updateExperienceField(index, 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
              placeholder="Job description ..."
              rows={4}
            />
          </div>
          
          {/* Major Achievements Section */}
          <div className="col-span-2 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              Major Achievements
            </h4>

            {/* Achievement Type Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Evidence Type</label>
              <select
                value={exp.achievementType || ''}
                onChange={e => updateExperienceField(index, 'achievementType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
              >
                <option value="">Select evidence type...</option>
                {ACHIEVEMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Input based on Achievement Type */}
            {exp.achievementType && exp.achievementType !== 'press' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {exp.achievementType === 'report' && 'Upload Report'}
                  {exp.achievementType === 'acknowledgment' && 'Upload Acknowledgment Letter'}
                  {exp.achievementType === 'certificate' && 'Upload Thank You Certificate'}
                </label>
                
                <div className="flex items-center gap-4">
                  {/* Upload Button */}
                  <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition">
                    <Download className="w-4 h-4 mr-2" />
                    {exp.achievementFile ? 'Change File' : 'Upload File'}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const updated = [...formData.experience];
                          updated[index].achievementFile = file;
                          setFormData({ ...formData, experience: updated });
                        }
                      }}
                    />
                  </label>

                  {/* File Info Display */}
                  {exp.achievementFile && (
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm">
                        <FileText className="w-4 h-4 text-teal-600" />
                        <span className="text-teal-700 font-medium truncate max-w-[200px]">
                          {exp.achievementFile.name}
                        </span>
                        <span className="text-teal-600 text-xs">
                          ({(exp.achievementFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      </div>
                      
                      {/* Remove File Button */}
                      <button
                        onClick={() => {
                          const updated = [...formData.experience];
                          updated[index].achievementFile = null;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* File Format Info */}
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max: 10MB)
                </p>
              </div>
            )}

            {/* Press Links Input */}
            {exp.achievementType === 'press' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Press Link</label>
                <input
                  type="url"
                  value={exp.achievementLink || ''}
                  onChange={e => updateExperienceField(index, 'achievementLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400"
                  placeholder="https://example.com/press-article"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the URL of the press article or news coverage about your achievement
                </p>
              </div>
            )}
          </div>

          {/* Remove Experience Entry Button */}
          {formData.experience.length > 1 && (
            <button
              onClick={() => setFormData({ 
                ...formData, 
                experience: formData.experience.filter((_, i) => i !== index) 
              })}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
              title="Remove experience entry"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfessionalExperienceStep;