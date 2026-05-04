"use client";

import { getAudioContext } from "@/lib/audio";
import { startCyberpunkAudio } from "@/hooks/useCyberpunkAudio";
import { useState, useRef } from "react";

export function EnableSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const isInitialized = useRef(false); // Запоминаем, запускали ли мы скрипт

  const toggleSound = async () => {
    const ctx = getAudioContext();

    if (!isInitialized.current) {
      // Первый запуск (инициализация)
      if (ctx.state === "suspended") await ctx.resume();
      startCyberpunkAudio();
      isInitialized.current = true;
      setIsPlaying(true);
    } else {
      // Переключение: Пауза / Воспроизведение
      if (ctx.state === "running") {
        await ctx.suspend(); // Замораживаем звук
        setIsPlaying(false);
      } else {
        await ctx.resume(); // Размораживаем звук
        setIsPlaying(true);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md border ${
        isPlaying
          ? "bg-cyan-950/40 text-cyan-400 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          : "bg-red-950/40 text-red-400 border-red-500/50 hover:bg-red-900/60 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
      }`}
    >
      <svg 
        className={`w-5 h-5 transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`} 
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        {isPlaying ? (
          // Иконка динамика со звуком
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 19h4l5 5V0L9 5H5v14z" />
        ) : (
          // Иконка выключенного звука
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        )}
      </svg>
      
      <span>{isPlaying ? "SYS.AUDIO: ON" : "SYS.AUDIO: MUTED"}</span>
    </button>
  );
}