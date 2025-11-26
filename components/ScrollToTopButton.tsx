"use client";

import React from "react";

export default function ScrollToTopButton() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
        >
            Start Downloading Now
        </button>
    );
}
