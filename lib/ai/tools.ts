import { searchKnowledge, getProjectBySlug } from '../rag/retrieval';
import { portfolioChunks } from '../rag/knowledge';
import { projectsData } from '../data/projects';
import { AgentAction } from './types';

export const ALLOWED_NAV_DESTINATIONS: Record<string, { route: string; sectionId?: string }> = {
  home: { route: '/' },
  about: { route: '/', sectionId: 'education' },
  education: { route: '/', sectionId: 'education' },
  experience: { route: '/', sectionId: 'experience' },
  projects: { route: '/', sectionId: 'projects' },
  skills: { route: '/', sectionId: 'skills' },
  certifications: { route: '/', sectionId: 'certifications' },
  gallery: { route: '/', sectionId: 'gallery' },
  github: { route: '/', sectionId: 'github' },
  contact: { route: '/', sectionId: 'contact' }
};

export const AI_TOOL_DEFINITIONS = [
  {
    type: 'function' as const,
    function: {
      name: 'searchPortfolio',
      description: 'Search the portfolio knowledge base for facts about Arnel, his background, skills, projects, experience, certifications, and services.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query or keyword phrase (e.g. "Next.js projects", "hospital queuing AI", "IBM certifications").'
          },
          category: {
            type: 'string',
            enum: ['about', 'skills', 'experience', 'projects', 'services', 'achievements', 'education', 'faq'],
            description: 'Optional category filter to refine retrieval.'
          }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'getProject',
      description: 'Retrieve detailed information about a specific project by its slug (e.g., "e-buddy", "pacementor", "present-po", "yhel-os", "vcm-hris", "tearsize", "hivesync-va", "hospital-queuing-system", "tmrc").',
      parameters: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'The unique slug identifier of the project.'
          }
        },
        required: ['slug']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'listProjects',
      description: 'List all available projects in the portfolio, optionally filtered by tag or category.',
      parameters: {
        type: 'object',
        properties: {
          tag: {
            type: 'string',
            description: 'Optional technology tag filter (e.g., "TypeScript", "AI", "Flutter", "Next.js", "Laravel").'
          },
          featuredOnly: {
            type: 'boolean',
            description: 'Set to true to only return highlighted/featured projects.'
          }
        }
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'getSkills',
      description: 'Retrieve categorized technical skills and proficiencies.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['ai', 'frontend', 'backend', 'devops', 'all'],
            description: 'The skill category to inspect.'
          }
        }
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'navigate',
      description: 'Navigate the visitor to a specific section or page on the website (e.g. projects, skills, experience, contact, education, certifications).',
      parameters: {
        type: 'object',
        properties: {
          destination: {
            type: 'string',
            enum: ['home', 'about', 'education', 'experience', 'projects', 'skills', 'certifications', 'gallery', 'github', 'contact'],
            description: 'The target destination on the portfolio.'
          }
        },
        required: ['destination']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'openProject',
      description: 'Open the detailed project showcase page for a specific project (e.g., "e-buddy", "pacementor", "present-po", "yhel-os", "vcm-hris", "tearsize", "hivesync-va", "hospital-queuing-system", "tmrc").',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The unique slug identifier of the project to open.'
          }
        },
        required: ['projectId']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'openContact',
      description: 'Scroll the visitor directly to the contact and inquiry form section.',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'scrollToSection',
      description: 'Smooth scroll to a specific section ID on the home page.',
      parameters: {
        type: 'object',
        properties: {
          sectionId: {
            type: 'string',
            enum: ['education', 'experience', 'projects', 'skills', 'certifications', 'gallery', 'github', 'contact'],
            description: 'The HTML section ID to scroll to.'
          }
        },
        required: ['sectionId']
      }
    }
  }
];

export interface ToolExecutionResult {
  output: string;
  action?: AgentAction;
}

export function executeTool(name: string, args: Record<string, any>): ToolExecutionResult {
  switch (name) {
    case 'searchPortfolio': {
      const results = searchKnowledge(args.query || '', {
        category: args.category,
        limit: 5
      });
      if (results.length === 0) {
        return { output: 'No matching portfolio records found for this query.' };
      }
      const formatted = results
        .map(r => `[Title: ${r.chunk.title} | Category: ${r.chunk.category}]\n${r.chunk.content}`)
        .join('\n\n---\n\n');
      return { output: formatted };
    }

    case 'getProject': {
      const slug = args.slug?.toLowerCase().trim();
      const project = projectsData.find(p => p.slug.toLowerCase() === slug);
      if (!project) {
        const chunk = getProjectBySlug(slug);
        if (chunk) return { output: chunk.content };
        return { output: `Project with slug "${slug}" not found in portfolio.` };
      }
      return {
        output: JSON.stringify({
          title: project.title,
          slug: project.slug,
          type: project.type,
          summary: project.summary,
          tags: project.tags,
          features: project.features,
          content: project.content,
          isFeatured: project.isFeatured,
          link: project.link
        }, null, 2),
        action: {
          type: 'open_project',
          projectId: project.slug,
          label: `Open ${project.title}`
        }
      };
    }

    case 'listProjects': {
      let filtered = projectsData;
      if (args.tag) {
        const tagLower = args.tag.toLowerCase();
        filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase().includes(tagLower)));
      }
      if (args.featuredOnly) {
        filtered = filtered.filter(p => p.isFeatured);
      }
      const list = filtered.map(p => ({
        slug: p.slug,
        title: p.title,
        tags: p.tags,
        summary: p.summary,
        featured: p.isFeatured
      }));
      return { output: JSON.stringify(list, null, 2) };
    }

    case 'getSkills': {
      const skillsChunks = portfolioChunks.filter(c => c.category === 'skills');
      const text = skillsChunks.map(c => `### ${c.title}\n${c.content}`).join('\n\n');
      return { output: text };
    }

    case 'getExperience': {
      const expChunks = portfolioChunks.filter(c => c.category === 'experience');
      const text = expChunks.map(c => `### ${c.title}\n${c.content}`).join('\n\n');
      return { output: text };
    }

    case 'navigate': {
      const dest = args.destination?.toLowerCase() || 'home';
      const mapping = ALLOWED_NAV_DESTINATIONS[dest] || ALLOWED_NAV_DESTINATIONS.home;
      return {
        output: `Navigating user to ${dest}...`,
        action: {
          type: 'navigate',
          destination: dest,
          sectionId: mapping.sectionId,
          label: `Go to ${dest}`
        }
      };
    }

    case 'openProject': {
      const slug = args.projectId?.toLowerCase().trim();
      const proj = projectsData.find(p => p.slug.toLowerCase() === slug);
      const title = proj ? proj.title : slug;
      return {
        output: `Opening project "${title}" for user...`,
        action: {
          type: 'open_project',
          projectId: slug,
          label: `Open ${title}`
        }
      };
    }

    case 'openContact': {
      return {
        output: 'Scrolling user to the contact form section...',
        action: {
          type: 'open_contact',
          sectionId: 'contact',
          label: 'Contact Form'
        }
      };
    }

    case 'scrollToSection': {
      const sectionId = args.sectionId?.toLowerCase() || 'projects';
      return {
        output: `Scrolling to section "#${sectionId}"...`,
        action: {
          type: 'scroll_to_section',
          sectionId,
          label: `Jump to ${sectionId}`
        }
      };
    }

    default:
      return { output: `Unknown tool "${name}".` };
  }
}
