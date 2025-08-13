import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, AlertCircle, MessageSquare, XCircle } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

interface JobOffersStatusKPIsProps {
  data: {
    sent: number;
    accepted: number;
    pending: number;
    neglected: number;
    negotiation: number;
    declined: number;
  };
}

const JobOffersStatusKPIs: React.FC<JobOffersStatusKPIsProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl">Job Offers Status</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track the status of job offers extended to candidates
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <KpiCard icon={<FileText className="h-6 w-6 text-primary" />} title="Offers Sent" value={data.sent} />
        <KpiCard icon={<CheckCircle className="h-6 w-6 text-primary" />} title="Offers Accepted" value={data.accepted} />
        <KpiCard icon={<Clock className="h-6 w-6 text-primary" />} title="Offers Pending" value={data.pending} />
        <KpiCard icon={<AlertCircle className="h-6 w-6 text-primary" />} title="Offers Neglected" value={data.neglected} />
        <KpiCard icon={<MessageSquare className="h-6 w-6 text-primary" />} title="Ongoing Negotiation" value={data.negotiation} />
        <KpiCard icon={<XCircle className="h-6 w-6 text-primary" />} title="Offers Declined" value={data.declined} />
      </div>
    </CardContent>
  </Card>
);

export default JobOffersStatusKPIs;
