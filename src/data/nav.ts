export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: "product", label: "Product", href: "#hero" },
  { id: "why", label: "Why Omnix", href: "#why" },
  { id: "architecture", label: "Architecture", href: "#architecture" },
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "demo", label: "Demo", href: "#demo" },
  { id: "roadmap", label: "Roadmap", href: "#roadmap" },
];
