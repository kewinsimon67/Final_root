import React, { useState } from "react";
import { X, Printer, Copy, Check, Mail, Linkedin, Github, FileText, MapPin } from "lucide-react";
import { motion } from "motion/react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const resumeMarkdown = `# Kewin Simon
Growth & Performance Marketing Specialist
San Francisco Bay Area, CA | IamSimonKewin@gmail.com | https://linkedin.com

## PROFESSIONAL SUMMARY
Performance-driven Growth Marketer and Automation Engineer with 5+ years of experience bridging quantitative marketing strategy, generative AI, and high-throughput workflow automation (n8n, Zapier). Proven record of reducing operational acquisition overhead by up to 38%, configuring precise multi-touch fractional attribution models boosting marketing ROI by 35%, and constructing robust lead-scoring microservices. Expert at designing and deploying programmatic customer acquisition funnels that scale pipeline revenue.

## CORE COMPETENCIES
- Product Strategy & Roadmap Planning (PRDs, User Flows, Agile Methodologies)
- AI & GenAI Systems (Google Gemini SDK, Prompt Engineering, Structured JSON Outputs)
- Enterprise Workflow Automation (Zapier, n8n, Make, Custom Webhooks, Redis Queues)
- Full-Stack Development (React, TypeScript, Next.js, Node.js, FastAPI, Python)
- Database & Cloud Infrastructure (PostgreSQL, Firestore, Google Cloud Run, Docker)
- Growth Engineering & BI (Fractional Attribution, Funnel Trackers, SQL, BigQuery)

## EXPERIENCE

### Lead Product & Automation Architect | ApexFlow Automations
2024 - Present
- Directed technical product development and integration maps, bridging core company systems with AI workflows for Series A and B clients.
- Slashed client operations overhead by an average of 38% through custom n8n systems and LLM function-calling middleware.
- Engineered a scalable multi-tenant CRM automation system processing 10M+ automated operations monthly with 99.99% uptime.
- Led a nimble team of 3 engineers, maintaining strict codebase standards, thorough linting, and rapid deployment cycles.

### Senior Growth & MarTech Engineer | Symmetric Growth Labs
2022 - 2024
- Designed and engineered high-performance marketing tunnels, custom attribution trackers, and automated client onboarding systems.
- Boosted performance marketing ROI by 35% across portfolio companies through precise multi-touch attribution dashboard modeling.
- Built an automated LinkedIn and email outreach system that generated $80k/month in net new pipeline within its first quarter.
- Automated over 120 internal and client workflows, completely eliminating manual lead copying and data mismatch errors.

### Product Technologist & Developer | Veloce Digital Strategy
2021 - 2022
- Collaborated closely with founders and marketing heads to design, develop, and test web applications, SaaS prototypes, and web portals.
- Shipped 12+ functional web products and automation proofs-of-concept for clients in tech, finance, and real estate.
- Integrated Airtable, Stripe, and Twilio webhooks to build a complete booking platform for a wellness chain in under 3 weeks.
- Optimized client websites for speed, accessibility, and SEO, achieving standard Google Lighthouse scores of 95+.

## EDUCATION & CREDENTIALS
- B.S. in Computer Science & Business Information Systems
- Google Cloud Certified Professional Cloud Architect
- DeepLearning.AI Generative AI & LLM Systems Specialization
`;

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(resumeMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy resume", err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Kewin Simon - Resume</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Inter', sans-serif;
              color: #1A1815;
              line-height: 1.5;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              font-size: 28px;
              font-weight: 900;
              text-transform: uppercase;
              margin-bottom: 5px;
              letter-spacing: -0.02em;
            }
            .subtitle {
              font-size: 14px;
              font-weight: 700;
              text-transform: uppercase;
              color: #FF5A1F;
              letter-spacing: 0.1em;
              margin-bottom: 15px;
            }
            .contact-info {
              font-size: 12px;
              color: #666;
              border-bottom: 2px solid #E6E4DE;
              padding-bottom: 15px;
              margin-bottom: 25px;
              display: flex;
              gap: 15px;
            }
            h2 {
              font-size: 14px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #1A1815;
              border-bottom: 1px solid #E6E4DE;
              padding-bottom: 5px;
              margin-top: 25px;
              margin-bottom: 12px;
            }
            .section-desc {
              font-size: 13px;
              margin-bottom: 15px;
            }
            .job {
              margin-bottom: 20px;
            }
            .job-header {
              display: flex;
              justify-content: justify;
              align-items: baseline;
              margin-bottom: 5px;
            }
            .job-title {
              font-size: 13px;
              font-weight: 700;
              color: #1A1815;
            }
            .job-company {
              font-size: 13px;
              font-weight: 500;
              color: #666;
              margin-left: 5px;
            }
            .job-duration {
              font-size: 11px;
              font-weight: 700;
              color: #FF5A1F;
              margin-left: auto;
            }
            ul {
              margin: 0;
              padding-left: 20px;
              font-size: 12.5px;
              color: #333;
            }
            li {
              margin-bottom: 5px;
            }
            .competencies {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              font-size: 12.5px;
              color: #333;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1>Kewin Simon</h1>
          <div class="subtitle">Growth & Performance Marketing Specialist</div>
          <div class="contact-info">
            <span>📍 San Francisco Bay Area, CA</span>
            <span>✉️ IamSimonKewin@gmail.com</span>
            <span>🔗 linkedin.com/in/kewinsimon</span>
          </div>

          <h2>Professional Summary</h2>
          <div class="section-desc">
            Performance-driven Growth Marketer and Automation Engineer with 5+ years of experience bridging quantitative marketing strategy, generative AI, and high-throughput workflow automation (n8n, Zapier). Proven record of reducing operational acquisition overhead by up to 38%, configuring precise multi-touch fractional attribution models boosting marketing ROI by 35%, and constructing robust lead-scoring microservices. Expert at designing and deploying programmatic customer acquisition funnels that scale pipeline revenue.
          </div>

          <h2>Core Competencies</h2>
          <div class="competencies">
            <div>• Product Strategy & Roadmap Planning (PRDs, Flows)</div>
            <div>• AI Systems (Gemini SDK, Structured Output JSON)</div>
            <div>• Enterprise Automation (n8n, Zapier, Custom Webhooks)</div>
            <div>• Full-Stack Dev (React, TypeScript, Node.js, FastAPI)</div>
            <div>• Database & Cloud (PostgreSQL, Firestore, GCP, Docker)</div>
            <div>• Growth Engineering (Attribution, SQL, BigQuery)</div>
          </div>

          <h2>Professional Experience</h2>
          
          <div class="job">
            <div class="job-header">
              <span class="job-title">Lead Product & Automation Architect</span>
              <span class="job-company">| ApexFlow Automations</span>
              <span class="job-duration">2024 - PRESENT</span>
            </div>
            <ul>
              <li>Direct technical product development and integration maps, bridging core company systems with AI workflows for Series A and B clients.</li>
              <li>Slashed client operations overhead by an average of 38% through custom n8n systems and LLM function-calling middleware.</li>
              <li>Engineered a scalable multi-tenant CRM automation system processing 10M+ automated operations monthly with 99.99% uptime.</li>
              <li>Led a nimble team of 3 engineers, maintaining strict codebase standards, thorough linting, and rapid deployment cycles.</li>
            </ul>
          </div>

          <div class="job">
            <div class="job-header">
              <span class="job-title">Senior Growth & MarTech Engineer</span>
              <span class="job-company">| Symmetric Growth Labs</span>
              <span class="job-duration">2022 - 2024</span>
            </div>
            <ul>
              <li>Designed and engineered high-performance marketing tunnels, custom attribution trackers, and automated client onboarding systems.</li>
              <li>Boosted performance marketing ROI by 35% across portfolio companies through precise multi-touch attribution dashboard modeling.</li>
              <li>Built an automated LinkedIn and email outreach system that generated $80k/month in net new pipeline within its first quarter.</li>
              <li>Automated over 120 internal and client workflows, completely eliminating manual lead copying and data mismatch errors.</li>
            </ul>
          </div>

          <div class="job">
            <div class="job-header">
              <span class="job-title">Product Technologist & Developer</span>
              <span class="job-company">| Veloce Digital Strategy</span>
              <span class="job-duration">2021 - 2022</span>
            </div>
            <ul>
              <li>Collaborated closely with founders and marketing heads to design, develop, and test web applications, SaaS prototypes, and web portals.</li>
              <li>Shipped 12+ functional web products and automation proofs-of-concept for clients in tech, finance, and real estate.</li>
              <li>Integrated Airtable, Stripe, and Twilio webhooks to build a complete booking platform for a wellness chain in under 3 weeks.</li>
              <li>Optimized client websites for speed, accessibility, and SEO, achieving standard Google Lighthouse scores of 95+.</li>
            </ul>
          </div>

          <h2>Education & Credentials</h2>
          <ul>
            <li>B.S. in Computer Science & Business Information Systems</li>
            <li>Google Cloud Certified Professional Cloud Architect</li>
            <li>DeepLearning.AI Generative AI & LLM Systems Specialization</li>
          </ul>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/60 backdrop-blur-sm">
      {/* Background close click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-warm-bg border border-border-custom max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header Options */}
        <div className="p-6 bg-pure-white border-b border-border-custom flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-primary-text uppercase tracking-wide">
                Kewin Simon Resume
              </h3>
              <span className="text-[10px] text-secondary-text font-mono uppercase block">
                Recruiter & ATS Optimized Profile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy raw text button */}
            <button
              onClick={handleCopyMarkdown}
              className="p-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-warm-bg border border-border-custom text-primary-text hover:bg-primary-text hover:text-pure-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Copy markdown content for applicant tracking systems"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy ATS Markdown</span>
                </>
              )}
            </button>

            {/* Print/PDF save button */}
            <button
              onClick={handlePrint}
              className="p-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-primary-accent text-pure-white hover:bg-hover-accent transition-colors cursor-pointer flex items-center gap-1.5"
              title="Print Resume or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl hover:bg-warm-bg text-secondary-text hover:text-primary-text transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Sandbox Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 text-left bg-pure-white font-sans max-w-[800px] mx-auto w-full">
          {/* Resume Header */}
          <div className="border-b-2 border-border-custom pb-6 mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-black text-primary-text uppercase tracking-tighter leading-none mb-2">
              Kewin Simon
            </h1>
            <div className="text-xs uppercase font-extrabold tracking-wider text-primary-accent mb-4">
              Growth & Performance Marketing Specialist
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-secondary-text font-medium font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary-accent" />
                San Francisco Bay Area, CA
              </span>
              <span className="hidden sm:inline text-border-custom">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-primary-accent" />
                IamSimonKewin@gmail.com
              </span>
              <span className="hidden sm:inline text-border-custom">•</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-primary-accent" />
                linkedin.com/in/kewinsimon
              </span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-8">
            <h2 className="text-sm font-black text-primary-text uppercase tracking-widest border-b border-border-custom pb-2 mb-3">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed font-medium">
              Performance-driven Growth Marketer and Automation Engineer with 5+ years of experience bridging quantitative marketing strategy, generative AI, and high-throughput workflow automation (n8n, Zapier). Proven record of reducing operational acquisition overhead by up to 38%, configuring precise multi-touch fractional attribution models boosting marketing ROI by 35%, and constructing robust lead-scoring microservices. Expert at designing and deploying programmatic customer acquisition funnels that scale pipeline revenue.
            </p>
          </div>

          {/* Section: Core Competencies */}
          <div className="mb-8">
            <h2 className="text-sm font-black text-primary-text uppercase tracking-widest border-b border-border-custom pb-2 mb-3">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-secondary-text font-semibold">
              <div className="flex items-center gap-1.5">• Product Strategy & Roadmap Planning (PRDs, Flows)</div>
              <div className="flex items-center gap-1.5">• AI Systems (Gemini SDK, Structured Output JSON)</div>
              <div className="flex items-center gap-1.5">• Enterprise Automation (n8n, Zapier, Custom Webhooks)</div>
              <div className="flex items-center gap-1.5">• Full-Stack Dev (React, TypeScript, Node.js, FastAPI)</div>
              <div className="flex items-center gap-1.5">• Database & Cloud (PostgreSQL, Firestore, GCP, Docker)</div>
              <div className="flex items-center gap-1.5">• Growth Engineering (Attribution, SQL, BigQuery)</div>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-8">
            <h2 className="text-sm font-black text-primary-text uppercase tracking-widest border-b border-border-custom pb-2 mb-5">
              Professional Experience
            </h2>

            {/* Job 1 */}
            <div className="mb-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-extrabold text-xs sm:text-sm text-primary-text uppercase">
                    Lead Product & Automation Architect
                  </span>
                  <span className="text-xs text-secondary-text font-bold"> | ApexFlow Automations</span>
                </div>
                <span className="text-[10px] font-mono text-primary-accent font-bold uppercase">
                  2024 - PRESENT
                </span>
              </div>
              <ul className="list-disc list-outside pl-5 text-xs text-secondary-text leading-relaxed font-medium space-y-1">
                <li>Direct technical product development and integration maps, bridging core company systems with AI workflows for Series A and B clients.</li>
                <li>Slashed client operations overhead by an average of 38% through custom n8n systems and LLM function-calling middleware.</li>
                <li>Engineered a scalable multi-tenant CRM automation system processing 10M+ automated operations monthly with 99.99% uptime.</li>
                <li>Led a nimble team of 3 engineers, maintaining strict codebase standards, thorough linting, and rapid deployment cycles.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="mb-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-extrabold text-xs sm:text-sm text-primary-text uppercase">
                    Senior Growth & MarTech Engineer
                  </span>
                  <span className="text-xs text-secondary-text font-bold"> | Symmetric Growth Labs</span>
                </div>
                <span className="text-[10px] font-mono text-primary-accent font-bold uppercase">
                  2022 - 2024
                </span>
              </div>
              <ul className="list-disc list-outside pl-5 text-xs text-secondary-text leading-relaxed font-medium space-y-1">
                <li>Designed and engineered high-performance marketing tunnels, custom attribution trackers, and automated client onboarding systems.</li>
                <li>Boosted performance marketing ROI by 35% across portfolio companies through precise multi-touch attribution dashboard modeling.</li>
                <li>Built an automated LinkedIn and email outreach system that generated $80k/month in net new pipeline within its first quarter.</li>
                <li>Automated over 120 internal and client workflows, completely eliminating manual lead copying and data mismatch errors.</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div className="mb-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <span className="font-extrabold text-xs sm:text-sm text-primary-text uppercase">
                    Product Technologist & Developer
                  </span>
                  <span className="text-xs text-secondary-text font-bold"> | Veloce Digital Strategy</span>
                </div>
                <span className="text-[10px] font-mono text-primary-accent font-bold uppercase">
                  2021 - 2022
                </span>
              </div>
              <ul className="list-disc list-outside pl-5 text-xs text-secondary-text leading-relaxed font-medium space-y-1">
                <li>Collaborated closely with founders and marketing heads to design, develop, and test web applications, SaaS prototypes, and web portals.</li>
                <li>Shipped 12+ functional web products and automation proofs-of-concept for clients in tech, finance, and real estate.</li>
                <li>Integrated Airtable, Stripe, and Twilio webhooks to build a complete booking platform for a wellness chain in under 3 weeks.</li>
                <li>Optimized client websites for speed, accessibility, and SEO, achieving standard Google Lighthouse scores of 95+.</li>
              </ul>
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <h2 className="text-sm font-black text-primary-text uppercase tracking-widest border-b border-border-custom pb-2 mb-3">
              Education & Credentials
            </h2>
            <ul className="list-disc list-outside pl-5 text-xs text-secondary-text leading-relaxed font-semibold space-y-1">
              <li>B.S. in Computer Science & Business Information Systems</li>
              <li>Google Cloud Certified Professional Cloud Architect</li>
              <li>DeepLearning.AI Generative AI & LLM Systems Specialization</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
