"use client";
import React from "react";
import Footer from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { UserNav } from "@/components/navbar/user-nav";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav title="Privacy Policy" isBack backPath={"/"} centered />
      <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-center">
        <Card className="w-full md:w-2/3 pt-4">
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-current">Last updated : 12/11/2024</p>
            <p>
              The website Tournament-pool (
              <Link
                href={process.env.NEXT_PUBLIC_URL as string}
                className="text-blue-500"
              >
                {process.env.NEXT_PUBLIC_URL}
              </Link>
              ) is operated and maintained by Lisa Glaziou.
              <br />
              This page informs you of our policies regarding the collection,
              use, and disclosure of personal information we receive from users
              of the website.
            </p>
            <h1 className="pt-3 text-xl font-semibold">
              1. Information Collection and Use
            </h1>
            <h3>
              We collect information using OAuth 2.0 authentication with GitHub.
              When you log in or sign up via GitHub, we access certain
              information associated with your GitHub account, such as:
              <ul>
                <li>
                  &#8226; Personal Information: Your GitHub username, email
                  address, and profile picture (if provided).
                </li>
                <li>
                  &#8226; Public Information: Any public repositories or
                  projects linked to your GitHub account.
                </li>
              </ul>
              This information is used to create and manage your account, and
              personalize your experience on our platform. Additionally, we use
              Vercel Analytics to collect performance and user interaction data.
              This includes but is not limited to page views, session duration,
              and user interactions to help improve our platform’s performance
              and user experience.
            </h3>
            <h1 className="pt-3 text-xl font-semibold">2. Cookies</h1>
            <p>
              Cookies are files containing a small amount of data, which may
              include an anonymous unique identifier. Cookies are sent to your
              browser from a website and stored on your computer’s hard drive.
              You can configure your browser to refuse all cookies or to
              indicate when a cookie is sent. This site only uses cookies
              necessary for its proper functioning. These cookies are not used
              for tracking purposes. You are required to accept these cookies to
              use our site.
            </p>
            <h1 className="pt-3 text-xl font-semibold">3. Security</h1>
            <p>
              The security of your personal information is important to us.
              Development time has been dedicated to ensuring maximum security
              for all our users through the use of secure services. Please keep
              in mind that no method of transmission over the Internet or method
              of electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
            <h1 className="pt-3 text-xl font-semibold">
              4. Changes to this Privacy Policy
            </h1>
            <p>
              This privacy policy is effective as of the date above and will
              remain in effect. Any modifications to its provisions will be
              immediately applied after being published on this page. We reserve
              the right to update or change our privacy policy at any time, and
              you should periodically review this policy. Your continued use of
              the service after we have posted changes to the privacy policy on
              this page will constitute your acceptance of those changes and
              your consent to abide by and be bound by the updated privacy
              policy.
            </p>
            <h1 className="pt-3 text-xl font-semibold">5. Contact Us</h1>
            <p>
              If you have any questions regarding this privacy policy, please
              contact the lead developer via email at{" "}
              <Link
                href="mailto:lisa.glaziou@gmail.com"
                className="text-blue-500"
              >
                lisa.glaziou@gmail.com
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
