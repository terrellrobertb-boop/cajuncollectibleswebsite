import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeaderLogo, FooterLogo } from "@/components/layout/HeaderLogo";
import { TeaserUpvoteInit } from "@/components/TeaserUpvoteInit";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TeaserUpvoteInit />
      <Header logo={<HeaderLogo />} />
      <main className="flex-1">{children}</main>
      <Footer logo={<FooterLogo />} />
    </>
  );
}
