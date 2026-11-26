/**
 * Blog posts rendered at /blog and /blog/[slug].
 *
 * Text is stored with plain ASCII quotes; the renderer converts them to
 * typographic quotes and turns every http(s) URL into a clickable link.
 */

import { afterGraduation } from './posts/afterGraduation'

export type BlogListItem = string | { lead: string; text: string }

export type BlogBlock =
  | { type: 'paragraph'; text: string; lead?: string }
  | { type: 'heading'; level: 3 | 4; text: string; number?: string }
  | { type: 'list'; ordered?: boolean; items: BlogListItem[] }
  | { type: 'table'; label: string; caption: string; columns: string[]; rows: string[][]; note?: string }
  | { type: 'framework' }
  | { type: 'references'; items: string[] }

export interface BlogSection {
  id: string
  /** Shown before the title, e.g. "Chapter 1". */
  label?: string
  title: string
  blocks: BlogBlock[]
}

export interface BlogPost {
  slug: string
  kind: string
  title: string
  subtitle?: string
  /** One-sentence description for listings and search results. */
  summary: string
  author: string
  publishedAt: string
  /** Opening paragraphs shown before the first section, for essays. */
  intro?: string[]
  /** For studies: shown in a boxed Abstract with the keywords. */
  abstract?: string[]
  /** Used in search metadata; listed under the abstract when there is one. */
  keywords?: string[]
  sections: BlogSection[]
}

const aiAndItFreshGraduates: BlogPost = {
  slug: 'ai-it-fresh-graduates-philippines',
  kind: 'Study',
  title: 'How AI Affects IT Fresh Graduates in Finding a Job',
  subtitle: 'The Case of Graduates from State Universities and Lesser-Known Schools in the Philippines',
  summary:
    'AI is narrowing the entry door to Philippine IT jobs, and graduates of state universities and lesser-known schools reach that door with fewer of the signals employers use to sort applicants.',
  author: '@Yhel',
  publishedAt: '2026-11-25',
  abstract: [
    `AI is narrowing the entry door to Philippine IT jobs, and graduates of state universities and lesser-known schools reach that door with fewer of the signals employers use to sort applicants. This study synthesizes 2023–2026 secondary evidence: Philippine Statistics Authority (PSA) Labor Force Surveys, IMF and ILO AI-exposure studies, IBPAP industry data, Stanford payroll research, JobStreet employer surveys, PIDS–CHED and SUC graduate tracer studies, and research on AI résumé screening.`,
    `Four findings stand out. First, entry-level hiring is tightening: IBPAP cut its 2028 job target from 2.5 million to 1.85–2.14 million, citing AI, and the youth (15–24) employment rate fell to 84.7% in September 2026 from 88.4% a year earlier. Second, the profile most exposed to AI (young, college-educated, urban) is the profile of a fresh IT graduate. Third, school name matters unevenly. In JobStreet's 2023 employer survey the most preferred school was a state university, PUP, and Batangas State also made the top ten, so "state university" is not itself a disadvantage. The disadvantage falls on graduates of schools employers do not recognize, which each draw a near-zero share of employer preference. Fourth, AI résumé screening can carry and amplify such prestige shortcuts, because human screeners tend to follow AI recommendations.`,
    `No Philippine dataset yet measures AI's effect on hiring by school type, so these conclusions rest on triangulated, indirect evidence. The study concludes that AI does not create the school-name gap, but it widens it in two ways. It removes the trainee seats where unknown graduates used to prove themselves, and it automates the screening step where school names act as filters. Portfolios, certifications, internships and skills-based hiring are the main counterweights. The study recommends actions for graduates, SUCs and lesser-known schools, employers, and government.`,
  ],
  keywords: [
    'artificial intelligence',
    'IT fresh graduates',
    'state universities and colleges',
    'institutional prestige',
    'employability',
    'entry-level hiring',
    'AI résumé screening',
    'Philippines',
  ],
  sections: [
    {
      id: 'introduction',
      label: 'Chapter 1',
      title: 'Introduction',
      blocks: [
        { type: 'heading', level: 3, number: '1.1', text: 'Background of the study' },
        {
          type: 'paragraph',
          text: `The Philippines built its modern services economy on information technology and business process management (IT-BPM). In 2025 the sector employed about 1.9 million people and earned over US$40 billion in export revenue, equal to more than 8% of GDP (Philstar, 2026; Philstar, 2026a). For decades this industry, along with software firms, banks' IT units and global capability centers (GCCs), absorbed large numbers of new college graduates.`,
        },
        {
          type: 'paragraph',
          text: `Generative AI arrived in late 2022 and spread fast. Filipino knowledge workers adopted it early: 86% reported using AI at work in 2024, above the 75% global average (Microsoft Philippines, 2024). The same tools can now draft code, write tickets, answer customers and summarize documents, which are the routine tasks that once trained junior staff.`,
        },
        {
          type: 'paragraph',
          text: `At the same time, the 2026 labor market has been hard for young people. Unemployment hit 6.0% in July 2026, the highest since mid-2022, as 1.33 million Filipinos aged 15–24 entered the labor force that month (Daily Tribune, 2026). Fresh IT graduates sit where these two trends meet.`,
        },
        {
          type: 'paragraph',
          text: `Not every graduate enters this market on equal terms. Public state and local universities and colleges (SUCs and LUCs) now enroll almost as many students as private schools: about 2.32 million versus 2.47 million in 2024 (Malaya, 2025). Many of these graduates come from the provinces and chose a public school for its free tuition. Employers have long used school name as a shortcut when screening fresh graduates. In an earlier JobStreet survey of 400 companies, 77% said they prioritized graduates of UP, Ateneo, UST and De La Salle. Still, 94% said they would hire graduates from other schools (Inquirer.net, n.d.).`,
        },
        {
          type: 'paragraph',
          text: `AI adds a new layer to that old pattern. Firms now need fewer trainees, and many sort applicants with automated screening tools. Both changes could make the school-name shortcut count for more. This study asks how these forces affect IT fresh graduates from state universities and lesser-known schools in particular.`,
        },

        { type: 'heading', level: 3, number: '1.2', text: 'Statement of the problem' },
        {
          type: 'paragraph',
          text: `This study asks: How does AI affect the ability of IT fresh graduates to find a job, especially graduates of state universities and lesser-known schools in the Philippines? Specifically:`,
        },
        {
          type: 'list',
          ordered: true,
          items: [
            `What is the current state of the Philippine IT and IT-BPM labor market for fresh graduates (2024–2026)?`,
            `How exposed are entry-level IT and IT-BPM roles to AI, and is that exposure mainly substitution or complementarity?`,
            `What evidence exists that AI is reducing entry-level hiring of young, college-educated workers?`,
            `How does a graduate's school (top-tier private, flagship SUC, or lesser-known SUC or private school) shape how they are screened and hired, and does AI strengthen or weaken that effect?`,
            `How do the IT employment outcomes of graduates compare across well-known schools, SUCs and lesser-known schools?`,
            `How do the IT and computer science curricula of well-known schools differ from those of other schools, and how do the differences relate to AI-era skill demands?`,
            `Which skills and signals can offset a less-recognized school name in an AI-shaped hiring market?`,
            `What strategies can graduates, schools, employers and government adopt in response?`,
          ],
        },

        { type: 'heading', level: 3, number: '1.3', text: 'Significance of the study' },
        {
          type: 'list',
          items: [
            `IT fresh graduates from SUCs and lesser-known schools get an evidence-based view of where they stand and which signals can offset school name.`,
            `SUC and private-school administrators get input for curriculum, internship and placement programs.`,
            `CHED gets a case for tracking graduate outcomes by school type and program.`,
            `Employers and IBPAP members get a case for skills-based screening and for keeping entry-level pipelines open while they adopt AI.`,
            `Policymakers (DOLE, DICT, DTI, TESDA) get a synthesis linking AI policy, free public higher education and youth employment.`,
            `Future researchers get a reviewed baseline and a list of data gaps.`,
          ],
        },

        { type: 'heading', level: 3, number: '1.4', text: 'Scope and delimitation' },
        {
          type: 'paragraph',
          text: `The study covers the Philippines from 2022, when mainstream generative AI was released, to November 2026. It focuses on graduates of BSIT, BSCS and related programs. Its main subjects are graduates of SUCs, LUCs and private schools outside the commonly recognized top tier, compared with graduates of top-tier schools. It relies on published secondary data and does not run its own survey. It does not measure AI's causal effect, because no public dataset separates hiring outcomes by AI adoption, school type and field together.`,
        },
        {
          type: 'paragraph',
          text: `Two comparisons are within scope. The first compares reported IT employment outcomes across school types, using published graduate tracer studies, university employability rankings and employer surveys. The second compares the curricula of well-known schools (such as UP, DLSU, UST, Ateneo, Mapúa and Batangas State University) with the CHED minimum curriculum that most other schools follow, using CHED policy documents, program pages and accreditation records. Neither comparison ranks individual schools; both describe patterns by school type.`,
        },

        { type: 'heading', level: 3, number: '1.5', text: 'Definition of terms' },
        {
          type: 'table',
          label: 'Table 1',
          caption: 'Definition of terms',
          columns: ['Term', 'Definition used in this study'],
          rows: [
            ['AI exposure', `The degree to which an occupation's tasks overlap with what current AI can perform (Felten et al., 2021; Cazzaniga et al., 2024).`],
            ['Complementarity', `The likelihood that AI augments rather than replaces a worker, given the job's social, physical and accountability demands (Pizzinelli et al., 2023).`],
            ['AI résumé screening', 'Software, including applicant tracking systems and large language models, that ranks, scores or filters applicants before a human reviews them.'],
            ['Entry-level / fresh graduate', `A worker in the first one to two years after completing a bachelor's degree, typically aged 20–25.`],
            ['GCC', 'Global capability center: an offshore unit owned by a multinational that does higher-value work in-house.'],
            ['Institutional prestige', `How widely employers recognize and favor a school's name, as shown in employer preference surveys.`],
            ['IT-BPM', 'Information technology and business process management: contact centers, IT services, software, shared services, GCCs, health information and animation.'],
            ['Lesser-known school', 'An SUC, LUC or private school that is rarely named in employer preference surveys, often located outside Metro Manila.'],
            ['SUC / LUC', 'State university or college (funded by the national government) / local university or college (funded by a local government unit). Both offer free tuition under Republic Act 10931 (2017).'],
            ['Skills mismatch', 'A gap between the skills workers hold and the skills jobs require, including over- and under-qualification.'],
            ['Youth', 'Persons aged 15–24 in PSA labor statistics.'],
          ],
        },
      ],
    },
    {
      id: 'literature',
      label: 'Chapter 2',
      title: 'Review of Related Literature and Studies',
      blocks: [
        {
          type: 'paragraph',
          text: `The literature agrees on one point: AI changes tasks before it changes headcounts, and the first headcount effect lands on new entrants. It is grouped below into foreign literature, foreign studies, local literature and local studies, followed by a synthesis.`,
        },

        { type: 'heading', level: 3, number: '2.1', text: 'Foreign literature' },
        {
          type: 'paragraph',
          lead: 'Task-based view of technology.',
          text: `Autor, Levy and Murnane (2003) showed that computers replace routine, codifiable tasks and complement non-routine analytical and interpersonal ones. Acemoglu and Restrepo (2019) extended this: automation displaces workers from some tasks, while new tasks reinstate labor elsewhere. The net effect depends on how fast new tasks appear. Both frameworks predict that jobs built on routine cognitive work, such as junior coding, testing, documentation and tier-1 support, are the first to change.`,
        },
        {
          type: 'paragraph',
          lead: 'Generative AI widens the frontier.',
          text: `Earlier automation hit routine work. Generative AI reaches into non-routine cognitive tasks such as writing, coding and analysis. Eloundou et al. (2023) estimated that about 80% of US workers could have at least 10% of their tasks affected by large language models, with higher-wage, higher-education jobs more exposed. Frey and Osborne (2017) earlier warned that 47% of US jobs faced high automation risk. Later work criticized that figure for treating whole jobs as the unit instead of tasks.`,
        },
        {
          type: 'paragraph',
          lead: 'Global employer outlook.',
          text: `The World Economic Forum's Future of Jobs Report 2025 surveyed over 1,000 employers. They expect 170 million roles created and 92 million displaced by 2030, a net gain of 78 million, with about 22% of jobs churning (WEF, 2025). AI and big data top the fastest-growing skills, followed by networks and cybersecurity and technology literacy (WEF, 2025b). Big data specialists, fintech engineers, AI/ML specialists and software developers lead the fastest-growing jobs (WEF, 2025c).`,
        },

        { type: 'heading', level: 3, number: '2.2', text: 'Foreign studies' },
        {
          type: 'paragraph',
          lead: 'Entry-level workers as "canaries."',
          text: `Brynjolfsson, Chandar and Chen (2025, revised 2026) used ADP payroll data on millions of US workers. Their first version found a 13–16% relative employment decline for workers aged 22–25 in the most AI-exposed occupations (Stanford Digital Economy Lab, 2025). The August 2026 revision, with data through June 2026, found:`,
        },
        {
          type: 'list',
          items: [
            'no evidence of broad, economy-wide job displacement;',
            'employment of 22–25-year-olds in AI-exposed jobs about 19% below where it would have been had it tracked less-exposed peers;',
            'the gap working mainly through fewer hires, not more layoffs;',
            'declines concentrated where AI substitutes for tasks, with flat or rising employment where it complements workers (Stanford Digital Economy Lab, 2026).',
          ],
        },
        {
          type: 'paragraph',
          text: `Their conference slides show roughly a 20% headcount drop for software developers aged 22–25 since late 2022, with a similar pattern in customer service (Brynjolfsson et al., 2026). Both are core Philippine IT-BPM job families.`,
        },
        {
          type: 'paragraph',
          lead: 'Productivity gains go to novices.',
          text: `Brynjolfsson, Li and Raymond (2025) studied an AI assistant at a customer-support operation, much of it staffed from the Philippines. Issues resolved per hour rose about 15% on average, and the least experienced agents gained the most. This cuts both ways: AI can speed up a junior's learning curve, but it also lets a firm meet demand with fewer juniors.`,
        },
        {
          type: 'paragraph',
          lead: 'Counter-evidence.',
          text: `The Yale Budget Lab (June 2026) found no clear link between AI usage and changes in US employment or unemployment. An ILO review the same month concluded that large-scale displacement remained limited, even as the organization of work changed (Punongbayan, 2026).`,
        },

        { type: 'heading', level: 3, number: '2.3', text: 'Local literature' },
        {
          type: 'paragraph',
          lead: 'Industry position.',
          text: `IBPAP reports continued growth. The sector added about 80,000 jobs and US$2 billion in 2025 and projects US$42.3 billion and 1.96 million workers for 2026 (Inquirer, 2026). After a midterm review, however, IBPAP lowered its 2028 targets to US$43.3–50.5 billion and 1.85–2.14 million workers, down from US$59 billion and 2.5 million. It cited rapid AI advances, slower investment amid geopolitical uncertainty, and competition from countries such as Vietnam, Poland and Colombia. IBPAP says future hires must be "AI-enabled," and that entry-level staff affected by AI pilots were redeployed rather than cut (Inquirer, 2026).`,
        },
        {
          type: 'paragraph',
          lead: 'Commentary on the entry-level squeeze.',
          text: `A June 2026 Manila Times column argued that the BPO sector can keep growing while its entry roles shrink. It noted that the country produces about 850,000 graduates a year and that no Philippine BPO employment data by age has been published. It also reported a former employee's account of automated reporting, an external hiring freeze, and half a department eliminated as "redundancies," which would not register as AI job loss in official statistics (Manila Times via Newswav, 2026).`,
        },
        {
          type: 'paragraph',
          text: `Punongbayan (2026), writing for ISEAS, cautions that industry totals cannot isolate AI's effect. Firms can cut some roles while adding others. He argues the IBPAP downgrade is partly a correction of over-ambitious 2022 targets, and recommends that employers keep paid apprenticeships and supervised progression so new workers can still learn (Punongbayan, 2026).`,
        },
        {
          type: 'paragraph',
          lead: 'Employer expectations.',
          text: `LinkedIn data from 2024 showed that 70% of Filipino leaders would not hire someone without AI skills, and 68% would prefer a less experienced candidate with AI skills over a more experienced one without (Inquirer Opinion, 2024). Microsoft's 2026 Work Trend Index found 25% of Filipino workers are "Frontier Professionals" who run multi-step work with AI agents, against 16% globally. Filipino AI users ranked critical thinking (65%) and quality control of AI output (59%) as the top human skills (SunStar, 2026).`,
        },
        {
          type: 'paragraph',
          lead: 'Policy.',
          text: `The DTI launched the National AI Strategy Roadmap 2.0 (NAISR 2.0) and the Center for AI Research in July 2024. Its seven strategic imperatives include nurturing AI talent and upskilling and reskilling the workforce (US-ASEAN Business Council, 2024). NEDA framed it as supporting a fair transition, including retraining displaced workers (NEDA, 2024).`,
        },

        { type: 'heading', level: 3, number: '2.4', text: 'Local studies' },
        {
          type: 'paragraph',
          lead: 'IMF: AI exposure in the Philippines.',
          text: `Cucio and Hennig (2025) matched 436 four-digit occupations to October 2022 PSA Labor Force Survey microdata. About one-third of occupations are highly exposed to AI. Of these, 61% are also highly complementary. Overall, 14% of jobs are at risk of displacement and 22% will likely change significantly. The most exposed workers are college-educated, young, urban, female and well-paid service workers, though these groups also show higher complementarity. BPO workers are classed as highly exposed with low complementarity (IMF, 2025).`,
        },
        {
          type: 'paragraph',
          lead: 'ILO: generative AI exposure.',
          text: `Huynh (2026) estimated that over a quarter of Philippine employment, or 12.7 million jobs, is exposed to generative AI. That is the highest rate among ASEAN countries with comparable data. Only 3.6% of jobs fall in the highest-exposure band with elevated displacement risk. About two in five jobs in NCR are exposed, and over 30% in Central Luzon and Calabarzon. Young workers are more often in occupations with greater displacement risk, such as clerical support and service and sales (ILO, 2026).`,
        },
        {
          type: 'paragraph',
          lead: 'PIDS: skills mismatch.',
          text: `PIDS studies show a long-running mismatch between what HEIs teach and what industry needs. One in four graduates said outdated skills from college kept them from a good job, and mismatch rates are high in data science and analytics despite rising demand (PIDS). Another study found 39% of employed Filipinos overqualified and 29% underqualified for their jobs (PIDS). A scoping study found that Filipino workers often lack transversal skills like adaptability and collaboration because training was designed for a pre-digital era (PIDS).`,
        },

        { type: 'heading', level: 3, number: '2.5', text: 'School background, prestige and AI screening' },
        {
          type: 'paragraph',
          lead: 'Employer preference by school.',
          text: `JobStreet's 2023 survey of employers ranked the schools they prefer when hiring. Two state universities led the list: PUP (23.39%) and UP (9.17%). They were followed by DLSU (6.88%), UST (5.28%), Mapúa (3.44%), Batangas State University (3.21%), University of Mindanao (2.29%), and University of Cebu, TIP and STI College (2.06% each) (Manila Bulletin, 2023). Employers cited PUP graduates' teamwork. DLSU graduates were favored in IT, healthcare and real estate (People Matters, 2023). PUP had also topped JobStreet's 2016 survey of 550 employers, ahead of the "Big Four" (Inquirer.net, 2016).`,
        },
        {
          type: 'paragraph',
          text: `Two things follow. First, a state university is not at a disadvantage by default; well-known SUCs compete with elite private schools. Second, employer recognition is concentrated. The ten named schools together hold about 60% of stated preferences. The remaining 40% is spread across the rest of the country's roughly 2,000 higher education institutions (Wikipedia, citing CHED). A graduate of a small provincial SUC or private college starts with almost no name recognition.`,
        },
        {
          type: 'paragraph',
          lead: 'Graduate tracer evidence.',
          text: `The last national graduate tracer survey by PIDS and CHED covered 11,547 graduates of public and private schools from AY 2009–2011 (PIDS, 2019). It predates generative AI, so school-level evidence now comes from individual SUC tracer studies. Alzate and Laurel (2025) surveyed 288 BSIT graduates of Isabela State University–Roxas from 2009 to 2024. They found 69.79% employed full-time and 13.19% unemployed. Graduates asked for more industry-based training (29.17%), more internships (21.18%), advanced programming and stronger cybersecurity. The authors also called for exposure to AI and cloud computing (Alzate & Laurel, 2025). Dulnuan (2020) found that among technology programs in selected SUCs, stronger program organization and management practices went with better graduate employment rates (Dulnuan, 2020).`,
        },
        {
          type: 'paragraph',
          lead: 'AI in résumé screening.',
          text: `Automated screening adds a filter before any human reads an application. Wilson et al. (2025) ran a résumé-screening experiment with 528 participants using simulated AI with racial bias. Participants' choices closely followed the AI's recommendations, whatever the direction of its bias (Wilson et al., 2025). The same paper notes that as of 2024 only 21% of companies rejected applicants without any human review. Researchers have started testing whether AI screeners reward prestigious universities, but published results on school prestige are not yet conclusive (Gies College of Business, 2026). A University of Maryland study found that language models used in hiring tend to rate résumés written by the same model more highly (UMD Smith School, 2026). This suggests that screening may reward how a résumé is written, not only what it contains.`,
        },
        {
          type: 'paragraph',
          text: `These studies are about race, career gaps and writing style, not Philippine school names. They show a mechanism, not a measured Philippine effect. If an AI screener learns from past hires concentrated in recognized schools, it can reproduce that preference at scale, and humans who review its shortlist tend to accept it.`,
        },

        { type: 'heading', level: 3, number: '2.6', text: 'Curriculum standards and program differences' },
        {
          type: 'paragraph',
          lead: 'The CHED minimum.',
          text: 'All BSCS, BSIS and BSIT programs must meet CHED Memorandum Order No. 25, series of 2015. It sets a common computing core (introduction to computing, two programming courses, data structures and algorithms, information management and applications development) plus professional courses and 9–12 units of professional electives (CHED, 2015; PSITE, 2016). These are minimum standards. Schools may build their own curricula above them, as PUP did when it rewrote its BSCS and BSIT programs under the order (PUP, n.d.).',
        },
        {
          type: 'paragraph',
          lead: 'Slow updates, with an AI revision coming.',
          text: `EDCOM II found that CHED takes an average of 11 years to review and update the policies, standards and guidelines for bachelor's programs. CHED has committed to new technical panels for priority sectors such as AI and data analytics (Daily Tribune, 2026c). At a February 2026 CHED convention, a revised order for computing programs was announced as forthcoming. It would raise professional electives from 12 to 21 units and give more weight to AI and emerging technologies (University of Baguio, 2026). Largoza and Fernandez (2025) review how CHED's program standards changed before and after the K to 12 reform (PIDS, 2025).`,
        },
        {
          type: 'paragraph',
          lead: 'Quality marks above the minimum.',
          text: `CHED names Centers of Excellence (COE) and Centers of Development (COD) by discipline. In 2007 it chose only nine COEs in IT education out of more than a hundred applicants, plus 31 CODs (Philstar, 2007). Some schools also seek international accreditation. Mapúa's computer science and IT programs gained ABET accreditation in 2011 (Philstar, 2011). TIP's ABET-accredited computing programs are recognized under the Seoul Accord (Philstar, 2015). Batangas State University is the first and only state university with both engineering and computing programs accredited by ABET (The Post, 2025).`,
        },
        {
          type: 'paragraph',
          lead: 'Employability rankings.',
          text: 'QS measures graduate employability through employer reputation, alumni outcomes, employer partnerships, employer–student connections and graduate employment rate (Philstar, 2016). These indicators reward industry links as much as curriculum. Only a handful of Philippine schools, all well-known, appear in them.',
        },

        { type: 'heading', level: 3, number: '2.7', text: 'Synthesis of the reviewed literature' },
        {
          type: 'table',
          label: 'Table 2',
          caption: 'Synthesis of the reviewed literature',
          columns: ['Study', 'Setting and data', 'Key finding', 'Bearing on SUC and lesser-known-school IT graduates'],
          rows: [
            ['Cucio & Hennig (2025), IMF', 'PH, LFS 2022 microdata, 436 occupations', '~1/3 of occupations highly exposed; 14% of jobs at displacement risk', 'Young, college-educated urban workers are the most exposed group'],
            ['Huynh (2026), ILO', 'PH, generative AI exposure index', '12.7M jobs exposed; highest in ASEAN', 'NCR, Calabarzon and Central Luzon are the most exposed regions'],
            ['Brynjolfsson, Chandar & Chen (2025/2026)', 'US, ADP payroll through June 2026', 'Ages 22–25 in exposed jobs ~19% below trend', 'Effect runs through fewer hires; juniors in software and support hit first'],
            ['Brynjolfsson, Li & Raymond (2025)', 'Customer support, AI assistant', '~15% productivity gain; novices gain most', `AI can speed up juniors' learning or replace them`],
            ['WEF (2025)', '1,000+ global employers', '78M net new jobs by 2030; AI and big data top skills', 'Demand is shifting, not vanishing'],
            ['IBPAP (2026)', 'PH IT-BPM industry', 'Growth continues; 2028 job target cut to 1.85–2.14M', 'Fewer new seats than once planned; AI skills required'],
            ['JobStreet (2023)', `PH employers' preferred schools`, 'PUP and UP lead; top ten hold ~60% of preferences', 'Flagship SUCs compete well; little-known schools barely register'],
            ['Alzate & Laurel (2025)', 'ISU-Roxas BSIT tracer, n = 288', '69.79% employed full-time; grads want industry training and internships', 'SUC IT graduates see gaps in industry exposure'],
            ['Wilson et al. (2025)', 'US screening experiment, n = 528', 'People follow AI recommendations even when biased', 'Prestige shortcuts in AI screeners could pass through to human reviewers'],
            ['PIDS (various)', 'PH graduates and workers', 'Persistent curriculum–industry mismatch', 'Credentials alone do not secure jobs'],
          ],
        },

        { type: 'heading', level: 3, number: '2.8', text: 'Research gap' },
        {
          type: 'paragraph',
          text: `Three gaps remain. Foreign studies measure AI's effect on young workers with payroll data, while Philippine studies measure exposure, not outcomes. No national graduate tracer survey has been published since the PIDS–CHED study of AY 2009–2011 graduates, so outcomes cannot be compared by school type in the AI era. No study has tested whether AI screening tools used in the Philippines favor particular schools. This study connects these strands to the situation of IT fresh graduates from state universities and lesser-known schools.`,
        },
      ],
    },
    {
      id: 'framework',
      title: 'Theoretical and Conceptual Framework',
      blocks: [
        {
          type: 'paragraph',
          text: 'Four theories explain why AI can hurt new graduates first even while total employment grows.',
        },
        { type: 'heading', level: 3, text: 'Theoretical framework' },
        {
          type: 'list',
          items: [
            {
              lead: 'Task-based approach (Autor et al., 2003; Acemoglu & Restrepo, 2019).',
              text: 'Jobs are bundles of tasks. Technology substitutes for codifiable tasks and complements judgment-heavy ones. Displacement is offset only if new tasks appear fast enough. Entry-level IT jobs hold a high share of codifiable tasks.',
            },
            {
              lead: 'Skill-biased technological change.',
              text: `New technology raises the relative demand for workers whose skills complement it. In AI's case, this favors workers who can direct, verify and integrate AI output, which usually requires domain experience.`,
            },
            {
              lead: 'Human capital theory (Becker, 1964).',
              text: 'Workers invest in education and training to raise their productivity. When AI devalues some formal skills, the return shifts to skills learned on the job, which fresh graduates have not yet built.',
            },
            {
              lead: 'Signaling theory (Spence, 1973).',
              text: `This is the central lens of this study. Employers cannot observe ability directly, so they rely on signals such as a school's name. When there are fewer seats and more applicants, and AI screens résumés, cheap signals like school recognition carry more weight. Graduates of lesser-known schools must then produce stronger, costlier signals, such as portfolios, certifications and internships, to be seen.`,
            },
          ],
        },
        { type: 'heading', level: 3, text: 'Conceptual framework' },
        { type: 'framework' },
        {
          type: 'paragraph',
          text: `The model reads left to right. AI tools, firm adoption and macro conditions act on tasks. Whether AI augments or replaces a task shapes how many juniors firms hire and how they screen them, and those decisions produce graduate outcomes. The dashed band marks moderators. School recognition is one of them: it changes how strongly each hiring decision lands on a given graduate. The study's main proposition is that AI reaches fresh graduates mainly through hiring and screening, not layoffs, and that it lands harder on graduates with weaker school signals.`,
        },
      ],
    },
    {
      id: 'methodology',
      label: 'Chapter 3',
      title: 'Methodology',
      blocks: [
        { type: 'heading', level: 3, number: '3.1', text: 'Research design' },
        {
          type: 'paragraph',
          text: 'The study uses a descriptive, qualitative-dominant mixed-methods design based on secondary data: a systematic desk review plus descriptive analysis of published statistics. It describes and interprets existing evidence. It does not test a causal hypothesis.',
        },

        { type: 'heading', level: 3, number: '3.2', text: 'Data sources' },
        {
          type: 'table',
          label: 'Table 3',
          caption: 'Data sources',
          columns: ['Source type', 'Examples', 'Used for'],
          rows: [
            ['Official statistics', 'PSA Labor Force Survey (monthly, 2025–2026), as reported by PSA and national media; CHED enrollment data', 'Unemployment, youth employment, new entrants, public vs private enrollment'],
            ['International organizations', 'IMF Working Paper 25/43; ILO research brief (2026); WEF Future of Jobs 2025', 'AI exposure, skills demand'],
            ['Academic research', 'Stanford Digital Economy Lab; Quarterly Journal of Economics; Autor et al. (2003); Acemoglu & Restrepo (2019)', 'Entry-level effects, theory'],
            ['AI hiring research', 'Wilson et al. (2025); University of Maryland (2026); Gies College of Business (2026)', 'How AI résumé screening shapes decisions'],
            ['Graduate tracer studies', 'PIDS–CHED 4th Graduate Tracer Study; BSIT tracer studies of ISU-Roxas (2025), NEUST (2024), OMSC (2024), NVSU (2026), LPU-Batangas (2024); Dulnuan (2020)', 'IT employment outcomes by school type'],
            ['University rankings', 'QS Graduate Employability Rankings; QS World University Rankings 2026 employment indicators', 'Employment outcomes of top-tier schools'],
            ['Curriculum documents', 'CHED CMO No. 25, s. 2015; program pages of UP Diliman, DLSU, UST; accreditation records (ABET, PAASCU, CHED COE/COD)', 'Curriculum comparison'],
            ['Employer surveys', 'JobStreet preferred-school surveys (2016, 2023, and an undated earlier survey)', 'How school name affects hiring'],
            ['Government think tanks', 'PIDS discussion papers and policy notes; EDCOM II', 'Skills mismatch, graduate outcomes, curriculum policy'],
            ['Industry', 'IBPAP releases; Microsoft/LinkedIn Work Trend Index', 'Sector size, hiring signals, AI adoption'],
            ['Policy documents', 'DTI NAISR 2.0; NEDA statements', 'Government response'],
            ['Commentary', 'ISEAS Fulcrum; Manila Times', 'Interpretation, qualitative accounts'],
          ],
        },

        { type: 'heading', level: 3, number: '3.3', text: 'Inclusion criteria' },
        {
          type: 'list',
          items: [
            'Published January 2022 to November 2026, except foundational theory.',
            'About the Philippines, or global/US evidence directly relevant to entry-level knowledge work.',
            'From identifiable institutions or authors, with methods described.',
            'Industry and media sources used only for figures they report, cross-checked where possible.',
          ],
        },

        { type: 'heading', level: 3, number: '3.4', text: 'Data analysis' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Thematic analysis of the literature, coded into: exposure, substitution vs complementarity, entry-level hiring, skills demand, skills supply, and policy.',
            'Descriptive statistics of PSA monthly data, comparing 2026 with the same month of 2025 to remove seasonality (for example, the June–July graduation surge).',
            'Triangulation across official data, research and industry claims. Where they disagree, both views are reported.',
          ],
        },

        { type: 'heading', level: 3, number: '3.5', text: 'Limitations' },
        {
          type: 'list',
          items: [
            { lead: 'No causal identification.', text: 'Rising youth unemployment coincides with AI adoption, but the data cannot show AI caused it.' },
            { lead: 'No outcome data by school type.', text: 'No national tracer survey after the AY 2009–2011 cohort is published, and PSA does not report employment by school attended. School effects are inferred from employer surveys and individual tracer studies.' },
            { lead: 'Outcome figures are not directly comparable across schools.', text: 'Top-tier schools appear in QS rankings that cover all programs and blend several indicators. SUC and private-school figures come from single-campus BSIT tracer studies with different cohorts, response rates and definitions of "employed." Graduates who answer tracer surveys may also differ from those who do not.' },
            { lead: 'Curriculum comparison uses published documents, not classroom observation.', text: 'Program pages show structure and course titles, not teaching quality or facilities.' },
            `Employer-preference surveys measure stated preference, not actual hiring, and JobStreet's samples and methods are only partly published.`,
            'AI-screening evidence is foreign and mostly about race, gender and writing style. No study has tested school-name bias in screening tools used in the Philippines.',
            'No age-by-occupation hiring data for Philippine IT-BPM has been published.',
            { lead: 'Exposure is not outcome.', text: 'IMF and ILO indices estimate what AI could do, not what firms have done.' },
            'Industry figures are self-reported by IBPAP and not independently audited.',
            { lead: 'US-to-PH transfer.', text: 'US payroll findings may not transfer directly, though many Philippine IT-BPM jobs serve US clients.' },
            'Some PSA figures are cited through news reports of PSA releases rather than PSA tables directly.',
          ],
        },
      ],
    },
    {
      id: 'results',
      label: 'Chapter 4',
      title: 'Results and Discussion',
      blocks: [
        {
          type: 'paragraph',
          text: 'The evidence points to a hiring squeeze at the entry level, not mass job loss. It lands unevenly. The IT-BPM sector still grows, but more slowly than planned. More new graduates chase fewer trainee seats, and the seats that remain demand AI-augmented skills. Where employers screen faster and with fewer seats, graduates with a less-recognized school name need stronger proof of skill to get through.',
        },

        { type: 'heading', level: 3, number: '4.1', text: 'State of the Philippine IT and IT-BPM market (RQ1)' },
        {
          type: 'table',
          label: 'Table 4',
          caption: 'Philippine IT-BPM market indicators',
          columns: ['Indicator', 'Value', 'Source'],
          rows: [
            ['IT-BPM employment, 2025', '~1.9 million (+80,000; +4%)', 'Philstar, 2026a'],
            ['IT-BPM export revenue, 2025', '>US$40 billion (+5%)', 'Philstar, 2026'],
            ['Share of GDP', '>8%', 'Inquirer, 2026'],
            ['2026 projection', 'US$42.3 billion; 1.96 million workers', 'Inquirer, 2026b'],
            ['2028 job target, original (2022)', '2.5 million', 'Inquirer, 2026b'],
            ['2028 job target, revised', '1.85–2.14 million', 'Inquirer, 2026b'],
            ['Global capability centers', '~150 GCCs, ~250,000 professionals', 'Malaya, 2025'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The headline is growth. The detail is a structural shift. The revised 2028 range removes between roughly 360,000 and 650,000 planned jobs from the original target. Growth is now led by GCCs, which earn more revenue per employee and hire for complex roles (Malaya, 2025). Contact-center work, the traditional first job for many graduates, still makes up most of the workforce, about 1.68 million people (Punongbayan, 2026). It is also the segment the IMF classes as highly exposed and low in complementarity.',
        },

        { type: 'heading', level: 3, number: '4.2', text: 'How exposed are Philippine jobs to AI? (RQ2)' },
        {
          type: 'table',
          label: 'Table 5',
          caption: 'Estimates of AI exposure in the Philippines',
          columns: ['Measure', 'Estimate', 'Source'],
          rows: [
            ['Occupations highly exposed to AI', '~1/3', 'IMF (Cucio & Hennig, 2025)'],
            ['Highly exposed occupations that are also complementary', '61%', 'IMF (2025)'],
            ['Jobs at risk of displacement', '14%', 'IMF (2025)'],
            ['Jobs likely to change significantly', '22%', 'IMF (2025)'],
            ['Employment exposed to generative AI', '>25% (12.7 million)', 'ILO (Huynh, 2026)'],
            ['Jobs in the highest-risk exposure band', '3.6%', 'ILO (2026)'],
            ['NCR jobs exposed', '~2 in 5', 'ILO (2026)'],
          ],
        },
        {
          type: 'paragraph',
          text: `Two readings follow. First, most AI exposure in the Philippines is augmenting, not replacing: 61% of highly exposed occupations are complementary, and only 3.6% of jobs fall in the ILO's highest-risk band. Second, exposure is concentrated on exactly the profile of a fresh IT graduate: young, college-educated, urban and in services. The ILO also flags Calabarzon and Central Luzon, beside NCR, as regions where over 30% of jobs are exposed. These are the main commuter and hub areas for Metro Manila tech employers.`,
        },
        {
          type: 'paragraph',
          text: `Within IT work, the tasks most exposed are codified ones: boilerplate code, unit tests, documentation, ticket triage, QA scripts, tier-1 support and report generation. These are the tasks juniors were historically hired to do. US payroll data shows software developers aged 22–25 down roughly 20% since late 2022, while older developers kept growing (Brynjolfsson et al., 2026). Because many Philippine IT and BPO jobs serve US clients, that pattern is a leading indicator for local demand.`,
        },

        { type: 'heading', level: 3, number: '4.3', text: 'The 2026 youth labor market (RQ3)' },
        {
          type: 'paragraph',
          text: 'The overall labor market weakened through 2026, and young people carried most of it:',
        },
        {
          type: 'list',
          items: [
            { lead: 'June 2026:', text: 'of 592,000 new labor-force entrants aged 15–24, only 310,000 found work (Gate/PSA report, 2026). The youth employment rate fell to 86.5%, from 90.6% a year earlier, and youth unemployment rose to 978,000 from 623,000 (Manila Bulletin, 2026).' },
            { lead: 'July 2026:', text: 'unemployment reached 6.0%, the highest since May–June 2022, with 1.33 million people aged 15–24 entering the labor market that month (Daily Tribune, 2026).' },
            { lead: 'September 2026:', text: 'the labor force grew by about 1.63 million year on year, about 988,000 of them aged 15–24, but employment rose by only 721,000. The youth employment rate fell to 84.7% from 88.4% (Daily Tribune, 2026b).' },
          ],
        },
        {
          type: 'paragraph',
          text: 'The PSA attributes much of this to a surge in labor-force participation, especially fresh graduates entering the market (Manila Bulletin, 2026). The supply side matters: the Philippines produces about 850,000 graduates a year (Manila Times via Newswav, 2026). The PSA data is not broken down by degree or industry, so it cannot show how IT graduates fared compared with others.',
        },

        { type: 'heading', level: 3, number: '4.4', text: 'Is AI the cause? Weighing the evidence' },
        {
          type: 'table',
          label: 'Table 6',
          caption: 'Evidence for and against AI as a cause',
          columns: ['Evidence that AI is contributing', 'Evidence that other factors dominate'],
          rows: [
            ['IBPAP explicitly cited AI when cutting its 2028 job target', 'IBPAP still added ~80,000 jobs in 2025 and projects growth in 2026'],
            ['US data shows hiring of 22–25-year-olds falling in AI-exposed jobs, including software and customer service', 'The same US study finds no economy-wide displacement; Yale Budget Lab finds no clear link'],
            ['Firms can record AI-driven cuts as "redundancies" or hiring freezes, hiding them in statistics', 'PSA attributes 2026 unemployment mainly to a surge of new entrants'],
            ['Employers now say they prefer AI-skilled candidates over more experienced ones', 'Geopolitics, slower investment and competition from other outsourcing hubs also weigh on hiring'],
            ['Juniors affected by AI pilots were redeployed, which means those seats were not refilled with new graduates', 'US onshoring proposals may delay client expansion in the Philippines'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The most defensible conclusion is that AI is one of several forces, and its main channel is fewer new hires, not layoffs. That channel is the hardest to see in aggregate data, because a job that is never posted does not show up as a job lost. It falls almost entirely on new entrants. This matches the US finding that the gap operates "through reduced hiring of young workers rather than increased separations" (Brynjolfsson et al., 2026).',
        },

        { type: 'heading', level: 3, number: '4.5', text: 'What is rising in demand (RQ7)' },
        {
          type: 'list',
          items: [
            { lead: 'Technical skills:', text: 'AI and big data, networks and cybersecurity, and technology literacy are the three fastest-growing skills globally to 2030 (WEF, 2025b).' },
            { lead: 'Roles:', text: 'big data specialists, fintech engineers, AI/ML specialists and software and application developers lead global growth (WEF, 2025c).' },
            { lead: 'AI fluency as a hiring filter:', text: '70% of Filipino leaders would not hire a candidate without AI skills (Inquirer Opinion, 2024).' },
            { lead: 'Human judgment over AI output:', text: 'Filipino AI users rank critical thinking (65%) and quality control of AI output (59%) as the most important human skills (SunStar, 2026).' },
            { lead: 'Higher-value services:', text: 'complex customer support, financial analysis, healthcare administration and supervising automated processes (Punongbayan, 2026).' },
          ],
        },
        {
          type: 'paragraph',
          text: `On the supply side, PIDS finds curricula misaligned with priority sectors and weak industry links (PIDS), and high mismatch in data science and analytics despite rising demand. The gap is not new, but AI widens it. The skills that were "nice to have" in 2022 are now screening criteria.`,
        },

        { type: 'heading', level: 3, number: '4.6', text: 'Why fresh IT graduates specifically struggle' },
        {
          type: 'list',
          ordered: true,
          items: [
            { lead: 'The experience paradox has tightened.', text: 'Entry roles existed so juniors could learn on routine tasks. AI now does many of those tasks, so firms ask for more experience on day one.' },
            { lead: 'Competition comes from AI-augmented seniors, not only from AI.', text: 'A mid-level developer with AI tools can absorb the output of one or two juniors. Brynjolfsson, Li and Raymond (2025) show the productivity gain is real.' },
            { lead: 'Credentials signal less.', text: 'A BSIT diploma no longer separates applicants. Portfolios, shipped projects, certifications and visible AI-tool fluency do.' },
            { lead: 'Hiring is shifting toward GCCs and specialized roles,', text: 'which recruit fewer, more qualified people, rather than high-volume entry pipelines.' },
            { lead: 'Hidden displacement.', text: 'Freezes and redeployments do not appear as layoffs, so graduates face a shrinking market that official statistics have not yet named.' },
            { lead: 'Timing.', text: 'The 2026 graduating cohort entered an already weak labor market, with more new entrants than the economy absorbed.' },
          ],
        },

        { type: 'heading', level: 3, number: '4.7', text: 'The school-name factor: SUCs and lesser-known schools (RQ4)' },
        {
          type: 'paragraph',
          text: 'School name is a sorting signal that AI is likely to strengthen, not create. How much it hurts depends on how recognized the school is, not on whether it is public or private.',
        },
        {
          type: 'table',
          label: 'Table 7',
          caption: 'Likely position of graduate groups by school recognition',
          columns: ['Graduate group', 'Starting signal (from employer surveys)', 'How AI-era hiring changes it', 'Likely net position'],
          rows: [
            ['Top-tier and flagship schools (UP, PUP, DLSU, UST, Ateneo, Mapúa)', `Strong; PUP and UP lead JobStreet's 2023 list`, 'Recognized names pass screening and get the scarcer trainee seats', 'Least affected'],
            ['Recognized regional SUCs and private schools (e.g., Batangas State, University of Mindanao, University of Cebu, TIP)', 'Moderate; named in the top ten at 2–3% each', 'Recognized locally; may face filters in Metro Manila or for multinational roles', 'Mixed'],
            ['Lesser-known SUCs, LUCs and small private colleges', 'Weak; together share what remains of employer preference across ~2,000 schools', 'Fewer seats and automated screening leave little room for an unknown name to be tested on the job', 'Most affected, unless offset by other signals'],
          ],
          note: 'This table is an analytical synthesis of the sources in Chapter 2, not measured outcomes.',
        },
        { type: 'heading', level: 4, text: 'Why AI can widen the gap.' },
        {
          type: 'list',
          ordered: true,
          items: [
            { lead: 'Fewer trainee seats raise the cost of a wrong hire.', text: 'When a firm hires two juniors instead of ten, it tends to pick the lowest-risk profiles. A familiar school name is the cheapest risk signal available (Spence, 1973).' },
            { lead: 'Screening is becoming automated.', text: `Applicant volume is high and AI ranks résumés first. If a screener learns from past hires concentrated in known schools, it can repeat that pattern at scale. Human reviewers tend to accept the AI's shortlist (Wilson et al., 2025).` },
            { lead: 'The on-the-job proving ground is shrinking.', text: 'Graduates of unknown schools used to earn credibility in high-volume entry roles, then move up. AI absorbs many of those routine roles (Chapter 4.2), and IBPAP reports redeploying rather than refilling them.' },
            { lead: 'Geography still matters.', text: 'AI-exposed and AI-adopting employers cluster in NCR, Calabarzon and Central Luzon (ILO, 2026). Graduates of provincial schools far from these hubs face relocation costs and thinner employer networks.' },
            { lead: 'Weaker industry links.', text: 'SUC IT graduates themselves report limited industry exposure and ask for more internships and real-world projects (Alzate & Laurel, 2025). Internships are often how employers discover graduates from schools they do not already recruit from.' },
          ],
        },
        { type: 'heading', level: 4, text: 'Why AI can also narrow it.' },
        {
          type: 'list',
          ordered: true,
          items: [
            { lead: 'AI lowers the cost of proving skill.', text: 'Free AI tools, cloud credits and open-source projects let any student build and ship working software. A deployed project is a signal that does not depend on school name.' },
            { lead: 'Employers say they value AI skill over pedigree.', text: 'In LinkedIn data, 68% of Filipino leaders said they would rather hire a less experienced candidate with AI skills than a more experienced one without (Inquirer Opinion, 2024).' },
            { lead: 'Most employers do look beyond top schools.', text: 'In an earlier JobStreet survey, 94% of companies said they would hire graduates from outside the top four. Communication, trainability and work ethic mattered most (Inquirer.net, n.d.).' },
            { lead: 'Remote and freelance work bypass local filters.', text: 'Online freelancing and remote roles judge candidates on work samples, which reduces the weight of school name.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'On balance, AI raises the stakes of signaling. Graduates with a recognized name can lean on it. Graduates of lesser-known schools can still compete, but the burden of proof shifts to them: they need visible, verifiable evidence of skill before the screening step.',
        },

        { type: 'heading', level: 3, number: '4.8', text: 'Who lands IT jobs: outcomes by school type (RQ5)' },
        {
          type: 'paragraph',
          text: 'Graduates of every school type report high employment rates. The difference shows up in whether the job is in IT. Top-tier schools are measured by rankings that reward employer ties; SUC and lesser-known-school figures come from campus tracer studies, which show more graduates working outside IT.',
        },
        {
          type: 'table',
          label: 'Table 8',
          caption: 'Reported employment outcomes by school type',
          columns: ['School and type', 'Source, cohort and sample', 'Employed', 'First job related to the degree', 'Other findings'],
          rows: [
            ['Ateneo, UP, UST (top tier; all programs)', 'QS Graduate Employability Rankings, 2017 edition (Philstar, 2016)', '82.7% (Ateneo); 81% (UP, UST)', 'Not reported', 'Rates cover all degree programs, not only IT'],
            ['UP, Ateneo (top tier; all programs)', 'QS World University Rankings 2026 (Philstar, 2025)', 'Employment outcomes rank 155th (UP) and 157th (Ateneo) worldwide', 'Not reported', 'UP 143rd and Ateneo 148th in employer reputation'],
            ['LPU-Batangas (recognized regional private school)', 'BSIT tracer, SY 2019–20 and 2021–22, n = 52 (Ramos, 2024)', '90%', '89%', '81% found a first job within six months; OJT and Cisco courses rated most relevant'],
            ['Nueva Ecija University of Science and Technology (SUC)', 'BSIT batch 2021, n = 105 (Bensi, 2024)', '94.29%', '61%', 'Only 44.44% of employed graduates held regular or permanent posts'],
            ['Occidental Mindoro State College, San Jose (provincial SUC)', 'BSIT AY 2017–18 to 2021–22, n = 465 (Amahan et al., 2024)', '97.4%', 'Not quantified; most respondents work in education', 'Weakest skills: problem-solving and entrepreneurship'],
            ['Nueva Vizcaya State University, Bayombong (provincial SUC)', 'BSIT 2021–2025 (Bartolome et al., 2026)', 'Peak of 77.61% (2022)', '73.8% (2024)', 'Job relevance recovered after a dip'],
            ['Isabela State University–Roxas (provincial SUC)', 'BSIT 2009–2024, n = 288 (Alzate & Laurel, 2025)', '69.79% full-time; 13.19% unemployed', 'Not reported', 'Graduates asked for more industry training and internships'],
          ],
          note: 'Figures come from different methods, years and samples, and are not directly comparable. They show patterns, not a ranking.',
        },
        {
          type: 'paragraph',
          text: `Three patterns stand out. First, "employed" is not the same as "landed an IT job." In the NEUST cohort, 94.29% were employed but only 61% said their first job matched their degree. At OMSC most respondents work in education rather than IT roles. Second, job quality varies: fewer than half of NEUST's employed graduates held regular posts. Third, top-tier schools are not measured the same way at all. Their advantage shows up in employer reputation and partnerships, which are the signals employers screen on (Section 2.5). This means the outcome gap is partly a measured skills gap and partly a recognition gap. No published data separates the two.`,
        },

        { type: 'heading', level: 3, number: '4.9', text: 'What well-known schools do differently in the curriculum (RQ6)' },
        {
          type: 'paragraph',
          text: 'Well-known schools teach the same CHED computing core as every other school. What they add on top is what sets them apart: deeper specialization, required research, structured industry exposure and outside accreditation.',
        },
        {
          type: 'table',
          label: 'Table 9',
          caption: 'Curriculum features: CHED minimum, well-known schools and other schools',
          columns: ['Curriculum feature', 'CHED minimum (CMO No. 25, s. 2015)', 'Well-known schools (examples)', 'Many SUCs and lesser-known schools (from tracer feedback)'],
          rows: [
            ['Curriculum design', 'Common computing core, professional courses and 9–12 units of electives; a sample curriculum schools may adopt', 'UP Diliman designs its own 148-unit BSCS against ACM curriculum guidelines and industry feedback (UP DCS, n.d.)', 'Many programs state they are based directly on CMO No. 25 (University of Cebu, 2024)'],
            ['Specialization and AI', 'Electives only; no required AI course', 'DLSU BSCS-Software Technology has a 27-unit specialization track plus 12 elective units, covering intelligent systems and machine learning (DLSU, n.d.; DLSU, n.d.-b). UST offers core CS, game development and data science tracks (UST, n.d.). UP requires CS 180 Artificial Intelligence (UP DCS, n.d.-b)', 'Graduates ask for advanced programming and stronger cybersecurity; researchers call for AI and cloud exposure (Alzate & Laurel, 2025)'],
            ['Research', 'Capstone project', 'UP students must join one of eight research labs for a year-long special project or thesis (UP DCS, n.d.). DLSU requires a 6-unit thesis and offers a BS–MS honors track (DLSU, n.d.-c)', 'Capstone projects are the usual research output'],
            ['Industry exposure', 'Practicum', 'UP has a required mid-year internship term, an industry advisory board and partner companies (UP DCS, n.d.-c)', 'Graduates rate OJT as the most relevant course (Ramos, 2024) yet ask for more internships (Alzate & Laurel, 2025)'],
            ['Outside quality marks', 'CHED compliance', 'Mapúa (ABET), TIP (ABET, Seoul Accord), DLSU (PAASCU Level III since 2005; CHED COE in IT) (DLSU, n.d.-d)', 'Batangas State is the only SUC with ABET-accredited CS and IT programs (The Post, 2025)'],
            ['Update speed', 'CHED averages 11 years per standards update; an AI-focused revision is forthcoming', `Schools with their own curricula can revise on their own cycle (UP's current BSCS dates from 2018)`, 'Updates often wait for CHED or board approval (Guimaras State University, 2024)'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The comparison points to four practical differences. Well-known programs make students specialize, often in AI or data. They make research mandatory. They build internships into the schedule and keep an industry board that feeds the curriculum. And they carry outside quality marks that employers recognize. Each of these is also a hiring signal, which helps explain why recognition and outcomes travel together.',
        },
        {
          type: 'paragraph',
          text: `Batangas State is the key counter-example. As an SUC with ABET-accredited computing programs and a place in JobStreet's top ten, it shows that the gap comes from what a school builds on top of the minimum, not from being public. For graduates of other schools, this also means that most of these advantages can be built individually: a specialization through electives and online courses, a deployed capstone in place of a thesis, an internship, and outside certifications.`,
        },
      ],
    },
    {
      id: 'conclusions',
      label: 'Chapter 5',
      title: 'Summary, Conclusions and Recommendations',
      blocks: [
        { type: 'heading', level: 3, number: '5.1', text: 'Summary of findings' },
        {
          type: 'list',
          ordered: true,
          items: [
            { lead: 'The market is growing, but slower than planned.', text: 'IT-BPM reached ~1.9 million workers and >US$40 billion in 2025, but the 2028 job target was cut from 2.5 million to 1.85–2.14 million, with AI among the stated reasons.' },
            { lead: 'Exposure is high and lands on graduates.', text: 'About one-third of occupations are highly AI-exposed. The most exposed workers are young, college-educated and urban. Most exposure is complementary rather than substituting.' },
            { lead: 'Youth outcomes worsened in 2026.', text: 'Youth employment fell below year-earlier levels in every month reported, and unemployment peaked at 6.0% in July.' },
            { lead: `AI's main channel is fewer hires, not layoffs.`, text: 'US payroll evidence shows this most clearly, and Philippine accounts of hiring freezes and redeployment match it.' },
            { lead: 'School name matters by recognition, not by public or private status.', text: 'Flagship SUCs such as PUP and UP lead employer preference. Graduates of lesser-known SUCs, LUCs and small private colleges start with the weakest signal.' },
            { lead: 'AI is likely to amplify that signal.', text: 'Fewer trainee seats and automated résumé screening both favor cheap, familiar signals. No Philippine data yet measures this directly.' },
            { lead: 'Employment rates are high everywhere; IT-relatedness is not.', text: 'SUC tracer studies report 70–97% employment, but as few as 61% in jobs matching the degree. Top-tier schools are measured through employer reputation and partnerships instead.' },
            { lead: 'Well-known schools add four things above the CHED minimum:', text: 'required specialization (often in AI or data), mandatory research, structured internships with industry boards, and outside accreditation. The CHED standard itself takes about 11 years to update.' },
          ],
        },

        { type: 'heading', level: 3, number: '5.2', text: 'Conclusions' },
        {
          type: 'paragraph',
          text: 'AI is not the single cause of the difficulty IT fresh graduates face in 2026. A large cohort of new entrants, a slower economy and outsourcing competition all play a part. But AI changes which graduates get hired. It removes the routine tasks that justified trainee headcount, and it moves first-round screening to software. For graduates of state universities and lesser-known schools, the result is a higher burden of proof. A flagship SUC name still opens doors, but an unfamiliar school name is filtered earlier and given fewer chances to prove itself on the job.',
        },
        {
          type: 'paragraph',
          text: 'The gap is not fixed. The same AI tools that shrink trainee roles also make it cheaper to build and show real work. For these graduates the binding constraint is visible, verifiable evidence of applied, AI-augmented skill that reaches an employer before the screening step.',
        },

        { type: 'heading', level: 3, number: '5.3', text: 'Recommendations' },
        { type: 'heading', level: 4, text: 'For fresh IT graduates' },
        {
          type: 'list',
          ordered: true,
          items: [
            { lead: 'Replace the school signal with a work signal.', text: 'Ship two or three real projects, such as a deployed web app, an API or an LLM-integrated tool. Show them in a portfolio and on GitHub with clear READMEs, tests and live links. Put the links at the top of the résumé.' },
            { lead: 'Be visibly AI-fluent, and visibly better than the AI.', text: 'Show that you can prompt, review, test and debug AI-generated code. Reviewing and verifying AI output is the skill employers rank highest.' },
            { lead: 'Earn recognized third-party credentials.', text: 'Cloud (AWS, Azure, GCP), security (CompTIA Security+) or data certifications are standardized signals that do not depend on your school.' },
            { lead: 'Write résumés for both machines and people.', text: `Mirror the job post's skill keywords, use a plain format that screening software can read, and quantify what your projects did.` },
            { lead: 'Get around the screen, not only through it.', text: 'Referrals, alumni networks, tech meetups, hackathons and direct messages to engineering leads put you in front of a human first.' },
            { lead: 'Use routes that judge work samples.', text: 'Freelancing, open-source contributions, startup roles and paid internships produce the experience that entry postings now ask for.' },
            { lead: 'Target employers that already hire from your region or school.', text: 'Regional IT-BPM hubs, GCCs with skills tests, fintech and healthcare IT, and companies running graduate pooling or trainee programs.' },
          ],
        },
        { type: 'heading', level: 4, text: 'For SUCs, lesser-known schools and CHED' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Build industry partnerships and internship pipelines. Internships are how employers discover graduates of schools they do not already recruit from.',
            'Go beyond the CHED minimum without waiting for the next revision: add specialization tracks in AI, data, cloud or cybersecurity using the existing elective units.',
            `Set up an industry advisory board that reviews the curriculum every year, as UP's computer science department does.`,
            'Integrate AI-assisted development, testing and AI evaluation into BSIT and BSCS core courses, not only electives.',
            'Make capstones industry-sponsored and deployable, so graduates leave with public portfolio evidence.',
            'Pursue outside quality marks (CHED COD/COE status, PAASCU or ABET). Batangas State shows an SUC can earn them.',
            'Run active career offices: employer days, alumni mentoring, and résumé and portfolio reviews.',
            'Track not only whether graduates are employed but whether the job is in IT. CHED should revive a national graduate tracer survey that reports outcomes by school type and program.',
            'Teach transversal skills (critical thinking, communication, adaptability) explicitly, since PIDS finds these weak.',
          ],
        },
        { type: 'heading', level: 4, text: 'For employers and IBPAP' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Adopt skills-based hiring for entry roles: practical tests, take-home tasks and portfolio reviews instead of school-name filters.',
            'Audit AI résumé-screening tools for school and regional bias, and keep a human review of rejected candidates.',
            'Keep paid apprenticeships and supervised progression so juniors can still learn the job (Punongbayan, 2026). Recruit from regional SUCs, not only Metro Manila schools.',
            'Redesign entry roles around AI supervision, quality assurance and workflow integration rather than removing them.',
            `Publish age-disaggregated hiring data so AI's effect on new entrants can be measured.`,
          ],
        },
        { type: 'heading', level: 4, text: 'For government (DOLE, DICT, DTI, TESDA, PSA)' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tie publicly funded upskilling to demonstrated employer demand, and measure it by placement, retention and earnings (Punongbayan, 2026).',
            'Add field-of-study and industry detail to youth labor statistics, so IT graduate outcomes can be tracked.',
            `Put NAISR 2.0's talent and reskilling imperatives into funded, measurable programs focused on first-job entrants.`,
            'Strengthen social protection and reskilling support for displaced workers, as the IMF recommends.',
          ],
        },

        { type: 'heading', level: 3, number: '5.4', text: 'Recommendations for future research' },
        {
          type: 'list',
          items: [
            'A multi-school tracer study comparing time-to-first-job of BSIT and BSCS graduates from top-tier schools, flagship SUCs and lesser-known schools, 2022–2026 cohorts.',
            'A correspondence (audit) study sending matched résumés that differ only by school to Philippine IT job postings, with and without AI screening.',
            'A content analysis of Philippine IT job postings (JobStreet, LinkedIn, Indeed) from 2022 to 2026 for experience requirements, school preferences and AI-skill mentions.',
            'Interviews with HR and engineering managers in IT-BPM firms and GCCs on how AI changed entry-level headcount and screening.',
            'A replication of the Stanford payroll approach using SSS or BIR data, if access can be arranged.',
          ],
        },
      ],
    },
    {
      id: 'references',
      title: 'References',
      blocks: [
        {
          type: 'paragraph',
          text: 'APA 7th edition. Foundational works (Acemoglu & Restrepo; Autor et al.; Becker; Brynjolfsson, Li & Raymond; Cazzaniga et al.; Eloundou et al.; Felten et al.; Frey & Osborne; Pizzinelli et al.; Spence) are cited from their journal versions and were not re-opened for this study. Verify page details before submission.',
        },
        {
          type: 'references',
          items: [
            'Acemoglu, D., & Restrepo, P. (2019). Automation and new tasks: How technology displaces and reinstates labor. Journal of Economic Perspectives, 33(2), 3–30. https://doi.org/10.1257/jep.33.2.3',
            'Alzate, M. V. D., & Laurel, J. E. (2025). [Graduate tracer study of BSIT graduates of Isabela State University–Roxas Campus, 2009–2024; verify exact title]. International Journal of Pedagogy and Learning Community, 2(2), 53–64. https://ijplc.ppj.unp.ac.id/index.php/ijplc/article/download/18/20',
            'Amahan, P., Usita, M., Garcia, A., Escultor, M., & Alvarez, J. (2024). Tracer study of information technology graduates from the San Jose Campus of Occidental Mindoro State College, Philippines from 2018 to 2022. Mindoro Journal of Social Sciences and Development Studies, 1(1). https://journal.omsc.edu.ph/index.php/mjssds/article/download/7/5',
            'Autor, D. H., Levy, F., & Murnane, R. J. (2003). The skill content of recent technological change: An empirical exploration. The Quarterly Journal of Economics, 118(4), 1279–1333. https://doi.org/10.1162/003355303322552801',
            'Bartolome, L. O., Bisquera, C. A. D., Robles, M. J. R., Segundo, C. G., Tito, P. L. L., & Wais, A. H. (2026). [Tracer study of BSIT graduates, Nueva Vizcaya State University–Bayombong, 2021–2025; verify exact title]. Journal of Computer Sciences and Applications, 14(1), 15–20. https://doi.org/10.12691/jcsa-14-1-3',
            'Becker, G. S. (1964). Human capital: A theoretical and empirical analysis, with special reference to education. National Bureau of Economic Research.',
            'Bensi, L. P. (2024). Assessing employment outcomes and curriculum relevance of BSIT graduates batch 2021: A graduate tracer study at Nueva Ecija University of Science & Technology. International Journal of Research and Scientific Innovation, 11(11), 10–21. https://ideas.repec.org/a/bjc/journl/v11y2024i11p10-21.html',
            'Brynjolfsson, E., Chandar, B., & Chen, R. (2025, revised 2026). Canaries in the coal mine? Six facts about the recent employment effects of artificial intelligence [Working paper]. Stanford Digital Economy Lab. https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/',
            'Brynjolfsson, E., Chandar, B., & Chen, R. (2026, January 29). Canaries in the coal mine? [Conference presentation]. AI in Action Conference, World Bank. https://thedocs.worldbank.org/en/doc/caacf11a204418727a4640f724bbf3f9-0070062026/original/Ruyu-2.pdf',
            'Brynjolfsson, E., Li, D., & Raymond, L. (2025). Generative AI at work. The Quarterly Journal of Economics, 140(2), 889–942. https://doi.org/10.1093/qje/qjae044',
            'Cazzaniga, M., Jaumotte, F., Li, L., Melina, G., Panton, A. J., Pizzinelli, C., Rockall, E., & Tavares, M. M. (2024). Gen-AI: Artificial intelligence and the future of work (IMF Staff Discussion Note SDN/2024/001). International Monetary Fund.',
            'Commission on Higher Education. (2015). CMO No. 25, series of 2015: Revised policies, standards and guidelines for Bachelor of Science in Computer Science (BSCS), Bachelor of Science in Information Systems (BSIS), and Bachelor of Science in Information Technology (BSIT) programs. https://legacy.ched.gov.ph/2015-ched-memorandum-orders/',
            'Cucio, M., & Hennig, T. (2025). Artificial intelligence and the Philippine labor market: Mapping occupational exposure and complementarity (IMF Working Paper No. 25/43). International Monetary Fund. https://doi.org/10.5089/9798229001977.001',
            'De La Salle University. (n.d.). Bachelor of Science in Computer Science major in Software Technology. https://www.dlsu.edu.ph/?p=15954',
            'De La Salle University. (n.d.-b). Undergraduate degree programs, College of Computer Studies. https://www.dlsu.edu.ph/?p=8898',
            'De La Salle University. (n.d.-c). Computer Science honors program (BS–MS). https://www.dlsu.edu.ph/?p=30912',
            'De La Salle University. (n.d.-d). College of Computer Studies: History. https://www.dlsu.edu.ph/?p=9968',
            'Department of Trade and Industry. (2024, July 3). DTI drives AI innovation with National Roadmap 2.0 and CAIR launch. https://dti.gov.ph/news/dti-drives-ai-innovation-national-roadmap-2-0-cair-launch',
            'Desiderio, L. (2026, January 1). IT-BPM sector on track to hit $40 billion revenue goal. The Philippine Star. https://www.philstar.com/business/2026/01/01/2498004/it-bpm-sector-track-hit-40-billion-revenue-goal',
            'Dulnuan, L., Jr. (2020). Success factors of technology graduates in selected state universities and colleges of the Philippines: Basis for program enhancement. Asian Journal of Applied Research for Community Development and Empowerment, 4(2). https://garuda.kemdiktisaintek.go.id/documents/detail/2496025',
            'Eloundou, T., Manning, S., Mishkin, P., & Rock, D. (2024). GPTs are GPTs: Labor market impact potential of LLMs. Science, 384(6702), 1306–1308. https://doi.org/10.1126/science.adj0998',
            'Felten, E., Raj, M., & Seamans, R. (2021). Occupational, industry, and geographic exposure to artificial intelligence: A novel dataset and its potential uses. Strategic Management Journal, 42(12), 2195–2217. https://doi.org/10.1002/smj.3286',
            'Frey, C. B., & Osborne, M. A. (2017). The future of employment: How susceptible are jobs to computerisation? Technological Forecasting and Social Change, 114, 254–280. https://doi.org/10.1016/j.techfore.2016.08.019',
            'Gies College of Business. (2026, June 29). MSBA research examines bias in AI résumé screening. University of Illinois. https://giesbusiness.illinois.edu/news/2026/06/29/msba-research-examines-bias-in-ai-resume-screening',
            'Guimaras State University. (2024, November 6). BOR approves the revised curriculum of College of Science and Technology. https://cst.gsu.edu.ph/?p=3609',
            'GMA News. (2026, November). PH unemployment climbs to 5.4% in September 2026; jobless Filipinos at 2.86M. https://www.gmanetwork.com/news/money/economy/1008493/ph-unemployment-climbs-to-5-4-in-september-2026-jobless-filipinos-at-2-86m/story/',
            'Human Resources Online. (2026). Employment in the Philippines rose to 48.89mn in April 2026. https://www.humanresourcesonline.net/employment-in-the-philippines-rose-to-48-89mn-in-april-2026',
            'Huynh, P. (2026). Generative AI and jobs in the Philippines: Labour market exposure and policy implications [Research brief]. International Labour Organization. https://doi.org/10.54394/00033217',
            'Inquirer.net. (2024). Why Filipino workers, leaders need AI. Philippine Daily Inquirer. https://opinion.inquirer.net/174392/why-filipino-workers-leaders-need-ai',
            'Inquirer.net. (2026). IT-BPM firms brace for slower growth until 2028 [Inquirer Plus]. https://plus.inquirer.net/?p=427692',
            `Inquirer.net. (2016). Which school is most preferred by employers? It's not from 'Big 4'. Philippine Daily Inquirer. https://newsinfo.inquirer.net/?p=774086`,
            'Inquirer.net. (n.d.). Jobstreet: More employers prefer graduates from top universities. Philippine Daily Inquirer. https://newsinfo.inquirer.net/?p=592976',
            'Largoza, G. L., & Fernandez, C. G. (2025). Review of CHED policies, standards, and guidelines (PSGs) pre- and post-K to 12 reforms (Discussion Paper No. 2025-13). Philippine Institute for Development Studies. https://ideas.repec.org/p/phd/dpaper/dp_2025-13.html',
            `Malaya Business Insight. (2025). Women enrolled in master's programs outnumber men 7 to 3 — CHED. https://malaya.com.ph/news/women-enrolled-in-masters-programs-outnumber-men-7-to-3-ched`,
            'Manila Bulletin. (2023, July 1). Top 10 schools preferred by companies when hiring. https://mb.com.ph/2023/7/1/top-10-schools-preferred-by-companies-when-hiring',
            'Manila Bulletin. (2026, August 6). Fresh graduates struggle as June unemployment rises to 2.59 million. https://mb.com.ph/2026/08/06/fresh-graduates-struggle-as-june-unemployment-rises-to-259-million',
            'The Manila Times. (2026, June 14). AI and the entry-level squeeze in BPO. Republished by Newswav. https://newswav.com/article/ai-and-the-entry-level-squeeze-in-bpo-A2606_7zTAtn',
            'Microsoft Philippines. (2024, May 23). Microsoft and LinkedIn release 2024 Work Trend Index on AI use at work in the Philippines. https://news.microsoft.com/en-ph/2024/05/23/microsoft-and-linkedin-release-2024-work-trend-index-on-ai-use-at-work-in-the-philippines/',
            'National Economic and Development Authority. (2024, July 3). Message of support: Launch of the National AI Strategy Roadmap 2.0 and the Center for AI Research. https://depdev.gov.ph/?p=42459',
            'Navarro, A. (2023). Top Philippine schools preferred by employers. People Matters. https://sea.peoplemattersglobal.com/article/training-development/top-graduates-ph-schools-preferred-by-employers-41471',
            'Philippine Institute for Development Studies. (n.d.). New college grads mismatched to their jobs. https://pids.gov.ph/details/new-college-grads-mismatched-to-their-jobs',
            'Philippine Institute for Development Studies. (2024). Skills mismatch hampers Philippine economic growth, experts say. https://pids.gov.ph/details/news/in-the-news/skills-mismatch-hampers-philippine-economic-growth-experts-say',
            'Philippine Institute for Development Studies. (n.d.). Current Filipino workforce often lack soft skills to adapt to digital age: PIDS study. https://pids.gov.ph/details/news/press-releases/current-filipino-workforce-often-lack-soft-skills-to-adapt-to-digital-age-pids-study',
            'PSITE. (2016). CMO 25: Revised policies, standards, and guidelines for BSCS, BSIS, and BSIT programs [Regional convention presentation]. https://www.scribd.com/document/372510120/CMO-25-PSITE-Rgional-Convention-2016',
            'Polytechnic University of the Philippines. (n.d.). Bachelor of Science in Information Technology. https://www.pup.edu.ph/ous/iode/bsit',
            'Philippine Institute for Development Studies. (n.d.). Skills alignment, not credentials alone, key to workforce readiness. https://www.pids.gov.ph/details/news/press-releases/skills-alignment-not-credentials-alone-key-to-workforce-readiness-says-pids-study',
            `Philippine Institute for Development Studies. (2019). The 4th Philippine graduate tracer study: Examining higher education as pathway to employment, citizenship, and life satisfaction from the learner's perspective (Discussion Paper Series No. 2019-26). https://pidswebs.pids.gov.ph/CDN/PUBLICATIONS/pidsdps1926.pdf`,
            'Pizzinelli, C., Panton, A. J., Tavares, M. M., Cazzaniga, M., & Li, L. (2023). Labor market exposure to AI: Cross-country differences and distributional implications (IMF Working Paper No. 23/216). International Monetary Fund.',
            'Punongbayan, J. C. (2026, November 6). Philippine business process outsourcing amid AI: Will the resilience last? Fulcrum, ISEAS–Yusof Ishak Institute. https://fulcrum.sg/article/commentaries/philippine-business-process-outsourcing-amid-ai-will-the-resilience-last/',
            'Ramos, M. C. M. (2024). Graduate tracer study: Exploring the relationship between education and employment of BSIT graduates of Lyceum of the Philippines University–Batangas. Asia Pacific Journal of Management and Sustainable Development. https://research.lpubatangas.edu.ph/wp-content/uploads/2024/07/11.-APJMSD-2024-07.pdf',
            'The Philippine Star. (2026, January 29). IT-BPM revenues breach $40 billion mark. https://www.philstar.com/business/2026/01/29/2504140/it-bpm-revenues-breach-40-billion-mark/amp/',
            'The Philippine Star. (2007, March 26). Nine centers for excellence in IT education named. https://www.philstar.com/headlines/2007/03/26/391473/nine-centers-excellence-it-education-named',
            'The Philippine Star. (2011, October 6). More Mapúa programs now ABET accredited. https://philstar.com/other-sections/education-and-home/2011/10/06/734023/more-mapa-programs-now-abet-accredited',
            'The Philippine Star. (2015, October 8). TIP computing, IT programs gain Seoul Accord recognition. https://www.philstar.com/other-sections/education-and-home/2015/10/08/1508172/tip-computing-it-programs-gain-seoul-accord-recognition',
            'The Philippine Star. (2016, November 26). 3 Philippine universities in global employability rankings. https://philstar.com/headlines/2016/11/26/1645546/3-philippines-universities-global-employability-rankings',
            'The Philippine Star. (2025, June 19). Adamson, Mapúa enter QS world rankings. https://www.philstar.com/headlines/2025/06/19/2451762/adamson-mapua-enter-qs-world-rankings/amp/',
            'The Post. (2025). Batangas State University earns ABET re-accreditation for computing programs. https://thepost.net.ph/?p=72313',
            'SunStar. (2026). Filipino workers push ahead in AI use, Microsoft says. https://www.sunstar.com.ph/davao/filipino-workers-push-ahead-in-ai-use-microsoft-says',
            'Spence, M. (1973). Job market signaling. The Quarterly Journal of Economics, 87(3), 355–374. https://doi.org/10.2307/1882010',
            'University of Maryland Robert H. Smith School of Business. (2026, June 22). AI hiring tools may favor their own work, Smith study finds. https://www.rhsmith.umd.edu/news/ai-hiring-tools-may-favor-their-own-work-smith-study-finds',
            'University of Baguio. (2026, February 28). CHED RAISE 2026: AI in Philippine higher education. https://sdg.ubaguio.edu/?p=13429',
            'University of Cebu. (2024). BS Computer Science prospectus, effective school year 2024–2025. https://enrollment.uc.edu.ph/college/PROS/ITCS/(BSCS)2024-2025.pdf',
            'University of Santo Tomas. (n.d.). Bachelor of Science in Computer Science. https://www.ust.edu.ph/?p=20604',
            'University of the Philippines Diliman, Department of Computer Science. (n.d.). Undergraduate program. https://dcs.upd.edu.ph/academics/undergraduate-program',
            'University of the Philippines Diliman, Department of Computer Science. (n.d.-b). Bachelor of Science in Computer Science. https://dcs.upd.edu.ph/academics/undergraduate/programs/bscs',
            'University of the Philippines Diliman, Department of Computer Science. (n.d.-c). Our partnerships. https://dcs.upd.edu.ph/partnerships',
            'Virata, M. (2026, September 8). Youth jobseekers swell as joblessness hits 6%. Daily Tribune. https://tribune.net.ph/2026/09/08/youth-jobseekers-swell-as-joblessness-hits-6',
            'Daily Tribune. (2026, November 6). Unemployment rate rises to 5.4% — PSA. https://tribune.net.ph/2026/11/06/unemployment-rate-rises-to-54-psa',
            'Daily Tribune. (2026, February 14). EDCOM flags sluggish review on higher education curriculum. https://tribune.net.ph/2026/02/14/edcom-flags-sluggish-review-on-higher-education-curriculum',
            'Wikipedia. (n.d.). Higher education in the Philippines. Retrieved November 25, 2026, from https://en.wikipedia.org/wiki/Higher_education_in_the_Philippines (replace with the cited CHED statistics before submission)',
            'Wilson, K., Sim, M., Gueorguieva, A.-M., & Caliskan, A. (2025). No thoughts just AI: Biased LLM recommendations limit human agency in resume screening [Preprint]. arXiv. https://arxiv.org/abs/2509.04404',
            'World Economic Forum. (2025). The future of jobs report 2025. https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
          ],
        },
      ],
    },
  ],
}

/** Newest first. */
// Newest first.
export const blogPosts: BlogPost[] = [afterGraduation, aiAndItFreshGraduates]

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug)
}

export function getPostFullTitle(post: BlogPost) {
  return post.subtitle ? `${post.title}: ${post.subtitle}` : post.title
}

export function formatPostDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${isoDate}T00:00:00Z`))
}

function blockText(block: BlogBlock): string[] {
  switch (block.type) {
    case 'paragraph':
      return [block.lead ?? '', block.text]
    case 'heading':
      return [block.text]
    case 'list':
      return block.items.map(item => (typeof item === 'string' ? item : `${item.lead} ${item.text}`))
    case 'table':
      return [block.caption, ...block.columns, ...block.rows.flat(), block.note ?? '']
    case 'references':
      return block.items
    case 'framework':
      return []
  }
}

/** Reading time at roughly 230 words per minute. */
export function getReadingMinutes(post: BlogPost) {
  const text = [
    post.title,
    post.subtitle ?? '',
    ...(post.intro ?? []),
    ...(post.abstract ?? []),
    ...post.sections.flatMap(section => [section.title, ...section.blocks.flatMap(blockText)]),
  ].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}
