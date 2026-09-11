import type { JobRole, AnalysisResult, CandidateProfile } from '../types';

export const JOB_ROLES: JobRole[] = [
  'Full-Stack Web Developer',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'AI/Machine Learning Intern',
  'Data Science Associate',
  'Autonomous Systems Engineer',
  'Custom',
];

export const SAMPLE_JD: Record<JobRole, string> = {
  'Full-Stack Web Developer': `We are seeking a Full-Stack Web Developer to join our engineering team.
Requirements:
- Proficiency in React, TypeScript, and Node.js
- Experience with REST APIs and GraphQL
- Strong understanding of database systems (PostgreSQL, MongoDB)
- Knowledge of CI/CD pipelines and Docker
- Familiarity with AWS or cloud deployment
- Version control with Git and GitHub
- Unit testing with Jest and integration testing
- Responsive design and accessibility standards`,
  'Frontend Developer': `We are hiring a Frontend Developer to build delightful user interfaces.
Requirements:
- Expert-level proficiency in React, TypeScript, and modern JavaScript (ES6+)
- Strong CSS skills including Tailwind, Sass, and responsive design
- Experience with state management (Redux, Zustand, or Context API)
- Knowledge of accessibility (WCAG 2.1, ARIA) and SEO best practices
- Familiarity with Next.js or Remix for SSR/SSG
- Component libraries (Radix UI, shadcn/ui, or Material UI)
- Performance optimization (Core Web Vitals, lazy loading)
- Cross-browser compatibility and debugging`,
  'Backend Developer': `We are seeking a Backend Developer to design and maintain scalable APIs.
Requirements:
- Proficiency in Node.js, Python, or Go
- Experience with REST API design and GraphQL
- Strong database knowledge (PostgreSQL, MongoDB, Redis)
- Authentication and authorization (JWT, OAuth 2.0, session management)
- Message queues (RabbitMQ, Kafka, or Redis Streams)
- Microservices architecture and API gateway patterns
- Docker containerization and Kubernetes basics
- Unit and integration testing (Jest, PyTest, or Go testing)`,
  'DevOps Engineer': `We are hiring a DevOps Engineer to manage our cloud infrastructure.
Requirements:
- Experience with AWS, GCP, or Azure cloud platforms
- Infrastructure as Code (Terraform, CloudFormation, or Pulumi)
- CI/CD pipeline setup (GitHub Actions, GitLab CI, Jenkins)
- Container orchestration with Kubernetes and Docker
- Monitoring and logging (Prometheus, Grafana, ELK Stack)
- Linux administration and shell scripting
- Networking fundamentals (VPC, load balancing, DNS)
- Security best practices and compliance frameworks`,
  'AI/Machine Learning Intern': `We are hiring an AI/Machine Learning Intern to support our research team.
Requirements:
- Coursework or projects in Machine Learning, Deep Learning
- Proficiency in Python, TensorFlow, or PyTorch
- Experience with NLP and computer vision
- Understanding of neural networks and transformers
- Data preprocessing and feature engineering
- Familiarity with scikit-learn, pandas, NumPy
- Model evaluation, cross-validation, hyperparameter tuning
- Basic understanding of MLOps and model deployment`,
  'Data Science Associate': `We are seeking a Data Science Associate to analyze business datasets.
Requirements:
- Strong statistics and probability foundation
- Proficiency in Python (pandas, NumPy, Matplotlib)
- SQL and database querying
- Experience with Tableau or Power BI
- A/B testing and hypothesis testing
- Data visualization and storytelling
- Machine learning basics (regression, classification, clustering)
- Communication skills for stakeholder reporting`,
  'Autonomous Systems Engineer': `We are hiring an Autonomous Systems Engineer for robotics projects.
Requirements:
- Experience with ROS (Robot Operating System)
- C++ and Python programming
- Sensor fusion (LiDAR, camera, IMU)
- Path planning and SLAM algorithms
- Real-time systems and embedded development
- Computer vision for perception
- Control systems (PID, MPC)
- Familiarity with Gazebo or CARLA simulation`,
  Custom: '',
};

export const ANALYSIS_RESULTS: Record<JobRole, AnalysisResult> = {
  'Full-Stack Web Developer': {
    hrMatchScore: 78,
    metrics: [
      { label: 'Technical Keyword Matching', score: 82, description: 'Coverage of required tech stack terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 74, description: 'Evidence of practical builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 88, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 70, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Strong React and TypeScript project showcase with live links',
      'Clean section structure — easily parsed by ATS systems',
      'Quantified achievements in 2 of 5 experience bullets',
      'GitHub portfolio linked with 4 public repositories',
    ],
    skillGaps: [
      'No mention of CI/CD pipelines or Docker experience',
      'Missing cloud platform references (AWS, GCP, or Azure)',
      'GraphQL appears in the JD but is absent from the resume',
      'Testing experience not explicitly stated (Jest, Cypress)',
    ],
    missingKeywords: ['GraphQL', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Cypress'],
  },
  'Frontend Developer': {
    hrMatchScore: 84,
    metrics: [
      { label: 'Technical Keyword Matching', score: 88, description: 'Coverage of required frontend terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 82, description: 'Evidence of practical UI builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 86, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 78, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Strong React and TypeScript project showcase with live demos',
      'Tailwind CSS and responsive design clearly demonstrated',
      'Accessibility (WCAG, ARIA) mentioned in 2 project descriptions',
      'Performance optimization experience with Core Web Vitals',
    ],
    skillGaps: [
      'Next.js / SSR experience not explicitly mentioned',
      'State management library (Redux/Zustand) missing from resume',
      'Component library experience (Radix, shadcn) not listed',
      'SEO best practices not addressed in any project',
    ],
    missingKeywords: ['Next.js', 'Redux', 'Zustand', 'Radix UI', 'SSR', 'SEO'],
  },
  'Backend Developer': {
    hrMatchScore: 69,
    metrics: [
      { label: 'Technical Keyword Matching', score: 72, description: 'Coverage of required backend terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 65, description: 'Evidence of practical API builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 80, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 62, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Node.js and Python backend projects with documented APIs',
      'PostgreSQL and Redis experience clearly stated',
      'JWT authentication implemented in 2 projects',
      'REST API design with OpenAPI documentation',
    ],
    skillGaps: [
      'No microservices architecture experience mentioned',
      'Message queues (Kafka, RabbitMQ) not referenced',
      'Kubernetes not listed despite JD requirement',
      'Testing coverage not quantified (no Jest/PyTest metrics)',
    ],
    missingKeywords: ['Kafka', 'RabbitMQ', 'Kubernetes', 'GraphQL', 'Go', 'Microservices'],
  },
  'DevOps Engineer': {
    hrMatchScore: 61,
    metrics: [
      { label: 'Technical Keyword Matching', score: 64, description: 'Coverage of required DevOps terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 55, description: 'Evidence of practical infrastructure builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 78, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 58, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Docker containerization experience with multi-stage builds',
      'GitHub Actions CI/CD pipeline set up for 3 projects',
      'AWS EC2 and S3 deployment experience documented',
      'Linux administration fundamentals clearly stated',
    ],
    skillGaps: [
      'No Terraform or Infrastructure as Code experience',
      'Kubernetes orchestration not demonstrated',
      'Monitoring stack (Prometheus, Grafana) missing entirely',
      'No networking or security compliance experience listed',
    ],
    missingKeywords: ['Terraform', 'Kubernetes', 'Prometheus', 'Grafana', 'Pulumi', 'ELK'],
  },
  'AI/Machine Learning Intern': {
    hrMatchScore: 71,
    metrics: [
      { label: 'Technical Keyword Matching', score: 75, description: 'Coverage of required ML/AI terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 68, description: 'Evidence of practical model builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 84, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 66, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Python and TensorFlow projects with documented results',
      'Clear academic project section with model accuracy metrics',
      'Relevant coursework listed (Deep Learning, NLP)',
      'Kaggle competition participation shows initiative',
    ],
    skillGaps: [
      'No deployment or MLOps experience mentioned',
      'PyTorch not referenced despite JD preference',
      'Computer vision projects missing from portfolio',
      'Hyperparameter tuning not demonstrated in project descriptions',
    ],
    missingKeywords: ['PyTorch', 'MLOps', 'Computer Vision', 'Transformers', 'scikit-learn'],
  },
  'Data Science Associate': {
    hrMatchScore: 81,
    metrics: [
      { label: 'Technical Keyword Matching', score: 85, description: 'Coverage of required data science terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 79, description: 'Evidence of practical data projects vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 90, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 76, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Strong SQL and Python data analysis projects',
      'A/B testing experience clearly documented with outcomes',
      'Tableau dashboards linked in portfolio section',
      'Excellent statistical foundation with relevant coursework',
    ],
    skillGaps: [
      'Power BI not mentioned despite JD listing it as a plus',
      'Machine learning section could be stronger (clustering, classification)',
      'Stakeholder communication examples are vague',
      'No cloud data warehouse experience (BigQuery, Snowflake)',
    ],
    missingKeywords: ['Power BI', 'BigQuery', 'Snowflake', 'Clustering', 'Classification'],
  },
  'Autonomous Systems Engineer': {
    hrMatchScore: 65,
    metrics: [
      { label: 'Technical Keyword Matching', score: 68, description: 'Coverage of required robotics/autonomous systems terms', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 60, description: 'Evidence of practical robotics builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 80, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 62, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'C++ and Python proficiency clearly stated',
      'ROS experience documented with specific package usage',
      'Academic robotics project with sensor integration',
      'Strong fundamentals in control systems',
    ],
    skillGaps: [
      'No SLAM or path planning project evidence',
      'LiDAR sensor fusion not mentioned in any project',
      'Gazebo/CARLA simulation experience missing',
      'Embedded real-time systems not demonstrated',
    ],
    missingKeywords: ['SLAM', 'LiDAR', 'Gazebo', 'CARLA', 'Path Planning', 'MPC'],
  },
  Custom: {
    hrMatchScore: 73,
    metrics: [
      { label: 'Technical Keyword Matching', score: 76, description: 'Coverage of required terms from the job description', icon: 'Code2' },
      { label: 'Project Portfolio Strength', score: 70, description: 'Evidence of practical builds vs. coursework-only listings', icon: 'FolderGit2' },
      { label: 'Formatting & Readability', score: 82, description: 'ATS-friendly structure, section clarity, and parseability', icon: 'FileText' },
      { label: 'Action-Verb Strength', score: 64, description: 'Use of impactful action verbs in experience bullets', icon: 'Zap' },
    ],
    strengths: [
      'Relevant technical skills listed with proficiency levels',
      'Project section includes 3 practical builds with descriptions',
      'Education section aligns with target role requirements',
      'Clean, ATS-friendly formatting with standard section headers',
    ],
    skillGaps: [
      'Several JD keywords not found in resume content',
      'Quantified impact metrics missing from experience bullets',
      'No links to live project demos or repositories',
      'Soft skills section could be more targeted to the role',
    ],
    missingKeywords: ['Leadership', 'Agile', 'Stakeholder Management', 'Cloud'],
  },
};

export const CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: 'c1',
    name: 'Priya Sharma',
    title: 'Full-Stack Developer Graduate',
    avatarInitials: 'PS',
    avatarColor: 'bg-blue-500',
    resumeFileName: 'Priya_Sharma_Resume.pdf',
    resumeSize: 245760,
    targetRole: 'Full-Stack Web Developer',
    jobDescription: SAMPLE_JD['Full-Stack Web Developer'],
    result: ANALYSIS_RESULTS['Full-Stack Web Developer'],
  },
  {
    id: 'c2',
    name: 'Arjun Mehta',
    title: 'AI/ML Engineering Graduate',
    avatarInitials: 'AM',
    avatarColor: 'bg-emerald-500',
    resumeFileName: 'Arjun_Mehta_CV.pdf',
    resumeSize: 198400,
    targetRole: 'AI/Machine Learning Intern',
    jobDescription: SAMPLE_JD['AI/Machine Learning Intern'],
    result: ANALYSIS_RESULTS['AI/Machine Learning Intern'],
  },
  {
    id: 'c3',
    name: 'Sneha Reddy',
    title: 'Data Science Graduate',
    avatarInitials: 'SR',
    avatarColor: 'bg-amber-500',
    resumeFileName: 'Sneha_Reddy_Resume.pdf',
    resumeSize: 312320,
    targetRole: 'Data Science Associate',
    jobDescription: SAMPLE_JD['Data Science Associate'],
    result: ANALYSIS_RESULTS['Data Science Associate'],
  },
];
