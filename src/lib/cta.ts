/**
 * Builds contact-form links that carry context, so a CTA continues what the visitor was reading
 * instead of starting over. The form (src/components/forms/ContactForm.astro) reads these params.
 *
 *   contactHref()                                  → /contact/#form
 *   contactHref({ about: 'networking' })           → preselects Networking & Wi-Fi
 *   contactHref({ about: 'PoE', mode: 'quick' })   → short "ask a question" form about PoE
 *   contactHref({ intent: 'support' })             → "Tell us what's wrong" (existing customers)
 *   contactHref({ about: 'structured-cabling', note: 'Estimator: about 48 drops…' })
 *                                                  → prefills the message box with that text (max 300 chars,
 *                                                    plain text, only if the box is empty) with a "Clear" button
 *
 * This file has no Node-only imports, so client scripts may import it too.
 */
export interface ContactLink {
  /** A service slug (preselects its chip) or any short topic text (shown as "Asking about …") */
  about?: string;
  mode?: 'quick';
  intent?: 'support';
  /** Plain-text sentence to prefill the message box (trimmed, max 300 chars) */
  note?: string;
}

export function contactHref({ about, mode, intent, note }: ContactLink = {}): string {
  const params = new URLSearchParams();
  if (about) params.set('about', about);
  if (mode) params.set('mode', mode);
  if (intent) params.set('intent', intent);
  const cleanNote = note?.trim().slice(0, 300);
  if (cleanNote) params.set('note', cleanNote);
  const query = params.toString();
  return `/contact/${query ? `?${query}` : ''}#form`;
}

export const checklistHref = '/plan/#checklist';
export const estimatorHref = '/plan/#estimator';
