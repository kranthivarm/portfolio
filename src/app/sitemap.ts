import type { MetadataRoute } from "next";

/* TODO: Replace with your actual domain after deployment */
const BASE_URL = "https://kranthi.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
