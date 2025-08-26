'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiService, ProblemStatement } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookmarkButton from '@/components/BookmarkButton';
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  ExternalLink, 
  Tag, 
  BookOpen,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  Play
} from 'lucide-react';
import Link from 'next/link';

const ProblemDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [problem, setProblem] = useState<ProblemStatement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchProblemDetail(params.id as string);
    }
  }, [params.id]);

  const fetchProblemDetail = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const problemData = await apiService.getProblemStatementById(id);
      setProblem(problemData);
    } catch (error) {
      console.error('Error fetching problem detail:', error);
      setError('Failed to load problem statement details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Problems
          </Button>
          
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {error || 'Problem Statement Not Found'}
              </h2>
              <p className="text-gray-600 mb-4">
                The problem statement you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
              </p>
              <Link href="/problems">
                <Button>
                  Browse All Problems
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Problems
        </Button>

        {/* Problem Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {problem.title}
              </h1>
              <p className="text-lg text-gray-600">{problem.summary}</p>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <div className="flex items-center gap-2">
                <BookmarkButton 
                  psId={problem._id} 
                  isBookmarked={problem.isBookmarked}
                  showText 
                />
                <Badge 
                  variant={problem.difficultyLevel === 'hard' ? 'destructive' : 'secondary'}
                  className="text-sm"
                >
                  {problem.difficultyLevel.charAt(0).toUpperCase() + problem.difficultyLevel.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">ID: {problem.id}</div>
            </div>
          </div>

          {/* Organization Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <Building className="h-5 w-5 mr-2" />
              <div>
                <div className="font-medium">{problem.organization}</div>
                <div className="text-sm text-gray-500">{problem.department}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2" />
              <div>
                <div className="font-medium">Last Updated</div>
                <div className="text-sm text-gray-500">
                  {new Date(problem.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Theme & Category */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {problem.theme}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {problem.category}
            </Badge>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3">
            {problem.youtube && (
              <Button variant="outline" size="sm" asChild>
                <a href={problem.youtube} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-2" />
                  Video
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            {problem.contact && (
              <Button variant="outline" size="sm" asChild>
                <a href={problem.contact} target="_blank" rel="noopener noreferrer">
                  <Users className="h-4 w-4 mr-2" />
                  Contact
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
            {problem.dataset && (
              <Button variant="outline" size="sm" asChild>
                <a href={problem.dataset} target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Dataset
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {problem.description}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Approach */}
            {problem.approach && problem.approach.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Suggested Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {problem.approach.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {problem.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Ready to Solve?</CardTitle>
                <CardDescription className="text-blue-700">
                  Start working on this problem statement and make a difference!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/problems">
                      Explore More Problems
                    </Link>
                  </Button>
                  {problem.contact && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={problem.contact} target="_blank" rel="noopener noreferrer">
                        Contact Organization
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
