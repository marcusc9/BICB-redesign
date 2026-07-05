import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/programmes",
  "/programmes/children",
  "/programmes/junior-youth",
  "/get-involved",
  "/get-involved/youth",
  "/get-involved/adults",
  "/events",
  "/events/archive",
  "/schemes",
  "/calendar/ardwick",
  "/contact",
  "/safeguarding"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.communitybuildingmcr.co.uk";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-07-05"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
