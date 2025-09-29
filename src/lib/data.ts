// src/lib/data.ts
import type { PageView } from "@/types/view";
import home from "@/lib/content/mocks/home.json";
import about from "@/lib/content/mocks/about.json";
import services from "@/lib/content/mocks/services.json";
import brands from "@/lib/content/mocks/brands.json";
import whyus from "@/lib/content/mocks/why-us.json";

const pages: Record<string, PageView> = {
  "": home as PageView, // home at '/'
  about: about as PageView,
  services: services as PageView,
  brands: brands as PageView,
  "why-us": whyus as PageView,
};

export async function getPageBySlug(slug: string): Promise<PageView | null> {
  const key = slug === "home" || slug === "" ? "" : slug;
  return pages[key] ?? null;
}
