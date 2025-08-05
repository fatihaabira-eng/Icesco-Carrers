import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface KPICardsProps {
  cards: KPICardProps[];
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon: Icon, description, trend }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-primary">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last period
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const KPICards: React.FC<KPICardsProps> = ({ cards }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <KPICard key={index} {...card} />
      ))}
    </div>
  );
};

export default KPICards; 