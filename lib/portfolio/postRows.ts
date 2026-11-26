import type { PostRow } from '@/components/sections/PostList'
import { blogPosts, formatPostDate, getReadingMinutes } from '@/lib/data/blog'

// Built on the server so the full post bodies stay out of client bundles. Newest first.
export const postRows: PostRow[] = blogPosts.map(post => ({
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  kind: post.kind,
  publishedAt: post.publishedAt,
  date: formatPostDate(post.publishedAt),
  minutes: getReadingMinutes(post),
}))
