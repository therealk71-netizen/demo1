const businessName = 'Super HVAC'
const tagline = '24/7 Emergency AC & Heating Repair'
const city = 'Las Vegas'
const emergencyPhone = {
  raw: '+17025550142',
  display: '(702) 555-0142',
} as const

export const siteConfig = {
  businessName,
  tagline,
  legalName: 'Super HVAC LLC',

  phone: {
    raw: '+17025550142',
    display: '(702) 555-0142',
  },
  emergencyPhone,
  email: 'dispatch@superhvac.com',

  address: '4120 W Sunset Rd, Suite 12',
  city,
  state: 'NV',
  zip: '89118',

  licenseNumber: '0089421',
  yearsInBusiness: 18,
  yearFounded: 2008,

  hours: {
    weekday: 'Mon–Sat, 7a–7p',
    weekend: '7 days a week',
    emergency: '24 / 7 / 365',
  },

  serviceAreas: [
    'Las Vegas',
    'Henderson',
    'North Las Vegas',
    'Summerlin',
    'Enterprise',
    'Paradise',
    'Spring Valley',
    'Green Valley',
    'Boulder City',
  ],

  services: [
    {
      name: 'Emergency AC repair',
      description:
        'Round-the-clock diagnosis and repair. Capacitors, contactors, blower motors, and coils on the truck.',
    },
    {
      name: 'System replacement',
      description:
        'Right-sized load calculation, permit handling, and same-week installs on high-SEER2 equipment.',
    },
    {
      name: 'Tune-ups & maintenance',
      description:
        '21-point seasonal service that catches the failures before a 110-degree Saturday does.',
    },
    {
      name: 'Ductwork & airflow',
      description:
        'Leak testing, sealing, and balancing so the back bedroom stops running eight degrees warmer.',
    },
    {
      name: 'Indoor air quality',
      description:
        'Media filtration, UV coils, and whole-home dehumidification for dust and monsoon season.',
    },
    {
      name: 'Heating & furnaces',
      description:
        'Gas furnace, heat pump, and rooftop package repair for the six weeks Vegas gets cold.',
    },
  ],

  // Leave a link empty to omit it from structured data.
  socialLinks: {
    facebook: '',
    instagram: '',
    google: '',
    yelp: '',
  },

  reviewCount: 1842,
  averageRating: 4.9,

  primaryCTA: 'Call 24/7',

  // Every shade on the site (hovers, tints, borders, dark mode) is derived
  // from these values, so editing a hex here recolors the whole site.
  colors: {
    primary: '#0b5fd0',
    primaryDark: '#094ba5',
    secondary: '#0b1b2b',
    accent: '#c2410c',
    background: '#f8fafc',
    surface: '#ffffff',
    textPrimary: '#0d1b2a',
    textMuted: '#536377',
  },

  seo: {
    title: `${businessName} — ${tagline} in ${city}`,
    description: `${businessName} dispatches licensed technicians across ${city} and Henderson 24/7. Average 47-minute arrival, flat-rate pricing, no overtime fees. Call ${emergencyPhone.display}.`,
    ogDescription: `Licensed, EPA-certified technicians on call around the clock. Average 47-minute arrival across the ${city} valley.`,
    ogImage: '/assets/hero-tools.jpg',
  },
} as const

export type SiteConfig = typeof siteConfig
