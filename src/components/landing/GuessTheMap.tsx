'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  prepareMapRounds, getMapFact, getMapScoreRating,
  type MapRoundData,
} from '@/lib/landing/guessTheMap';

type Phase = 'intro' | 'playing' | 'reveal' | 'results';

const TOTAL_ROUNDS = 5;

export default function GuessTheMap() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [rounds, setRounds] = useState<MapRoundData[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showNext, setShowNext] = useState(false);

  const startGame = useCallback(() => {
    setRounds(prepareMapRounds(TOTAL_ROUNDS));
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
    const next = currentRound + 1;
    if (next >= TOTAL_ROUNDS) {
      setPhase('results');
    } else {
      setCurrentRound(next);
      setSelectedIdx(null);
      setShowNext(false);
      setPhase('playing');
    }
  }, [currentRound]);

  const round = rounds[currentRound];

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#14B8A6]/[0.04] rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#A855F7]/[0.03] rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '3s' }} />

      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroPhase key="intro" onStart={startGame} />}
        {phase === 'playing' && round && (
          <PlayingPhase key={`play-${currentRound}`} round={round} roundNum={currentRound} answers={answers} selectedIdx={selectedIdx} onChoice={handleChoice} />
        )}
        {phase === 'reveal' && round && (
          <RevealPhase key={`rev-${currentRound}`} round={round} roundNum={currentRound} answers={answers} showNext={showNext} onNext={handleNext} />
        )}
        {phase === 'results' && (
          <ResultsPhase key="results" score={score} total={TOTAL_ROUNDS} onPlayAgain={startGame} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── INTRO ─────────── */

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-12 sm:py-16">
      <motion.div initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 200 }} className="mb-6">
        <svg className="w-10 h-10 mx-auto text-[#14B8A6]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      </motion.div>

      <span className="text-xs font-semibold text-[#14B8A6] tracking-[0.3em] uppercase mb-4 block">Test Your Map Knowledge</span>
      <h2 className="font-oswald font-bold text-4xl sm:text-5xl md:text-6xl text-[#ECE8E1] mb-5">
        GUESS THE <span className="text-[#14B8A6] animate-glow-pulse" style={{ animationName: 'none', textShadow: '0 0 20px rgba(20,184,166,0.4)' }}>MAP</span>
      </h2>
      <p className="text-[#ECE8E1]/40 max-w-lg mx-auto mb-10 text-base sm:text-lg leading-relaxed">
        Can you identify a Valorant map from a single zoomed-in screenshot? 5 rounds — each one harder than the last.
      </p>
      <button onClick={onStart} className="px-10 py-5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-oswald font-bold text-lg uppercase tracking-wider transition-all duration-300 hover:shadow-xl hover:shadow-[#14B8A6]/30 hover:scale-[1.02] active:scale-[0.98]">
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
            <div className={`relative w-9 h-9 rounded-full flex items-center justify-center font-oswald font-bold text-sm transition-all duration-500
              ${isCurrent ? 'bg-[#14B8A6]/20 border-2 border-[#14B8A6] text-[#14B8A6] shadow-lg shadow-[#14B8A6]/20'
                : isCorrect ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                : isWrong ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                : 'bg-white/5 border border-white/10 text-[#ECE8E1]/30'}`}
            >
              {isCorrect ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              ) : isWrong ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (i + 1)}
            </div>
            {i < TOTAL_ROUNDS - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 transition-colors duration-500 ${i < answers.length ? (answers[i] ? 'bg-green-500/40' : 'bg-red-500/40') : 'bg-white/10'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────── PLAYING ─────────── */

function PlayingPhase({ round, roundNum, answers, selectedIdx, onChoice }: {
  round: MapRoundData; roundNum: number; answers: (boolean | null)[]; selectedIdx: number | null; onChoice: (i: number) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <ProgressBar roundNum={roundNum} answers={answers} />

      <div className="text-center mb-5">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-[#ECE8E1]/50 uppercase tracking-wider font-oswald font-semibold">
          Round <span className="text-[#14B8A6]">{roundNum + 1}</span> of {TOTAL_ROUNDS}
        </span>
      </div>

      {/* Cropped map image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden border border-white/[0.06] mb-5 h-48 sm:h-64"
      >
        <div className="absolute inset-0" style={{ transform: `scale(${round.zoomLevel})` }}>
          <Image
            src={`/assets/maps/${round.mapId}_splash.png`}
            alt="Mystery map"
            fill
            className="object-cover"
            style={{ objectPosition: round.cropPosition }}
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>
        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(transparent 30%, rgba(0,0,0,0.5) 100%)' }} />
        {/* Corner hint */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-oswald font-semibold">
            {round.zoomLevel.toFixed(1)}x zoom
          </span>
        </div>
      </motion.div>

      {/* Map choices */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {round.choices.map((choice, idx) => {
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
              className={`relative rounded-xl border ${stateClasses} bg-white/[0.02] backdrop-blur-sm transition-all duration-300 p-4 group disabled:cursor-default overflow-hidden`}
            >
              <span className="font-oswald font-bold text-base sm:text-lg text-[#ECE8E1] text-center w-full">{choice.name}</span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(20,184,166,0.08)' }} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─────────── REVEAL ─────────── */

function RevealPhase({ round, roundNum, answers, showNext, onNext }: {
  round: MapRoundData; roundNum: number; answers: (boolean | null)[]; showNext: boolean; onNext: () => void;
}) {
  const wasCorrect = answers[answers.length - 1];
  const fact = getMapFact(round.mapId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <ProgressBar roundNum={roundNum} answers={answers} />

      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Full map reveal */}
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-48 sm:h-64"
        >
          <Image src={`/assets/maps/${round.mapId}_splash.png`} alt={round.mapName} fill className="object-cover" sizes="896px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 p-6 sm:p-8 text-center -mt-16">
          {/* Correct/Wrong */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, type: 'spring' }} className="mb-4">
            {wasCorrect ? (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-green-400 font-oswald font-bold text-sm uppercase tracking-wider">Correct!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="text-red-400 font-oswald font-bold text-sm uppercase tracking-wider">Wrong!</span>
              </div>
            )}
          </motion.div>

          {/* Map name */}
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 150 }} className="mb-3">
            <div className="font-oswald font-black text-5xl sm:text-6xl text-[#ECE8E1]" style={{ textShadow: '0 0 30px rgba(20,184,166,0.4), 0 0 60px rgba(20,184,166,0.2)' }}>
              {round.mapName}
            </div>
          </motion.div>

          {/* Fun fact */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="mb-8">
            <p className="text-sm text-[#ECE8E1]/50 max-w-md mx-auto italic">&ldquo;{fact}&rdquo;</p>
          </motion.div>

          {/* Next */}
          <AnimatePresence>
            {showNext && (
              <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={onNext}
                className="px-8 py-3.5 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-oswald font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-[#14B8A6]/25">
                {roundNum + 1 >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── RESULTS ─────────── */

function ResultsPhase({ score, total, onPlayAgain }: { score: number; total: number; onPlayAgain: () => void }) {
  const rating = getMapScoreRating(score, total);
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
    const text = `I scored ${score}/${total} on ValorantScan's Guess the Map!\n${rating.title}\n\nThink you can beat me? -> valorantscan.com`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [score, total, rating.title]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-6 relative">
      {score === total && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 1 }} className="w-40 h-40 rounded-full border-2 border-[#FBBF24]/30" />
          <motion.div initial={{ scale: 0, opacity: 0.4 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 1, delay: 0.2 }} className="absolute w-40 h-40 rounded-full border-2 border-[#FBBF24]/20" />
        </div>
      )}

      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', stiffness: 150 }} className="mb-5">
        <div className="font-oswald font-black text-7xl sm:text-8xl text-[#ECE8E1]">
          {displayScore}<span className="text-[#ECE8E1]/30">/{total}</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-3">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2" style={{ borderColor: `${rating.color}40`, background: `${rating.color}08` }}>
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: rating.color, boxShadow: `0 0 10px ${rating.color}60` }} />
          <span className="font-oswald font-black text-xl sm:text-2xl tracking-wider" style={{ color: rating.color, textShadow: `0 0 30px ${rating.color}40` }}>
            {rating.title}
          </span>
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-[#ECE8E1]/40 mb-8">
        {score === total ? 'You know every corner of every map. Impressive.'
          : score >= 4 ? 'Strong map knowledge. You\'ve put in the hours.'
          : score >= 3 ? 'Decent reads. A few maps tripped you up.'
          : score >= 2 ? 'Some of these maps are tricky to tell apart.'
          : 'Time to spend more time in custom games!'}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#ECE8E1] font-oswald font-semibold text-sm uppercase tracking-wider transition-all">
          {copied ? (
            <><svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
          ) : (
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>Share Score</>
          )}
        </button>
        <button onClick={onPlayAgain} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14B8A6] hover:bg-[#0D9488] text-white font-oswald font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-[#14B8A6]/25">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Play Again
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <p className="text-sm text-[#ECE8E1]/50 mb-1">Think you know YOUR rank stats?</p>
        <p className="text-xs text-[#ECE8E1]/30">Join the waitlist above to track your real performance.</p>
      </motion.div>
    </motion.div>
  );
}
