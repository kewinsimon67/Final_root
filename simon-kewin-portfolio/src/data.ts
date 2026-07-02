export interface Project {
  id: string;
  title: string;
  category: string;
  domain?: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: string;
  problem: string;
  solution: string;
  process: string;
  outcome: string;
  image: string;
  github?: string;
  demo?: string;
  lessonsLearned: string;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  description: string;
  proficiency: number; // 0 to 100
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: string | number;
  suffix: string;
  description: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "lead-ledger",
    title: "Lead Ledger",
    category: "Product & AI Automation",
    description: "An automated intelligent lead capture and dynamic scoring platform that scales outbound pipeline by 400% through autonomous agent workflows.",
    longDescription: "Lead Ledger is an enterprise-grade AI agent designed to revolutionize how sales organizations discover, qualify, and engage prospects. By chaining multiple LLM nodes with background web enrichment tools, the platform automatically scrapes incoming signups, extracts professional data, scores them on dynamic criteria, and generates tailored first-touch outreach templates.",
    technologies: ["React", "TypeScript", "Node.js", "OpenAI", "Zapier", "n8n"],
    metrics: "400% Pipeline Increase",
    problem: "Sales representatives spend over 35% of their working hours manually researching leads, cross-referencing LinkedIn profiles, and guessing user intent. This delay in outreach lowers close rates and results in massive pipeline friction.",
    solution: "I engineered a serverless workflow that triggers immediately upon form submission. The system queries professional APIs, performs real-time semantic analysis on the lead's company size, funding round, and tech stack, assigns a scoring tier, and publishes the intelligence directly into Slack and CRM systems within 60 seconds.",
    process: "Designed a minimalist React interface for real-time lead monitoring. Created robust backend microservices that leverage parallel promise execution to query LinkedIn, Clearbit, and Crunchbase APIs simultaneously, passing the enriched object to Google Gemini for hyper-targeted copy generation.",
    outcome: "Successfully integrated at 5 high-growth B2B startups, automating the scoring of 25,000+ leads, creating $1.2M in qualified pipeline, and shortening outbound response times from 18 hours to 4 minutes.",
    lessonsLearned: "Handling high-volume API rate limiting requires resilient queue implementations. Moving from immediate API execution to a Redis-backed queue system dramatically improved overall platform stability.",
    image: "https://lh3.googleusercontent.com/d/1R1nAdzveDWUSLO0g4w9rDQZMQA5oMQ5V"
  },
  {
    id: "idea-forge",
    title: "Idea Forge",
    category: "AI Product Builder",
    description: "A collaborative canvas workspace that takes raw text notes and transforms them into interactive product roadmaps, wireframes, and PRDs using generative AI.",
    longDescription: "Idea Forge is a revolutionary workspace built for product teams. It acts as an AI-powered co-creator that bridges the gap between unstructured brainstorming sessions and high-fidelity product blueprints. From raw sticky notes, the platform autonomously formats user flows, writes standard PRDs, and builds mock schemas in real time.",
    technologies: ["React", "Tailwind CSS", "Gemini API", "Supabase", "Figma API"],
    metrics: "12,000+ Active Users",
    problem: "Translating whiteboards and meeting transcriptions into concrete product requirement documents (PRDs) and Jira tickets is a repetitive, time-consuming process that often introduces scope creep and miscommunications.",
    solution: "I developed an infinite canvas UI that supports rich text, media, and sticky notes. By feeding the canvas state vector to my custom-prompted Gemini model, I allow users to click a single button to synthesize a full PRD, build sequence diagrams, or even generate functional frontend wireframe code.",
    process: "Built a fully custom canvas rendering architecture in React to handle drag-and-drop, connection lines, and rich text editors. Leveraged server-side Gemini function calling to structured-output JSON specifications directly matching standard product roadmap schemas.",
    outcome: "Featured as Product of the Day on Product Hunt with a 4.8/5 rating. Over 30,000 PRDs have been generated, and the platform was acquired by a major productivity suite within 12 months.",
    lessonsLearned: "Generating high-fidelity structural data requires strictly controlled LLM output. Utilizing JSON schema constraints inside the Gemini SDK was a major game changer, preventing formatting errors.",
    image: "https://picsum.photos/seed/ideaforge/800/600"
  },
  {
    id: "automatescale-core",
    title: "Performance marketing strategy",
    category: "Business Plan",
    description: "Enterprise-grade workflow engine connecting legacy CRMs to modern AI models, processing over 10M operations monthly with zero-downtime reliability.",
    longDescription: "AutomateScale Core is a robust infrastructure solution that integrates legacy database layers with cutting-edge AI processing queues. Built for mid-market clients, it abstracts complex API calls into simple automation templates that run reliably at scale with complete transaction safety.",
    technologies: ["Python", "FastAPI", "n8n", "Docker", "Google Cloud", "PostgreSQL"],
    metrics: "10M+ Monthly Operations",
    problem: "Enterprise departments use disjointed software packages that do not talk to each other. Custom-built point-to-point scripts are brittle, lack proper logging, and break on minor API updates.",
    solution: "I designed a unified pipeline layer with built-in retry-policies, transaction monitoring, and centralized alert logs. Every message is parsed, normalized, and securely routed to destination webhooks or database tables with full end-to-end encryption.",
    process: "Configured self-hosted n8n workflows backed by Redis queues. Wrapped execution points in high-performance FastAPI microservices and deployed the entire containerized stack using Google Cloud Run to enable automatic scale-to-zero operations.",
    outcome: "Reduced manual data reconciliation times by 95% across partner firms, saving departments an average of 42 hours per week and achieving an estimated annual operational saving of $300,000.",
    lessonsLearned: "When designing high-throughput API webhooks, non-blocking asynchronous task execution is vital. Delegating payload receipt to lightweight workers while processing heavy AI operations asynchronously in the background prevented API timeouts.",
    image: "https://lh3.googleusercontent.com/d/1NA0LlPE58LaOcmYD-I1qSu4kY7PIsUjA"
  },
  {
    id: "revengine-dashboard",
    title: "GoNautika",
    category: "Freelance project",
    domain: "Tours/Travels",
    description: "Real-time revenue operations dashboard blending multi-channel ad spend, attribution, and LTV models to optimize performance marketing budgets.",
    longDescription: "GoNautika is a premium travel and tourism company operating luxury high-speed catamarans across the Andaman Islands, offering seamless island connectivity through world-class ferry services and a customer-first travel experience.",
    technologies: ["content Ideation", "SEO", "Backlinking", "Whatsapp marketing"],
    metrics: "12% social media growth in 2 months",
    problem: "Creative fatigue and inconsistent content ideation were limiting campaign performance and social media growth. The brand also required support in building its SEO presence through backlinking, keyword optimization, and technical SEO best practices.",
    solution: "Provided strategic content ideation by recommending campaign concepts, creative references, and messaging directions for different marketing objectives. Helped the team communicate the brand's value more effectively while supporting social media growth and campaign performance.",
    process: "Used Recharts to build complex responsive multi-layer area charts, chord diagrams for channel overlaps, and scatter plots for cohort analysis. The backend periodically pulls advertising spend via cron jobs and loads it into Google BigQuery for rapid queries.",
    outcome: "Empowered growth marketing leads to reallocate underperforming spend in real-time, resulting in an average 35% improvement in marketing return on investment and saving clients millions in wasted ad spend.",
    lessonsLearned: "Visualizing massive data sets in the browser can easily degrade UI framerates. Implementing canvas-based rendering for complex multi-thousand node data paths and memoizing React component trees kept the application operating at 60 FPS.",
    image: "https://lh3.googleusercontent.com/d/1lWQqZUo2BxJ-QQDedZ8o0vbeCCX--f_A"
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    id: "growth-perf",
    title: "Growth & Performance Marketing",
    category: "performance",
    description: "Meta Ads, Google Ads (Search & Local), PPC, Retargeting, ROAS Optimization",
    proficiency: 95
  },
  {
    id: "conversion-life",
    title: "Conversion & Lifecycle",
    category: "conversion",
    description: "CRO, A/B Testing, Landing-Page Optimization, Email & Lifecycle, eCommerce",
    proficiency: 92
  },
  {
    id: "organic-growth",
    title: "Organic & Offline Growth",
    category: "organic",
    description: "Instagram & Organic Social, Webinars, Community Events, Workshops, Partnerships",
    proficiency: 88
  },
  {
    id: "team-lead",
    title: "Team Leadership & Coordination",
    category: "leadership",
    description: "Team Management & Mentoring, Agency / Freelancer & Vendor Coordination, SOPs & Reporting",
    proficiency: 90
  },
  {
    id: "analytics-tools",
    title: "Analytics & Tools",
    category: "analytics",
    description: "GA4, MIS Reporting, HubSpot, Zapier, Meta Business Suite, Excel, Figma, Canva, Notion",
    proficiency: 94
  }
];

export const TECH_STACK_DATA = [
  { name: "Zapier", category: "Automation", url: "https://cdn.simpleicons.org/zapier" },
  { name: "GitHub", category: "DevOps", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "OpenAI", category: "AI Models", url: "https://cdn.simpleicons.org/openai" },
  { name: "Google Gemini", category: "AI Models", iconType: "gemini" },
  { name: "Google Cloud", category: "Cloud & Ops", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Figma", category: "Design", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Meta Ads Manager", category: "Paid Ads", url: "https://cdn.simpleicons.org/meta" },
  { name: "Google Analytics", category: "Analytics", url: "https://cdn.simpleicons.org/googleanalytics" },
  { name: "Claude Code", category: "AI Code Agents", iconType: "claudecode" },
  { name: "Claude", category: "AI Models", url: "https://cdn.simpleicons.org/anthropic" },
  { name: "Grok", category: "AI Models", iconType: "grok" },
  { name: "Aisensy", category: "WhatsApp Marketing", url: "https://cdn.simpleicons.org/whatsapp" },
  { name: "Perplexity", category: "AI Models", url: "https://cdn.simpleicons.org/perplexity" },
  { name: "Notion", category: "Productivity", url: "https://cdn.simpleicons.org/notion" }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-1",
    company: "ApexFlow Automations",
    role: "Lead Product & Automation Architect",
    duration: "2024 - Present",
    responsibilities: [
      "Direct technical product development and integration maps, bridging core company systems with AI workflows for Series A and B clients.",
      "Architect and deploy complex autonomous lead-enrichment agents, dynamic email auto-responders, and unified billing synchronization tunnels.",
      "Lead a nimble team of 3 engineers, maintaining strict codebase standards, thorough linting, and rapid deployment cycles."
    ],
    achievements: [
      "Slashed client operations overhead by an average of 38% through custom n8n systems and LLM function-calling middleware.",
      "Engineered a scalable multi-tenant CRM automation system processing 10M+ automated operations monthly with 99.99% uptime.",
      "Integrated Google Workspace, HubSpot, Stripe, and custom models to create real-time dashboard trackers for management."
    ],
    technologies: ["Node.js", "n8n", "React", "Gemini API", "PostgreSQL", "Google Cloud", "Docker"]
  },
  {
    id: "exp-2",
    company: "Symmetric Growth Labs",
    role: "Senior Growth & MarTech Engineer",
    duration: "2022 - 2024",
    responsibilities: [
      "Designed and engineered high-performance marketing tunnels, custom attribution trackers, and automated client onboarding systems.",
      "Pioneered programmatic SEO templates and automated content generation workflows resulting in exponential organic traffic growth.",
      "Developed interactive BI reports and dashboards leveraging warehouse databases to inform multi-million dollar ad spend allocation."
    ],
    achievements: [
      "Boosted performance marketing ROI by 35% across portfolio companies through precise multi-touch attribution dashboard modeling.",
      "Built an automated LinkedIn and email outreach system that generated $80k/month in net new pipeline within its first quarter.",
      "Automated over 120 internal and client workflows, completely eliminating manual lead copying and data mismatch errors."
    ],
    technologies: ["React", "Python", "FastAPI", "BigQuery", "Zapier", "HubSpot API", "Google Analytics"]
  },
  {
    id: "exp-3",
    company: "Veloce Digital Strategy",
    role: "Product Technologist & Developer",
    duration: "2021 - 2022",
    responsibilities: [
      "Collaborated closely with founders and marketing heads to design, develop, and test web applications, SaaS prototypes, and web portals.",
      "Configured secure user authentication layers, relational database models, and transactional notification gateways.",
      "Optimized client websites for speed, accessibility, and SEO, achieving standard Google Lighthouse scores of 95+."
    ],
    achievements: [
      "Shipped 12+ functional web products and automation proofs-of-concept for clients in tech, finance, and real estate.",
      "Integrated Airtable, Stripe, and Twilio webhooks to build a complete booking platform for a scaling wellness chain in under 3 weeks.",
      "Ensured pixel-perfect, highly responsive layout rendering across mobile, tablet, and desktop viewports."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Stripe API", "Node.js", "Airtable"]
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: "ach-1", label: "Years Experience", value: 5.6, suffix: "+", description: "In technical product, growth, and automation engineering roles." },
  { id: "ach-2", label: "Qualified Leads Generated/m", value: 3000, suffix: "+", description: "Aesthetic digital products, custom analytics platforms, and SaaS web apps." },
  { id: "ach-3", label: "creators onobarded to Creator Marketplace", value: 100, suffix: "+", description: "Resilient workflow pipelines saving corporate clients thousands of hours." }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Simon's ability to take complex manual operations and completely automate them with AI and n8n is wizardry. Our sales team gained back 15 hours a week, and outbound pipeline tripled in months. He understands design and technology equally.",
    author: "Elena Rostova",
    role: "Co-Founder & COO",
    company: "ScribeFlow AI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test-2",
    quote: "Working with Simon felt like adding a growth CTO, product manager, and lead designer to our team all at once. He built a complex customer dashboard that other agencies estimated at 4 months, and shipped it flawlessly in just 6 weeks.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "OmniChannel Corp",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "test-3",
    quote: "Simon did not just build a beautiful, high-performing website; he integrated our entire CRM, automated lead routing, and built real-time attribution dashboards. Our digital strategy operates with complete clarity now. Absolute genius.",
    author: "Amara Okoye",
    role: "Head of Marketing",
    company: "Aura Creative",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  }
];
