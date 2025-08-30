import React from 'react';
import { BookOpen, Plus, X } from 'lucide-react';
import InputField from './InputField';

import { Reference } from "@/Types/Reference";


interface ReferencesStepProps {
  formData: {
    references: Reference[];
  };
  updateReferenceField: (index: number, field: keyof Reference, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ReferencesStep: React.FC<ReferencesStepProps> = ({
  formData,
  updateReferenceField,
  setFormData
}) => {
  // Separate function to add a new reference
  const addReference = () => {
    setFormData((prev: any) => ({ 
      ...prev, 
      references: [...prev.references, { 
        name: '', 
        title: '', 
        email: '', 
        phone: '', 
        note: '', 
        company: '', 
        companyLink: '' 
      }] 
    }));
  };

  // Separate function to remove a reference
  const removeReference = (index: number) => {
    setFormData({ 
      ...formData, 
      references: formData.references.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Professional References</h2>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> References
        </h3>
        <button
          onClick={addReference}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
        </button>
      </div>
      
      {formData.references.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No references added yet. Click "Add" to start.</p>
        </div>
      )}
      
      {formData.references.map((ref, index) => (
        <div key={index} className="group relative grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
          <InputField 
            label="Company" 
            id={`ref-company-${index}`} 
            value={ref.company} 
            placeholder="e.g. Google, Microsoft" 
            onChange={(field, value) => updateReferenceField(index, 'company', value)} 
          />
          <InputField 
            label="Company Link" 
            id={`ref-company-link-${index}`} 
            value={ref.companyLink} 
            placeholder="e.g. https://company.com" 
            onChange={(field, value) => updateReferenceField(index, 'companyLink', value)} 
          />
          <InputField 
            label="Name" 
            id={`ref-name-${index}`} 
            value={ref.name} 
            placeholder="e.g. Jane Smith" 
            onChange={(field, value) => updateReferenceField(index, 'name', value)} 
          />
          <InputField 
            label="Job Title" 
            id={`ref-title-${index}`} 
            value={ref.title} 
            placeholder="e.g. Manager" 
            onChange={(field, value) => updateReferenceField(index, 'title', value)} 
          />
          <InputField 
            label="Email" 
            id={`ref-email-${index}`} 
            type="email" 
            value={ref.email} 
            placeholder="e.g. jane.smith@company.com" 
            onChange={(field, value) => updateReferenceField(index, 'email', value)} 
          />
          <InputField 
            label="Phone" 
            id={`ref-phone-${index}`} 
            value={ref.phone} 
            placeholder="e.g. +1 234 567 890" 
            onChange={(field, value) => updateReferenceField(index, 'phone', value)} 
          />
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
            <textarea
              value={ref.note}
              onChange={e => updateReferenceField(index, 'note', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
              placeholder="Additional comments about this reference..."
              rows={3}
            />
          </div>
          
          {formData.references.length > 1 && (
            <button
              onClick={() => removeReference(index)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
              title="Remove reference entry"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReferencesStep;