"use client";

import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  const team = [
    { name: "Alex Chen", role: "Founder & CEO", avatar: "AC", bio: "Former fashion tech executive with 10+ years experience" },
    { name: "Sarah Johnson", role: "Creative Director", avatar: "SJ", bio: "Digital artist and NFT pioneer" },
    { name: "Marcus Rivera", role: "Tech Lead", avatar: "MR", bio: "Blockchain architect with Web3 expertise" },
    { name: "Elena Zhang", role: "Community Manager", avatar: "EZ", bio: "Building the future of digital communities" },
  ];

  const milestones = [
    { year: "2024", title: "Company Founded", description: "Xyberwear was born from a vision to merge fashion with blockchain" },
    { year: "2024", title: "First Collection", description: "Launched Genesis Collection with 500 units sold out in 24 hours" },
    { year: "2025", title: "NFT Integration", description: "Pioneered phygital fashion with NFT-linked apparel" },
    { year: "2026", title: "Global Expansion", description: "Expanded to 50+ countries with 10K+ customers" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">About Xyberwear</h1>
          <p className="mx-auto max-w-2xl text-lg text-purple-100">
            We're on a mission to bridge the gap between physical fashion and the digital metaverse.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At Xyberwear, we believe fashion shouldn't be confined to the physical world. We're creating a new paradigm where every garment has a digital twin, and every digital asset has a physical counterpart.
              </p>
              <p className="text-gray-300">
                Through innovative technology and cutting-edge design, we're empowering creators and collectors to express themselves across both reality and the metaverse.
              </p>
              <div className="mt-6 flex gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">10K+</div>
                  <div className="text-sm text-gray-400">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">5K+</div>
                  <div className="text-sm text-gray-400">NFTs Minted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
              <div className="text-6xl mb-4 text-center">✨</div>
              <h3 className="text-xl font-bold text-white text-center mb-2">Wear the Future</h3>
              <p className="text-gray-400 text-center">Own the Digital</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🔮</div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation First</h3>
              <p className="text-gray-400">Constantly pushing boundaries in fashion and blockchain technology</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
              <p className="text-gray-400">Building with and for our community of creators and collectors</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold text-white mb-2">Sustainable Future</h3>
              <p className="text-gray-400">Committed to eco-friendly practices and digital sustainability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-purple-500/30 hidden md:block"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2"></div>
                <div className="relative md:w-1/2 pl-8 md:pl-0">
                  <div className="absolute left-0 md:left-auto w-8 h-8 rounded-full bg-purple-600 border-4 border-gray-900 z-10" style={{ left: index % 2 === 0 ? '-1rem' : 'auto', right: index % 2 !== 0 ? '-1rem' : 'auto' }}></div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 ml-4 md:ml-0">
                    <span className="text-purple-400 font-bold">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{milestone.title}</h3>
                    <p className="text-gray-400 mt-2">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                    {member.avatar}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold text-white">Join the Future of Fashion</h2>
              <p className="mx-auto mb-8 max-w-2xl text-purple-100">
                Be part of the revolution. Shop our collections, mint NFTs, and join our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="rounded-full bg-white px-8 py-3 font-semibold text-purple-600 transition-all hover:shadow-lg hover:scale-105">
                  Shop Now
                </Link>
                <Link href="/customize" className="rounded-full border border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10">
                  Start Creating
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;