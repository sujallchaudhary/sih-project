"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Users, 
  Trophy, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  Code,
  Lightbulb,
  Target
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Target,
      title: "Problem Statements",
      description: "Browse through 100+ curated problem statements from various government departments and organizations.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      href: "/problem-statements"
    },
    {
      icon: Users,
      title: "Team Formation",
      description: "Connect with like-minded developers, designers, and innovators to form the perfect team.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      href: "/teams"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access past year presentations, documentation, and winning solutions for inspiration.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      href: "/resources"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Monitor your hackathon journey, submissions, and team collaboration in real-time.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      href: "/dashboard"
    }
  ];

  const stats = [
    { label: "Problem Statements", value: "101", icon: Code },
    { label: "Categories", value: "14", icon: Lightbulb },
    { label: "Organizations", value: "22", icon: Users },
    { label: "Active Teams", value: "500+", icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8">
              <Zap className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Smart India
              </span>
              <br />
              <span className="text-gray-800">Hackathon Hub</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Your one-stop platform for SIH 2025. Discover problem statements, 
              form teams, and access learning resources to build innovative solutions 
              that transform India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/problem-statements">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Problems
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/teams">
                <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Find Teams
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 opacity-20">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code className="w-16 h-16 text-blue-500" />
            </motion.div>
          </div>
          
          <div className="absolute top-32 right-16 opacity-20">
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Lightbulb className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-lg mb-4">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From problem discovery to team formation and resource access, 
              we've got all the tools to make your SIH journey successful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden group cursor-pointer">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                    
                    <CardHeader className="pb-4">
                      <div className={`inline-flex items-center justify-center p-4 ${feature.bgColor} rounded-lg w-fit mb-4`}>
                        <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                      </div>
                      
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Innovation Journey?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of innovators who are already using our platform 
              to find problems, form teams, and build solutions that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/problem-statements">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  <Target className="w-5 h-5 mr-2" />
                  Browse Problems
                </Button>
              </Link>
              
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
