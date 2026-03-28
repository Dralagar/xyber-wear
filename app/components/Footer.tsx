"use client";

import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: "XYBERWEAR",
      description: "Bridging physical fashion with the digital metaverse through innovative apparel and NFT integration.",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Partners", href: "/partners" },
      ],
    },
    shop: {
      title: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Apparel", href: "/products?category=Apparel" },
        { label: "Digital Assets", href: "/products?category=Digital" },
        { label: "Accessories", href: "/products?category=Accessories" },
        { label: "Limited Edition", href: "/products?featured=true" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Size Guide", href: "/size-guide" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "NFT Terms", href: "/nft-terms" },
        { label: "Intellectual Property", href: "/ip" },
      ],
    },
  };

  const socialLinks = [
    { name: "Instagram", icon: "📱", url: "#", color: "hover:text-pink-500" },
    { name: "Twitter", icon: "🐦", url: "#", color: "hover:text-blue-400" },
    { name: "Discord", icon: "💬", url: "#", color: "hover:text-indigo-400" },
    { name: "YouTube", icon: "📺", url: "#", color: "hover:text-red-500" },
    { name: "TikTok", icon: "🎵", url: "#", color: "hover:text-purple-400" },
    { name: "GitHub", icon: "🐙", url: "#", color: "hover:text-gray-400" },
  ];

  const paymentMethods = [
    "💳 Visa", "💳 Mastercard", "💳 Amex", "💰 PayPal", "₿ Bitcoin", "✦ Ethereum", "🪙 Solana"
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Stay Cyber Connected</h3>
            <p className="text-gray-400 mb-6">
              Get exclusive drops, NFT airdrops, and early access to new collections.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Subscribe
              </button>
            </form>
            {subscribeStatus === "success" && (
              <p className="mt-3 text-sm text-green-400">✓ Thanks for subscribing! Check your inbox.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                XYBERWEAR
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {footerSections.company.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-all ${social.color} hover:scale-110 text-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{footerSections.shop.title}</h4>
            <ul className="space-y-2">
              {footerSections.shop.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{footerSections.support.title}</h4>
            <ul className="space-y-2">
              {footerSections.support.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{footerSections.legal.title}</h4>
            <ul className="space-y-2">
              {footerSections.legal.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Monday - Friday: 9am - 6pm EAT</p>
              <p>Saturday: 10am - 4pm EAT</p>
              <p>Sunday: Closed</p>
              <p className="mt-3">Support: 24/7 via email & chat</p>
            </div>
          </div>
        </div>

        {/* Payment Methods & Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method) => (
                <span key={method} className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                  {method}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <span className="text-xs text-gray-500">🔒 Secure Payments</span>
              <span className="text-xs text-gray-500">✨ NFT Verified</span>
              <span className="text-xs text-gray-500">🚚 Worldwide Shipping</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Xyberwear. All rights reserved. Wear the Future, Own the Digital.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Xyberwear is a phygital fashion brand bridging physical apparel with blockchain technology.
            Every product comes with a unique NFT, empowering creators and collectors in the metaverse.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;