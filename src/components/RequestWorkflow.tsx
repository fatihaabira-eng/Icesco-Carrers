import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ArrowRight, 
  User, 
  Calendar,
  MessageSquare,
  AlertTriangle,
  FastForward,
  Pause
} from 'lucide-react';
import { format } from 'date-fns';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  comments?: string;
  actions: string[];
}

interface RequestWorkflowProps {
  requestId: string;
  currentUserRole: 'manager' | 'hr' | 'director' | 'committee';
}

const RequestWorkflow = ({ requestId, currentUserRole }: RequestWorkflowProps) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [comment, setComment] = useState('');
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      title: 'Request Submitted',
      description: 'Initial recruitment request submitted by manager',
      status: 'completed',
      assignedTo: 'Ahmed Hassan - Risk Manager',
      dueDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-15'),
      comments: 'Request submitted for Senior Risk Analyst position',
      actions: []
    },
    {
      id: '2',
      title: 'Manager N+1 Review',
      description: 'Direct supervisor review and approval',
      status: 'completed',
      assignedTo: 'Dr. Sarah Benali - Department Head',
      dueDate: new Date('2024-01-18'),
      completedDate: new Date('2024-01-17'),
      comments: 'Approved - Position is critical for Q1 2024 objectives',
      actions: []
    },
    {
      id: '3',
      title: 'Direction Review',
      description: 'Strategic alignment and budget approval',
      status: 'in-progress',
      assignedTo: 'Mohamed Tazi - Deputy Director',
      dueDate: new Date('2024-01-22'),
      comments: 'Under review for budget allocation',
      actions: ['approve', 'reject', 'request-changes']
    },
    {
      id: '4',
      title: 'HR Validation',
      description: 'HR compliance and process validation',
      status: 'pending',
      assignedTo: 'Fatima Zahra - HR Manager',
      dueDate: new Date('2024-01-25'),
      actions: ['validate', 'request-clarification']
    },
    {
      id: '5',
      title: 'Recruitment Process',
      description: 'Active recruitment and candidate sourcing',
      status: 'pending',
      assignedTo: 'HR Recruitment Team',
      dueDate: new Date('2024-02-15'),
      actions: ['start-recruitment']
    }
  ]);

  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const canUserAct = (step: WorkflowStep) => {
    if (step.status !== 'in-progress') return false;
    
    switch (currentUserRole) {
      case 'manager':
        return step.id === '1';
      case 'director':
        return step.id === '3';
      case 'hr':
        return step.id === '4' || step.id === '5';
      default:
        return false;
    }
  };

  const handleAction = (stepId: string, action: string) => {
    setWorkflowSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        let newStatus: WorkflowStep['status'] = step.status;
        
        if (action === 'approve' || action === 'validate') {
          newStatus = 'completed';
        } else if (action === 'reject') {
          newStatus = 'rejected';
        }
        
        return {
          ...step,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date() : undefined,
          comments: comment || step.comments
        };
      }
      return step;
    }));
    
    setIsActionDialogOpen(false);
    setComment('');
    setSelectedAction('');
  };

  const requestFastTrack = () => {
    console.log('Fast-track requested');
    // Implementation for fast-track request
  };

  const getCurrentStep = () => {
    return workflowSteps.find(step => step.status === 'in-progress') || workflowSteps[0];
  };

  const getDaysOverdue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-6">
      {/* Request Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recruitment Request Workflow</CardTitle>
              <p className="text-muted-foreground">Request ID: {requestId}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={requestFastTrack}>
                <FastForward className="h-4 w-4 mr-2" />
                Request Fast-track
              </Button>
              <Badge variant="outline">
                {getCurrentStep()?.title}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Workflow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {workflowSteps.map((step, index) => {
              const isOverdue = step.status === 'in-progress' && getDaysOverdue(step.dueDate) > 0;
              const daysOverdue = getDaysOverdue(step.dueDate);
              
              return (
                <div key={step.id} className="relative">
                  {/* Connector Line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                  )}
                  
                  <div className="flex items-start space-x-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      {/* Assignee and Dates */}
                      <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {step.assignedTo}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {format(step.dueDate, 'MMM dd, yyyy')}
                        </div>
                        {step.completedDate && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed: {format(step.completedDate, 'MMM dd, yyyy')}
                          </div>
                        )}
                        {isOverdue && (
                          <div className="flex items-center text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {daysOverdue} days overdue
                          </div>
                        )}
                      </div>
                      
                      {/* Comments */}
                      {step.comments && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start">
                            <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                            <p className="text-sm">{step.comments}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      {canUserAct(step) && (
                        <div className="mt-3">
                          <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                Take Action
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Action Required: {step.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Action</Label>
                                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {step.actions.map(action => (
                                        <SelectItem key={action} value={action}>
                                          {action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label>Comments</Label>
                                  <Textarea
                                    placeholder="Add your comments (optional)"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setIsActionDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={() => handleAction(step.id, selectedAction)}
                                    disabled={!selectedAction}
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Days in Process</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Steps Completed</p>
                <p className="text-2xl font-bold">2/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Target Completion</p>
                <p className="text-2xl font-bold">Jan 25</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestWorkflow;