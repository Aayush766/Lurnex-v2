export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Coding", href: "https://jrtinker.com/" },
  { label: "Locations", href: "/locations" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Forum", href: "/forum" },
  { label: "Blog", href: "/blog" }
];

export const courses: {
  title: string;
  href: string;
  image: string;
  alt: string;
  description: string;
  features: string[];
  badge?: string;
}[] = [
  {
    title: "IGCSE Curriculum",
    href: "/courses/igcse",
    image: "/assets/images/igcse.png",
    alt: "IGCSE curriculum program at Lurnex",
    description: "Cambridge-aligned tutoring that builds confident subject knowledge and exam technique.",
    features: ["Cambridge-Aligned", "Past-Paper Practice", "Personalised Support"]
  },
  {
    title: "IB Diploma",
    href: "/courses/ib",
    image: "/assets/images/ibdiploma.png",
    alt: "IB Diploma program at Lurnex",
    description: "Personalised support across IB subjects, assessments and Diploma guidance.",
    features: ["Experienced Mentors", "Project Guidance", "University Counselling"]
  },
  {
    title: "SAT Prep",
    href: "/courses/sat",
    image: "/assets/images/sat.png",
    alt: "SAT Preparation program at Lurnex",
    description: "Comprehensive coaching for global university admissions.",
    features: ["Concept Clarity", "Adaptive Practice", "Personalised Mentoring"]
  },
  {
    title: "Advanced Placement (AP)",
    href: "/courses/ap",
    image: "/assets/images/ap.png",
    alt: "Advanced Placement program at Lurnex",
    description: "University-level AP preparation for ambitious high-school students.",
    features: ["AP Exam Practice", "Expert Feedback", "Personalised Learning"]
  }
];

export const programs = ["SAT", "JEE", "NEET", "IB", "IGCSE", "CBSE"];

export const testimonials = [
  {
    category: "SAT",
    quote: "lurnex's personalised approach helped me improve my SAT score by 350 points. The mentors are incredible!",
    name: "Aisha Khan",
    location: "Dubai, UAE",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    category: "JEE",
    quote: "The faculty explains concepts so clearly. The mock tests and feedback really helped me crack JEE.",
    name: "Rohan Mehta",
    location: "New Delhi, India",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    category: "Learning Experience",
    quote: "Flexible timings and one-to-one mentoring made learning so easy from the US. Highly recommend lurnex!",
    name: "Sarah Williams",
    location: "New York, USA",
    avatar: "/avatars/avatar-3.jpg"
  },
  {
    category: "Learning Experience",
    quote: "What truly sets this institute apart is its warm and supportive team. The staff is exceptionally friendly, approachable, and accommodating, always going above and beyond to help students and parents. Their dedication, responsiveness, and commitment to providing a positive learning experience make the institute a trusted choice for quality education.",
    name: "Prisha Sahu",
    location: "USA",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    category: "IB",
    quote: "Lurnex's personalized approach to IB tutoring was a game-changer. My tutor understood my weaknesses and helped me turn them into strengths.",
    name: "Aisha Khan",
    location: "Dubai, UAE",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    category: "SAT",
    quote: "The SAT prep was intense but incredibly effective. The strategies I learned here were invaluable and helped me boost my score by 150 points!",
    name: "Johnathan Smith",
    location: "New York, USA",
    avatar: "/avatars/avatar-3.jpg"
  },
  {
    category: "JEE",
    quote: "Preparing for JEE with Lurnex felt like I had a personal coach. The flexible timings were perfect for my school schedule.",
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    category: "AP",
    quote: "The AP Calculus course was fantastic. My tutor broke down complex topics into understandable concepts. Highly recommended!",
    name: "Omar Al-Jamil",
    location: "Abu Dhabi, UAE",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    category: "IGCSE",
    quote: "The language support for IGCSE was beyond my expectations. I felt confident walking into my exams thanks to Lurnex.",
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    avatar: "/avatars/avatar-3.jpg"
  },
  {
    category: "IB",
    quote: "Lurnex helped me master the IB Physics syllabus. The one-on-one sessions were deeply insightful and tailored to my pace.",
    name: "Liam Chen",
    location: "Singapore",
    avatar: "/avatars/avatar-1.jpg"
  }
];

export const faqs = [
  ["What curriculum do you specialize in?", "We support JEE, NEET, SAT, IB, IGCSE, CBSE and personalised academic mentoring based on each learner's goals."],
  ["How are tutors selected?", "Tutors are selected for subject expertise, teaching experience, communication and their ability to support individual learning goals."],
  ["Can I get a trial class?", "Yes. You can request a trial or counselling session through the form on this page and our team can guide you through the next step."],
  ["How does flexible scheduling work?", "Sessions can be arranged around school, time-zone and learner availability, subject to tutor availability."],
  ["Do you provide study material?", "Learning plans can include structured resources, practice material, mock tests and feedback relevant to the selected program."],
  ["Which countries do you support?", "lurnex is designed for learners globally. Availability and scheduling depend on the program and tutor."],
];
