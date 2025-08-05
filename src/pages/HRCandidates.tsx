import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Filter,
  Plus,
  Eye,
  MessageSquare,
  Calendar
} from 'lucide-react';

const HRCandidates: React.FC = () => {
  // Mock candidate data
  const candidates = [
    {
      id: 'CAND-001',
      name: 'Ahmed Hassan El-Masri',
      position: 'Senior Software Engineer',
      department: 'Digital Transformation',
      status: 'Technical Interview',
      score: 95,
      appliedDate: '2024-01-15',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 'CAND-002',
      name: 'Fatima Al-Zahra Benali',
      position: 'Marketing Manager',
      department: 'Communications',
      status: 'Final Interview',
      score: 92,
      appliedDate: '2024-01-14',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 'CAND-003',
      name: 'Omar Khalil Al-Rashid',
      position: 'Education Program Manager',
      department: 'Education',
      status: 'HR Interview',
      score: 89,
      appliedDate: '2024-01-13',
      avatar: '/api/placeholder/40/40'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Technical Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Final Interview':
        return 'bg-green-100 text-green-800';
      case 'HR Interview':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Manage and track candidate applications
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Candidate Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="w-full pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Candidates Table */}
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {candidate.avatar ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {candidate.position} • {candidate.department}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Score: {candidate.score}%
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRCandidates; 