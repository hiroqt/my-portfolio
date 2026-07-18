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
    // GitHub's exact color scheme
    if (count === 0) return 'bg-[#ebedf0] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]'
    if (count <= 3) return 'bg-[#9be9a8] dark:bg-[#0e4429] border border-[#9be9a8] dark:border-[#0e4429]'
    if (count <= 6) return 'bg-[#40c463] dark:bg-[#006d32] border border-[#40c463] dark:border-[#006d32]'
    if (count <= 9) return 'bg-[#30a14e] dark:bg-[#26a641] border border-[#30a14e] dark:border-[#26a641]'
    return 'bg-[#216e39] dark:bg-[#39d353] border border-[#216e39] dark:border-[#39d353]'
  }

  const getMonthLabels = () => {
    const months: { label: string; offset: number }[] = []
    let currentMonth = ''
    let weekIndex = 0

    for (let i = 0; i < contributions.length; i += 7) {
      const date = new Date(contributions[i].date)
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short' })
      
      if (monthLabel !== currentMonth) {
        currentMonth = monthLabel
        months.push({ label: monthLabel, offset: weekIndex })
      }
      weekIndex++
    }
    
    return months
  }

  const getDayLabel = (index: number) => {
    const days = ['Mon', 'Wed', 'Fri']
    if (index === 1 || index === 3 || index === 5) {
      return days[Math.floor(index / 2)]
    }
    return ''
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
            <h3 className="text-2xl font-bold tracking-tight mb-6 flex flex-wrap items-center gap-3">
              <MdCalendarToday className="text-xl" />
              Contribution Activity
              <span className="text-xs font-mono bg-muted px-3 py-1.5 text-muted-foreground rounded">{totalCommits} contributions in the last year</span>
            </h3>
            <div className="border border-border bg-background p-4 sm:p-6 md:p-8 hover:border-foreground transition-all duration-300 w-full">
              {/* Activity Grid with Day Labels */}
              <div className="flex gap-2 sm:gap-3 w-full">
                {/* Day Labels */}
                <div className="flex flex-col gap-[3px] sm:gap-1 pr-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="h-[10px] sm:h-3 flex items-center text-[9px] sm:text-[11px] text-muted-foreground">
                      {getDayLabel(index)}
                    </div>
                  ))}
                </div>

                {/* Contribution Squares */}
                <div className="grid grid-rows-7 grid-flow-col gap-[3px] sm:gap-1 flex-1">
                  {contributions.map((day, index) => {
                    const date = new Date(day.date)
                    const formattedDate = date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                    const contributionText = day.contributionCount === 0
                      ? 'No contributions'
                      : day.contributionCount === 1 
                        ? '1 contribution' 
                        : `${day.contributionCount} contributions`

                    return (
                      <div
                        key={index}
                        className={`aspect-square rounded-[2px] ${getContributionColor(day.contributionCount)} 
                          transition-all hover:ring-2 hover:ring-offset-1 hover:ring-foreground/30 cursor-pointer relative group`}
                        title={`${formattedDate}\n${contributionText}`}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded text-[11px] leading-tight
                          opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 whitespace-nowrap z-50 shadow-lg">
                          <div className="font-semibold">{contributionText}</div>
                          <div className="text-gray-300 dark:text-gray-600">{formattedDate}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground mt-3 sm:mt-4 w-full">
                <span>Less</span>
                <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d]" />
                <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-[#9be9a8] dark:bg-[#0e4429] border border-[#9be9a8] dark:border-[#0e4429]" />
                <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-[#40c463] dark:bg-[#006d32] border border-[#40c463] dark:border-[#006d32]" />
                <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-[#30a14e] dark:bg-[#26a641] border border-[#30a14e] dark:border-[#26a641]" />
                <div className="w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] bg-[#216e39] dark:bg-[#39d353] border border-[#216e39] dark:border-[#39d353]" />
                <span>More</span>
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
