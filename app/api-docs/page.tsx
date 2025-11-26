"use client";

import { useState } from "react";

export default function APIDocsPage() {
    const [apiKey, setApiKey] = useState("your-api-key-here");

    const codeExamples = {
        curl: `curl -X POST https://videodownloaderpro.com/api/download \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${apiKey}" \\
  -d '{"url": "https://youtube.com/watch?v=example"}'`,

        javascript: `const response = await fetch('https://videodownloaderpro.com/api/download', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': '${apiKey}'
  },
  body: JSON.stringify({
    url: 'https://youtube.com/watch?v=example'
  })
});

const data = await response.json();
console.log(data);`,

        python: `import requests

url = "https://videodownloaderpro.com/api/download"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "${apiKey}"
}
data = {
    "url": "https://youtube.com/watch?v=example"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,

        php: `<?php
$url = "https://videodownloaderpro.com/api/download";
$data = array("url" => "https://youtube.com/watch?v=example");

$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\\r\\n" .
                     "X-API-Key: ${apiKey}\\r\\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
print_r(json_decode($result));
?>`
    };

    const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof codeExamples>('curl');

    return (
        <div className="min-h-screen section-padding">
            <div className="container-custom max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="heading-xl gradient-text mb-6">API Documentation</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Integrate video downloading functionality into your applications with our powerful REST API
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="card-modern text-center">
                        <h3 className="font-bold text-xl mb-2">Free Tier</h3>
                        <div className="text-4xl font-black gradient-text mb-4">$0</div>
                        <p className="text-muted-foreground mb-6">Perfect for testing</p>
                        <ul className="text-sm text-left space-y-2 mb-6">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>100 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Basic support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>All platforms</span>
                            </li>
                        </ul>
                        <button className="btn-outline w-full">Get Started</button>
                    </div>

                    <div className="card-modern text-center border-2 border-primary relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white rounded-full text-sm font-bold">
                            POPULAR
                        </div>
                        <h3 className="font-bold text-xl mb-2">Pro</h3>
                        <div className="text-4xl font-black gradient-text mb-4">$29</div>
                        <p className="text-muted-foreground mb-6">For growing apps</p>
                        <ul className="text-sm text-left space-y-2 mb-6">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>10,000 requests/day</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Webhook support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>99.9% uptime SLA</span>
                            </li>
                        </ul>
                        <button className="btn-primary w-full">Subscribe</button>
                    </div>

                    <div className="card-modern text-center">
                        <h3 className="font-bold text-xl mb-2">Enterprise</h3>
                        <div className="text-4xl font-black gradient-text mb-4">Custom</div>
                        <p className="text-muted-foreground mb-6">For large scale</p>
                        <ul className="text-sm text-left space-y-2 mb-6">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Unlimited requests</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Dedicated support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Custom integrations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>SLA guarantees</span>
                            </li>
                        </ul>
                        <button className="btn-outline w-full">Contact Sales</button>
                    </div>
                </div>

                {/* Quick Start */}
                <div className="card-modern mb-12">
                    <h2 className="heading-sm mb-6">Quick Start</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">1. Get Your API Key</h3>
                            <p className="text-muted-foreground mb-4">
                                Sign up for a free account to receive your API key. You'll find it in your dashboard.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="input-modern flex-1"
                                    placeholder="Enter your API key"
                                />
                                <button className="btn-primary">Copy</button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">2. Make Your First Request</h3>
                            <p className="text-muted-foreground mb-4">
                                Choose your preferred language and copy the code example below:
                            </p>

                            {/* Language Selector */}
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {Object.keys(codeExamples).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setSelectedLanguage(lang as keyof typeof codeExamples)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedLanguage === lang
                                                ? 'bg-primary text-white'
                                                : 'bg-secondary hover:bg-secondary/80'
                                            }`}
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            {/* Code Block */}
                            <div className="relative">
                                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                                    <code>{codeExamples[selectedLanguage]}</code>
                                </pre>
                                <button className="absolute top-4 right-4 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Reference */}
                <div className="card-modern mb-12">
                    <h2 className="heading-sm mb-6">API Reference</h2>

                    <div className="space-y-8">
                        {/* POST /api/download */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-green-500 text-white rounded-lg font-mono text-sm font-bold">
                                    POST
                                </span>
                                <code className="text-lg font-mono">/api/download</code>
                            </div>

                            <p className="text-muted-foreground mb-4">
                                Fetch video information and download links from a given URL.
                            </p>

                            <h4 className="font-semibold mb-2">Request Body</h4>
                            <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                                <pre className="text-sm"><code>{`{
  "url": "string" // Required: Video URL from supported platform
}`}</code></pre>
                            </div>

                            <h4 className="font-semibold mb-2">Response</h4>
                            <div className="bg-secondary/50 p-4 rounded-lg">
                                <pre className="text-sm"><code>{`{
  "platform": "YouTube",
  "title": "Video Title",
  "thumbnail": "https://...",
  "duration": "5:42",
  "uploader": "Channel Name",
  "views": "1.2M views",
  "description": "Video description...",
  "formats": [
    {
      "quality": "1080p",
      "format": "MP4",
      "size": "250 MB",
      "type": "video",
      "downloadUrl": "https://..."
    }
  ]
}`}</code></pre>
                            </div>
                        </div>

                        {/* Error Codes */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Error Codes</h3>
                            <div className="space-y-2">
                                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                                    <code className="font-mono font-bold">400</code>
                                    <span className="text-muted-foreground">Bad Request - Invalid or missing URL</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                                    <code className="font-mono font-bold">401</code>
                                    <span className="text-muted-foreground">Unauthorized - Invalid API key</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                                    <code className="font-mono font-bold">429</code>
                                    <span className="text-muted-foreground">Too Many Requests - Rate limit exceeded</span>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                                    <code className="font-mono font-bold">500</code>
                                    <span className="text-muted-foreground">Internal Server Error - Something went wrong</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rate Limits */}
                <div className="card-modern">
                    <h2 className="heading-sm mb-6">Rate Limits</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4">Plan</th>
                                    <th className="text-left py-3 px-4">Requests/Day</th>
                                    <th className="text-left py-3 px-4">Requests/Minute</th>
                                    <th className="text-left py-3 px-4">Concurrent</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border">
                                    <td className="py-3 px-4 font-semibold">Free</td>
                                    <td className="py-3 px-4">100</td>
                                    <td className="py-3 px-4">10</td>
                                    <td className="py-3 px-4">1</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <td className="py-3 px-4 font-semibold">Pro</td>
                                    <td className="py-3 px-4">10,000</td>
                                    <td className="py-3 px-4">100</td>
                                    <td className="py-3 px-4">10</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-semibold">Enterprise</td>
                                    <td className="py-3 px-4">Unlimited</td>
                                    <td className="py-3 px-4">Custom</td>
                                    <td className="py-3 px-4">Custom</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
