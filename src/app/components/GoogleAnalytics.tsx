'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-9QC14QB67Y';

export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
            </Script>
        </>
    );
}

// Event tracking functions
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Predefined events for your portfolio
export const analytics = {
    // Track resume download
    trackResumeDownload: () => {
        trackEvent('download', 'Resume', 'Gowtham_Resume_Fullstack.pdf');
    },

    // Track email click
    trackEmailClick: () => {
        trackEvent('click', 'Contact', 'Email Link');
    },

    // Track phone click
    trackPhoneClick: () => {
        trackEvent('click', 'Contact', 'Phone Link');
    },

    // Track LinkedIn click
    trackLinkedInClick: () => {
        trackEvent('click', 'Social', 'LinkedIn Profile');
    },

    // Track GitHub click
    trackGitHubClick: () => {
        trackEvent('click', 'Social', 'GitHub Profile');
    },

    // Track project view
    trackProjectView: (projectName: string) => {
        trackEvent('view', 'Project', projectName);
    },

    // Track section scroll
    trackSectionView: (sectionName: string) => {
        trackEvent('scroll', 'Section', sectionName);
    },

    // Track CTA button click
    trackCTAClick: (buttonName: string) => {
        trackEvent('click', 'CTA', buttonName);
    },
};

// TypeScript declaration for gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void;
        dataLayer: unknown[];
    }
}
