import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, Plus, Link2, CheckCircle, Info, BookOpen, Briefcase, X, GraduationCap, FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApplicationService, ApplicationData } from '../services/api';

// Predefined skills list for autocomplete
const TECHNICAL_SKILLS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  'Scala', 'R', 'MATLAB', 'SQL', 'HTML', 'CSS', 'Dart', 'Perl', 'Shell Scripting', 'PowerShell',
  
  // Web Technologies & Frameworks
  'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Next.js', 'Nuxt.js', 'Svelte', 'jQuery',
  'Bootstrap', 'Tailwind CSS', 'Sass', 'Less', 'Webpack', 'Vite', 'Parcel', 'REST API', 'GraphQL',
  'WebSockets', 'PWA', 'Web Components', 'Micro-frontends',
  
  // Mobile Development
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic', 'Cordova',
  
  // Backend & Databases
  'Spring Boot', 'Django', 'Flask', 'FastAPI', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'MongoDB',
  'MySQL', 'PostgreSQL', 'Redis', 'Elasticsearch', 'SQLite', 'Oracle', 'Microsoft SQL Server',
  'DynamoDB', 'Cassandra', 'Neo4j', 'Firebase', 'Supabase',
  
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD',
  'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet', 'Vagrant', 'Nginx', 'Apache',
  'Linux', 'Ubuntu', 'CentOS', 'Windows Server', 'Microservices', 'Serverless',
  
  // Data Science & AI
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI', 'Apache Spark', 'Hadoop',
  'Natural Language Processing', 'Computer Vision', 'Neural Networks', 'Big Data',
  
  // Testing & Quality Assurance
  'Unit Testing', 'Integration Testing', 'Jest', 'Cypress', 'Selenium', 'Pytest', 'JUnit',
  'Test-Driven Development', 'Behavior-Driven Development', 'Quality Assurance', 'Manual Testing',
  'Automated Testing', 'Performance Testing', 'Load Testing',
  
  // Version Control & Tools
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial', 'Code Review', 'Pull Requests',
  
  // Design & UX/UI Tools
  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InDesign', 'Wireframing', 'Prototyping',
  
  // Security & Technical
  'Cybersecurity', 'Information Security', 'Network Security', 'Penetration Testing',
  'Vulnerability Assessment', 'OWASP', 'SSL/TLS', 'OAuth', 'JWT', 'Encryption',
  
  // Business & Technical Tools
  'Google Analytics', 'Salesforce', 'HubSpot', 'CRM', 'ERP', 'Business Intelligence'
];

const COMPETENTIAL_SKILLS = [
  // Leadership & Management
  'Leadership', 'Team Leadership', 'Project Management', 'Team Management', 'Strategic Planning',
  'Decision Making', 'Delegation', 'Mentoring', 'Coaching', 'Performance Management',
  'Change Management', 'Risk Management', 'Conflict Resolution', 'Stakeholder Management',
  
  // Communication & Interpersonal
  'Communication', 'Written Communication', 'Verbal Communication', 'Public Speaking',
  'Presentation Skills', 'Active Listening', 'Interpersonal Skills', 'Negotiation',
  'Customer Service', 'Client Relations', 'Cross-Cultural Communication', 'Multilingual Communication',
  
  // Problem Solving & Analysis
  'Problem Solving', 'Critical Thinking', 'Analytical Thinking', 'Creative Thinking',
  'Innovation', 'Research Skills', 'Data Analysis', 'Strategic Thinking', 'Systems Thinking',
  
  // Personal & Professional Development
  'Adaptability', 'Flexibility', 'Learning Agility', 'Continuous Learning', 'Self-Motivation',
  'Initiative', 'Proactivity', 'Resilience', 'Stress Management', 'Work-Life Balance',
  
  // Collaboration & Teamwork
  'Teamwork', 'Collaboration', 'Cross-Functional Collaboration', 'Remote Collaboration',
  'Cultural Sensitivity', 'Empathy', 'Emotional Intelligence', 'Social Skills',
  
  // Organization & Time Management
  'Time Management', 'Organization', 'Planning', 'Prioritization', 'Multitasking',
  'Attention to Detail', 'Quality Focus', 'Efficiency', 'Productivity', 'Goal Setting',
  
  // Business & Industry Skills
  'Business Acumen', 'Market Research', 'Customer Focus', 'Sales Skills', 'Marketing Skills',
  'Financial Literacy', 'Budget Management', 'Cost Management', 'Operations Management',
  
  // Methodologies & Approaches
  'Agile', 'Scrum', 'Kanban', 'Waterfall', 'Lean', 'Six Sigma', 'Design Thinking',
  'User Experience', 'User Interface', 'User Research', 'Usability Testing',
  
  // Digital & Modern Skills
  'Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'Email Marketing',
  'SEO', 'SEM', 'E-commerce', 'Digital Transformation', 'Remote Work', 'Virtual Leadership'
];

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

interface Education {
  place: string;
  diploma: string;
  startDate: string;
  endDate: string;
  certificate?: File | null; 
}

interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string;
  current: boolean;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  certificate?: File | null;
}

interface Reference {
  name: string;
  title: string;
  email: string;
  note?: string;
  phone?: string;
}

interface SocialMedia {
  platform: string;
  url: string;
}

interface Language {
  language: string;
  level: string;
  learnedFrom?: string; // Add where the language was learned
  certificate?: File | null;
}

const LANGUAGE_LEARNING_SOURCES = [
  'Self-taught',
  'School/University',
  'Language Institute',
  'Online Course',
  'Private Tutor',
  'Immersion/Living Abroad',
  'Family/Native',
  'Work Environment',
  'Language Exchange',
  'Mobile Apps',
  'Books/Literature',
  'Movies/TV Shows',
  'Other'
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
  technicalSkills: string[]; // Changed from skills to technicalSkills
  competentialSkills: string[];
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



const SkillDisplay: React.FC<{
  skill: string;
  onRemove: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  skillType: 'technical' | 'competential';
   }> = ({ skill, onRemove, formData, setFormData, skillType }) => {
  const badgeColor = skillType === 'technical' ? 'bg-teal-100 text-teal-800' : 'bg-yellow-100 text-yellow-800';
  const iconColor = skillType === 'technical' ? 'text-teal-600' : 'text-yellow-600';

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}>
              {skill}
            </span>
          </div>
        </div>
        
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Remove skill"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Experience Selection */}
      <div className="mb-4">
        <h4 className={`text-sm font-medium text-gray-700 mb-2 flex items-center gap-2`}>
          <Briefcase className={`w-4 h-4 ${iconColor}`} />
          Related Experience:
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {formData.experience.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No experience entries added yet</p>
          ) : (
            formData.experience.map((exp, expIndex) => (
              <label key={expIndex} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded border cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.skillExperiences[skill]?.includes(expIndex) || false}
                  onChange={(e) => {
                    const newSkillExperiences = { ...formData.skillExperiences };
                    
                    if (e.target.checked) {
                      if (!newSkillExperiences[skill]) {
                        newSkillExperiences[skill] = [];
                      }
                      if (!newSkillExperiences[skill].includes(expIndex)) {
                        newSkillExperiences[skill].push(expIndex);
                      }
                    } else {
                      if (newSkillExperiences[skill]) {
                        newSkillExperiences[skill] = newSkillExperiences[skill].filter(i => i !== expIndex);
                        if (newSkillExperiences[skill].length === 0) {
                          delete newSkillExperiences[skill];
                        }
                      }
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      skillExperiences: newSkillExperiences
                    }));
                  }}
                  className={`w-4 h-4 border-gray-300 rounded focus:ring-2 mt-0.5 ${
                    skillType === 'technical' ? 'text-teal-600 focus:ring-teal-500' : 'text-blue-600 focus:ring-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {exp.jobTitle || 'Untitled Position'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {exp.company || 'Unknown Company'} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Education Selection */}
      <div className="mb-4">
        <h4 className={`text-sm font-medium text-gray-700 mb-2 flex items-center gap-2`}>
          <GraduationCap className={`w-4 h-4 ${iconColor}`} />
          Related Education:
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {formData.education.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No education entries added yet</p>
          ) : (
            formData.education.map((edu, eduIndex) => (
              <label key={eduIndex} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded border cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.skillEducation[skill]?.includes(eduIndex) || false}
                  onChange={(e) => {
                    const newSkillEducation = { ...formData.skillEducation };
                    
                    if (e.target.checked) {
                      if (!newSkillEducation[skill]) {
                        newSkillEducation[skill] = [];
                      }
                      if (!newSkillEducation[skill].includes(eduIndex)) {
                        newSkillEducation[skill].push(eduIndex);
                      }
                    } else {
                      if (newSkillEducation[skill]) {
                        newSkillEducation[skill] = newSkillEducation[skill].filter(i => i !== eduIndex);
                        if (newSkillEducation[skill].length === 0) {
                          delete newSkillEducation[skill];
                        }
                      }
                    }
                    
                    setFormData(prev => ({
                      ...prev,
                      skillEducation: newSkillEducation
                    }));
                  }}
                  className={`w-4 h-4 border-gray-300 rounded focus:ring-2 mt-0.5 ${
                    skillType === 'technical' ? 'text-teal-600 focus:ring-teal-500' : 'text-blue-600 focus:ring-blue-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {edu.diploma || 'Untitled Diploma'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {edu.place || 'Unknown Institution'} • {new Date(edu.startDate).getFullYear() || ''} - {new Date(edu.endDate).getFullYear() || ''}
                  </div>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-3">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {formData.skillExperiences[skill]?.length || 0} experience(s)
          </span>
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            {formData.skillEducation[skill]?.length || 0} education(s)
          </span>
        </div>
      </div>
    </div>
  );
};


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
    experience: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '', current: false }],
     technicalSkills: [''], // Changed from skills
  competentialSkills: [''], // Added
    languages: [{ language: '', level: '', learnedFrom: '', certificate: null }],
    socialMedia: [{ platform: '', url: '' }],
    practicalExperience: '',
    references: [{ name: '', title: '', email: '',phone: '', note: '' }],
    cv: null,
    videoIntroSubmitted: false,
    videoFile: null,

     skillExperiences: {},
    skillEducation: {},
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvParsing, setCvParsing] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Skills autocomplete state
  const [skillSuggestions, setSkillSuggestions] = useState<{[key: number]: string[]}>({});
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  // Languages autocomplete state
  const [languageSuggestions, setLanguageSuggestions] = useState<{[key: number]: string[]}>({});
  const [activeLanguageIndex, setActiveLanguageIndex] = useState<number | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Skill input state for step 4
  const [technicalSkillInput, setTechnicalSkillInput] = useState<string>('');
  const [competentialSkillInput, setCompetentialSkillInput] = useState<string>('');
  const [technicalSkillSuggestions, setTechnicalSkillSuggestions] = useState<{[key: number]: string[]}>({});
const [competentialSkillSuggestions, setCompetentialSkillSuggestions] = useState<{[key: number]: string[]}>({});

const removeTechnicalSkill = (skillToRemove: string) => {
  setFormData(prev => ({
    ...prev,
    technicalSkills: prev.technicalSkills.filter(skill => skill !== skillToRemove),
    skillExperiences: Object.fromEntries(
      Object.entries(prev.skillExperiences).filter(([skill]) => skill !== skillToRemove)
    ),
    skillEducation: Object.fromEntries(
      Object.entries(prev.skillEducation).filter(([skill]) => skill !== skillToRemove)
    )
  }));
};

const removeCompetentialSkill = (skillToRemove: string) => {
  setFormData(prev => ({
    ...prev,
    competentialSkills: prev.competentialSkills.filter(skill => skill !== skillToRemove),
    skillExperiences: Object.fromEntries(
      Object.entries(prev.skillExperiences).filter(([skill]) => skill !== skillToRemove)
    ),
    skillEducation: Object.fromEntries(
      Object.entries(prev.skillEducation).filter(([skill]) => skill !== skillToRemove)
    )
  }));
};



const detectSkillsInText = (text: string): string[] => {
  const detectedSkills: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Check both technical and competential skills
  [...TECHNICAL_SKILLS, ...COMPETENTIAL_SKILLS].forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (lowerText.includes(skillLower)) {
      detectedSkills.push(skill);
    }
  });
  
  return detectedSkills;
};

// Function to update skill relationships when education changes
const updateSkillEducationRelationships = () => {
  const newSkillEducation: { [skill: string]: number[] } = {};
  
  formData.education.forEach((edu, eduIndex) => {
    const allEducationText = `${edu.place} ${edu.diploma}`.toLowerCase();
    
    // Check technical skills
    formData.technicalSkills.forEach(skill => {
      if (skill.trim() === '') return;
      const skillLower = skill.toLowerCase();
      if (allEducationText.includes(skillLower)) {
        if (!newSkillEducation[skill]) {
          newSkillEducation[skill] = [];
        }
        if (!newSkillEducation[skill].includes(eduIndex)) {
          newSkillEducation[skill].push(eduIndex);
        }
      }
    });
    
    // Check competential skills
    formData.competentialSkills.forEach(skill => {
      if (skill.trim() === '') return;
      const skillLower = skill.toLowerCase();
      if (allEducationText.includes(skillLower)) {
        if (!newSkillEducation[skill]) {
          newSkillEducation[skill] = [];
        }
        if (!newSkillEducation[skill].includes(eduIndex)) {
          newSkillEducation[skill].push(eduIndex);
        }
      }
    });
  });
  
  setFormData(prev => ({
    ...prev,
    skillEducation: newSkillEducation
  }));
};
// Function to update skill relationships when experience changes
const updateSkillExperienceRelationships = () => {
  const newSkillExperiences: { [skill: string]: number[] } = {};
  
  formData.experience.forEach((exp, expIndex) => {
    const allExperienceText = `${exp.company} ${exp.jobTitle} ${exp.description} ${exp.achievements}`.toLowerCase();
    
    // Check technical skills
    formData.technicalSkills.forEach(skill => {
      if (skill.trim() === '') return;
      const skillLower = skill.toLowerCase();
      if (allExperienceText.includes(skillLower)) {
        if (!newSkillExperiences[skill]) {
          newSkillExperiences[skill] = [];
        }
        if (!newSkillExperiences[skill].includes(expIndex)) {
          newSkillExperiences[skill].push(expIndex);
        }
      }
    });
    
    // Check competential skills
    formData.competentialSkills.forEach(skill => {
      if (skill.trim() === '') return;
      const skillLower = skill.toLowerCase();
      if (allExperienceText.includes(skillLower)) {
        if (!newSkillExperiences[skill]) {
          newSkillExperiences[skill] = [];
        }
        if (!newSkillExperiences[skill].includes(expIndex)) {
          newSkillExperiences[skill].push(expIndex);
        }
      }
    });
  });
  
  setFormData(prev => ({
    ...prev,
    skillExperiences: newSkillExperiences
  }));
};

// Function to update all skill relationships
const updateAllSkillRelationships = () => {
  updateSkillEducationRelationships();
  updateSkillExperienceRelationships();
};

  // Handler for skill input change (for step 4)
  const handleTechnicalSkillInputChange = (value: string) => {
  setTechnicalSkillInput(value);

  if (value.trim().length > 0) {
    const searchTerm = value.toLowerCase();
    const filtered = TECHNICAL_SKILLS
      .filter(skill =>
        skill.toLowerCase().includes(searchTerm) &&
        !formData.technicalSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())
      )
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        if (aLower === searchTerm) return -1;
        if (bLower === searchTerm) return 1;
        if (aLower.startsWith(searchTerm) && !bLower.startsWith(searchTerm)) return -1;
        if (bLower.startsWith(searchTerm) && !aLower.startsWith(searchTerm)) return 1;
        return a.localeCompare(b);
      })
      .slice(0, 8);

    setTechnicalSkillSuggestions({ ...technicalSkillSuggestions, 0: filtered });
  } else {
    setTechnicalSkillSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[0];
      return newSuggestions;
    });
  }
};

const handleCompetentialSkillInputChange = (value: string) => {
  setCompetentialSkillInput(value);

  if (value.trim().length > 0) {
    const searchTerm = value.toLowerCase();
    const filtered = COMPETENTIAL_SKILLS
      .filter(skill =>
        skill.toLowerCase().includes(searchTerm) &&
        !formData.competentialSkills.some(existingSkill => existingSkill.toLowerCase() === skill.toLowerCase())
      )
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        if (aLower === searchTerm) return -1;
        if (bLower === searchTerm) return 1;
        if (aLower.startsWith(searchTerm) && !bLower.startsWith(searchTerm)) return -1;
        if (bLower.startsWith(searchTerm) && !aLower.startsWith(searchTerm)) return 1;
        return a.localeCompare(b);
      })
      .slice(0, 8);

    setCompetentialSkillSuggestions({ ...competentialSkillSuggestions, 0: filtered });
  } else {
    setCompetentialSkillSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[0];
      return newSuggestions;
    });
  }
};

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Education & Professional Certifications' },
    { number: 3, title: 'Professional Experience' },
    { number: 4, title: 'Skills' },
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

useEffect(() => {
  if ((formData.technicalSkills.length > 0 || formData.competentialSkills.length > 0) && 
      (formData.education.length > 0 || formData.experience.length > 0)) {
    updateAllSkillRelationships();
  }
}, [formData.technicalSkills, formData.competentialSkills, formData.education, formData.experience]);

  // Convert form data to backend API format
  const convertToApplicationData = (): ApplicationData => {
    return {
      offre_id: formData.offerId,
      full_name: formData.fullName,
      email: formData.email,
      country_code: formData.phoneCountryCode,
      phone_number: formData.phoneNumber,
      nationality: formData.nationality,
      date_of_birth: formData.dateOfBirth,
      address: formData.address,
      education: formData.education.map(edu => ({
        school: edu.place,
        diploma: edu.diploma,
        start_date: edu.startDate,
        end_date: edu.endDate,
        gpa: ''
      })),
      experience: formData.experience.map(exp => ({
        company: exp.company,
        job_title: exp.jobTitle,
        start_date: exp.startDate,
        end_date: exp.current ? 'Currently' : exp.endDate,
        description: exp.description,
        major_achievements: exp.achievements,
        location: ''
      })),
     skills: [
  ...formData.technicalSkills.filter(skill => skill.trim() !== ''),
  ...formData.competentialSkills.filter(skill => skill.trim() !== '')
],
      practical_experience: formData.practicalExperience,
      certifications: formData.certifications
        .filter(cert => cert.title.trim() !== '')
        .map(cert => ({
          certificate_title: cert.title,
          issuing_organization: cert.issuer,
          date_received: cert.date,
          certificate_url: cert.url || ''
        })),
      professional_references: formData.references
        .filter(ref => ref.name.trim() !== '')
        .map(ref => ({
          name: ref.name,
          title_or_relationship: ref.title,
          email: ref.email,
          note: ref.note || ''
        })),
      social_media: {
        linkedin: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'linkedin')?.url || '',
        github: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'github')?.url || '',
        twitter: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'twitter')?.url || '',
        facebook: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'facebook')?.url || '',
        instagram: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'instagram')?.url || '',
        portfolio: formData.socialMedia.find(sm => sm.platform.toLowerCase() === 'portfolio')?.url || '',
        other: formData.socialMedia.find(sm => !['linkedin', 'github', 'twitter', 'facebook', 'instagram', 'portfolio'].includes(sm.platform.toLowerCase()))?.url || '',
      },
    };
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log('🚀 FORM SUBMISSION STARTED');
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const applicationData = convertToApplicationData();
      console.log('📄 Calling API with data:', applicationData);
      
      const response = await ApplicationService.submitApplication(
        applicationData,
        formData.cv,
        formData.videoFile
      );
      
      console.log('📨 API Response:', response);
      
      // Check if response indicates success
      const isSuccessful = response.success === true || !!response.application_id || !!response.applicationId;
      
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
        if (response.application_id || response.applicationId) {
          const appId = response.application_id || response.applicationId;
          localStorage.setItem('lastApplicationId', appId);
          console.log('📝 Stored application ID:', appId);
        }
      } else {
        console.log('❌ API did not return success indication. Response:', response);
        setSubmitError(response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.log('💥 EXCEPTION during submission:', error);
      
      // Provide user-friendly error messages based on the error
      let userFriendlyMessage = 'Failed to submit application';
      
      if (error instanceof Error) {
        userFriendlyMessage = error.message;
        
        // Add additional context for common issues
        if (error.message.includes('network') || error.message.includes('fetch')) {
          userFriendlyMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
          userFriendlyMessage = 'The request took too long. This might be due to large files. Please try again with smaller files.';
        } else if (error.message.includes('files are too large')) {
          userFriendlyMessage = 'Your files are too large. Please use a smaller CV (under 10MB) or video (under 50MB).';
        }
      }
      
      setSubmitError(userFriendlyMessage);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 FORM SUBMISSION COMPLETED');
    }
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
  // Ensure correct type for 'certificate' field
  if (field === 'certificate') {
    updated[index][field] = value as unknown as File | null;
  } else {
    updated[index][field] = value;
  }
  setFormData({ ...formData, education: updated });
  
  // Update skill relationships after education changes
  setTimeout(() => {
    updateSkillEducationRelationships();
  }, 100);
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

 const updateExperienceField = (index: number, field: keyof Experience, value: string | boolean) => {
  const updated = [...formData.experience];
  (updated[index] as any)[field] = value;
  setFormData({ ...formData, experience: updated });
  
  // Update skill relationships after experience changes
  setTimeout(() => {
    updateSkillExperienceRelationships();
  }, 100);
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

 

  // Function to handle suggestion selection
  const selectSkillSuggestion = (index: number, skill: string) => {
    const updated = [...formData.technicalSkills];
    updated[index] = skill;
    setFormData({ ...formData, technicalSkills: updated });
    
    // Clear suggestions for this index
    setSkillSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[index];
      return newSuggestions;
    });
    setActiveSkillIndex(null);
  };

  // Function to clear suggestions when clicking outside
  const clearSkillSuggestions = (index: number) => {
    setTimeout(() => {
      if (activeSkillIndex === index) {
        setSkillSuggestions(prev => {
          const newSuggestions = { ...prev };
          delete newSuggestions[index];
          return newSuggestions;
        });
        setActiveSkillIndex(null);
      }
    }, 150); // Small delay to allow for suggestion clicks
  };

  // Function to handle language suggestion selection
  const selectLanguageSuggestion = (index: number, language: string) => {
    const updated = [...formData.languages];
    updated[index].language = language;
    setFormData({ ...formData, languages: updated });
    
    // Clear suggestions for this index
    setLanguageSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[index];
      return newSuggestions;
    });
    setActiveLanguageIndex(null);
  };

  // Function to clear language suggestions when clicking outside
  const clearLanguageSuggestions = (index: number) => {
    setTimeout(() => {
      if (activeLanguageIndex === index) {
        setLanguageSuggestions(prev => {
          const newSuggestions = { ...prev };
          delete newSuggestions[index];
          return newSuggestions;
        });
        setActiveLanguageIndex(null);
      }
    }, 150); // Small delay to allow for suggestion clicks
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
            exp => exp.company.trim() !== '' && exp.jobTitle.trim() !== '' && exp.startDate.trim() !== '' && (exp.current || exp.endDate.trim() !== '') && exp.description.trim() !== '' && exp.achievements.trim() !== ''
          ) &&
          formData.practicalExperience.trim() !== ''
        );
      case 4:
  return (
    formData.technicalSkills.length > 0 &&
    formData.technicalSkills.every(skill => skill.trim() !== '') &&
    formData.competentialSkills.length > 0 &&
    formData.competentialSkills.every(skill => skill.trim() !== '')
  );
      case 5:
        return (
          formData.languages.length > 0 &&
          formData.languages.every(
            lang => lang.language.trim() !== '' && lang.level.trim() !== ''
          )
        );
      case 6:
        return (
          formData.socialMedia.length > 0 &&
          formData.socialMedia.every(
            sm => sm.platform.trim() !== '' && sm.url.trim() !== ''
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
    
    setTimeout(() => {
      const fakeInfo = {
        // Personal Information
        fullName: "John Doe",
        email: "john.doe@email.com",
        phoneCountryCode: "+212",
        phoneNumber: "600 123 456",
        nationality: "Moroccan",
        dateOfBirth: "1990-01-01",
        address: "123 Main St, Rabat, Morocco",
        
        // Education
        education: [
          { 
            place: "Université Mohammed V", 
            diploma: "Master en Informatique", 
            startDate: "2012-09-01", 
            endDate: "2014-06-30" 
          },
          { 
            place: "Université Hassan II", 
            diploma: "Licence en Informatique", 
            startDate: "2009-09-01", 
            endDate: "2012-06-30" 
          }
        ],
        
        // Certifications
      certifications: [
        { 
          title: "React Developer Certification", 
          issuer: "Coursera", 
          date: "2020-06-01", 
          url: "https://coursera.org/cert/react-dev",
          certificate: null // Will be populated if user uploads
        },
        { 
          title: "AWS Cloud Practitioner", 
          issuer: "Amazon Web Services", 
          date: "2021-03-15", 
          url: "https://aws.amazon.com/certification/",
          certificate: null // Will be populated if user uploads
        }
      ],
        
        // Professional Experience
        experience: [
          { 
            company: "TechCorp Solutions", 
            jobTitle: "Senior Software Engineer", 
            startDate: "2018-01-01", 
            endDate: "", 
            description: "Led development of web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.", 
            achievements: "Successfully delivered 3 major projects ahead of schedule, mentored 2 junior developers, improved code quality by implementing automated testing.", 
            current: true 
          },
          { 
            company: "Digital Innovations Ltd", 
            jobTitle: "Software Engineer", 
            startDate: "2015-01-01", 
            endDate: "2017-12-31", 
            description: "Developed and maintained web applications using JavaScript, PHP and MySQL. Participated in agile development process.", 
            achievements: "Reduced application load time by 40%, implemented new features that increased user engagement by 25%.", 
            current: false 
          }
        ],
        
        // Skills
        technicalSkills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Git", "MySQL", "MongoDB"],
competentialSkills: ["Leadership", "Communication", "Problem Solving", "Team Management", "Project Management"],
        
       languages: [
  { 
    language: "Arabic", 
    level: "Native", 
    learnedFrom: "Family/Native", 
    certificate: null 
  },
  { 
    language: "French", 
    level: "Advanced", 
    learnedFrom: "School/University", 
    certificate: null 
  },
  { 
    language: "English", 
    level: "Proficient", 
    learnedFrom: "Language Institute", 
    certificate: null 
  },
  { 
    language: "Spanish", 
    level: "Intermediate", 
    learnedFrom: "Online Course", 
    certificate: null 
  }
],
        
        // Practical Experience
        practicalExperience: "Contributed to several open-source projects including a recruitment portal system. Developed personal projects using modern web technologies. Participated in hackathons and coding competitions. Experience with both frontend and backend development, database design, and cloud deployment.",
        
        // Social Media
        socialMedia: [
          { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
          { platform: "GitHub", url: "https://github.com/johndoe" },
          { platform: "Portfolio", url: "https://johndoe-portfolio.com" }
        ],
        
        // References
        references: [
          { 
            name: "Jane Smith", 
            title: "Senior Manager", 
            email: "jane.smith@techcorp.com", 
            note: "Can speak to technical skills and leadership abilities. Worked closely for 3 years." 
          },
          { 
            name: "Ahmed Benali", 
            title: "Team Lead", 
            email: "ahmed.benali@digitalinnovations.com", 
            note: "Former supervisor who can provide insights on work ethic and problem-solving skills." 
          }
        ],
         // Initialize skill relationships
        skillExperiences: {
        "JavaScript": [0, 1], // Both experience entries mention JavaScript
        "React": [0], // First experience mentions React
        "Node.js": [0], // First experience mentions Node.js
        "PHP": [1], // Second experience mentions PHP
        "MySQL": [1], // Second experience mentions MySQL
      },
      skillEducation: {
        "JavaScript": [0], // Computer Science education related to JavaScript
        "Python": [0], // Computer Science education covers Python
      },
        // Keep the uploaded CV but leave video empty as requested
        cv: file,
        videoFile: null,
        videoIntroSubmitted: false,
      };
      setFormData(prev => ({ ...prev, ...fakeInfo }));
      setCvParsing(false);
      
      // Show success message
      setTimeout(() => {
        alert("✅ CV processed successfully! All form fields have been filled with the extracted information. You can now review and edit the details before submitting.");
      }, 100);
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
                <div className="relative">
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent"
                    placeholder="Enter your full address"
                    rows={3}
                  />
                  <label
                    htmlFor="address"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      formData.address 
                        ? 'top-2 text-xs text-teal-600 font-medium' 
                        : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
                    } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium`}
                  >
                    Address
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Education & Professional Certifications</h2>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Education
          </h3>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, education: [...prev.education, { place: '', diploma: '', startDate: '', endDate: '', certificate: null }] }))}
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
                id={`school-${index}` as keyof FormData} 
                value={edu.place} 
                placeholder="Institution name" 
                onChange={(_, value) => updateEducationField(index, 'place', value)} 
              />
              <InputField 
                label="Diploma/Degree" 
                id={`diploma-${index}` as keyof FormData} 
                value={edu.diploma} 
                placeholder="e.g. Bachelor's, Master's, PhD" 
                onChange={(_, value) => updateEducationField(index, 'diploma', value)} 
              />
              <InputField 
                label="Start Date" 
                id={`startDate-${index}` as keyof FormData} 
                type="date" 
                value={edu.startDate} 
                onChange={(_, value) => updateEducationField(index, 'startDate', value)} 
              />
              <InputField 
                label="End Date" 
                id={`endDate-${index}` as keyof FormData} 
                type="date" 
                value={edu.endDate} 
                onChange={(_, value) => updateEducationField(index, 'endDate', value)} 
              />
            </div>

            {/* Certificate Upload Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Education Certificate/Diploma (Optional)
              </h4>
              
              <div className="flex items-center gap-4">
                {/* Upload Button */}
                <label className="cursor-pointer flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 transition">
                  <Download className="w-4 h-4 mr-2" />
                  {edu.certificate ? 'Change Certificate' : 'Upload Certificate'}
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

      {/* Professional Certifications Section (unchanged) */}
     <div className="border-t border-gray-200 pt-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
      <BookOpen className="w-5 h-5" />
      Professional Certifications
    </h3>
    <button
      onClick={() => setFormData((prev) => ({ ...prev, certifications: [...prev.certifications, { title: '', issuer: '', date: '', url: '', certificate: null }] }))}
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
          id={`cert-title-${index}` as keyof FormData} 
          value={cert.title} 
          placeholder="e.g. React Developer Certification" 
          onChange={(_, value) => updateCertificationField(index, 'title', value)} 
        />
        <InputField 
          label="Issuing Organization" 
          id={`cert-issuer-${index}` as keyof FormData} 
          value={cert.issuer} 
          placeholder="e.g. Coursera, Google, Microsoft" 
          onChange={(_, value) => updateCertificationField(index, 'issuer', value)} 
        />
        <InputField 
          label="Date Received" 
          id={`cert-date-${index}` as keyof FormData} 
          type="date" 
          value={cert.date} 
          onChange={(_, value) => updateCertificationField(index, 'date', value)} 
        />
        <InputField 
          label="Certificate URL (Optional)" 
          id={`cert-url-${index}` as keyof FormData} 
          value={cert.url || ''} 
          placeholder="e.g. https://coursera.org/verify/123456" 
          onChange={(_, value) => updateCertificationField(index, 'url', value)} 
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
      case 3:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Professional Experience</h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> Work History
              </h3>
              <button
                onClick={() => setFormData((prev) => ({ ...prev, experience: [...prev.experience, { company: '', jobTitle: '', startDate: '', endDate: '', description: '', achievements: '', current: false }] }))}
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
                <div className="space-y-2">
                  {exp.current ? (
                    <div className="relative">
                      <div className="w-full px-4 py-3 pt-7 pb-1 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 shadow-sm">
                        Currently
                      </div>
                      <label className="absolute left-4 top-2 text-xs text-teal-600 font-medium pointer-events-none">
                        End Date
                      </label>
                    </div>
                  ) : (
                    <InputField 
                      label="End Date" 
                      id={`endDate-exp-${index}` as keyof FormData} 
                      type="date" 
                      value={exp.endDate} 
                      onChange={(_, value) => updateExperienceField(index, 'endDate', value)}
                    />
                  )}
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => {
                        const updatedExperience = [...formData.experience];
                        updatedExperience[index].current = e.target.checked;
                        if (e.target.checked) {
                          updatedExperience[index].endDate = 'Currently';
                        } else {
                          updatedExperience[index].endDate = '';
                        }
                        setFormData({ ...formData, experience: updatedExperience });
                      }}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-600">I currently work here</span>
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ">Main Tasks</label>
                  <textarea
                    value={exp.description}
                    onChange={e => updateExperienceField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
                    placeholder="Job description ..."
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                   Major Achievements
                  </label>
                  <textarea
                    value={exp.achievements}
                    onChange={e => updateExperienceField(index, 'achievements', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400 min-h-[100px]"
                    placeholder="Achievements..."
                    rows={4}
                  />
                </div>
                {formData.experience.length > 1 && (
                  <button
                    onClick={() => setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) })}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
                    title="Remove experience entry"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            
          </div>
        );

 case 4:
  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Skills</h2>

      {/* Technical Skills Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Technical Skills
        </h3>
        
        {/* Technical Skill Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={technicalSkillInput}
            onChange={(e) => handleTechnicalSkillInputChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm placeholder-gray-400"
            placeholder="Type a technical skill (e.g. JavaScript, Python, AWS...)"
          />
          
          {/* Technical Skill Suggestions */}
          {technicalSkillSuggestions[0] && technicalSkillSuggestions[0].length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {technicalSkillSuggestions[0].map((suggestion, suggestionIndex) => (
                <button
                  key={suggestionIndex}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      technicalSkills: [...prev.technicalSkills, suggestion]
                    }));
                    setTechnicalSkillInput('');
                    setTechnicalSkillSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[0];
                      return newSuggestions;
                    });
                    
                    setTimeout(() => {
                      updateAllSkillRelationships();
                    }, 100);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700 focus:outline-none transition-colors"
                >
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Technical Skills Display */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Your Technical Skills ({formData.technicalSkills.filter(skill => skill.trim() !== '').length})
          </h4>
          
          {formData.technicalSkills.filter(skill => skill.trim() !== '').length === 0 ? (
            <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
              <p className="text-sm">No technical skills added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.technicalSkills
                .filter(skill => skill.trim() !== '')
                .map((skill, index) => (
                <SkillDisplay 
                  key={`tech-${index}`}
                  skill={skill}
                  onRemove={() => removeTechnicalSkill(skill)}
                  formData={formData}
                  setFormData={setFormData}
                  skillType="technical"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Competential Skills Section */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" /> Competential Skills
        </h3>
        
        {/* Competential Skill Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={competentialSkillInput}
            onChange={(e) => handleCompetentialSkillInputChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm placeholder-gray-400"
            placeholder="Type a competential skill (e.g. Leadership, Communication, Problem Solving...)"
          />
          
          {/* Competential Skill Suggestions */}
          {competentialSkillSuggestions[0] && competentialSkillSuggestions[0].length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {competentialSkillSuggestions[0].map((suggestion, suggestionIndex) => (
                <button
                  key={suggestionIndex}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      competentialSkills: [...prev.competentialSkills, suggestion]
                    }));
                    setCompetentialSkillInput('');
                    setCompetentialSkillSuggestions(prev => {
                      const newSuggestions = { ...prev };
                      delete newSuggestions[0];
                      return newSuggestions;
                    });
                    
                    setTimeout(() => {
                      updateAllSkillRelationships();
                    }, 100);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none transition-colors"
                >
                  <span className="font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Competential Skills Display */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Your Competential Skills ({formData.competentialSkills.filter(skill => skill.trim() !== '').length})
          </h4>
          
          {formData.competentialSkills.filter(skill => skill.trim() !== '').length === 0 ? (
            <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
              <p className="text-sm">No competential skills added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.competentialSkills
                .filter(skill => skill.trim() !== '')
                .map((skill, index) => (
                <SkillDisplay 
                  key={`comp-${index}`}
                  skill={skill}
                  onRemove={() => removeCompetentialSkill(skill)}
                  formData={formData}
                  setFormData={setFormData}
                  skillType="competential"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
case 5:
  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-teal-600">Languages</h2>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Languages
          </h3>
          <button
            onClick={() => setFormData((prev) => ({ 
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
                  onChange={e => updateLanguageField(index, 'language', e.target.value)}
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

              {/* Where Language Was Learned */}
              <div className="relative">
                <select
                  value={language.learnedFrom || ''}
                  onChange={e => updateLanguageField(index, 'learnedFrom', e.target.value)}
                  className="w-full px-4 py-3 pt-6 pb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer"
                >
                  <option value=""></option>
                  {LANGUAGE_LEARNING_SOURCES.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  language.learnedFrom 
                    ? 'top-2 text-xs text-teal-600 font-medium' 
                    : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
                } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium`}>
                  Where Did You Learn It?
                </label>
              </div>

              {/* Placeholder for grid alignment */}
              <div></div>
            </div>

            {/* Language Certificate Upload Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-600" />
                Language Certificate (Optional)
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
      case 6:
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
                <InputField label="Platform" id={`platform-${index}` as keyof FormData} value={sm.platform} placeholder="e.g. LinkedIn, GitHub, Twitter, Facebook, Instagram, Portfolio" onChange={(_, value) => updateSocialMediaField(index, 'platform', value)} />
                <InputField label="URL" id={`url-${index}` as keyof FormData} value={sm.url} placeholder="e.g. https://linkedin.com/in/username" onChange={(_, value) => updateSocialMediaField(index, 'url', value)} />
                {formData.socialMedia.length > 1 && (
                  <button
                    onClick={() => setFormData({ ...formData, socialMedia: formData.socialMedia.filter((_, i) => i !== index) })}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all duration-200 z-10"
                    title="Remove social media entry"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case 7:
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
                <InputField label="Company" id={`ref-name-${index}` as keyof FormData} value={ref.name} placeholder="e.g. Jane Smith" onChange={(_, value) => updateReferenceField(index, 'name', value)} />
                <InputField label="Link of the Company" id={`ref-name-${index}` as keyof FormData} value={ref.name} placeholder="e.g. Jane Smith" onChange={(_, value) => updateReferenceField(index, 'name', value)} />
                <InputField label="Name" id={`ref-name-${index}` as keyof FormData} value={ref.name} placeholder="e.g. Jane Smith" onChange={(_, value) => updateReferenceField(index, 'name', value)} />
                <InputField label="Title/Relationship" id={`ref-title-${index}` as keyof FormData} value={ref.title} placeholder="e.g. Manager" onChange={(_, value) => updateReferenceField(index, 'title', value)} />
                <InputField label="Email" id={`ref-email-${index}` as keyof FormData} type="email" value={ref.email} placeholder="e.g. jane.smith@company.com" onChange={(_, value) => updateReferenceField(index, 'email', value)} />
                <InputField label="Phone" id={`ref-email-${index}` as keyof FormData} value={ref.phone} placeholder="e.g. jane.smith@company.com" onChange={(_, value) => updateReferenceField(index, 'phone', value)} />
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
                {formData.references.length > 1 && (
                  <button
                    onClick={() => setFormData({ ...formData, references: formData.references.filter((_, i) => i !== index) })}
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

      case 8:
        return (
          <div>
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Supporting Documents</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white shadow-sm">
              <label htmlFor="cv-upload" className={`cursor-pointer px-6 py-3 rounded-lg font-medium shadow-md transition ${
                cvParsing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600'
              } text-white`}>
                <Download className="w-5 h-5 mr-2 inline" />
                {cvParsing ? 'Processing CV...' : (formData.cv ? 'Edit CV' : 'Select CV')}
              </label>
              <input
                id="cv-upload"
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
              {formData.cv && !cvParsing && (
                <div className="mt-4 text-teal-700 font-medium">{formData.cv.name}</div>
              )}
              {cvParsing && (
                <div className="mt-4 flex items-center gap-2 text-teal-600">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium">Parsing CV and filling form...</span>
                </div>
              )}
              <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX</div>
              {cvParseError && <div className="text-red-600 mt-2 text-sm">{cvParseError}</div>}
            </div>
          </div>
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Other Documents</h2>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white shadow-sm">
              <label htmlFor="cv-upload" className={`cursor-pointer px-6 py-3 rounded-lg font-medium shadow-md transition bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white `}
                >
                <Download className="w-5 h-5 mr-2 inline" />
                Cover Letter , Certifications or Other Documents..
              </label>
              <input
                id="cv-upload"
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
              {formData.cv && !cvParsing && (
                <div className="mt-4 text-teal-700 font-medium">{formData.cv.name}</div>
              )}
              {cvParsing && (
                <div className="mt-4 flex items-center gap-2 text-teal-600">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium">Parsing CV and filling form...</span>
                </div>
              )}
              <div className="text-gray-500 mt-4 text-sm">Accepted formats: PDF, DOC, DOCX</div>
              {cvParseError && <div className="text-red-600 mt-2 text-sm">{cvParseError}</div>}
            </div>
          </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-teal-600">Video Introduction</h2>
            <div className="p-6 rounded-lg border bg-white shadow-sm">
              <p className="text-gray-700 mb-6">
                Record a 2-minute video introducing yourself, your experience, and your motivation for applying. Ensure you're in a quiet place with a working camera and microphone.
              </p>
              
              {!formData.videoIntroSubmitted ? (
                <div className="text-center">
                  <button
                    onClick={() => navigate('/record')}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg font-medium transition mx-auto"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Record Video
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="font-medium">Video recorded successfully!</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/record')}
                    className="mr-4 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
                  >
                    Re-record
                  </button>
                  <button
                    onClick={() => setCurrentStep(10)}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-lg font-medium transition"
                  >
                    Continue to Review
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 10:
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
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Unable to Submit Application</h3>
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-6">
              {formData.offerId && (
                <div>
                  <h3 className="text-lg font-medium text-teal-700 mb-3">Job Offer</h3>
                  <div className="text-gray-800 p-4 rounded-lg border bg-white shadow-sm">
                    <span className="font-semibold">Offer ID:</span> {formData.offerId}
                  </div>
                </div>
              )}
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
                          <div><span className="font-semibold">To:</span> {exp.current ? 'Currently' : (exp.endDate || '-')}</div>
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
  <h3 className="text-lg font-medium text-teal-700 mb-3">Technical Skills</h3>
  {formData.technicalSkills.filter(skill => skill.trim() !== '').length === 0 ? (
    <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No technical skills provided.</div>
  ) : (
    <ul className="flex flex-wrap gap-2 p-4 rounded-lg border bg-white shadow-sm">
      {formData.technicalSkills
        .filter(skill => skill.trim() !== '')
        .map((skill, idx) => (
          <li key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
            {skill}
          </li>
        ))}
    </ul>
  )}
</div>
<div>
  <h3 className="text-lg font-medium text-teal-700 mb-3">Competential Skills</h3>
  {formData.competentialSkills.filter(skill => skill.trim() !== '').length === 0 ? (
    <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No competential skills provided.</div>
  ) : (
    <ul className="flex flex-wrap gap-2 p-4 rounded-lg border bg-white shadow-sm">
      {formData.competentialSkills
        .filter(skill => skill.trim() !== '')
        .map((skill, idx) => (
          <li key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
            {skill}
          </li>
        ))}
    </ul>
  )}
</div>
            <div>
  <h3 className="text-lg font-medium text-teal-700 mb-3">Languages</h3>
  {formData.languages.filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '').length === 0 ? (
    <div className="text-gray-500 p-4 rounded-lg border bg-white shadow-sm">No languages provided.</div>
  ) : (
    <div className="space-y-3 p-4 rounded-lg border bg-white shadow-sm">
      {formData.languages
        .filter(lang => lang.language.trim() !== '' && lang.level.trim() !== '')
        .map((lang, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                {lang.language} - {lang.level}
              </span>
              {lang.learnedFrom && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  Learned from: {lang.learnedFrom}
                </span>
              )}
              {lang.certificate && (
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Certificate: {lang.certificate.name}
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
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
                          <div><span className="font-semibold">Phone Number:</span> {ref.email || '-'}</div>
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
                {formData.videoFile ? (
                  <div className="text-teal-700 font-medium p-4 rounded-lg border bg-white shadow-sm">
                    Video introduction recorded ({(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
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
            <label className={`inline-flex items-center px-6 py-3 rounded-lg font-medium shadow-md transition cursor-pointer ${
              cvParsing 
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
                  className={`snap-center flex-shrink-0 px-3 py-2 mx-1 rounded-lg transition text-sm font-medium ${
                    currentStep === step.number
                      ? 'bg-teal-600 text-white'
                      : index < currentStep - 1
                      ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {/* Circle with step number */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      currentStep === step.number
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
                    onClick={handleSubmit}
                    disabled={!acceptTerms || isSubmitting}
                    className={`px-6 py-2.5 rounded-lg font-medium transition border border-teal-600 text-lg ${
                      acceptTerms && !isSubmitting ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600' : 'opacity-50 cursor-not-allowed bg-teal-600 text-white'
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

interface InputFieldProps {
  label: string;
  id: keyof FormData;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (field: keyof FormData, value: string) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type = 'text', value, placeholder, onChange, disabled = false }) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      disabled={disabled}
      className={`w-full px-4 py-3 pt-7 pb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm peer placeholder-transparent ${
        disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''
      }`}
      placeholder={placeholder || " "}
    />
    <label
      htmlFor={id}
      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
        value || type === 'date' 
          ? 'top-2 text-xs text-teal-600 font-medium' 
          : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
      } peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600 peer-focus:font-medium ${
        disabled ? 'text-gray-400' : ''
      }`}
    >
      {label}
    </label>
  </div>
);

export default MultiStepForm;