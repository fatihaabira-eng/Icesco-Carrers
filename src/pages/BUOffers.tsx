import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  FileText,
  Search,
  Eye,
  MapPin,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  Building
} from 'lucide-react';

// Sample data for offers
const offersData = [
  {
    id: 1,
    reference: "REF-2024-001",
    jobTitle: "Senior Frontend Developer",
    closingDate: "2024-02-15",
    bu: "Technology",
    location: "New York",
    publishedDate: "2024-01-15",
    positions: 2,
    status: "Active",
    shortlisted: 12,
    applied: 45,
    hired: 0,
    rejected: 8,
    description: "We are seeking a Senior Frontend Developer to join our dynamic technology team. The ideal candidate will have extensive experience in React, TypeScript, and modern web development practices."
  },
  {
    id: 2,
    reference: "REF-2024-002",
    jobTitle: "Product Manager",
    closingDate: "2024-02-20",
    bu: "Product",
    location: "San Francisco",
    publishedDate: "2024-01-10",
    positions: 1,
    status: "Active",
    shortlisted: 8,
    applied: 32,
    hired: 0,
    rejected: 5,
    description: "Looking for an experienced Product Manager to drive product strategy and execution. Must have strong analytical skills and experience with agile methodologies."
  },
  {
    id: 3,
    reference: "REF-2024-003",
    jobTitle: "UX Designer",
    closingDate: "2024-01-30",
    bu: "Design",
    location: "Remote",
    publishedDate: "2024-01-05",
    positions: 1,
    status: "Closed",
    shortlisted: 15,
    applied: 67,
    hired: 1,
    rejected: 12,
    description: "We need a creative UX Designer to enhance user experience across our digital products. Experience with design systems and user research is essential."
  },
  {
    id: 4,
    reference: "REF-2024-004",
    jobTitle: "Data Scientist",
    closingDate: "2024-03-01",
    bu: "Technology",
    location: "Austin",
    publishedDate: "2024-02-01",
    positions: 1,
    status: "Draft",
    shortlisted: 0,
    applied: 0,
    hired: 0,
    rejected: 0,
    description: "Join our data science team to develop machine learning models and drive data-driven insights. PhD in relevant field preferred."
  }
];

const BUOffers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [buFilter, setBuFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const filteredOffers = offersData.filter((offer) => {
    const matchesSearch =
      offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || offer.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesBU = buFilter === "all" || offer.bu.toLowerCase() === buFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesBU;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const handleOfferView = (offer: any) => {
    setSelectedOffer(offer);
    setIsOfferModalOpen(true);
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'applied':
        return "text-blue-600";
      case 'shortlisted':
        return "text-orange-600";
      case 'hired':
        return "text-green-600";
      case 'rejected':
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Offers</h1>
          <p className="text-muted-foreground">
            Manage and track all job offers
          </p>
        </div>
       
      </div>

     

      {/* Offers Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">All Job Offers</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage job offer details and metrics
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
                  placeholder="Search offers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={buFilter} onValueChange={setBuFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Business Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All BU</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Offers Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-center">Reference</TableHead>
                  <TableHead className="font-semibold text-center">Job Title</TableHead>
                  <TableHead className="font-semibold text-center">BU</TableHead>
                  <TableHead className="font-semibold text-center">Location</TableHead>
                  <TableHead className="font-semibold text-center">Positions</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                  <TableHead className="font-semibold text-center">Applied</TableHead>
                  <TableHead className="font-semibold text-center">Shortlisted</TableHead>
                  <TableHead className="font-semibold text-center">Hired</TableHead>
                  <TableHead className="font-semibold text-center">Closing Date</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow key={offer.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-center">
                      <span className="font-mono text-sm">{offer.reference}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-medium">{offer.jobTitle}</div>
                      <div className="text-sm text-muted-foreground">{offer.bu}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{offer.bu}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {offer.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{offer.positions}</span>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(offer.status)}</TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getMetricColor('applied', offer.applied)}`}>
                        {offer.applied}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getMetricColor('shortlisted', offer.shortlisted)}`}>
                        {offer.shortlisted}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${getMetricColor('hired', offer.hired)}`}>
                        {offer.hired}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">{offer.closingDate}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOfferView(offer)}
                        className="text-primary hover:text-primary"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No offers found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offer Details Modal */}
      <Dialog open={isOfferModalOpen} onOpenChange={setIsOfferModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                {selectedOffer?.jobTitle} - {selectedOffer?.reference}
              </DialogTitle>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div>{selectedOffer && getStatusBadge(selectedOffer.status)}</div>
                </div>
                <Button variant="outline" size="sm">
                  Edit Offer
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {/* Offer Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Business Unit</p>
                  <p className="font-medium">{selectedOffer?.bu}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedOffer?.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Positions Available</p>
                  <p className="font-medium">{selectedOffer?.positions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Closing Date</p>
                  <p className="font-medium">{selectedOffer?.closingDate}</p>
                </div>
              </div>

              {/* Recruitment Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{selectedOffer?.applied}</p>
                  <p className="text-sm text-blue-600">Applied</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">{selectedOffer?.shortlisted}</p>
                  <p className="text-sm text-orange-600">Shortlisted</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{selectedOffer?.hired}</p>
                  <p className="text-sm text-green-600">Hired</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{selectedOffer?.rejected}</p>
                  <p className="text-sm text-red-600">Rejected</p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm leading-relaxed">{selectedOffer?.description}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Published Date:</span>
                      <span className="text-sm font-medium">{selectedOffer?.publishedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Closing Date:</span>
                      <span className="text-sm font-medium">{selectedOffer?.closingDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BUOffers;