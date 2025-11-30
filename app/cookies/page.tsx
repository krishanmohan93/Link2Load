import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy - Video Downloader Pro",
    description: "Read our Cookie Policy to understand how Video Downloader Pro uses cookies to improve your experience.",
    openGraph: {
        title: "Cookie Policy - Video Downloader Pro",
        description: "Learn about how we use cookies at Video Downloader Pro.",
        url: "https://videodownloaderpro.com/cookies",
        type: "website",
    },
};

export default function CookiePolicyPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    Cookie Policy
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-8">Last Updated: November 30, 2025</p>

                    <p className="lead text-xl text-muted-foreground mb-8">
                        This Cookie Policy explains what cookies are, how we use them, the types of cookies we use, i.e., the information we collect using cookies and how that information is used, and how to control the cookie preferences.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. What are cookies?</h2>
                    <p>
                        Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. How do we use cookies?</h2>
                    <p>
                        As with most of the online services, our website uses first-party and third-party cookies for several purposes. First-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.
                    </p>
                    <p>
                        The third-party cookies used on our website are mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Types of Cookies we use</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Essential Cookies</h3>
                    <p>
                        Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Statistical Cookies</h3>
                    <p>
                        These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit, etc. These data help us understand and analyze how well the website performs and where it needs improvement. We use Google Analytics for this purpose.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Marketing Cookies</h3>
                    <p>
                        Our website displays advertisements. These cookies are used to personalize the advertisements that we show to you so that they are meaningful to you. These cookies also help us keep track of the efficiency of these ad campaigns.
                    </p>
                    <p>
                        The information stored in these cookies may also be used by the third-party ad providers (like Google AdSense) to show you ads on other websites on the browser as well.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">Functional Cookies</h3>
                    <p>
                        These are the cookies that help certain non-essential functionalities on our website. These functionalities include embedding content like videos or sharing content of the website on social media platforms.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. How can I control the cookie preferences?</h2>
                    <p>
                        Should you decide to change your preferences later through your browsing session, you can manage your cookies through your browser settings. Different browsers provide different methods to block and delete cookies used by websites. You can change the settings of your browser to block/delete the cookies.
                    </p>
                    <p>
                        To find out more about how to manage and delete cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">wikipedia.org</a>, <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a>.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Cookies</h2>
                    <p>
                        In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li><strong>Google Analytics:</strong> We use Google Analytics to measure how you interact with our website to improve your experience.</li>
                        <li><strong>Google AdSense:</strong> We use Google AdSense to display ads. Google uses cookies to serve ads based on your prior visits to our website or other websites.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
                    <p>
                        If you have any questions about our Cookie Policy, please contact us:
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
