import React from "react";
import Head from "next/head";

const Seo = ({
  title = "Lofida",
  description = "Lofida U+002d your cozy corner of lo-fi vibes. Relax, listen, and vibe with the best aesthetic sounds.",
  OGImage = "https://lofida.app/LOFIDA.png",
  OGType = "website",
  canonicalUrl = "https://lofida.app/",
  publishedDate = new Date(),
  children,
}) => {
  return (
    <React.Fragment>
      <Head>
        {/* basic metadata */}
        <title>{`${title} | Ansh Soni`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="author" content="Ansh Soni" />
        <meta name="author" content="ansh307" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#818cf8" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        
        {/* twitter metadata */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Anshjz" />
        <meta name="twitter:creator" content="@Anshjz" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OGImage} />

        {/* canonical link */}
        <link rel="canonical" href={canonicalUrl} />

        {/* open graph metadata */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={OGType} />
        <meta property="og:site_name" content="Lofida" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OGImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:section" content="Lo-fi music & vibes" />
        <meta property="article:published_time" content={publishedDate} />
        {children}
      </Head>
    </React.Fragment>
  );
};

export default Seo;
