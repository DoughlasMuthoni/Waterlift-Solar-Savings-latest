export const BRAND = {
  primary: '#262161',
  accent: '#EF6922',
  white: '#FFFFFF',
};

export const TRUST_STATS = [
  { value: '60%–80%', label: 'Average Electricity Savings' },
  { value: '1,400+', label: 'Installations' },
  { value: '38', label: 'Counties Covered' },
  { value: 'Public & Private', label: 'Schools Served' },
  { value: 'Day & Boarding', label: 'School Types' },
  { value: 'Est. 2018', label: 'Years of Experience' },
];

export const VALUE_PROPS = [
  {
    icon: 'bi-cash-stack',
    iconBg: '#fff3eb',
    title: 'Zero Upfront Cost',
    description:
      'Your school pays nothing to start. No deposit, no bank loan, no procurement process. Waterlift Solar finances the entire installation and you begin saving from Month 1.',
    stat: 'KES 0',
    statLabel: 'to get started',
  },
  {
    icon: 'bi-piggy-bank',
    iconBg: '#eef0ff',
    title: '60%–80% Average Savings',
    description:
      'Most schools reduce their KPLC bill by 60%–80% from day one. Redirect those savings back into learning — books, desks, labs, and qualified teachers.',
    stat: '60%–80%',
    statLabel: 'bill reduction from day one',
  },
  {
    icon: 'bi-tools',
    iconBg: '#e8f4fd',
    title: 'All Maintenance Included',
    description:
      'Every repair, every replacement, every inspection is handled by our dedicated school maintenance team. You never pay a single shilling for upkeep.',
    stat: 'KES 0',
    statLabel: 'maintenance cost ever',
  },
  {
    icon: 'bi-phone',
    iconBg: '#f0fdf4',
    title: 'M-Pesa Monthly Payment',
    description:
      'Simple, familiar, automatic. Receive your M-Pesa payment request on the first of each month. No bank transfers, no cheques, no foreign currency.',
    stat: '1st of Month',
    statLabel: 'simple M-Pesa payment',
  },
  {
    icon: 'bi-activity',
    iconBg: '#fdf4e8',
    title: '24/7 System Monitoring',
    description:
      'Real-time performance data from our Nairobi operations centre. We identify faults before they affect your school and dispatch technicians proactively.',
    stat: '24/7',
    statLabel: 'live monitoring from Nairobi',
  },
  {
    icon: 'bi-building-check',
    iconBg: '#f5f0ff',
    title: 'Own Your System in 36–60 Months',
    description:
      'With our Rent-to-Own model, your school owns a fully paid-for solar asset at the end of the agreement. A permanent infrastructure investment for your institution.',
    stat: '36–60 Months',
    statLabel: 'to full ownership',
  },
];

export const PROBLEM_POINTS = [
  {
    icon: 'bi-receipt',
    title: 'KPLC Bills Consuming School Fee Revenue',
    description: 'Most Kenyan schools spend 15–25% of fee revenue on electricity — money that should fund teachers, textbooks, and facilities.',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Kenya Power Outages Disrupting Education',
    description: 'Blackouts during lessons, national exams, computer labs, and boarding evenings cost your school learning time and credibility.',
  },
  {
    icon: 'bi-fuel-pump',
    title: 'Diesel Generators: KSh 80–120 Per Hour',
    description: 'The generator is expensive, noisy, polluting, and unreliable — yet your school runs it 40+ hours a month just for basic operations.',
  },
  {
    icon: 'bi-question-circle',
    title: 'Choosing Between Electricity and Education',
    description: 'No principal should choose between paying the KPLC bill and buying textbooks. No board should debate keeping the lights on or hiring a teacher.',
  },
  {
    icon: 'bi-house-door',
    title: 'Boarding Schools: Cold Kitchens, Dark Dormitories',
    description: "Boarding parents pay premium fees expecting hot meals and safe dormitories. Outages destroy that promise — and your school's reputation.",
  },
  {
    icon: 'bi-laptop',
    title: 'CBC Digital Literacy Under Threat',
    description: "Kenya's CBC curriculum demands consistent computer lab access. Without reliable power, your school cannot deliver what the curriculum requires.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 'Step 01',
    icon: 'bi-clipboard2-check',
    title: 'Free School Energy Audit',
    description:
      'Our specialist visits your campus, assesses your load profile, measures your roof, and analyses your last 12 months of KPLC bills — at zero cost to your school.',
  },
  {
    step: 'Step 02',
    icon: 'bi-rulers',
    title: 'Custom System Design',
    description:
      'We design a solar system sized precisely for your school — classrooms, computer labs, kitchen, dormitories, water pumps, security lighting, and admin block.',
  },
  {
    step: 'Step 03',
    icon: 'bi-wrench-adjustable',
    title: 'Professional Installation',
    description:
      'EPRA-licensed installation completed in 5–10 working days. All work is scheduled during school holidays or weekends — zero disruption to lessons or exams.',
  },
  {
    step: 'Step 04',
    icon: 'bi-graph-up',
    title: 'Savings from Day One',
    description:
      'Your system goes live and your KPLC bill collapses immediately. Access your live monitoring dashboard, pay monthly via M-Pesa, and watch savings accumulate.',
  },
];

export const PLANS = [
  {
    id: 'rent-to-own',
    name: 'Rent-to-Own',
    badge: 'Most Popular',
    popular: true,
    tagline: 'Your school owns the asset. Best for long-term infrastructure investment.',
    features: [
      'Fixed monthly payment lower than your current KPLC bill',
      'All maintenance included for the full contract life',
      'School owns the solar system outright after 36–60 months',
      'Zero ongoing cost after ownership transfer',
      'Live monitoring dashboard for your school admin',
      'M-Pesa monthly payment — simple and automatic',
    ],
    note: 'Minimum 3-month contract',
  },
  {
    id: 'rent-only',
    name: 'Rent-Only',
    badge: 'Zero Capital',
    popular: false,
    tagline: 'Waterlift maintains the system forever. Best for zero capital responsibility.',
    features: [
      'Lower monthly payment than Rent-to-Own',
      'All maintenance included permanently — forever',
      'Waterlift owns, monitors, and maintains indefinitely',
      'Zero capital responsibility for your school board',
      'Zero maintenance burden — ever',
      'M-Pesa monthly payment — simple and automatic',
    ],
    note: 'Minimum 3-month contract',
  },
];

export const SCHOOL_TYPES = [
  {
    icon: 'bi-building',
    title: 'Private Day Schools',
    description:
      'Reduce overhead costs and protect your fee competitiveness against rival schools. Modernise your campus with reliable, silent solar power. Redirect savings into facilities, technology, and staff that attract and retain students.',
  },
  {
    icon: 'bi-moon-stars',
    title: 'Private Boarding Schools',
    description:
      'Power dormitories, kitchens, water heating, laundry, and security lighting around the clock. Deliver the 24/7 reliability that boarding parents pay for. Eliminate cold showers, dark dormitories, and generator noise permanently.',
  },
  {
    icon: 'bi-mortarboard',
    title: 'Public Day Schools',
    description:
      'Stretch your capitation grant further than ever before. Redirect KPLC savings directly to books, desks, laboratory equipment, and teacher training. Show parents and County Directors of Education that your school is forward-thinking.',
  },
  {
    icon: 'bi-stars',
    title: 'Public Boarding Schools',
    description:
      'Eliminate diesel generator dependency completely. Clean, silent, reliable solar power around the clock — at a cost lower than what you currently pay KPLC and fuel combined. Our Rent-Only model is designed for institutions with zero capital budgets.',
  },
];

export const WHY_WATERLIFT = [
  {
    icon: 'bi-geo-alt',
    title: 'Built for Kenya — 38 Counties Served',
    description:
      '1,400+ installations across 38 counties from Turkana to Mombasa. Local technicians based in your region. Nairobi headquarters and Nanyuki branch for fast response times across Central Kenya, the Rift Valley, and northern counties.',
  },
  {
    icon: 'bi-wrench-adjustable-circle',
    title: 'School-Specific Engineering',
    description:
      'We design for classroom lighting, computer lab UPS loads, industrial kitchen equipment, dormitory water heating, borehole pumps, and security systems — not just household appliances. Every system is custom-engineered for your specific load profile.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Zero Disruption to Learning',
    description:
      'Every installation is scheduled during school holidays, half-term breaks, or weekends. Our crews are trained to work within active school environments. No lessons disrupted, no exams affected, no parents inconvenienced.',
  },
  {
    icon: 'bi-patch-check',
    title: 'EPRA Licensed & Fully Compliant',
    description:
      'Fully licensed by the Energy and Petroleum Regulatory Authority of Kenya (EPRA). Every installation meets Kenya Bureau of Standards (KEBS) requirements. We provide your school board with a complete compliance documentation package.',
  },
];

export const WHY_SOLAR = [
  {
    title: 'Increase savings on electricity bills',
    description: 'Save on power, every month, and even more over time. Most schools cut their KPLC bill by 55–65% from day one.',
    image: 'why_solar_card_1.png',
  },
  {
    title: 'Rely less on the grid & more on the sun',
    description: 'Move away from the rising prices and unreliability of the grid. Generate your own clean power every day.',
    image: 'why_solar_card_2.png',
  },
  {
    title: 'Get protected from outages',
    description: 'Battery backup keeps you powered at night or during power cuts. No more disrupted lessons or dark dormitories.',
    image: 'why_solar_card_3.png',
  },
  {
    title: 'Access sustainable energy',
    description: "Know that you're doing your bit for your environment. Clean solar power for a better Kenya and a better future.",
    image: 'why_solar_card_4.png',
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Our monthly KPLC bill dropped from KSh 87,000 to KSh 31,000. Our computer lab now runs all day without interruption. CBC digital literacy lessons have transformed since we stopped suffering power cuts. We eliminated our diesel generator completely.',
    author: 'Mrs. Wanjiku Kamau',
    role: 'Principal',
    school: 'Greenfields Academy, Kiambu County',
    type: 'Private Boarding',
    students: '680 Students',
    system: '25kW System',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The boarding parents at our secondary school used to complain constantly about cold showers and dark dormitories. Since Waterlift installed our system during the August holidays, we have not run our generator once. We save over KSh 1.2 million per year across our campuses.',
    author: 'Mr. David Ochieng',
    role: 'Director',
    school: 'Lakeview Schools Group, Kisumu County',
    type: 'Private Day (3 Campuses)',
    students: '',
    system: '40kW Combined',
    rating: 5,
  },
  {
    id: 3,
    quote:
      "As a public school, we were spending 20% of our capitation grant on KPLC bills and diesel. Waterlift's Rent-Only model means we pay nothing for maintenance. The savings go directly to laboratory equipment and CBC learning materials.",
    author: 'Mrs. Grace Mutua',
    role: 'Deputy Principal',
    school: 'Machakos Girls High School, Machakos County',
    type: 'Public Boarding',
    students: '800 Students',
    system: '30kW System',
    rating: 5,
  },
];

export const FALLBACK_FAQS = [
  {
    id: 1,
    question: 'How much does a solar system cost for our school?',
    answer:
      'With our Rent-to-Own and Rent-Only plans, your school pays zero upfront. You pay a fixed monthly amount that is lower than your current KPLC bill — so you save from Month 1. For schools that prefer outright purchase, we provide custom quotes based on your load profile.',
  },
  {
    id: 2,
    question: 'How long does installation take, and will it disrupt our school?',
    answer:
      'Installation typically takes 5–10 working days. We schedule all work during school holidays, half-term breaks, or weekends. Our crews are trained to work within school environments — no lessons are disrupted, no exams are affected.',
  },
  {
    id: 3,
    question: 'What happens at night or on cloudy days?',
    answer:
      "Every Waterlift system includes battery storage sized for your school's overnight needs. On cloudy days, the battery bank provides backup. For extended cloudy periods, the system automatically draws from KPLC as a secondary source — so you are never left without power.",
  },
  {
    id: 4,
    question: 'Do we need to do anything with Kenya Power (KPLC)?',
    answer:
      'No — Waterlift handles all KPLC paperwork, net metering applications, and EPRA compliance documentation. You will receive a complete compliance package for your school board. Your only responsibility is to provide us with 12 months of recent KPLC bills during the audit.',
  },
  {
    id: 5,
    question: 'What maintenance is required, and who pays for it?',
    answer:
      'Zero maintenance cost to your school — ever. All inspections, cleaning, panel replacements, inverter servicing, and battery maintenance are included in your monthly payment. Our dedicated school maintenance team handles everything. You call us; we come.',
  },
  {
    id: 6,
    question: 'Can Waterlift Solar power our borehole pump and water system?',
    answer:
      'Yes — borehole pump integration is one of our core specialties. We design your solar system to handle borehole motors, water storage pumps, pressure systems, and water heating. Many of our 1,400+ school installations include full water infrastructure alongside solar generation.',
  },
  {
    id: 7,
    question: 'What is the difference between Rent-to-Own and Rent-Only?',
    answer:
      "With Rent-to-Own, your school owns the solar system outright after 36–60 months — a permanent infrastructure asset. With Rent-Only, Waterlift owns and maintains the system indefinitely at a lower monthly fee with zero capital responsibility. Both plans include zero upfront cost and full maintenance.",
  },
  {
    id: 8,
    question: 'Is Waterlift Solar licensed and compliant?',
    answer:
      'Yes. Waterlift Solar is fully licensed by the Energy and Petroleum Regulatory Authority of Kenya (EPRA). Every installation meets Kenya Bureau of Standards (KEBS) requirements. We provide your school board with a complete compliance documentation package.',
  },
];

export const CONTACT = {
  phone: '+254 768 117 070',
  email: 'info@waterlift.co.ke',
  address: 'Kenafric Business Park Godown B13, Baba Dogo, Nairobi 00603, Kenya',
  addressBranch: 'Waterlift Building, Opposite Trendz Lounge, Along Nyeri-Nanyuki Highway, Nanyuki, Laikipia 10400, Kenya',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '254768117070',
  responseTime: 'Within 24 hours, Monday to Saturday',
  website: 'waterliftsolarsavings.africa',
  company: 'Waterlift Solar Limited',
};
