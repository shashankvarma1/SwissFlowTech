import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "www.swissflowtech.com";
  return [
    { url: base,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/about`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/careers`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/contact`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}