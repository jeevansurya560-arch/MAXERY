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
      title: 'Imperial Token Scanned',
      detail: 'Opaque Sovereign Token MX-QR-7F89B2A4 scanned by Ambulance EMS-42 (Zone 4). Geohash: tn78f9.',
    },
    {
      id: 'EVT-10493',
      time: '12:34:03',
      type: 'OUTBOX_DISPATCHED',
      badge: 'gold',
      title: 'Trusted-Contact Alert Delivered',
      detail: 'SMS notification delivered to primary guardian (Aarav S.). Delivery latency: 840ms.',
    },
    {
      id: 'EVT-10494',
      time: '12:34:05',
      type: 'ER_TRIAGE_PREPPED',
      badge: 'cyan',
      title: 'Trauma Unit Alerted',
      detail: 'Apex Memorial Trauma Bay 2 prepped. Alert: Severe Penicillin Anaphylaxis, O-Neg RBC pre-ordered.',
    },
    {
      id: 'EVT-10495',
      time: '12:34:07',
      type: 'AUDIT_SEALED',
      badge: 'neutral',
      title: 'Immutable Sovereign Audit Block Sealed',
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
    <section id="dispatcher-feed" className="section-wrapper" style={{ background: 'linear-gradient(180deg, rgba(6, 6, 9, 0.95) 0%, rgba(12, 10, 8, 0.98) 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow" style={{ color: 'var(--color-gold)', letterSpacing: '0.22em' }}>
            ✦ IMPERIAL TELEMETRY COCKPIT ✦
          </div>
          <h2 className="font-royal text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
            Hospital ER Dispatcher Command Deck
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '0 auto', color: 'var(--text-secondary)' }}>
            Powered by Fastify, Socket.IO, and transactional outbox pipelines to synchronize field medics, emergency surgical suites, and family guardians in real time.
          </p>
        </div>

        {/* Live Terminal Card */}
        <div
          className="card-soft"
          style={{
            maxWidth: 980,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.08)',
            background: 'linear-gradient(180deg, rgba(16, 13, 8, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%)',
          }}
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              background: 'linear-gradient(90deg, rgba(28, 22, 12, 0.95) 0%, rgba(14, 13, 18, 0.98) 100%)',
              padding: '1.1rem 1.75rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
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
                  backgroundColor: 'var(--color-gold)',
                  boxShadow: '0 0 10px var(--color-gold)',
                  display: 'inline-block',
                }}
              />
              <span
                className="font-royal"
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-gold-light)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                SOCKET.IO / API:4000 &bull; IMPERIAL DISPATCH FEED
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <StatusBadge variant="gold">DISPATCHER SYNCHRONIZED</StatusBadge>
              <TactileButton
                variant="primary"
                onClick={handleSimulateBroadcast}
                style={{ padding: '0.45rem 1.15rem', fontSize: '0.8125rem' }}
              >
                ✦ Broadcast Trauma Ping
              </TactileButton>
            </div>
          </div>

          {/* Terminal Events List */}
          <div
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.95rem',
              maxHeight: 400,
              overflowY: 'auto',
              background: 'rgba(5, 5, 8, 0.85)',
            }}
          >
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(22, 18, 12, 0.6) 0%, rgba(12, 12, 16, 0.7) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.18)',
                  borderRadius: '10px',
                  padding: '1.1rem 1.35rem',
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
                    <strong className="font-royal" style={{ fontSize: '0.95rem', color: '#ffffff', letterSpacing: '0.02em' }}>
                      {evt.title}
                    </strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {evt.detail}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ color: 'var(--color-gold-light)' }}>{evt.time}</div>
                  <div style={{ color: 'var(--color-gold-dim)', marginTop: 2 }}>{evt.id}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div
            style={{
              background: 'linear-gradient(90deg, rgba(22, 18, 10, 0.95) 0%, rgba(10, 10, 14, 0.98) 100%)',
              padding: '0.95rem 1.75rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: 'var(--color-gold-dim)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>TRANSACTIONAL OUTBOX WORKER: ACTIVE (500ms TICK)</span>
            <span style={{ color: 'var(--color-gold-light)' }}>✦ FAILOVER REDUNDANCY: 99.999%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
