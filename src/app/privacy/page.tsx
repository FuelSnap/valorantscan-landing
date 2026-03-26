'use client';

import { motion } from 'framer-motion';
const TOC_ITEMS = [
  { id: 'overview', label: '1. Overview' },
  { id: 'rso', label: '2. RSO Authentication' },
  { id: 'optin', label: '3. Opt-In Consent' },
  { id: 'data-collect', label: '4. Data We Collect' },
  { id: 'data-use', label: '5. How We Use Data' },
  { id: 'storage', label: '6. Storage & Security' },
  { id: 'deletion', label: '7. Data Deletion' },
  { id: 'cookies', label: '8. Cookies' },
  { id: 'third-party', label: '9. Third-Party Services' },
  { id: 'children', label: "10. Children's Privacy" },
  { id: 'changes', label: '11. Changes' },
  { id: 'contact', label: '12. Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-oswald font-bold text-3xl md:text-4xl text-zinc-900 dark:text-val-text-primary mb-4">
            PRIVACY POLICY
          </h1>
          {/* LP2: Prominent last updated date */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-val-red/10 border border-val-red/20">
              <svg className="w-4 h-4 text-val-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-zinc-500 dark:text-val-text-primary/60">
                Last updated: February 24, 2026
              </span>
            </div>
</motion.div>

        {/* LP1: Table of Contents */}
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-sm ghost-border bg-val-bg-secondary p-4 mb-6"
          >
            <h2 className="font-oswald font-semibold text-sm text-zinc-900 dark:text-val-text-primary mb-3">Table of Contents</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {TOC_ITEMS.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-xs text-zinc-500 dark:text-val-text-primary/50 hover:text-val-red transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-sm ghost-border bg-val-bg-secondary p-4 prose prose-invert max-w-none"
        >
          <div className="space-y-8 text-zinc-600 dark:text-val-text-primary/70">
            {/* 1. Overview */}
            <section id="overview">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                1. Overview
              </h2>
              <p>
                ValorantScan (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a third-party statistics and analytics
                platform for Valorant. This Privacy Policy explains how we collect, use, store, and protect
                your information when you use our service. By using ValorantScan, you agree to the practices
                described in this policy.
              </p>
            </section>

            {/* 2. RSO Authentication */}
            <section id="rso">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                2. Riot Sign On (RSO) Authentication
              </h2>
              <p>
                ValorantScan uses Riot Sign On (RSO) as our authentication method. When you sign in,
                you are redirected to Riot Games&apos; secure authentication page. We never see, store, or
                have access to your Riot Games account password.
              </p>
              <p className="mt-3">Through RSO authentication, we receive:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your PUUID (Player Universally Unique Identifier)</li>
                <li>Your Riot ID (game name and tagline)</li>
                <li>Your account region</li>
                <li>An OAuth2 access token (used to make authorized API requests on your behalf)</li>
              </ul>
              <p className="mt-3">
                Access tokens are short-lived and stored securely in an encrypted session cookie.
                We do not store refresh tokens beyond the active session.
              </p>
            </section>

            {/* 3. Opt-In Consent */}
            <section id="optin">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                3. Opt-In Data Sharing Consent
              </h2>
              <p>
                After authenticating, you will be asked to explicitly opt in to data sharing.
                <strong className="text-zinc-900 dark:text-val-text-primary"> Your gameplay data is not displayed publicly until you opt in.</strong>
              </p>
              <p className="mt-3">By opting in, you consent to the following:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your match history, statistics, and rank will be visible to other ValorantScan users</li>
                <li>Your profile may appear on public leaderboards</li>
                <li>Your performance data will be included in aggregate meta-analytics</li>
              </ul>
              <p className="mt-3">
                You may revoke your opt-in consent at any time from your
                <a href="/auth/settings" className="text-val-red hover:underline mx-1">account settings</a>
                page. Revoking consent will remove your profile from public view and leaderboards.
              </p>
            </section>

            {/* 4. Data We Collect */}
            <section id="data-collect">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                4. Data We Collect
              </h2>
              <p className="font-medium text-zinc-900 dark:text-val-text-primary">For authenticated users who have opted in:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Riot ID and PUUID</li>
                <li>Competitive rank and rank history</li>
                <li>Match history (results, scores, agent selections, weapon usage)</li>
                <li>Performance statistics (K/D, win rate, headshot %, ACS, ADR, etc.)</li>
                <li>Agent, map, and weapon usage data</li>
                <li>Opt-in consent status and timestamp</li>
              </ul>

              <p className="font-medium text-zinc-900 dark:text-val-text-primary mt-4">For all visitors:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Essential cookies for session management and preferences (region, theme)</li>
                <li>Basic analytics data (page views, not linked to Riot accounts)</li>
              </ul>

              <p className="mt-4">
                <strong className="text-zinc-900 dark:text-val-text-primary">We do NOT collect:</strong> your email address, real name, payment information,
                IP address for tracking, or any data outside of the Riot Games API scope.
              </p>
            </section>

            {/* 5. How We Use Data */}
            <section id="data-use">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                5. How We Use Your Data
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Displaying your player profile, statistics, and match history</li>
                <li>Generating performance trends, insights, and recommendations</li>
                <li>Populating leaderboards with opted-in player data</li>
                <li>Computing aggregate meta-analytics (agent pick rates, map win rates, etc.)</li>
                <li>Improving our service based on usage patterns</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            {/* 6. Data Storage & Security */}
            <section id="storage">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                6. Data Storage &amp; Security
              </h2>
              <p>
                Game data is cached to improve performance and reduce API load. Cached data is refreshed
                periodically and old data is automatically purged. Session data is stored in encrypted
                HTTP-only cookies.
              </p>
              <p className="mt-3">
                We implement industry-standard security measures including HTTPS encryption, secure cookie
                handling, and regular security reviews. However, no method of transmission over the internet
                is 100% secure.
              </p>
            </section>

            {/* 7. Data Deletion */}
            <section id="deletion">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                7. Data Deletion &amp; Account Unlinking
              </h2>
              <p>
                You may request complete deletion of your data at any time by:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Visiting your <a href="/auth/settings" className="text-val-red hover:underline">account settings</a> and clicking &quot;Delete My Data&quot;</li>
                <li>Contacting us via our <a href="/contact" className="text-val-red hover:underline">contact page</a></li>
              </ul>
              <p className="mt-3">
                Upon receiving a deletion request, we will remove all stored data associated with your
                account within 30 days. This includes your profile data, cached match history, and
                opt-in records. You may also unlink your Riot account from ValorantScan at any time.
              </p>
            </section>

            {/* 8. Cookies */}
            <section id="cookies">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                8. Cookies
              </h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Essential cookies:</strong> Session management, authentication state, CSRF protection</li>
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Preference cookies:</strong> Selected region, theme (light/dark), demo mode settings</li>
              </ul>
              <p className="mt-3">
                We do not use tracking cookies, advertising cookies, or third-party analytics cookies
                that track you across other websites. We do not sell cookie data to third parties.
              </p>
            </section>

            {/* 9. Third-Party Services */}
            <section id="third-party">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                9. Third-Party Services
              </h2>
              <p>
                We use the Riot Games API to fetch game data. Your use of ValorantScan is also subject to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><a href="https://www.riotgames.com/en/privacy-notice" className="text-val-red hover:underline" target="_blank" rel="noopener noreferrer">Riot Games Privacy Notice</a></li>
                <li><a href="https://www.riotgames.com/en/terms-of-service" className="text-val-red hover:underline" target="_blank" rel="noopener noreferrer">Riot Games Terms of Service</a></li>
              </ul>
            </section>

            {/* 10. Children */}
            <section id="children">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                10. Children&apos;s Privacy
              </h2>
              <p>
                ValorantScan is not intended for children under the age of 13. We do not knowingly
                collect personal information from children. If you are a parent or guardian and believe
                your child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* 11. Changes */}
            <section id="changes">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of significant
                changes by posting a notice on our site. Continued use of ValorantScan after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* 12. Contact */}
            <section id="contact">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy or wish to exercise your data rights,
                please visit our
                <a href="/contact" className="text-val-red hover:underline ml-1">contact page</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
