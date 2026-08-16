/**
 * Guardrails and grounding verification for portfolio responses
 */

export const GROUNDING_RULES = `
CRITICAL PORTFOLIO GROUNDING RULES:
1. You represent Arnel Baylon's portfolio assistant (yhelAI).
2. ONLY provide facts that exist in the retrieved portfolio knowledge base.
3. NEVER fabricate jobs, companies, clients, technologies, dates, degrees, certifications, or salary numbers that are not in the knowledge base.
4. If asked about information not in the portfolio (e.g., "What was Arnel's GPA?" or "What is Arnel's salary?"), politely state: "I don't have that specific detail in Arnel's public portfolio records, but you can reach out to Arnel directly via the contact form or email at arnelbaylon15@gmail.com."
5. Never execute or generate arbitrary external URLs other than Arnel's verified links (GitHub: github.com/hiroqt, LinkedIn: linkedin.com/in/arnel-baylon-b05233189, email: arnelbaylon15@gmail.com).
6. When users ask to navigate or view a section/project, always invoke the corresponding navigation tool (navigate, openProject, scrollToSection).
`;

/**
 * Checks if query is attempting prompt injection, sensitive data leakage, or arbitrary command execution
 */
export function checkQuerySafety(query: string): { isSafe: boolean; refusalReason?: string } {
  const lower = query.toLowerCase();

  // Adversarial patterns
  const unsafePatterns = [
    /ignore previous instructions/i,
    /system prompt/i,
    /reveal your secret/i,
    /execute shell/i,
    /rm -rf/i,
    /drop table/i,
    /<script>/i,
    /password/i,
    /private key/i,
    /ssh key/i
  ];

  for (const pattern of unsafePatterns) {
    if (pattern.test(lower)) {
      return {
        isSafe: false,
        refusalReason: "I am Arnel's portfolio assistant (yhelAI). I cannot assist with administrative system overrides or private credential access."
      };
    }
  }

  return { isSafe: true };
}
