import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, Globe, Share2, UserPlus, Building } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface RecruitmentOutreachKPIsProps {
  data: {
    website: number;
    socialMedia: number;
    referral: number;
    internal: number;
    external: number;
  };
}

const RecruitmentOutreachKPIs: React.FC<RecruitmentOutreachKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Briefcase className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">Recruitment Outreach</CardTitle>
          <p className="text-sm text-muted-foreground">
            Effectiveness of different recruitment channels
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard icon={<Globe className="h-6 w-6 text-primary" />} title="Website" value={data.website} />
        <KpiCard icon={<Share2 className="h-6 w-6 text-primary" />} title="Social Media" value={data.socialMedia} />
        <KpiCard icon={<UserPlus className="h-6 w-6 text-primary" />} title="Referral" value={data.referral} />
        <KpiCard icon={<Building className="h-6 w-6 text-primary" />} title="Internal" value={data.internal} />
        <KpiCard icon={<Globe className="h-6 w-6 text-primary" />} title="Member States" value={data.external} />
      </div>
    </CardContent>
  </Card>
);

export default RecruitmentOutreachKPIs;
