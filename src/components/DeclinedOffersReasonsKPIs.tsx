import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface DeclinedOffersReasonsKPIsProps {
  data: Array<{
    reason: string;
    percentage: number;
    Icon: React.ComponentType<{ className?: string }>;
  }>;
}

const DeclinedOffersReasonsKPIs: React.FC<DeclinedOffersReasonsKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">Declined Offers Reasons</CardTitle>
          <p className="text-sm text-muted-foreground">
            Analysis of reasons why candidates decline job offers
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {data.map(item => (
          <KpiCard key={item.reason} icon={<item.Icon className="h-6 w-6 text-primary" />} title={item.reason} value={`${item.percentage}%`} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export default DeclinedOffersReasonsKPIs;
