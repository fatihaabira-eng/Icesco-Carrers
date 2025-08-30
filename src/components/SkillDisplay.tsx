import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface SkillEvidence {
  [skill: string]: File | null;
}

interface SkillDisplayFormData {
  technicalSkillsEvidence: SkillEvidence;
  managerialSkillsEvidence: SkillEvidence;
}

interface SkillDisplayProps {
  skill: string;
  onRemove: () => void;
  formData: SkillDisplayFormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  skillType: 'technical' | 'managerial';
}

const SkillDisplay: React.FC<SkillDisplayProps> = ({ 
  skill, 
  onRemove, 
  formData, 
  setFormData, 
  skillType 
}) => {
  const badgeColor = skillType === 'technical' 
    ? 'bg-teal-100 text-teal-800 border-teal-200' 
    : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  
  const evidenceKey = skillType === 'technical' 
    ? 'technicalSkillsEvidence' 
    : 'managerialSkillsEvidence';

  // Add safety check for evidence
  const currentEvidence = formData[evidenceKey] && formData[evidenceKey][skill] 
    ? formData[evidenceKey][skill] 
    : null;

  return (
    <div className={`border rounded-lg p-4 bg-white shadow-sm ${badgeColor.includes('teal') ? 'border-teal-200' : 'border-yellow-200'}`}>
      {/* Skill Badge and Remove Button */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${badgeColor}`}>
          {skill}
        </span>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Remove skill"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Evidence Upload Section */}
      <div className="border-t pt-3">
        <h4 className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1">
          <Download className="w-3 h-3" />
          Upload Evidence (Optional)
        </h4>
        
        <div className="flex items-center gap-3">
          {/* Upload Button */}
          <label className="cursor-pointer flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-xs font-medium text-gray-700 transition">
            <Download className="w-3 h-3 mr-1" />
            {currentEvidence ? 'Change' : 'Upload'}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFormData(prev => ({
                  ...prev,
                  [evidenceKey]: {
                    ...prev[evidenceKey],
                    [skill]: file || null
                  }
                }));
              }}
            />
          </label>

          {/* File Info Display */}
          {currentEvidence && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs truncate">
                <FileText className="w-3 h-3 text-green-600 flex-shrink-0" />
                <span className="text-green-700 font-medium truncate" title={currentEvidence.name}>
                  {currentEvidence.name && currentEvidence.name.length > 15 
                    ? `${currentEvidence.name.substring(0, 15)}...` 
                    : currentEvidence.name || 'Unknown file'}
                </span>
              </div>
              
              {/* Remove Evidence Button */}
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    [evidenceKey]: {
                      ...prev[evidenceKey],
                      [skill]: null
                    }
                  }));
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove evidence"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* File Format Info */}
        <p className="text-xs text-gray-400 mt-1">
          PDF, JPG, PNG, DOC, DOCX (Max: 5MB)
        </p>
      </div>
    </div>
  );
};

export default SkillDisplay;