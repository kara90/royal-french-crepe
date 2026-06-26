export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://royalfrenchcrepe.com/sitemap.xml",
    host: "https://royalfrenchcrepe.com",
  };
}
