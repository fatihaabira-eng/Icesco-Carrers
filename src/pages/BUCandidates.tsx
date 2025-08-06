import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users,
  Search,
  Eye,
  Download,
  FileText,
  Clock,
  TrendingUp,
  UserCheck,
  Award
} from 'lucide-react';

// Sample data for candidates
const candidatesData = [
  {
    id: 1,
    name: "Alice Thompson",
    jobOffer: "Senior Frontend Developer",
    status: "Shortlisted",
    applyingDate: "2024-02-10",
    cvUrl: "/sample-cv.pdf",
    phase: "Technical Interview",
    score: 85
  },
  {
    id: 2,
    name: "Bob Wilson",
    jobOffer: "Product Manager",
    status: "Under Review",
    applyingDate: "2024-02-12",
    cvUrl: "/sample-cv.pdf",
    phase: "Initial Review",
    score: 78
  },
  {
    id: 3,
    name: "Carol Davis",
    jobOffer: "UX Designer",
    status: "Interviewed",
    applyingDate: "2024-02-08",
    cvUrl: "/sample-cv.pdf",
    phase: "Final Review",
    score: 92
  },
  {
    id: 4,
    name: "David Miller",
    jobOffer: "Senior Frontend Developer",
    status: "Hired",
    applyingDate: "2024-01-25",
    cvUrl: "/sample-cv.pdf",
    phase: "Completed",
    score: 95
  },
  {
    id: 5,
    name: "Emma Garcia",
    jobOffer: "Product Manager",
    status: "Rejected",
    applyingDate: "2024-02-05",
    cvUrl: "/sample-cv.pdf",
    phase: "Initial Review",
    score: 65
  }
];

const BUCandidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobOfferFilter, setJobOfferFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);

  const filteredCandidates = candidatesData.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.jobOffer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status.toLowerCase().replace(" ", "").includes(statusFilter.toLowerCase());
    const matchesJobOffer = jobOfferFilter === "all" || candidate.jobOffer.toLowerCase().includes(jobOfferFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesJobOffer;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'Shortlisted':
        return <Badge className="bg-blue-100 text-blue-800">Shortlisted</Badge>;
      case 'Interviewed':
        return <Badge className="bg-purple-100 text-purple-800">Interviewed</Badge>;
      case 'Hired':
        return <Badge className="bg-green-100 text-green-800">Hired</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const handleCVView = (candidate: any) => {
    setSelectedCV(candidate);
    setIsCVModalOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            View and manage job applicants
          </p>
        </div>
        
      </div>

     

      {/* Candidates Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">All Candidates</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage candidate applications
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={jobOfferFilter} onValueChange={setJobOfferFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Job Offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="ux">UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Name</TableHead>
                  <TableHead className="font-semibold text-center">Job Offer</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Applying Date</TableHead>
                  <TableHead className="font-semibold text-center">CV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{candidate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{candidate.jobOffer}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(candidate.status)}</TableCell>
                    
                    
                    <TableCell className="text-center">{candidate.applyingDate}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCVView(candidate)}
                        className="text-primary hover:text-primary"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View CV
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No candidates found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CV Modal */}
      <Dialog open={isCVModalOpen} onOpenChange={setIsCVModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                CV - {selectedCV?.name}
              </DialogTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedCV?.cvUrl || '';
                  link.download = `${selectedCV?.name}_CV.pdf`;
                  link.click();
                }}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-center h-[60vh] bg-muted/20 rounded-lg">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-xl font-medium text-muted-foreground">CV Preview</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUCandidates;