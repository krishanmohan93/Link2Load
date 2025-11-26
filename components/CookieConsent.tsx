"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowConsent(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up no-print">
            <div className="container-custom max-w-4xl">
                <div className="glass-card p-6 md:p-8 shadow-2xl">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">🍪 Cookie Consent</h3>
                            <p className="text-sm text-muted-foreground">
                                We use cookies to enhance your browsing experience, serve personalized ads or content,
                                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                Read our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{' '}
                                <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for more information.
                            </p>
                        </div>
                        <button
                            onClick={declineCookies}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
                            aria-label="Close"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={acceptCookies}
                            className="btn-primary flex-1 sm:flex-initial"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={declineCookies}
                            className="btn-outline flex-1 sm:flex-initial"
                        >
                            Decline
                        </button>
                        <a
                            href="/cookies"
                            className="btn-secondary flex-1 sm:flex-initial text-center"
                        >
                            Customize
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
