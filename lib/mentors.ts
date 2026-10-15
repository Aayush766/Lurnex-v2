export const mentors = [
  { name: "Raman Kumar Lal", subject: "Math & Science", college: "IIT Kharagpur", experience: "7 Years", image: "/assets/images/mentors/Ramam_Kumar_Lal.png", profileImage: "/assets/images/mentors/pop_up_raman.jpeg" },
  { name: "Santosh Kumar Nanda", subject: "Physics & Mathematics", college: "NIT Rourkela", experience: "15 Years", image: "/assets/images/mentors/Santosh_Kumar_Nanda.png", profileImage: "/assets/images/mentors/pop_up_santosh.jpeg" },
  { name: "Bhuvnesh Sir", subject: "Physics & Mathematics", college: "SVITS, Indore", experience: "12+ Years", image: "/assets/images/mentors/Bhuvnesh.png", profileImage: "/assets/images/mentors/pop_up_bhuvnesh.jpeg" },
  { name: "Chitranahi Upadhayay", subject: "Chemistry", college: "NIT Trichy", experience: "7 Years", image: "/assets/images/mentors/Chitranahi_Upadhayay.png", profileImage: "/assets/images/mentors/pop_up_chitranahi.jpeg" },
  { name: "Yogendra Kumar", subject: "Mathematics", college: "NIT Bhubaneswar", experience: "10+ Years", image: "/assets/images/mentors/Yogendra_Kumar.png", profileImage: "/assets/images/mentors/pop_up_yogendra.jpeg" },
] as const;

export const yogendraKumar = mentors.find((mentor) => mentor.name === "Yogendra Kumar")!;
