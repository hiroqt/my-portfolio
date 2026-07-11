'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'
import { MdCalendarToday, MdCode } from 'react-icons/md'

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

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" })
      return controls.stop
    }
  }, [isInView, value, count])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export function GithubActivity({ username = 'hiroqt' }: { username?: string }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [languageStats, setLanguageStats] = useState<LanguageStats>({})
  const [totalCommits, setTotalCommits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        setError(null)

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

        setUser(data.user)
        setRepos(data.repos)

        const langStats: LanguageStats = {}
        data.repos.forEach((repo: GitHubRepo) => {
          if (repo.language && repo.language !== 'Unknown') {
            langStats[repo.language] = (langStats[repo.language] || 0) + 1
          }
        })
        setLanguageStats(langStats)

        setTotalCommits(data.contributions.totalContributions)
        setContributions(data.contributions.days)
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data')
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-muted/50 border-transparent'
    if (count <= 2) return 'bg-foreground/20 border-transparent'
    if (count <= 5) return 'bg-foreground/40 border-transparent'
    if (count <= 10) return 'bg-foreground/60 border-transparent'
    return 'bg-foreground border-transparent'
  }

  const getMostUsedLanguages = () => {
    return Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-[400px]">
        <div className="animate-pulse text-muted-foreground flex items-center gap-3 text-lg">
          <FaGithub className="text-2xl" /> Loading GitHub activity...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-border bg-muted/20 p-8">
        <div className="text-foreground mb-4 text-xl flex items-center gap-2">
          <FaGithub /> GitHub Data Unavailable
        </div>
        <div className="text-muted-foreground text-center mb-6">{error}</div>
      </div>
    )
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  return (
    <div className="space-y-12">
      {/* High-level Stats with Counter Animation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-background p-8 hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-6">
            <MdCalendarToday className="text-2xl text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Total Commits (1yr)</span>
          </div>
          <div className="text-6xl font-bold tracking-tighter">
            <AnimatedCounter value={totalCommits} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-border bg-background p-8 hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-6">
            <MdCode className="text-2xl text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Repositories</span>
          </div>
          <div className="text-6xl font-bold tracking-tighter">
            <AnimatedCounter value={repos.length} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-border bg-background p-8 hover:border-foreground transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaStar className="text-2xl text-muted-foreground" />
            <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">Total Stars</span>
          </div>
          <div className="text-6xl font-bold tracking-tighter">
            <AnimatedCounter value={totalStars} />
          </div>
        </motion.div>
      </div>

      <div className="space-y-12">
          {/* Contribution Graph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
              Contribution History
              <span className="text-xs font-mono bg-muted px-2 py-1 text-muted-foreground">{totalCommits} Commits</span>
            </h3>
            <div className="border border-border bg-background p-6 overflow-x-auto hover:border-foreground transition-all duration-300">
              <div className="min-w-max">
                <div className="grid grid-rows-7 grid-flow-col gap-1 mb-4">
                  {contributions.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.contributionCount)} transition-all hover:scale-125 cursor-pointer`}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-sm bg-muted/50" />
                  <div className="w-3 h-3 rounded-sm bg-foreground/20" />
                  <div className="w-3 h-3 rounded-sm bg-foreground/40" />
                  <div className="w-3 h-3 rounded-sm bg-foreground/60" />
                  <div className="w-3 h-3 rounded-sm bg-foreground" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold tracking-tight mb-6">Top Languages</h3>
            <div className="grid grid-cols-2 gap-4">
              {getMostUsedLanguages().map(([language, count], index) => {
                const percentage = (count / repos.length) * 100
                return (
                  <div key={language} className="border border-border bg-background p-4 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{language}</span>
                      <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className="h-full bg-foreground"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
      </div>
    </div>
  )
}
