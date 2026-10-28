import { motion } from "framer-motion";
import type { Event } from "../lib/wedding-data";

export default function EventTimeline({ events, label, cardEventTitle }: { events: readonly Event[]; label: string; cardEventTitle?: string }) {
  return <div className="timeline">
    <div className="timeline-label eyebrow">{label}</div>
    {events.map((event, i) => {
      const isCard = event.title === "Mehendi" || event.title === cardEventTitle || Boolean(event.cardImage);
      const dateParts = event.date.split(" ");
      return <div className="event-group" key={event.title}><motion.article className={`event ${isCard ? "event-card" : ""}`} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * .1, duration: .7 }}>
        {isCard ? <div className="event-card-art">
          <img src={event.cardImage ?? "/images/mehendi.png"} alt={`${event.title} celebration`} />
          <div className={`event-card-copy ${event.cardImage ? "image-card" : ""}`} style={{ "--card-text-color": event.cardTextColor ?? "#3C4429" } as React.CSSProperties}>
            <h3>{event.title}</h3>
            <div className="event-card-date"><span>{event.day}</span><b>|</b><strong>{dateParts[0]}</strong><b>|</b><span>{dateParts.slice(1).join(" ")}</span></div>
            <div className="event-card-time">{event.time}</div>
          </div>
        </div> : <><div className="event-number">0{i + 1}</div><div><h3>{event.title}</h3><div className="event-meta"><span>{event.day}, {event.date}</span><span>{event.time}</span><span>{event.venue} · {event.city}</span></div></div></>}
      </motion.article><div className="event-location"><div className="event-address">{event.address ?? [event.venue, event.city].filter(Boolean).join(", ")}</div><a className="map-link" href={event.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address ?? [event.venue, event.city].filter(Boolean).join(", "))}`} target="_blank" rel="noreferrer">View on Maps</a></div>{i < events.length - 1 && <div className="event-divider" aria-hidden="true"><span /><i /><span /></div>}</div>;
    })}
  </div>;
}
