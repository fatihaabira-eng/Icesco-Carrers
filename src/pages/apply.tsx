import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus, Link2, CheckCircle, Info, BookOpen, Briefcase, X, GraduationCap, FileText, Phone } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApplicationService, ApplicationData } from '../services/api';
import InputField from '../components/InputField';
import PersonalInformation from '../components/PersonalInfoStep';
import EducationCertificationsStep from '../components/EducationCertificationsStep';
import { Education } from "@/Types/Education";
import { Certification } from "@/Types/Certification";
import { Reference } from "@/Types/Reference";
import { Experience } from "@/Types/Experience";
import { SocialMedia } from "@/Types/SocialMedia";
import { Language } from "@/Types/Language";
import ProfessionalExperienceStep from '@/components/ProfessionalExperienceStep';
import ProfessionalSkillsStep from '@/components/ProfessionalSkillsStep';
import LanguagesStep from '@/components/LanguagesStep';
import SocialMediaStep from '@/components/SocialMediaStep';
import ReferencesStep from '@/components/ReferencesStep';
import { c } from 'node_modules/framer-motion/dist/types.d-Cjd591yU';
import SupportingDocumentsStep from '@/components/SupportingDocumentsStep';
import VideoIntroductionStep from '@/components/VideoIntroductionStep';
import ReviewSubmitStep from '@/components/ReviewSubmitStep';



// Predefined languages list for autocomplete
const PREDEFINED_LANGUAGES = [
  // Major World Languages
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese (Mandarin)',
  'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu', 'Indonesian', 'Dutch', 'Turkish',
  'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Czech', 'Hungarian', 'Romanian',
  'Bulgarian', 'Croatian', 'Serbian', 'Slovak', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian',

  // African Languages
  'Swahili', 'Amharic', 'Yoruba', 'Igbo', 'Hausa', 'Zulu', 'Xhosa', 'Afrikaans', 'Somali',
  'Oromo', 'Tigrinya', 'Shona', 'Fula', 'Lingala', 'Wolof', 'Akan', 'Ewe', 'Ga', 'Twi',

  // Asian Languages
  'Thai', 'Vietnamese', 'Tagalog', 'Malay', 'Burmese', 'Khmer', 'Lao', 'Mongolian', 'Nepali',
  'Sinhala', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Punjabi',
  'Persian (Farsi)', 'Pashto', 'Kurdish', 'Armenian', 'Georgian', 'Azerbaijani', 'Kazakh',
  'Uzbek', 'Turkmen', 'Kyrgyz', 'Tajik', 'Dari', 'Hebrew',

  // European Languages
  'Greek', 'Albanian', 'Macedonian', 'Bosnian', 'Montenegrin', 'Maltese', 'Irish Gaelic',
  'Scottish Gaelic', 'Welsh', 'Basque', 'Catalan', 'Galician', 'Corsican', 'Sardinian',
  'Faroese', 'Icelandic', 'Luxembourgish', 'Romansh', 'Frisian', 'Sami',

  // Sign Languages
  'American Sign Language (ASL)', 'British Sign Language (BSL)', 'French Sign Language (LSF)',
  'German Sign Language (DGS)', 'International Sign', 'Japanese Sign Language (JSL)',

  // Programming Languages (for completeness)
  'Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift'
];






const ACHIEVEMENT_TYPES = [
  { value: 'report', label: 'Upload Report' },
  { value: 'acknowledgment', label: 'Acknowledgment Letter' },
  { value: 'certificate', label: 'Thank You Certificate' },
  { value: 'press', label: 'Press Links' }
];






interface FormData {
  offerId: string;
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
  technicalSkills: string[];
  managerialSkills: string[];
  technicalSkillsEvidence: { [skill: string]: File | null }; // Add evidence for technical skills
  managerialSkillsEvidence: { [skill: string]: File | null }; // Add evidence for managerial skills
  languages: Language[];
  socialMedia: SocialMedia[];
  practicalExperience: string;
  references: Reference[];
  cv: File | null;
  videoIntroSubmitted: boolean;
  videoFile: File | null;
  skillExperiences: { [skill: string]: number[] };
  skillEducation: { [skill: string]: number[] };
}





const MultiStepForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    offerId: '',
    fullName: '',
    email: '',
    phoneCountryCode: '+212',
    phoneNumber: '',
    nationality: '',
    dateOfBirth: '',
    address: '',
    education: [{ place: '', diploma: '', startDate: '', endDate: '' }],
    certifications: [{ title: '', issuer: '', date: '', url: '', certificate: null }],
    experience: [{
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
    }],
    technicalSkills: [], // Changed from [''] to []
    managerialSkills: [], // Changed from [''] to []
    technicalSkillsEvidence: {}, // Ensure this is properly initialized
    managerialSkillsEvidence: {}, // Ensure this is properly initialized
    languages: [{ language: '', level: '', learnedFrom: '', certificate: null }],
    socialMedia: [{ platform: '', url: '' }],
    practicalExperience: '',
    references: [{
      name: '',
      title: '',
      email: '',
      phone: '',
      note: '',
      company: '',
      companyLink: ''  // Add this property
    }],
    cv: null,
    videoIntroSubmitted: false,
    videoFile: null,
    skillExperiences: {},
    skillEducation: {},
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Languages autocomplete state
  const [languageSuggestions, setLanguageSuggestions] = useState<{ [key: number]: string[] }>({});
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  




 

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Education & Professional Certifications' },
    { number: 3, title: 'Professional Experience' },
    { number: 4, title: 'Professional Skills' },
    { number: 5, title: 'Languages' },
    { number: 6, title: 'Social Media & Online Presence' },
    { number: 7, title: 'References' },
    { number: 8, title: 'Supporting Documents' },
    { number: 9, title: 'Video Introduction' },
    { number: 10, title: 'Review & Submit' },
  ];

  // Initialize offer ID from URL parameters
  useEffect(() => {
    const offerIdParam = searchParams.get('offre_id') || searchParams.get('offerId');
    if (offerIdParam && offerIdParam !== formData.offerId) {
      setFormData(prev => ({ ...prev, offerId: offerIdParam }));
    }
  }, [searchParams, formData.offerId]);

  // Check for recorded video on component mount
  useEffect(() => {
    // First, try to restore form data from localStorage
    const savedFormData = localStorage.getItem('applicationFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        if (parsedData.cv && typeof parsedData.cv === 'object' && parsedData.cv.hasFile) {
          const savedCvData = localStorage.getItem('uploadedCvFile');
          if (savedCvData) {
            const cvInfo = JSON.parse(savedCvData);
            const cvFile = new File([''], cvInfo.name, { type: cvInfo.type });
            parsedData.cv = cvFile;
          } else {
            parsedData.cv = null;
          }
        }

        // Handle video file restoration
        if (parsedData.videoFile && typeof parsedData.videoFile === 'object' && parsedData.videoFile.hasFile) {
          const recordedVideoData = localStorage.getItem('recordedVideoBlob');
          if (recordedVideoData) {
            try {
              const byteCharacters = atob(recordedVideoData);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'video/mp4' });
              const videoFile = new File([blob], 'introduction.mp4', { type: 'video/mp4' });
              parsedData.videoFile = videoFile;
              parsedData.videoIntroSubmitted = true;
            } catch (error) {
              console.error('Error restoring video:', error);
              parsedData.videoFile = null;
              parsedData.videoIntroSubmitted = false;
            }
          } else {
            parsedData.videoFile = null;
            parsedData.videoIntroSubmitted = false;
          }
        }

        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (formData.fullName || formData.email) {
      const dataToSave: any = { ...formData };
      dataToSave.cv = formData.cv ? { name: formData.cv.name, hasFile: true } : null;
      dataToSave.videoFile = formData.videoFile ? { name: formData.videoFile.name, hasFile: true } : null;
      localStorage.setItem('applicationFormData', JSON.stringify(dataToSave));
    }
  }, [formData]);

  // Listen for page unload to clean up camera streams
  useEffect(() => {
    const handleBeforeUnload = () => {
      const hasActiveCamera = sessionStorage.getItem('cameraStreamActive');
      if (hasActiveCamera === 'true') {
        window.postMessage({ type: 'STOP_CAMERA_STREAMS' }, '*');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Handle step parameter and check for recorded video
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= 1 && step <= 10) {
        setCurrentStep(step);
      }
    }

    // Check if returning from video recording page
    const savedFormData = localStorage.getItem('applicationFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        if (parsedData.videoIntroSubmitted) {
          setFormData(prev => ({ ...prev, videoIntroSubmitted: true }));
        }
      } catch (error) {
        console.error('Error checking video status:', error);
      }
    }
  }, [searchParams]);


 

  // Handle form submission
  const handleSubmit = async () => {
    console.log('🚀 FORM SUBMISSION STARTED');
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success response
    const response = {
      success: true,
      application_id: 'SIMULATED_APP_ID_12345',
      message: 'Application submitted successfully (simulated).'
    };

    console.log('📨 API Response:', response);

    // Check if response indicates success
    const isSuccessful = response.success === true || !!response.application_id;

    if (isSuccessful) {
      console.log('✅ SUCCESS - Setting submitted state to true');
      setSubmitted(true);

      // Stop any active camera streams by broadcasting cleanup event
      try {
        window.postMessage({ type: 'STOP_CAMERA_STREAMS' }, '*');
        console.log('🎥 Sent signal to stop camera streams');

        const hasActiveCamera = sessionStorage.getItem('cameraStreamActive');
        if (hasActiveCamera === 'true') {
          navigator.mediaDevices.enumerateDevices()
            .then(() => {
              sessionStorage.removeItem('cameraStreamActive');
              console.log('🎥 Cleaned up camera session storage');
            })
            .catch(err => console.log('📹 Camera cleanup info:', err));
        }
      } catch (error) {
        console.log('📹 Error during camera cleanup:', error);
      }

      // Clear localStorage
      localStorage.removeItem('applicationFormData');
      localStorage.removeItem('recordedVideoBlob');
      localStorage.removeItem('uploadedCvFile');

      // Store application ID if provided
      if (response.application_id) {
        const appId = response.application_id;
        localStorage.setItem('lastApplicationId', appId);
        console.log('📝 Stored application ID:', appId);
      }
    } else {
      console.log('❌ API did not return success indication. Response:', response);
      setSubmitError(response.message || 'Failed to submit application');
    }

    setIsSubmitting(false);
    console.log('🏁 FORM SUBMISSION COMPLETED');
  };

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
    if (field === 'certificate') {
      updated[index][field] = value as unknown as File | null;
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, education: updated });
  };

  const updateCertificationField = (index: number, field: keyof Certification, value: string | File | null) => {
    const updated = [...formData.certifications];
    if (field === 'certificate') {
      updated[index][field] = value as File | null;
    } else {
      updated[index][field] = value as string;
    }
    setFormData({ ...formData, certifications: updated });
  };

  const updateExperienceField = (index: number, field: keyof Experience, value: string | boolean | File | null) => {
    const updated = [...formData.experience];

    if (field === 'achievementFile') {
      updated[index][field] = value as File | null;
    } else {
      (updated[index] as any)[field] = value;
    }

    setFormData({ ...formData, experience: updated });

  };

  const updateLanguageField = (index: number, field: keyof Language, value: string | File | null) => {
    const updated = [...formData.languages];

    if (field === 'certificate') {
      updated[index][field] = value as File | null;
    } else {
      updated[index][field] = value as string;
    }

    setFormData({ ...formData, languages: updated });

    // Update suggestions based on the input for language field only
    if (field === 'language' && typeof value === 'string' && value.trim().length > 0) {
      const filteredLanguages = PREDEFINED_LANGUAGES.filter(lang =>
        lang.toLowerCase().includes(value.toLowerCase())
      ).sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const valueLower = value.toLowerCase();

        // Exact match first
        if (aLower === valueLower) return -1;
        if (bLower === valueLower) return 1;

        // Starts with match second
        if (aLower.startsWith(valueLower) && !bLower.startsWith(valueLower)) return -1;
        if (bLower.startsWith(valueLower) && !aLower.startsWith(valueLower)) return 1;

        // Then alphabetical
        return a.localeCompare(b);
      }).slice(0, 8); // Limit to 8 suggestions

      setLanguageSuggestions({ ...languageSuggestions, [index]: filteredLanguages });
      setActiveLanguageIndex(index);
    } else if (field === 'language') {
      // Clear suggestions if input is empty
      const newSuggestions = { ...languageSuggestions };
      delete newSuggestions[index];
      setLanguageSuggestions(newSuggestions);
      setActiveLanguageIndex(null);
    }
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
          formData.fullName?.trim() !== '' &&
          formData.email?.trim() !== '' &&
          formData.phoneNumber?.trim() !== '' &&
          formData.nationality?.trim() !== '' &&
          formData.dateOfBirth?.trim() !== '' &&
          formData.address?.trim() !== ''
        );
      case 2:
        // Allow entries with some fields filled, but require minimum data
        const hasValidEducation = formData.education.some(
          edu => edu.place?.trim() !== '' ||
            edu.diploma?.trim() !== '' ||
            edu.startDate?.trim() !== '' ||
            edu.endDate?.trim() !== ''
        );

        const hasValidCertification = formData.certifications.some(
          cert => cert.title?.trim() !== '' ||
            cert.issuer?.trim() !== '' ||
            cert.date?.trim() !== ''
        );

        return hasValidEducation && hasValidCertification;
      case 3:
        const isValid = (
          formData.experience.length > 0 &&
          formData.experience.every(
            exp => exp.company?.trim() !== '' &&
              exp.jobTitle?.trim() !== '' &&
              exp.startDate?.trim() !== '' &&
              (exp.current || exp.endDate?.trim() !== '') &&
              exp.description?.trim() !== ''
          )
        );



        return isValid;
      case 4:
        return (
          formData.technicalSkills.length > 0 &&
          formData.technicalSkills.some(skill => skill?.trim() !== '') && // Added optional chaining
          formData.managerialSkills.length > 0 &&
          formData.managerialSkills.some(skill => skill?.trim() !== '') // Added optional chaining
        );
      case 5:
        return (
          formData.languages.length > 0 &&
          formData.languages.every(
            lang => lang.language?.trim() !== '' &&
              lang.level?.trim() !== ''
          )
        );
      case 6:
        return (
          formData.socialMedia.length > 0 &&
          formData.socialMedia.every(
            sm => sm.platform?.trim() !== '' &&
              sm.url?.trim() !== ''
          )
        );
      case 7:
        return (
          formData.references.length > 0 &&
          formData.references.every(
            ref => ref.name?.trim() !== '' &&
              ref.title?.trim() !== '' &&
              ref.email?.trim() !== ''
          )
        );
      case 8:
        return formData.cv !== null;
      case 9:
        return formData.videoIntroSubmitted;
      case 10:
        return acceptTerms;
      default:
        return true;
    }
  };

  async function handleCvFile(file: File) {
    setCvParsing(true);
    setCvParseError(null);

    // Save CV info to localStorage
    const cvInfo = {
      name: file.name,
      type: file.type,
      size: file.size
    };
    localStorage.setItem('uploadedCvFile', JSON.stringify(cvInfo));

    // Simulate parsing delay
    setTimeout(() => {
      setFormData(prev => ({ ...prev, cv: file }));
      setCvParsing(false);
    }, 1500);
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformation formData={formData} handleInputChange={handleInputChange} />
        );

      case 2:
        return (
          <EducationCertificationsStep
            formData={formData}
            updateEducationField={updateEducationField}
            updateCertificationField={updateCertificationField}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <ProfessionalExperienceStep
            formData={formData}
            updateExperienceField={updateExperienceField}
            setFormData={setFormData}
          />
        );

      case 4:
        return (
          <ProfessionalSkillsStep
            formData={formData}
            setFormData={setFormData}
          />
        );

      case 5:
        return (
          <LanguagesStep
            formData={formData}
            updateLanguageField={updateLanguageField}
            setFormData={setFormData}
          />
        );
      case 6:
        return (
          <SocialMediaStep
            formData={formData}
            updateSocialMediaField={updateSocialMediaField}
            setFormData={setFormData}
          />
        );

      case 7:
        return (
          <ReferencesStep
            formData={formData}
            updateReferenceField={updateReferenceField}
            setFormData={setFormData}
          />
        );

      case 8:
        return (
          <SupportingDocumentsStep
            formData={formData}
            handleCvFile={handleCvFile}
            setFormData={setFormData}
          />
        );

      case 9:
        return (
          <VideoIntroductionStep
            formData={formData}
            navigate={navigate}
            setCurrentStep={setCurrentStep}
          />
        );

      case 10:

        return (
          <ReviewSubmitStep
            formData={formData}
            submitted={submitted}
            submitError={submitError}
            acceptTerms={acceptTerms}
            setAcceptTerms={setAcceptTerms}
            ACHIEVEMENT_TYPES={ACHIEVEMENT_TYPES}
          />
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
            <label className={`inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-md transition cursor-pointer ${cvParsing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600'
              } text-white`}>
              {cvParsing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Parsing CV...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Apply using CV
                </>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={cvParsing}
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (file && !cvParsing) {
                    setFormData({ ...formData, cv: file });
                    handleCvFile(file);
                  }
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
                  className={`snap-center flex-shrink-0 px-3 py-2 mx-1 rounded-lg transition text-sm font-medium ${currentStep === step.number
                    ? 'bg-teal-600 text-white'
                    : index < currentStep - 1
                      ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {/* Circle with step number */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${currentStep === step.number
                      ? 'bg-white text-teal-600'
                      : index < currentStep - 1
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                      }`}>
                      {index < currentStep - 1 ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span>{step.number}</span>
                      )}
                    </div>
                    {/* Step title */}
                    <span className="text-xs leading-tight text-center">{step.title}</span>
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
                  className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed bg-white' : 'text-teal-600 bg-white hover:bg-teal-600 hover:text-white'
                    }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" /> Previous
                </button>
                {currentStep < steps.length ? (
                  <button
                    onClick={() => setCurrentStep(prev => isStepValid() ? prev + 1 : prev)}
                    disabled={!isStepValid()}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${isStepValid() ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600' : 'opacity-50 cursor-not-allowed bg-teal-600 text-white'
                      }`}
                  >
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : !submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!acceptTerms || isSubmitting}
                    className={`px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${acceptTerms && !isSubmitting ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600' : 'opacity-50 cursor-not-allowed bg-teal-600 text-white'
                      }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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



export default MultiStepForm;