import React, { useState } from 'react';
import { BookOpen, Plus, Download, FileText, X } from 'lucide-react';

import { Language } from "@/Types/Language";

interface LanguagesStepProps {
  formData: {
    languages: Language[];
  };
  updateLanguageField: (index: number, field: keyof Language, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const LANGUAGE_SUGGESTIONS = [
  'English', 'French', 'Arabic', 'Spanish', 'German', 'Chinese', 
  'Japanese', 'Russian', 'Portuguese', 'Italian', 'Dutch', 'Turkish',
  'Hindi', 'Bengali', 'Urdu', 'Persian', 'Swahili', 'Korean', 'Vietnamese'
];

const LanguagesStep: React.FC<LanguagesStepProps> = ({
  formData,
  updateLanguageField,
  setFormData
}) => {
  const [languageSuggestions, setLanguageSuggestions] = useState<{[key: number]: string[]}>({});

  // Handle language input change and show suggestions
  const handleLanguageInputChange = (index: number, value: string) => {
    updateLanguageField(index, 'language', value);
    if (value.trim()) {
      const filtered = LANGUAGE_SUGGESTIONS.filter(lang =>
        lang.toLowerCase().includes(value.toLowerCase()) &&
        !formData.languages.some(l => l.language === lang)
      );
      setLanguageSuggestions({ [index]: filtered.slice(0, 5) });
    } else {
      setLanguageSuggestions(prev => {
        const newSuggestions = { ...prev };
        delete newSuggestions[index];
        return newSuggestions;
      });
    }
  };

  // Clear suggestions for a specific language input
  const clearLanguageSuggestions = (index: number) => {
    setTimeout(() => {
      setLanguageSuggestions(prev => {
        const newSuggestions = { ...prev };
        delete newSuggestions[index];
        return newSuggestions;
      });
    }, 200);
  };

  // Select a language suggestion
  const selectLanguageSuggestion = (index: number, suggestion: string) => {
    updateLanguageField(index, 'language', suggestion);
    setLanguageSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[index];
      return newSuggestions;
    });
  };

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Languages</h2>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Languages
          </h3>
          <button
            onClick={() => setFormData((prev: any) => ({ 
              ...prev, 
              languages: [...prev.languages, { language: '', level: '', learnedFrom: '', certificate: null }] 
            }))}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Language
          </button>
        </div>
        
        {formData.languages.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No languages added yet. Click "Add Language" to start.</p>
          </div>
        )}
        
        {formData.languages.map((language, index) => (
          <div key={index} className="group relative p-6 rounded-lg border bg-white shadow-sm mb-6">
            {/* Language Information Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Language Input with Autocomplete */}
              <div className="relative">
                <input
                  type="text"
                  value={language.language}
                  onChange={e => handleLanguageInputChange(index, e.target.value)}
                  onBlur={() => clearLanguageSuggestions(index)}
                  className="w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent"
                  placeholder="e.g. English, French, Arabic..."
                />
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  language.language 
                    ? 'top-2 text-xs text-teal-600 font-medium' 
                    : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
                } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium`}>
                  Language
                </label>
                {/* Language Autocomplete Suggestions */}
                {languageSuggestions[index] && languageSuggestions[index].length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {languageSuggestions[index].map((suggestion, suggestionIndex) => (
                      <button
                        key={suggestionIndex}
                        type="button"
                        onClick={() => selectLanguageSuggestion(index, suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700 focus:outline-none transition-colors"
                      >
                        <span className="font-medium">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Proficiency Level */}
              <div className="relative">
                <select
                  value={language.level}
                  onChange={e => updateLanguageField(index, 'level', e.target.value)}
                  className="w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer"
                >
                  <option value=""></option>
                  <option value="Beginner">Beginner (A1)</option>
                  <option value="Elementary">Elementary (A2)</option>
                  <option value="Intermediate">Intermediate (B1)</option>
                  <option value="Upper Intermediate">Upper Intermediate (B2)</option>
                  <option value="Advanced">Advanced (C1)</option>
                  <option value="Proficient">Proficient (C2)</option>
                  <option value="Native">Native</option>
                </select>
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  language.level 
                    ? 'top-2 text-xs text-teal-600 font-medium' 
                    : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
                } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium`}>
                  Proficiency Level
                </label>
              </div>

              {/* Placeholder for grid alignment */}
              <div></div>
            </div>

            {/* Language Certificate Upload Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Upload certificate if available (Optional)
              </h4>
              
              <div className="flex items-center gap-4">
                {/* Upload Button */}
                <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition">
                  <Download className="w-4 h-4 mr-2" />
                  {language.certificate ? 'Change Certificate' : 'Upload Certificate'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const updated = [...formData.languages];
                        updated[index].certificate = file;
                        setFormData({ ...formData, languages: updated });
                      }
                    }}
                  />
                </label>

                {/* File Info Display */}
                {language.certificate && (
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700 font-medium truncate max-w-[200px]">
                        {language.certificate.name}
                      </span>
                      <span className="text-teal-600 text-xs">
                        ({(language.certificate.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    
                    {/* Remove Certificate Button */}
                    <button
                      onClick={() => {
                        const updated = [...formData.languages];
                        updated[index].certificate = null;
                        setFormData({ ...formData, languages: updated });
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition"
                      title="Remove certificate"
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
            
            {/* Remove Language Entry Button */}
            {formData.languages.length > 1 && (
              <button
                onClick={() => setFormData({ 
                  ...formData, 
                  languages: formData.languages.filter((_, i) => i !== index) 
                })}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
                title="Remove language entry"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
        
        {/* Language Summary Badges */}
        {formData.languages.filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '').length > 0 && (
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Your Languages Summary
            </h4>
            <div className="space-y-2">
              {formData.languages
                .filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '')
                .map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                        <span>{lang.language} - {lang.level}</span>
                      </div>
                      {lang.learnedFrom && (
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {lang.learnedFrom}
                        </span>
                      )}
                      {lang.certificate && (
                        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Certified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        const newLanguages = formData.languages.filter(l => l !== lang);
                        if (newLanguages.length === 0) {
                          newLanguages.push({ language: '', level: '', learnedFrom: '', certificate: null });
                        }
                        setFormData({ ...formData, languages: newLanguages });
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Remove language"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesStep;