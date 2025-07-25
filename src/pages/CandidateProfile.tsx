import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Flag, Upload, FileText, Trash2, Edit, Save, X, Briefcase, Building, Clock, CheckCircle, MoreHorizontal, Activity, Lightbulb, Menu, ChevronLeft, Award, BookOpen, Layers, Bell } from 'lucide-react';
import fatihaabira from '@/assets/abira-fatiha.jpeg';
// Mock Data
const initialUserDetails = {
    fullName: 'Abira Fatiha',
    email: 'fatiha.abira@email.com',
    phone: '+212 6 00 11 22 33',
    nationality: 'Moroccan',
    dob: '2000-05-01',
    address: '123 Innovation Drive, Technopolis, Rabat, Morocco',
    profilePhoto: fatihaabira, // Using placeholder
    memberSince: '2023-01-15',
    lastLogin: '2024-07-16'
};

const initialSkills = [
    'React.js', 'Node.js', 'Python', 'Tailwind CSS', 'MongoDB', 'AWS', 'Docker', 'Agile Methodologies', 'Project Management'
];

const initialEducation = [
    {
        id: 1,
        degree: 'Master of Science in Computer Science',
        institution: 'University of Rabat',
        year: '2022',
        details: 'Specialization in Artificial Intelligence and Machine Learning.'
    },
    {
        id: 2,
        degree: 'Bachelor of Technology in Software Engineering',
        institution: 'National School of Applied Sciences',
        year: '2019',
        details: 'Focused on full-stack development and data structures.'
    }
];

const initialWorkExperience = [
    {
        id: 1,
        title: 'Software Development Lead',
        company: 'Innovate Solutions',
        duration: 'Jan 2023 - Present',
        description: 'Led a team of 5 developers in building scalable web applications. Implemented new features, optimized performance, and mentored junior developers.'
    },
    {
        id: 2,
        title: 'Junior Web Developer',
        company: 'Digital Agency Co.',
        duration: 'Jul 2019 - Dec 2022',
        description: 'Developed and maintained client websites using React and Node.js. Collaborated with designers to translate UI/UX wireframes into code.'
    }
];

const initialNotifications = [
    { id: 1, message: 'New job recommendation: Full Stack Developer at InnovateX.', date: '2024-07-24 10:30 AM' },
    { id: 2, message: 'Your application for Data Scientist at Analytic Co. is under review.', date: '2024-07-23 03:15 PM' },
    { id: 3, message: 'Profile updated successfully.', date: '2024-07-22 09:00 AM' },
];

const initialApplications = [
    {
        id: 1,
        jobTitle: 'Senior Software Engineer',
        department: 'Digital Transformation',
        company: 'Tech Innovators Inc.',
        location: 'Rabat, Morocco',
        dateApplied: '2024-06-20',
        status: 'Interview Scheduled',
        progress: 75,
        stages: [
            { name: 'Application Submitted', completed: true },
            { name: 'Resume Reviewed', completed: true },
            { name: 'Technical Interview', completed: true },
            { name: 'Final Decision', completed: false },
        ]
    }
];

const initialActivities = [
    { id: 1, type: 'Application', description: 'Applied for Senior Software Engineer at Tech Innovators Inc.', date: '2024-06-20' },
    { id: 2, type: 'Interview', description: 'Interview scheduled for Senior Software Engineer role.', date: '2024-07-15' },
    { id: 3, type: 'CV Update', description: 'Updated CV to latest version.', date: '2024-07-14' },
];

const initialRecommendedJobs = [
    { id: 101, title: 'Full Stack Developer', company: 'InnovateX', location: 'Rabat, Morocco', match: '90%' },
    { id: 102, title: 'Data Scientist', company: 'Analytic Co.', location: 'Remote', match: '85%' },
    { id: 103, title: 'DevOps Engineer', company: 'CloudNet Solutions', location: 'Casablanca, Morocco', match: '78%' },
];

// Reusable Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 h-full ${className}`}>
        {children}
    </div>
);

// Reusable Input Field for Profile Editing
const ProfileInput = ({ icon: Icon, label, value, name, onChange, type = 'text', placeholder = '' }) => (
    <div>
        <label className="text-sm font-medium text-gray-500 flex items-center mb-1">
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
    </div>
);

// Custom Message Box Component
const MessageBox = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto text-center relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" aria-label="Close message">
                    <X size={20} />
                </button>
                <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
                <button onClick={onClose} className="bg-primary text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-dark transition-colors">
                    OK
                </button>
            </div>
        </div>
    );
};

// Main Dashboard Component
export default function CandidateDashboard() {
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const [skills, setSkills] = useState(initialSkills);
    const [education, setEducation] = useState(initialEducation);
    const [workExperience, setWorkExperience] = useState(initialWorkExperience);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [applications, setApplications] = useState(initialApplications);
    const [cvFile, setCvFile] = useState({ name: 'My_CV_latest.pdf', size: 2.3, lastUpdated: '2024-07-14' });
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState(userDetails);
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'applications'
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

    const handleEditToggle = () => {
        if (isEditing) {
            setUserDetails(editedDetails);
        } else {
            setEditedDetails(userDetails);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCancelEdit = () => {
        setEditedDetails(userDetails);
        setIsEditing(false);
    };

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                if (file.size <= 5 * 1024 * 1024) { // 5MB limit
                    setCvFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1), lastUpdated: new Date().toISOString().slice(0, 10) });
                    console.log('Uploading CV:', file.name);
                    setMessage('CV uploaded successfully!');
                } else {
                    setMessage('File size exceeds 5MB limit.');
                }
            } else {
                setMessage('Invalid file type. Please upload a PDF or DOCX file.');
            }
        }
    };

    const handleRemoveCv = () => {
        setCvFile(null);
        setMessage('CV removed successfully.');
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-title text-gray-800 p-4 sm:p-6 lg:p-8">
            <MessageBox message={message} onClose={() => setMessage('')} />

            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Mobile Header and Sidebar Toggle */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-extrabold text-gray-800">Candidate Dashboard</h1>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Sidebar */}
                <aside className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-64 bg-primary shadow-xl lg:shadow-none p-6 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:flex-shrink-0 lg:rounded-xl`}>
                    <div className="flex justify-between items-center mb-8 lg:mb-10">
                        <h2 className="text-2xl font-bold text-white hidden lg:block">Dashboard</h2>
                        <button 
                            onClick={() => setIsSidebarOpen(false)} 
                            className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-white"
                            aria-label="Close sidebar"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button 
                                    onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} 
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${activeTab === 'profile' ? 'bg-white/80 text-primary-dark' : 'text-white hover:bg-gray-100'}`}
                                >
                                    <User className="mr-3" size={20} /> My Profile Info
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => { setActiveTab('applications'); setIsSidebarOpen(false); }} 
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 ${activeTab === 'applications' ? 'bg-white/80 text-primary-dark' : 'text-white/80 hover:bg-gray-100'}`}
                                >
                                    <Briefcase className="mr-3" size={20} /> My Applications
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight text-center lg:text-left mb-8 hidden lg:block">Candidate Dashboard</h1>
                    <p className="text-lg text-gray-600 mt-2 text-center lg:text-left mb-8 hidden lg:block">Manage your profile, track applications, and discover new opportunities.</p>

                    {activeTab === 'profile' && (
                        <div className="flex flex-col gap-6"> {/* Changed to flex-col for stacking */}
                            {/* Personal Details Card */}
                            <Card>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                                    <div className="flex gap-2">
                                        {isEditing && (
                                            <>
                                                <button onClick={handleCancelEdit} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" aria-label="Cancel Edit"><X size={20}/></button>
                                                <button onClick={handleEditToggle} className="p-2 text-white bg-primary hover:bg-primary-dark rounded-full transition-colors" aria-label="Save Changes"><Save size={20}/></button>
                                            </>
                                        )}
                                        {!isEditing && <button onClick={handleEditToggle} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" aria-label="Edit Profile"><Edit size={20}/></button>}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center mb-8">
                                    <div className="relative mb-4">
                                        <img src={userDetails.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover ring-4 ring-primary ring-offset-2" />
                                        <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-transform duration-200 hover:scale-110" aria-label="Upload Profile Photo">
                                            <Upload size={16} />
                                        </button>
                                    </div>
                                    {!isEditing && <h3 className="text-xl font-semibold text-gray-900">{userDetails.fullName}</h3>}
                                    <p className="text-sm text-gray-500 mt-1">Member since: {userDetails.memberSince}</p>
                                </div>
                                
                                {isEditing ? (
                                    <div className="space-y-5">
                                        <ProfileInput label="Full Name" name="fullName" value={editedDetails.fullName} onChange={handleInputChange} icon={User} placeholder="Enter full name" />
                                        <ProfileInput label="Email" name="email" value={editedDetails.email} onChange={handleInputChange} icon={Mail} type="email" placeholder="Enter email" />
                                        <ProfileInput label="Phone" name="phone" value={editedDetails.phone} onChange={handleInputChange} icon={Phone} placeholder="Enter phone number" />
                                        <ProfileInput label="Nationality" name="nationality" value={editedDetails.nationality} onChange={handleInputChange} icon={Flag} placeholder="Enter nationality" />
                                        <ProfileInput label="Date of Birth" name="dob" value={editedDetails.dob} onChange={handleInputChange} icon={Calendar} type="date" />
                                        <ProfileInput label="Address" name="address" value={editedDetails.address} onChange={handleInputChange} icon={MapPin} placeholder="Enter address" />
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-base text-gray-700">
                                        <p className="flex items-center"><Mail className="w-5 h-5 mr-3 text-gray-500" /> {userDetails.email}</p>
                                        <p className="flex items-center"><Phone className="w-5 h-5 mr-3 text-gray-500" /> {userDetails.phone}</p>
                                        <p className="flex items-center"><Flag className="w-5 h-5 mr-3 text-gray-500" /> {userDetails.nationality}</p>
                                        <p className="flex items-center"><Calendar className="w-5 h-5 mr-3 text-gray-500" /> {userDetails.dob}</p>
                                        <p className="flex items-start"><MapPin className="w-5 h-5 mr-3 text-gray-500 mt-1 flex-shrink-0" /> {userDetails.address}</p>
                                    </div>
                                )}
                            </Card>

                            {/* CV Upload Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">My CV</h2>
                                {cvFile ? (
                                    <div className="bg-primary/10 border-l-4 border-primary p-5 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <FileText className="w-10 h-10 text-primary mr-4" />
                                                <div>
                                                    <p className="font-semibold text-primary-dark text-lg">{cvFile.name}</p>
                                                    <p className="text-sm text-primary/80">{cvFile.size} MB | Last Updated: {cvFile.lastUpdated}</p>
                                                </div>
                                            </div>
                                            <button onClick={handleRemoveCv} className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors" aria-label="Remove CV"><Trash2 size={20}/></button>
                                        </div>
                                        <button onClick={triggerFileInput} className="w-full mt-4 bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary hover:text-white transition duration-300 shadow-sm hover:shadow-md">
                                            Replace CV
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-10">
                                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                                        <p className="font-semibold text-lg mb-2">Upload your CV</p>
                                        <p className="text-sm text-gray-500 mb-6">PDF or DOCX, max 5MB</p>
                                        <button onClick={triggerFileInput} className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition duration-300 shadow-md hover:shadow-lg">
                                            Choose File
                                        </button>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleCvUpload} className="hidden" accept=".pdf,.docx" />
                            </Card>

                            {/* Skills Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium">
                                            <Layers size={14} className="inline-block mr-1" /> {skill}
                                        </span>
                                    ))}
                                </div>
                            </Card>

                            {/* Education Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
                                <div className="space-y-6">
                                    {education.map(edu => (
                                        <div key={edu.id} className="border-l-4 border-primary/30 pl-4 py-2">
                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><BookOpen size={18} className="mr-2 text-primary"/>{edu.degree}</h3>
                                            <p className="text-md text-gray-700 mt-1">{edu.institution} - {edu.year}</p>
                                            <p className="text-sm text-gray-500 mt-1">{edu.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Work Experience Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h2>
                                <div className="space-y-6">
                                    {workExperience.map(exp => (
                                        <div key={exp.id} className="border-l-4 border-primary/30 pl-4 py-2">
                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center"><Briefcase size={18} className="mr-2 text-primary"/>{exp.title}</h3>
                                            <p className="text-md text-gray-700 mt-1">{exp.company} - {exp.duration}</p>
                                            <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                             {/* Recent Activity Card - Moved to Profile Tab for consistency */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                                <div className="space-y-4">
                                    {initialActivities.map(activity => (
                                        <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <Activity size={18} className="text-primary mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-gray-800 font-medium">{activity.description}</p>
                                                <p className="text-sm text-gray-500 mt-0.5">{activity.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Notifications Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
                                <div className="space-y-4">
                                    {notifications.length > 0 ? (
                                        notifications.map(notification => (
                                            <div key={notification.id} className="flex items-start p-3 bg-accent/10 rounded-lg border border-accent/20">
                                                <Bell size={18} className="text-accent mr-3 mt-1 flex-shrink-0" />
                                                <div>
                                                    <p className="text-gray-800 font-medium">{notification.message}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{notification.date}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No new notifications.</p>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="space-y-6">
                            {/* My Applications Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications ({applications.length})</h2>
                                <div className="space-y-6">
                                    {applications.map(app => (
                                        <div key={app.id} className="border border-gray-200 rounded-xl p-6 transition-shadow hover:shadow-xl">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-5">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary">{app.jobTitle}</h3>
                                                    <p className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                        <span className="flex items-center"><Building size={16} className="mr-1.5 text-gray-500"/>{app.company}</span>
                                                        <span className="flex items-center"><Briefcase size={16} className="mr-1.5 text-gray-500"/>{app.department}</span>
                                                        <span className="flex items-center"><MapPin size={16} className="mr-1.5 text-gray-500"/>{app.location}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                                    <span className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                                                        app.status === 'Interview Scheduled' ? 'bg-primary/10 text-primary-dark' :
                                                        app.status === 'Under Review' ? 'bg-accent/10 text-accent' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>{app.status}</span>
                                                    <p className="text-xs text-gray-500 mt-2 flex items-center justify-start sm:justify-end"><Clock size={14} className="mr-1"/>Applied on {app.dateApplied}</p>
                                                </div>
                                            </div>

                                            {/* Progress Tracker */}
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="text-base font-medium text-gray-700">Application Progress</p>
                                                    <span className="text-base font-bold text-primary">{app.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${app.progress}%` }}></div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4 text-sm">
                                                    {app.stages.map(stage => (
                                                        <div key={stage.name} className={`flex items-center ${stage.completed ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                                                            <CheckCircle size={16} className={`mr-2 ${stage.completed ? 'opacity-100' : 'opacity-40'}`} />
                                                            {stage.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* View Process Button - Removed useNavigate */}
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    onClick={() => setMessage('View Process functionality would navigate to a detailed application page.')} // Replaced navigation with message
                                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                                                >
                                                    View Process
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Recommended Jobs Card */}
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Jobs</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {initialRecommendedJobs.map(job => (
                                        <div key={job.id} className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                                            <div className="flex items-center">
                                                <Lightbulb size={20} className="text-primary mr-4 flex-shrink-0" />
                                                <div>
                                                    <p className="font-semibold text-primary-dark text-lg">{job.title}</p>
                                                    <p className="text-sm text-gray-600">{job.company}</p>
                                                    <p className="text-sm text-primary/80 mt-0.5">{job.location}</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 text-sm font-bold bg-primary/20 text-primary-dark rounded-full">{job.match}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
