'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useAuthDialog } from '@/hooks/useAuthDialog'
import AuthDialog from '@/components/AuthDialog'
import AddToTeamButton from '@/components/AddToTeamButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Users, 
  UserPlus, 
  Crown, 
  UserMinus, 
  ExternalLink, 
  Calendar, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Edit, 
  Tag,
  BookOpen,
  RotateCcw
} from 'lucide-react'
import api from '@/lib/api'
import { toast } from 'sonner'

interface TeamMember {
  _id: string
  name: string
  email: string
  photoURL?: string
  role: 'leader' | 'member'
  joinedAt: string
}

interface Team {
  _id: string
  name: string
  teamId: string
  leader: string
  members: TeamMember[]
  createdAt: string
}

interface TeamProblemStatement {
  _id: string
  id: string
  title: string
  category: string
  theme: string
  difficultyLevel: string
  description: string
  summary: string
  tags: string[]
  techStack: string[]
  isBookmarked?: boolean
  isAddedToTeam?: boolean
  teamContext: {
    chosenBy: Array<{
      userId: string
      userName: string
      userEmail: string
      userPhoto?: string
      chosenAt: string
    }>
    chosenCount: number
    isChosenByCurrentUser: boolean
  }
}

export default function TeamPage() {
  const { user } = useAuth()
  const { showAuthDialog, closeAuthDialog, requireAuth } = useAuthDialog()
  const [team, setTeam] = useState<Team | null>(null)
  const [teamProblems, setTeamProblems] = useState<TeamProblemStatement[]>([])
  const [loading, setLoading] = useState(true)
  const [problemsLoading, setProblemsLoading] = useState(false)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [joinTeamId, setJoinTeamId] = useState('')
  const [createTeamName, setCreateTeamName] = useState('')
  const [activeTab, setActiveTab] = useState('problems')
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [isCurrentUserLeader, setIsCurrentUserLeader] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // New state for additional team management features
  const [showUpdateTeamDialog, setShowUpdateTeamDialog] = useState(false)
  const [showDeleteTeamDialog, setShowDeleteTeamDialog] = useState(false)
  const [showTransferLeadershipDialog, setShowTransferLeadershipDialog] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [selectedNewLeader, setSelectedNewLeader] = useState('')

  // Enhanced Problem Card Component
  const ProblemCard = ({ problem }: { problem: TeamProblemStatement }) => (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            <Badge variant="outline" className="text-xs">{problem.id}</Badge>
            <Badge className={`text-xs ${
              problem.difficultyLevel === 'hard' ? 'bg-red-500' : 
              problem.difficultyLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              {problem.difficultyLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <AddToTeamButton 
              psId={problem._id} 
              isAddedToTeam={problem.isAddedToTeam || problem.teamContext.isChosenByCurrentUser}
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0"
              showText={false}
            />
            <Link href={`/problems/${problem.id}`}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight mb-2">{problem.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{problem.summary}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Theme & Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs">{problem.theme}</Badge>
          <Badge variant="outline" className="text-xs">{problem.category}</Badge>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Tag className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {problem.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {problem.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{problem.tags.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        {problem.techStack && problem.techStack.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {problem.techStack.slice(0, 3).map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {problem.techStack.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{problem.techStack.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <Separator className="my-3" />

        {/* Team Context */}
        <div className="mt-auto">
          <p className="text-sm font-medium mb-2">
            Chosen by {problem.teamContext.chosenCount} member{problem.teamContext.chosenCount !== 1 ? 's' : ''}:
          </p>
          <div className="flex flex-wrap gap-2">
            {problem.teamContext.chosenBy.map((choice) => (
              <div key={choice.userId} className="flex items-center gap-2 text-xs bg-muted rounded-full px-3 py-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={choice.userPhoto} />
                  <AvatarFallback className="text-xs">{choice.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="truncate max-w-20">{choice.userName}</span>
                {problem.teamContext.isChosenByCurrentUser && choice.userId === user?.firebaseUid && (
                  <span className="text-primary">(You)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const fetchTeamDetails = async () => {
    try {
      const response = await api.get('/team/details')
      if (response.data.success) {
        // The API returns data.team, so we need to access it correctly
        const teamData = response.data.data.team
        const currentUserData = response.data.data.currentUser
        
        // Set leadership status from backend
        setIsCurrentUserLeader(currentUserData.isLeader)
        setCurrentUserId(currentUserData.id)
        
        // Map the API response structure to what our component expects
        const mappedTeam = {
          _id: teamData.id,
          name: teamData.name,
          teamId: teamData.id, // Using the team ID as teamId
          leader: teamData.leader.id,
          members: teamData.members.map((member: {
            id: string
            name: string
            email: string
            photoURL?: string
            isLeader: boolean
            joinedAt: string
          }) => ({
            _id: member.id,
            name: member.name,
            email: member.email,
            photoURL: member.photoURL,
            role: member.isLeader ? 'leader' : 'member',
            joinedAt: member.joinedAt
          })),
          createdAt: teamData.createdAt
        }
        setTeam(mappedTeam)
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } }
        if (axiosError.response?.status !== 400) {
          console.error('Error fetching team details:', error)
          toast.error('Failed to fetch team details')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchTeamProblems = useCallback(async () => {
    if (!team) return
    setProblemsLoading(true)
    try {
      const response = await api.get('/ps/team')
      if (response.data.success) {
        setTeamProblems(response.data.data)
      }
    } catch (error: unknown) {
      console.error('Error fetching team problems:', error)
      toast.error('Failed to fetch team problem statements')
    } finally {
      setProblemsLoading(false)
    }
  }, [team])

  const handleJoinTeam = async () => {
    if (!joinTeamId.trim()) {
      toast.error('Please enter a team ID')
      return
    }

    try {
      const response = await api.post('/team/join', { teamId: joinTeamId })
      if (response.data.success) {
        toast.success('Successfully joined team!')
        setShowJoinDialog(false)
        setJoinTeamId('')
        await fetchTeamDetails()
      }
    } catch (error: unknown) {
      console.error('Error joining team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to join team')
      } else {
        toast.error('Failed to join team')
      }
    }
  }

  const handleCreateTeam = async () => {
    if (!createTeamName.trim()) {
      toast.error('Please enter a team name')
      return
    }

    try {
      const response = await api.post('/team/create', { name: createTeamName })
      if (response.data.success) {
        toast.success('Team created successfully!')
        setShowCreateDialog(false)
        setCreateTeamName('')
        await fetchTeamDetails()
      }
    } catch (error: unknown) {
      console.error('Error creating team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to create team')
      } else {
        toast.error('Failed to create team')
      }
    }
  }

  const handleLeaveTeam = async () => {
    try {
      const response = await api.delete('/team/leave')
      if (response.data.success) {
        const { action, newLeader } = response.data
        
        if (action === 'team_deleted') {
          toast.success('Team deleted successfully as you were the only member')
        } else if (action === 'leadership_transferred') {
          toast.success(`Leadership transferred to ${newLeader.name}. You left the team successfully.`)
        } else {
          toast.success('Left team successfully')
        }
        
        setTeam(null)
        setTeamProblems([])
        setIsCurrentUserLeader(false)
        setShowLeaveDialog(false)
      }
    } catch (error: unknown) {
      console.error('Error leaving team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to leave team')
      } else {
        toast.error('Failed to leave team')
      }
    }
  }

  const handleRemoveMember = async (userId: string, userName: string) => {
    setMemberToRemove({ id: userId, name: userName })
    setShowRemoveDialog(true)
  }

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return

    try {
      const response = await api.delete('/team/remove-user', { data: { userId: memberToRemove.id } })
      if (response.data.success) {
        toast.success('Member removed successfully')
        await fetchTeamDetails()
        setShowRemoveDialog(false)
        setMemberToRemove(null)
      }
    } catch (error: unknown) {
      console.error('Error removing member:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to remove member')
      } else {
        toast.error('Failed to remove member')
      }
    }
  }

  const copyTeamId = () => {
    if (team) {
      navigator.clipboard.writeText(team.teamId)
      toast.success('Team ID copied to clipboard!')
    }
  }

  const copyJoinLink = () => {
    if (team) {
      const joinLink = `${window.location.origin}/team/join/${team.teamId}`
      navigator.clipboard.writeText(joinLink)
      toast.success('Join link copied to clipboard!')
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000) // Reset after 2 seconds
    }
  }

  // New team management functions
  const handleUpdateTeam = async () => {
    if (!newTeamName.trim()) {
      toast.error('Please enter a team name')
      return
    }

    try {
      const response = await api.put('/team/update', { name: newTeamName })
      if (response.data.success) {
        toast.success('Team name updated successfully')
        await fetchTeamDetails()
        setShowUpdateTeamDialog(false)
        setNewTeamName('')
      }
    } catch (error: unknown) {
      console.error('Error updating team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to update team')
      } else {
        toast.error('Failed to update team')
      }
    }
  }

  const handleDeleteTeam = async () => {
    try {
      const response = await api.delete('/team/delete')
      if (response.data.success) {
        toast.success('Team deleted successfully')
        setTeam(null)
        setShowDeleteTeamDialog(false)
      }
    } catch (error: unknown) {
      console.error('Error deleting team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to delete team')
      } else {
        toast.error('Failed to delete team')
      }
    }
  }

  const handleTransferLeadership = async () => {
    if (!selectedNewLeader) {
      toast.error('Please select a new leader')
      return
    }

    try {
      const response = await api.post('/team/transfer-leadership', { newLeaderId: selectedNewLeader })
      if (response.data.success) {
        toast.success('Leadership transferred successfully')
        await fetchTeamDetails()
        setShowTransferLeadershipDialog(false)
        setSelectedNewLeader('')
      }
    } catch (error: unknown) {
      console.error('Error transferring leadership:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        toast.error(axiosError.response?.data?.message || 'Failed to transfer leadership')
      } else {
        toast.error('Failed to transfer leadership')
      }
    }
  }

  useEffect(() => {
    if (user) {
      fetchTeamDetails()
    } else {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (team && activeTab === 'problems') {
      fetchTeamProblems()
    }
  }, [team, activeTab, fetchTeamProblems])

  // Fetch problems immediately when team is loaded since problems is the default tab
  useEffect(() => {
    if (team) {
      fetchTeamProblems()
    }
  }, [team, fetchTeamProblems])

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Team Collaboration</h1>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Join or create a team to collaborate on problem statements
            </p>
          </div>
          <Button onClick={() => requireAuth(() => {})} className="w-full sm:w-auto">
            Sign in to continue
          </Button>
        </div>
        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={(open) => !open && closeAuthDialog()}
          feature="team collaboration"
          description="Sign in to join or create teams and collaborate on problem statements"
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm md:text-base">Loading team information...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Join or Create a Team</h1>
            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              Collaborate with others by joining an existing team or creating your own
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="p-4 md:p-6">
              <div className="text-center">
                <UserPlus className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">Join Existing Team</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Enter a team ID to join an existing team
                </p>
                <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Join Team</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Join Team</DialogTitle>
                      <DialogDescription>
                        Enter the team ID provided by your team leader
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="teamId">Team ID</Label>
                        <Input
                          id="teamId"
                          placeholder="Enter team ID..."
                          value={joinTeamId}
                          onChange={(e) => setJoinTeamId(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleJoinTeam} className="flex-1">
                          Join Team
                        </Button>
                        <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="text-center">
                <Crown className="w-6 h-6 md:w-8 md:h-8 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">Create New Team</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Start a new team and invite others to join
                </p>
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Create Team</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Team</DialogTitle>
                      <DialogDescription>
                        Enter a name for your new team
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input
                          id="teamName"
                          placeholder="Enter team name..."
                          value={createTeamName}
                          onChange={(e) => setCreateTeamName(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreateTeam} className="flex-1">
                          Create Team
                        </Button>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const isLeader = isCurrentUserLeader

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 truncate">{team.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="truncate">Team ID: {team.teamId}</span>
                <Button variant="ghost" size="sm" onClick={copyTeamId} className="h-6 px-2 text-xs">
                  Copy ID
                </Button>
              </div>
              <span className="hidden sm:block">•</span>
              <span>{team.members?.length || 0} member{(team.members?.length || 0) !== 1 ? 's' : ''}</span>
              <span className="hidden sm:block">•</span>
              <span className="text-xs sm:text-sm">Created {new Date(team.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0 flex-wrap justify-end lg:justify-start">{/* Additional responsive improvements for very small screens */}
            {isLeader ? (
              <>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setNewTeamName(team.name)
                      setShowUpdateTeamDialog(true)
                    }}
                    className="text-xs sm:text-sm min-w-[50px] sm:min-w-[80px] flex-1 sm:flex-none max-w-[80px] sm:max-w-none"
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Edit Team</span>
                    <span className="sm:hidden">Edit</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowTransferLeadershipDialog(true)}
                    className="text-xs sm:text-sm min-w-[70px] sm:min-w-[140px] flex-1 sm:flex-none max-w-[90px] sm:max-w-none"
                  >
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Transfer Leadership</span>
                    <span className="sm:hidden">Transfer</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowLeaveDialog(true)} 
                    className="text-xs sm:text-sm min-w-[50px] sm:min-w-[90px] flex-1 sm:flex-none max-w-[70px] sm:max-w-none"
                  >
                    <UserMinus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Leave Team</span>
                    <span className="sm:hidden">Leave</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyJoinLink} 
                    disabled={linkCopied} 
                    className="text-xs sm:text-sm min-w-[50px] sm:min-w-[120px] flex-1 sm:flex-none max-w-[70px] sm:max-w-none"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Copied!</span>
                        <span className="sm:hidden">✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Share Join Link</span>
                        <span className="sm:hidden">Share</span>
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setShowDeleteTeamDialog(true)} 
                    className="text-xs sm:text-sm min-w-[50px] sm:min-w-[100px] flex-1 sm:flex-none max-w-[70px] sm:max-w-none"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Delete Team</span>
                    <span className="sm:hidden">Delete</span>
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setShowLeaveDialog(true)} 
                className="text-xs sm:text-sm min-w-[60px] sm:min-w-[90px]"
              >
                <UserMinus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Leave Team</span>
                <span className="sm:hidden">Leave</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="problems" className="text-xs sm:text-sm">Problem Statements</TabsTrigger>
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Users className="w-5 h-5" />
                Team Members
              </CardTitle>
              <CardDescription className="text-sm">
                {isLeader ? 'Manage your team members' : 'View team members'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {team.members?.map((member) => (
                  <div key={member._id} className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <Avatar className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                        <AvatarImage src={member.photoURL} />
                        <AvatarFallback className="text-sm">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium text-sm md:text-base truncate">{member.name}</span>
                          {member.role === 'leader' && (
                            <Badge variant="secondary" className="text-xs w-fit">
                              <Crown className="w-3 h-3 mr-1" />
                              Leader
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs md:text-sm text-muted-foreground truncate block">{member.email}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {isLeader && member.role !== 'leader' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member._id, member.name)}
                        className="text-destructive hover:text-destructive ml-2 h-8 w-8 p-0 flex-shrink-0"
                      >
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )) || []}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems" className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-lg md:text-xl">Team Problem Statements</CardTitle>
                  <CardDescription className="text-sm">
                    Problem statements saved by team members
                  </CardDescription>
                </div>
                <Link href="/problems">
                  <Button 
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Problem
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {problemsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading problem statements...</p>
                </div>
              ) : teamProblems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No problem statements found</p>
                  <Link href="/problems">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Browse Problems
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                  {teamProblems.map((problem) => (
                    <ProblemCard key={problem._id} problem={problem} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Leave Team Confirmation Dialog */}
      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Team</DialogTitle>
            <DialogDescription>
              {isCurrentUserLeader ? (
                team && team.members.length > 1 ? (
                  <>
                    As team leader, leaving will automatically transfer leadership to the oldest team member. 
                    The new leader will be <strong>{team.members.filter(m => m.role !== 'leader' && m._id !== currentUserId).sort((a, b) => 
                      new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime())[0]?.name}</strong>.
                    This action cannot be undone.
                  </>
                ) : (
                  <>
                    You are the only member of this team. Leaving will automatically delete the team. 
                    This action cannot be undone.
                  </>
                )
              ) : (
                <>
                  Are you sure you want to leave this team? This action cannot be undone.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLeaveTeam}>
              {isCurrentUserLeader ? 
                (team && team.members.length > 1 ? 'Transfer Leadership & Leave' : 'Delete Team & Leave') 
                : 'Leave Team'
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.name} from the team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => {
              setShowRemoveDialog(false)
              setMemberToRemove(null)
            }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemoveMember}>
              Remove Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Team Dialog */}
      <Dialog open={showUpdateTeamDialog} onOpenChange={setShowUpdateTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Team Name</DialogTitle>
            <DialogDescription>
              Enter a new name for your team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="Enter team name..."
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => {
              setShowUpdateTeamDialog(false)
              setNewTeamName('')
            }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTeam}>
              Update Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Team Dialog */}
      <Dialog open={showDeleteTeamDialog} onOpenChange={setShowDeleteTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team? This action cannot be undone and all team members will be removed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteTeamDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              Delete Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Leadership Dialog */}
      <Dialog open={showTransferLeadershipDialog} onOpenChange={setShowTransferLeadershipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Leadership</DialogTitle>
            <DialogDescription>
              Select a team member to transfer leadership to. You will lose leader privileges after this action.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-leader">Select New Leader</Label>
              <Select value={selectedNewLeader} onValueChange={setSelectedNewLeader}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team member..." />
                </SelectTrigger>
                <SelectContent>
                  {team?.members?.filter(member => member.role !== 'leader').map((member) => (
                    <SelectItem key={member._id} value={member._id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={member.photoURL} />
                          <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => {
              setShowTransferLeadershipDialog(false)
              setSelectedNewLeader('')
            }}>
              Cancel
            </Button>
            <Button onClick={handleTransferLeadership}>
              Transfer Leadership
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
