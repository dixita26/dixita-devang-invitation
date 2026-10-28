import { useRef, useState } from "react";
export default function OpeningEnvelope({ onOpen, onStart }: { onOpen: () => void; onStart: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  async function startVideo() {
    if (started) return;
    const video = videoRef.current;
    if (!video) return;
    onStart();
    try {
      await video.play();
      setStarted(true);
    } catch {
      // The tap is the user gesture; if playback is blocked, the overlay remains.
    }
  }

  function keepPlaying() {
    const video = videoRef.current;
    if (started && video && !video.ended) void video.play();
  }

  return <section className="video-gate" onClick={startVideo} aria-label="Wedding invitation opening video">
    <video ref={videoRef} className="hero-video" src="/hero-final.mp4" playsInline muted preload="auto" onEnded={onOpen} onPause={keepPlaying} />
    <div className={`video-overlay ${started ? "is-hidden" : ""}`}>
      <div className="video-overlay-wash" />
      <div className="video-welcome">
        <div className="video-eyebrow">A celebration of love</div>
        <div className="video-tap">Unfold the beginning</div>
        <div className="video-line">Tap to reveal your invitation</div>
      </div>
    </div>
  </section>;
}
