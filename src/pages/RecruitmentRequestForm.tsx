import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeft, ArrowRight, Save, Send, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  businessUnit: z.string().min(1, 'Business Unit is required'),
  reportingLine: z.string().min(1, 'Reporting line is required'),
  justification: z.string().min(50, 'Justification must be at least 50 characters'),
  responsibilities: z.string().min(100, 'Responsibilities must be at least 100 characters'),
  contractType: z.string().min(1, 'Contract type is required'),
  joiningDate: z.date(),
  criticality: z.string().min(1, 'Criticality is required'),
  internalBench: z.boolean(),
  budgetSource: z.string().min(1, 'Budget source is required'),
  budgetMin: z.string().min(1, 'Minimum budget is required'),
  budgetMax: z.string().min(1, 'Maximum budget is required'),
  technicalSkills: z.array(z.string()).min(1, 'At least one technical skill is required'),
  softSkills: z.array(z.string()).min(1, 'At least one soft skill is required'),
});

const RecruitmentRequestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [technicalSkill, setTechnicalSkill] = useState('');
  const [softSkill, setSoftSkill] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technicalSkills: [],
      softSkills: [],
      internalBench: false,
    },
  });

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Job title, business unit, and reporting' },
    { number: 2, title: 'Position Details', description: 'Justification and responsibilities' },
    { number: 3, title: 'Requirements', description: 'Skills and qualifications' },
    { number: 4, title: 'Contract & Budget', description: 'Contract type and budget details' },
    { number: 5, title: 'Review', description: 'Review and submit' }
  ];

  const addTechnicalSkill = () => {
    if (technicalSkill.trim() && !technicalSkills.includes(technicalSkill.trim())) {
      const newSkills = [...technicalSkills, technicalSkill.trim()];
      setTechnicalSkills(newSkills);
      form.setValue('technicalSkills', newSkills);
      setTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    const newSkills = technicalSkills.filter(s => s !== skill);
    setTechnicalSkills(newSkills);
    form.setValue('technicalSkills', newSkills);
  };

  const addSoftSkill = () => {
    if (softSkill.trim() && !softSkills.includes(softSkill.trim())) {
      const newSkills = [...softSkills, softSkill.trim()];
      setSoftSkills(newSkills);
      form.setValue('softSkills', newSkills);
      setSoftSkill('');
    }
  };

  const removeSoftSkill = (skill: string) => {
    const newSkills = softSkills.filter(s => s !== skill);
    setSoftSkills(newSkills);
    form.setValue('softSkills', newSkills);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
    navigate('/manpower-dashboard');
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveDraft = () => {
    console.log('Saving draft...');
    // Save current form state as draft
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full border-2",
            currentStep >= step.number 
              ? "bg-primary text-primary-foreground border-primary" 
              : "bg-background border-muted-foreground"
          )}>
            {step.number}
          </div>
          <div className="ml-3 hidden md:block">
            <p className={cn(
              "text-sm font-medium",
              currentStep >= step.number ? "text-primary" : "text-muted-foreground"
            )}>
              {step.title}
            </p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "w-12 h-0.5 mx-4",
              currentStep > step.number ? "bg-primary" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <Button variant="ghost" onClick={() => navigate('/manpower-dashboard')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-lg font-semibold">New Recruitment Request</h1>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 max-w-4xl">
        <StepIndicator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Senior Risk Analyst" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Unit/Direction</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="risk-advisory">Risk Advisory</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="financial-advisory">Financial Advisory</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="human-resources">Human Resources</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reportingLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reporting Line (Manager)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Dr. Ahmed Hassan - Head of Risk Advisory" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 2: Position Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Position Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="justification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Justification for Request</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Explain the necessity of this recruitment (replacement, new project, increased workload, etc.)"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responsibilities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary of Responsibilities</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the main tasks and responsibilities for this position"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="criticality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Criticality Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select criticality level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High - Urgent business need</SelectItem>
                            <SelectItem value="medium">Medium - Important but not urgent</SelectItem>
                            <SelectItem value="low">Low - Nice to have</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 3: Requirements */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Technical Skills (Hard Skills)</Label>
                    <div className="flex mt-2 space-x-2">
                      <Input
                        placeholder="Add technical skill"
                        value={technicalSkill}
                        onChange={(e) => setTechnicalSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnicalSkill())}
                      />
                      <Button type="button" onClick={addTechnicalSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {technicalSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button type="button" onClick={() => removeTechnicalSkill(skill)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Soft Skills (Behavioral Skills)</Label>
                    <div className="flex mt-2 space-x-2">
                      <Input
                        placeholder="Add soft skill"
                        value={softSkill}
                        onChange={(e) => setSoftSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftSkill())}
                      />
                      <Button type="button" onClick={addSoftSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {softSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="flex items-center gap-1">
                          {skill}
                          <button type="button" onClick={() => removeSoftSkill(skill)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="internalBench"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Check internal bench availability first
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Search for internal candidates before external recruitment
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 4: Contract & Budget */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contract & Budget Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contractType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contract Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cdi">CDI - Permanent Contract</SelectItem>
                            <SelectItem value="cdd">CDD - Fixed-term Contract</SelectItem>
                            <SelectItem value="mission">Mission Contract</SelectItem>
                            <SelectItem value="stage">Internship</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="joiningDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ideal Joining Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="core-funds">Core Funds</SelectItem>
                            <SelectItem value="project-budget">Project Budget</SelectItem>
                            <SelectItem value="external-funding">External Funding</SelectItem>
                            <SelectItem value="contingency">Contingency Fund</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budgetMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Budget (MAD)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 50000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Budget (MAD)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 80000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Job Title</h4>
                      <p className="text-muted-foreground">{form.watch('jobTitle')}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Business Unit</h4>
                      <p className="text-muted-foreground">{form.watch('businessUnit')}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Contract Type</h4>
                      <p className="text-muted-foreground">{form.watch('contractType')}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Criticality</h4>
                      <p className="text-muted-foreground">{form.watch('criticality')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {technicalSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {softSkills.map(skill => (
                        <Badge key={skill} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Budget Range</h4>
                    <p className="text-muted-foreground">
                      {form.watch('budgetMin')} - {form.watch('budgetMax')} MAD
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="space-x-2">
                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RecruitmentRequestForm;