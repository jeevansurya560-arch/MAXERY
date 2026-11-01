'use client';

import { useState } from 'react';
import TactileButton from '../ui/TactileButton';
import StatusBadge from '../ui/StatusBadge';

export default function InteractiveScannerSimulator() {
  const [smsSent, setSmsSent] = useState(false);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);

  const sampleProfiles = [
    {
      id: 'MX-QR-7F89B2A4C1D0E3F5-DEMO',
      bloodGroup: 'O-Negative',
      bloodTag: 'UNIVERSAL RBC DONOR',
      demographic: 'Adult Male (30-39)',
      allergies: [
        { name: 'Penicillin & Beta-Lactam Antibiotics', severity: 'Lethal Anaphylaxis (Class 4)' },
        { name: 'NSAIDs (Ibuprofen / Aspirin)', severity: 'Severe Bronchospasm' },
      ],
      chronicConditions: [
        'Type-1 Diabetes Mellitus (Insulin Dependent)',
        'Cardiac Stent Placed (2023)',
      ],
      contacts: [
        { name: 'Aarav Sharma', relation: 'Spouse / Next-of-Kin', phone: '+91 98765 43210', primary: true },
        { name: 'Dr. Neha Patel', relation: 'Primary Cardiologist', phone: '+91 91234 56789', primary: false },
      ],
      geohash: '12.9716° N, 77.5946° E',
      auditHash: 'SHA256: 8f4a19b2c0e812d4...sealed',
    },
    {
      id: 'MX-QR-3C91A088E2B4F671-DEMO',
      bloodGroup: 'B-Positive',
      bloodTag: 'RH-POSITIVE COMPATIBLE',
      demographic: 'Adult Female (40-49)',
      allergies: [
        { name: 'Succinylcholine (NMBA)', severity: 'Malignant Hyperthermia Risk' },
        { name: 'Iodinated Radiocontrast Media', severity: 'Severe Systemic Angioedema' },
      ],
      chronicConditions: [
        'Chronic Anticoagulation Therapy (Apixaban / DOAC)',
        'Severe Asthma',
      ],
      contacts: [
        { name: 'Kavita Menon', relation: 'Guardian / Sister', phone: '+91 98450 11223', primary: true },
        { name: 'St. John Trauma Bay', relation: 'ER Emergency Bay', phone: '112 / Ext 4', primary: false },
      ],
      geohash: '13.0827° N, 80.2707° E',
      auditHash: 'SHA256: 3a71f09e6c10d8a1...sealed',
    },
  ];

  const profile = sampleProfiles[activeProfileIndex];

  return (
    <section id="scanner-simulator" className="section-wrapper" style={{ background: 'var(--color-near-black)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header centered">
          <div className="section-eyebrow">
            ✦ EMERGENCY RESPONDER COCKPIT ✦
          </div>
          <h2 className="font-neoclassical text-gold-foil" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)' }}>
            Utilitarian Field Triage Simulator
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 720, margin: '1rem auto 0 auto', color: 'var(--color-warm-ivory-dim)' }}>
            Engineered on Bauhaus principles for field paramedics and trauma teams. Zero animation lag, immediate clinical clarity, and maximum high-stress legibility.
          </p>
        </div>

        {/* Utilitarian Bauhaus Responder Card */}
        <div
          style={{
            maxWidth: 920,
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'var(--color-near-black-card)',
            border: '2px solid var(--border-subtle)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-clinical-md)',
          }}
        >
          {/* Bauhaus Top Control Bar */}
          <div
            style={{
              background: 'var(--color-clinical-navy)',
              padding: '1rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid rgba(245, 241, 234, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                BAUHAUS FIELD PROTOCOL &bull; INSTANT TELEMETRY ACTIVE
              </span>
            </div>

            {/* Profile Switcher */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-ivory-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Sample Token:
              </span>
              <button
                type="button"
                onClick={() => { setActiveProfileIndex(0); setSmsSent(false); }}
                style={{
                  background: activeProfileIndex === 0 ? 'var(--color-muted-gold)' : 'rgba(255, 255, 255, 0.08)',
                  color: activeProfileIndex === 0 ? 'var(--color-near-black)' : 'var(--color-warm-ivory)',
                  border: 'none',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Case #1 (O-Neg)
              </button>
              <button
                type="button"
                onClick={() => { setActiveProfileIndex(1); setSmsSent(false); }}
                style={{
                  background: activeProfileIndex === 1 ? 'var(--color-muted-gold)' : 'rgba(255, 255, 255, 0.08)',
                  color: activeProfileIndex === 1 ? 'var(--color-near-black)' : 'var(--color-warm-ivory)',
                  border: 'none',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Case #2 (B-Pos)
              </button>
            </div>
          </div>

          {/* Main Utilitarian Triage Surface */}
          <div style={{ padding: '2rem' }}>
            {/* Header Acuity Strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid var(--border-hairline)',
                paddingBottom: '1.25rem',
                marginBottom: '1.75rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <StatusBadge variant="emergency">ACTIVE RESCUE SCENE</StatusBadge>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-muted-gold)',
                      fontWeight: 600,
                    }}
                  >
                    TOKEN: {profile.id}
                  </span>
                </div>
                <h3 className="font-neoclassical" style={{ fontSize: '1.5rem', color: 'var(--color-warm-ivory)', marginTop: '0.4rem' }}>
                  Emergency Clinical Triage Card
                </h3>
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-warm-ivory-muted)',
                  textAlign: 'right',
                  lineHeight: 1.5,
                }}
              >
                <div>GEOHASH: {profile.geohash}</div>
                <div style={{ color: 'var(--color-verified)' }}>IDENTITY SEALED (ZERO PII)</div>
              </div>
            </div>

            {/* High-Impact Bauhaus Compartment 1: Blood Group & Acuity */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Blood Group Stark Box */}
              <div
                style={{
                  background: 'var(--color-near-black-elevated)',
                  border: '2px solid var(--color-muted-gold)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-muted-gold)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                    }}
                  >
                    CONFIRMED BLOOD TYPE
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: 'var(--color-warm-ivory)',
                      lineHeight: 1.1,
                      marginTop: '0.25rem',
                    }}
                  >
                    {profile.bloodGroup}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-gold-light)', marginTop: '0.2rem', fontWeight: 600 }}>
                    ✦ {profile.bloodTag}
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(191, 160, 106, 0.12)',
                    border: '1px solid var(--color-muted-gold)',
                    borderRadius: '6px',
                    padding: '0.6rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-warm-ivory)' }}>
                    ATLS
                  </span>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-gold)' }}>PRIORITY 1</div>
                </div>
              </div>

              {/* Patient Demographic Box */}
              <div
                style={{
                  background: 'var(--color-near-black-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-warm-ivory-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  CITIZEN DEMOGRAPHIC
                </div>
                <div
                  className="font-neoclassical"
                  style={{
                    fontSize: '1.35rem',
                    color: 'var(--color-warm-ivory)',
                    marginTop: '0.35rem',
                  }}
                >
                  {profile.demographic}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-warm-ivory-muted)', marginTop: '0.25rem' }}>
                  DPDPA 2023 pseudonymized token
                </span>
              </div>
            </div>

            {/* High-Impact Bauhaus Compartment 2: LETHAL CONTRAINDICATIONS (Alert Red) */}
            <div
              style={{
                background: 'var(--color-emergency-bg)',
                border: '2px solid var(--color-emergency)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                className="font-mono"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: '#FCA5A5',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.06em',
                }}
              >
                <span>⚠️</span>
                <span>CRITICAL LIFE-SAFETY CONTRAINDICATIONS (DO NOT ADMINISTER)</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {profile.allergies.map((allergy, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.45)',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(220, 38, 38, 0.35)',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{allergy.name}</strong>
                    <span
                      className="font-mono"
                      style={{
                        color: '#FCA5A5',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        background: 'rgba(220, 38, 38, 0.3)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                      }}
                    >
                      {allergy.severity}
                    </span>
                  </div>
                ))}

                {profile.chronicConditions.map((cond, idx) => (
                  <div
                    key={`cond-${idx}`}
                    style={{
                      fontSize: '0.875rem',
                      color: '#FECACA',
                      padding: '0.35rem 0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    &bull; {cond}
                  </div>
                ))}
              </div>
            </div>

            {/* High-Impact Bauhaus Compartment 3: Next-of-Kin Telephony */}
            <div
              style={{
                background: 'var(--color-near-black-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                className="font-neoclassical"
                style={{
                  fontSize: '1.15rem',
                  marginBottom: '1rem',
                  color: 'var(--color-warm-ivory)',
                }}
              >
                Trusted Emergency Contacts &amp; Relatives
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {profile.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      background: 'var(--color-near-black)',
                      borderRadius: '6px',
                      border: '1px solid var(--border-hairline)',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-warm-ivory)', fontSize: '0.95rem' }}>
                        {contact.name} &bull; <span style={{ color: 'var(--color-muted-gold)', fontSize: '0.85rem' }}>{contact.relation}</span>
                      </div>
                      <div
                        className="font-mono"
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--color-warm-ivory-dim)',
                          marginTop: '0.2rem',
                        }}
                      >
                        {contact.phone}
                      </div>
                    </div>

                    {contact.primary && (
                      <TactileButton
                        variant={smsSent ? 'secondary' : 'primary'}
                        onClick={() => setSmsSent(true)}
                        style={{ padding: '0.55rem 1.25rem', fontSize: '0.8125rem' }}
                      >
                        {smsSent ? '✓ Alert Dispatched' : 'Notify Next-of-Kin'}
                      </TactileButton>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* High-Impact Bauhaus Compartment 4: Cryptographic Ledger Seal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                fontSize: '0.78rem',
                color: 'var(--color-warm-ivory-muted)',
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '1rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>AUDIT LEDGER: {profile.auditHash}</span>
              <span style={{ color: 'var(--color-verified)' }}>DPDPA 2023 STATUTORY COMPLIANCE SEALED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
