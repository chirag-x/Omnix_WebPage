/**
 * Single source of truth for project-wide configuration.
 * Update these values to point to the real repository, version, or domain.
 */
export const config = {
  brand: "Omnix",
  tagline: "Most assistants answer. Omnix acts.",
  version: "V6",
  status: "Active development",
  githubUrl: "https://github.com/omnix/omnix",
  docsUrl: "https://github.com/omnix/omnix#readme",
  social: {
    twitter: "",
  },
  /**
   * Live agent endpoint. When set, the interactive demo will call this
   * Netlify Function (or any compatible endpoint) to stream a real agent
   * response. Leave empty to fall back to the frontend simulation.
   */
  liveAgent: {
    endpoint: "/api/run",
    enabled: true, // set to false to force the local simulation
  },
} as const;
