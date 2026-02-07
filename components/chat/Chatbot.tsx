'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CAMPUS_RESIDENCES } from '@/types/listing';
import { getCheapestMonthlyPrice } from '@/hooks/useListings';
import styles from './Chatbot.module.css';

/* ── Types ──────────────────────────────────────────────── */
interface Message {
  id: number;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
}

/* ── Intent helpers ─────────────────────────────────────── */
const INTENTS: {
  keywords: string[];
  handler: (router: ReturnType<typeof useRouter>) => Message;
}[] = [
  /* ─ Search / browse ─ */
  {
    keywords: ['search', 'browse', 'find', 'listings', 'residences', 'all residences', 'explore'],
    handler: (router) => {
      router.push('/search');
      return reply('Taking you to the residences page! 🏠');
    },
  },
  /* ─ Sign in ─ */
  {
    keywords: ['sign in', 'signin', 'login', 'log in'],
    handler: (router) => {
      router.push('/signin');
      return reply('Redirecting you to the sign-in page. 🔑');
    },
  },
  /* ─ Register ─ */
  {
    keywords: ['register', 'sign up', 'signup', 'create account'],
    handler: (router) => {
      router.push('/register');
      return reply('Taking you to registration! ✍️');
    },
  },
  /* ─ Home ─ */
  {
    keywords: ['home', 'main page', 'start'],
    handler: (router) => {
      router.push('/');
      return reply('Going back to the home page! 🏡');
    },
  },
  /* ─ Admin ─ */
  {
    keywords: ['admin', 'dashboard', 'manage'],
    handler: (router) => {
      router.push('/admin');
      return reply('Opening the admin dashboard. 🛠');
    },
  },
  /* ─ Cheapest ─ */
  {
    keywords: ['cheapest', 'affordable', 'lowest price', 'budget'],
    handler: (router) => {
      const sorted = [...CAMPUS_RESIDENCES].sort(
        (a, b) => getCheapestMonthlyPrice(a) - getCheapestMonthlyPrice(b)
      );
      const top = sorted[0];
      const price = getCheapestMonthlyPrice(top);
      router.push(`/listing/${top.slug}`);
      return reply(
        `The most affordable is **${top.name}** starting at ~$${price}/mo. Taking you there!`
      );
    },
  },
  /* ─ Compare ─ */
  {
    keywords: ['compare', 'difference', 'vs', 'which one'],
    handler: () => {
      const lines = CAMPUS_RESIDENCES.map(
        (r) => `• **${r.name}** — ${r.residenceStyle}, ${r.totalBeds} beds, ~$${getCheapestMonthlyPrice(r)}/mo`
      ).join('\n');
      return reply(`Here's a quick comparison:\n${lines}`, [
        'Show cheapest',
        'Browse all',
      ]);
    },
  },
  /* ─ Apartment style ─ */
  {
    keywords: ['apartment', 'apartments'],
    handler: (router) => {
      router.push('/search');
      return reply(
        'Apartment-style residences: **Annex**, **Hyman Soloway**, and **45 Mann**. Showing the search page — filter by "Apartment"!',
        ['Tell me about Annex', 'Tell me about 45 Mann']
      );
    },
  },
  /* ─ Suite / studio ─ */
  {
    keywords: ['suite', 'studio'],
    handler: (router) => {
      router.push('/search');
      return reply(
        'Suite & studio residences: **90 University** and **Friel**. Showing the search page — filter by "Suite"!',
        ['Tell me about 90U', 'Tell me about Friel']
      );
    },
  },
  /* ─ Traditional ─ */
  {
    keywords: ['traditional', 'dorm'],
    handler: (router) => {
      router.push('/search');
      return reply(
        'Traditional-style residence: **Stanton** (357 beds, 8-month agreement, meal plan included). Showing the search page!',
        ['Tell me about Stanton']
      );
    },
  },
  /* ─ Meal plan ─ */
  {
    keywords: ['meal', 'food', 'dining', 'eat'],
    handler: () =>
      reply(
        'Residences with mandatory meal plans: **90 University** and **Stanton**. The apartment-style residences (Annex, Hyman Soloway, 45 Mann) have their own kitchens instead.',
        ['Show cheapest', 'Compare all']
      ),
  },
  /* ─ Help ─ */
  {
    keywords: ['help', 'what can you do', 'menu', 'options'],
    handler: () =>
      reply("Here's what I can help with:", [
        'Browse residences',
        'Compare all',
        'Show cheapest',
        'Apartments',
        'Suites',
        'Traditional',
        'Sign in',
      ]),
  },
];

/* Check each residence name as a keyword too */
function findResidenceIntent(
  input: string,
  router: ReturnType<typeof useRouter>
): Message | null {
  const lower = input.toLowerCase();
  for (const r of CAMPUS_RESIDENCES) {
    const names = [r.slug, r.name.toLowerCase()];
    if (r.slug === '90-university') names.push('90u');
    if (names.some((n) => lower.includes(n))) {
      const price = getCheapestMonthlyPrice(r);
      router.push(`/listing/${r.slug}`);
      return reply(
        `**${r.name}** — ${r.residenceStyle} style, ${r.totalBeds} beds, ${r.agreementLength} agreement. Starting at ~$${price}/mo. Taking you to the details page!`
      );
    }
  }
  return null;
}

let nextId = 1;
function reply(text: string, quickReplies?: string[]): Message {
  return { id: nextId++, role: 'bot', text, quickReplies };
}

/* ── Component ──────────────────────────────────────────── */
export default function Chatbot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    reply(
      "Hi! 👋 I'm your uOttawa housing assistant. Ask me about residences or I can navigate the site for you!",
      ['Browse residences', 'Compare all', 'Show cheapest', 'Help']
    ),
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = { id: nextId++, role: 'user', text };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');

      // Small delay for natural feel
      setTimeout(() => {
        const lower = text.toLowerCase().trim();

        // Check intents
        for (const intent of INTENTS) {
          if (intent.keywords.some((k) => lower.includes(k))) {
            setMessages((prev) => [...prev, intent.handler(router)]);
            return;
          }
        }

        // Check residence names
        const resMsg = findResidenceIntent(lower, router);
        if (resMsg) {
          setMessages((prev) => [...prev, resMsg]);
          return;
        }

        // Fallback
        setMessages((prev) => [
          ...prev,
          reply(
            "I'm not sure about that. Try asking about a specific residence, or use one of the quick options!",
            ['Browse residences', 'Compare all', 'Help']
          ),
        ]);
      }, 350);
    },
    [router]
  );

  /* ── Render inline markdown bold ─ */
  const renderText = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {i > 0 && <br />}
        {line.split(/(\*\*.*?\*\*)/g).map((seg, j) =>
          seg.startsWith('**') && seg.endsWith('**') ? (
            <strong key={j}>{seg.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{seg}</span>
          )
        )}
      </span>
    ));

  return (
    <>
      {/* Floating button */}
      <button
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>uOttawa Housing Assistant</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((m) => (
              <div key={m.id}>
                <div
                  className={`${styles.bubble} ${m.role === 'bot' ? styles.bot : styles.user}`}
                >
                  {renderText(m.text)}
                </div>
                {m.quickReplies && (
                  <div className={styles.quickReplies}>
                    {m.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        className={styles.quickBtn}
                        onClick={() => handleSend(qr)}
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputBar}>
            <input
              className={styles.inputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask me anything…"
            />
            <button className={styles.sendBtn} onClick={() => handleSend(input)}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
