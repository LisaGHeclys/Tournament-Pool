"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";
import { Cookie } from "lucide-react";

export default function CookieConsentProvider() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Okay"
      cookieName="cookie-consent"
      disableButtonStyles
      disableStyles
      containerClasses="w-full gap-4 flex border bg-card fixed p-2 justify-center item-center"
      contentClasses="flex flex-row gap-1 bg-card text-card-foreground items-center justify-center"
      buttonClasses="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-8"
    >
      <Cookie />
      To make Tournament-Pool work, we log user data. By using Tournament-Pool,
      you agree to our Privacy Policy including cookie policy.
    </CookieConsent>
  );
}
