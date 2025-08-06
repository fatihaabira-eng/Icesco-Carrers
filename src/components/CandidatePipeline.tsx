import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  Calendar,
  ArrowRight,
  Plus,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'new' | 'under_review' | 'interview' | 'offer' | 'hired';
  score: number;
  appliedDate: string;
  avatar?: string;
  email: string;
  phone: string;
  location: string;
  nationality: string;
  experience: string;
  skills: string[];
  education: string;
  year: number;
  videoUrl?: string;
  aiScreeningScore: number;
  aiRecommendations: string[];
  resumeUrl?: string;
  resumeData?: {
    extractedSkills: string[];
    workExperience: string[];
    education: string[];
    certifications: string[];
    languages: string[];
    parsedDate: string;
  };
}

interface CandidatePipelineProps {
  candidates: Candidate[];
  onViewProfile: (candidate: Candidate) => void;
  onStatusChange: (candidateId: string, newStatus: string) => void;
}

const CandidatePipeline: React.FC<CandidatePipelineProps> = ({
  candidates,
  onViewProfile,
  onStatusChange
}) => {
  const stages = [
    { id: 'new', title: 'New', color: 'bg-blue-100 text-blue-800', count: 0 },
    { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100 text-yellow-800', count: 10 },
    { id: 'interview', title: 'Interview', color: 'bg-purple-100 text-purple-800', count: 0 },
    { id: 'offer', title: 'Offer', color: 'bg-orange-100 text-orange-800', count: 0 },
    { id: 'hired', title: 'Hired', color: 'bg-green-100 text-green-800', count: 0 },
  ];

  // Calculate counts for each stage
  const stageCounts = stages.map(stage => ({
    ...stage,
    count: candidates.filter(c => c.status === stage.id).length
  }));

  const getCandidatesForStage = (stageId: string) => {
    return candidates.filter(candidate => candidate.status === stageId);
  };

  const getNextStage = (currentStage: string) => {
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    return stages[currentIndex + 1]?.id || null;
  };

  const handleMoveToNextStage = (candidate: Candidate) => {
    const nextStage = getNextStage(candidate.status);
    if (nextStage) {
      onStatusChange(candidate.id, nextStage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Candidate Pipeline</h2>
          <p className="text-muted-foreground">Track candidates through the recruitment process</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Total Candidates: {candidates.length}
          </div>
        </div>
      </div>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-5 gap-4 h-[calc(100vh-300px)] overflow-hidden">
        {stageCounts.map((stage) => (
          <Card key={stage.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <span>{stage.title}</span>
                <Badge className={stage.color}>
                  {stage.count}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-2">
              <div className="space-y-3">
                {getCandidatesForStage(stage.id).map((candidate) => (
                  <Card key={candidate.id} className="p-3 hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      {/* Candidate Header */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-xs">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Score</span>
                        <Badge variant="secondary" className="text-xs">
                          {candidate.score}%
                        </Badge>
                      </div>

                      {/* Applied Date */}
                      <div className="text-xs text-muted-foreground">
                        Applied: {format(new Date(candidate.appliedDate), 'MMM dd')}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => onViewProfile(candidate)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Calendar className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Move to Next Stage */}
                        {getNextStage(candidate.status) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoveToNextStage(candidate)}
                            title={`Move to ${stages.find(s => s.id === getNextStage(candidate.status))?.title}`}
                          >
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* Empty State */}
                {getCandidatesForStage(stage.id).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No candidates</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {stageCounts.map((stage) => (
              <div key={stage.id} className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stage.color}`}>
                  {stage.title}
                </div>
                <div className="text-2xl font-bold mt-2">{stage.count}</div>
                <div className="text-xs text-muted-foreground">
                  {candidates.length > 0 ? Math.round((stage.count / candidates.length) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
          
          {/* Pipeline Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Pipeline Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0F7378" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatePipeline; 