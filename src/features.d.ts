/**
 * Build-time feature flags, set from src/features.json by vite.config.ts.
 * They are replaced with literal true/false at build, so code behind a flag
 * that is off is removed from the bundle and the prerendered pages entirely.
 */
declare const __BLOG_ENABLED__: boolean
