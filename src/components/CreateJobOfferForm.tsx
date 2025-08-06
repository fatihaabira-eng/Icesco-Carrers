import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CalendarIcon, PlusCircle, Save, Briefcase, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateJobOfferFormProps {
  onClose?: () => void;
}

const businessUnits = [
  'Technology Division',
  'Human Resources',
  'Finance Department',
  'Marketing & Sales',
  'Operations',
  'Research & Development',
];


const CreateJobOfferForm: React.FC<CreateJobOfferFormProps> = ({ onClose }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    reference: '',
    jobTitle: '',
    jobDescription: '',
    contractType: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    tasks: [] as string[],
    academicQualifications: '',
    preferredCertifications: '',
    salaryBenefits: '',
    closingDate: undefined as Date | undefined,
    publishedDate: undefined as Date | undefined,
    createdDate: new Date(),
    expectedJoiningDate: undefined as Date | undefined,
    location: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
    priority: 'active' as 'immediate' | 'active' | 'opportunistic',
    positionsNeeded: 1,
    businessUnit: '',
  });

  const [currentTask, setCurrentTask] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | number | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    if (currentTask.trim() && !formData.tasks.includes(currentTask.trim())) {
      setFormData(prev => ({ ...prev, tasks: [...prev.tasks, currentTask.trim()] }));
      setCurrentTask('');
    }
  };

  const removeTask = (taskToRemove: string) => {
    setFormData(prev => ({ ...prev, tasks: prev.tasks.filter(task => task !== taskToRemove) }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills(prev => [...prev, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'task' | 'skill') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'task') addTask();
      else if (type === 'skill') addSkill();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'bg-red-500';
      case 'active':
        return 'bg-yellow-500';
      case 'opportunistic':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSubmit = () => {
    // Validation
    if (
      !formData.reference ||
      !formData.jobTitle ||
      !formData.jobDescription ||
      !formData.businessUnit ||
      !formData.location ||
      !formData.closingDate ||
      !formData.expectedJoiningDate
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (*).',
        variant: 'destructive',
      });
      return;
    }

    const jobOfferData = {
      ...formData,
      skills,
      id: `JOB-${Date.now()}`,
      createdDate: formData.createdDate.toISOString(),
      publishedDate: formData.publishedDate ? formData.publishedDate.toISOString() : undefined,
      closingDate: formData.closingDate ? formData.closingDate.toISOString() : undefined,
      expectedJoiningDate: formData.expectedJoiningDate ? formData.expectedJoiningDate.toISOString() : undefined,
      applicants: 0,
      shortlisted: 0,
    };

    // Save job offer (this would typically go to a backend)
    console.log('Creating job offer:', jobOfferData);

    toast({
      title: 'Job Offer Created',
      description: `Job posting for ${formData.jobTitle} has been successfully created.`,
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Create New Job Offer</CardTitle>
              <p className="text-muted-foreground">
                Post a new position to attract qualified candidates
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference">Reference </Label>
              <Input
                id="reference"
                placeholder="JOB-2025-001"
                disabled
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessUnit">Business Unit *</Label>
              <Select
                value={formData.businessUnit}
                onValueChange={(value) => handleInputChange('businessUnit', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business unit" />
                </SelectTrigger>
                <SelectContent>
                  {businessUnits.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="lovation"
                placeholder="e.g., Rabat, Morocco"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type</Label>
              <Select
                value={formData.contractType}
                onValueChange={(value) => handleInputChange('contractType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate Need</SelectItem>
                  <SelectItem value="active">Active Search</SelectItem>
                  <SelectItem value="opportunistic">Opportunistic Hire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="positionsNeeded">Number of Positions Needed</Label>
              <Input
                id="positionsNeeded"
                type="number"
                min="1"
                value={formData.positionsNeeded}
                onChange={(e) => handleInputChange('positionsNeeded', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Closing Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.closingDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.closingDate ? format(formData.closingDate, "PPP") : "Select closing date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.closingDate}
                    onSelect={(date) => handleInputChange('closingDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Published Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.publishedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.publishedDate ? format(formData.publishedDate, "PPP") : "Select published date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.publishedDate}
                    onSelect={(date) => handleInputChange('publishedDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Expected Joining Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.expectedJoiningDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expectedJoiningDate ? format(formData.expectedJoiningDate, "PPP") : "Select joining date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.expectedJoiningDate}
                    onSelect={(date) => handleInputChange('expectedJoiningDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description & Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description & Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              placeholder="Provide a detailed description of the position, responsibilities, and expectations..."
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Tasks to be Performed</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tasks.map((task) => (
                <Badge key={task} variant="secondary" className="flex items-center space-x-1">
                  <span>{task}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTask(task)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a task (e.g., Develop software solutions)"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'task')}
              />
              <Button onClick={addTask} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                  <span>{skill}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a skill (e.g., JavaScript, Project Management)"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'skill')}
              />
              <Button onClick={addSkill} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="academicQualifications">Academic Qualifications</Label>
            <Textarea
              id="academicQualifications"
              placeholder="List required academic qualifications (e.g., Bachelor's in Computer Science)..."
              value={formData.academicQualifications}
              onChange={(e) => handleInputChange('academicQualifications', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredCertifications">Preferred Certifications</Label>
            <Textarea
              id="preferredCertifications"
              placeholder="List preferred certifications (e.g., AWS Certified Developer)..."
              value={formData.preferredCertifications}
              onChange={(e) => handleInputChange('preferredCertifications', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salaryBenefits">Salary, Allowances, and Benefits</Label>
            <Textarea
              id="salaryBenefits"
              placeholder="Detail salary range, allowances, and benefits (e.g., 25,000-35,000 MAD, health insurance)..."
              value={formData.salaryBenefits}
              onChange={(e) => handleInputChange('salaryBenefits', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-3">
            <Button onClick={handleSubmit} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Create Job Offer</span>
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJobOfferForm;