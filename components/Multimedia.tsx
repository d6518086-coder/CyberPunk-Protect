"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, Clapperboard, Sparkles } from "lucide-react";

/* =========================
   Adaptive Media Component
========================= */
function AdaptiveMedia({
  src,
  type,
  alt,
  className,
  children,
}: {
  src: string;
  type: "image" | "video";
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [ratio, setRatio] = useState(16 / 9);

  return (
    <div
      className={`relative w-full overflow-hidden bg-secondary ${className}`}
      style={{
        aspectRatio: ratio,
        maxHeight: "420px",
      }}
    >
      {type === "image" ? (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          onLoad={(e) => {
            const img = e.currentTarget;
            setRatio(img.naturalWidth / img.naturalHeight);
          }}
        />
      ) : (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            setRatio(video.videoWidth / video.videoHeight);
          }}
          onMouseEnter={(e) => e.currentTarget.pause()}
          onMouseLeave={(e) => e.currentTarget.play()}
        />
      )}

      {/* overlays / children */}
      {children}
    </div>
  );
}

/* =========================
   Existing Components
========================= */

function MediaLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-neon-blue" aria-hidden="true" />
      <span className="text-xs font-display text-neon-blue tracking-[0.25em] uppercase">
        {label}
      </span>
    </div>
  );
}

function AiToolBadge({ tool, prompt }: { tool: string; prompt: string }) {
  return (
    <div className="mt-4 p-3 bg-secondary/50 border border-border rounded text-xs">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-3 h-3 text-neon-purple" aria-hidden="true" />
        <span className="font-display text-neon-purple tracking-wider uppercase">
          AI Tool:
        </span>
        <span className="text-foreground/70">{tool}</span>
      </div>
      <p className="text-foreground/40 leading-relaxed">
        <span className="text-foreground/60 font-medium">Prompt: </span>
        {prompt}
      </p>
    </div>
  );
}

/* =========================
   Main Component
========================= */

export default function Multimedia() {
  return (
    <section id="multimedia" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            AI-Generated Multimedia
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Visual Intelligence{" "}
          <span className="text-neon-blue glow-text-blue">Showcase</span>
        </h2>

        <p className="text-center text-foreground/50 max-w-xl mx-auto mb-16 leading-relaxed">
          All visual assets on this platform were generated using AI image and
          video tools, demonstrating practical applications of generative AI in
          security operations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Block 1 */}
          <div className="glass-card cyber-border rounded-lg p-6 flex flex-col">
            <MediaLabel icon={ImageIcon} label="AI City Image" />

            <AdaptiveMedia
              src="/cyberpunk-city.jpg"
              type="image"
              alt="AI-generated cyberpunk megacity"
              className="rounded mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />

              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-display text-neon-blue tracking-widest uppercase bg-[#0a0a0f]/70 px-2 py-1 rounded">
                  CyberCity 2075
                </span>
              </div>
            </AdaptiveMedia>

            <h3 className="font-display text-base font-bold text-foreground mb-2">
              Megacity Aerial View
            </h3>

            <p className="text-sm text-foreground/50 leading-relaxed flex-1">
              AI-rendered visualization of CyberCity&apos;s urban landscape at
              night, showcasing the density of surveillance infrastructure and
              neon-lit streets.
            </p>

            <AiToolBadge
              tool="Midjourney v6 / DALL-E 3"
              prompt="Futuristic cyberpunk megacity at night, neon blue and cyan lights..."
            />
          </div>

          {/* Block 2 */}
          <div className="glass-card cyber-border rounded-lg p-6 flex flex-col">
            <MediaLabel icon={Sparkles} label="AI Character" />

            <AdaptiveMedia
              src="/Cyberpunk_Revolution_Video_A_medium_shot_shows_a_man_with_short_brown_hair_tAI8kDOo.mp4"
              type="video"
              className="rounded mb-4 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />

              {/* Pulse ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-neon-blue/20 animate-pulse-glow" />
              </div>
            </AdaptiveMedia>

            <h3 className="font-display text-base font-bold text-foreground mb-2">
              ARIA — Security AI Officer
            </h3>

            <p className="text-sm text-foreground/50 leading-relaxed flex-1">
              AI-generated holographic representation of the system&apos;s
              virtual security officer.
            </p>

            <AiToolBadge
              tool="Stable Diffusion XL / Adobe Firefly"
              prompt="Futuristic AI security officer hologram..."
            />
          </div>

          {/* Block 3 */}
          <div className="glass-card cyber-border rounded-lg p-6 flex flex-col">
            <MediaLabel icon={Clapperboard} label="System Demo" />

            <AdaptiveMedia
              src="/Cyberpunk_Revolution_Video_A_person_is_seen_walking_away_from_the_camera_xx-tDUgw.mp4"
              type="video"
              className="rounded mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-full border-2 border-neon-blue/50 bg-[#0a0a0f]/60 flex items-center justify-center">
                  <Clapperboard className="w-6 h-6 text-neon-blue/80" />
                </div>
              </div>

              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-display text-neon-blue tracking-widest uppercase bg-[#0a0a0f]/70 px-2 py-1 rounded">
                  Command Center
                </span>
              </div>
            </AdaptiveMedia>

            <h3 className="font-display text-base font-bold text-foreground mb-2">
              System Demonstration
            </h3>

            <p className="text-sm text-foreground/50 leading-relaxed flex-1">
              AI-rendered visualization of CyberCity&apos;s Central Command.
            </p>

            <AiToolBadge
              tool="Runway Gen-3 / Sora"
              prompt="Futuristic smart city surveillance control room..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}