'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiService, FilterOptions, ProblemStatement, FilterParams } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import BookmarkButton from '@/components/BookmarkButton';
import AddToTeamButton from '@/components/AddToTeamButton';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Tag,
  Building,
  BookOpen,
  Clock
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const ProblemCard = ({ problem }: { problem: ProblemStatement }) => (
  <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
    <CardHeader className="flex-shrink-0">
      <div className="flex justify-between items-start gap-2">
        <CardTitle className="text-xl leading-tight">{problem.title}</CardTitle>
        <div className="flex items-center gap-2">
          <BookmarkButton 
            psId={problem._id} 
            isBookmarked={problem.isBookmarked}
            size="icon" 
            variant="ghost" 
          />
          <Badge variant={problem.difficultyLevel === 'hard' ? 'destructive' : 'secondary'}>
            {problem.difficultyLevel}
          </Badge>
        </div>
      </div>
      <CardDescription className="text-sm leading-relaxed mt-3">{problem.summary}</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      <div className="flex-1">
        {/* Organization & Department */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            {problem.organization}
          </div>
          <div className="text-sm text-gray-500">{problem.department}</div>
        </div>

        {/* Theme & Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{problem.theme}</Badge>
          <Badge variant="outline">{problem.category}</Badge>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {problem.tags.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{problem.tags.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Tech Stack</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.techStack.slice(0, 5).map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {problem.techStack.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{problem.techStack.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Updated Date */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock className="h-3 w-3 mr-1" />
          Updated: {new Date(problem.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Action Buttons - Always at bottom */}
      <div className="mt-auto pt-4">
        <div className="flex gap-2">
          <Link href={`/problems/${problem.id}`} className="flex-1">
            <Button className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <AddToTeamButton 
            psId={problem._id} 
            isAddedToTeam={problem.isAddedToTeam}
            showText 
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProblemsPage = () => {
  const [problems, setProblems] = useState<ProblemStatement[]>([]);
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [tagSearch, setTagSearch] = useState('');
  const [techStackSearch, setTechStackSearch] = useState('');

  const fetchFilters = async () => {
    try {
      const filtersData = await apiService.getFilters();
      setFilters(filtersData);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const params: FilterParams = {
        page: pagination.currentPage,
        limit: itemsPerPage,
      };

      if (searchTerm) params.search = searchTerm;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedTheme && selectedTheme !== 'all') params.theme = selectedTheme;
      if (selectedOrganization && selectedOrganization !== 'all') params.organization = selectedOrganization;
      if (selectedDepartment && selectedDepartment !== 'all') params.department = selectedDepartment;
      if (selectedDifficulty && selectedDifficulty !== 'all') params.difficultyLevel = selectedDifficulty;
      if (selectedTags.length > 0) params.tags = selectedTags.join(',');
      if (selectedTechStack.length > 0) params.techStack = selectedTechStack.join(',');

      const response = await apiService.getProblemStatements(params);
      setProblems(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.currentPage,
    searchTerm,
    selectedCategory,
    selectedTheme,
    selectedOrganization,
    selectedDepartment,
    selectedDifficulty,
    selectedTags,
    selectedTechStack,
    itemsPerPage,
  ]);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTheme('all');
    setSelectedOrganization('all');
    setSelectedDepartment('all');
    setSelectedDifficulty('all');
    setSelectedTags([]);
    setSelectedTechStack([]);
    setTagSearch('');
    setTechStackSearch('');
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Problem Statements</h1>
          <p className="text-lg text-gray-600">
            Explore Smart India Hackathon problem statements and find your next challenge.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search and Quick Filters in one line */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search problem statements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 sm:h-auto"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {filters?.categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full sm:w-28">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {filters?.difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Advanced Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto whitespace-nowrap">
                      <Filter className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">More Filters</span>
                      <span className="sm:hidden">Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>
                      Apply detailed filters to find the perfect problem statement.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 pb-6">
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="tags">Tags</TabsTrigger>
                        <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-6 mt-6">
                        {/* Theme Filter */}
                        <div>
                          <Label>Theme</Label>
                          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Themes</SelectItem>
                              {filters?.themes.map((theme) => (
                                <SelectItem key={theme} value={theme}>
                                  {theme}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Organization Filter */}
                        <div>
                          <Label>Organization</Label>
                          <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select organization" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Organizations</SelectItem>
                              {filters?.organizations.map((org) => (
                                <SelectItem key={org} value={org}>
                                  {org}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Department Filter */}
                        <div>
                          <Label>Department</Label>
                          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Departments</SelectItem>
                              {filters?.departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Clear Filters */}
                        <Button onClick={clearFilters} variant="outline" className="w-full">
                          Clear All Filters
                        </Button>
                      </TabsContent>

                      <TabsContent value="tags" className="mt-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-medium">Tags</Label>
                            <p className="text-sm text-gray-600 mb-3">Search and select tags that interest you</p>
                          </div>
                          
                          {/* Tag Search */}
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search tags..."
                              value={tagSearch}
                              onChange={(e) => setTagSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          {/* Selected Tags Display */}
                          {selectedTags.length > 0 && (
                            <div className="p-3 bg-blue-50 rounded-md">
                              <p className="text-sm font-medium mb-2">Selected Tags ({selectedTags.length})</p>
                              <div className="flex flex-wrap gap-1">
                                {selectedTags.map((tag) => (
                                  <Badge 
                                    key={tag} 
                                    variant="default" 
                                    className="cursor-pointer text-xs"
                                    onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                                  >
                                    {tag} ×
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tags List */}
                          <div className="max-h-64 overflow-y-auto border rounded-md">
                            <div className="p-2 space-y-1">
                              {filters?.tags
                                ?.filter(tag => 
                                  tagSearch === '' || 
                                  tag.toLowerCase().includes(tagSearch.toLowerCase())
                                )
                                .map((tag) => (
                                <div key={tag} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                  <Checkbox
                                    id={`tag-${tag}`}
                                    checked={selectedTags.includes(tag)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedTags([...selectedTags, tag]);
                                      } else {
                                        setSelectedTags(selectedTags.filter(t => t !== tag));
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor={`tag-${tag}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                  >
                                    {tag}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tech" className="mt-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-base font-medium">Technology Stack</Label>
                            <p className="text-sm text-gray-600 mb-3">Search and select technologies you&apos;re interested in</p>
                          </div>
                          
                          {/* Tech Stack Search */}
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search technologies..."
                              value={techStackSearch}
                              onChange={(e) => setTechStackSearch(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          {/* Selected Tech Stack Display */}
                          {selectedTechStack.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-md">
                              <p className="text-sm font-medium mb-2">Selected Technologies ({selectedTechStack.length})</p>
                              <div className="flex flex-wrap gap-1">
                                {selectedTechStack.map((tech) => (
                                  <Badge 
                                    key={tech} 
                                    variant="default" 
                                    className="cursor-pointer text-xs"
                                    onClick={() => setSelectedTechStack(selectedTechStack.filter(t => t !== tech))}
                                  >
                                    {tech} ×
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech Stack List */}
                          <div className="max-h-64 overflow-y-auto border rounded-md">
                            <div className="p-2 space-y-1">
                              {filters?.techStack
                                ?.filter(tech => 
                                  techStackSearch === '' || 
                                  tech.toLowerCase().includes(techStackSearch.toLowerCase())
                                )
                                .map((tech) => (
                                <div key={tech} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                  <Checkbox
                                    id={`tech-${tech}`}
                                    checked={selectedTechStack.includes(tech)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedTechStack([...selectedTechStack, tech]);
                                      } else {
                                        setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
                                      }
                                    }}
                                  />
                                  <Label
                                    htmlFor={`tech-${tech}`}
                                    className="text-sm font-normal cursor-pointer flex-1"
                                  >
                                    {tech}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedTheme !== 'all' || selectedOrganization !== 'all' || selectedDepartment !== 'all' || selectedDifficulty !== 'all' || selectedTags.length > 0 || selectedTechStack.length > 0) && (
            <div className="mt-4 space-y-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              <div className="flex flex-wrap gap-1 sm:gap-2 max-w-full overflow-hidden">
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer text-xs px-2 py-1 truncate max-w-32 sm:max-w-none" onClick={() => setSelectedCategory('all')}>
                    Cat: {selectedCategory} ×
                  </Badge>
                )}
                {selectedTheme !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer text-xs px-2 py-1 truncate max-w-32 sm:max-w-none" onClick={() => setSelectedTheme('all')}>
                    Theme: {selectedTheme.length > 15 ? selectedTheme.substring(0, 15) + '...' : selectedTheme} ×
                  </Badge>
                )}
                {selectedOrganization !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer text-xs px-2 py-1 truncate max-w-32 sm:max-w-none" onClick={() => setSelectedOrganization('all')}>
                    Org: {selectedOrganization.length > 15 ? selectedOrganization.substring(0, 15) + '...' : selectedOrganization} ×
                  </Badge>
                )}
                {selectedDepartment !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer text-xs px-2 py-1 truncate max-w-32 sm:max-w-none" onClick={() => setSelectedDepartment('all')}>
                    Dept: {selectedDepartment.length > 15 ? selectedDepartment.substring(0, 15) + '...' : selectedDepartment} ×
                  </Badge>
                )}
                {selectedDifficulty !== 'all' && (
                  <Badge variant="secondary" className="cursor-pointer text-xs px-2 py-1" onClick={() => setSelectedDifficulty('all')}>
                    {selectedDifficulty} ×
                  </Badge>
                )}
                {selectedTags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer text-xs px-2 py-1 truncate max-w-24 sm:max-w-none" 
                    onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                  >
                    {tag.length > 10 ? tag.substring(0, 10) + '...' : tag} ×
                  </Badge>
                ))}
                {selectedTags.length > 3 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    +{selectedTags.length - 3} tags
                  </Badge>
                )}
                {selectedTechStack.slice(0, 2).map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="cursor-pointer text-xs px-2 py-1 truncate max-w-24 sm:max-w-none" 
                    onClick={() => setSelectedTechStack(selectedTechStack.filter(t => t !== tech))}
                  >
                    {tech.length > 10 ? tech.substring(0, 10) + '...' : tech} ×
                  </Badge>
                ))}
                {selectedTechStack.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-1">
                    +{selectedTechStack.length - 2} tech
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Tag Filters */}
        {filters?.popular?.tags && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {filters.popular.tags.slice(0, 10).map((tag, index) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer hover:bg-blue-100 text-xs px-2 py-1 whitespace-nowrap ${
                    index >= 6 ? 'hidden sm:inline-flex' : ''
                  }`}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Tech Stack Filters */}
        {filters?.popular?.techStack && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Technologies</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {filters.popular.techStack.slice(0, 8).map((tech, index) => (
                <Badge
                  key={tech}
                  variant={selectedTechStack.includes(tech) ? "default" : "outline"}
                  className={`cursor-pointer hover:bg-blue-100 text-xs px-2 py-1 whitespace-nowrap ${
                    index >= 4 ? 'hidden sm:inline-flex' : ''
                  }`}
                  onClick={() => {
                    if (selectedTechStack.includes(tech)) {
                      setSelectedTechStack(selectedTechStack.filter(t => t !== tech));
                    } else {
                      setSelectedTechStack([...selectedTechStack, tech]);
                    }
                  }}
                >
                  {tech.length > 12 ? tech.substring(0, 12) + '...' : tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${problems.length} of ${pagination.totalCount} results`}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="limit-select" className="text-sm text-gray-600">Show:</Label>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
              >
                <SelectTrigger className="w-20" id="limit-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="16">16</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-500">
              Page {pagination.currentPage} of {pagination.totalPages}
            </p>
          </div>
        </div>

        {/* Problem Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="h-96 animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : problems.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && problems.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <span className="text-sm text-gray-600 order-first sm:order-none">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="w-full sm:w-auto"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
