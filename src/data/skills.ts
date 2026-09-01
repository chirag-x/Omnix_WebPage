export interface Skill {
  id: string;
  name: string;
  description: string;
  category: "web" | "system" | "files" | "communication";
  signature: string;
  example: string;
}

export const skills: Skill[] = [
  {
    id: "web-search",
    name: "web.search",
    description:
      "Open a browser, run a search query, and return the top results.",
    category: "web",
    signature: "web.search(query: string, limit?: number): Result[]",
    example: `web.search({ query: "AI agents 2026", limit: 5 })`,
  },
  {
    id: "web-navigate",
    name: "web.navigate",
    description:
      "Navigate the active browser to a URL and wait for the page to settle.",
    category: "web",
    signature: "web.navigate(url: string, opts?: { waitFor?: string }): void",
    example: `web.navigate({ url: "https://omnix.dev" })`,
  },
  {
    id: "app-launch",
    name: "app.launch",
    description: "Launch a desktop application by name or identifier.",
    category: "system",
    signature: "app.launch(target: string): AppHandle",
    example: `app.launch({ target: "Spotify" })`,
  },
  {
    id: "app-quit",
    name: "app.quit",
    description: "Quit a running application by name.",
    category: "system",
    signature: "app.quit(target: string): void",
    example: `app.quit({ target: "Spotify" })`,
  },
  {
    id: "file-find",
    name: "file.find",
    description: "Locate files on disk by name pattern and metadata.",
    category: "files",
    signature: "file.find(pattern: string, opts?: { kind?: string }): FileMatch[]",
    example: `file.find({ pattern: "*.pdf", kind: "document" })`,
  },
  {
    id: "file-read",
    name: "file.read",
    description: "Read the contents of a file at a given path.",
    category: "files",
    signature: "file.read(path: string, opts?: { maxBytes?: number }): string",
    example: `file.read({ path: "~/notes/today.md" })`,
  },
  {
    id: "clipboard-set",
    name: "clipboard.set",
    description: "Place text on the system clipboard.",
    category: "system",
    signature: "clipboard.set(text: string): void",
    example: `clipboard.set("Copied by Omnix")`,
  },
  {
    id: "notify",
    name: "notify.send",
    description: "Surface a system notification to the user.",
    category: "communication",
    signature: "notify.send(title: string, body?: string): void",
    example: `notify.send({ title: "Task complete", body: "Saved 3 files." })`,
  },
];
