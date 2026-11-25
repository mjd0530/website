// Resume content. The /resume/ page and its PDF are both built from this file.
// Sources: the 2019 mikedemar.com resume, the LinkedIn profile, the Citrix-era PDF resume, and the case studies.

export interface Role {
  title: string;
  dates: string;
}

export interface Job {
  company: string;
  roles: Role[];
  points: string[];
}

export const headline = 'Lead UX Designer';

export const summary =
  "I design at the intersection of hardware, software, and AI. For 18 years I've taken products from early vision to ship, across consumer devices, enterprise software, and design systems. Today I lead a team of designers at Lenovo while staying hands-on in the work.";

export const experience: Job[] = [
  {
    company: 'Lenovo',
    roles: [{ title: 'Lead UX Designer', dates: 'Apr 2022 – Present' }],
    points: [
      'Lead a team of 5 designers, setting direction and raising the bar through design process, critique, workshops, hiring, mentoring, and culture.',
      'Drive Hello (HelloPC), the Lenovo design system, as its lead designer, and evangelize it across product teams. Recognized with a Circle of Excellence “Dream Team” Award and a VP Team Excellence Award for the One Lenovo Cake design language.',
      'Took Smart Share, a signature feature of Lenovo Aura Edition PCs, from vision to launch at IFA 2024 on 11 PCs, earning a Lenovo Corporate Team Excellence Award.',
      'Align product, engineering, and outside partners across the US, China, Japan, and Norway, presenting regularly to executive leadership. My UX specifications become the shared reference teams build from.',
      'Design hardware, software, and AI experiences across Lenovo’s PC portfolio, including Lenovo Vantage, Lenovo Device Orchestration, and Lenovo IT Assist (LITA).',
      'Build design-to-code workflows with Claude Code that take designs straight into working code.',
      'Championed the design organization’s move from Adobe XD to Figma.',
    ],
  },
  {
    company: 'Citrix',
    roles: [{ title: 'Senior Product Designer', dates: 'Jul 2018 – Apr 2022' }],
    points: [
      'Designed Citrix Workspace, the flagship product, from system models and vision concepts to prototypes and detailed features.',
      'Helped found the Citrix Design System and its team, owning tooling, process, and component documentation, and ran reviews with engineering to keep design and code in sync.',
    ],
  },
  {
    company: 'Bronto (acquired by Oracle)',
    roles: [{ title: 'Lead Product Designer', dates: 'Jul 2015 – Jul 2018' }],
    points: [
      'Led design on a cross-functional UX team serving several product teams, and built its process and culture through critiques, show-and-tells, and workshops.',
      'Led the UI redesign by building and evolving a living style guide, giving the platform and its apps one shared design language.',
    ],
  },
  {
    company: 'Teradata',
    roles: [{ title: 'UX Architect', dates: 'Mar 2014 – Jul 2015' }],
    points: [
      'Designed a suite of data products, delivering high-fidelity mockups and working prototypes to engineering, product, and QA, and running lean user tests to iterate quickly.',
    ],
  },
  {
    company: 'Medfusion',
    roles: [{ title: 'UI/UX Designer', dates: 'Sep 2013 – Mar 2014' }],
    points: [
      'Led design on the innovation and product management team, rapidly prototyping patient and provider web apps.',
    ],
  },
  {
    company: 'Intuit',
    roles: [{ title: 'Visual Designer', dates: 'Nov 2012 – Sep 2013' }],
    points: [
      'Designed patient portal websites for health care practices and prototyped lean experiments for future Intuit products.',
    ],
  },
];

export const earlier: { title: string; company: string; dates: string }[] = [
  { title: 'Web Designer', company: 'Everest Agency', dates: '2012' },
  { title: 'Web Designer', company: 'East Carolina University', dates: '2010 – 2012' },
  // TODO(mike): is Orchard UX still active? The Citrix-era PDF lists it as current.
  {
    title: 'Owner',
    company: 'Orchard UX, independent design consultancy',
    dates: '2008 – Present',
  },
];

export const patents = [
  { name: 'Workspace Logo Spinner', id: 'USD931898S1', year: '2021' },
  { name: 'Combination Date & Time Picker', id: 'USD924265S1', year: '2021' },
];

export const awards = [
  {
    name: 'Lenovo Corporate Award, Team Excellence',
    detail: 'Project Fuji / Aura experience',
    year: '2025',
  },
  {
    name: 'Circle of Excellence “Dream Team” Award',
    detail: 'Lenovo Group Operations · One Lenovo Cake Design System',
    year: '2024',
  },
  { name: 'VP Team Excellence Award', detail: 'Lenovo · Cake Design Language Team', year: '2024' },
  {
    name: 'One Lenovo Award',
    detail: 'Lenovo User Experience Design and Product Diversity Office',
    year: '2024',
  },
  { name: 'Team Excellence Award', detail: 'Lenovo Cloud and Software', year: '2023' },
  {
    name: 'Thought Leadership Award',
    detail: 'Lenovo User Experience Design and Product Diversity Office',
    year: '2023',
  },
  { name: 'Citrix All-Star Award', detail: 'Citrix Product Design Team', year: '2018' },
  {
    name: 'Intuit Spotlight Award, Drive for Results',
    detail: 'iPad consumer prototypes · L.E.A.D campaign designs',
    year: '2013',
  },
  {
    name: '1st Place, Interactive Design & Animation',
    detail: 'ECU School of Art Undergraduate Exhibition',
    year: '2008',
  },
];

export const education = {
  degree: 'BFA, Interactive Design and Animation',
  school: 'East Carolina University',
  year: '2008',
};

export const volunteer = {
  role: 'Volunteer, SuiteImpact Team',
  org: 'Urban Ministries of Durham',
  dates: '2016 – Present',
};

export const skills = [
  'Experience strategy',
  'AI experience design',
  'Interaction design',
  'Prototyping',
  'Design systems',
  'User research',
  'UX specifications',
  'Design leadership',
  'Mentoring',
  'Cross-functional leadership',
  'AI-assisted design to code',
  'Figma',
];

export const pdfPath = '/mike-demar-resume.pdf';
