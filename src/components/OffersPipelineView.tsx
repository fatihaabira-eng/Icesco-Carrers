import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  jobTitle: string;
  stage: 'new' | 'under_review' | 'interview' | 'offer' | 'hired';
  stageDate: string;
}

interface OffersPipelineViewProps {
  candidates: Candidate[];
  onStageChange?: (candidateId: string, newStage: Candidate['stage']) => void;
}

const stages = [
  { id: 'new', title: 'New', color: 'bg-blue-100' },
  { id: 'under_review', title: 'Under Review', color: 'bg-yellow-100' },
  { id: 'interview', title: 'Interview', color: 'bg-purple-100' },
  { id: 'offer', title: 'Offer', color: 'bg-orange-100' },
  { id: 'hired', title: 'Hired', color: 'bg-green-100' },
] as const;

const OffersPipelineView: React.FC<OffersPipelineViewProps> = ({ candidates, onStageChange }) => {
  return (
    <div className="space-y-6 max-w-full mx-auto p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Offers Pipeline</CardTitle>
          <p className="text-muted-foreground">Manage candidates through the hiring pipeline</p>
        </CardHeader>
      </Card>

      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex flex-col">
            <Card className={cn('mb-4', stage.color)}>
              <CardHeader>
                <CardTitle className="text-lg">{stage.title}</CardTitle>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              {candidates
                .filter((candidate) => candidate.stage === stage.id)
                .map((candidate) => (
                  <Card key={candidate.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-sm text-muted-foreground">{candidate.jobTitle}</div>
                        <div className="text-sm text-muted-foreground">
                          In stage since: {format(new Date(candidate.stageDate), 'PPP')}
                        </div>
                        <Select
                          value={candidate.stage}
                          onValueChange={(value) =>
                            onStageChange?.(candidate.id, value as Candidate['stage'])
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {candidates.filter((candidate) => candidate.stage === stage.id).length === 0 && (
                <div className="text-center text-muted-foreground text-sm">No candidates in this stage.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPipelineView;