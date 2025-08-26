'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useAuthDialog } from '@/hooks/useAuthDialog'
import AuthDialog from '@/components/AuthDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserPlus, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import api from '@/lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface JoinTeamPageProps {
  params: {
    teamId: string
  }
}

export default function JoinTeamPage({ params }: JoinTeamPageProps) {
  const { user } = useAuth()
  const { showAuthDialog, closeAuthDialog, requireAuth } = useAuthDialog()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [joinStatus, setJoinStatus] = useState<'idle' | 'joining' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [teamInfo, setTeamInfo] = useState<{name: string; leader: string} | null>(null)

  const { teamId } = params

  // Attempt to join team when user is authenticated
  const handleJoinTeam = useCallback(async () => {
    if (!user || !teamId) return

    setLoading(true)
    setJoinStatus('joining')

    try {
      const response = await api.post('/team/join', { teamId })
      if (response.data.success) {
        setJoinStatus('success')
        toast.success('Successfully joined the team!')
        setTimeout(() => {
          router.push('/team')
        }, 2000)
      }
    } catch (error: unknown) {
      setJoinStatus('error')
      console.error('Error joining team:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        const message = axiosError.response?.data?.message || 'Failed to join team'
        setErrorMessage(message)
        toast.error(message)
      } else {
        setErrorMessage('Failed to join team')
        toast.error('Failed to join team')
      }
    } finally {
      setLoading(false)
    }
  }, [user, teamId, router])

  // Fetch team info for display
  const fetchTeamInfo = useCallback(async () => {
    try {
      const response = await api.get(`/team/info/${teamId}`)
      if (response.data.success) {
        setTeamInfo({
          name: response.data.data.name,
          leader: response.data.data.leader.name
        })
      }
    } catch (error) {
      console.error('Error fetching team info:', error)
      // Fallback to basic info
      setTeamInfo({ name: `Team ${teamId}`, leader: 'Unknown' })
    }
  }, [teamId])

  useEffect(() => {
    if (teamId) {
      fetchTeamInfo()
    }
  }, [teamId, fetchTeamInfo])

  useEffect(() => {
    if (user && teamId && joinStatus === 'idle') {
      handleJoinTeam()
    }
  }, [user, teamId, joinStatus, handleJoinTeam])

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Join Team</CardTitle>
              <CardDescription>
                You&apos;ve been invited to join a team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamInfo && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{teamInfo.name}</h3>
                  <p className="text-sm text-gray-600">Team ID: {teamId}</p>
                </div>
              )}
              
              <p className="text-gray-600 text-center">
                Please sign in to join this team
              </p>
              
              <Button 
                onClick={() => requireAuth(() => {})} 
                className="w-full"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign In to Join Team
              </Button>
            </CardContent>
          </Card>
          
          <AuthDialog 
            open={showAuthDialog} 
            onOpenChange={(open) => !open && closeAuthDialog()}
            feature="team joining"
            description="Sign in to join the team you've been invited to"
            onSuccess={() => {
              closeAuthDialog()
              // The useEffect will handle joining once user is set
            }}
          />
        </div>
      </div>
    )
  }

  // Show joining status
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className={`rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
              joinStatus === 'success' ? 'bg-green-100' :
              joinStatus === 'error' ? 'bg-red-100' :
              'bg-blue-100'
            }`}>
              {joinStatus === 'joining' && (
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              )}
              {joinStatus === 'success' && (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
              {joinStatus === 'error' && (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
              {joinStatus === 'idle' && (
                <Users className="h-8 w-8 text-blue-600" />
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {joinStatus === 'joining' && 'Joining Team...'}
              {joinStatus === 'success' && 'Welcome to the Team!'}
              {joinStatus === 'error' && 'Join Failed'}
              {joinStatus === 'idle' && 'Join Team'}
            </CardTitle>
            
            <CardDescription>
              {joinStatus === 'joining' && 'Please wait while we add you to the team'}
              {joinStatus === 'success' && 'You have successfully joined the team'}
              {joinStatus === 'error' && 'There was an error joining the team'}
              {joinStatus === 'idle' && 'Preparing to join team...'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {teamInfo && (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-gray-900">{teamInfo.name}</h3>
                <p className="text-sm text-gray-600">Team ID: {teamId}</p>
              </div>
            )}
            
            {joinStatus === 'success' && (
              <div className="text-center space-y-4">
                <p className="text-green-600">
                  Redirecting to team dashboard...
                </p>
                <Button onClick={() => router.push('/team')} className="w-full">
                  Go to Team Dashboard
                </Button>
              </div>
            )}
            
            {joinStatus === 'error' && (
              <div className="text-center space-y-4">
                <p className="text-red-600 text-sm">
                  {errorMessage}
                </p>
                <div className="flex gap-2">
                  <Button onClick={handleJoinTeam} disabled={loading} className="flex-1">
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <UserPlus className="mr-2 h-4 w-4" />
                    )}
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/')} className="flex-1">
                    Go Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
