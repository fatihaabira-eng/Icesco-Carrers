import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  FileText,
  Download,
  MessageSquare,
  Star
} from 'lucide-react';
import CandidateScoring from './CandidateScoring';

interface CandidateProfileProps {
  candidateId: string;
  onClose: () => void;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidateId, onClose }) => {
  // Mock candidate data - in real app, this would be fetched based on candidateId
  const candidate = {
    id: candidateId,
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+20 123 456 7890',
    location: 'Cairo, Egypt',
    position: 'Senior Education Specialist',
    score: 95,
    experience: '8 years',
    education: 'MSc Computer Science',
    skills: ['Education Technology', 'Curriculum Development', 'Research', 'Project Management'],
    applicationDate: '2024-01-15',
    status: 'Technical Interview',
    avatar: '/api/placeholder/80/80',
    summary: 'Experienced education specialist with expertise in curriculum development and educational technology implementation. Proven track record in leading educational reform initiatives.',
    workHistory: [
      {
        title: 'Senior Education Consultant',
        company: 'UNESCO',
        period: '2020 - Present',
        description: 'Led educational development projects across MENA region'
      },
      {
        title: 'Education Program Manager',
        company: 'World Bank',
        period: '2018 - 2020',
        description: 'Managed education sector funding and implementation'
      }
    ],
    educationHistory: [
      {
        degree: 'MSc Education Technology',
        institution: 'Cairo University',
        year: '2017'
      },
      {
        degree: 'BSc Computer Science',
        institution: 'American University in Cairo',
        year: '2015'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{candidate.name}</h2>
            <p className="text-muted-foreground">{candidate.position}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{candidate.score}% Match</span>
              </div>
              <Badge variant="secondary">{candidate.status}</Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download CV
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Applied: {candidate.applicationDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience & Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.experience} Experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{candidate.education}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{candidate.summary}</p>
            </CardContent>
          </Card>

          {/* Work History */}
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.workHistory.map((work, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-semibold">{work.title}</h4>
                    <p className="text-sm text-muted-foreground">{work.company} • {work.period}</p>
                    <p className="text-sm mt-1">{work.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education History */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidate.educationHistory.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Committee Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle>Committee Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <CandidateScoring candidateId={candidateId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;