"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Check,
  Copy,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE, UI_COPY } from "@/data/portfolio-data";
import { Reveal } from "./Reveal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function ContactSection() {
  const { lang, t, tList } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [topicIdx, setTopicIdx] = useState(0);
  const [message, setMessage] = useState("");

  const topics = tList(UI_COPY.contact.topics);
  const selectedTopic = topics[topicIdx] ?? topics[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const buildComposedText = () => {
    const greeting =
      lang === "id"
        ? `Halo Lucky, saya ${senderName.trim() || "pengunjung portofolio Anda"}.`
        : `Hi Lucky, I'm ${senderName.trim() || "reaching out from your portfolio"}.`;
    const topicLine =
      lang === "id" ? `Keperluan: ${selectedTopic}` : `Topic: ${selectedTopic}`;
    const body =
      message.trim() ||
      (lang === "id"
        ? "Saya tertarik berdiskusi lebih lanjut mengenai peluang kolaborasi / proyek."
        : "I would love to connect and discuss a potential role or project.");
    return `${greeting}\n${topicLine}\n\n${body}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(buildComposedText());
    window.open(
      `https://wa.me/${PROFILE.whatsappNumber}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`[Portfolio] ${selectedTopic}`);
    const body = encodeURIComponent(buildComposedText());
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="contact" className="scroll-mt-24 pt-20 pb-12 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm sm:p-10 dark:border-zinc-800/90 dark:bg-zinc-900/60">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            {/* Left: Direct Channels */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                  {t(UI_COPY.contact.eyebrow)}
                </div>
                <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                  {t(UI_COPY.contact.title)}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                  {t(UI_COPY.contact.subtitle)}
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="font-mono text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                  {t(UI_COPY.contact.directTitle)}
                </div>

                {/* Email Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/70">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="flex items-center gap-3 text-sm font-semibold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
                  >
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span>{PROFILE.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-zinc-700 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {t(UI_COPY.hero.copied)}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t(UI_COPY.hero.copyEmail)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Row */}
                <a
                  href={`https://wa.me/${PROFILE.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-zinc-50/80 px-4 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-400/60 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-950/20"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    <span>{PROFILE.phoneDisplay}</span>
                  </span>
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                    WhatsApp ↗
                  </span>
                </a>

                {/* Location & Social/Resume Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {PROFILE.location}
                  </span>

                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {t(UI_COPY.hero.ctaResume)}
                  </Link>

                  <a
                    href="/CV_Lucky_Metha_Purnomo.pdf"
                    download="CV_Lucky_Metha_Purnomo.pdf"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-blue-400/50 dark:hover:text-blue-400"
                  >
                    <span>CV PDF ↓</span>
                  </a>

                  {PROFILE.linkedinUrl && (
                    <a
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/[0.06] hover:text-[#0A66C2] dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-sky-500/50 dark:hover:bg-sky-500/10 dark:hover:text-sky-400"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5 text-[#0A66C2] dark:text-sky-400" />
                      LinkedIn ↗
                    </a>
                  )}

                  {PROFILE.githubUrl && (
                    <a
                      href={PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Interactive Quick Inquiry Composer */}
            <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950/70">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 dark:text-zinc-50">
                <Send className="h-4 w-4 text-blue-500" />
                <span>{t(UI_COPY.contact.formTitle)}</span>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    {t(UI_COPY.contact.nameLabel)}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={t(UI_COPY.contact.namePlaceholder)}
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                  />
                </div>

                <div>
                  <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {t(UI_COPY.contact.topicLabel)}
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {topics.map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setTopicIdx(idx)}
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                          topicIdx === idx
                            ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    {t(UI_COPY.contact.messageLabel)}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t(UI_COPY.contact.messagePlaceholder)}
                    className="mt-1.5 w-full resize-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{t(UI_COPY.contact.sendViaWa)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{t(UI_COPY.contact.sendViaEmail)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Reveal>

        {/* Bottom Copyright & Back-to-Top */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 sm:flex-row dark:border-zinc-800/80 dark:text-zinc-400">
          <p>{t(UI_COPY.contact.footerNote)}</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            <span>{t(UI_COPY.contact.backToTop)}</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
