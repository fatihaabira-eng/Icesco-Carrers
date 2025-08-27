import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, Briefcase, Users } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface IcescoVacanciesKPIsProps {
  data: {
    requestedPositions: number;
    approvedPositions: number;
    openPositions: number;
    totalCandidates: number;
  };
}

const IcescoVacanciesKPIs: React.FC<IcescoVacanciesKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">ICESCO Vacancies</CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of open positions and recruitment metrics
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<FileText className="h-6 w-6 text-primary" />} title="Requested Positions" value={data.requestedPositions} />
        <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Approved Positions" value={data.approvedPositions} />
        <KpiCard icon={<Briefcase className="h-6 w-6 text-primary" />} title="Published Positions" value={data.openPositions} />
        <KpiCard icon={<Users className="h-6 w-6 text-primary" />} title="Applied Candidates" value={data.totalCandidates} />
      </div>
    </CardContent>
  </Card>
);

export default IcescoVacanciesKPIs;
