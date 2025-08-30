import React from 'react';
import { Link2, Plus, X } from 'lucide-react';
import InputField from './InputField';

import { SocialMedia } from "@/Types/SocialMedia";



interface SocialMediaStepProps {
  formData: {
    socialMedia: SocialMedia[];
  };
  updateSocialMediaField: (index: number, field: keyof SocialMedia, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SocialMediaStep: React.FC<SocialMediaStepProps> = ({
  formData,
  updateSocialMediaField,
  setFormData
}) => {
  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Social Media & Online Presence</h2>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Online Profiles
        </h3>
        <button
          onClick={() => setFormData((prev: any) => ({ 
            ...prev, 
            socialMedia: [...prev.socialMedia, { platform: '', url: '' }] 
          }))}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </button>
      </div>
      
      {formData.socialMedia.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
          <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No profiles added yet. Click "Add" to start.</p>
        </div>
      )}
      
      {formData.socialMedia.map((sm, index) => (
        <div key={index} className="group relative grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
          <InputField 
            label="Platform" 
            id={`platform-${index}`} 
            value={sm.platform} 
            placeholder="e.g. LinkedIn, GitHub, Twitter, Facebook, Instagram, Portfolio" 
            onChange={(field, value) => updateSocialMediaField(index, 'platform', value)} 
          />
          <InputField 
            label="URL" 
            id={`url-${index}`} 
            value={sm.url} 
            placeholder="e.g. https://linkedin.com/in/username" 
            onChange={(field, value) => updateSocialMediaField(index, 'url', value)} 
          />
          
          {formData.socialMedia.length > 1 && (
            <button
              onClick={() => setFormData({ 
                ...formData, 
                socialMedia: formData.socialMedia.filter((_, i) => i !== index) 
              })}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
              title="Remove social media entry"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialMediaStep;