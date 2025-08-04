import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus, Link2, CheckCircle, Info, BookOpen, Briefcase, X } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate } from 'react-router-dom';

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
  achievements: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

interface Reference {
  name: string;
  title: string;
  email: string;
  note?: string;
}

interface SocialMedia {
  platform: string;
  url: string;
}

interface FormData {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  education: Education[];
  certifications: Certification[];
  experience: Experience[];
  skills: string[];
  socialMedia: SocialMedia[];
  practicalExperience: string;
  references: Reference[];
  cv: File | null;
  videoIntroSubmitted: boolean;
}

const countryCodes = [
  { code: '+1', name: 'United States', iso: 'US' },
  { code: '+44', name: 'United Kingdom', iso: 'GB' },
  { code: '+33', name: 'France', iso: 'FR' },
  { code: '+49', name: 'Germany', iso: 'DE' },
  { code: '+212', name: 'Morocco', iso: 'MA' },
  { code: '+966', name: 'Saudi Arabia', iso: 'SA' },
  { code: '+971', name: 'UAE', iso: 'AE' },
  { code: '+20', name: 'Egypt', iso: 'EG' },
  { code: '+216', name: 'Tunisia', iso: 'TN' },
  { code: '+213', name: 'Algeria', iso: 'DZ' },
];

const MultiStepForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneCountryCode: '+212',
    phoneNumber: '',
    nationality: '',
    dateOfBirth: '',
    address: '',
    education: [{ place: '', diploma: '', startDate: '', endDate: '' }],
    certifications: [{ title: '', issuer: '', date: '', url: '' }],
    experience: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '' }],
    skills: [''],
    socialMedia: [{ platform: '', url: '' }],
    practicalExperience: '',
    references: [{ name: '', title: '', email: '', note: '' }],
    cv: null,
    videoIntroSubmitted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Education & Certifications' },
    { number: 3, title: 'Professional Experience' },
    { number: 4, title: 'Skills & Practical Experience' },
    { number: 5, title: 'Social Media & Online Presence' },
    { number: 6, title: 'References' },
    { number: 7, title: 'Supporting Documents' },
    { number: 8, title: 'Video Introduction' },
    { number: 9, title: 'Review & Submit' },
  ];

  // Auto-scroll to current step
  useEffect(() => {
    if (stepsRef.current) {
      const currentStepElement = stepsRef.current.children[currentStep - 1] as HTMLElement;
      if (currentStepElement) {
        stepsRef.current.scrollTo({
          left: currentStepElement.offsetLeft - stepsRef.current.offsetWidth / 2 + currentStepElement.offsetWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEducationField = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const updateCertificationField = (index: number, field: keyof Certification, value: string) => {
    const updated = [...formData.certifications];
    updated[index][field] = value;
    setFormData({ ...formData, certifications: updated });
  };

  const updateExperienceField = (index: number, field: keyof Experience, value: string) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData({ ...formData, experience: updated });
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const updateSocialMediaField = (index: number, field: keyof SocialMedia, value: string) => {
    const updated = [...formData.socialMedia];
    updated[index][field] = value;
    setFormData({ ...formData, socialMedia: updated });
  };

  const updateReferenceField = (index: number, field: keyof Reference, value: string) => {
    const updated = [...formData.references];
    updated[index][field] = value;
    setFormData({ ...formData, references: updated });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phoneNumber.trim() !== '' &&
          formData.nationality.trim() !== '' &&
          formData.dateOfBirth.trim() !== '' &&
          formData.address.trim() !== ''
        );
      case 2:
        return (
          formData.education.length > 0 &&
          formData.education.every(
            edu => edu.place.trim() !== '' && edu.diploma.trim() !== '' && edu.startDate.trim() !== '' && edu.endDate.trim() !== ''
          ) &&
          formData.certifications.every(
            cert => cert.title.trim() !== '' && cert.issuer.trim() !== '' && cert.date.trim() !== ''
          )
        );
      case 3:
        return (
          formData.experience.length > 0 &&
          formData.experience.every(
            exp => exp.company.trim() !== '' && exp.jobTitle.trim() !== '' && exp.startDate.trim() !== '' && exp.endDate.trim() !== '' && exp.description.trim() !== '' && exp.achievements.trim() !== ''
          )
        );
      case 4:
        return (
          formData.skills.length > 0 &&
          formData.skills.every(skill => skill.trim() !== '') &&
          formData.practicalExperience.trim() !== ''
        );
      case 5:
        return (
          formData.socialMedia.length > 0 &&
          formData.socialMedia.every(
            sm => sm.platform.trim() !== '' && sm.url.trim() !== ''
          )
        );
      case 6:
        return (
          formData.references.length > 0 &&
          formData.references.every(
            ref => ref.name.trim() !== '' && ref.title.trim() !== '' && ref.email.trim() !== ''
          )
        );
      case 7:
        return formData.cv !== null;
      case 8:
        return formData.videoIntroSubmitted;
      case 9:
        return acceptTerms;
      default:
        return true;
    }
  };

  async function handleCvFile(file: File) {
    setCvParsing(true);
    setCvParseError(null);
    setTimeout(() => {
      const fakeInfo = {
        fullName: "John Doe",
        email: "john.doe@email.com",
        phoneCountryCode: "+212",
        phoneNumber: "600 123 456",
        nationality: "Moroccan",
        dateOfBirth: "1990-01-01",
        address: "123 Main St, Rabat, Morocco",
        education: [
          { place: "Université Mohammed V", diploma: "Master en Informatique", startDate: "2012-09-01", endDate: "2014-06-30" }
        ],
        certifications: [{ title: "React Developer", issuer: "Coursera", date: "2020-06-01", url: "https://coursera.org/cert/react" }],
        experience: [
          { company: "TechCorp", jobTitle: "Software Engineer", startDate: "2015-01-01", endDate: "2020-12-31", description: "Developed web applications.", achievements: "Led a team to deliver a recruitment portal." }
        ],
        skills: ["JavaScript", "React", "Node.js"],
        socialMedia: [{ platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }],
        practicalExperience: "Contributed to open-source recruitment portal development.",
        references: [{ name: "Jane Smith", title: "Manager", email: "jane.smith@techcorp.com", note: "Can speak to technical skills" }],
        cv: file,
        videoIntroSubmitted: false,
      };
      setFormData(prev => ({ ...prev, ...fakeInfo }));
      setCvParsing(false);
    }, 1500);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-teal-600">Personal Information</h2>
              <div className="relative group">
                <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
                <div className="absolute hidden group-hover:block w-64 p-3 bg-white rounded-lg shadow-lg text-sm text-gray-600 z-10 -right-2 top-6">
                  Your personal information is securely stored and used solely for recruitment purposes.
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Full Name" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" />
              <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" />
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label htmlFor="phoneCountryCode" className="block text-sm font-medium text-gray-700 mb-1 sr-only">Country Code</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm hover:shadow-md transition text-sm"
                      onClick={() => setShowCountryDropdown(v => !v)}
                      id="phoneCountryCode"
                    >
                      <span className="flex items-center gap-1">
                        <ReactCountryFlag countryCode={countryCodes.find(c => c.code === formData.phoneCountryCode)?.iso || ''} svg style={{ width: '1.2em', height: '1.2em' }} />
                        <span className="ml-1">{formData.phoneCountryCode}</span>
                      </span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showCountryDropdown && (
                      <ul className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {countryCodes.map((country) => (
                          <li
                            key={country.code}
                            className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-teal-50 ${formData.phoneCountryCode === country.code ? 'bg-teal-100' : ''}`}
                            onClick={() => { handleInputChange('phoneCountryCode', country.code); setShowCountryDropdown(false); }}
                          >
                            <ReactCountryFlag countryCode={country.iso} svg style={{ width: '1.2em', height: '1.2em' }} />
                            <span>{country.name} ({country.code})</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <InputField label="Phone Number" id="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="e.g. 600 123 456" />
                </div>
              </div>
              <InputField label="Nationality" id="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="e.g. Moroccan" />
              <InputField label="Date of Birth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} />
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 sr-only">Address</label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400"
                  placeholder="Enter your full address"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Education & Certifications</h2>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Education
                </h3>
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, education: [...prev.education, { place: '', diploma: '', startDate: '', endDate: '' }] }))}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </button>
              </div>
              {formData.education.length === 0 && (
                <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No education entries added yet. Click "Add" to start.</p>
                </div>
              )}
              {formData.education.map((edu, index) => (
                <div key={index} className="group relative grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
                  <InputField label="School" id={`school-${index}` as keyof FormData} value={edu.place} placeholder="School/University" onChange={(_, value) => updateEducationField(index, 'place', value)} />
                  <InputField label="Diploma" id={`diploma-${index}` as keyof FormData} value={edu.diploma} placeholder="e.g. Bachelor's, Master's" onChange={(_, value) => updateEducationField(index, 'diploma', value)} />
                  <InputField label="Start Date" id={`startDate-${index}` as keyof FormData} type="date" value={edu.startDate} onChange={(_, value) => updateEducationField(index, 'startDate', value)} />
                  <InputField label="End Date" id={`endDate-${index}` as keyof FormData} type="date" value={edu.endDate} onChange={(_, value) => updateEducationField(index, 'endDate', value)} />
                  <button
                    onClick={() => setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) })}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Certifications
                </h3>
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, certifications: [...prev.certifications, { title: '', issuer: '', date: '', url: '' }] }))}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </button>
              </div>
              {formData.certifications.length === 0 && (
                <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No certifications added yet. Click "Add" to start.</p>
                </div>
              )}
              {formData.certifications.map((cert, index) => (
                <div key={index} className="group relative grid md:grid-cols-2 gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
                  <InputField label="Certificate Title" id={`cert-title-${index}` as keyof FormData} value={cert.title} placeholder="e.g. React Developer" onChange={(_, value) => updateCertificationField(index, 'title', value)} />
                  <InputField label="Issuing Organization" id={`cert-issuer-${index}` as keyof FormData} value={cert.issuer} placeholder="e.g. Coursera" onChange={(_, value) => updateCertificationField(index, 'issuer', value)} />
                  <InputField label="Date Received" id={`cert-date-${index}` as keyof FormData} type="date" value={cert.date} onChange={(_, value) => updateCertificationField(index, 'date', value)} />
                  <InputField label="Certificate URL (Optional)" id={`cert-url-${index}` as keyof FormData} value={cert.url || ''} placeholder="e.g. https://coursera.org/cert/..." onChange={(_, value) => updateCertificationField(index, 'url', value)} />
                  <button
                    onClick={() => setFormData({ ...formData, certifications: formData.certifications.filter((_, i) => i !== index) })}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Professional Experience</h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Work History
              </h3>
              <button
                onClick={() => setFormData((prev) => ({ ...prev, experience: [...prev.experience, { company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '' }] }))}
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
                <InputField label="Company" id={`company-${index}` as keyof FormData} value={exp.company} placeholder="Company Name" onChange={(_, value) => updateExperienceField(index, 'company', value)} />
                <InputField label="Job Title" id={`jobTitle-${index}` as keyof FormData} value={exp.jobTitle} placeholder="e.g. Software Engineer" onChange={(_, value) => updateExperienceField(index, 'jobTitle', value)} />
                <InputField label="Start Date" id={`startDate-exp-${index}` as keyof FormData} type="date" value={exp.startDate} onChange={(_, value) => updateExperienceField(index, 'startDate', value)} />
                <InputField label="End Date" id={`endDate-exp-${index}` as keyof FormData} type="date" value={exp.endDate} onChange={(_, value) => updateExperienceField(index, 'endDate', value)} />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sr-only">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={e => updateExperienceField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
                    placeholder="Describe your responsibilities..."
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    Achievements <span className="text-teal-600 text-xs">(Highlight measurable outcomes, e.g., "Increased sales by 20%")</span>
                  </label>
                  <textarea
                    value={exp.achievements}
                    onChange={e => updateExperienceField(index, 'achievements', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
                    placeholder="Highlight your key contributions..."
                    rows={4}
                  />
                </div>
                <button
                  onClick={() => setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) })}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Skills & Practical Experience</h2>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Skills
                </h3>
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, skills: [...prev.skills, ''] }))}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add
                </button>
              </div>
              {formData.skills.length === 0 && (
                <div className="text-center py-8 bg-white rounded-lg border shadow-sm">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No skills added yet. Click "Add" to start.</p>
                </div>
              )}
              {formData.skills.map((skill, index) => (
                <div key={index} className="group relative flex items-center gap-4 p-4 rounded-lg border bg-white shadow-sm mb-4">
                  <input
                    type="text"
                    value={skill}
                    onChange={e => updateSkill(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400"
                    placeholder="e.g. JavaScript"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) })}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Practical Experience
              </h3>
              <div className="p-4 rounded-lg border bg-white shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-1 sr-only">Informal Practical Experience</label>
                <textarea
                  value={formData.practicalExperience}
                  onChange={e => handleInputChange('practicalExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[120px]"
                  placeholder="Describe any relevant projects or contributions..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Social Media & Online Presence</h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                <Link2 className="w-5 h-5" /> Online Profiles
              </h3>
              <button
                onClick={() => setFormData((prev) => ({ ...prev, socialMedia: [...prev.socialMedia, { platform: '', url: '' }] }))}
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
                <InputField label="Platform" id={`platform-${index}` as keyof FormData} value={sm.platform} placeholder="e.g. LinkedIn, GitHub" onChange={(_, value) => updateSocialMediaField(index, 'platform', value)} />
                <InputField label="URL" id={`url-${index}` as keyof FormData} value={sm.url} placeholder="e.g. https://linkedin.com/in/username" onChange={(_, value) => updateSocialMediaField(index, 'url', value)} />
                <button
                  onClick={() => setFormData({ ...formData, socialMedia: formData.socialMedia.filter((_, i) => i !== index) })}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Professional References</h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> References
              </h3>
              <button
                onClick={() => setFormData((prev) => ({ ...prev, references: [...prev.references, { name: '', title: '', email: '', note: '' }] }))}
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
                <InputField label="Name" id={`ref-name-${index}` as keyof FormData} value={ref.name} placeholder="e.g. Jane Smith" onChange={(_, value) => updateReferenceField(index, 'name', value)} />
                <InputField label="Title/Relationship" id={`ref-title-${index}` as keyof FormData} value={ref.title} placeholder="e.g. Manager" onChange={(_, value) => updateReferenceField(index, 'title', value)} />
                <InputField label="Email" id={`ref-email-${index}` as keyof FormData} type="email" value={ref.email} placeholder="e.g. jane.smith@company.com" onChange={(_, value) => updateReferenceField(index, 'email', value)} />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 sr-only">Note (Optional)</label>
                  <textarea
                    value={ref.note}
                    onChange={e => updateReferenceField(index, 'note', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
                    placeholder="Additional comments about this reference..."
                    rows={3}
                  />
                </div>
                <button
                  onClick={() => setFormData({ ...formData, references: formData.references.filter((_, i) => i !== index) })}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Supporting Documents</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white shadow-sm">
              <label htmlFor="cv-upload" className="cursor-pointer bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
                <Download className="w-5 h-5 mr-2 inline" />
                {formData.cv ? 'Change CV' : 'Select CV'}
              </label>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (file) handleCvFile(file);
                }}
              />
              {formData.cv && (
                <div className="mt-4 text-teal-700 font-medium">{formData.cv.name}</div>
              )}
              <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX</div>
              {cvParseError && <div className="text-red-600 mt-2 text-sm">{cvParseError}</div>}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Video Introduction</h2>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <p className="text-gray-700 mb-4">
                Record a 2-minute video introducing yourself, your experience, and your motivation for applying. Ensure you're in a quiet place with a working camera and microphone.
              </p>
              <button
                onClick={() => {
                  navigate('/record');
                  setFormData({ ...formData, videoIntroSubmitted: true });
                }}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg transition"
              >
                Start Recording
              </button>
            </div>
          </div>
        );

      case 9:
        if (submitted) {
          return (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
              <p className="text-gray-600 text-center max-w-md">
                Thank you for your application. We will review your information and get back to you soon.
              </p>
            </div>
          );
        }
        return (
          <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Review & Submit</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-800 p-4 rounded-lg border bg-white shadow-sm">
                  <div><span className="font-semibold">Full Name:</span> {formData.fullName || '-'}</div>
                  <div><span className="font-semibold">Email:</span> {formData.email || '-'}</div>
                  <div><span className="font-semibold">Phone:</span> {formData.phoneCountryCode} {formData.phoneNumber || '-'}</div>
                  <div><span className="font-semibold">Nationality:</span> {formData.nationality || '-'}</div>
                  <div><span className="font-semibold">Date of Birth:</span> {formData.dateOfBirth || '-'}</div>
                  <div><span className="font-semibold">Address:</span> {formData.address || '-'}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Education</h3>
                {formData.education.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No education provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.education.map((edu, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
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
                <h3 className="text-lg font-medium text-teal-700 mb-3">Certifications</h3>
                {formData.certifications.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No certifications provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.certifications.map((cert, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Title:</span> {cert.title || '-'}</div>
                          <div><span className="font-semibold">Issuer:</span> {cert.issuer || '-'}</div>
                          <div><span className="font-semibold">Date:</span> {cert.date || '-'}</div>
                          {cert.url && (
                            <div><span className="font-semibold">URL:</span> <a href={cert.url} className="text-teal-600 hover:underline">{cert.url}</a></div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Professional Experience</h3>
                {formData.experience.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No experience provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.experience.map((exp, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
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
                        {exp.achievements && (
                          <div className="mt-2">
                            <span className="font-semibold">Achievements:</span>
                            <p className="text-gray-700 mt-1">{exp.achievements}</p>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Skills</h3>
                {formData.skills.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No skills provided.</div>
                ) : (
                  <ul className="flex flex-wrap gap-2 p-4 rounded-lg border bg-white shadow-sm">
                    {formData.skills.map((skill, idx) => (
                      <li key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Practical Experience</h3>
                {formData.practicalExperience ? (
                  <p className="text-gray-700 p-4 rounded-lg border bg-white shadow-sm">{formData.practicalExperience}</p>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No practical experience provided.</div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Social Media & Online Presence</h3>
                {formData.socialMedia.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No profiles provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.socialMedia.map((sm, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Platform:</span> {sm.platform || '-'}</div>
                          <div><span className="font-semibold">URL:</span> <a href={sm.url} className="text-teal-600 hover:underline">{sm.url || '-'}</a></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">References</h3>
                {formData.references.length === 0 ? (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No references provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.references.map((ref, idx) => (
                      <li key={idx} className="p-4 rounded-lg border bg-white shadow-sm">
                        <div className="grid md:grid-cols-2 gap-2">
                          <div><span className="font-semibold">Name:</span> {ref.name || '-'}</div>
                          <div><span className="font-semibold">Title/Relationship:</span> {ref.title || '-'}</div>
                          <div><span className="font-semibold">Email:</span> {ref.email || '-'}</div>
                          {ref.note && (
                            <div className="col-span-2">
                              <span className="font-semibold">Note:</span>
                              <p className="text-gray-700 mt-1">{ref.note}</p>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Supporting Documents</h3>
                {formData.cv ? (
                  <div className="text-teal-700 font-medium p-4 rounded-lg border bg-white shadow-sm">{formData.cv.name}</div>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No CV uploaded.</div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-3">Video Introduction</h3>
                {formData.videoIntroSubmitted ? (
                  <div className="text-teal-700 font-medium p-4 rounded-lg border bg-white shadow-sm">Video introduction submitted</div>
                ) : (
                  <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No video introduction submitted.</div>
                )}
              </div>
              <div className="p-4 rounded-lg border bg-white shadow-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700">
                    I accept the{' '}
                    <a href="/privacy-policy" className="text-teal-600 hover:underline">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="/terms" className="text-teal-600 hover:underline">Terms of Service</a>
                  </span>
                </label>
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
        {currentStep === 1 && (
          <div className="text-center mb-8">
            <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg font-medium shadow-md transition cursor-pointer">
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
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800">Job Application Form</h1>
              <div className="text-sm font-medium text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            <div
              ref={stepsRef}
              className="flex overflow-x-auto scrollbar-hidden snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setCurrentStep(step.number)}
                  className={`snap-center flex-shrink-0 px-4 py-2 mx-1 rounded-lg transition text-sm font-medium ${
                    currentStep === step.number
                      ? 'bg-teal-600 text-white'
                      : index < currentStep - 1
                      ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {index < currentStep - 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                    <span className="hidden md:inline">{step.title}</span>
                  </div>
                </button>
              ))}
            </div>
            <style>
              {`
                .scrollbar-hidden::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
          </div>

          <div className="p-6 md:p-8">
            {renderStepContent()}
            <div className="mt-8 sticky bottom-0 bg-white py-4 -mx-6 md:-mx-8 px-6 md:px-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${
                    currentStep === 1 ? 'text-gray-400 cursor-not-allowed bg-white' : 'text-teal-600 bg-white hover:bg-teal-600 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Previous
                </button>
                {currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(prev => isStepValid() ? prev + 1 : prev)}
                    disabled={!isStepValid()}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${
                      isStepValid() ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600' : 'opacity-50 cursor-not-allowed bg-teal-600 text-white'
                    }`}
                  >
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : !submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={!acceptTerms}
                    className={`px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${
                      acceptTerms ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600' : 'opacity-50 cursor-not-allowed bg-teal-600 text-white'
                    }`}
                  >
                    Submit Application
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  id: keyof FormData;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (field: keyof FormData, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text', value, placeholder, onChange }) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full px-4 py-2.5 pt-6 pb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent"
      placeholder={placeholder}
    />
    <label
      htmlFor={id}
      className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0 peer-focus:text-sm peer-focus:text-teal-600 ${
        value ? '-top-0 text-sm text-teal-600' : 'top-1/2 text-base'
      }`}
    >
      {label}
    </label>
  </div>
);

export default MultiStepForm;