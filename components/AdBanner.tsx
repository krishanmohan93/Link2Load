"use client";

interface AdBannerProps {
    slot: string;
}

export default function AdBanner({ slot }: AdBannerProps) {
    return (
        <div className="section-padding no-print">
            <div className="container-custom">
                <div className="ad-container">
                    <div className="text-center">
                        <p className="text-xs mb-2">Advertisement</p>
                        <p className="text-sm font-semibold">Google AdSense Placeholder - {slot}</p>
                        <p className="text-xs mt-2 opacity-70">
                            Replace with actual AdSense code in production
                        </p>
                    </div>
                    {/* In production, replace with actual AdSense code:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          */}
                </div>
            </div>
        </div>
    );
}
