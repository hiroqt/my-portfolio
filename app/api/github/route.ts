import { NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'hiroqt'

    const token = process.env.GITHUB_TOKEN
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token is not configured on the server.' },
        { status: 500 }
      )
    }

    // Use GitHub GraphQL API for accurate data including private repos
    const graphqlQuery = `
      query($username: String!) {
        user(login: $username) {
          name
          bio
          avatarUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR], orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              name
              description
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
              url
              owner {
                login
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `

    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { username }
      })
    })

    if (!graphqlResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data. Please check token permissions.' },
        { status: graphqlResponse.status }
      )
    }

    const { data, errors } = await graphqlResponse.json()
    
    if (errors) {
      return NextResponse.json(
        { error: errors[0]?.message || 'GraphQL query failed' },
        { status: 400 }
      )
    }

    const userData = data.user

    // Process and return data
    const processedData = {
      user: {
        name: userData.name,
        bio: userData.bio,
        public_repos: userData.repositories.totalCount,
        followers: userData.followers.totalCount,
        following: userData.following.totalCount,
        avatar_url: userData.avatarUrl
      },
      repos: userData.repositories.nodes.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount,
        language: repo.primaryLanguage?.name || 'Unknown',
        html_url: repo.url,
        owner: {
          login: repo.owner.login
        }
      })),
      contributions: {
        totalContributions: userData.contributionsCollection.contributionCalendar.totalContributions,
        days: userData.contributionsCollection.contributionCalendar.weeks.flatMap((week: any) =>
          week.contributionDays.map((day: any) => ({
            date: day.date,
            contributionCount: day.contributionCount
          }))
        )
      }
    }

    return NextResponse.json(processedData)
  } catch (error) {
    console.error('Error in GitHub API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
