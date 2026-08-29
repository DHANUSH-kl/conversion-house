import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ConversionHouse — Performance Marketing & Growth Studio",
    short_name: "ConversionHouse",
    description:
      "ConversionHouse is a performance marketing agency specializing in Meta Ads, Google Ads, lead generation, CRO, and conversion creative.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/CONVERION HOUSE LOGO .png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
