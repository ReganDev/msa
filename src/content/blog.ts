/* ============================================================
   Blog posts
   ------------------------------------------------------------
   Posts are written by Matthew in Sanity. scripts/fetch-posts.mjs
   downloads the published ones before every build into
   src/generated/posts.json (gitignored), and the pages are
   prerendered from it. Bodies are Portable Text, rendered by
   src/components/blog/PostBody.tsx.
   ============================================================ */

import type { PortableTextBlock } from '@portabletext/react'
import { toPlainText } from '@portabletext/react'
import posts from '../generated/posts.json'

/** The "Get urgent help if…" style panel Matthew can drop into a post. */
export interface NoteBlock {
  _type: 'note'
  _key: string
  title?: string
  text: string
}

export type BodyBlock = PortableTextBlock | NoteBlock

export interface Post {
  slug: string
  title: string
  /** One or two sentences. List summary and meta description. */
  excerpt: string
  /** ISO date, e.g. 2026-10-14 */
  publishedAt: string
  body: BodyBlock[]
}

/** Newest first. */
export const allPosts = [...(posts as Post[])].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const postBySlug = new Map(allPosts.map((post) => [post.slug, post]))

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00`))

const relative = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' })
const DAY = 24 * 60 * 60 * 1000

/** "today", "yesterday", "5 days ago", "2 weeks ago", "3 months ago"… */
export function timeAgo(iso: string, now = new Date()) {
  const days = Math.floor((now.getTime() - new Date(`${iso}T00:00:00`).getTime()) / DAY)
  if (days < 7) return relative.format(-Math.max(0, days), 'day')
  if (days < 30) return relative.format(-Math.floor(days / 7), 'week')
  if (days < 365) return relative.format(-Math.floor(days / 30), 'month')
  return relative.format(-Math.floor(days / 365), 'year')
}

const isNote = (block: BodyBlock): block is NoteBlock => block._type === 'note'

/** A post's words as plain text, notes included. */
const plainText = (post: Post) =>
  post.body
    .map((block) =>
      isNote(block) ? `${block.title ?? ''} ${block.text}` : toPlainText([block]),
    )
    .join(' ')

/** Minutes to read at ~220 wpm, never less than one. */
export function readingMinutes(post: Post) {
  const words = plainText(post).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

/** Stable id for an h2, so a section can be linked to directly. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** The newest posts other than this one. */
export const otherPosts = (post: Post, count = 2) =>
  allPosts.filter((other) => other.slug !== post.slug).slice(0, count)
