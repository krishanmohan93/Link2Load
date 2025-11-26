"use client";

import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function VpnBanner() {
    return (
        <div className="my-8 p-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg no-print">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                        <ShieldCheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg md:text-xl">Protect Your Privacy while Downloading</h3>
                        <p className="text-sm text-muted-foreground">
                            Your IP address is exposed. Use a VPN to download videos anonymously and securely.
                        </p>
                    </div>
                </div>
                <a
                    // 💰 REPLACE THIS LINK with your actual affiliate link from Step 2
                    href="https://nordvpn.com/ref/id"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="whitespace-nowrap px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-md"
                >
                    Get 68% OFF VPN
                </a>
            </div>
        </div>
    );
}
