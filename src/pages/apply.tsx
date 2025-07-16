import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

interface Education {
  place: string;
  diploma: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  cv: File | null;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    dateOfBirth: '',
    address: '',
    education: [],
    experience: [],
    skills: [],
    cv: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);
  const [cvExtraStep, setCvExtraStep] = useState(false);
  const [extraAnswers, setExtraAnswers] = useState({ yearsExperience: '', desiredPosition: '' });

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Education' },
    { number: 3, title: 'Experience' },
    { number: 4, title: 'Skills' },
    { number: 5, title: 'Upload CV' },
    { number: 6, title: 'Review' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEducationField = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const updateExperienceField = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== '' &&
          formData.nationality.trim() !== '' &&
          formData.dateOfBirth.trim() !== '' &&
          formData.address.trim() !== ''
        );
      case 2:
        return (
          formData.education.length > 0 &&
          formData.education.every(
            edu => edu.place.trim() !== '' && edu.diploma.trim() !== '' && edu.startDate.trim() !== '' && edu.endDate.trim() !== ''
          )
        );
      case 3:
        return (
          formData.experience.length > 0 &&
          formData.experience.every(
            exp => exp.company.trim() !== '' && exp.jobTitle.trim() !== '' && exp.startDate.trim() !== '' && exp.endDate.trim() !== '' && exp.description.trim() !== ''
          )
        );
      case 4:
        return (
          formData.skills.length > 0 &&
          formData.skills.every(skill => skill.trim() !== '')
        );
      case 5:
        return formData.cv !== null;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  function extractInfoFromText(text: string) {
    const nameMatch = text.match(/Name[:\s]+([A-Za-z\s]+)/i);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/\+?\d[\d\s\-()]{7,}/);
    const education = text.match(/Education[\s\S]*?(?=Experience|Skills|$)/i)?.[0] || '';
    const experience = text.match(/Experience[\s\S]*?(?=Education|Skills|$)/i)?.[0] || '';
    const skills = text.match(/Skills[\s\S]*?(?=Education|Experience|$)/i)?.[0] || '';
    return {
      fullName: nameMatch ? nameMatch[1].trim() : '',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
      education: education ? [{ place: education, diploma: '', startDate: '', endDate: '' }] : [],
      experience: experience ? [{ company: experience, jobTitle: '', startDate: '', endDate: '', description: '' }] : [],
      skills: skills ? skills.split(/,|\n/).map(s => s.trim()).filter(Boolean) : [],
    };
  }

  async function handleCvFile(file: File) {
    setCvParsing(true);
    setCvParseError(null);
    setTimeout(() => {
      const fakeInfo = {
        fullName: "John Doe",
        email: "john.doe@email.com",
        phone: "+212 600 123 456",
        nationality: "Moroccan",
        dateOfBirth: "1990-01-01",
        address: "123 Main St, Rabat, Morocco",
        education: [
          { place: "Université Mohammed V", diploma: "Master en Informatique", startDate: "2012-09-01", endDate: "2014-06-30" }
        ],
        experience: [
          { company: "TechCorp", jobTitle: "Software Engineer", startDate: "2015-01-01", endDate: "2020-12-31", description: "Développement d'applications web." }
        ],
        skills: ["JavaScript", "React", "Node.js"],
        cv: file,
      };
      setFormData(prev => ({ ...prev, ...fakeInfo }));
      setCvParsing(false);
      setCvExtraStep(true);
    }, 1500);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <InputField label="Full Name" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" />
              <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" />
              <InputField label="Phone Number" id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="e.g. +212 600 123 456" />
              <InputField label="Nationality" id="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="e.g. Moroccan" />
              <InputField label="Date of Birth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-gray-50 resize-none" rows={3} placeholder="Enter your full address" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-600">Education</h2>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    education: [...prev.education, { place: '', diploma: '', startDate: '', endDate: '' }],
                  }))
                }
                className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </button>
            </div>

            {formData.education.length === 0 && <p className="text-gray-500 text-center py-4">No education added yet.</p>}

            {formData.education.map((edu, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                <InputField label="School" id={`school-${index}` as keyof FormData} value={edu.place} placeholder="School/University" onChange={(_, value) => updateEducationField(index, 'place', value)} />
                <InputField label="Diploma" id={`diploma-${index}` as keyof FormData} value={edu.diploma} placeholder="e.g. Bachelor's, Master's" onChange={(_, value) => updateEducationField(index, 'diploma', value)} />
                <InputField label="Start Date" id={`startDate-${index}` as keyof FormData} type="date" value={edu.startDate} onChange={(_, value) => updateEducationField(index, 'startDate', value)} />
                <InputField label="End Date" id={`endDate-${index}` as keyof FormData} type="date" value={edu.endDate} onChange={(_, value) => updateEducationField(index, 'endDate', value)} />
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => {
                      const filtered = formData.education.filter((_, i) => i !== index);
                      setFormData({ ...formData, education: filtered });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-600">Experience</h2>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: [
                      ...prev.experience,
                      { company: '', jobTitle: '', startDate: '', endDate: '', description: '' },
                    ],
                  }))
                }
                className="flex items-center px-4 py-2 bg-[#0e7378] hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </button>
            </div>
            {formData.experience.length === 0 && <p className="text-gray-500 text-center py-4">No experience added yet.</p>}
            {formData.experience.map((exp, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                <InputField label="Company" id={`company-${index}` as keyof FormData} value={exp.company} placeholder="Company Name" onChange={(_, value) => updateExperienceField(index, 'company', value)} />
                <InputField label="Job Title" id={`jobTitle-${index}` as keyof FormData} value={exp.jobTitle} placeholder="e.g. Software Engineer" onChange={(_, value) => updateExperienceField(index, 'jobTitle', value)} />
                <InputField label="Start Date" id={`startDate-exp-${index}` as keyof FormData} type="date" value={exp.startDate} onChange={(_, value) => updateExperienceField(index, 'startDate', value)} />
                <InputField label="End Date" id={`endDate-exp-${index}` as keyof FormData} type="date" value={exp.endDate} onChange={(_, value) => updateExperienceField(index, 'endDate', value)} />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={e => updateExperienceField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    placeholder="Describe your responsibilities, achievements, etc."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => {
                      const filtered = formData.experience.filter((_, i) => i !== index);
                      setFormData({ ...formData, experience: filtered });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-600">Skills</h2>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, ''],
                  }))
                }
                className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                <Plus className="w-4 h-4 mr-2" /> Add
              </button>
            </div>
            {formData.skills.length === 0 && <p className="text-gray-500 text-center py-4">No skills added yet.</p>}
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border">
                <input
                  type="text"
                  value={skill}
                  onChange={e => updateSkill(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white"
                  placeholder="Skill"
                />
                <button
                  onClick={() => {
                    const filtered = formData.skills.filter((_, i) => i !== index);
                    setFormData({ ...formData, skills: filtered });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Upload CV</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <label htmlFor="cv-upload" className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow transition mb-4">
                {formData.cv ? 'Change CV' : 'Select CV'}
              </label>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  setFormData({ ...formData, cv: file || null });
                }}
              />
              {formData.cv && (
                <div className="mt-4 text-teal-700 font-medium">{formData.cv.name}</div>
              )}
              <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX</div>
            </div>
          </div>
        );

      case 6:
        if (submitted) {
          return (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 text-center max-w-md">
                Thank you for your application. We will review your information and contact you soon.
              </p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Review Your Application</h2>
            <div className="bg-gray-50 rounded-lg p-6 border space-y-6">
              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-800">
                  <div><span className="font-semibold">Full Name:</span> {formData.fullName || '-'}</div>
                  <div><span className="font-semibold">Email:</span> {formData.email || '-'}</div>
                  <div><span className="font-semibold">Phone:</span> {formData.phone || '-'}</div>
                  <div><span className="font-semibold">Nationality:</span> {formData.nationality || '-'}</div>
                  <div><span className="font-semibold">Date of Birth:</span> {formData.dateOfBirth || '-'}</div>
                  <div><span className="font-semibold">Address:</span> {formData.address || '-'}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Education</h3>
                {formData.education.length === 0 ? (
                  <div className="text-gray-500">No education provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.education.map((edu, idx) => (
                      <li key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Institution:</span> {edu.place || '-'}</div>
                          <div><span className="font-semibold">Diploma:</span> {edu.diploma || '-'}</div>
                          <div><span className="font-semibold">From:</span> {edu.startDate || '-'}</div>
                          <div><span className="font-semibold">To:</span> {edu.endDate || '-'}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Experience</h3>
                {formData.experience.length === 0 ? (
                  <div className="text-gray-500">No experience provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.experience.map((exp, idx) => (
                      <li key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Company:</span> {exp.company || '-'}</div>
                          <div><span className="font-semibold">Position:</span> {exp.jobTitle || '-'}</div>
                          <div><span className="font-semibold">From:</span> {exp.startDate || '-'}</div>
                          <div><span className="font-semibold">To:</span> {exp.endDate || '-'}</div>
                        </div>
                        {exp.description && (
                          <div className="mt-2">
                            <span className="font-semibold">Description:</span>
                            <p className="text-gray-700 mt-1">{exp.description}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Skills</h3>
                {formData.skills.length === 0 ? (
                  <div className="text-gray-500">No skills provided.</div>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <li key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">CV</h3>
                {formData.cv ? (
                  <div className="text-teal-700 font-medium">{formData.cv.name}</div>
                ) : (
                  <div className="text-gray-500">No CV uploaded.</div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* CV Upload Button at the top */}
        {currentStep === 1 && (
          <div className="text-center mb-8">
            <label className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium shadow-md transition cursor-pointer">
              <Download className="w-5 h-5 mr-2" />
              {cvParsing ? 'Parsing CV...' : 'Apply using CV'}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (file) handleCvFile(file);
                }}
              />
            </label>
            {cvParseError && <div className="text-red-600 mt-2 text-sm">{cvParseError}</div>}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Stepper Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl font-bold text-gray-800">Job Application Form</h1>
              <div className="text-sm font-medium text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-center">
                <nav className="flex items-center space-x-4">
                  {steps.map((step) => (
                    <div key={step.number} className="flex flex-col items-center">
                      <button
                        onClick={() => setCurrentStep(step.number)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition
                          ${currentStep === step.number 
                            ? 'bg-teal-600 text-white border-2 border-teal-600'
                            : currentStep > step.number
                              ? 'bg-teal-100 text-teal-600 border-2 border-teal-200'
                              : 'bg-white text-gray-400 border-2 border-gray-300'}`}
                      >
                        {step.number}
                      </button>
                      <span className={`mt-2 text-xs font-medium ${currentStep >= step.number ? 'text-teal-600' : 'text-gray-400'}`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-teal-600 hover:bg-teal-50'}`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex items-center px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : !submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                >
                  Submit Application
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Additional Info Modal */}
        {cvExtraStep && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-teal-700 mb-4">Additional Information</h3>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Years of Experience</label>
                <input 
                  type="number" 
                  min="0" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  value={extraAnswers.yearsExperience} 
                  onChange={e => setExtraAnswers(a => ({ ...a, yearsExperience: e.target.value }))} 
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Desired Position</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  value={extraAnswers.desiredPosition} 
                  onChange={e => setExtraAnswers(a => ({ ...a, desiredPosition: e.target.value }))} 
                />
              </div>
              <button 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg transition"
                onClick={() => { setCvExtraStep(false); setCurrentStep(2); }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Input Field Component
interface InputFieldProps {
  label: string;
  id: keyof FormData;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (field: keyof FormData, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text', value, placeholder, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white"
      placeholder={placeholder}
    />
  </div>
);

export default MultiStepForm;