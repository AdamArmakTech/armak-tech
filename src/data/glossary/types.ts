/**
 * Glossary entry format. Entries live in one file per alphabet range (a-c.ts, d-h.ts, …)
 * and are merged + validated in ./index.ts.
 *
 * Audience: someone who has never seen any of these words — a building owner, office
 * manager or new hire. Plain English first; any technical word used inside a definition
 * must itself be a glossary entry (link it via `related`) or be explained inline.
 */
import type { ServiceSlug } from '../site';

export type GlossaryCategory =
  | 'cabling' // structured cabling, fiber, pathways, telecom rooms
  | 'networking' // switches, routers, Wi-Fi, firewalls, internet
  | 'security' // cameras, video recording, analytics
  | 'access' // doors, readers, credentials, intercom
  | 'voice' // phones, VoIP, paging
  | 'av' // displays, audio, conference rooms
  | 'power' // PoE, UPS, grounding, electrical
  | 'standards' // TIA/ANSI/IEEE/NEC/BICSI and other standards & bodies
  | 'general'; // project, documentation and industry terms

export interface GlossaryEntry {
  /** Display term, exactly as people write it: "PoE", "Patch panel", "Cat 6A" */
  term: string;
  /** kebab-case id, unique across the whole glossary: "poe", "patch-panel", "cat-6a" */
  slug: string;
  /** What an abbreviation stands for: "Power over Ethernet". Omit for non-abbreviations. */
  stands_for?: string;
  /** Other names people use: ["Network closet", "Telecom room"] */
  aka?: string[];
  category: GlossaryCategory;
  /** 1–2 plain-English sentences. No unexplained jargon. ≤ 45 words. */
  definition: string;
  /** Why a building owner should care — one sentence, practical. ≤ 30 words. */
  why_it_matters: string;
  /** Optional everyday analogy: "Like a power strip, but for network cables." */
  analogy?: string;
  /**
   * 2–3 questions a complete beginner would actually ask about this term, with plain answers
   * (each answer ≤ 50 words). Shown when the visitor clicks the term.
   * e.g. { q: "Do I need PoE?", a: "If you're installing Wi-Fi access points or IP cameras…" }
   */
  qa: { q: string; a: string }[];
  /** Slugs of other glossary entries (any letter range). Validated at build; dangling ones are dropped. */
  related?: string[];
  /** Armak service page this term belongs to, if any */
  service?: ServiceSlug;
}
