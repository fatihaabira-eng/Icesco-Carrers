import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import KpiCard from "@/components/KpiCard";

interface KpiItem {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

interface KPISectionProps {
  title: string;
  subtitle: string;
  items: KpiItem[];
  headerIcon?: React.ReactNode;
}

const KPISection: React.FC<KPISectionProps> = ({
  title,
  subtitle,
  items,
  headerIcon,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          {headerIcon && (
            <div className="p-2 rounded-lg bg-primary/10">{headerIcon}</div>
          )}
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <KpiCard
              key={idx}
              icon={item.icon}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPISection;
