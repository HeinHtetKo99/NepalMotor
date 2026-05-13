'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Script from "next/script";
import ScrollToTop from "./ScrollToTop";
import { usePathname } from "next/navigation";

type SocialMediaProps = {
  label: string;
  src: string;
};

const socialMediaIcons: SocialMediaProps[] = [
  { label: "youtube", src: "/footerImage/youtube.png" },
  { label: "instagram", src: "/footerImage/instagram.png" },
  { label: "tiktok", src: "/footerImage/tiktok.png" },
  { label: "facebook", src: "/footerImage/facebook.png" },
  { label: "twitter", src: "/footerImage/twitter.png" },
  { label: "material-symbol", src: "/footerImage/material-symbol.png" },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full border-t border-line bg-surface text-foreground">
    <div className="w-full relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* header upper part */}
      <div className="w-full space-y-5">
        <div className="w-full flex items-center justify-between">
          <div className="flex-1">
            <h1 className="font-black uppercase tracking-wide text-2xl md:text-3xl text-foreground">Join Nepal Motors</h1>
            <p className="text-sm text-muted">
              Recieve pricing updates, shopping tips & more!
            </p>
          </div>
          {/* scroll up button */}
          <ScrollToTop />
        </div>
        <div className="w-full md:w-[40%]">
          <Script
            id="ghost-newsletter-signup"
            src="https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js"
            strategy="lazyOnload"
            data-button-color="#064706"
            data-button-text-color="#FFFFFF"
            data-site="https://biratinfo.com/"
            data-locale="en"
          />
        </div>
      </div>
      <div className="h-[1px] my-6 bg-line"></div>
      {/* header lower part */}
      <div className="w-full">
        <div className="flex flex-col gap-3 md:flex-row items-center md:justify-between justify-center ">
          {/* follow us part */}
          <div className="flex flex-col gap-3">
            <h1 className="font-light text-sm uppercase tracking-[0.2em] text-muted">Follow us</h1>
            <div className="flex items-baseline justify-center gap-7 ">
              {socialMediaIcons.map((socialIcon) => (
                <span
                  key={socialIcon.label}
                  className="inline-flex items-center justify-center rounded-full bg-background-soft p-2 ring-1 ring-line transition hover:bg-surface-2"
                >
                  <Image
                    height={20}
                    width={20}
                    src={socialIcon.src}
                    alt={socialIcon.label}
                    className="h-5 w-5 object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col item-center justify-start gap-2">
            <h1 className="font-light text-sm uppercase tracking-[0.2em] text-muted">
              Download the Nepal Motor App
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={"/#"} aria-label="Download on the App Store">
                <Image
                  src={"/footerImage/apple.png"}
                  width={160}
                  height={54}
                  alt={"Download on the App Store"}
                  className="h-12 w-auto"
                />
              </Link>

              <Link href={"/#"} aria-label="Get it on Google Play">
                <Image
                  src={"/footerImage/google.png"}
                  width={180}
                  height={54}
                  alt={"Get it on Google Play"}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start gap-10 lg:gap-8 justify-center text-sm pt-8">
          <div className="flex flex-col w-1/2 lg:w-[40%] gap-2 lg:flex-row justify-start items-center text-center xl:justify-between  lg:items-start lg:justify-between">
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Contact Us
            </Link>
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Careers
            </Link>
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Your Ad Choices
            </Link>
            <Link href={"/privacy-policy"} className="hover:text-[#f4c430] transition">
              Privacy Statement
            </Link>
          </div>
          <div className="flex lg:whitespace-nowrap flex-col w-1/2 lg:w-[60%] gap-2 lg:flex-row justify-start items-start text-left  xl:justify-between lg:items-start lg:justify-between">
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Visitor Agreement
            </Link>
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Accessibility
            </Link>
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Do Not Sell or Share My Personal Information
            </Link>
            <Link href={"/contact"} className="hover:text-[#f4c430] transition">
              Motor Information
            </Link>
          </div>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
