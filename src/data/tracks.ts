export const tracks = [
  { name: 'AI & Machine Learning', short: 'Intelligence for everyone', color: '#e5afbc', sdg: '4 · 8 · 9 · 10', desc: 'Intelligent systems that make knowledge, opportunity and services more accessible.' },
  { name: 'Internet of Things', short: 'A more connected Bharat', color: '#a7c8b1', sdg: '9 · 11 · 12', desc: 'Connect devices, communities and infrastructure through thoughtful sensing and data.' },
  { name: 'Healthcare & MedTech', short: 'Care without boundaries', color: '#efbb79', sdg: '3 · 5 · 10', desc: 'Bring better care closer to people with accessible, technology-driven health solutions.' },
  { name: 'Sustainability & Green Technology', short: 'Progress that lasts', color: '#9fbd98', sdg: '6 · 7 · 11 · 12 · 13', desc: 'Rethink energy, resources and our relationship with the environment.' },
  { name: 'Cybersecurity & Digital Trust', short: 'Trust in every connection', color: '#aab9df', sdg: '9 · 16', desc: 'Create safer systems and strengthen confidence in our digital future.' },
  { name: 'Automation', short: 'Work smarter. Build better.', color: '#e1b47f', sdg: '8 · 9 · 12', desc: 'Improve processes with responsible, practical automation.' },
  { name: 'FinTech', short: 'Opportunity within reach', color: '#b9c697', sdg: '1 · 8 · 9 · 10', desc: 'Accessible financial tools and inclusive economic participation.' },
  { name: 'Blockchain', short: 'Shared systems. Shared trust.', color: '#c0add9', sdg: '9 · 16', desc: 'Transparent, verifiable and accountable distributed systems.' },
  { name: 'Emerging Technologies', short: 'Beyond the horizon', color: '#ddae9a', sdg: '4 · 8 · 9 · 11', desc: 'An interdisciplinary idea that opens a new technological possibility.' },
];

export const trackNames = tracks.map(t => t.name);

export const criteria: readonly (readonly [string, number])[] = [
  ['Problem identification', 10],
  ['Innovation & originality', 20],
  ['Technical knowledge', 15],
  ['Methodology / proposed solution', 15],
  ['Feasibility', 10],
  ['UNSDG / social impact', 10],
  ['Presentation & communication', 10],
  ['Question & answer', 10],
] as const;

export const categories = ['PPG', 'PG', 'UG'] as const;
