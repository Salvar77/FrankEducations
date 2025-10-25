export interface Program {
  id: number;
  name: string;
  university: string;
  country: string;
  degree: string;
  duration: string;
  tuition: string;
  language: string;
  field: string;
  intake: string;
  applicationFee: string;
  campusCity: string;
  badges: string[];
  successPredictions: {
    intake: string;
    level: string;
  }[];
  degreeType: string;
  // NOWE POLA:
  logo: string;
  description: string;
  admissionRequirements: string[];
  applyLink: string;
}

export const mockPrograms: Program[] = [
  {
    id: 1,
    name: "College Certificate - Medical Office Practices (1308)",
    university: "Conestoga College - Doon",
    country: "Ontario, CAN",
    degree: "College Certificate",
    degreeType: "1-Year Post-Secondary Certificate",
    duration: "8 months",
    tuition: "$14,588 CAD",
    language: "English",
    field: "Medical Office Practices",
    intake: "Multiple Intakes",
    applicationFee: "$100 CAD",
    campusCity: "Kitchener",
    badges: ["Scholarships Available", "Fast Acceptance"],
    successPredictions: [
      { intake: "Jan 2026", level: "Low" },
      { intake: "Sep 2026", level: "Very High" },
    ],
    logo: "/images/logos/conestoga-college.png",
    description:
      "Gain essential skills for medical office administration including patient records management, medical billing, and healthcare software proficiency.",
    admissionRequirements: [
      "High School Diploma or equivalent",
      "English language proficiency",
      "Basic computer skills",
      "Medical terminology knowledge preferred",
    ],
    applyLink: "/auth/signup?program=1",
  },
  {
    id: 2,
    name: "Bachelor of Arts - Medical Professional Stream (RKA)",
    university: "Trent University - Peterborough",
    country: "Ontario, CAN",
    degree: "Bachelor of Arts",
    degreeType: "4-Year Bachelor's Degree",
    duration: "48 months",
    tuition: "$30,549 CAD",
    language: "English",
    field: "Medical Professional Stream",
    intake: "Multiple Intakes",
    applicationFee: "$92 CAD",
    campusCity: "Peterborough",
    badges: ["Fast Acceptance"],
    successPredictions: [
      { intake: "Sep 2026", level: "Very High" },
      { intake: "Sep 2027", level: "High" },
    ],
    logo: "/images/logos/trent-university.png",
    description:
      "Comprehensive pre-medical program preparing students for medical school with strong foundation in sciences and humanities.",
    admissionRequirements: [
      "High School Diploma with 85% average",
      "Prerequisites: Biology, Chemistry, Mathematics",
      "English proficiency test",
      "Personal statement and references",
    ],
    applyLink: "/auth/signup?program=2",
  },
  {
    id: 3,
    name: "Bachelor of Science - Medical Professional Stream (RKA)",
    university: "Trent University - Peterborough",
    country: "Ontario, CAN",
    degree: "Bachelor of Science",
    degreeType: "4-Year Bachelor's Degree",
    duration: "48 months",
    tuition: "$30,549 CAD",
    language: "English",
    field: "Medical Professional Stream",
    intake: "Multiple Intakes",
    applicationFee: "$92 CAD",
    campusCity: "Peterborough",
    badges: ["Fast Acceptance"],
    successPredictions: [
      { intake: "Sep 2026", level: "Very High" },
      { intake: "Sep 2027", level: "High" },
    ],
    logo: "/images/logos/trent-university.png",
    description:
      "Science-focused pre-medical program with advanced laboratory work and research opportunities for aspiring healthcare professionals.",
    admissionRequirements: [
      "High School Diploma with 88% average",
      "Prerequisites: Advanced Biology, Chemistry, Physics, Calculus",
      "English proficiency test",
      "Research experience preferred",
    ],
    applyLink: "/auth/signup?program=3",
  },
  {
    id: 4,
    name: "College Certificate - Medical Office Assistant and Unit Clerk",
    university: "Bow Valley College",
    country: "Alberta, CAN",
    degree: "College Certificate",
    degreeType: "1-Year Post-Secondary Certificate",
    duration: "8 months",
    tuition: "$15,546 CAD",
    language: "English",
    field: "Medical Office Assistant",
    intake: "Multiple Intakes",
    applicationFee: "$140 CAD",
    campusCity: "Calgary",
    badges: [],
    successPredictions: [
      { intake: "Sep 2026", level: "Very High" },
      { intake: "Sep 2027", level: "High" },
    ],
    logo: "/images/logos/bow-valley-college.png",
    description:
      "Fast-track program for medical office administration and unit clerk roles in hospitals and healthcare facilities.",
    admissionRequirements: [
      "High School Diploma or mature student status",
      "English language proficiency",
      "Keyboarding speed of 40 wpm",
      "Clear criminal record check",
    ],
    applyLink: "/auth/signup?program=4",
  },
  {
    id: 5,
    name: "Medicine",
    university: "University of Warsaw",
    country: "Poland",
    degree: "Bachelor",
    degreeType: "6-Year Medical Degree",
    duration: "6 years",
    tuition: "€12,000/year",
    language: "English",
    field: "Medical Studies",
    intake: "October 2024",
    applicationFee: "€100",
    campusCity: "Warsaw",
    badges: ["Scholarships Available"],
    successPredictions: [
      { intake: "Oct 2024", level: "High" },
      { intake: "Oct 2025", level: "Very High" },
    ],
    logo: "/images/logos/university-warsaw.png",
    description:
      "Full medical degree program in English preparing students for international medical practice with clinical rotations across Europe.",
    admissionRequirements: [
      "High School Diploma with Biology, Chemistry, Physics",
      "Medical entrance exam",
      "English proficiency (IELTS 6.5 or equivalent)",
      "Motivation letter and interview",
    ],
    applyLink: "/auth/signup?program=5",
  },
];
