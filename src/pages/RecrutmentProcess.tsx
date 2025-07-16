import React, { useState } from 'react';
import { 
  FileText, 
  Phone, 
  PhoneCall, 
  Users, 
  UserCheck, 
  CheckCircle2, 
  Mail, 
  ThumbsUp, 
  Briefcase, 
  Calendar,
  Clock,
  User,
  Check,
  ChevronDown,
  ChevronUp,
  Upload,
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
      title: "CV Selected - Pre-screening",
      icon: FileText,
      description: "Your CV has been selected for in-depth analysis by our HR team",
      detailedContent: "Congratulations! Your profile matches the criteria we're looking for in this position. Our HR team has conducted an initial evaluation of your application and wishes to continue the recruitment process with you. Your skills and experience align with our needs.",
      confirmedBy: 'hr',
      timestamp: "09:30 am",
      status: 'completed'
    },
    {
      id: 2,
      title: "Phone Interview: Scheduled",
      icon: Phone,
      description: "Phone appointment scheduled with an HR team member",
      detailedContent: "A 30-minute phone interview has been scheduled with Sarah Martin, HR Manager. This interview will allow us to get to know each other, discuss your professional background and motivations. Prepare to present your experience and ask questions about the company and position.",
      confirmedBy: 'hr',
      timestamp: "10:15 am",
      status: 'completed'
    },
    {
      id: 3,
      title: "Phone Interview - Completed",
      icon: PhoneCall,
      description: "Phone interview successfully completed",
      detailedContent: "The phone interview went very well. You demonstrated excellent understanding of the position and our company values. Your motivation and professionalism were particularly appreciated. The HR team is satisfied with this exchange and wishes to continue the process.",
      confirmedBy: 'candidate',
      timestamp: "11:00 am",
      status: 'completed'
    },
    {
      id: 4,
      title: "HR/Manager Interview: Scheduled",
      icon: Users,
      description: "In-person or video conference interview with HR team and manager",
      detailedContent: "A 1.5-hour interview is scheduled with Sarah Martin (HR) and Marc Johnson (Team Manager). This in-depth interview will evaluate your technical skills, ability to integrate into the team, and fit with company culture. Prepare concrete examples of your achievements.",
      confirmedBy: 'hr',
      timestamp: "02:30 pm",
      status: 'completed'
    },
    {
      id: 5,
      title: "HR/Manager Interview - Completed",
      icon: UserCheck,
      description: "Interview with HR team and manager completed",
      detailedContent: "Excellent interview! You impressed the team with your technical skills and ability to envision yourself in the role. Your answers to technical questions were precise and your concrete examples demonstrated your expertise. The team is unanimous about your candidacy.",
      confirmedBy: 'candidate',
      timestamp: "03:45 pm",
      status: 'active'
    },
    {
      id: 6,
      title: "Status: Internal Offer Validation",
      icon: CheckCircle2,
      description: "Validation in progress by management team and stakeholders",
      detailedContent: "Your application is currently undergoing final validation by management. This step includes budget validation, compensation level, and employment conditions. The feedback is very positive and we hope to finalize this step quickly.",
      confirmedBy: 'hr',
      timestamp: "04:20 pm",
      status: 'pending'
    },
    {
      id: 7,
      title: "Offer Sent",
      icon: Mail,
      description: "Official job offer sent by email",
      detailedContent: "The official job offer will be sent to you by email with all details: salary, benefits, start date, working conditions. You will have 7 days to review the offer and let us know your decision. Don't hesitate to contact us with any questions.",
      confirmedBy: 'hr',
      timestamp: "09:00 am",
      status: 'pending'
    },
    {
      id: 8,
      title: "Offer Accepted",
      icon: ThumbsUp,
      description: "Offer accepted by candidate with contract signature",
      detailedContent: "To officially accept the offer, please submit your updated CV and a copy of your national ID card. These documents are necessary to finalize your administrative file and prepare your employment contract.",
      confirmedBy: 'candidate',
      timestamp: "11:30 am",
      status: 'pending'
    },
    {
      id: 9,
      title: "Arrival Preparation",
      icon: Briefcase,
      description: "Preparing integration and work tools",
      detailedContent: "Preparing for your arrival: creating your IT access, setting up your workstation, planning your integration journey. You will receive an email with all practical information for your first day.",
      confirmedBy: 'hr',
      timestamp: "02:15 pm",
      status: 'pending'
    },
    {
      id: 10,
      title: "First Day Confirmed",
      icon: Calendar,
      description: "Start date confirmed and integration schedule established",
      detailedContent: "Your first day is confirmed! You will receive a detailed schedule for your first week including training, team meetings, and company presentation. Welcome to the team!",
      confirmedBy: 'candidate',
      timestamp: "04:00 pm",
      status: 'pending'
    }
  ];

  const handleStepClick = (stepId: number) => {
    if (stepId === 8 && !offerAccepted) {
      setShowOfferModal(true);
      return;
    }
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'id') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'cv') {
        setCvFile(file);
      } else {
        setIdFile(file);
      }
    }
  };

  const handleOfferSubmission = () => {
    if (cvFile && idFile) {
      setOfferAccepted(true);
      setShowOfferModal(false);
      setExpandedStep(8);
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
        <p className="text-gray-600">
          Click on each step to see details
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto flex justify-start">
        <div className="w-full max-w-2xl">
          {/* Timeline Line */}
          {/* (If you want to add the vertical line back, use the same color: bg-[#0e7378]) */}

          {steps.map((step, index) => {
            const isExpanded = expandedStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative flex items-start mb-8">
                {/* Timestamp */}
                <div className="w-24 text-left pr-4 pt-3">
                  <span className="text-sm text-gray-500 font-medium">
                    {step.timestamp}
                  </span>
                </div>

                {/* Circle Indicator */}
                <div className="relative z-10 flex-shrink-0" onClick={() => handleStepClick(step.id)}>
                  <div className={getCircleStyles(step)}>
                    {getCircleIcon(step)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pl-6 pt-1">
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.status === 'completed' ? 'text-[#0e7378]' :
                        step.status === 'active' ? 'text-[#edc42d]' :
                        'text-gray-600'
                      }`}>
                        {step.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${
                      step.status === 'completed' ? 'text-[#0e7378]' :
                      step.status === 'active' ? 'text-[#edc42d]' :
                      'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#edc42d]">
                      <p className="text-gray-700 leading-relaxed">
                        {step.detailedContent}
                      </p>
                      {step.id === 8 && offerAccepted && (
                        <div className="mt-4 p-3 bg-[#0e7378]/10 border border-[#0e7378]/30 rounded-lg">
                          <p className="text-sm text-[#0e7378] font-medium">
                            ✅ Offer accepted successfully! Documents submitted.
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

      {/* Offer Acceptance Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Accept Job Offer
              </h3>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              To accept the offer, please submit the following documents:
            </p>

            <div className="space-y-4">
              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Updated CV *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'cv')}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <Upload size={20} />
                    <span>{cvFile ? cvFile.name : 'Click to upload your CV'}</span>
                  </label>
                </div>
              </div>

              {/* ID Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID Card *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'id')}
                    className="hidden"
                    id="id-upload"
                  />
                  <label
                    htmlFor="id-upload"
                    className="cursor-pointer flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600"
                  >
                    <Upload size={20} />
                    <span>{idFile ? idFile.name : 'Click to upload your ID'}</span>
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
                disabled={!cvFile || !idFile}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Accept Offer
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
          <div className="mt-4 text-xs text-gray-500">
            Click on each step to see complete details
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProcess;