'use client';

import { useState } from 'react';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function DispatcherConsoleSection() {
  const initialEvents = [
    {
      id: 'EVT-10492',
      time: '12:34:02',
      type: 'RESCUE_SCAN_LOGGED',
      badge: 'emergency',
      title: 'Emergency Token Scanned in Field',
      detail: 'Opaque Token MX-QR-7F89B2A4 scanned by Ambulance EMS-42 (Zone 4). Geohash: tn78f9.',
    },
    {
      id: 'EVT-10493',
      time: '12:34:03',
      type: 'OUTBOX_DISPATCHED',
      badge: 'gold',
      title: 'Trusted-Contact Alert Delivered',
      detail: 'Transactional SMS notification delivered to primary guardian (Aarav S.). Delivery latency: 840ms.',
    },
    {
      id: 'EVT-10494',
      time: '12:34:05',
      type: 'ER_TRIAGE_PREPPED',
      badge: 'cyan',
      title: 'Trauma Unit Alerted & Bay Prepped',
      detail: 'Apex Memorial Trauma Bay 2 prepped. Alert: Severe Penicillin Anaphylaxis, O-Neg RBC pre-ordered.',
    },
    {
      id: 'EVT-10495',
      time: '12:34:07',
      type: 'AUDIT_SEALED',
      badge: 'neutral',
      title: 'Cryptographic Audit Block Sealed',
      detail: 'Event hashed and committed to tamper-evident audit ledger (SHA-256: 8f4a...2e10).',
    },
  ];

  const [events, setEvents] = useState(initialEvents);
  const [broadcastCount, setBroadcastCount] = useState(0);

  const handleSimulateBroadcast = () => {
    const nextNum = broadcastCount + 1;
    setBroadcastCount(nextNum);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const newEvt = {
      id: `EVT-${10500 + nextNum}`,
      time: timeStr,
      type: 'LIVE_BROADCAST_TRIGGERED',
      badge: 'gold',
      title: `Simulated Trauma Incident #${nextNum}`,
      detail: `Real-time WebSocket event published to Regional Trauma Cluster. Geohash resolution verified.`,
    };

    setEvents([newEvt, ...events]);
  };

  return (
    <section id="dispatcher-feed" className="section-wrapper" style={{ background: 'var(--color-near-black-elevated)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">
            ✦ HOSPITAL TRAUMA CLUSTER &bull; ADMINISTRATION ✦
          </div>
          <h2 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)' }}>
            Hospital ER Dispatcher Command Deck
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '1rem auto 0 auto', color: 'var(--color-warm-ivory-dim)' }}>
            Bento-structured telemetry console powered by Fastify, Socket.IO, and transactional outbox pipelines to synchronize field medics, emergency surgical suites, and family guardians in real time.
          </p>
        </div>

        {/* Bento Console Interface */}
        <div
          style={{
            maxWidth: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'var(--color-near-black-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-clinical-md)',
          }}
        >
          {/* Bento Header / Control Deck */}
          <div
            style={{
              background: 'var(--color-clinical-navy)',
              padding: '1.1rem 1.75rem',
              borderBottom: '1px solid rgba(245, 241, 234, 0.14)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-verified)',
                  boxShadow: '0 0 8px var(--color-verified)',
                  display: 'inline-block',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-warm-ivory)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                FASTIFY:4000 &bull; SOCKET.IO TRAUMA MESH
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <StatusBadge variant="gold">DISPATCHER SYNCHRONIZED</StatusBadge>
              <TactileButton
                variant="primary"
                onClick={handleSimulateBroadcast}
                style={{ padding: '0.45rem 1.15rem', fontSize: '0.8125rem' }}
              >
                + Broadcast Trauma Ping
              </TactileButton>
            </div>
          </div>

          {/* Bento Compartments Grid for Live ER Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderBottom: '1px solid var(--border-hairline)',
              background: 'var(--color-near-black)',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', borderRight: '1px solid var(--border-hairline)' }}>
              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase' }}>
                OUTBOX WORKER LATENCY
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-warm-ivory)', fontWeight: 700, marginTop: 2 }}>
                840 ms <span style={{ fontSize: '0.72rem', color: 'var(--color-verified)', fontWeight: 500 }}>NORMAL</span>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderRight: '1px solid var(--border-hairline)' }}>
              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase' }}>
                CONNECTED TRAUMA BAYS
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-warm-ivory)', fontWeight: 700, marginTop: 2 }}>
                14 Emergency Units
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem' }}>
              <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase' }}>
                INGESTION PROTOCOL
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-muted-gold)', fontWeight: 700, marginTop: 2 }}>
                TLS 1.3 &bull; SHA-256
              </div>
            </div>
          </div>

          {/* Terminal Events List (Utilitarian Feed) */}
          <div
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              maxHeight: 380,
              overflowY: 'auto',
              background: 'var(--color-near-black-card)',
            }}
          >
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'var(--color-near-black)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                    <StatusBadge variant={evt.badge}>{evt.type}</StatusBadge>
                    <strong className="font-neoclassical" style={{ fontSize: '0.95rem', color: 'var(--color-warm-ivory)', letterSpacing: '0.02em' }}>
                      {evt.title}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-warm-ivory-dim)', lineHeight: 1.55 }}>
                    {evt.detail}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-warm-ivory-muted)',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ color: 'var(--color-warm-ivory)' }}>{evt.time}</div>
                  <div style={{ color: 'var(--color-muted-gold)', marginTop: 2 }}>{evt.id}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div
            style={{
              background: 'var(--color-near-black)',
              padding: '0.9rem 1.75rem',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: 'var(--color-warm-ivory-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>TRANSACTIONAL OUTBOX WORKER: ACTIVE (500ms TICK)</span>
            <span style={{ color: 'var(--color-verified)' }}>✦ FAILOVER REDUNDANCY: 99.999%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
