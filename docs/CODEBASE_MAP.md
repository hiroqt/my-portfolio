# Codebase Map

- [app/page.tsx](../app/page.tsx) renders the home page through [PortfolioShell.tsx](../components/PortfolioShell.tsx), which owns section order, in-page navigation, and the shared editorial layout.
- [StackShowcase.tsx](../components/sections/StackShowcase.tsx) presents technologies and work approach; [SkillsShowcase.tsx](../components/sections/SkillsShowcase.tsx) presents PixelCrew and Overdrive; [WorkShowcase.tsx](../components/sections/WorkShowcase.tsx) presents selected projects.
- [projects.ts](../lib/data/projects.ts) holds project records used by the portfolio and assistant; [lib/rag](../lib/rag) contains the assistant's retrieval knowledge.
- [PortfolioShell.module.css](../components/PortfolioShell.module.css) and section CSS modules style the page; [app/globals.css](../app/globals.css) defines shared theme tokens.
