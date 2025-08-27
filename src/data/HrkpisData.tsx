import { FileText, CheckCircle, Briefcase, Users } from "lucide-react";
import {
  jobOfferStatusData,
  declinedReasonsData,
  icescoVacanciesData,
  rejectedReasonsData,
  recruitmentOutreachData,
  recruitmentEfficiencyData,
} from "@/data/hrDashboardData";

export const HrDashboardSections = [
  {
    title: "ICESCO Vacancies",
    subtitle: "Overview of open positions and recruitment metrics",
    headerIcon: <FileText className="h-6 w-6 text-primary" />,
    items: [
      {
        icon: <FileText className="h-6 w-6 text-primary" />,
        title: "Requested Positions",
        value: icescoVacanciesData.requestedPositions,
      },
      {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Approved Positions",
        value: icescoVacanciesData.approvedPositions,
      },
      {
        icon: <Briefcase className="h-6 w-6 text-primary" />,
        title: "Published Positions",
        value: icescoVacanciesData.openPositions,
      },
      {
        icon: <Users className="h-6 w-6 text-primary" />,
        title: "Applied Candidates",
        value: icescoVacanciesData.totalCandidates,
      },
    ],
  },
  {
    title: "Recruitment Efficiency",
    subtitle: "How fast and effective recruitment process is",
    headerIcon: <CheckCircle className="h-6 w-6 text-primary" />,
    items: [
      {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Overall Efficiency",
        value: recruitmentEfficiencyData.overallEfficiency + "%",
      },
      {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Successful Hires",
        value: recruitmentEfficiencyData.successfulHires + "%",
      },
      {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Probation Success",
        value: recruitmentEfficiencyData.probationSuccess + "%",
      },
      {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "One Year Performance",
        value: recruitmentEfficiencyData.oneYearPerformance + "%",
      },
    ],
  },
  {
    title: "Job Offers Status",
    subtitle: "Distribution of job offers",
    headerIcon: <Briefcase className="h-6 w-6 text-primary" />,
    items: Object.entries(jobOfferStatusData).map(([key, value]) => ({
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    })),
  },
  {
    title: "Declined Offers Reasons",
    subtitle: "Top reasons candidates declined offers",
    headerIcon: <Users className="h-6 w-6 text-primary" />,
    items: declinedReasonsData.map((item) => ({
      icon: <item.Icon className="h-6 w-6 text-primary" />,
      title: item.reason,
      value: item.percentage + "%",
    })),
  },
  {
    title: "Rejected Candidates Reasons",
    subtitle: "Why candidates got rejected",
    headerIcon: <Users className="h-6 w-6 text-primary" />,
    items: rejectedReasonsData.map((item) => ({
      icon: <item.Icon className="h-6 w-6 text-primary" />,
      title: item.reason,
      value: item.percentage + "%",
    })),
  },
  {
    title: "Recruitment Outreach",
    subtitle: "Sources of candidate applications",
    headerIcon: <Users className="h-6 w-6 text-primary" />,
    items: Object.entries(recruitmentOutreachData).map(([key, value]) => ({
      icon: <Users className="h-6 w-6 text-primary" />,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    })),
  },
];
