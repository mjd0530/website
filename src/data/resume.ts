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
  "I design at the intersection of hardware, software, and AI. At Lenovo I lead a team of designers while staying hands-on in the work, from early vision and concepts through shipped products. I've been designing products since 2008, across consumer devices, enterprise software, and design systems.";

export const experience: Job[] = [
  {
    company: 'Lenovo',
    roles: [{ title: 'Lead UX Designer', dates: 'Apr 2022 – Present' }],
    points: [
      'Led the design team behind Smart Share, a cross-platform experience that connects phones and PCs with a tap, from vision and rough concepts to launch at IFA 2024 on 11 Lenovo Aura Edition PCs. The tap later carried into Lenovo Smart Connect as Tap to Launch.',
      'Smart Share scored 86 on the System Usability Scale in an owner study of 1,484 people. 80–88% of repeat launches came from the tap, and about 70% of active users engaged with it weekly.',
      // TODO(mike): say what your part was in the Figma move and the Cake design system.
      'Helped move the UX design organization from Adobe XD to Figma and kick off its design system.',
      // TODO(mike): add a line on Vantage once that case study is written.
    ],
  },
  {
    company: 'Citrix',
    roles: [{ title: 'Senior Product Designer', dates: 'Jul 2018 – Apr 2022' }],
    points: [
      'Designed for Citrix Workspace, the flagship product, with designers, engineers, and product managers: system models, vision concepts, prototypes, and detailed product features.',
      'Helped establish the Citrix Design System and its team, focused on tooling, team process, and component design and documentation. Ran design system reviews with engineering to keep design and code in sync.',
      'Named inventor on two US design patents for Workspace.',
    ],
  },
  {
    company: 'Oracle + Bronto',
    roles: [{ title: 'Lead Product Designer', dates: 'Jul 2015 – Jul 2018' }],
    points: [
      'Lead designer on a cross-functional UX team serving several product teams. Built design team process and culture through critiques, show-and-tells, and workshops.',
      'Led the UI redesign by building and evolving a living style guide, giving the platform and its apps one shared design language.',
    ],
  },
  {
    company: 'Teradata',
    roles: [{ title: 'UX Architect', dates: 'Mar 2014 – Jul 2015' }],
    points: [
      'Visual and interaction design for a suite of data products, with high-fidelity mockups and working prototypes for engineering, product, and QA. Ran lean user tests to iterate quickly on flows and wireframes.',
    ],
  },
  {
    company: 'Medfusion',
    roles: [{ title: 'UI/UX Designer', dates: 'Sep 2013 – Mar 2014' }],
    points: [
      'Lead designer on the innovation and product management team, rapidly prototyping patient and provider web apps.',
    ],
  },
  {
    company: 'Intuit',
    roles: [{ title: 'Visual Designer', dates: 'Nov 2012 – Sep 2013' }],
    points: [
      'Designed patient portal websites for health care practices on the XD team, and prototyped lean experiments for future Intuit products. Three Spotlight Awards for Drive for Results.',
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
    detail: 'Project Fuji Aura experience',
    year: 'FY24/25',
  },
  // TODO(mike): confirm the year (LinkedIn post is about 2023).
  { name: 'Thought Leadership Award', detail: 'Lenovo User Experience Design', year: '2023' },
  { name: 'Citrix All-Star Award', detail: 'Citrix', year: '2018' },
  { name: 'Intuit Spotlight Award, Drive for Results', detail: 'Three awards', year: '2013' },
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
  'Interaction design',
  'Prototyping',
  'Design systems',
  'User research',
  'UX specifications',
  'Cross-functional leadership',
  'Figma',
];

export const pdfPath = '/mike-demar-resume.pdf';
