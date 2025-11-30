"use client";

import { useState } from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        We'd love to hear from you. Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-card p-8 rounded-3xl border border-border shadow-sm h-full">
                            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                        <EnvelopeIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                        <p className="text-muted-foreground mb-2">Our friendly team is here to help.</p>
                                        <a href="mailto:support@videodownloaderpro.com" className="text-primary font-medium hover:underline">support@videodownloaderpro.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                        <MapPinIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Office</h4>
                                        <p className="text-muted-foreground mb-2">Come say hello at our office HQ.</p>
                                        <p className="text-foreground font-medium">
                                            100 Smith Street<br />
                                            Collingwood VIC 3066 AU
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                        <PhoneIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Phone</h4>
                                        <p className="text-muted-foreground mb-2">Mon-Fri from 8am to 5pm.</p>
                                        <a href="tel:+15550000000" className="text-primary font-medium hover:underline">+1 (555) 000-0000</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-border">
                                <h4 className="font-bold text-lg mb-4">Connect with us</h4>
                                <div className="flex gap-4">
                                    {/* Social Icons */}
                                    <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                        <span className="text-xl">𝕏</span>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                        <span className="text-xl">f</span>
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300">
                                        <span className="text-xl">in</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary" />
                                <h3 className="text-2xl font-bold">Send us a Message</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium ml-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting" || status === "success"}
                                        className={`flex-1 md:flex-none md:w-48 py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 shadow-lg hover:shadow-primary/25 ${status === "success"
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "gradient-bg hover:opacity-90 transform hover:-translate-y-1"
                                            }`}
                                    >
                                        {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                                    </button>
                                    {status === "success" && (
                                        <p className="text-green-500 font-medium animate-fade-in">
                                            Thank you! We'll get back to you shortly.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
