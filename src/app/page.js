import Footer from "@/components/Footer/footer";
import HomeClient from "@/components/HomeComponents/HomeClient";
import { createMetadata } from "@/components/Seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Lofida – your cozy corner of lo-fi vibes. Relax, listen, and vibe with the best aesthetic sounds.",
  OGImage: "https://lofida.app/LOFIDA.png",
  OGType: "website",
  canonicalUrl: "https://lofida.app/",
});

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <Footer />
    </>
  );
}
