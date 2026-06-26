export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "Royal French Crêpe",
    short_name: "Royal French Crêpe",
    description:
      "Authentic premium French crêpes & elegant mobile catering across Los Angeles, Las Vegas & California.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6efe4",
    theme_color: "#1a120b",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
