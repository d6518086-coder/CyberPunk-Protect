"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Mic, Cpu, Sparkles } from "lucide-react";

const chatbotName = process.env.NEXT_PUBLIC_CHATBOT_NAME ?? "ARIA";
const chatbotPersona =
  process.env.NEXT_PUBLIC_CHATBOT_PERSONA ??
  "AI Security Officer specialized in urban threat analysis and smart city protection";
const chatbotPrompt =
  process.env.NEXT_PUBLIC_CHATBOT_PROMPT ??
  "You are ARIA — Advanced Response & Intelligence Assistant...";

/* =========================
   Adaptive Media Wrapper
========================= */

function AdaptiveMedia({
  src,
  type,
  className,
  children,
}: {
  src: string;
  type: "image" | "video";
  className?: string;
  children?: React.ReactNode;
}) {
  const [ratio, setRatio] = useState(16 / 9);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.muted = false; 
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: ratio,
        maxHeight: "500px",
      }}
    >
      {type === "video" ? (
        <>
          <video
            ref={videoRef}
            src={src}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover animate-float"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              setRatio(v.videoWidth / v.videoHeight);
            }}
          />

          {/* 🔥 КНОПКА */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-4 right-4 z-50 bg-black/70 px-4 py-2 text-xs text-neon-blue border border-neon-blue/30 rounded backdrop-blur"
          >
           {playing ? "ARIA Online" : "Activate ARIA"}
          </button>
        </>
      ) : (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            setRatio(img.naturalWidth / img.naturalHeight);
          }}
        />
      )}

      {children}
    </div>
  );
}

/* =========================
   Main Component
========================= */

export default function Avatar() {
  return (
    <section id="avatar" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            AI Avatar
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-16">
          Meet{" "}
          <span className="text-neon-blue glow-text-blue">{chatbotName}</span>
          <span className="text-foreground/60 text-2xl sm:text-3xl block mt-2">
            Your AI Security Officer
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar Panel */}
          <div className="relative">
            <div className="glass-card cyber-border rounded-lg overflow-hidden">
              <AdaptiveMedia
                src="/Cyberpunk_Revolution_Video_A_man_walks_through_a_sparsely_populated_modern_IZxFitWK.mp4"
                type="video"
              >
                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />

                {/* Pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-neon-blue/20 animate-pulse-glow" />
                  <div
                    className="absolute w-48 h-48 rounded-full border border-neon-blue/10 animate-pulse-glow"
                    style={{ animationDelay: "500ms" }}
                  />
                </div>

                {/* Status */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-glow flex-shrink-0" />
                  <span className="text-xs font-display text-neon-blue tracking-widest uppercase">
                    {chatbotName} — Online & Monitoring
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-display text-neon-purple border border-neon-purple/30 bg-[#0a0a0f]/70 px-2 py-1 rounded tracking-widest uppercase">
                    HeyGen / D-ID
                  </span>
                </div>
              </AdaptiveMedia>
            </div>

            {/* glow */}
            <div className="absolute -inset-4 bg-neon-blue/5 rounded-xl blur-2xl pointer-events-none -z-10" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-neon-blue mb-3">
                {chatbotName}
              </h3>
              <p className="text-foreground/60 leading-relaxed">
                {chatbotPersona}
              </p>
            </div>

            {/* Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Cpu,
                  title: "Threat Analysis",
                  desc: "Real-time risk assessment from sensor data",
                },
                {
                  icon: Mic,
                  title: "Voice Interaction",
                  desc: "Natural language interface for city staff",
                },
                {
                  icon: Sparkles,
                  title: "Predictive Alerts",
                  desc: "AI-driven early warning system",
                },
                {
                  icon: Cpu,
                  title: "Multi-language",
                  desc: "Supports 47 languages across the megacity",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="glass-card rounded p-4">
                    <Icon className="w-5 h-5 text-neon-blue mb-2" />
                    <p className="font-display text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-foreground/40 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Prompt */}
            <div className="glass-card rounded-lg p-5 border-l-2 border-neon-purple">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-neon-purple" />
                <span className="text-xs font-display text-neon-purple tracking-widest uppercase">
                  System Prompt
                </span>
              </div>

              <p className="text-sm text-foreground/50 leading-relaxed italic">
                &ldquo;{chatbotPrompt}&rdquo;
              </p>

              <div className="mt-3 text-[10px] text-foreground/30 font-display tracking-wider uppercase">
                AI Tool: HeyGen / D-ID Avatar Studio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}