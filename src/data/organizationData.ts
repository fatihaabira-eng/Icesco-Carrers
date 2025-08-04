export interface OrganizationUnit {
  name: string;
  type: 'sector' | 'center' | 'support unit';
}

export const organizationUnits: OrganizationUnit[] = [
  // Sectors
  {
    name: "Education Sector",
    type: "sector"
  },
  {
    name: "Sector of Strategy and Institutional Excellence",
    type: "sector"
  },
  {
    name: "Sector of Partnerships and International Cooperation",
    type: "sector"
  },
  {
    name: "Science and Environment Sector",
    type: "sector"
  },
  {
    name: "Culture and Communication Sector",
    type: "sector"
  },
  {
    name: "Social and Human Sciences Sector",
    type: "sector"
  },
  {
    name: "Media and Communication Sector",
    type: "sector"
  },
  
  // Centers
  {
    name: "External Specialized Offices and Centers",
    type: "center"
  },
  {
    name: "Center of Chairs, Scholarships and Prizes",
    type: "center"
  },
  {
    name: "Poetry and Literature Center",
    type: "center"
  },
  {
    name: "Calligraphie and Manuscript Center",
    type: "center"
  },
  {
    name: "Training Center",
    type: "center"
  },
  {
    name: "Center of Foresight and Artificial Intelligence",
    type: "center"
  },
  {
    name: "Civilizational Dialogue Center",
    type: "center"
  },
  {
    name: "Arabic Language Center for Non-Arabic Speakers",
    type: "center"
  },
  {
    name: "Islamic World Heritage Center",
    type: "center"
  },
  {
    name: "Center of Translation and Publishing",
    type: "center"
  },
  
  // Support Units
  {
    name: "Director General Office",
    type: "support unit"
  },
  {
    name: "General Secretariat of National Commissions and Conferences",
    type: "support unit"
  },
  {
    name: "Department of legal affairs and international standards",
    type: "support unit"
  },
  {
    name: "Deputy Director General for Programs",
    type: "support unit"
  },
  {
    name: "Federation of Universities of the Islamic World",
    type: "support unit"
  },
  {
    name: "Department of Administrative Operations",
    type: "support unit"
  },
  {
    name: "Department of Digital Transformation",
    type: "support unit"
  },
  {
    name: "Department of Financial Operations",
    type: "support unit"
  },
  {
    name: "Internal Audit Department",
    type: "support unit"
  },
  {
    name: "Department of Public Relations and Protocol",
    type: "support unit"
  },
  {
    name: "Department of Design and Printing",
    type: "support unit"
  },
  {
    name: "Department of Human Capital Management",
    type: "support unit"
  }
];

export const getUnitsByType = (type: 'sector' | 'center' | 'support unit') => {
  return organizationUnits.filter(unit => unit.type === type);
};