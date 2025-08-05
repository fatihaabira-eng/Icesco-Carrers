import React, { useState, useRef } from 'react';
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
  LucideIcon,
  Paperclip
} from 'lucide-react';

type StepStatus = 'completed' | 'active' | 'pending' | 'terminated';

type Step = {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  detailedContent: string;
  confirmedBy: string;
  timestamp: string;
  status: StepStatus;
};

type DocumentFile = {
    key: string;
    name: string;
    file: File | null;
    required: boolean;
};


const CandidateProcess: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(5);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerDeclined, setOfferDeclined] = useState(false);
  const [joiningDate, setJoiningDate] = useState<string>('');
  const step6Ref = useRef<HTMLDivElement>(null);

  const initialDocuments: DocumentFile[] = [
    { key: 'nationalId', name: 'National ID Card', file: null, required: true },
    { key: 'passport', name: 'Passport', file: null, required: true },
    { key: 'diploma', name: 'Diploma/Certificate', file: null, required: true },
    { key: 'birthCertificate', name: 'Birth Certificate', file: null, required: true },
    { key: 'experienceCertificate', name: 'Experience Certificate', file: null, required: true },
    { key: 'marriageCertificate', name: 'Marriage Certificate', file: null, required: false },
    { key: 'idPhotos', name: '2 ID Photos', file: null, required: true },
  ];

  const [documents, setDocuments] = useState<DocumentFile[]>(initialDocuments);

  const [steps, setSteps] = useState<Step[]>([
     {
       id: 1,
       title: "Form Submitted",
       icon: FileText,
       description: "Your application form has been submitted successfully",
       detailedContent: "Thank you for applying! We have received your application and our recruitment team will begin reviewing it shortly.",
       confirmedBy: 'candidate',
       timestamp: "9th April 2025",
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
       title: "Online Interview: HR",
       icon: PhoneCall,
       description: "HR interview scheduled on Wednesday at 11:00 AM",
       detailedContent: "A 30-minute interview is scheduled on Wednesday at 11:00 AM with Sarah Martin (HR Manager). We’ll discuss your background, expectations, and the job role in detail. Please ensure you're in a quiet location.",
       confirmedBy: 'hr',
       timestamp: "20th April 2025",
       status: 'completed'
     },
     {
       id: 4,
       title: "Recrutment Committee Interview",
       icon: Users,
       description: "Interview with the technical team on Friday at 2:00 PM",
       detailedContent: "Your interview with the technical team is scheduled on Friday at 2:00 PM via Zoom. Participants: Marc Johnson (Tech Lead), Amina Badr (Team Manager). This is a 1-hour session focused on technical challenges, previous experience, and collaboration style.",
       confirmedBy: 'hr',
       timestamp: "25th April 2025",
       status: 'completed'
     },
    {
      id: 5,
      title: "Offer Received",
      icon: Mail,
      description: "You have received a job offer with next steps",
      detailedContent: `Congratulations! You've been selected for the position. The job offer includes details on salary, benefits, and expected Joining date. Please accept or decline the offer to proceed.`,
      confirmedBy: 'hr',
      timestamp: "28th April 2025",
      status: 'active'
    },
    {
      id: 6,
      title: "Upload Required Documents",
      icon: Upload,
      description: "Upload all requested documents to finalize your file.",
      detailedContent: `To complete your onboarding, please upload the required documents and select your joining date. Once submitted, our HR team will validate your file and send the final contract.`,
      confirmedBy: 'candidate',
      timestamp: "3rd May 2025",
      status: 'pending'
    },
    {
      id: 7,
      title: "Joining Date Confirmed",
      icon: Calendar,
      description: "Your start date is pending document submission.",
      detailedContent: "Welcome aboard! Once your documents are verified, your official start date will be confirmed. You will receive a detailed onboarding schedule prior to your first day.",
      confirmedBy: 'hr',
      timestamp: "10th May 2025",
      status: 'pending'
    }
  ]);

  const handleStepClick = (stepId: number) => {
    if (offerDeclined) return;
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    setSteps(prevSteps =>
      prevSteps.map(step => {
        if (step.id === 5) return { ...step, status: 'completed' };
        if (step.id === 6) return { ...step, status: 'active' };
        return step;
      })
    );
    setExpandedStep(6);
    setTimeout(() => {
        step6Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleDeclineOffer = () => {
    setOfferDeclined(true);
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id >= 5 ? { ...step, status: step.id === 5 ? 'completed' : 'terminated' } : step
      )
    );
    setExpandedStep(5);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackSubmitted(true);
      setShowFeedbackModal(false);
      // Here you would typically send the feedback to your backend
      console.log("Feedback submitted:", feedback);
      setFeedback('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docKey: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments(prevDocs =>
        prevDocs.map(doc => (doc.key === docKey ? { ...doc, file } : doc))
      );
    }
  };

  const handleDocumentSubmit = () => {
    const allRequiredFilesUploaded = documents.every(doc => !doc.required || doc.file);
    if (allRequiredFilesUploaded && joiningDate) {
      setSteps(prevSteps =>
        prevSteps.map(step => {
          if (step.id === 6) return { ...step, status: 'completed' };
          if (step.id === 7) return { 
              ...step, 
              status: 'active', 
              description: `Your joining date is set for ${new Date(joiningDate).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` 
            };
          return step;
        })
      );
      setShowUploadModal(false);
      setExpandedStep(7);
    }
  };

  const isSubmitDisabled = !joiningDate || documents.some(doc => doc.required && !doc.file);
  
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const getCircleStyles = (status: StepStatus) => {
    switch (status) {
      case 'completed': return 'bg-[#0e7378] border-[#0e7378]';
      case 'active': return 'border-[#edc42d] bg-[#edc42d]';
      case 'terminated': return 'border-red-300 bg-red-100';
      default: return 'border-gray-300 bg-white hover:border-gray-400';
    }
  };

  const getCircleIcon = (step: Step) => {
    switch (step.status) {
      case 'completed': return <Check size={20} className="text-white" />;
      case 'active': return <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>;
      case 'terminated': return <X size={20} className="text-red-500" />;
      default: return <step.icon size={20} className="text-gray-400" />;
    }
  };

  const getTextColor = (status: StepStatus) => {
      switch (status) {
          case 'completed': return 'text-[#0e7378]';
          case 'active': return 'text-[#edc42d]';
          case 'terminated': return 'text-red-600';
          default: return 'text-gray-600';
      }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white font-sans">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Process</h1>
        <p className="text-gray-600">Track your recruitment journey with us.</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
        {steps.map((step) => {
          const isExpanded = expandedStep === step.id;
          return (
            <div key={step.id} ref={step.id === 6 ? step6Ref : null} className="relative flex items-start mb-8">
              <div className="w-24 text-left pr-4 pt-3 hidden sm:block">
                <span className="text-sm text-gray-500 font-medium">{step.timestamp}</span>
              </div>
              <div className="relative z-10 flex-shrink-0">
                <div 
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${getCircleStyles(step.status)} ${step.status !== 'terminated' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => handleStepClick(step.id)}
                >
                    {getCircleIcon(step)}
                </div>
              </div>
              <div className="flex-1 pl-4 sm:pl-6 pt-1">
                <div className="cursor-pointer" onClick={() => handleStepClick(step.id)}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold ${getTextColor(step.status)}`}>{step.title}</h3>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                  <p className={`text-sm mt-1 ${getTextColor(step.status)}`}>{step.description}</p>
                </div>

                {isExpanded && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#edc42d] animate-fade-in">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{step.detailedContent}</p>
                    
                    {/* --- Step 5: Offer Actions --- */}
                    {step.id === 5 && !offerAccepted && !offerDeclined && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={handleAcceptOffer} className="px-4 py-2 bg-[#0e7378] text-white rounded-lg hover:bg-[#0e7378]/90 transition-colors shadow-sm">Accept Offer</button>
                        <button onClick={handleDeclineOffer} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm">Decline Offer</button>
                        <button onClick={() => setShowFeedbackModal(true)} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm">Send Feedback</button>
                      </div>
                    )}
                    
                    {/* --- Step 5: Declined Message --- */}
                    {step.id === 5 && offerDeclined && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-600 font-medium">
                            You have declined the job offer. This process is now closed.
                        </div>
                    )}

                    {/* --- Step 5: Feedback Submitted Message --- */}
                    {step.id === 5 && feedbackSubmitted && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-green-700 font-medium">
                            ✅ Feedback submitted successfully!
                        </div>
                    )}

                    {/* --- Step 6: Upload Button --- */}
                    {step.id === 6 && step.status === 'active' && (
                        <div className="mt-4">
                            <button onClick={() => setShowUploadModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e7378] text-white rounded-lg hover:bg-[#0e7378]/90 transition-colors shadow-sm">
                                <Upload size={18} />
                                Upload Documents
                            </button>
                        </div>
                    )}

                    {/* --- Step 6: Completed Message --- */}
                    {step.id === 6 && step.status === 'completed' && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-sm text-green-700 font-medium">
                            ✅ Documents submitted successfully! HR will review them shortly.
                        </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Upload Documents Modal --- */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Upload Required Documents</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <p className="text-gray-600 mb-6">Please upload the required documents and select your preferred joining date to finalize your offer.</p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">Preferred Joining Date *</label>
                    <input
                        type="date"
                        id="joiningDate"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#0e7378] focus:border-[#0e7378]"
                        min={getMinDate()}
                    />
                </div>
                {documents.map(doc => (
                    <div key={doc.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {doc.name} {doc.required && '*'}
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(e, doc.key)}
                                className="hidden"
                                id={`${doc.key}-upload`}
                            />
                            <label htmlFor={`${doc.key}-upload`} className="cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-600 hover:text-[#0e7378] transition-colors">
                                <Upload size={20} />
                                <span className="truncate max-w-xs">{doc.file ? doc.file.name : `Click to upload`}</span>
                                {doc.file && <Check size={20} className="text-green-500 flex-shrink-0"/>}
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={() => setShowUploadModal(false)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDocumentSubmit} disabled={isSubmitDisabled} className="w-full px-4 py-2 bg-[#0e7378] text-white rounded-lg hover:bg-[#0e7378]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Submit Documents</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Feedback Modal --- */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Provide Feedback</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <p className="text-gray-600 mb-4">We value your feedback on the recruitment process.</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 resize-y focus:ring-2 focus:ring-[#0e7378] focus:border-[#0e7378]"
              rows={5}
              placeholder="Enter your thoughts here..."
            />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button onClick={() => setShowFeedbackModal(false)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleFeedbackSubmit} disabled={!feedback.trim()} className="w-full px-4 py-2 bg-[#0e7378] text-white rounded-lg hover:bg-[#0e7378]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Submit Feedback</button>
            </div>
          </div>
        </div>
      )}

      {/* --- Progress Bar --- */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Overall Progress</span>
            <span>{steps.filter(s => s.status === 'completed').length} / {steps.length} steps completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#0e7378] h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CandidateProcess;
