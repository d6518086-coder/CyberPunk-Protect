"use client";
import { getAudioContext } from "@/lib/audio";

let started = false;

export async function startCyberpunkAudio() {
  const ctx = getAudioContext();
  
  // 🔥 ФИКС ТИШИНЫ: Пробуждаем контекст после клика
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  
  if (started) return;
  started = true;

  const master = ctx.createGain();
  master.gain.value = 0; // Плавный старт
  master.connect(ctx.destination);

  // ===== ПРОСТРАНСТВО (Эхо пустого города) =====
  const delay = ctx.createDelay();
  delay.delayTime.value = 0.75;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.4;
  delay.connect(feedback).connect(delay);
  delay.connect(master);

  // ===== СИНТ (Вайб "Interlinked") =====
  // O(1) сложность обработки: создаем 3 осциллятора с легким рассинхроном (detune)
  function createDarkSynth(freq: number, detune: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth"; // Пила дает богатый тембр
    osc.frequency.value = freq;
    osc.detune.value = detune; // Эффект старой кассеты/аналога

    filter.type = "lowpass";
    filter.frequency.value = 100; // Очень глухой звук в начале

    gain.gain.value = 0.1;

    osc.connect(filter).connect(gain);
    gain.connect(master);
    gain.connect(delay); // Отправляем часть в эхо

    // Эффект нарастания (фильтр открывается и закрывается)
    filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 4);
    filter.frequency.linearRampToValueAtTime(150, ctx.currentTime + 8);

    osc.start();
    return filter;
  }

  // Мрачный минорный аккорд
  createDarkSynth(130.81, -6);  // C3
  createDarkSynth(155.56, 0);   // Eb3
  createDarkSynth(196.00, 5);   // G3

  // ===== САБ-БАС (Фонк-низы) =====
  const sub = ctx.createOscillator();
  sub.type = "sine";
  sub.frequency.value = 32.70; // Очень низкий C1 (саб-бас)
  const subGain = ctx.createGain();
  subGain.gain.value = 0.4; // Бас делаем жирным
  sub.connect(subGain).connect(master);
  sub.start();

  // Плавное появление (Fade In)
  master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 3);
}