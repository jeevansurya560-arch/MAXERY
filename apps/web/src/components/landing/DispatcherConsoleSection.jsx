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
      title: 'Emergency Token Scanned',
      detail: 'Opaque Token MX-QR-7F89B2A4 scanned by Ambulance EMS-42 (Zone 4). Geohash: tn78f9.',
    },
    {
      id: 'EVT-10493',
      time: '12:34:03',
      type: 'OUTBOX_DISPATCHED',
      badge: 'verified',
      title: 'Trusted-Contact Alert Delivered',
      detail: 'SMS notification delivered to primary contact (Aarav S.). Delivery latency: 840ms.',
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
      title: 'Immutable Audit Block Written',
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
      badge: 'emergency',
      title: `Simulated Trauma Incident #${nextNum}`,
      detail: `Real-time WebSocket event published to Regional Trauma Cluster. Geohash resolution verified.`,
    };

    setEvents([newEvt, ...events]);
  };

  return (
    <section id="dispatcher-feed" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">REAL-TIME TRAUMA TELEMETRY</div>
          <h2>Hospital ER Dispatcher Console</h2>
          <p className="section-subtitle">
            Powered by Fastify, Socket.IO, and transactional outbox pipelines to synchronize first responders, emergency departments, and family networks in real time.
          </p>
        </div>

        {/* Live Terminal Card */}
        <div
          className="card-soft"
          style={{
            maxWidth: 960,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--border-medium)',
          }}
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              background: 'rgba(9, 13, 22, 0.95)',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                SOCKET.IO / API:4000 &bull; LIVE FEED
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <StatusBadge variant="verified">DISPATCHER SYNCED</StatusBadge>
              <TactileButton
                variant="primary"
                onClick={handleSimulateBroadcast}
                style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
              >
                + Broadcast Trauma Ping
              </TactileButton>
            </div>
          </div>

          {/* Terminal Events List */}
          <div
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              maxHeight: 380,
              overflowY: 'auto',
              background: 'rgba(6, 9, 15, 0.7)',
            }}
          >
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.55)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: '10px',
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
                    <strong style={{ fontSize: '0.9375rem', color: '#ffffff' }}>{evt.title}</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
                  <div>{evt.time}</div>
                  <div style={{ color: 'var(--color-cyan)', marginTop: 2 }}>{evt.id}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Footer */}
          <div
            style={{
              background: 'rgba(9, 13, 22, 0.95)',
              padding: '0.85rem 1.5rem',
              borderTop: '1px solid var(--border-hairline)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>TRANSACTIONAL OUTBOX WORKER: ACTIVE (500ms TICK)</span>
            <span style={{ color: 'var(--color-verified)' }}>FAILOVER REDUNDANCY: 99.99%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
