"use client";

import React, { useState } from "react";
import Link from "next/link";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["Xyberwear HQ", "123 Cyber Street", "Nairobi, Kenya 00100"],
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+254 700 123 456", "+254 701 789 012", "Mon-Fri: 9am-6pm EAT"],
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["hello@xyberwear.com", "support@xyberwear.com", "partners@xyberwear.com"],
    },
    {
      icon: "💬",
      title: "Live Chat",
      details: ["Available 24/7", "Average response: 2 mins", "Click the chat icon below"],
    },
  ];

  const faqs = [
    {
      question: "What is phygital fashion?",
      answer: "Phygital fashion combines physical apparel with digital assets (NFTs). Every Xyberwear product comes with a unique digital twin that you can use in the metaverse.",
    },
    {
      question: "How do I mint my NFT?",
      answer: "After purchasing, you'll receive a unique code. Visit our NFT gallery, enter your code, and mint your NFT instantly. No crypto wallet required!",
    },
    {
      question: "What's your shipping policy?",
      answer: "We ship worldwide within 5-7 business days. Free shipping on orders over $100. Tracking provided for all orders.",
    },
    {
      question: "Can I return my product?",
      answer: "Yes, we offer 30-day returns for unworn items. Digital NFTs are non-refundable but can be transferred to another wallet.",
    },
    {
      question: "How do I customize my design?",
      answer: "Use our AI Design Studio to create custom designs. Upload images, add text, choose colors, and preview your creation in real-time.",
    },
    {
      question: "Are the NFTs compatible with all metaverses?",
      answer: "Our NFTs are compatible with major platforms including Decentraland, The Sandbox, VRChat, and more. Coming soon to more platforms!",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            Get in touch with the Xyberwear team. We're here to help you on your phygital fashion journey.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 text-center hover:border-purple-500 transition-all hover:scale-105"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-400 text-sm">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
            <p className="text-gray-400 mb-6">We'll get back to you within 24 hours</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="NFT Minting">NFT Minting Help</option>
                  <option value="Custom Design">Custom Design Request</option>
                  <option value="Partnership">Partnership Opportunity</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              
              {submitStatus === "success" && (
                <div className="p-3 rounded-lg bg-green-500/20 border border-green-500 text-green-400 text-sm text-center">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Map & Social */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
              <div className="h-64 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-gray-400">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-500 mt-2">Interactive map coming soon</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-purple-500/20 transition group">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-sm text-gray-400">Follow us on</p>
                    <p className="font-semibold text-white group-hover:text-purple-400">Instagram</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-purple-500/20 transition group">
                  <span className="text-2xl">🐦</span>
                  <div>
                    <p className="text-sm text-gray-400">Follow us on</p>
                    <p className="font-semibold text-white group-hover:text-purple-400">Twitter/X</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-purple-500/20 transition group">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-sm text-gray-400">Join our</p>
                    <p className="font-semibold text-white group-hover:text-purple-400">Discord</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-purple-500/20 transition group">
                  <span className="text-2xl">📺</span>
                  <div>
                    <p className="text-sm text-gray-400">Watch us on</p>
                    <p className="font-semibold text-white group-hover:text-purple-400">YouTube</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-gray-400 mb-8">Find quick answers to common questions</p>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition">
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;