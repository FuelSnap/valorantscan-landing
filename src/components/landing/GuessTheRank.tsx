'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  prepareRounds, getRankTierColor, getScoreRating, mapNameToSlug, roleToSlug,
  type RoundData,
} from '@/lib/landing/guessTheRank';

type Phase = 'intro' | 'playing' | 'reveal' | 'results';

const TOTAL_ROUNDS = 5;

/* ─────────── HELPERS ─────────── */

function getStatColor(label: string, value: number): string {
  switch (label) {
    case 'K/D': return value >= 1.3 ? '#22C55E' : value >= 1.0 ? '#ECE8E1' : '#EF4444';
    case 'HS%': return value >= 25 ? '#22C55E' : value >= 18 ? '#ECE8E1' : '#EF4444';
    case 'Win Rate': return value >= 55 ? '#22C55E' : value >= 48 ? '#ECE8E1' : '#EF4444';
    case 'ACS': return value >= 240 ? '#22C55E' : value >= 180 ? '#ECE8E1' : '#EF4444';
    default: return '#ECE8E1';
  }
}

/* ─────────── MAIN COMPONENT ─────────── */

export default function GuessTheRank() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [rounds, setRounds] = useState<RoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showNext, setShowNext] = useState(false);

  const startGame = useCallback(() => {
    const newRounds = prepareRounds(TOTAL_ROUNDS);
    setRounds(newRounds);
    setCurrentRound(0);
    setScore(0);
    setAnswers([]);
    setSelectedIdx(null);
    setShowNext(false);
    setPhase('playing');
  }, []);

  const handleChoice = useCallback((choiceIdx: number) => {
    if (selectedIdx !== null) return;
    const round = rounds[currentRound];
    const isCorrect = round.choices[choiceIdx].isCorrect;

    setSelectedIdx(choiceIdx);
    setAnswers(prev => [...prev, isCorrect]);
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => setPhase('reveal'), 600);
    setTimeout(() => setShowNext(true), 1500);
  }, [selectedIdx, rounds, currentRound]);

  const handleNext = useCallback(() => {
    const nextRound = currentRound + 1;
    if (nextRound >= TOTAL_ROUNDS) {
      setPhase('results');
    } else {
      setCurrentRound(nextRound);
      setSelectedIdx(null);
      setShowNext(false);
      setPhase('playing');
    }
  }, [currentRound]);

  const round = rounds[currentRound];

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative floating orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF4655]/[0.04] rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#B042FF]/[0.03] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s' }} />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,70,85,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroPhase key="intro" onStart={startGame} />}
        {phase === 'playing' && round && (
          <PlayingPhase
            key={`playing-${currentRound}`}
            round={round}
            roundNum={currentRound}
            answers={answers}
            selectedIdx={selectedIdx}
            onChoice={handleChoice}
          />
        )}
        {phase === 'reveal' && round && (
          <RevealPhase
            key={`reveal-${currentRound}`}
            round={round}
            roundNum={currentRound}
            answers={answers}
            showNext={showNext}
            onNext={handleNext}
          />
        )}
        {phase === 'results' && (
          <ResultsPhase
            key="results"
            score={score}
            total={TOTAL_ROUNDS}
            onPlayAgain={startGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── INTRO PHASE ─────────── */

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12 sm:py-16 relative"
    >
      {/* Crosshair icon */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <svg className="w-10 h-10 mx-auto text-[#FF4655]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </motion.div>

      <span className="text-xs font-semibold text-[#FF4655] tracking-[0.3em] uppercase mb-4 block">
        Test Your Game Sense
      </span>

      <h2 className="font-oswald font-bold text-4xl sm:text-5xl md:text-6xl text-[#ECE8E1] mb-5">
        GUESS THE{' '}
        <span className="text-[#FF4655] animate-glow-pulse">RANK</span>
      </h2>

      <p className="text-[#ECE8E1]/40 max-w-lg mx-auto mb-10 text-base sm:text-lg leading-relaxed">
        Can you guess a player&apos;s rank from their stats alone? 5 rounds, 4 choices each. Let&apos;s see if you have the eye of a Radiant.
      </p>

      <button
        onClick={onStart}
        className="px-10 py-5 rounded-xl bg-[#FF4655] hover:bg-[#BD3944] text-white font-oswald font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-xl hover:shadow-[#FF4655]/30 hover:scale-[1.02] active:scale-[0.98] animate-btn-pulse"
      >
        Start Challenge
      </button>
    </motion.div>
  );
}

/* ─────────── PROGRESS BAR ─────────── */

function ProgressBar({ roundNum, answers }: { roundNum: number; answers: (boolean | null)[] }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
        const isCompleted = i < answers.length;
        const isCurrent = i === roundNum && !isCompleted;
        const isCorrect = isCompleted && answers[i];
        const isWrong = isCompleted && !answers[i];

        return (
          <div key={i} className="flex items-center">
            <div className={`
              relative w-9 h-9 rounded-full flex items-center justify-center
              font-oswald font-bold text-sm transition-all duration-500
              ${isCurrent
                ? 'bg-[#FF4655]/20 border-2 border-[#FF4655] text-[#FF4655] shadow-lg shadow-[#FF4655]/20'
                : isCorrect
                ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                : isWrong
                ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                : 'bg-white/5 border border-white/10 text-[#ECE8E1]/30'}
            `}>
              {isCorrect ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : isWrong ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < TOTAL_ROUNDS - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 transition-colors duration-500 ${
                i < answers.length ? (answers[i] ? 'bg-green-500/40' : 'bg-red-500/40') : 'bg-white/10'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────── PLAYING PHASE ─────────── */

function PlayingPhase({
  round,
  roundNum,
  answers,
  selectedIdx,
  onChoice,
}: {
  round: RoundData;
  roundNum: number;
  answers: (boolean | null)[];
  selectedIdx: number | null;
  onChoice: (idx: number) => void;
}) {
  const stats = [
    { label: 'K/D', value: round.stats.kd.toFixed(2), raw: round.stats.kd },
    { label: 'HS%', value: `${round.stats.hsPercent.toFixed(1)}%`, raw: round.stats.hsPercent },
    { label: 'Win Rate', value: `${round.stats.winRate.toFixed(1)}%`, raw: round.stats.winRate },
    { label: 'ACS', value: round.stats.acs.toFixed(0), raw: round.stats.acs },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ProgressBar roundNum={roundNum} answers={answers} />

      {/* Round header */}
      <div className="text-center mb-5">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-[#ECE8E1]/50 uppercase tracking-wider font-oswald font-semibold">
          Round <span className="text-[#FF4655]">{roundNum + 1}</span> of {TOTAL_ROUNDS}
        </span>
      </div>

      {/* Stat card */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 mb-5">
        {/* Core stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {stats.map((s, i) => {
            const statColor = getStatColor(s.label, s.raw);
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center relative overflow-hidden hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${statColor}, transparent)` }} />
                <div className="font-oswald font-black text-2xl sm:text-3xl" style={{ color: statColor }}>
                  {s.value}
                </div>
                <div className="text-[10px] text-[#ECE8E1]/40 uppercase tracking-wider mt-1 font-semibold">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Top agents */}
        <div className="mb-4">
          <div className="text-[10px] text-[#ECE8E1]/30 uppercase tracking-wider mb-2 font-semibold">Top Agents</div>
          <div className="flex gap-3 flex-wrap">
            {round.topAgents.map(agent => {
              const roleSl = roleToSlug(agent.role);
              return (
                <div key={agent.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 sm:px-4 py-3 flex-1 min-w-0 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#FF4655]/10 flex-shrink-0 border border-white/[0.06]">
                    <Image
                      src={`/agents/${agent.id}.png`}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                    {roleSl && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0A141D] border border-white/10 flex items-center justify-center">
                        <Image src={`/assets/roles/${roleSl}.png`} alt={agent.role} width={10} height={10} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-oswald font-bold text-[#ECE8E1] truncate">{agent.name}</div>
                    <div className="text-[10px] text-[#ECE8E1]/30 font-semibold uppercase tracking-wide">
                      {agent.role} <span className="text-[#ECE8E1]/15">|</span> {agent.kd.toFixed(2)} KD
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best maps with splash thumbnails */}
        <div>
          <div className="text-[10px] text-[#ECE8E1]/30 uppercase tracking-wider mb-2 font-semibold">Best Maps</div>
          <div className="flex gap-2">
            {round.topMaps.map(map => {
              const slug = mapNameToSlug(map.name);
              return (
                <div key={map.name} className="relative rounded-xl overflow-hidden border border-white/[0.06] flex-1 group hover:border-white/10 transition-all duration-300">
                  {slug ? (
                    <div className="relative h-16 sm:h-20">
                      <Image
                        src={`/assets/maps/${slug}_splash.png`}
                        alt={map.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                        <div className="text-xs font-oswald font-bold text-white">{map.name}</div>
                        <div className="text-[10px] text-white/60 font-semibold">{map.winRate.toFixed(1)}% WR</div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-16 sm:h-20 bg-white/[0.03] flex flex-col items-center justify-center p-2">
                      <div className="text-xs font-oswald font-bold text-[#ECE8E1]">{map.name}</div>
                      <div className="text-[10px] text-[#ECE8E1]/30">{map.winRate.toFixed(1)}% WR</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rank choices */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {round.choices.map((choice, idx) => {
          const color = getRankTierColor(choice.rank);
          const isSelected = selectedIdx === idx;

          let stateClasses = 'border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]';
          if (isSelected && choice.isCorrect) stateClasses = 'border-green-500/50 bg-green-500/[0.08]';
          if (isSelected && !choice.isCorrect) stateClasses = 'border-red-500/50 bg-red-500/[0.08] animate-shake';

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + idx * 0.06 }}
              onClick={() => onChoice(idx)}
              disabled={selectedIdx !== null}
              className={`relative rounded-xl border ${stateClasses} bg-white/[0.02] backdrop-blur-sm transition-all duration-300 p-5 text-center group disabled:cursor-default overflow-hidden`}
            >
              {/* Left accent border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: color }} />
              {/* Rank-color tint */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-xl" style={{ background: `radial-gradient(ellipse at center, ${color}, transparent 70%)` }} />

              <div className="relative z-10">
                <div className="font-oswald font-black text-xl sm:text-2xl transition-colors" style={{ color }}>
                  {choice.rank}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${color}15, 0 0 15px ${color}08` }}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─────────── REVEAL PHASE ─────────── */

function RevealPhase({
  round,
  roundNum,
  answers,
  showNext,
  onNext,
}: {
  round: RoundData;
  roundNum: number;
  answers: (boolean | null)[];
  showNext: boolean;
  onNext: () => void;
}) {
  const color = getRankTierColor(round.correctRank);
  const wasCorrect = answers[answers.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ProgressBar roundNum={roundNum} answers={answers} />

      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-10 overflow-hidden text-center">
        {/* Rank-color background radial */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${color}12 0%, transparent 70%)` }} />

        {/* Agent art behind */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="relative w-80 h-full opacity-[0.15]">
            <Image
              src={`/agents/full/${round.topAgentId}.png`}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="320px"
            />
          </div>
        </div>

        <div className="relative z-10">
          {/* Correct / Wrong feedback */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="mb-5"
          >
            {wasCorrect ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400 font-oswald font-bold text-sm uppercase tracking-wider">Correct!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-red-400 font-oswald font-bold text-sm uppercase tracking-wider">Wrong!</span>
              </div>
            )}
          </motion.div>

          {/* Rank reveal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 150 }}
            className="mb-4"
          >
            <div
              className="font-oswald font-black text-6xl sm:text-7xl"
              style={{ color, textShadow: `0 0 30px ${color}60, 0 0 60px ${color}30, 0 0 90px ${color}15` }}
            >
              {round.correctRank}
            </div>
          </motion.div>

          {/* Archetype badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF4655]/20 bg-[#FF4655]/[0.08] mb-2">
              <span className="font-oswald font-bold text-sm text-[#FF4655] uppercase tracking-wider">{round.archetype}</span>
            </div>
            <p className="text-xs text-[#ECE8E1]/40 max-w-sm mx-auto">{round.archetypeDesc}</p>
          </motion.div>

          {/* Stat recap bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 sm:gap-6 px-3 sm:px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-wrap justify-center">
              {[
                { label: 'K/D', value: round.stats.kd.toFixed(2) },
                { label: 'HS%', value: `${round.stats.hsPercent.toFixed(1)}%` },
                { label: 'WR', value: `${round.stats.winRate.toFixed(1)}%` },
                { label: 'ACS', value: round.stats.acs.toFixed(0) },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-oswald font-bold text-base text-[#ECE8E1]">{s.value}</div>
                  <div className="text-[9px] text-[#ECE8E1]/30 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next button */}
          <AnimatePresence>
            {showNext && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onNext}
                className="px-8 py-3.5 rounded-xl bg-[#FF4655] hover:bg-[#BD3944] text-white font-oswald font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-[#FF4655]/25"
              >
                {roundNum + 1 >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── RESULTS PHASE ─────────── */

function ResultsPhase({
  score,
  total,
  onPlayAgain,
}: {
  score: number;
  total: number;
  onPlayAgain: () => void;
}) {
  const rating = getScoreRating(score, total);
  const [copied, setCopied] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame <= score) setDisplayScore(frame);
      else clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [score]);

  const handleShare = useCallback(() => {
    const text = `I scored ${score}/${total} on ValorantScan's Guess the Rank!\n${rating.title}\n\nThink you can beat me? -> valorantscan.com`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [score, total, rating.title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-6 relative"
    >
      {/* Radial burst on perfect score */}
      {score === total && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-40 h-40 rounded-full border-2 border-[#FBBF24]/30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="absolute w-40 h-40 rounded-full border-2 border-[#FBBF24]/20"
          />
        </div>
      )}

      {/* Score */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 150 }}
        className="mb-5"
      >
        <div className="font-oswald font-black text-7xl sm:text-8xl text-[#ECE8E1]">
          {displayScore}<span className="text-[#ECE8E1]/30">/{total}</span>
        </div>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mb-3"
      >
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2"
          style={{ borderColor: `${rating.color}40`, background: `${rating.color}08` }}
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: rating.color, boxShadow: `0 0 10px ${rating.color}60` }}
          />
          <span
            className="font-oswald font-black text-xl sm:text-2xl tracking-wider"
            style={{ color: rating.color, textShadow: `0 0 30px ${rating.color}40` }}
          >
            {rating.title}
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-sm text-[#ECE8E1]/40 mb-8"
      >
        {score === total
          ? 'Perfect read. You see the game like a pro analyst.'
          : score >= 4
          ? 'Sharp instincts. You clearly understand the game.'
          : score >= 3
          ? 'Solid reads. Room to sharpen your eye.'
          : score >= 2
          ? 'Some good guesses but the stats fooled you.'
          : 'The ranks are deceptive. Try again?'}
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
      >
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#ECE8E1] font-oswald font-semibold text-sm uppercase tracking-wider transition-all"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Score
            </>
          )}
        </button>
        <button
          onClick={onPlayAgain}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF4655] hover:bg-[#BD3944] text-white font-oswald font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-[#FF4655]/25 animate-btn-pulse"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Play Again
        </button>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      >
        <p className="text-sm text-[#ECE8E1]/50 mb-1">Think you know YOUR rank stats?</p>
        <p className="text-xs text-[#ECE8E1]/30">Join the waitlist above to track your real performance.</p>
      </motion.div>
    </motion.div>
  );
}
