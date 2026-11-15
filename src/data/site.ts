// Site-wide navigation and links. One place to change what the header and footer show.

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Contact', href: '/contact/' },
];

// TODO(mike): add a public contact email if you want one listed.
export const profiles = {
  linkedin: 'https://www.linkedin.com/in/mikedemar/',
  dribbble: 'https://dribbble.com/mikedemar',
};

export const footerLinks = [
  { label: 'LinkedIn', href: profiles.linkedin },
  { label: 'Dribbble', href: profiles.dribbble },
  { label: 'Resume', href: '/resume/' },
];

// MDOS: the same portfolio as a retro desktop OS (repo mjd0530/mdos).
// TODO(mike): switch to https://os.mikedemar.com/ once its DNS is set up (MDOS D-013).
export const mdosUrl = 'https://mjd0530.github.io/mdos/';
