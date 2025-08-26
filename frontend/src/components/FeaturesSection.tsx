import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Trophy, 
  Code,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  href 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string; 
  href: string; 
}) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Link href={href}>
        <Button variant="ghost" className="p-0 h-auto">
          Explore
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find problem statements using powerful filters by category, theme, organization, and technology stack.",
      href: "/problems"
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Filter by difficulty level, tags, tech stack, and more to find problems that match your skills.",
      href: "/problems"
    },
    {
      icon: BookOpen,
      title: "Detailed Information",
      description: "Get comprehensive details about each problem statement including approach, datasets, and contact info.",
      href: "/problems"
    },
    {
      icon: Code,
      title: "Tech Stack Insights",
      description: "Discover the technologies and tools recommended for each problem statement.",
      href: "/problems"
    },
    {
      icon: Users,
      title: "Organization Partners",
      description: "Explore problems from various government departments and leading organizations.",
      href: "/problems"
    },
    {
      icon: Trophy,
      title: "Difficulty Levels",
      description: "Choose problems that match your experience level from beginner to advanced challenges.",
      href: "/problems"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SIH Hub?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make SIH Hub the perfect platform for exploring 
            Smart India Hackathon problem statements and finding your next big challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
