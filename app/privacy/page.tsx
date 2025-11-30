import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Video Downloader Pro",
    description: "Read our Privacy Policy to understand how we collect, use, and protect your data at Video Downloader Pro.",
};

export default function PrivacyPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    Privacy Policy
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 rounded-2xl border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-8">Last Updated: November 30, 2025</p>

                    <p>
                        At Video Downloader Pro, accessible from https://videodownloaderpro.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Video Downloader Pro and how we use it.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                    <p>
                        We collect minimal information to provide our services. This may include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li><strong>Log Files:</strong> Like many other websites, Video Downloader Pro makes use of log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
                        <li><strong>Cookies:</strong> We use cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based on visitors' browser type or other information that the visitor sends via their browser.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect in various ways, including to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Find and prevent fraud</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Google AdSense & DoubleClick DART Cookie</h2>
                    <p>
                        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Third Party Privacy Policies</h2>
                    <p>
                        Video Downloader Pro's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                    <p>
                        Under the CCPA, among other rights, California consumers have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                        <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                        <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. GDPR Data Protection Rights</h2>
                    <p>
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>The right to access – You have the right to request copies of your personal data.</li>
                        <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                        <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                        <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                        <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Information</h2>
                    <p>
                        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                    </p>
                    <p>
                        Video Downloader Pro does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </p>
                </div>
            </div>
        </div>
    );
}
