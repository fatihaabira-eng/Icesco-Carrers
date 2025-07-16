import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Flag, Upload, FileText, Trash2, Edit, Save, X, Briefcase, Building, Clock, CheckCircle, MoreHorizontal } from 'lucide-react';
import abiraFatiha from '@/assets/abira-fatiha.jpeg';
// Mock Data
const initialUserDetails = {
    fullName: 'Abira Fatiha',
    email: 'fatiha.abira@email.com',
    phone: '+212 6 00 11 22 33',
    nationality: 'Moroccan',
    dob: '2000-05-01',
    address: '123 Innovation Drive, Technopolis, Rabat, Morocco',
    profilePhoto: abiraFatiha
};

const initialApplications = [
    {
        id: 1,
        jobTitle: 'Senior Software Engineer',
        department: 'Digital Transformation',
        location: 'Rabat, Morocco',
        dateApplied: '2024-06-20',
        status: 'Interview',
        progress: 75,
        stages: [
            { name: 'Received', completed: true },
            { name: 'Under Review', completed: true },
            { name: 'Interview', completed: true },
            { name: 'Final Decision', completed: false },
        ]
    },
    {
        id: 2,
        jobTitle: 'Education Program Manager',
        department: 'Education',
        location: 'Rabat, Morocco',
        dateApplied: '2024-07-01',
        status: 'Under Review',
        progress: 50,
        stages: [
            { name: 'Received', completed: true },
            { name: 'Under Review', completed: true },
            { name: 'Shortlisted', completed: false },
            { name: 'Interview', completed: false },
        ]
    },
    {
        id: 3,
        jobTitle: 'Data Analyst',
        department: 'Science & Technology',
        location: 'Rabat, Morocco',
        dateApplied: '2024-07-10',
        status: 'Received',
        progress: 25,
        stages: [
            { name: 'Received', completed: true },
            { name: 'Under Review', completed: false },
            { name: 'Shortlisted', completed: false },
            { name: 'Final Decision', completed: false },
        ]
    }
];

// Reusable Card Component
const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
        {children}
    </div>
);

// Reusable Input Field for Profile Editing
const ProfileInput = ({ icon: Icon, label, value, name, onChange, type = 'text' }) => (
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
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

// Main Dashboard Component
export default function CandidateDashboard() {
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const [applications, setApplications] = useState(initialApplications);
    const [cvFile, setCvFile] = useState({ name: 'My_CV_latest.pdf', size: 2.3 }); // Mocked existing CV
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState(userDetails);
    const fileInputRef = useRef(null);

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
        setEditedDetails(prev => ({ ...prev, value }));
    };
    
    const handleCancelEdit = () => {
        setEditedDetails(userDetails);
        setIsEditing(false);
    }

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            if (file.size <= 5 * 1024 * 1024) { // 5MB limit
                setCvFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) });
                // Here you would typically upload the file to a server
                console.log('Uploading CV:', file.name);
            } else {
                alert('File size exceeds 5MB limit.');
            }
        } else {
            alert('Invalid file type. Please upload a PDF or DOCX file.');
        }
    };

    const handleRemoveCv = () => {
        setCvFile(null);
        // Also send request to server to delete file
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Candidate Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your profile and track your applications.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Profile & CV */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Personal Details Card */}
                        <Card>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
                                <div className="flex gap-2">
                                    {isEditing && (
                                        <>
                                            <button onClick={handleCancelEdit} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><X size={18}/></button>
                                            <button onClick={handleEditToggle} className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors"><Save size={18}/></button>
                                        </>
                                    )}
                                    {!isEditing && <button onClick={handleEditToggle} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"><Edit size={18}/></button>}
                                </div>
                            </div>

                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <img src={userDetails.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-primary" />
                                    <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full hover:bg-primary transition-transform duration-200 hover:scale-110">
                                        <Upload size={14} />
                                    </button>
                                </div>
                                {!isEditing && <h3 className="text-lg font-semibold mt-4">{userDetails.fullName}</h3>}
                            </div>
                            
                            {isEditing ? (
                                <div className="space-y-4">
                                    <ProfileInput label="Full Name" name="fullName" value={editedDetails.fullName} onChange={handleInputChange} icon={User} />
                                    <ProfileInput label="Email" name="email" value={editedDetails.email} onChange={handleInputChange} icon={Mail} type="email" />
                                    <ProfileInput label="Phone" name="phone" value={editedDetails.phone} onChange={handleInputChange} icon={Phone} />
                                    <ProfileInput label="Nationality" name="nationality" value={editedDetails.nationality} onChange={handleInputChange} icon={Flag} />
                                    <ProfileInput label="Date of Birth" name="dob" value={editedDetails.dob} onChange={handleInputChange} icon={Calendar} type="date" />
                                    <ProfileInput label="Address" name="address" value={editedDetails.address} onChange={handleInputChange} icon={MapPin} />
                                </div>
                            ) : (
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p className="flex items-center"><Mail className="w-4 h-4 mr-3 text-gray-400" /> {userDetails.email}</p>
                                    <p className="flex items-center"><Phone className="w-4 h-4 mr-3 text-gray-400" /> {userDetails.phone}</p>
                                    <p className="flex items-center"><Flag className="w-4 h-4 mr-3 text-gray-400" /> {userDetails.nationality}</p>
                                    <p className="flex items-center"><Calendar className="w-4 h-4 mr-3 text-gray-400" /> {userDetails.dob}</p>
                                    <p className="flex items-start"><MapPin className="w-4 h-4 mr-3 text-gray-400 mt-1 flex-shrink-0" /> {userDetails.address}</p>
                                </div>
                            )}
                        </Card>

                        {/* CV Upload Card */}
                        <Card>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">My CV</h2>
                            {cvFile ? (
                                <div className="bg-primary-20 border-l-4 border-primary p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <FileText className="w-8 h-8 text-primary mr-4" />
                                            <div>
                                                <p className="font-semibold text-primary">{cvFile.name}</p>
                                                <p className="text-sm text-primary">{cvFile.size} MB</p>
                                            </div>
                                        </div>
                                        <button onClick={handleRemoveCv} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={18}/></button>
                                    </div>
                                    <button onClick={triggerFileInput} className="w-full mt-4 bg-white border border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300">
                                        Replace CV

                                    </button>
                                </div>
                            ) : (
                                <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="font-semibold mb-2">Upload your CV</p>
                                    <p className="text-xs text-gray-500 mb-4">PDF or DOCX, max 5MB</p>
                                    <button onClick={triggerFileInput} className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary transition duration-300">
                                        Choose File
                                    </button>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleCvUpload} className="hidden" accept=".pdf,.docx" />
                        </Card>
                    </div>

                    {/* Right Column: Applications */}
                    <div className="lg:col-span-2">
                        <Card>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">My Applications ({applications.length})</h2>
                            <div className="space-y-6">
                                {applications.map(app => (
                                    <div key={app.id} className="border border-gray-200 rounded-xl p-5 transition-shadow hover:shadow-md">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-primary">{app.jobTitle}</h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                                                    <span className="flex items-center"><Building size={14} className="mr-1.5"/>{app.department}</span>
                                                    <span className="flex items-center"><MapPin size={14} className="mr-1.5"/>{app.location}</span>
                                                </p>
                                            </div>
                                            <div className="mt-3 sm:mt-0 text-left sm:text-right">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                    app.status === 'Interview' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>{app.status}</span>
                                                <p className="text-xs text-gray-400 mt-2 flex items-center justify-start sm:justify-end"><Clock size={12} className="mr-1"/>Applied on {app.dateApplied}</p>
                                            </div>
                                        </div>

                                        {/* Progress Tracker */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-sm font-medium text-gray-600">Application Progress</p>
                                                <span className="text-sm font-bold text-primary">{app.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${app.progress}%` }}></div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-3 text-xs">
                                                {app.stages.map(stage => (
                                                    <div key={stage.name} className={`flex items-center ${stage.completed ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                                                        <CheckCircle size={14} className={`mr-2 ${stage.completed ? 'opacity-100' : 'opacity-40'}`} />
                                                        {stage.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
