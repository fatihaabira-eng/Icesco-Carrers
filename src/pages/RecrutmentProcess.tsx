import React, { useState } from 'react';
import {
  FileText,
  Clock,
  PhoneCall,
  Users,
  Mail,
  Upload,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  LucideIcon
} from 'lucide-react';

type Step = {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  detailedContent: string;
  confirmedBy: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
};

const CandidateProcess: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [offerAccepted, setOfferAccepted] = useState(false);

  const steps: Step[] = [
  {
    id: 1,
    title: "Form Submitted",
    icon: FileText,
    description: "Your application form has been submitted successfully",
    detailedContent: "Thank you for applying! We have received your application and our recruitment team will begin reviewing it shortly.",
    confirmedBy: 'candidate',
    timestamp: "9th april 2025",
    status: 'completed'
  },
  {
    id: 2,
    title: "Application Under Review",
    icon: Clock,
    description: "HR is reviewing your application",
    detailedContent: "Our HR team is carefully reviewing your application, qualifications, and experiences to determine alignment with the role.",
    confirmedBy: 'hr',
    timestamp: "12th April 2025",
    status: 'completed'
  },
  {
    id: 3,
    title: "Phone Interview: HR",
    icon: PhoneCall,
    description: "HR phone interview scheduled on Wednesday at 11:00 AM",
    detailedContent: "A 30-minute phone interview is scheduled on Wednesday at 11:00 AM with Sarah Martin (HR Manager). We’ll discuss your background, expectations, and the job role in detail. Please ensure you're in a quiet location.",
    confirmedBy: 'hr',
    timestamp: "20th April 2025",
    status: 'completed'
  },
  {
    id: 4,
    title: "Team Interview",
    icon: Users,
    description: "Online interview with the technical team on Friday at 2:00 PM",
    detailedContent: "Your interview with the technical team is scheduled on Friday at 2:00 PM via Zoom. Participants: Marc Johnson (Tech Lead), Amina Badr (Team Manager). This is a 1-hour session focused on technical challenges, previous experience, and collaboration style.",
    confirmedBy: 'hr',
    timestamp: "25th April 2025",
    status: 'completed'
  },
  {
    id: 5,
    title: "Offer Sent",
    icon: Mail,
    description: "You have received a job offer with next steps",
    detailedContent: `
    Congratulations! You've been selected for the position. The job offer includes details on salary, benefits, and expected start date.
    
    📄 Required Documents:
    - National ID Card  
    - Passport  
    - Diploma/Certificate of Education  
    - Acte de Naissance (Birth Certificate)  
    - Experience Certificate  
    - Acte de Mariage (Marriage Certificate – if applicable)  
    - 2 Recent ID Photos
    
    Please prepare these documents for submission to proceed with contract finalization.`,
    confirmedBy: 'hr',
    timestamp: "28th April 2025",
    status: 'active'
  },
  {
    id: 6,
    title: "Upload Required Documents",
    icon: Upload,
    description: "Upload all requested documents to finalize your file",
    detailedContent: `
    To accept your offer and proceed with the onboarding process, please upload the following documents:
    
    ✅ National ID Card  
    ✅ Passport  
    ✅ Diploma or Degree Certificate  
    ✅ Acte de Naissance (Birth Certificate)  
    ✅ Experience Certificate  
    ✅ Acte de Mariage (if married – optional)  
    ✅ Two (2) ID Photos
    
    Once submitted, our HR team will validate your file and send you the final contract.`,
    confirmedBy: 'candidate',
    timestamp: "3th May 2025",
    status: 'pending'
  },
  {
    id: 7,
    title: "Start Date Confirmed",
    icon: Calendar,
    description: "Your start date is set for Monday, 02/06/2025",
    detailedContent: "Welcome aboard! Your official recruitment date is Monday, 02 April 2025. You will receive a detailed onboarding schedule including meetings, training, and access setup prior to your first day.",
    confirmedBy: 'hr',
    timestamp: "10th May 2025",
    status: 'pending'
  }
];


  const handleStepClick = (stepId: number) => {
    if (stepId === 6 && !offerAccepted) {
      setShowOfferModal(true);
      return;
    }
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'id') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'cv') setCvFile(file);
      else setIdFile(file);
    }
  };

  const handleOfferSubmission = () => {
    if (cvFile && idFile) {
      setOfferAccepted(true);
      setShowOfferModal(false);
      setExpandedStep(6);
    }
  };

  const getCircleStyles = (step: Step) => {
    switch (step.status) {
      case 'completed':
        return 'w-12 h-12 rounded-full bg-[#0e7378] border-4 border-[#0e7378] flex items-center justify-center cursor-pointer hover:bg-[#0e7378]/90 transition-colors';
      case 'active':
        return 'w-12 h-12 rounded-full border-4 border-[#edc42d] bg-[#edc42d] flex items-center justify-center cursor-pointer hover:bg-[#edc42d]/90 transition-colors';
      default:
        return 'w-12 h-12 rounded-full border-4 border-gray-300 bg-white flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors';
    }
  };

  const getCircleIcon = (step: Step) => {
    switch (step.status) {
      case 'completed':
        return <Check size={20} className="text-white" />;
      case 'active':
        return <div className="w-3 h-3 bg-white rounded-full"></div>;
      default:
        return <step.icon size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Process
        </h1>
        <p className="text-gray-600">Click on each step to see details</p>
      </div>

      <div className="relative max-w-3xl mx-auto flex justify-start">
        <div className="w-full max-w-2xl">
          {steps.map((step, index) => {
            const isExpanded = expandedStep === step.id;

            return (
              <div key={step.id} className="relative flex items-start mb-8">
                <div className="w-24 text-left pr-4 pt-3">
                  <span className="text-sm text-gray-500 font-medium">
                    {step.timestamp}
                  </span>
                </div>

                <div className="relative z-10 flex-shrink-0" onClick={() => handleStepClick(step.id)}>
                  <div className={getCircleStyles(step)}>{getCircleIcon(step)}</div>
                </div>

                <div className="flex-1 pl-6 pt-1">
                  <div className="cursor-pointer" onClick={() => handleStepClick(step.id)}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.status === 'completed' ? 'text-[#0e7378]' :
                        step.status === 'active' ? 'text-[#edc42d]' :
                        'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      step.status === 'completed' ? 'text-[#0e7378]' :
                      step.status === 'active' ? 'text-[#edc42d]' :
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#edc42d]">
                      <p className="text-gray-700 leading-relaxed">{step.detailedContent}</p>
                      {step.id === 6 && offerAccepted && (
                        <div className="mt-4 p-3 bg-[#0e7378]/10 border border-[#0e7378]/30 rounded-lg">
                          <p className="text-sm text-[#0e7378] font-medium">
                            ✅ Documents submitted successfully!
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Document Upload */}
      {/* Modal for Document Upload */}
{showOfferModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload Required Documents</h3>
        <button onClick={() => setShowOfferModal(false)} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <p className="text-gray-600 mb-6">To accept the offer, please upload the following documents:</p>

      <div className="space-y-4">
        {/* ID Card */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Card *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'id')}
              className="hidden"
              id="id-card-upload"
            />
            <label htmlFor="id-card-upload" className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600">
              <Upload size={20} />
              <span>{idFile ? idFile.name : 'Click to upload your ID Card'}</span>
            </label>
          </div>
        </div>

        {/* Passport */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Passport *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'id')}
              className="hidden"
              id="passport-upload"
            />
            <label htmlFor="passport-upload" className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600">
              <Upload size={20} />
              <span>{cvFile ? cvFile.name : 'Click to upload your Passport'}</span>
            </label>
          </div>
        </div>

        {/* Diploma */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Diploma *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'cv')}
              className="hidden"
              id="diploma-upload"
            />
            <label htmlFor="diploma-upload" className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600">
              <Upload size={20} />
              <span>{cvFile ? cvFile.name : 'Click to upload your Diploma'}</span>
            </label>
          </div>
        </div>

        {/* Birth Certificate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Birth Certificate *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'cv')}
              className="hidden"
              id="birth-certificate-upload"
            />
            <label htmlFor="birth-certificate-upload" className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600">
              <Upload size={20} />
              <span>{cvFile ? cvFile.name : 'Click to upload your Birth Certificate'}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={() => setShowOfferModal(false)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleOfferSubmission}
          disabled={!cvFile || !cvFile || !cvFile || !cvFile}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Submit Documents
        </button>
      </div>
    </div>
  </div>
)}


      {/* Progress Summary */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Overall Progress</span>
            <span>{steps.filter(s => s.status === 'completed').length} / {steps.length} steps completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#edc42d] h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 text-xs text-gray-500">Click on each step to see complete details</div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProcess;
