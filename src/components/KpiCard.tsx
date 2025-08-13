import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const KpiCard: React.FC<KpiCardProps> = ({ icon, title, value }) => {
  const formattedValue = typeof value === 'string' && value.includes('%')
    ? value
    : typeof value === 'number'
      ? value.toString()
      : value;

  return (
    <Card className="border-0 shadow-none flex-1 min-w-[150px]">
      <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-3 flex-1 justify-center">
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
          <div className="w-full">
            <p className="text-lg font-semibold text-muted-foreground truncate" title={title}>{title}</p>
            <p className="text-3xl font-bold text-primary mt-2">{formattedValue}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
