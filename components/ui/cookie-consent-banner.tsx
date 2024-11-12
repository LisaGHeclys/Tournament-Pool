"use client";

import React from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Okay"
      cookieName="cookie-consent"
      disableButtonStyles
      style={{ backgroundColor: "transparent", borderWidth: "1px" }}
      contentClasses="flex flex-row bg-card text-card-foreground"
      buttonClasses="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-4"
    >
      To make Tournament-Pool work, we log user data. By using Tournament-Pool,
      you agree to our Privacy Policy, including cookie policy.
    </CookieConsent>
  );
}
