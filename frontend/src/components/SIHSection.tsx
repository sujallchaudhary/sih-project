'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const SIHSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What is Smart India Hackathon?
          </h2>
          <div className="max-w-5xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Smart India Hackathon (SIH)</strong> is a premier nationwide initiative designed to engage students in solving some of the most pressing challenges faced in everyday life. Launched to foster a culture of innovation and practical problem-solving, SIH provides a dynamic platform for students to develop and showcase their creative solutions to real-world problems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By encouraging participants to think critically and innovatively, the hackathon aims to bridge the gap between academic knowledge and practical application.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Since its inception, SIH has garnered significant success in promoting out-of-the-box thinking among young minds, particularly engineering students from across India. Each edition has built on the previous one, refining its approach and expanding its impact. The hackathon not only offers students an opportunity to showcase their skills but also encourages collaboration with industry experts, government agencies, and other stakeholders.
            </p>
          </div>
        </div>

        {/* SIH Flow Image */}
        <div className="mb-12">
          <Card className="overflow-hidden shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-4">
              <div className="relative w-full h-auto">
                <Image
                  src="/flow.png"
                  alt="Smart India Hackathon 2025 Timeline and Process Flow"
                  width={800}
                  height={500}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SIH Hub Disclaimer */}
        <div className="mb-12 max-w-4xl mx-auto">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Disclaimer - SIH Hub</h4>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    This SIH Hub is an <strong>unofficial platform</strong> designed to help students explore, organize, and collaborate on Smart India Hackathon problem statements. This platform is not affiliated with or endorsed by the official Smart India Hackathon organization. All problem statements and information are sourced from publicly available resources. For official registration, guidelines, and announcements, please refer to the official SIH website and channels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Problems</h3>
              <p className="text-sm text-gray-600">
                Pressing challenges from government departments, industries, and organizations seeking innovative solutions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation Culture</h3>
              <p className="text-sm text-gray-600">
                Foster critical thinking and bridge the gap between academic knowledge and practical application
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Collaborative Platform</h3>
              <p className="text-sm text-gray-600">
                Work alongside industry experts, government agencies, and stakeholders to develop impactful solutions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nationwide Impact</h3>
              <p className="text-sm text-gray-600">
                Premier initiative engaging engineering students across India in meaningful problem-solving
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Highlights */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Dates - SIH 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">Aug 2025</div>
              <div className="text-gray-800 font-medium">Problem Statement Launch</div>
              <div className="text-sm text-gray-600">Registration of SPOCs begins</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-2">Aug-Sep 2025</div>
              <div className="text-gray-800 font-medium">Internal Hackathon</div>
              <div className="text-sm text-gray-600">Team nominations and idea submissions</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-purple-600 mb-2">Dec 2025</div>
              <div className="text-gray-800 font-medium">SIH Grand Finale</div>
              <div className="text-sm text-gray-600">Final presentations and winner announcements</div>
            </div>
          </div>
        </div>

        {/* SIH Impact & Benefits */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Participate in Smart India Hackathon?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Bridge Academic-Industry Gap</h4>
                  <p className="text-gray-600 text-sm">Transform theoretical knowledge into practical, real-world solutions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">National Recognition</h4>
                  <p className="text-gray-600 text-sm">Gain recognition as part of India&apos;s premier innovation platform</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Skill Development</h4>
                  <p className="text-gray-600 text-sm">Enhance critical thinking and innovative problem-solving abilities</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Industry Collaboration</h4>
                  <p className="text-gray-600 text-sm">Network with experts, government agencies, and industry leaders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Impactful Solutions</h4>
                  <p className="text-gray-600 text-sm">Contribute to solving pressing challenges that affect everyday life</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Career Opportunities</h4>
                  <p className="text-gray-600 text-sm">Open doors to exciting career prospects and entrepreneurial ventures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SIHSection;
