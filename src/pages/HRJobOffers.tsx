import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { JobOffer, jobOffersData } from '../data/jobOffersData';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  X,
  UserX,
  ListChecks,
  ArrowUpRight
} from 'lucide-react';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import DashboardSection from '@/components/DashboardSection';
import CreateJobOfferForm from '@/components/JobOfferForm';
import Swal from 'sweetalert2';



interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired' | 'rejected';
  stageDate: string;
}

const stages = [
  { id: 'new', title: 'New Applications', color: 'bg-blue-50 text-blue-700' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-50 text-yellow-700' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-50 text-purple-700' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-50 text-orange-700' },
  { id: 'hired', title: 'Hired', color: 'bg-green-50 text-green-700' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-50 text-red-700' },
] as const;

const HRJobOffers: React.FC = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [dateRange, setDateRange] = useState('year');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState('all');
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);

  const [jobOffers, setJobOffers] = useState<JobOffer[]>(jobOffersData);

  const abbreviateDepartment = (department: string) => {
    return department
      .split(' ')
      .map(word => word.substring(0, 4) + (word.length > 4 ? '.' : ''))
      .join(' ');
  };

  // Filter job offers by year and date range
  const filterDataByDate = (data: JobOffer[]) => {
    if (selectedYear === 'all') return data;
    const now = new Date();
    if (dateRange === 'year') {
      return data.filter(item => {
        if (!item.publishedDate) return false;
        return new Date(item.publishedDate).getFullYear() === Number(selectedYear);
      });
    } else if (dateRange === 'month') {
      return data.filter(item => {
        if (!item.publishedDate) return false;
        const date = new Date(item.publishedDate);
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      });
    }
    else if (dateRange === 'week') {
      return data.filter(item => {
        if (!item.publishedDate) return false;
        const date = new Date(item.publishedDate);
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        return date.getFullYear() === Number(selectedYear) && date >= startOfWeek && date <= endOfWeek;
      });
    } else if (dateRange === 'day') {
      return data.filter(item => {
        if (!item.publishedDate) return false;
        const date = new Date(item.publishedDate);
        return date.getFullYear() === Number(selectedYear) &&
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth();
      });
    } else if (dateRange === 'custom') {
      // You can add custom range logic here, e.g. using startDate/endDate state
      return data;
    }
    return data;
  };

  const filteredJobOffers = filterDataByDate(jobOffers)
    .filter(offer =>
      (selectedBusinessUnit === 'all' || offer.department === selectedBusinessUnit) &&
      (offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const totalOffers = filteredJobOffers.length;
  const activeOffers = filteredJobOffers.filter(o => o.status === 'active').length;
  const applicationsReceived = filteredJobOffers.reduce((sum, offer) => sum + offer.applications, 0);
  const positionsFilled = filteredJobOffers.reduce((sum, offer) =>
    sum + offer.candidates.filter(c => c.stage === 'hired').length, 0
  );

  const kpiCards = [
    { title: 'Total Offers', value: totalOffers, icon: FileText, description: 'All job postings' },
    { title: 'Active Offers', value: activeOffers, icon: Briefcase, description: 'Currently open positions' },
    { title: 'Applications Received', value: applicationsReceived, icon: Users, description: 'Total applications' },
    { title: 'Positions Filled', value: positionsFilled, icon: CheckCircle, description: 'Successfully hired' }
  ];

  const handleStatusChange = (offerId: string, newStatus: JobOffer['status']) => {
    console.log(`Updating offer ${offerId} to status ${newStatus}`);
  };

  const toggleExpanded = (offerId: string) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  const handleCreateJobOffer = () => {
    setFormMode('create');
    setEditingOffer(null);
    setShowCreateForm(true);
  };
  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
    setEditingOffer(null);
  };
  const handleAddJobOffer = (newOffer: JobOffer) => {
    setJobOffers(prev => [newOffer, ...prev]);
    setShowCreateForm(false);
  };
  const handleEditJobOffer = (updatedOffer: JobOffer) => {
    setJobOffers(prev => prev.map(offer => offer.id === updatedOffer.id ? updatedOffer : offer));
    setShowCreateForm(false);
    setEditingOffer(null);
  };

  const handleDeleteJobOffer = (offerId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this job offer? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setJobOffers(prev => prev.filter(offer => offer.id !== offerId));
        Swal.fire('Deleted!', 'The job offer has been deleted.', 'success');
      }
    });
  };

  const getShortlistedCount = (candidates: Candidate[]) =>
    candidates.filter(c => ['interview', 'offer', 'hired'].includes(c.stage)).length;

  const getRejectedCount = (candidates: Candidate[]) =>
    candidates.filter(c => c.stage === 'rejected').length;

  const TABLE_COL_COUNT = 11;

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out opacity-100">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-100 opacity-100">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{formMode === 'edit' ? 'Edit Job Offer' : 'Create New Job Offer'}</h2>
              <Button variant="ghost" size="icon" onClick={handleCloseCreateForm} className="h-9 w-9 hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            <div className="p-4 sm:p-6">
              <CreateJobOfferForm
                onClose={handleCloseCreateForm}
                onCreate={handleAddJobOffer}
                onEdit={handleEditJobOffer}
                jobOffer={editingOffer || undefined}
                mode={formMode}
              />
            </div>
          </div>
        </div>
      )}

      <DashboardHeader
        title="Job Offers"
        description="Create and manage job postings across all organizational units"


      >
        <Button onClick={handleCreateJobOffer} className="bg-primary hover:bg-primary-light text-white">
          <Plus className="h-5 w-5 mr-2" />
          Create Job Offer
        </Button>
      </DashboardHeader>

      <DashboardSection
        title="Job Offers Management"
        description="Track and manage job postings with candidate pipeline"
        icon={FileText}
      >
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search job offers by title or unit..."
              className="w-full pl-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-gray-200 text-teal-800" onClick={() => setShowFilters((prev) => !prev)}>
            <Filter className="h-4 w-4 mr-2 text-teal-800" />
            Filters
          </Button>
        </div>
        {showFilters && (
          <div className="flex flex-wrap gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => {
                    const year = (new Date().getFullYear() - i).toString();
                    return <SelectItem key={year} value={year}>{year}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Business Unit:</span>
              <Select value={selectedBusinessUnit} onValueChange={setSelectedBusinessUnit}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="DT">DT</SelectItem>
                  <SelectItem value="CCS">CCS</SelectItem>
                  <SelectItem value="ED">ED</SelectItem>
                  {/* Add more units as needed */}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Card className="border-none shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-none">
                    <TableHead className="w-[50px] font-semibold text-xs  tracking-wider py-4"></TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Reference</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Business Unit</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Job Offer</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Applied</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Shortlisted</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4 text-center">N° Rejected</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Published Date</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Closing Date</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Status</TableHead>
                    <TableHead className="font-semibold text-xs  tracking-wider py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobOffers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={TABLE_COL_COUNT} className="text-center text-gray-500 h-24 py-6">
                        No job offers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredJobOffers.map((offer) => (
                      <React.Fragment key={offer.id}>
                        <TableRow className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                          <TableCell className="py-3 sm:py-4">
                            <Button variant="ghost" size="sm" onClick={() => toggleExpanded(offer.id)} className="hover:bg-gray-100">
                              {expandedOffer === offer.id ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
                            </Button>
                          </TableCell>
                          <TableCell className="font-mono text-xs text-gray-700 py-3 sm:py-4">{offer.id}</TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">{offer.department}</TableCell>
                          <TableCell className="text-gray-800 text-sm font-medium py-3 sm:py-4">{offer.title}</TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span>{offer.applications}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <ListChecks className="h-4 w-4 text-green-500" />
                              <span>{getShortlistedCount(offer.candidates)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <UserX className="h-4 w-4 text-red-500" />
                              <span>{getRejectedCount(offer.candidates)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            {offer.publishedDate ? format(new Date(offer.publishedDate), 'MMM d, yyyy') : 'N/A'}
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            {offer.closingDate ? format(new Date(offer.closingDate), 'MMM d, yyyy') : 'N/A'}
                          </TableCell>
                          <TableCell className="text-gray-700 text-sm py-3 sm:py-4">
                            <Select value={offer.status} onValueChange={(value) => handleStatusChange(offer.id, value as JobOffer['status'])}>
                              <SelectTrigger className="w-28 text-xs rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-gray-700 py-3 sm:py-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100" onClick={() => {
                                setFormMode('edit');
                                setEditingOffer(offer);
                                setShowCreateForm(true);
                              }}>
                                <Edit className="h-4 w-4 text-orange-500" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100" onClick={() => handleDeleteJobOffer(offer.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>

                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedOffer === offer.id && (
                          <TableRow>
                            <TableCell colSpan={TABLE_COL_COUNT} className="p-0">
                              <div className="p-4 sm:p-6 bg-gray-50">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Job Details</h4>
                                    <div className="space-y-3 text-sm text-gray-600">
                                      <div><strong>Description:</strong> {offer.description}</div>
                                      <div><strong>Salary:</strong> {offer.salary}</div>
                                      <div><strong>Experience:</strong> {offer.experience}</div>
                                      <div><strong>Requirements:</strong></div>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {offer.requirements.map((req, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs bg-yellow-100 text-yellow-700 border border-yellow-200">
                                            {req}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg text-gray-900 mb-4">Candidate Pipeline</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                      {stages.map((stage) => (
                                        <div key={stage.id} className="flex flex-col">
                                          <div className={`p-2 rounded-t-lg text-xs font-semibold ${stage.color}`}>
                                            {stage.title} ({offer.candidates.filter(c => c.stage === stage.id).length})
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex justify-end mt-12">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-3 text-xs bg-[#0b787f] text-white"
                                        onClick={() => navigate(`/offer-details/${offer.id}`)}
                                      >
                                        <ArrowUpRight className="h-5 w-5 mr-2" />
                                        Details
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
};

export default HRJobOffers;