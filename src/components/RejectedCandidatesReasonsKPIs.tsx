import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface RejectedCandidatesReasonsKPIsProps {
  data: Array<{
    reason: string;
    percentage: number;
    Icon: React.ComponentType<{ className?: string }>;
  }>;
}

const RejectedCandidatesReasonsKPIs: React.FC<RejectedCandidatesReasonsKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">Rejected Candidates Reasons</CardTitle>
          <p className="text-sm text-muted-foreground">
            Analysis of reasons for rejecting candidates during the screening process
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map(item => (
          <KpiCard key={item.reason} icon={<item.Icon className="h-6 w-6 text-primary" />} title={item.reason} value={`${item.percentage}%`} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RejectedCandidatesReasonsKPIs;
