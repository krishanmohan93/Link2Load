"use client";

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Copy Video URL",
            description: "Copy the link of the video you want to download from any supported platform",
            icon: "📋"
        },
        {
            number: "02",
            title: "Paste & Analyze",
            description: "Paste the URL in our downloader and click 'Get Video' to fetch all available formats",
            icon: "🔍"
        },
        {
            number: "03",
            title: "Choose Quality",
            description: "Select your preferred quality from 144p to 4K, or convert to MP3 audio",
            icon: "⚙️"
        },
        {
            number: "04",
            title: "Download & Enjoy",
            description: "Click download and save the video to your device instantly",
            icon: "✅"
        }
    ];

    return (
        <section className="section-padding bg-secondary/30">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="heading-md gradient-text mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Download videos in 4 simple steps - it's that easy!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 z-0"></div>
                            )}

                            <div className="relative z-10 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center text-4xl shadow-xl transform hover:scale-110 transition-all duration-300">
                                    {step.icon}
                                </div>
                                <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-3">
                                    STEP {step.number}
                                </div>
                                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
