'use client'

import { useEffect, useState } from 'react'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { MdCalendarToday } from 'react-icons/md'

interface GitHubRepo {
  name: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  html_url: string
  owner: {
    login: string
  }
}

interface GitHubUser {
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
}

interface ContributionDay {
  contributionCount: number
  date: string
}

interface LanguageStats {
  [key: string]: number
}

export function GitHubStats({ username = 'hiroqt' }: { username?: string }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [languageStats, setLanguageStats] = useState<LanguageStats>({})
  const [totalCommits, setTotalCommits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAllRepos, setShowAllRepos] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch from our secure API route with cache-busting
        const response = await fetch(`/api/github?username=${username}&_t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch GitHub data')
        }

        const data = await response.json()

        // Set user profile
        setUser(data.user)

        // Set repositories
        setRepos(data.repos)

        // Calculate language statistics
        const langStats: LanguageStats = {}
        data.repos.forEach((repo: GitHubRepo) => {
          if (repo.language && repo.language !== 'Unknown') {
            langStats[repo.language] = (langStats[repo.language] || 0) + 1
          }
        })
        setLanguageStats(langStats)

        // Set contribution data
        setTotalCommits(data.contributions.totalContributions)
        setContributions(data.contributions.days)
        
        // Update last refresh time
        setLastUpdated(new Date())

        setLoading(false)
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data')
        setLoading(false)
      }
    }

    fetchGitHubData()
    
    // Auto-refresh every 5 minutes to get latest contribution data
    const refreshInterval = setInterval(fetchGitHubData, 5 * 60 * 1000)
    
    return () => clearInterval(refreshInterval)
  }, [username])

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-terminal-bg border-terminal-border'
    if (count <= 2) return 'bg-terminal-fg/20 border-terminal-fg/20'
    if (count <= 5) return 'bg-terminal-fg/40 border-terminal-fg/40'
    if (count <= 10) return 'bg-terminal-fg/60 border-terminal-fg/60'
    return 'bg-terminal-fg border-terminal-fg'
  }

  const getMostUsedLanguages = () => {
    return Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-terminal-gray animate-pulse">$ Loading GitHub data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-terminal-border bg-terminal-bg p-8">
        <div className="text-terminal-fg mb-4 text-xl">⚠️ GitHub Data Error</div>
        <div className="text-terminal-gray text-center mb-6">// {error}</div>
        <div className="text-terminal-gray text-sm text-center max-w-2xl">
          <p className="mb-4">To view private repositories and accurate contribution data, add your GitHub token to the server environment:</p>
          <ol className="text-left space-y-2">
            <li>1. Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-terminal-fg underline">GitHub Settings → Tokens</a></li>
            <li>2. Generate a new token (classic)</li>
            <li>3. Select scopes: <code className="bg-terminal-bg border border-terminal-border px-2 py-1">repo</code> and <code className="bg-terminal-bg border border-terminal-border px-2 py-1">read:user</code></li>
            <li>4. Add to .env.local: <code className="bg-terminal-bg border border-terminal-border px-2 py-1">GITHUB_TOKEN=your_token</code></li>
            <li>5. Restart the dev server</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* User Profile Banner */}
      {user && (
        <div className="reveal-fade border-2 border-terminal-border bg-terminal-bg p-6 md:p-8 hover:border-terminal-fg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={user.avatar_url} 
              alt={user.name}
              className="w-24 h-24 border-2 border-terminal-fg grayscale"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-headline-md font-headline-md text-terminal-fg mb-2">
                @{username}
              </h3>
              {user.bio && (
                <p className="text-terminal-gray mb-4">// {user.bio}</p>
              )}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <span className="text-terminal-gray">
                  <span className="text-terminal-fg font-bold">{user.public_repos}</span> repositories
                </span>
                <span className="text-terminal-gray">
                  <span className="text-terminal-fg font-bold">{user.followers}</span> followers
                </span>
                <span className="text-terminal-gray">
                  <span className="text-terminal-fg font-bold">{user.following}</span> following
                </span>
              </div>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-terminal-fg text-terminal-fg hover:bg-terminal-fg hover:text-terminal-bg transition-all duration-300 font-bold flex items-center gap-2"
            >
              <FaGithub /> View Profile
            </a>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-fade">
        <div className="border-2 border-terminal-border bg-terminal-bg p-6 hover:border-terminal-fg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <FaGithub className="text-2xl text-terminal-fg" />
            <span className="text-terminal-gray text-sm font-label-md">REPOSITORIES</span>
          </div>
          <div className="text-4xl font-bold text-terminal-fg">{repos.length}</div>
        </div>

        <div className="border-2 border-terminal-border bg-terminal-bg p-6 hover:border-terminal-fg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <MdCalendarToday className="text-2xl text-terminal-fg" />
            <span className="text-terminal-gray text-sm font-label-md">RECENT COMMITS</span>
          </div>
          <div className="text-4xl font-bold text-terminal-fg">{totalCommits}+</div>
        </div>

        <div className="border-2 border-terminal-border bg-terminal-bg p-6 hover:border-terminal-fg transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <FaStar className="text-2xl text-terminal-fg" />
            <span className="text-terminal-gray text-sm font-label-md">TOTAL STARS</span>
          </div>
          <div className="text-4xl font-bold text-terminal-fg">
            {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="reveal-scale delay-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-headline-sm font-headline-sm text-terminal-fg flex items-center gap-2">
            <span className="text-terminal-gray">//</span> Contribution Activity
          </h3>
          {lastUpdated && (
            <span className="text-xs text-terminal-gray">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="border-2 border-terminal-border bg-terminal-bg p-6 overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-52 gap-1">
              {contributions.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 border ${getContributionColor(day.contributionCount)} transition-all hover:scale-125`}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-terminal-gray">
              <span>Less</span>
              <div className="w-3 h-3 border bg-terminal-bg border-terminal-border" />
              <div className="w-3 h-3 border bg-terminal-fg/20 border-terminal-fg/20" />
              <div className="w-3 h-3 border bg-terminal-fg/40 border-terminal-fg/40" />
              <div className="w-3 h-3 border bg-terminal-fg/60 border-terminal-fg/60" />
              <div className="w-3 h-3 border bg-terminal-fg border-terminal-fg" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Stats */}
      <div className="reveal-left delay-200">
        <h3 className="text-headline-sm font-headline-sm text-terminal-fg mb-6 flex items-center gap-2">
          <span className="text-terminal-gray">//</span> Languages Used
        </h3>
        <div className="border-2 border-terminal-border bg-terminal-bg p-6">
          <div className="space-y-4">
            {getMostUsedLanguages().map(([language, count], index) => {
              const percentage = (count / repos.length) * 100
              return (
                <div key={language} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-terminal-fg font-label-md">{language}</span>
                    <span className="text-terminal-gray">{count} repos ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-terminal-bg border border-terminal-border h-2 overflow-hidden">
                    <div
                      className="h-full bg-terminal-fg transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Repository List */}
      <div className="reveal-right delay-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-headline-sm font-headline-sm text-terminal-fg flex items-center gap-2">
            <span className="text-terminal-gray">//</span> Featured Repositories
          </h3>
          {repos.length > 4 && (
            <button
              onClick={() => setShowAllRepos(!showAllRepos)}
              className="px-4 py-2 border border-terminal-border text-terminal-gray hover:border-terminal-fg hover:text-terminal-fg transition-all duration-300 text-sm"
            >
              {showAllRepos ? '[Show Less]' : `[View All ${repos.length}]`}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(showAllRepos ? repos : repos.slice(0, 4)).map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-terminal-border bg-terminal-bg p-6 hover:border-terminal-fg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-headline-sm font-headline-sm text-terminal-fg group-hover:text-terminal-fg transition-colors">
                  {repo.owner.login === username ? repo.name : `${repo.owner.login}/${repo.name}`}
                </h4>
                <FaGithub className="text-terminal-gray group-hover:text-terminal-fg transition-colors" />
              </div>
              <p className="text-terminal-gray text-sm mb-4 line-clamp-2">
                {repo.description || '// No description available'}
              </p>
              <div className="flex items-center gap-4 text-xs text-terminal-gray">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-terminal-fg" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
