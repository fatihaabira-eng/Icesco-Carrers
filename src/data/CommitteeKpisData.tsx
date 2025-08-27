import { Award, Clock, CheckCircle, X,Calendar, Users, Languages, UserPlus, TrendingUp, FileText } from "lucide-react";

export const committeeDashboardSections = [
  {
    title: "Recruitment Efficiency Overview",
    subtitle: "Committee recruitment process KPIs",
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { icon: <Clock className="h-6 w-6 text-primary" />, title: "Overall Efficiency", value: "80%" },
      { icon: <UserPlus className="h-6 w-6 text-primary" />, title: "Successful Hires", value: "70%" },
      { icon: <CheckCircle className="h-6 w-6 text-primary" />, title: "Probation Success", value: "68%" },
      { icon: <TrendingUp className="h-6 w-6 text-primary" />, title: "One Year Performance", value: "80%" },
    ],
  },
  {
    title: "Candidates Interviews Overview",
    subtitle: "Key metrics for committee activities",
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { icon: <Clock className="h-6 w-6 text-primary" />, title: "Pending Interviews", value: 2 },
      { icon: <CheckCircle className="h-6 w-6 text-primary" />, title: "Accepted Interviews", value: 1 },
      { icon: <Users className="h-6 w-6 text-primary" />, title: "Upcoming Interviews", value: 1 },
      { icon: <Award className="h-6 w-6 text-primary" />, title: "Completed Interviews", value: 1 },
      { icon: <FileText className="h-6 w-6 text-primary" />, title: "Missed Interviews", value: 3 },
      { icon: <Users className="h-6 w-6 text-primary" />, title: "Total Interviews", value: 10 },
    ],
  },
  {
    title: "Rejected Candidates Reasons",
    subtitle: "Analysis of reasons for rejecting candidates",
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { icon: <Languages className="h-6 w-6 text-primary" />, title: "Language", value: "10%" },
      { icon: <CheckCircle className="h-6 w-6 text-primary" />, title: "Integrity", value: "50%" },
      { icon: <Calendar className="h-6 w-6 text-primary" />, title: "Relevant Experience", value: "20%" },
      { icon: <Award className="h-6 w-6 text-primary" />, title: "Alignment with ICESCO values", value: "20%" },
    ],
  },
  {
    title: "Candidates Assessment Status",
    subtitle: "Current status of candidate assessments",
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { icon: <X className="h-6 w-6 text-primary" />, title: "Rejected", value: 2 },
      { icon: <CheckCircle className="h-6 w-6 text-primary" />, title: "Accepted", value: 1 },
      { icon: <Users className="h-6 w-6 text-primary" />, title: "Recommended for another Position", value: 1 },
    ],
  },
];
