"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle" | "vertical";
    className?: string;
}

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    // If no slot ID is provided (dev mode), show a placeholder
    if (!process.env.NEXT_PUBLIC_ADSENSE_ID || process.env.NODE_ENV === 'development') {
        return (
            <div className={`w-full bg-muted/30 border border-dashed border-border rounded-lg flex flex-col items-center justify-center p-4 text-xs text-muted-foreground my-4 ${className}`} style={{ minHeight: '100px' }}>
                <span className="font-semibold mb-1">Advertisement</span>
                <span>AdSense Slot: {slot}</span>
                <span>Format: {format}</span>
            </div>
        );
    }

    return (
        <div className={`ad-container my-4 text-center ${className}`}>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Advertisement</div>
            <ins
                className="adsbygoogle block"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
