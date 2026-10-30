/**
 * Builds contact-form links that carry context, so a CTA continues what the visitor was reading
 * instead of starting over. The form (src/components/forms/ContactForm.astro) reads these params.
 *
 *   contactHref()                                  → /contact/#form
 *   contactHref({ about: 'networking' })           → preselects Networking & Wi-Fi
 *   contactHref({ about: 'PoE', mode: 'quick' })   → short "ask a question" form about PoE
 *   contactHref({ intent: 'support' })             → "Tell us what's wrong" (existing customers)
 */
export interface ContactLink {
  /** A service slug (preselects its chip) or any short topic text (shown as "Asking about …") */
  about?: string;
  mode?: 'quick';
  intent?: 'support';
}

export function contactHref({ about, mode, intent }: ContactLink = {}): string {
  const params = new URLSearchParams();
  if (about) params.set('about', about);
  if (mode) params.set('mode', mode);
  if (intent) params.set('intent', intent);
  const query = params.toString();
  return `/contact/${query ? `?${query}` : ''}#form`;
}

export const checklistHref = '/plan/#checklist';
export const estimatorHref = '/plan/#estimator';
