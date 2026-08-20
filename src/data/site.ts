import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MapPin,
  Sprout,
  Users
} from "lucide-react";

export type Programme = {
  title: string;
  slug: string;
  audience: string;
  ageRange: string;
  summary: string;
  quote: string;
  description: string[];
  activities: string[];
  ctaLabel: string;
  registrationUrl: string;
  image: string;
  icon: LucideIcon;
};

export type EventItem = {
  title: string;
  slug: string;
  type: "camp" | "conference" | "festival" | "seminar" | "scheme";
  date: string;
  location: string;
  summary: string;
  sourcePath: string;
};

export type ContactPoint = {
  name: string;
  phone: string;
  href: string;
  note?: string;
};

export const site = {
  name: "Bahá'í Institute for Community Building",
  location: "Manchester",
  email: "communitybuildingmcr@gmail.com",
  instagram: "https://www.instagram.com/communitybuildingmcr/",
  safeguardingPolicy: "https://drive.google.com/file/d/1-iqRcKZmOFhA69kNanheF7I1wIt7mkWo/view?usp=sharing",
  ardwickCalendar: "https://drive.google.com/file/d/1nE40PTGjjzisacx5aUhUEci3T2kSk8zu/view?usp=drive_link",
  description:
    "Educational programmes for children, junior youth, youth, adults and families in Manchester, helping neighbours build vibrant communities together."
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Programmes", href: "/programmes" },
  { label: "Get Involved", href: "/get-involved" },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Holiday schemes", href: "/schemes" },
      { label: "Weekly activities", href: "/events#weekly-activities" },
      { label: "Residential camps", href: "/events#residential-camps" },
      { label: "Other events", href: "/events#other-events" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

export const registrationLinks = {
  children: "https://forms.gle/m8fReLLZ93tZmjwN8",
  juniorYouth: "https://forms.gle/m2uYPWbuJp1jiTUj6",
  youthVolunteers: "https://forms.gle/NGj3jW54GEzrmxCG8",
  adults: "https://forms.gle/CPJ57vyWbD3KuRqN7",
  schemes: "https://docs.google.com/forms/d/e/1FAIpQLScAKU1yTwxcOBjJslf3CEQ0P2o0VYh1MCUHcoN5m4qSLsBD2g/viewform",
  schemesVolunteer:
    "https://docs.google.com/forms/d/e/1FAIpQLSdToyHGbanQiKdI0HqYBIoZxaiUnzblUG7P33jWG-P4dDhKdQ/viewform?usp=send_form"
};

export const contactPoints: ContactPoint[] = [
  {
    name: "Ardwick",
    phone: "07858 236918",
    href: "tel:+447858236918"
  },
  {
    name: "Hulme",
    phone: "07425 159505",
    href: "tel:+447425159505"
  },
  {
    name: "Moss Side",
    phone: "07859 034984",
    href: "tel:+447859034984"
  },
  {
    name: "Gorton",
    phone: "07916 797677",
    href: "tel:+447916797677"
  }
];

export const programmes: Programme[] = [
  {
    title: "Children's Classes",
    slug: "children",
    audience: "Children",
    ageRange: "Ages 5-10",
    summary:
      "Spiritual education classes that nurture qualities such as love, joy, justice, truthfulness and generosity.",
    quote:
      "Children are the greatest treasure a community can possess, for in them are the promise and guarantee of the future.",
    description: [
      "Children's classes welcome children aged 5-10. Each lesson explores a spiritual quality and how it can be expressed in family and community life.",
      "Arts and crafts, songs, stories, prayers, memorisation and games make learning active and joyful. Classes are offered at no cost."
    ],
    activities: ["Arts and crafts", "Songs and prayers", "Storytelling", "Games", "Memorisation"],
    ctaLabel: "Register a child",
    registrationUrl: registrationLinks.children,
    image: "/images/children-classes.jpg",
    icon: Sprout
  },
  {
    title: "Junior Youth Groups",
    slug: "junior-youth",
    audience: "Junior youth",
    ageRange: "Ages 11-15",
    summary:
      "Groups that strengthen expression, spiritual perception, critical thinking and service to the local community.",
    quote:
      "At an age of promise, junior youth can develop the powers needed to work for the common good.",
    description: [
      "Junior youth groups help young people develop a twofold sense of purpose: growing intellectually, socially and spiritually while contributing to their community.",
      "With an older youth serving as a mentor, groups study stories, strengthen expression and critical thinking, consult together and carry out local service projects."
    ],
    activities: ["Study of inspiring texts", "Service projects", "Creative arts", "Consultation", "Family festivals"],
    ctaLabel: "Register a junior youth",
    registrationUrl: registrationLinks.juniorYouth,
    image: "/images/junior-youth-group.jpeg",
    icon: Users
  },
  {
    title: "Youth Mentors and Volunteers",
    slug: "youth",
    audience: "Youth",
    ageRange: "Ages 15-30",
    summary:
      "Training and accompaniment for youth who want to serve as teachers, mentors and facilitators.",
    quote:
      "Young people aspire for spiritual and intellectual growth and to make a contribution to the fortunes of humanity.",
    description: [
      "Youth can train to serve as children's class teachers, junior youth mentors and facilitators of spaces for their peers.",
      "Weekly study circles and residential camps combine spiritual insight with practical skills, helping friends see themselves as active contributors to community life."
    ],
    activities: ["Children's class teaching", "Junior youth mentoring", "Study circles", "Neighbourhood visits", "Peer spaces"],
    ctaLabel: "Volunteer as a youth",
    registrationUrl: registrationLinks.youthVolunteers,
    image: "/images/youth-training.jpg",
    icon: GraduationCap
  },
  {
    title: "Adult Volunteers and Training",
    slug: "adults",
    audience: "Adults and families",
    ageRange: "All ages welcome",
    summary:
      "Training for adults and families who want to support children, parents, prayer spaces and community life.",
    quote:
      "A process that seeks to raise capacity within a population to take charge of its own spiritual, social and intellectual development.",
    description: [
      "Adults and families play an essential role in community building. They can support parent gatherings, teach children's classes and host spaces for collective prayer.",
      "Weekly study circles and periodic family camps use Ruhi Institute materials to help friends gain the knowledge, qualities and practical skills needed to serve together."
    ],
    activities: ["Parent gatherings", "Children's classes", "Prayer spaces", "Family festivals", "Study circles"],
    ctaLabel: "Volunteer as an adult",
    registrationUrl: registrationLinks.adults,
    image: "/images/adult-volunteers.jpg",
    icon: HeartHandshake
  }
];

export const eventArchive: EventItem[] = [
  {
    title: "Residential Youth and Family Camp",
    slug: "residential-youth-and-family-camp-2025",
    type: "camp",
    date: "15-19 February 2025",
    location: "Great Longstone, Bakewell",
    summary:
      "A neighbourhood residential camp bringing youth and families together to build capacity for service, learning and community life.",
    sourcePath: "/event-details/residential-youth-and-family-camp-1/form"
  },
  {
    title: "Junior Youth Residential Camp",
    slug: "junior-youth-residential-camp-2024",
    type: "camp",
    date: "24-26 October 2024",
    location: "Haworth, Keighley",
    summary: "October half-term residential camp for junior youth groups.",
    sourcePath: "/event-details/junior-youth-residential-camp"
  },
  {
    title: "Residential Youth and Family Camp",
    slug: "youth-and-family-camp-2024",
    type: "camp",
    date: "19-26 August 2024",
    location: "Great Longstone, Bakewell",
    summary:
      "A summer training camp for youth and families exploring family life, community building and education.",
    sourcePath: "/event-details/youthandfamilycamp"
  },
  {
    title: "National Youth Conference",
    slug: "national-youth-conference-2024",
    type: "conference",
    date: "25-28 July 2024",
    location: "Yarnfield Park, Stone",
    summary:
      "A UK-wide gathering for youth reflecting on collective efforts to contribute to the betterment of communities.",
    sourcePath: "/event-details/youthconference2024"
  },
  {
    title: "Neighbourhood Seminar",
    slug: "neighbourhood-seminar-2024",
    type: "seminar",
    date: "12-14 July 2024",
    location: "Ardwick, Manchester",
    summary:
      "A space to study, consult, act and reflect together on community building efforts.",
    sourcePath: "/event-details/neighbourhoodseminar"
  },
  {
    title: "JY Graduates Residential Camp",
    slug: "jy-graduates-residential-camp-2024",
    type: "camp",
    date: "29 May-2 June 2024",
    location: "Haworth, Keighley",
    summary:
      "A residential camp for junior youth graduates exploring service and spiritual growth.",
    sourcePath: "/event-details/jygraduates-residentialcamp"
  },
  {
    title: "Ardwick Children's Festival",
    slug: "ardwick-childrens-festival-2024",
    type: "festival",
    date: "4 February 2024",
    location: "Ardwick, Manchester",
    summary:
      "A children's festival organised by members of the Junior Youth Programme in Ardwick.",
    sourcePath: "/event-details/ardwick-childrens-festival-1"
  },
  {
    title: "Residential Junior Youth Camp",
    slug: "residential-junior-youth-camp-2023",
    type: "camp",
    date: "27-29 October 2023",
    location: "Great Longstone, Bakewell",
    summary: "A residential camp for junior youth from groups across Manchester.",
    sourcePath: "/event-details/residential-junior-youth-camp-2"
  },
  {
    title: "Seminar to Empower Early Adolescents",
    slug: "seminar-to-empower-early-adolescents-2023",
    type: "seminar",
    date: "8-16 July 2023",
    location: "Moss Side, Manchester",
    summary: "A seminar focused on strengthening spaces for early adolescents.",
    sourcePath: "/event-details/seminar-to-empower-early-adolescents"
  },
  {
    title: "North of England Conference",
    slug: "north-of-england-conference-2022",
    type: "conference",
    date: "9-11 April 2022",
    location: "University of Salford",
    summary: "A regional conference connected with wider community building efforts.",
    sourcePath: "/event-details/north-of-england-conference"
  }
];

export const schemes = {
  title: "Summer Schemes",
  summary:
    "Holiday activities for children and teens aged 4-14, with workshops, arts, sports and service centred on making good choices and creating a beautiful environment.",
  image: "/images/summer-schemes.jpeg",
  locations: [
    {
      name: "Ardwick",
      dates: "15-17 August and 22-24 August",
      time: "2:00-5:30 PM",
      place: "Ida Kinsey Centre",
      contact: "07896 926953",
      whatsapp: "https://wa.me/447896926953"
    },
    {
      name: "Moss Side",
      dates: "Coming soon",
      time: "",
      place: "",
      contact: "",
      whatsapp: ""
    }
  ]
};

export const values = [
  {
    title: "Neighbourhood first",
    text: "Activities grow from relationships with children, youth, families and neighbours in local areas.",
    icon: MapPin
  },
  {
    title: "Learning through service",
    text: "Participants study, act, reflect and accompany one another as they build capacity together.",
    icon: BookOpen
  },
  {
    title: "Open to all",
    text: "People from all backgrounds are invited to contribute to the community building process.",
    icon: HandHeart
  },
  {
    title: "A rhythm of events",
    text: "Weekly activities are supported by camps, festivals, seminars and spaces for prayer and food.",
    icon: CalendarDays
  }
];
