'use client';

import { motion } from 'framer-motion';
const TOS_TOC = [
  { id: 'acceptance', label: '1. Acceptance' },
  { id: 'description', label: '2. Description' },
  { id: 'rso', label: '3. RSO & Linking' },
  { id: 'optin', label: '4. Opt-In Consent' },
  { id: 'optout', label: '5. Opt-Out & Rights' },
  { id: 'conduct', label: '6. User Conduct' },
  { id: 'ip', label: '7. Intellectual Property' },
  { id: 'disclaimer', label: '8. Disclaimer' },
  { id: 'liability', label: '9. Limitation' },
  { id: 'termination', label: '10. Termination' },
  { id: 'changes', label: '11. Changes' },
  { id: 'riot', label: '12. Riot Compliance' },
  { id: 'contact', label: '13. Contact' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-oswald font-bold text-3xl md:text-4xl text-zinc-900 dark:text-val-text-primary mb-4">
            TERMS OF SERVICE
          </h1>
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
              {TOS_TOC.map(item => (
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
            {/* 1. Acceptance */}
            <section id="acceptance">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using ValorantScan (&quot;the Service&quot;), you agree to be bound by these
                Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you must not use the Service.
              </p>
            </section>

            {/* 2. Service Description */}
            <section id="description">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                2. Service Description
              </h2>
              <p>
                ValorantScan is a third-party statistics and analytics platform for Valorant.
                We provide player performance tracking, leaderboards, match history analysis,
                and gameplay insights using data from the Riot Games API.
              </p>
              <p className="mt-3">
                <strong className="text-zinc-900 dark:text-val-text-primary">ValorantScan is not affiliated with, endorsed by, or connected to Riot Games, Inc.</strong> Valorant
                and all associated trademarks, logos, and game assets are the property of Riot Games, Inc.
              </p>
            </section>

            {/* 3. RSO & Account Linking */}
            <section id="rso">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                3. Riot Sign On (RSO) &amp; Account Linking
              </h2>
              <p>
                ValorantScan offers authentication through Riot Sign On (RSO). By linking your
                Riot Games account, you authorize ValorantScan to access your gameplay data through
                the Riot Games API within the scope permitted by Riot Games.
              </p>
              <p className="mt-3">When you authenticate via RSO:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your credentials are handled exclusively by Riot Games&apos; secure systems</li>
                <li>ValorantScan receives an OAuth2 token with limited scope</li>
                <li>We access only the data necessary to provide our analytics services</li>
                <li>You may unlink your account at any time from your <a href="/auth/settings" className="text-val-red hover:underline">account settings</a></li>
              </ul>
            </section>

            {/* 4. Opt-In Consent */}
            <section id="optin">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                4. Opt-In Data Sharing Consent
              </h2>
              <p>
                After authenticating, you may choose to opt in to public data sharing.
                Opting in means:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your match history, statistics, and rank become visible to other users</li>
                <li>Your profile may appear on public leaderboards</li>
                <li>Your data contributes to aggregate analytics and insights</li>
              </ul>
              <p className="mt-3">
                <strong className="text-zinc-900 dark:text-val-text-primary">Opting in is entirely voluntary.</strong> You can use ValorantScan to view your own private
                stats without opting in. You may revoke your opt-in consent at any time, and your
                data will be removed from public view.
              </p>
            </section>

            {/* 5. Opt-Out & Data Rights */}
            <section id="optout">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                5. Opt-Out &amp; Data Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Opt out</strong> of public data sharing at any time via <a href="/auth/settings" className="text-val-red hover:underline">account settings</a></li>
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Unlink</strong> your Riot account from ValorantScan</li>
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Request deletion</strong> of all data associated with your account</li>
                <li><strong className="text-zinc-900 dark:text-val-text-primary">Export</strong> your data in a portable format</li>
              </ul>
              <p className="mt-3">
                Opting out will immediately hide your profile from public leaderboards and search results.
                Full data deletion requests are processed within 30 days.
              </p>
            </section>

            {/* 6. User Conduct */}
            <section id="conduct">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                6. User Conduct
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Attempt to access data you are not authorized to view</li>
                <li>Use automated systems to scrape or download data in bulk</li>
                <li>Attempt to interfere with the proper functioning of the Service</li>
                <li>Circumvent any privacy controls or access restrictions</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Impersonate other players or misrepresent your identity</li>
              </ul>
            </section>

            {/* 7. Intellectual Property */}
            <section id="ip">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                7. Intellectual Property
              </h2>
              <p>
                Valorant and all associated trademarks, logos, and game assets are the property
                of Riot Games, Inc. ValorantScan&apos;s original content, design, and code are our
                intellectual property. Game data displayed on ValorantScan is sourced from the
                Riot Games API and is used in compliance with Riot&apos;s developer policies.
              </p>
            </section>

            {/* 8. Disclaimer */}
            <section id="disclaimer">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                8. Disclaimer of Warranties
              </h2>
              <p>
                ValorantScan is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
                either express or implied. We do not guarantee the accuracy, completeness, or
                reliability of any data displayed. Game statistics may be delayed, incomplete,
                or subject to Riot Games API availability.
              </p>
            </section>

            {/* 9. Limitation of Liability */}
            <section id="liability">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, ValorantScan shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages resulting from
                your use of or inability to use the Service, including but not limited to loss of
                data or unauthorized access to your account.
              </p>
            </section>

            {/* 10. Termination */}
            <section id="termination">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                10. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your access to ValorantScan at our
                discretion, including for violations of these Terms. Upon termination, your right
                to use the Service will immediately cease. You may also terminate your account at
                any time by unlinking your Riot account and requesting data deletion.
              </p>
            </section>

            {/* 11. Changes */}
            <section id="changes">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be
                communicated through a notice on the Service. Continued use of ValorantScan after
                changes constitutes acceptance of the updated Terms. If you disagree with the
                changes, you must stop using the Service.
              </p>
            </section>

            {/* 12. Riot Games Compliance */}
            <section id="riot">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                12. Riot Games Compliance
              </h2>
              <p>
                ValorantScan operates in compliance with the
                <a href="https://developer.riotgames.com/policies/general" className="text-val-red hover:underline mx-1" target="_blank" rel="noopener noreferrer">Riot Games Developer Policies</a>.
                We adhere to Riot&apos;s requirements regarding data usage, player privacy, and API rate limits.
                ValorantScan is not endorsed by Riot Games and does not reflect the views or opinions
                of Riot Games or anyone officially involved in producing or managing Riot Games properties.
              </p>
            </section>

            {/* 13. Contact */}
            <section id="contact">
              <h2 className="font-oswald font-semibold text-xl text-zinc-900 dark:text-val-text-primary mb-3">
                13. Contact
              </h2>
              <p>
                For questions about these Terms, please visit our
                <a href="/contact" className="text-val-red hover:underline ml-1">contact page</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
