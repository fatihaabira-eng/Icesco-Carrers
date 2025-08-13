import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Target, UserPlus, CheckCircle, TrendingUp } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface RecruitmentEfficiencyKPIsProps {
  data: {
    overallEfficiency: number;
    successfulHires: number;
    probationSuccess: number;
    oneYearPerformance: number;
  };
}

const RecruitmentEfficiencyKPIs: React.FC<RecruitmentEfficiencyKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">Recruitment Efficiency</CardTitle>
          <p className="text-sm text-muted-foreground">
            Metrics evaluating the effectiveness of the recruitment process
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={<Target className="h-6 w-6 text-primary" />} title="Overall Efficiency" value={`${data.overallEfficiency}%`} />
        <KpiCard icon={<UserPlus className="h-6 w-6 text-primary" />} title="Successful Hires" value={`${data.successfulHires}%`} />
        <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Probation Success" value={`${data.probationSuccess}%`} />
        <KpiCard icon={<TrendingUp className="h-6 w-6 text-primary" />} title="One Year Performance" value={`${data.oneYearPerformance}%`} />
      </div>
    </CardContent>
  </Card>
);

export default RecruitmentEfficiencyKPIs;
