import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yudiya Ahrian — Flutter & Fullstack Developer",
    short_name: "Yudiya.dev",
    description:
      "Flutter Developer & Fullstack Engineer building cross-platform mobile and web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#3B82F6",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "technology"],
  };
}
