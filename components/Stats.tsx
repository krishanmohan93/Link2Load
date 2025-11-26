"use client";

export default function Stats() {
    const stats = [
        { value: "50M+", label: "Videos Downloaded" },
        { value: "2M+", label: "Active Users" },
        { value: "15+", label: "Platforms Supported" },
        { value: "99.9%", label: "Success Rate" }
    ];

    return (
        <section className="section-padding bg-gradient-to-br from-primary/5 to-purple-500/5">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
