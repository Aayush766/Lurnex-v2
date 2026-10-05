export type BlogSection = { heading: string; paragraphs: string[]; bullets?: string[]; quote?: string };
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ib-exam-preparation-plan",
    title: "How to prepare for IB exams with a plan that works",
    excerpt: "A practical guide to balancing subject review, active practice and the longer projects that make up the IB Diploma.",
    category: "IB Diploma",
    image: "/assets/images/ibdiploma.png",
    imageAlt: "Study materials for an IB Diploma learner",
    publishedAt: "2026-05-14",
    readingTime: "6 min read",
    author: "lurnex Academic Team",
    sections: [
      { heading: "Start with a clear picture of the workload", paragraphs: ["IB preparation brings together subject learning, internal assessments, the Extended Essay, Theory of Knowledge and CAS. Start by listing the dates and milestones you already know, then mark the subjects and assignments that need the most attention.", "A visible plan makes it easier to spot busy weeks early and spread the work out instead of relying on a last-minute push."] },
      { heading: "Turn revision into active practice", paragraphs: ["Reading notes can help you get oriented, but understanding becomes more reliable when you retrieve ideas and use them. After a short review, close the book and explain the concept in your own words, solve a problem or outline an essay response."], bullets: ["Use short topic goals for each study session.", "Mix practice questions with review of your mistakes.", "Return to difficult concepts over several days."] },
      { heading: "Make past-paper practice useful", paragraphs: ["Past papers are most helpful when you review the reasoning behind each answer. Note which knowledge or exam skill the question tests, where your approach changed, and what you want to try next time. Build up to timed practice once you feel confident with the topic."] },
      { heading: "Keep major projects moving", paragraphs: ["Break the Extended Essay and internal assessments into small milestones: question selection, research, first outline, draft and review. Book regular time for each step so longer assignments progress alongside subject revision.", "Ask a teacher or mentor for feedback at the points where it can change your direction, rather than waiting until the final draft."] },
      { heading: "Build a routine you can sustain", paragraphs: ["A useful study plan leaves room for sleep, school and breaks. Review it each week: keep what worked, adjust the sessions that did not, and choose a small number of priorities for the next seven days."] },
    ],
  },
  {
    slug: "sat-preparation-for-beginners",
    title: "A beginner’s guide to SAT preparation",
    excerpt: "Learn how to establish a baseline, practise the digital SAT skills and make steady progress without overloading your schedule.",
    category: "SAT",
    image: "/assets/images/sat.png",
    imageAlt: "Student preparing for the SAT",
    publishedAt: "2026-04-22",
    readingTime: "5 min read",
    author: "lurnex Academic Team",
    sections: [
      { heading: "Begin with a baseline", paragraphs: ["Before choosing a study plan, try a practice set or diagnostic test under realistic conditions. Use the results to see which Reading and Writing and Math skills feel comfortable, and which deserve more attention.", "Treat the score as a starting point. The useful information is the pattern behind it: topics missed, question types that take longer and the strategies you used."] },
      { heading: "Understand the skills you will practise", paragraphs: ["The digital SAT includes Reading and Writing and Math. Reading and Writing asks you to work with short passages and questions about information, craft, structure and expression. Math draws on algebra, advanced math, problem-solving, data analysis and geometry concepts."] },
      { heading: "Create a manageable weekly routine", paragraphs: ["Regular, focused practice is easier to sustain than occasional marathon sessions. Choose a few short blocks each week and give each one a clear purpose."], bullets: ["Review one skill or concept at a time.", "Practise a set of questions and check every answer.", "Keep an error log with the reason for each mistake.", "Revisit earlier topics so they stay fresh."] },
      { heading: "Learn from the questions you miss", paragraphs: ["For every incorrect or uncertain answer, identify what made it difficult. Was it a content gap, a misread detail or a rushed choice? Then solve a similar question and explain why the correct approach works.", "This turns each practice set into feedback for your next study session."] },
      { heading: "Use timed practice at the right moment", paragraphs: ["First build accuracy without rushing. As your skills improve, add timed sections so you can practise pacing and get familiar with the test experience. Leave time to review the questions that still feel uncertain."] },
    ],
  },
  {
    slug: "personalised-online-tutoring",
    title: "What makes online tutoring feel personal?",
    excerpt: "Good one-to-one learning is more than a video call. It starts with a learner’s goals and adapts as their confidence grows.",
    category: "Learning & Teaching",
    image: "/assets/images/herogirl.png",
    imageAlt: "Tutor supporting a student’s learning journey",
    publishedAt: "2026-03-09",
    readingTime: "4 min read",
    author: "lurnex Academic Team",
    sections: [
      { heading: "Begin with the learner, not the lesson plan", paragraphs: ["Students arrive with different strengths, questions and ambitions. A personal learning experience starts by finding out what a learner already understands, what they want to achieve and where they feel stuck.", "That conversation helps a tutor choose an appropriate starting point and make the lesson relevant to the student’s next step."] },
      { heading: "Make room for questions", paragraphs: ["In a one-to-one session, the pace can respond to the student. A tutor can pause to revisit a difficult idea, use a different example or give the learner time to explain their reasoning.", "Questions become part of the learning process, helping tutors see how a student is thinking rather than only whether an answer is right."] },
      { heading: "Practise, reflect and adjust", paragraphs: ["Understanding grows when learners use ideas for themselves. Practice helps reveal what is working, and reflection helps turn mistakes into useful information.", "A tutor can use that feedback to adjust what comes next: revisit a concept, increase the challenge or focus on a different skill."] },
      { heading: "Keep progress visible", paragraphs: ["Clear goals and regular check-ins help students and families understand what has improved and where attention should go next. Progress does not have to mean a single number; it can include confidence, stronger explanations or a more independent approach to problem-solving."] },
      { heading: "A supportive path forward", paragraphs: ["Personalised tutoring brings teaching, practice and feedback together around the learner. The result is a more considered way to build knowledge and confidence over time."] },
    ],
  },
];

export const blogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
