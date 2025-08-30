import React from 'react';
import { BookOpen, Plus, Download, FileText, X } from 'lucide-react';
import InputField from './InputField';
import { Education } from "@/Types/Education";
import { Certification } from "@/Types/Certification";




interface EducationCertificationsStepProps {
  formData: {
    education: Education[];
    certifications: Certification[];
  };
  updateEducationField: (index: number, field: string, value: string) => void;
  updateCertificationField: (index: number, field: string, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const EducationCertificationsStep: React.FC<EducationCertificationsStepProps> = ({
  formData,
  updateEducationField,
  updateCertificationField,
  setFormData
}) => {
  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Education & Professional Certifications</h2>
      
      {/* Education Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Education
          </h3>
          <button
            onClick={() => setFormData((prev: any) => ({ 
              ...prev, 
              education: [...prev.education, { place: '', diploma: '', startDate: '', endDate: '', certificate: null }] 
            }))}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Education
          </button>
        </div>
        
        {formData.education.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No education entries added yet. Click "Add Education" to start.</p>
          </div>
        )}
        
        {formData.education.map((edu, index) => (
          <div key={index} className="group relative p-6 rounded-lg border bg-white shadow-sm mb-6">
            {/* Education Information Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <InputField 
                label="School/University" 
                id={`school-${index}`} 
                value={edu.place} 
                placeholder="Institution name" 
                onChange={(field, value) => updateEducationField(index, 'place', value)} 
              />
              <InputField 
                label="Diploma/Degree" 
                id={`diploma-${index}`} 
                value={edu.diploma} 
                placeholder="e.g. Bachelor's, Master's, PhD" 
                onChange={(field, value) => updateEducationField(index, 'diploma', value)} 
              />
              <InputField 
                label="Start Date" 
                id={`startDate-${index}`} 
                type="date" 
                value={edu.startDate} 
                onChange={(field, value) => updateEducationField(index, 'startDate', value)} 
              />
              <InputField 
                label="End Date" 
                id={`endDate-${index}`} 
                type="date" 
                value={edu.endDate} 
                onChange={(field, value) => updateEducationField(index, 'endDate', value)} 
              />
            </div>

            {/* Certificate Upload Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Upload Evidence (Optional)
              </h4>
              
              <div className="flex items-center gap-4">
                {/* Upload Button */}
                <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition">
                  <Download className="w-4 h-4 mr-2" />
                  {edu.certificate ? 'Change Diploma' : 'Upload Diploma'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const updated = [...formData.education];
                        updated[index].certificate = file;
                        setFormData({ ...formData, education: updated });
                      }
                    }}
                  />
                </label>

                {/* File Info Display */}
                {edu.certificate && (
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700 font-medium truncate max-w-[200px]">
                        {edu.certificate.name}
                      </span>
                      <span className="text-teal-600 text-xs">
                        ({(edu.certificate.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    
                    {/* Remove Certificate Button */}
                    <button
                      onClick={() => {
                        const updated = [...formData.education];
                        updated[index].certificate = null;
                        setFormData({ ...formData, education: updated });
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

            {/* Remove Education Entry Button */}
            {formData.education.length > 1 && (
              <button
                onClick={() => setFormData({ 
                  ...formData, 
                  education: formData.education.filter((_, i) => i !== index) 
                })}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
                title="Remove education entry"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Professional Certifications Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Professional Certifications
          </h3>
          <button
            onClick={() => setFormData((prev: any) => ({ 
              ...prev, 
              certifications: [...prev.certifications, { title: '', issuer: '', date: '', url: '', certificate: null }] 
            }))}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Certification
          </button>
        </div>
        
        {formData.certifications.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No certifications added yet. Click "Add Certification" to start.</p>
          </div>
        )}
        
        {formData.certifications.map((cert, index) => (
          <div key={index} className="group relative p-6 rounded-lg border bg-white shadow-sm mb-6">
            {/* Certification Information Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <InputField 
                label="Certificate Title" 
                id={`cert-title-${index}`} 
                value={cert.title} 
                placeholder="e.g. React Developer Certification" 
                onChange={(field, value) => updateCertificationField(index, 'title', value)} 
              />
              <InputField 
                label="Issuing Organization" 
                id={`cert-issuer-${index}`} 
                value={cert.issuer} 
                placeholder="e.g. Coursera, Google, Microsoft" 
                onChange={(field, value) => updateCertificationField(index, 'issuer', value)} 
              />
              <InputField 
                label="Date Received" 
                id={`cert-date-${index}`} 
                type="date" 
                value={cert.date} 
                onChange={(field, value) => updateCertificationField(index, 'date', value)} 
              />
              <InputField 
                label="Certificate URL (Optional)" 
                id={`cert-url-${index}`} 
                value={cert.url || ''} 
                placeholder="e.g. https://coursera.org/verify/123456" 
                onChange={(field, value) => updateCertificationField(index, 'url', value)} 
              />
            </div>

            {/* Certificate Upload Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Certificate File (Optional)
              </h4>
              
              <div className="flex items-center gap-4">
                {/* Upload Button */}
                <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition">
                  <Download className="w-4 h-4 mr-2" />
                  {cert.certificate ? 'Change Certificate' : 'Upload Certificate'}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const updated = [...formData.certifications];
                        updated[index].certificate = file;
                        setFormData({ ...formData, certifications: updated });
                      }
                    }}
                  />
                </label>

                {/* File Info Display */}
                {cert.certificate && (
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-teal-700 font-medium truncate max-w-[200px]">
                        {cert.certificate.name}
                      </span>
                      <span className="text-teal-600 text-xs">
                        ({(cert.certificate.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    
                    {/* Remove Certificate Button */}
                    <button
                      onClick={() => {
                        const updated = [...formData.certifications];
                        updated[index].certificate = null;
                        setFormData({ ...formData, certifications: updated });
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

            {/* Remove Certification Entry Button */}
            {formData.certifications.length > 1 && (
              <button
                onClick={() => setFormData({ 
                  ...formData, 
                  certifications: formData.certifications.filter((_, i) => i !== index) 
                })}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
                title="Remove certification entry"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationCertificationsStep;