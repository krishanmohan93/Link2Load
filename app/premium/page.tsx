"use client";

import { CheckIcon } from "@heroicons/react/24/outline";

export default function PremiumPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for casual users",
            features: [
                "Download videos in HD quality",
                "100 downloads per day",
                "Basic platform support",
                "Standard download speed",
                "Ad-supported experience",
                "Community support"
            ],
            cta: "Current Plan",
            highlighted: false
        },
        {
            name: "Premium",
            price: "$9.99",
            period: "per month",
            description: "Best for power users",
            features: [
                "Download in 4K quality",
                "Unlimited downloads",
                "All platforms supported",
                "10x faster download speed",
                "Ad-free experience",
                "Priority support",
                "Batch download playlists",
                "Download history sync",
                "Chrome extension access",
                "Early access to new features"
            ],
            cta: "Upgrade to Premium",
            highlighted: true
        },
        {
            name: "Lifetime",
            price: "$99",
            period: "one-time payment",
            description: "Best value - pay once, use forever",
            features: [
                "Everything in Premium",
                "Lifetime access",
                "No recurring fees",
                "Future updates included",
                "API access (10K req/month)",
                "White-label option",
                "Dedicated account manager",
                "Custom integrations",
                "Priority feature requests"
            ],
            cta: "Get Lifetime Access",
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="hero-bg section-padding">
                <div className="container-custom text-center">
                    <h1 className="heading-xl gradient-text mb-6">
                        Upgrade to Premium
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Unlock unlimited downloads, 4K quality, and ad-free experience.
                        Choose the plan that works best for you.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <div className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">30-day money-back guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm">Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`card-modern relative ${plan.highlighted
                                        ? 'border-2 border-primary shadow-2xl scale-105'
                                        : ''
                                    }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 gradient-bg text-white rounded-full text-sm font-bold shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <div className="mb-2">
                                        <span className="text-5xl font-black gradient-text">{plan.price}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{plan.period}</p>
                                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`w-full ${plan.highlighted
                                            ? 'btn-primary'
                                            : 'btn-outline'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="section-padding bg-secondary/30">
                <div className="container-custom max-w-5xl">
                    <h2 className="heading-md gradient-text text-center mb-12">
                        Feature Comparison
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full card-modern">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-4 px-6">Feature</th>
                                    <th className="text-center py-4 px-6">Free</th>
                                    <th className="text-center py-4 px-6">Premium</th>
                                    <th className="text-center py-4 px-6">Lifetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Download Quality", free: "Up to HD", premium: "Up to 4K", lifetime: "Up to 4K" },
                                    { feature: "Daily Downloads", free: "100", premium: "Unlimited", lifetime: "Unlimited" },
                                    { feature: "Download Speed", free: "Standard", premium: "10x Faster", lifetime: "10x Faster" },
                                    { feature: "Ad-Free", free: "❌", premium: "✅", lifetime: "✅" },
                                    { feature: "Batch Downloads", free: "❌", premium: "✅", lifetime: "✅" },
                                    { feature: "API Access", free: "❌", premium: "❌", lifetime: "✅" },
                                    { feature: "Support", free: "Community", premium: "Priority", lifetime: "Dedicated" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="border-b border-border last:border-0">
                                        <td className="py-4 px-6 font-semibold">{row.feature}</td>
                                        <td className="py-4 px-6 text-center text-muted-foreground">{row.free}</td>
                                        <td className="py-4 px-6 text-center font-semibold text-primary">{row.premium}</td>
                                        <td className="py-4 px-6 text-center font-semibold text-primary">{row.lifetime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding">
                <div className="container-custom max-w-4xl">
                    <h2 className="heading-md gradient-text text-center mb-12">
                        Premium FAQ
                    </h2>

                    <div className="space-y-6">
                        <div className="card-modern">
                            <h3 className="font-bold text-lg mb-2">How does the 30-day money-back guarantee work?</h3>
                            <p className="text-muted-foreground">
                                If you're not satisfied with Premium within 30 days of purchase, contact our support team
                                for a full refund. No questions asked.
                            </p>
                        </div>

                        <div className="card-modern">
                            <h3 className="font-bold text-lg mb-2">Can I cancel my subscription anytime?</h3>
                            <p className="text-muted-foreground">
                                Yes! You can cancel your Premium subscription at any time from your account settings.
                                You'll continue to have access until the end of your billing period.
                            </p>
                        </div>

                        <div className="card-modern">
                            <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                            <p className="text-muted-foreground">
                                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and
                                cryptocurrency payments.
                            </p>
                        </div>

                        <div className="card-modern">
                            <h3 className="font-bold text-lg mb-2">Is the Lifetime plan really lifetime?</h3>
                            <p className="text-muted-foreground">
                                Yes! Pay once and get access forever. This includes all future updates and new features.
                                It's the best value if you plan to use the service long-term.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding gradient-bg text-white">
                <div className="container-custom text-center">
                    <h2 className="heading-lg mb-6">
                        Ready to Upgrade?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join thousands of users who have upgraded to Premium for unlimited downloads and 4K quality
                    </p>
                    <button className="btn-primary bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
                        Start Your Free Trial
                    </button>
                    <p className="text-sm mt-4 opacity-75">
                        7-day free trial • No credit card required
                    </p>
                </div>
            </section>
        </div>
    );
}
