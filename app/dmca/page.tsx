import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "DMCA Policy - Video Downloader Pro",
    description: "Read our DMCA Policy to understand how we handle copyright infringement claims at Video Downloader Pro.",
    openGraph: {
        title: "DMCA Policy - Video Downloader Pro",
        description: "Copyright infringement reporting procedure.",
        url: "https://videodownloaderpro.com/dmca",
        type: "website",
    },
};

export default function DmcaPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center">
                    DMCA Policy
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-8">Last Updated: November 30, 2025</p>

                    <p className="lead text-xl text-muted-foreground mb-8">
                        Video Downloader Pro respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at <a href="http://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.copyright.gov/legislation/dmca.pdf</a>, Video Downloader Pro will respond expeditiously to claims of copyright infringement committed using the Video Downloader Pro service and/or the Video Downloader Pro website (the "Site") if such claims are reported to Video Downloader Pro's Designated Copyright Agent identified in the sample notice below.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. DMCA Notice of Alleged Infringement ("Notice")</h2>
                    <p>
                        If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to Video Downloader Pro's Designated Copyright Agent. Upon receipt of Notice as described below, Video Downloader Pro will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Site.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Filing a DMCA Notice</h2>
                    <p>
                        To file a DMCA Notice, please provide the following information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Identify the copyrighted work that you claim has been infringed, or - if multiple copyrighted works are covered by this Notice - you may provide a representative list of the copyrighted works that you claim have been infringed.</li>
                        <li>Identify the material or link you claim is infringing (or the subject of infringing activity) and that access to which is to be disabled, including at a minimum, if applicable, the URL of the link shown on the Site where such material may be found.</li>
                        <li>Provide your mailing address, telephone number, and, if available, email address.</li>
                        <li>Include both of the following statements in the body of the Notice:
                            <ul className="list-disc pl-6 mt-2">
                                <li>"I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)."</li>
                                <li>"I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right under the copyright that is allegedly infringed."</li>
                            </ul>
                        </li>
                        <li>Provide your full legal name and your electronic or physical signature.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Counter-Notice</h2>
                    <p>
                        If you believe that your material that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notice containing the following information to the Copyright Agent:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 my-4">
                        <li>Your physical or electronic signature;</li>
                        <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;</li>
                        <li>A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and</li>
                        <li>Your name, address, telephone number, and email address, a statement that you consent to the jurisdiction of the federal court in San Francisco, California, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Designated Copyright Agent</h2>
                    <p>
                        All DMCA Notices and Counter-Notices should be sent to our Designated Copyright Agent at the following address:
                    </p>
                    <div className="bg-muted p-6 rounded-xl border border-border mt-4">
                        <p className="font-mono text-sm">
                            Video Downloader Pro<br />
                            Attn: Copyright Agent<br />
                            100 Smith Street<br />
                            Collingwood VIC 3066 AU<br />
                            Email: dmca@videodownloaderpro.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
