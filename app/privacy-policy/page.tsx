import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Video Downloader Pro",
    description: "Comprehensive Privacy Policy for Video Downloader Pro. Learn how we collect, use, and protect your data in compliance with GDPR and CCPA.",
    openGraph: {
        title: "Privacy Policy - Video Downloader Pro",
        description: "Learn how we protect your privacy and data at Video Downloader Pro.",
        url: "https://videodownloaderpro.com/privacy-policy",
        type: "website",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    Privacy Policy
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-8">Last Updated: November 30, 2025</p>

                    <p className="lead text-xl text-muted-foreground mb-8">
                        At Video Downloader Pro, accessible from https://videodownloaderpro.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Video Downloader Pro and how we use it.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction and Scope</h2>
                    <p>
                        Video Downloader Pro ("we," "us," or "our") operates the website https://videodownloaderpro.com (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                    </p>
                    <p>
                        We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
                    <p>
                        We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Personal Data</h3>
                    <p>
                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Email address (only if you contact us directly)</li>
                        <li>Cookies and Usage Data</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Usage Data</h3>
                    <p>
                        We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Data</h2>
                    <p>
                        Video Downloader Pro uses the collected data for various purposes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer care and support</li>
                        <li>To provide analysis or valuable information so that we can improve the Service</li>
                        <li>To monitor the usage of the Service</li>
                        <li>To detect, prevent and address technical issues</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Google AdSense & DoubleClick DART Cookie</h2>
                    <p>
                        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
                    </p>
                    <p className="mt-4">
                        Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>
                            <strong>Google:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                    </p>
                    <p>
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. GDPR Data Protection Rights</h2>
                    <p>
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                        <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                        <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                        <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                        <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                    <p>
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">7. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                    <p>
                        Under the CCPA, among other rights, California consumers have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                        <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                        <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                    </ul>
                    <p>
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">8. Children's Information</h2>
                    <p>
                        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                    </p>
                    <p>
                        Video Downloader Pro does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                    <p>
                        We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                    </p>
                    <p>
                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>By visiting this page on our website: <a href="/contact" className="text-primary hover:underline">https://videodownloaderpro.com/contact</a></li>
                        <li>By email: privacy@videodownloaderpro.com</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
