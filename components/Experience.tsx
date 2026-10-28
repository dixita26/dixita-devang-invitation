"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import confetti from "canvas-confetti";
import AmbientBackground from "./AmbientBackground"; import BotanicalDecor from "./BotanicalDecor"; import EventTimeline from "./EventTimeline"; import FallingPetals from "./FallingPetals"; import OpeningEnvelope from "./OpeningEnvelope"; import { sideData, sideAccent, wedding } from "../lib/wedding-data";
type Stage = "envelope" | "welcome" | "revealed"; type Side = "bride" | "groom";
const brideVenue = "Hari Champa Resort, Jalaram Society, Adajan, Surat, Gujarat 395009";
const brideGaneshVenue = "E-302, Shivani Complex, Opp. Shri Ram Marble, Althan Road, Bhatar, Surat 395017";
const groomVenue = "16-A, Ram Lakhan Society, Behind Prajapati Vadi, Mehsana-2, Gujarat 384002";
const groomBaratVenue = "Badrinarayan Mandir, near BAPS Hospital, Mansarovar Society, Adajan, Surat, Gujarat 395009";

function useSiteProtection() {
    useEffect(() => {
        const prevent = (event: Event) => event.preventDefault();
        const blockShortcuts = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            const modifier = event.ctrlKey || event.metaKey;
            const devToolsShortcut = event.key === "F12" || (modifier && event.shiftKey && ["i", "j", "c"].includes(key));
            const copyShortcut = modifier && ["c", "u", "s"].includes(key);
            if (devToolsShortcut || copyShortcut) event.preventDefault();
        };

        document.addEventListener("contextmenu", prevent);
        document.addEventListener("selectstart", prevent);
        document.addEventListener("dragstart", prevent);
        document.addEventListener("copy", prevent);
        document.addEventListener("cut", prevent);
        document.addEventListener("keydown", blockShortcuts);
        return () => {
            document.removeEventListener("contextmenu", prevent);
            document.removeEventListener("selectstart", prevent);
            document.removeEventListener("dragstart", prevent);
            document.removeEventListener("copy", prevent);
            document.removeEventListener("cut", prevent);
            document.removeEventListener("keydown", blockShortcuts);
        };
    }, []);
}

function ScratchDate() { const targetDate = "2027-02-11T18:30:00+05:30"; const [revealed, setRevealed] = useState(false); return <section className="section scratch-section"><div className="section-inner"><div className="eyebrow">The date</div><h2>Save the Date</h2><p>Scratch below to reveal our wedding date</p><DateScratchCard onReveal={() => setRevealed(true)} />{revealed && <><p className="countdown-intro">A beautiful journey begins here</p><Countdown targetDate={targetDate} /></>}</div>{revealed && <BloomEffect />}</section> }

function DateScratchCard({ onReveal }: { onReveal: () => void }) { const canvasRef = useRef<HTMLCanvasElement>(null); const [revealed, setRevealed] = useState(false); const drawing = useRef(false); useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; canvas.width = rect.width * dpr; canvas.height = rect.height * dpr; const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.scale(dpr, dpr); const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height); gradient.addColorStop(0, "#c99599"); gradient.addColorStop(1, "#aa6d75"); ctx.fillStyle = gradient; ctx.fillRect(0, 0, rect.width, rect.height); ctx.fillStyle = "rgba(244,239,230,.88)"; ctx.font = "500 12px DM Sans, Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 4) }, []); const point = (e: React.PointerEvent) => { const canvas = canvasRef.current; if (!canvas || revealed) return; const rect = canvas.getBoundingClientRect(); const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.globalCompositeOperation = "destination-out"; ctx.beginPath(); ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 30, 0, Math.PI * 2); ctx.fill() }; const start = (e: React.PointerEvent) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); point(e) }; const move = (e: React.PointerEvent) => { if (drawing.current) point(e) }; const finish = () => { drawing.current = false; const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data; let clear = 0; for (let i = 3; i < data.length; i += 32)if (data[i] < 30) clear++; if (clear / (data.length / 32) > .72) { setRevealed(true); onReveal() } }; return <button className={`scratch-date-card ${revealed ? "revealed" : ""}`} onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { setRevealed(true); onReveal() } }} aria-label={revealed ? "Wedding date revealed" : "Scratch to reveal wedding date"}><span className="date-value-grid"><span><small>Month</small><strong>FEB</strong></span><span><small>Day</small><strong>11</strong></span><span><small>Year</small><strong>2027</strong></span></span>{!revealed && <canvas ref={canvasRef} aria-hidden="true" />}</button> }

function Countdown({ targetDate }: { targetDate: string }) { const remaining = () => { const diff = Math.max(0, new Date(targetDate).getTime() - Date.now()); return { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 } }; const [time, setTime] = useState(remaining); useEffect(() => { const timer = window.setInterval(() => setTime(remaining()), 1000); return () => window.clearInterval(timer) }, [targetDate]); return <div className="countdown" aria-label="Countdown to the wedding date">{Object.entries(time).map(([label, value]) => <div className="countdown-cell" key={label}><strong>{String(value).padStart(2, "0")}</strong><small>{label}</small></div>)}</div> }
export default function Experience() { useSiteProtection(); const [stage, setStage] = useState<Stage>("envelope"); const [side, setSide] = useState<Side | null>(null); const [musicPrimed, setMusicPrimed] = useState(false); useEffect(() => { document.body.style.overflow = stage === "envelope" ? "hidden" : "auto"; return () => { document.body.style.overflow = "auto" } }, [stage]); useLayoutEffect(() => { if (stage === "welcome") { window.scrollTo(0, 0); return; } if (stage !== "revealed" || !side) return; const root = document.documentElement; root.style.scrollBehavior = "auto"; window.scrollTo(0, 0); requestAnimationFrame(() => root.style.removeProperty("scroll-behavior")); }, [stage, side]); if (stage === "envelope") return <><MusicControl primed={musicPrimed} shouldPlay={false} /><OpeningEnvelope onStart={() => setMusicPrimed(true)} onOpen={() => setStage("welcome")} /></>; return <><FallingPetals /><MusicControl primed={musicPrimed} shouldPlay /><main className="experience"><AmbientBackground /><div className="top-floral" aria-hidden="true"><img src="/floral_breeze.gif" alt="" /></div><div className="content">{stage === "welcome" ? <PostVideoFlow onChoose={(s) => { setSide(s); setStage("revealed") }} /> : side && <Revealed side={side} setSide={setSide} onBack={() => { setSide(null); setStage("welcome"); window.scrollTo(0, 0); }} />}</div></main></>; }

function MusicControl({ primed, shouldPlay }: { primed: boolean; shouldPlay: boolean }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !primed) return;
        audio.volume = .75;
        audio.muted = true;
        audio.currentTime = 0;
        void audio.play();
    }, [primed]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !primed || !shouldPlay) return;
        audio.currentTime = 0;
        audio.muted = false;
        setIsMuted(false);
        void audio.play();
    }, [primed, shouldPlay]);

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const nextMuted = !isMuted;
        audio.muted = nextMuted;
        setIsMuted(nextMuted);
        if (!nextMuted && audio.paused) void audio.play();
    };

    return <>
        <audio ref={audioRef} src="/sunehra.mp3" loop preload="auto" aria-hidden="true" />
        {shouldPlay && <button className="music-toggle" type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute wedding music" : "Mute wedding music"} aria-pressed={isMuted}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4 9v6h4l5 4V5L8 9H4Z" />
                {!isMuted ? <><path d="M16 8.5a5 5 0 0 1 0 7" /><path d="M18.5 6a8.5 8.5 0 0 1 0 12" /></> : <path d="m16 9 5 6M21 9l-5 6" />}
            </svg>
        </button>}
    </>;
}

function PostVideoFlow({ onChoose }: { onChoose: (side: Side) => void }) { return <><IntroCard /><ScratchDate /><WeddingSlider /><Welcome onChoose={onChoose} /></> }

const weddingSliderItems = [
    { title: "Cultural Charm", image: "/images/slider/1.jpeg" },
    { title: "Made for Each Other", image: "/images/slider/2.jpeg" },
    { title: "Growing Together", image: "/images/slider/3.jpeg" },
    { title: "Royal Romance", image: "/images/slider/4.jpeg" },
    { title: "Sunshine Together", image: "/images/slider/5.jpeg" },
    { title: "Graceful Together", image: "/images/slider/6.jpeg" },
    { title: "Everyday Magic", image: "/images/slider/7.jpeg" },
    { title: "Just Love", image: "/images/slider/8.jpeg" },
    { title: "Forever Us", image: "/images/slider/9.jpeg" },
];

function WeddingSlider() {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [swiperReady, setSwiperReady] = useState(false);
    useEffect(() => {
        if (window.Swiper) setSwiperReady(true);
    }, []);
    useEffect(() => {
        if (!swiperReady || !window.Swiper) return;
        swiperRef.current = new window.Swiper(".wedding-slider__swiper", {
            effect: "cards",
            grabCursor: true,
            initialSlide: 2,
            speed: 500,
            loop: true,
            mousewheel: { invert: false },
        });
        return () => { swiperRef.current?.destroy(); swiperRef.current = null; };
    }, [swiperReady]);

    return <section className="wedding-slider" aria-label="Wedding film inspiration">
        <Script src="https://cdn.jsdelivr.net/npm/swiper@14.0.1/swiper-bundle.min.js" strategy="afterInteractive" onLoad={() => setSwiperReady(true)} />
        <div className="wedding-slider__inner">
            <div className="eyebrow">A little inspiration</div>
            <h2>Our favorite stories</h2>
            <div className="wedding-slider__viewport">
                <div className="swiper wedding-slider__swiper">
                    <div className="swiper-wrapper">
                        {weddingSliderItems.map((item) => {
                            return <article className="swiper-slide wedding-slider__slide" key={item.title}>
                                <img src={item.image} alt="" />
                                <div className="wedding-slider__overlay"><h3>{item.title}</h3></div>
                            </article>;
                        })}
                    </div>
                </div>
            </div>
            <p className="wedding-slider__hint">Drag to explore</p>
        </div>
    </section>;
}

type SwiperInstance = { slidePrev: () => void; slideNext: () => void; destroy: () => void };
declare global { interface Window { Swiper?: new (selector: string, options: Record<string, unknown>) => SwiperInstance; } }

function IntroCard() { return <section className="section intro-card-section"><motion.article className="intro-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [.22, 1, .36, 1] }}><BotanicalDecor position="left" /><img className="intro-mark" src="/images/ganesha.png" alt="Lord Ganesha" /><div className="intro-hindi">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</div><p className="intro-request">With the blessings of the Almighty &amp; our respected elders,<br />we joyfully request your gracious presence on the wedding celebration of</p><h2>Devang</h2><p>Son of Mr. Anilkumar &amp; Mrs. Sarojben</p><div className="intro-amp">&amp;</div><h2>Dixita</h2><p>Daughter of Mr. Hasmukhbhai &amp; Mrs. Neelaben</p></motion.article></section> }



function BloomEffect() { useEffect(() => { const colors = ["#B85940", "#C9963E", "#E8C07A", "#FFFFFF"]; const end = Date.now() + 2000; const frame = () => { confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors, zIndex: 9999 }); confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors, zIndex: 9999 }); if (Date.now() < end) requestAnimationFrame(frame) }; frame() }, []); return <div className="bloom-effect" aria-hidden="true" /> }

function Welcome({ onChoose }: { onChoose: (side: Side) => void }) { return <section className="section welcome-section"><BotanicalDecor /><BotanicalDecor position="right" flip /><div className="section-inner"><div className="eyebrow">Devang &amp; Dixita</div><h2>So… Whose side are you on?</h2><p>Every love story is made of many little celebrations. Begin with the people who brought us here.</p><div className="choice-grid"><button className="button choice" onClick={() => onChoose("bride")}><span>Dixita</span><small>her side</small></button><button className="button choice" onClick={() => onChoose("groom")}><span>Devang</span><small>his side</small></button></div></div></section> }

function Revealed({ side, setSide, onBack }: { side: Side; setSide: (s: Side) => void; onBack: () => void }) { const data = sideData(side); const events = (side === "bride" ? data.events.filter(event => event.title !== "Mehendi") : data.events.filter(event => event.title !== "Ras-garba")).map(event => ({ ...event, address: side === "bride" ? event.title === "Ganesh Pooja" ? brideGaneshVenue : brideVenue : event.title === "Jan Agman" ? groomBaratVenue : groomVenue, mapUrl: side === "bride" && event.title === "Ganesh Pooja" ? "https://maps.app.goo.gl/XNE9KBNbKqtJckyL7" : undefined })); return <><section className={`section side-path ${side}`} style={{ "--side-accent": sideAccent(side) } as React.CSSProperties}><BotanicalDecor /><div className="section-inner"><div className="eyebrow">Welcome</div><h2>Meet the {side === "bride" ? "Bride" : "Groom"}</h2><div className="portrait"><img src={data.photo} alt={`${data.name} — wedding portrait`} /></div><p>{data.welcome.description}</p><button className="switch" onClick={() => setSide(side === 'bride' ? 'groom' : 'bride')}>Switch to {side === 'bride' ? "Devang's" : "Dixita's"} side</button><EventTimeline key={side} events={events} label="The rituals" /></div></section><section className={`section back-home-section ${side}`}><button className="back-home-button" onClick={onBack} aria-label="Back to home"><span aria-hidden="true">←</span> Back to home</button></section><section className="section closing-section"><BotanicalDecor position="right" flip /><div className="section-inner"><div className="eyebrow">With love, always</div><h2>Thank you for being part of our beginning.</h2><p>{wedding.common.closing}</p><div className="fine" style={{ marginTop: "3rem" }}>D &amp; D · 2027</div><div className="closing-credit">MADE WITH <span className="closing-heart" aria-label="love">♥</span> BY SHIVAURA</div></div></section> </> }
