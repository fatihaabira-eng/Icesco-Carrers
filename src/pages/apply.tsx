import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus } from 'lucide-react';
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

interface FormData {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  cv: File | null;
  practicalExperience: string;
  certifications: Certification[];
  references: Reference[];
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
    experience: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '' }],
    skills: [''],
    cv: null,
    practicalExperience: '',
    certifications: [{ title: '', issuer: '', date: '', url: '' }],
    references: [{ name: '', title: '', email: '', note: '' }],
    videoIntroSubmitted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Education' },
    { number: 3, title: 'Experience' },
    { number: 4, title: 'Skills' },
    { number: 5, title: 'Practical Experience' },
    { number: 6, title: 'Certifications' },
    { number: 7, title: 'References' },
    { number: 8, title: 'Upload CV' },
    { number: 9, title: 'Video Introduction' },
    { number: 10, title: 'Review' },
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

  const updateCertificationField = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updated = [...formData.certifications];
    updated[index][field] = value;
    setFormData({ ...formData, certifications: updated });
  };

  const updateReferenceField = (
    index: number,
    field: keyof Reference,
    value: string
  ) => {
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
          formData.skills.every(skill => skill.trim() !== '')
        );
      case 5:
        return formData.practicalExperience.trim() !== '';
      case 6:
        return (
          formData.certifications.length > 0 &&
          formData.certifications.every(
            cert => cert.title.trim() !== '' && cert.issuer.trim() !== '' && cert.date.trim() !== ''
          )
        );
      case 7:
        return (
          formData.references.length > 0 &&
          formData.references.every(
            ref => ref.name.trim() !== '' && ref.title.trim() !== '' && ref.email.trim() !== ''
          )
        );
      case 8:
        return formData.cv !== null;
      case 9:
        return formData.videoIntroSubmitted;
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
      phoneCountryCode: phoneMatch ? phoneMatch[0].split(' ')[0] : '+212',
      phoneNumber: phoneMatch ? phoneMatch[0].split(' ').slice(1).join(' ') : '',
      education: education ? [{ place: education, diploma: '', startDate: '', endDate: '' }] : [],
      experience: experience ? [{ company: experience, jobTitle: '', startDate: '', endDate: '', description: '', achievements: '' }] : [],
      skills: skills ? skills.split(/,|\n/).map(s => s.trim()).filter(Boolean) : [],
      practicalExperience: '',
      certifications: [],
      references: [],
      videoIntroSubmitted: false,
    };
  }

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
        experience: [
          { company: "TechCorp", jobTitle: "Software Engineer", startDate: "2015-01-01", endDate: "2020-12-31", description: "Développement d'applications web.", achievements: "Led a team to deliver a recruitment portal." }
        ],
        skills: ["JavaScript", "React", "Node.js"],
        cv: file,
        practicalExperience: "Contributed to open-source recruitment portal development.",
        certifications: [{ title: "React Developer", issuer: "Coursera", date: "2020-06-01", url: "https://coursera.org/cert/react" }],
        references: [{ name: "Jane Smith", title: "Manager", email: "jane.smith@techcorp.com", note: "Can speak to technical skills" }],
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
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <InputField label="Full Name" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" />
              <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email address" />
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label htmlFor="phoneCountryCode" className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white transition-shadow shadow-sm hover:shadow-md"
                      onClick={() => setShowCountryDropdown(v => !v)}
                      id="phoneCountryCode"
                      aria-haspopup="listbox"
                      aria-expanded={showCountryDropdown}
                    >
                      <span className="flex items-center gap-2">
                        <ReactCountryFlag countryCode={countryCodes.find(c => c.code === formData.phoneCountryCode)?.iso || ''} svg style={{ width: '1.5em', height: '1.5em' }} />
                        <span className="ml-2">{countryCodes.find(c => c.code === formData.phoneCountryCode)?.name}</span>
                      </span>
                      <span className="ml-2 text-gray-700 font-semibold">{formData.phoneCountryCode}</span>
                      <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showCountryDropdown && (
                      <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto" role="listbox">
                        {countryCodes.map((country) => (
                          <li
                            key={country.code}
                            className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-teal-50 ${formData.phoneCountryCode === country.code ? 'bg-teal-100' : ''}`}
                            onClick={() => { handleInputChange('phoneCountryCode', country.code); setShowCountryDropdown(false); }}
                            role="option"
                            aria-selected={formData.phoneCountryCode === country.code}
                          >
                            <span className="flex items-center gap-2">
                              <ReactCountryFlag countryCode={country.iso} svg style={{ width: '1.5em', height: '1.5em' }} />
                              <span className="ml-2">{country.name}</span>
                            </span>
                            <span className="ml-2 text-gray-700 font-semibold">{country.code}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <InputField 
                    label="Phone Number" 
                    id="phoneNumber" 
                    type="tel" 
                    value={formData.phoneNumber} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 600 123 456" 
                  />
                </div>
              </div>

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
                Add
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
                      { company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '' },
                    ],
                  }))
                }
                className="flex items-center px-4 py-2 bg-[#0e7378] hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                Add
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
                    placeholder="Describe the projects and your responsibilities, etc."
                    rows={3}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major Achievements & Hands-On Contributions</label>
                  <textarea
                    value={exp.achievements}
                    onChange={e => updateExperienceField(index, 'achievements', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    placeholder="Describe your major achievements and contributions..."
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
                Add
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
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Practical Experience</h2>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <label className="block text-sm font-medium text-gray-700 mb-2">Informal Practical Experience</label>
              <textarea
                value={formData.practicalExperience}
                onChange={e => handleInputChange('practicalExperience', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-gray-50"
                placeholder="Despite not having a formal title as a software engineer, I contributed to the development of the Recruitment Portal..."
                rows={5}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-600">Certifications & Informal Learning</h2>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    certifications: [...prev.certifications, { title: '', issuer: '', date: '', url: '' }],
                  }))
                }
                className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                Add
              </button>
            </div>
            {formData.certifications.length === 0 && <p className="text-gray-500 text-center py-4">No certifications added yet.</p>}
            {formData.certifications.map((cert, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                <InputField label="Certificate Title" id={`cert-title-${index}` as keyof FormData} value={cert.title} placeholder="e.g. React Developer" onChange={(_, value) => updateCertificationField(index, 'title', value)} />
                <InputField label="Issuing Organization" id={`cert-issuer-${index}` as keyof FormData} value={cert.issuer} placeholder="e.g. Coursera" onChange={(_, value) => updateCertificationField(index, 'issuer', value)} />
                <InputField label="Date Received" id={`cert-date-${index}` as keyof FormData} type="date" value={cert.date} onChange={(_, value) => updateCertificationField(index, 'date', value)} />
                <InputField label="Certificate URL (Optional)" id={`cert-url-${index}` as keyof FormData} value={cert.url || ''} placeholder="e.g. https://coursera.org/cert/..." onChange={(_, value) => updateCertificationField(index, 'url', value)} />
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => {
                      const filtered = formData.certifications.filter((_, i) => i !== index);
                      setFormData({ ...formData, certifications: filtered });
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

      case 7:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-teal-600">Professional References</h2>
              <button
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    references: [...prev.references, { name: '', title: '', email: '', note: '' }],
                  }))
                }
                className="flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                Add
              </button>
            </div>
            {formData.references.length === 0 && <p className="text-gray-500 text-center py-4">No references added yet.</p>}
            {formData.references.map((ref, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                <InputField label="Name" id={`ref-name-${index}` as keyof FormData} value={ref.name} placeholder="e.g. Jane Smith" onChange={(_, value) => updateReferenceField(index, 'name', value)} />
                <InputField label="Title/Relationship" id={`ref-title-${index}` as keyof FormData} value={ref.title} placeholder="e.g. Manager" onChange={(_, value) => updateReferenceField(index, 'title', value)} />
                <InputField label="Email" id={`ref-email-${index}` as keyof FormData} type="email" value={ref.email} placeholder="e.g. jane.smith@company.com" onChange={(_, value) => updateReferenceField(index, 'email', value)} />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                  <textarea
                    value={ref.note}
                    onChange={e => updateReferenceField(index, 'note', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    placeholder="Additional comments about this reference..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => {
                      const filtered = formData.references.filter((_, i) => i !== index);
                      setFormData({ ...formData, references: filtered });
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

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Upload CV</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <label htmlFor="cv-upload" className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition mb-4">
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

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-600 mb-6">Video Introduction</h2>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <p className="text-gray-700 mb-4">
                We’d love to hear from you! Please record a 2-minute video introducing yourself, your experience, and your motivation for applying. Ensure you're in a quiet place and that your camera and microphone are working properly.
              </p>
              <button
                onClick={() => {
                  navigate('/record');
                  setFormData({ ...formData, videoIntroSubmitted: true });
                }}
                className="flex items-center px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition"
              >
                Start Recording
              </button>
            </div>
          </div>
        );

      case 10:
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
                  <div><span className="font-semibold">Phone:</span> {formData.phoneCountryCode} {formData.phoneNumber || '-'}</div>
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
                <h3 className="font-bold text-lg text-teal-700 mb-3">Practical Experience</h3>
                {formData.practicalExperience ? (
                  <p className="text-gray-700">{formData.practicalExperience}</p>
                ) : (
                  <div className="text-gray-500">No practical experience provided.</div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Certifications</h3>
                {formData.certifications.length === 0 ? (
                  <div className="text-gray-500">No certifications provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.certifications.map((cert, idx) => (
                      <li key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
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
                <h3 className="font-bold text-lg text-teal-700 mb-3">References</h3>
                {formData.references.length === 0 ? (
                  <div className="text-gray-500">No references provided.</div>
                ) : (
                  <ul className="space-y-4">
                    {formData.references.map((ref, idx) => (
                      <li key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
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
                <h3 className="font-bold text-lg text-teal-700 mb-3">CV</h3>
                {formData.cv ? (
                  <div className="text-teal-700 font-medium">{formData.cv.name}</div>
                ) : (
                  <div className="text-gray-500">No CV uploaded.</div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-lg text-teal-700 mb-3">Video Introduction</h3>
                {formData.videoIntroSubmitted ? (
                  <div className="text-teal-700 font-medium">Video introduction submitted</div>
                ) : (
                  <div className="text-gray-500">No video introduction submitted.</div>
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

          <div className="p-6 md:p-8">
            {renderStepContent()}

            <div className="flex items-center justify-between mt-12">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-[#0d9489] ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed bg-white border-gray-300' : 'text-[#0d9489] bg-white hover:bg-[#0d9489] hover:text-white hover:border-[#0d9489]'}`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-[#0d9489] ${!isStepValid() ? 'opacity-50 cursor-not-allowed bg-[#0d9489] text-white' : 'bg-[#0d9489] text-white hover:bg-white hover:text-[#0d9489] hover:border-[#0d9489]'}`}
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : !submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  className="px-6 py-2.5 bg-[#0d9489] text-white rounded-lg font-medium transition border border-[#0d9489] hover:bg-white hover:text-[#0d9489] hover:border-[#0d9489]"
                >
                  Submit Application
                </button>
              ) : null}
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