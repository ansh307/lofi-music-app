export const createMetadata = ({
  title = "Lofida",
  description = "Lofida – your cozy corner of lo-fi vibes. Relax, listen, and vibe with the best aesthetic sounds.",
  OGImage = "https://lofida.app/LOFIDA.png",
  OGType = "website",
  canonicalUrl = "https://lofida.app/",
  publishedDate = new Date().toISOString(),
}) => {
  return {
    title: `${title} | Lofida vibes`,
    description,
    metadataBase: new URL(canonicalUrl),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Lofida",
      images: [{ url: OGImage ||"/LOFIDA.png" }],
      type: OGType,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
      creator: "@Anshjz",
      images: [OGImage || "/LOFIDA.png"],
    },
    authors: [{ name: "Ansh Soni" }, { name: "ansh307" }],
    applicationName: "Lofida",
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16" },
        { url: "/favicon-32x32.png", sizes: "32x32" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      "article:section": "Lo-fi music & vibes",
      "article:published_time": publishedDate,
    },
  };
};
