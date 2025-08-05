import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users
} from 'lucide-react';

const HRJobOffers: React.FC = () => {
  // Mock job offers data
  const jobOffers = [
    {
      id: 'OFFER-001',
      title: 'Senior Software Engineer',
      department: 'Digital Transformation',
      location: 'Rabat, Morocco',
      type: 'Full-time',
      status: 'Active',
      applications: 45,
      publishedDate: '2024-01-10',
      closingDate: '2024-02-10'
    },
    {
      id: 'OFFER-002',
      title: 'Marketing Manager',
      department: 'Communications',
      location: 'Remote',
      type: 'Full-time',
      status: 'Active',
      applications: 32,
      publishedDate: '2024-01-08',
      closingDate: '2024-02-08'
    },
    {
      id: 'OFFER-003',
      title: 'Education Program Manager',
      department: 'Education',
      location: 'Rabat, Morocco',
      type: 'Contract',
      status: 'Draft',
      applications: 0,
      publishedDate: null,
      closingDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Offers</h1>
          <p className="text-muted-foreground">
            Create and manage job postings
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Job Offer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Job Offers Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search job offers..."
                className="w-full pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Job Offers Table */}
          <div className="space-y-4">
            {jobOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {offer.department} • {offer.location} • {offer.type}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(offer.status)}>
                    {offer.status}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{offer.applications} applications</span>
                  </div>
                  {offer.publishedDate && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Closes {offer.closingDate}</span>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
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

export default HRJobOffers; 