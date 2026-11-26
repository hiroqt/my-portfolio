import type { BlogPost } from '../blog'

/** Essay: what Arnel did after graduating, and what it taught him. */
export const afterGraduation: BlogPost = {
  slug: 'after-graduation-i-chose-to-build',
  kind: 'Essay',
  title: 'After Graduation, I Chose to Build',
  subtitle: 'My Journey Into AI',
  summary:
    'A look back at the workshops, hackathons, certifications, and bootcamp that followed graduation, and what I would tell other fresh grads.',
  author: '@Yhel',
  publishedAt: '2026-11-26',
  keywords: ['fresh graduates', 'AI', 'hackathons', 'eGov Hackathon', 'AWS', 'NVIDIA', 'certifications', 'Philippines'],
  intro: [
    `I come from a school where tech events were rare. There weren't enough of them for us to get real exposure to the industry beyond our classes.`,
    `My academic internship didn't go the way I hoped either. It was unpaid, and we rarely got to dive into real engineering work. Instead, we mostly took on parts of the staff's jobs or filled in as temporary replacements for them.`,
    `So after I graduated, I ran into a dilemma. The usual path is to send out résumés and look for a job. Instead, I found myself putting most of my energy into learning AI. This post is a look back at what I did, what I learned, and why I'm glad I took that path.`,
  ],
  sections: [
    {
      id: 'aws-workshop',
      title: 'Starting with a 9-week workshop at AWS',
      blocks: [
        {
          type: 'paragraph',
          text: `My journey began with a 9-week training workshop for the Amazon Users Group Philippines, held at the Amazon Web Services HQ in BGC. We covered Amazon Quick and its tools for automation, research, and AI assistant chat. The more I used it, the more potential I saw in the automation, the connectors, and the research features. It changed how I thought about what one person can build with the right tools.`,
        },
      ],
    },
    {
      id: 'first-hackathon',
      title: 'My first hackathon: eGov Hackathon 2026',
      blocks: [
        {
          type: 'paragraph',
          text: `After the workshop, we joined the eGov Hackathon 2026. It was my first hackathon ever. On my campus, tech events were limited, and we were rarely exposed to anything outside school, so I didn't even know how a hackathon worked.`,
        },
        {
          type: 'paragraph',
          text: `We passed the elimination round and made it to the top 36. After a technical interview, we became one of the teams that won 100k. Then, unexpectedly, we went from 200+ participants to 36, and finally to the top 5 finalists.`,
        },
        {
          type: 'paragraph',
          text: `For someone who had never joined a hackathon before, that still feels unreal.`,
        },
      ],
    },
    {
      id: 'tech-events',
      title: 'Saying yes to every tech event',
      blocks: [
        { type: 'paragraph', text: `Once I started, I kept going. Here are some of the events and builds I joined:` },
        {
          type: 'list',
          items: [
            `Build Build Overnights, hosted by the Amazon Users Group Philippines. I joined with a team from STI College Fairview. I was the only one not from their school, the "odd one in," and they still welcomed me.`,
            `Climate Track. We built a system that helps commuters and riders check whether a road in Metro Manila is passable before they head out, so they don't end up stranded.`,
            `AI Vision Forum Manila at Shangri-La, plus events by Google Cloud Manila, MongoDB, and many other communities.`,
            `Echelon 2026 and several community meetups.`,
            `A capstone finale hackathon at the end of an online workshop week. We had under 3 hours to build, and we weren't prepared. We still won Best Business Impact with a CRM dashboard built on Amazon Quick that captures leads, tracks KPIs, and more.`,
          ],
        },
        {
          type: 'paragraph',
          text: `Every event taught me something different. The biggest lesson is that you learn fastest when you ship under pressure.`,
        },
      ],
    },
    {
      id: 'certifications-internship',
      title: 'Certifications and an engineering internship',
      blocks: [
        {
          type: 'paragraph',
          text: `I also collected certifications, mostly free ones, to build my foundations. Recently I passed the Oracle AI Agentic Foundations Associate certification.`,
        },
        {
          type: 'paragraph',
          text: `I also joined a backend AI engineering internship with Flyrank AI. It's virtual and lasts almost 3 months. It's helping me strengthen my backend skills and learn how backend work fits into building AI systems.`,
        },
      ],
    },
    {
      id: 'nvidia-bootcamp',
      title: 'NVIDIA Developer Bootcamp',
      blocks: [
        {
          type: 'paragraph',
          text: `Most recently, I graduated as the only scholar in the NVIDIA Developer Bootcamp at De La Salle University Dasmariñas. It was a 3-day event on machine learning and AI. We looked at how AI works behind the surface, and how a model goes from a raw dataset to a working AI.`,
        },
      ],
    },
    {
      id: 'why-i-keep-going',
      title: 'Why I keep doing this',
      blocks: [
        {
          type: 'paragraph',
          text: `Honestly, part of me was afraid of being replaced by AI. But I'm not that scared anymore. I've proven to myself that I can use AI well. I can use it for coding, for building bots, and for making real things work.`,
        },
        {
          type: 'paragraph',
          text: `A lot of that comes from studying on my own. I research how to code properly with AI. I read about context management, context windows, harness engineering, and context graph engineering, and I try to understand the jargon well enough to apply it. I do that because I want to be really good at it, not just familiar with the words.`,
        },
      ],
    },
    {
      id: 'advice',
      title: `What I'd tell other fresh grads`,
      blocks: [
        {
          type: 'list',
          items: [
            { lead: `You don't need to be exposed to tech events to start.`, text: `I wasn't. Show up anyway.` },
            { lead: `Join even when you're not ready.`, text: `My Best Business Impact win came from a build we weren't prepared for.` },
            { lead: `Be the odd one in.`, text: `Joining a team from another school was uncomfortable, and it was worth it.` },
            { lead: `Learn in public and keep proof.`, text: `Certificates, projects, and wins are the evidence that you can do the work.` },
            { lead: `Study the fundamentals yourself.`, text: `Tools change quickly, but understanding how things work underneath stays useful.` },
          ],
        },
        {
          type: 'paragraph',
          text: `I'm still early in this journey, and there's a lot more to build. If you're also figuring out what to do after graduation, I hope this shows that there's more than one way to start.`,
        },
        { type: 'paragraph', text: `Thanks for reading!` },
      ],
    },
  ],
}
