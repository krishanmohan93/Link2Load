import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer - Video Downloader Pro",
    description: "Read our Disclaimer to understand the limitations of liability and usage guidelines for Video Downloader Pro.",
};

export default function DisclaimerPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    Disclaimer
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 rounded-2xl border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-8">Last Updated: November 30, 2025</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. General Disclaimer</h2>
                    <p>
                        The information provided by Video Downloader Pro ("we," "us," or "our") on https://videodownloaderpro.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                    </p>
                    <p className="font-semibold mt-4">
                        UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. External Links Disclaimer</h2>
                    <p>
                        The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>
                    <p>
                        WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Legal Disclaimer</h2>
                    <p>
                        Video Downloader Pro is a tool designed to help users download videos for personal use. We do not host any copyrighted content on our servers. All videos are downloaded directly from the respective platforms' servers.
                    </p>
                    <p>
                        We strictly prohibit the use of our tool for downloading copyrighted material without the permission of the owner. Users are solely responsible for any copyright violations that may occur as a result of using this tool. By using Video Downloader Pro, you agree to abide by the copyright laws of your country and the terms of service of the respective platforms.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Affiliates Disclaimer</h2>
                    <p>
                        The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include the following:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Google AdSense</li>
                        <li>Amazon Associates</li>
                        <li>ClickBank</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Testimonials Disclaimer</h2>
                    <p>
                        The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.
                    </p>
                </div>
            </div>
        </div>
    );
}
