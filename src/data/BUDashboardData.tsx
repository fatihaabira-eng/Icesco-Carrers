import { Calendar, Users, FileText, Award, Clock, CheckCircle, X, UserPlus, TrendingUp, Languages } from 'lucide-react';

export const buDashboardSections = [
  {
    title: 'Candidates Interviews Overview',
    subtitle: 'Key metrics for your business unit activities',
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { title: 'Pending Interviews', value: 2, icon: <Clock className="h-6 w-6 text-primary" /> },
      { title: 'Accepted Interviews', value: 1, icon: <CheckCircle className="h-6 w-6 text-primary" />},
      { title: 'Upcoming Interviews', value: 1, icon: <Calendar className="h-6 w-6 text-primary" />},
      { title: 'Completed Interviews', value: 1, icon: <Award className="h-6 w-6 text-primary" />},
      { title: 'Missed Interviews', value: 3, icon: <FileText className="h-6 w-6 text-primary" /> },
      { title: 'Total Interviews', value: 10, icon: <Users className="h-6 w-6 text-primary" />}
    ]
  },
  {
    title: 'Rejected Candidates Reasons',
    subtitle: 'Analysis of reasons for rejecting candidates',
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { title: 'Language', value: '10%', icon:<Languages className="h-6 w-6 text-primary" /> },
      { title: 'Integrity', value: '50%', icon: <CheckCircle className="h-6 w-6 text-primary" />},
      { title: 'Relevant Experience', value: '20%', icon: <Calendar className="h-6 w-6 text-primary" />},
      { title: 'Alignment with ICESCO values', value: '20%', icon: <Award className="h-6 w-6 text-primary" /> }
    ]
  },
  {
    title: 'Candidates Assessment Status',
    subtitle: '',
    headerIcon: <Award className="h-6 w-6 text-primary" />,
    items: [
      { title: 'Rejected', value: 2, icon: <X className="h-6 w-6 text-primary" />},
      { title: 'Accepted', value: 1, icon: <CheckCircle className="h-6 w-6 text-primary" /> },
      { title: 'Recommended for another Position', value: 1, icon: <Users className="h-6 w-6 text-primary" /> }
    ]
  }
];

