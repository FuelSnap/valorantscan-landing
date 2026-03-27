'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AGENT_COUNT, MAP_COUNT } from '@/lib/gamedata';

/* ─── dynamic imports for code splitting ─── */
const MiniGames = dynamic(() => import('@/components/landing/MiniGames'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="w-6 h-6 border-2 border-val-red border-t-transparent rounded-full animate-spin" /></div>,
});
const MasterShowcase = dynamic(() => import('@/components/landing/MasterShowcase'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="w-6 h-6 border-2 border-val-red border-t-transparent rounded-full animate-spin" /></div>,
});

/* ───────────────────── constants ───────────────────── */

const FEATURES = [
  {
    title: '7 Unique Tools',
    description: 'Encounter Tracker, DriftLab, Agent Heatmap, Goal Tracker, StratBook, Peek Trainer & Agent Roulette — none of these exist on any other tracker.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    highlight: true,
  },
  {
    title: '100+ Trophies',
    description: 'From first Ace to thousand-kill milestones. Every accomplishment tracked and displayed with rarity tiers.',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    highlight: true,
  },
  {
    title: 'Player Encounters',
    description: 'Track who you keep running into. Nemesis detection, free ELO targets, and trusted duo suggestions — automatically.',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    highlight: true,
  },
];

const HOW_STEPS = [
  { label: 'Connect', desc: 'Riot Sign-On', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
  { label: 'Sync', desc: 'Auto-pull stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Climb', desc: 'Get insights', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];

const PERKS = [
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'First access before public launch' },
  { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', text: '30 days free premium' },
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', text: 'Shape the product with direct feedback' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Exclusive "Early Adopter" profile badge' },
];

/* ───────────────────── waitlist form hook ───────────────────── */

function useWaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return { email, setEmail, submitted, submitting, error, handleSubmit };
}

/* ───────────────────── inline form component ───────────────────── */

function WaitlistForm({ variant = 'default' }: { variant?: 'default' | 'compact' | 'nav' }) {
  const { email, setEmail, submitted, submitting, error, handleSubmit } = useWaitlistForm();

  if (submitted) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-val-stat-positive/10 ghost-border">
        <svg className="w-4 h-4 text-val-stat-positive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-inter text-sm text-val-stat-positive">You&apos;re on the list!</span>
      </div>
    );
  }

  if (variant === 'nav') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-40 lg:w-48 px-3 py-2 rounded-sm bg-val-bg-tertiary border border-white/[0.08] font-inter text-xs text-val-text-primary placeholder-val-text-muted focus:border-val-red/50 focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-sm bg-val-red hover:bg-val-red-hover text-white font-barlow font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-val-red/20 disabled:opacity-50"
        >
          {submitting ? '...' : 'Join'}
        </button>
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row items-center gap-3 ${variant === 'compact' ? 'max-w-md' : 'max-w-lg'} mx-auto`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:flex-1 px-4 py-3.5 rounded-sm bg-val-bg-tertiary ghost-border font-inter text-sm text-val-text-primary placeholder-val-text-muted focus:border-val-red/50 focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-val-red hover:bg-val-red-hover text-white font-barlow font-semibold text-sm uppercase tracking-wider transition-all shadow-lg shadow-val-red/20 disabled:opacity-50"
        >
          {submitting ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {error && <p className="mt-3 font-inter text-xs text-val-red text-center">{error}</p>}
      <p className="mt-2 font-inter text-[11px] text-val-text-muted text-center">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

/* ───────────────────── main page ───────────────────── */

export default function LandingPage() {
  return (
    <div className="bg-val-bg-primary text-val-text-primary min-h-screen">
      <LandingNav />

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,70,85,0.06)_0%,_transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,70,85,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,70,85,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Agent silhouettes */}
        <div className="absolute left-0 bottom-0 w-1/3 h-[85%] opacity-[0.05] hidden lg:block pointer-events-none">
          <Image src="/agents/full/jett.png" alt="" fill className="object-contain object-bottom" sizes="33vw" priority />
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-[85%] opacity-[0.05] hidden lg:block pointer-events-none">
          <Image src="/agents/full/reyna.png" alt="" fill className="object-contain object-bottom" sizes="33vw" priority />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* API Status badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm ghost-border bg-val-red/5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-val-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-val-red" />
              </span>
              <span className="font-barlow text-xs font-semibold text-val-red tracking-widest uppercase">
                Riot API Application In Review
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-oswald font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6"
          >
            <span className="text-val-text-primary">TRACK. ANALYZE.</span>
            <br />
            <span className="text-val-red">DOMINATE.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-base sm:text-lg text-val-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            The most advanced Valorant analytics platform. 7 tools no other tracker has,
            100+ trophies, encounter tracking &mdash; all free.
          </motion.p>

          {/* Waitlist form */}
          <motion.div id="waitlist" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <WaitlistForm />
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#FF4655', '#2DD4BF', '#F9D849', '#B042FF', '#3B82F6'].map((color, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-val-bg-primary flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: color, zIndex: 5 - i }}>
                    {['J', 'R', 'S', 'O', 'C'][i]}
                  </div>
                ))}
              </div>
              <span className="font-inter text-sm text-val-text-secondary">
                <span className="font-semibold text-val-text-primary">2,400+</span> players on the waitlist
              </span>
            </div>

            {/* How it works — inline 3 steps */}
            <div className="flex items-center gap-2 sm:gap-4 mt-2">
              {HOW_STEPS.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1 sm:gap-2">
                  {i > 0 && (
                    <svg className="w-3 h-3 text-val-red/40 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  )}
                  <div className="w-6 h-6 rounded-full bg-val-red/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-oswald text-[10px] font-bold text-val-red">{i + 1}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-barlow text-[10px] sm:text-xs font-semibold text-val-text-primary uppercase tracking-wider">{step.label}</div>
                    <div className="font-inter text-[9px] sm:text-[10px] text-val-text-muted hidden sm:block">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="w-full max-w-2xl mx-auto mt-8"
          >
            <LiveChart />
          </motion.div>
        </div>
      </section>

      {/* ════════ FEATURES (3 unique differentiators only) ════════ */}
      <section className="py-14" id="features">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="font-barlow text-xs font-semibold text-val-red tracking-[0.3em] uppercase mb-3 block">
              What Others Don&apos;t Have
            </span>
            <h2 className="font-oswald font-bold text-3xl md:text-4xl">
              BUILT DIFFERENT FROM <span className="text-val-red">EVERY TRACKER</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-sm ghost-border bg-val-bg-secondary hover:bg-val-bg-surface transition-all duration-300 border-l-2 border-l-val-red/30"
              >
                <div className="w-10 h-10 rounded-sm bg-val-red/10 flex items-center justify-center mb-4 text-val-red group-hover:bg-val-red/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-oswald font-bold text-base mb-2">{feature.title}</h3>
                <p className="font-inter text-sm text-val-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MASTER SHOWCASE ════════ */}
      <MasterShowcase />

      {/* ════════ MINI GAMES ════════ */}
      <section className="py-16 border-t border-white/[0.06]" id="games">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-barlow text-xs font-semibold text-val-red tracking-[0.3em] uppercase mb-3 block">
            Interactive
          </span>
          <h2 className="font-oswald font-bold text-3xl md:text-4xl mb-3">
            TEST YOUR <span className="text-val-red">KNOWLEDGE</span>
          </h2>
          <p className="font-inter text-sm text-val-text-secondary max-w-lg mx-auto">
            Think you know Valorant? Try our mini games and prove it.
          </p>
        </motion.div>
        <MiniGames />
      </section>

      {/* ════════ FINAL CTA (merged with perks) ════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-val-red/5 to-transparent" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-oswald font-bold text-3xl md:text-4xl mb-4">
              READY TO <span className="text-val-red">SEE YOUR STATS</span>?
            </h2>
            <p className="font-inter text-val-text-secondary mb-6 text-lg">
              Join 2,400+ players already on the waitlist.
            </p>

            {/* Perks inline */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8">
              {PERKS.map((perk) => (
                <div key={perk.text} className="flex items-center gap-2 text-left">
                  <svg className="w-4 h-4 text-val-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
                  </svg>
                  <span className="font-inter text-xs text-val-text-secondary">{perk.text}</span>
                </div>
              ))}
            </div>

            <WaitlistForm />

            <div className="flex items-center justify-center gap-4 mt-8 mb-4">
              <a
                href="https://x.com/ValorantScan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm ghost-border bg-val-bg-secondary flex items-center justify-center text-val-text-muted hover:text-val-text-primary hover:bg-val-bg-tertiary transition-all"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <p className="font-inter text-sm text-val-text-muted">Built by players, for players.</p>
          </motion.div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-8 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-oswald text-base font-bold tracking-tight">
              <span className="text-val-red">VALORANT</span>
              <span className="text-val-text-primary">SCAN</span>
            </span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="font-inter text-xs text-val-text-muted hover:text-val-text-secondary transition-colors">Privacy</Link>
              <Link href="/terms" className="font-inter text-xs text-val-text-muted hover:text-val-text-secondary transition-colors">Terms</Link>
              <p className="font-inter text-xs text-val-text-muted">&copy; 2026 ValorantScan</p>
            </div>
          </div>
          <p className="font-inter text-[10px] text-val-text-muted text-center mt-6 max-w-2xl mx-auto leading-relaxed">
            ValorantScan is not endorsed by Riot Games and does not reflect the views or opinions of
            Riot Games or anyone officially involved in producing or managing Riot Games properties.
            Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ───────────────────── subcomponents ───────────────────── */

function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-val-bg-primary/95 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-oswald text-xl font-bold tracking-tight">
            <span className="text-val-red">VALORANT</span>
            <span className="text-val-text-primary">SCAN</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="font-barlow text-xs font-semibold text-val-text-secondary hover:text-val-text-primary uppercase tracking-wider transition-colors">
            Features
          </a>
          <a href="#showcase" className="font-barlow text-xs font-semibold text-val-text-secondary hover:text-val-text-primary uppercase tracking-wider transition-colors">
            Tools
          </a>
          <a href="#games" className="font-barlow text-xs font-semibold text-val-text-secondary hover:text-val-text-primary uppercase tracking-wider transition-colors">
            Mini Games
          </a>
        </div>

        {/* Show inline form when hero form scrolled out, button otherwise */}
        <div className="hidden sm:block">
          {pastHero ? (
            <WaitlistForm variant="nav" />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="px-4 py-2.5 rounded-sm bg-val-red hover:bg-val-red-hover text-white font-barlow font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-val-red/20"
            >
              Join Waitlist
            </button>
          )}
        </div>
        {/* Mobile: always show button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          className="sm:hidden px-4 py-2.5 rounded-sm bg-val-red hover:bg-val-red-hover text-white font-barlow font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-val-red/20"
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
}

function LiveChart() {
  const POINTS = 40;
  const W = 600;
  const H = 120;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: POINTS }, (_, i) => 0.9 + Math.sin(i * 0.3) * 0.35 + Math.random() * 0.15)
  );
  const [liveKD, setLiveKD] = useState(1.42);
  const [liveWR, setLiveWR] = useState(54.2);
  const [liveADR, setLiveADR] = useState(168.3);

  const tick = useCallback(() => {
    setData(prev => {
      const next = [...prev.slice(1)];
      const last = prev[prev.length - 1];
      const nudge = (Math.random() - 0.48) * 0.12;
      next.push(Math.max(0.4, Math.min(2.0, last + nudge)));
      return next;
    });
    setLiveKD(v => Math.max(0.8, Math.min(2.2, v + (Math.random() - 0.48) * 0.03)));
    setLiveWR(v => Math.max(40, Math.min(68, v + (Math.random() - 0.48) * 0.4)));
    setLiveADR(v => Math.max(130, Math.min(210, v + (Math.random() - 0.48) * 1.2)));
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(tick, 800);
    return () => clearInterval(id);
  }, [tick, isInView]);

  const minV = Math.min(...data) - 0.1;
  const maxV = Math.max(...data) + 0.1;
  const toX = (i: number) => (i / (POINTS - 1)) * W;
  const toY = (v: number) => H - ((v - minV) / (maxV - minV)) * (H - 8) - 4;

  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`;
  const lastY = toY(data[data.length - 1]);

  return (
    <div ref={containerRef} className="rounded-sm ghost-border bg-val-bg-secondary/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 rounded-full bg-val-red animate-pulse" />
          <span className="font-barlow text-[10px] sm:text-xs font-semibold text-val-text-muted uppercase tracking-wider">
            Live Performance
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <div className="font-barlow text-[9px] sm:text-[10px] text-val-text-muted uppercase tracking-wider">K/D</div>
            <div className="font-jetbrains font-bold text-xs sm:text-sm text-val-text-primary tabular-nums">{liveKD.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <div className="font-barlow text-[9px] sm:text-[10px] text-val-text-muted uppercase tracking-wider">Win%</div>
            <div className="font-jetbrains font-bold text-xs sm:text-sm text-val-red tabular-nums">{liveWR.toFixed(1)}%</div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="font-barlow text-[10px] text-val-text-muted uppercase tracking-wider">ADR</div>
            <div className="font-jetbrains font-bold text-sm text-val-text-primary tabular-nums">{liveADR.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="px-2 py-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24 sm:h-28" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4655" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF4655" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF4655" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#FF4655" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF4655" stopOpacity="1" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1="0" y1={H * f} x2={W} y2={H * f} stroke="rgba(236,232,225,0.03)" strokeWidth="1" />
          ))}

          <path d={areaPath} fill="url(#chartGrad)" className="transition-all duration-700" />
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700" />

          <circle cx={W} cy={lastY} r="4" fill="#FF4655" className="transition-all duration-700">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={W} cy={lastY} r="8" fill="#FF4655" opacity="0.2" className="transition-all duration-700">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
}
