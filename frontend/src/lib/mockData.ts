import { ProblemStatement, FilterOptions } from '@/types/problem-statement';

// Mock data for problem statements
export const mockProblemStatements: ProblemStatement[] = [
  {
    id: '1',
    title: 'Smart Traffic Management System',
    description: 'Develop an AI-powered traffic management system that can optimize traffic flow in real-time, reduce congestion, and improve road safety in urban areas.',
    detailedDescription: 'This challenge involves creating a comprehensive traffic management solution that uses artificial intelligence, IoT sensors, and real-time data analytics to monitor and control traffic flow. The system should be able to predict traffic patterns, automatically adjust signal timings, and provide alternative route suggestions to drivers.',
    category: 'Smart Automation',
    theme: 'Transportation',
    difficulty: 'Medium',
    organization: 'Ministry of Road Transport & Highways',
    department: 'Road Transport',
    techStack: ['AI/ML', 'IoT', 'Real-time Systems', 'Data Analytics'],
    maxTeamSize: 6,
    registrationDeadline: '2025-02-15',
    submissionDeadline: '2025-03-30',
    tags: ['AI', 'IoT', 'Traffic', 'Smart City'],
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    contactEmail: 'transport@gov.in',
    expectedOutcome: 'A working prototype of the traffic management system with real-time monitoring capabilities',
    evaluation: {
      criteria: ['Innovation', 'Technical Implementation', 'Scalability', 'User Experience'],
      process: 'Multi-round evaluation with industry experts'
    }
  },
  {
    id: '2',
    title: 'Healthcare Monitoring IoT Platform',
    description: 'Create a comprehensive IoT-based healthcare monitoring platform for remote patient monitoring and early disease detection.',
    detailedDescription: 'Design and develop an integrated healthcare platform that uses IoT devices to continuously monitor patient vital signs, detect anomalies, and alert healthcare providers in real-time. The system should support multiple types of medical sensors and provide predictive analytics.',
    category: 'Healthcare & Biomedical Devices',
    theme: 'Healthcare',
    difficulty: 'Hard',
    organization: 'All India Institute of Medical Sciences',
    department: 'Healthcare Technology',
    techStack: ['IoT', 'Cloud Computing', 'Mobile Apps', 'Data Analytics'],
    maxTeamSize: 5,
    registrationDeadline: '2025-02-10',
    submissionDeadline: '2025-03-25',
    tags: ['Healthcare', 'IoT', 'Monitoring', 'Analytics'],
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    contactEmail: 'health@aiims.edu',
    expectedOutcome: 'Functional IoT healthcare monitoring system with mobile and web interfaces',
    evaluation: {
      criteria: ['Medical Accuracy', 'Real-time Performance', 'User Interface', 'Security'],
      process: 'Evaluation by medical professionals and tech experts'
    }
  },
  {
    id: '3',
    title: 'Agricultural Crop Disease Detection',
    description: 'Develop an AI-based mobile application for early detection and diagnosis of crop diseases using computer vision and machine learning.',
    detailedDescription: 'Build a comprehensive mobile application that farmers can use to identify crop diseases by taking photos of their plants. The app should use advanced computer vision and machine learning algorithms to accurately diagnose diseases and provide treatment recommendations.',
    category: 'Agriculture, FoodTech & Rural Development',
    theme: 'Agriculture',
    difficulty: 'Medium',
    organization: 'Indian Council of Agricultural Research',
    department: 'Agricultural Research',
    techStack: ['Computer Vision', 'Mobile Development', 'Machine Learning', 'Cloud Services'],
    maxTeamSize: 4,
    registrationDeadline: '2025-02-20',
    submissionDeadline: '2025-04-05',
    tags: ['Agriculture', 'AI', 'Mobile App', 'Computer Vision'],
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    contactEmail: 'crops@icar.gov.in',
    expectedOutcome: 'Mobile app with high accuracy disease detection and treatment recommendations',
    evaluation: {
      criteria: ['Detection Accuracy', 'User Experience', 'Scalability', 'Practical Implementation'],
      process: 'Field testing with farmers and agricultural experts'
    }
  },
  {
    id: '4',
    title: 'Educational Learning Management System',
    description: 'Create an innovative learning management system with adaptive learning capabilities and personalized content delivery.',
    detailedDescription: 'Develop a next-generation LMS that adapts to individual student learning patterns, provides personalized content recommendations, and includes features like virtual classrooms, assessment tools, and progress analytics.',
    category: 'EdTech',
    theme: 'Education',
    difficulty: 'Medium',
    organization: 'Ministry of Education',
    department: 'Digital Education',
    techStack: ['Web Development', 'AI/ML', 'Database Management', 'Video Streaming'],
    maxTeamSize: 6,
    registrationDeadline: '2025-02-18',
    submissionDeadline: '2025-04-01',
    tags: ['Education', 'LMS', 'Adaptive Learning', 'EdTech'],
    videoUrl: 'https://www.youtube.com/watch?v=example4',
    contactEmail: 'edtech@education.gov.in',
    expectedOutcome: 'Fully functional LMS with adaptive learning features',
    evaluation: {
      criteria: ['User Experience', 'Adaptive Learning Quality', 'Scalability', 'Content Management'],
      process: 'Testing with educational institutions and feedback from educators'
    }
  },
  {
    id: '5',
    title: 'Cybersecurity Threat Detection System',
    description: 'Build an advanced cybersecurity system that can detect and prevent various types of cyber threats in real-time.',
    detailedDescription: 'Design a comprehensive cybersecurity solution that uses machine learning and behavioral analysis to identify potential security threats, malware, and suspicious activities across networks and systems.',
    category: 'Security & Surveillance',
    theme: 'Cybersecurity',
    difficulty: 'Hard',
    organization: 'National Security Council Secretariat',
    department: 'Cyber Security',
    techStack: ['Cybersecurity', 'Machine Learning', 'Network Security', 'Real-time Analytics'],
    maxTeamSize: 5,
    registrationDeadline: '2025-02-12',
    submissionDeadline: '2025-03-28',
    tags: ['Security', 'ML', 'Network', 'Threat Detection'],
    videoUrl: 'https://www.youtube.com/watch?v=example5',
    contactEmail: 'cyber@nsc.gov.in',
    expectedOutcome: 'Working threat detection system with real-time monitoring dashboard',
    evaluation: {
      criteria: ['Threat Detection Accuracy', 'Real-time Performance', 'False Positive Rate', 'System Integration'],
      process: 'Evaluation by cybersecurity experts and penetration testing'
    }
  },
  {
    id: '6',
    title: 'Renewable Energy Management Platform',
    description: 'Develop a smart platform for optimizing renewable energy generation, storage, and distribution in microgrids.',
    detailedDescription: 'Create an intelligent energy management system that can optimize the use of solar, wind, and other renewable energy sources, manage energy storage systems, and ensure efficient distribution to consumers.',
    category: 'Clean & Green Technology',
    theme: 'Renewable Energy',
    difficulty: 'Hard',
    organization: 'Ministry of New and Renewable Energy',
    department: 'Renewable Energy',
    techStack: ['IoT', 'Energy Systems', 'Optimization Algorithms', 'Real-time Control'],
    maxTeamSize: 6,
    registrationDeadline: '2025-02-22',
    submissionDeadline: '2025-04-10',
    tags: ['Renewable Energy', 'Smart Grid', 'IoT', 'Optimization'],
    videoUrl: 'https://www.youtube.com/watch?v=example6',
    contactEmail: 'renewable@mnre.gov.in',
    expectedOutcome: 'Smart energy management platform with optimization capabilities',
    evaluation: {
      criteria: ['Energy Efficiency', 'System Integration', 'Scalability', 'Cost Effectiveness'],
      process: 'Technical evaluation by energy experts and field testing'
    }
  },
  {
    id: '7',
    title: 'Financial Inclusion Digital Wallet',
    description: 'Create a comprehensive digital wallet solution to promote financial inclusion in rural and underserved communities.',
    detailedDescription: 'Develop a user-friendly digital payment platform that works in low-connectivity areas, supports multiple languages, and provides financial services to unbanked populations.',
    category: 'FinTech',
    theme: 'Financial Services',
    difficulty: 'Medium',
    organization: 'Reserve Bank of India',
    department: 'Financial Inclusion',
    techStack: ['Mobile Development', 'Blockchain', 'Offline Capability', 'Multi-language Support'],
    maxTeamSize: 5,
    registrationDeadline: '2025-02-25',
    submissionDeadline: '2025-04-15',
    tags: ['FinTech', 'Digital Payments', 'Financial Inclusion', 'Mobile'],
    videoUrl: 'https://www.youtube.com/watch?v=example7',
    contactEmail: 'fintech@rbi.org.in',
    expectedOutcome: 'Digital wallet with offline capabilities and multilingual support',
    evaluation: {
      criteria: ['User Experience', 'Security', 'Offline Functionality', 'Accessibility'],
      process: 'User testing in rural communities and security audits'
    }
  },
  {
    id: '8',
    title: 'Disaster Management Early Warning System',
    description: 'Build an AI-powered early warning system for natural disasters using satellite data and predictive modeling.',
    detailedDescription: 'Develop a comprehensive disaster management platform that uses satellite imagery, weather data, and machine learning to predict natural disasters and provide early warnings to communities and authorities.',
    category: 'Disaster Management',
    theme: 'Disaster Preparedness',
    difficulty: 'Hard',
    organization: 'National Disaster Management Authority',
    department: 'Early Warning Systems',
    techStack: ['Satellite Data Processing', 'Machine Learning', 'GIS', 'Alert Systems'],
    maxTeamSize: 6,
    registrationDeadline: '2025-02-14',
    submissionDeadline: '2025-03-31',
    tags: ['Disaster Management', 'Early Warning', 'AI', 'Satellite Data'],
    videoUrl: 'https://www.youtube.com/watch?v=example8',
    contactEmail: 'disaster@ndma.gov.in',
    expectedOutcome: 'Early warning system with accurate disaster prediction capabilities',
    evaluation: {
      criteria: ['Prediction Accuracy', 'Response Time', 'Coverage Area', 'Integration Capability'],
      process: 'Validation with historical disaster data and expert review'
    }
  }
];

export const mockFilterOptions: FilterOptions = {
  categories: [
    'Smart Automation',
    'Healthcare & Biomedical Devices',
    'Agriculture, FoodTech & Rural Development',
    'EdTech',
    'Security & Surveillance',
    'Clean & Green Technology',
    'FinTech',
    'Disaster Management'
  ],
  themes: [
    'Transportation',
    'Healthcare',
    'Agriculture',
    'Education',
    'Cybersecurity',
    'Renewable Energy',
    'Financial Services',
    'Disaster Preparedness'
  ],
  organizations: [
    'Ministry of Road Transport & Highways',
    'All India Institute of Medical Sciences',
    'Indian Council of Agricultural Research',
    'Ministry of Education',
    'National Security Council Secretariat',
    'Ministry of New and Renewable Energy',
    'Reserve Bank of India',
    'National Disaster Management Authority'
  ],
  departments: [
    'Road Transport',
    'Healthcare Technology',
    'Agricultural Research',
    'Digital Education',
    'Cyber Security',
    'Renewable Energy',
    'Financial Inclusion',
    'Early Warning Systems'
  ]
};

// Mock stats for StatsComponent
export const mockStats = {
  totalProblems: mockProblemStatements.length,
  totalOrganizations: mockFilterOptions.organizations.length,
  totalCategories: mockFilterOptions.categories.length,
  totalDepartments: mockFilterOptions.departments.length
};

// Helper function to simulate pagination
export const paginateData = <T>(data: T[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
};

// Helper function to filter data
export const filterProblemStatements = (
  data: ProblemStatement[],
  searchQuery: string,
  filters: {
    category?: string;
    theme?: string;
    organization?: string;
    department?: string;
  }
) => {
  let filteredData = [...data];

  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredData = filteredData.filter(ps => 
      ps.title.toLowerCase().includes(query) ||
      ps.description.toLowerCase().includes(query) ||
      ps.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    filteredData = filteredData.filter(ps => ps.category === filters.category);
  }

  if (filters.theme && filters.theme !== 'all') {
    filteredData = filteredData.filter(ps => ps.theme === filters.theme);
  }

  if (filters.organization && filters.organization !== 'all') {
    filteredData = filteredData.filter(ps => ps.organization === filters.organization);
  }

  if (filters.department && filters.department !== 'all') {
    filteredData = filteredData.filter(ps => ps.department === filters.department);
  }

  return filteredData;
};
