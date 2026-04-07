import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSettings } from '../context/SettingsContext';
import heroBg from '../assets/picture/hero-section-image.png';

const HERO_TILES = [
  { icon: 'bi-cash-stack',       label: 'No Upfront Costs' },
  { icon: 'bi-piggy-bank',       label: 'Savings Every Month' },
  { icon: 'bi-headset',          label: '24/7 Support' },
  { icon: 'bi-phone',            label: 'Mobile Monitoring' },
  { icon: 'bi-tools',            label: 'All Maintenance Included' },
  { icon: 'bi-shield-check',     label: 'Compliance Certificate' },
  { icon: 'bi-calendar-check',   label: 'Month-to-Month Contract' },
];

export default function HeroSection() {
  const headingRef = useScrollReveal({ threshold: 0.05 });
  const tilesRef   = useScrollReveal({ threshold: 0.05 });
  const { hero_headline, hero_subtext } = useSettings();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '64px',
        overflow: 'hidden',
      }}
    >
      {/* Animated Ken Burns background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-8%',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          animation: 'heroBgZoom 22s ease-in-out infinite alternate',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(26,23,69,0.78) 0%, rgba(38,33,97,0.72) 45%, rgba(15,14,46,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Accent glow — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-60px', left: '-60px',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(55,48,163,0.20) 0%, transparent 65%)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      {/* ═══════════════════════════════════════════════════
           ☀️  SOLAR ENERGY SYSTEM — Full creative animation
          ═══════════════════════════════════════════════════ */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>

        {/* ── Sun anchor (top-right) ── */}
        <div style={{ position: 'absolute', top: '7%', right: '11%' }}>

          {/* Far atmospheric corona */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 380, height: 380, borderRadius: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(255,200,50,0.13) 0%, rgba(255,140,20,0.05) 55%, transparent 75%)',
            animation: 'farCorona 6s ease-in-out infinite',
          }} />

          {/* Mid corona */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 190, height: 190, borderRadius: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(circle, rgba(255,225,90,0.28) 0%, rgba(255,170,40,0.10) 60%, transparent 100%)',
            animation: 'midCorona 3.8s ease-in-out infinite',
          }} />

          {/* Outer ring pulse */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 110, height: 110, borderRadius: '50%',
            transform: 'translate(-50%,-50%)',
            border: '1.5px solid rgba(255,220,80,0.35)',
            animation: 'ringPulse 3s ease-out infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 110, height: 110, borderRadius: '50%',
            transform: 'translate(-50%,-50%)',
            border: '1px solid rgba(255,220,80,0.20)',
            animation: 'ringPulse 3s ease-out infinite 1s',
          }} />

          {/* Sun core — white-hot centre */}
          <div style={{
            position: 'relative', width: 70, height: 70, borderRadius: '50%',
            background: 'radial-gradient(circle, #ffffff 0%, #fffaaa 18%, #ffd230 50%, rgba(255,140,20,0.75) 80%, transparent 100%)',
            boxShadow: '0 0 35px 14px rgba(255,215,50,0.75), 0 0 90px 35px rgba(255,165,30,0.40), 0 0 180px 70px rgba(255,110,10,0.18)',
            animation: 'sunCore 3.8s ease-in-out infinite',
          }} />

          {/* Rotating rays — long slow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 220, height: 220,
            transform: 'translate(-50%,-50%)',
            animation: 'raysA 30s linear infinite',
          }}>
            {[0,40,80,120,160,200,240,280,320].map(d => (
              <div key={d} style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 2.5, height: 60, marginLeft: -1.25,
                background: 'linear-gradient(to bottom, rgba(255,235,90,0.85), transparent)',
                transformOrigin: '50% 0%',
                transform: `rotate(${d}deg) translateY(-90px)`,
                borderRadius: 3,
              }} />
            ))}
          </div>

          {/* Rotating rays — short fast reverse */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 160, height: 160,
            transform: 'translate(-50%,-50%)',
            animation: 'raysB 14s linear infinite reverse',
          }}>
            {[20,60,100,140,180,220,260,300,340].map(d => (
              <div key={d} style={{
                position: 'absolute', top: '50%', left: '50%',
                width: 1.5, height: 32, marginLeft: -0.75,
                background: 'linear-gradient(to bottom, rgba(255,250,180,0.65), transparent)',
                transformOrigin: '50% 0%',
                transform: `rotate(${d}deg) translateY(-68px)`,
                borderRadius: 2,
              }} />
            ))}
          </div>
        </div>

        {/* ── Lens flare chain (along sun → bottom-left diagonal) ── */}
        {[
          { t:'16%', r:'22%', s:28,  c:'rgba(255,245,180,0.22)', d:0   },
          { t:'24%', r:'33%', s:14,  c:'rgba(200,235,255,0.28)', d:0.4 },
          { t:'32%', r:'44%', s:54,  c:'rgba(255,215,90,0.10)',  d:0.8, ring:true },
          { t:'40%', r:'55%', s:10,  c:'rgba(255,200,80,0.35)',  d:1.2 },
          { t:'48%', r:'66%', s:38,  c:'rgba(180,215,255,0.14)', d:1.6, ring:true },
          { t:'56%', r:'77%', s:18,  c:'rgba(255,240,130,0.20)', d:2.0 },
        ].map((f, i) => (
          <div key={i} style={{
            position: 'absolute', top: f.t, right: f.r,
            width: f.s, height: f.s, borderRadius: '50%',
            background: f.ring ? 'transparent' : f.c,
            border: f.ring ? `1px solid ${f.c}` : 'none',
            animation: `flare${(i % 3) + 1} 5s ease-in-out infinite ${f.d}s`,
            transform: 'translate(50%, -50%)',
          }} />
        ))}

        {/* ── Energy photon particles streaming from sun ── */}
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i * 137.5) % 360;
          const rad = angle * Math.PI / 180;
          const dx = Math.round(Math.cos(rad) * (100 + (i % 4) * 50));
          const dy = Math.round(Math.sin(rad) * (80 + (i % 5) * 60) + 60);
          const size = 2 + (i % 3);
          const delay = i * 0.28;
          const r = 255, g = 180 + (i % 4) * 18, b = 30 + i * 8;
          return (
            <div key={i} style={{
              position: 'absolute',
              top: '7%', right: '11%',
              width: size, height: size,
              borderRadius: '50%',
              background: `rgba(${r},${g},${Math.min(b,200)},0.9)`,
              boxShadow: `0 0 ${size * 2}px rgba(255,200,60,0.6)`,
              animation: `photon 1s ease-out infinite ${delay}s`,
              '--pdx': `${dx}px`,
              '--pdy': `${dy}px`,
            }} />
          );
        })}

        {/* ── Light beams radiating from sun corner ── */}
        {[
          { rotate: 32,  h: '62%', opacity: 0.38, delay: '0s'   },
          { rotate: 18,  h: '50%', opacity: 0.22, delay: '0.8s' },
          { rotate: 48,  h: '45%', opacity: 0.18, delay: '1.6s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', top: '7%', right: '11%',
            width: 3, height: b.h,
            background: `linear-gradient(to bottom, rgba(255,225,70,${b.opacity}) 0%, transparent 100%)`,
            transformOrigin: 'top right',
            transform: `rotate(${b.rotate}deg)`,
            animation: `beamPulse 4s ease-in-out infinite ${b.delay}`,
            borderRadius: 4,
            filter: 'blur(3px)',
          }} />
        ))}

        {/* ── Panel glint — horizontal shimmer on solar panel roof area ── */}
        {/* Main bright glint sweep across panels */}
        <div style={{
          position: 'absolute', top: '52%', left: '8%', right: '8%', height: 3,
          background: 'linear-gradient(to right, transparent 0%, rgba(255,235,100,0.0) 15%, rgba(255,255,255,0.70) 50%, rgba(255,235,100,0.0) 85%, transparent 100%)',
          borderRadius: 4, filter: 'blur(1.5px)',
          animation: 'panelGlint 4.5s ease-in-out infinite',
        }} />
        {/* Secondary glint — slightly lower row of panels */}
        <div style={{
          position: 'absolute', top: '57%', left: '18%', right: '18%', height: 2,
          background: 'linear-gradient(to right, transparent, rgba(255,220,80,0.55), transparent)',
          borderRadius: 4, filter: 'blur(1px)',
          animation: 'panelGlint 4.5s ease-in-out infinite 2.2s',
        }} />
        {/* Tertiary glint — right wing of roof */}
        <div style={{
          position: 'absolute', top: '54%', right: '5%', width: '30%', height: 2,
          background: 'linear-gradient(to right, transparent, rgba(255,240,120,0.45), transparent)',
          borderRadius: 4, filter: 'blur(1px)',
          animation: 'panelGlint 4.5s ease-in-out infinite 3.8s',
        }} />
        {/* Diffuse panel glow — warm reflection over roof zone */}
        <div style={{
          position: 'absolute', top: '44%', left: '5%', right: '5%', height: '24%',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,215,60,0.10) 0%, rgba(255,160,20,0.05) 50%, transparent 75%)',
          pointerEvents: 'none',
          animation: 'panelGlow 6s ease-in-out infinite',
        }} />

        {/* ── Wide diagonal light sweep across panels ── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, width: '28%',
            background: 'linear-gradient(108deg, transparent 0%, rgba(255,220,80,0.035) 38%, rgba(255,255,255,0.08) 50%, rgba(255,220,80,0.035) 62%, transparent 100%)',
            animation: 'lightSweep 11s ease-in-out infinite',
            transform: 'skewX(-14deg)',
          }} />
        </div>

      </div>

      <div className="container position-relative" style={{ zIndex: 3 }}>

        {/* Heading block */}
        <div ref={headingRef} className="fade-up text-center mb-5">

          {/* Badge */}
          <span
            className="badge mb-4 px-3 py-2"
            style={{
              background: 'rgba(239,105,34,0.15)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(239,105,34,0.35)',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            <i className="bi bi-sun-fill me-2"></i>
            Kenya's School Solar Specialists — Est. 2018
          </span>

          {/* Headline with gradient on key word */}
          <h1
            className="text-white fw-800 mb-4"
            style={{
              fontSize: 'clamp(2.3rem, 5.8vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '880px',
              margin: '0 auto 1.25rem',
            }}
          >
            {hero_headline}
          </h1>

          {/* Animated accent underline */}
          <div
            style={{
              width: '80px', height: '4px',
              background: 'var(--gradient-accent)',
              borderRadius: '4px',
              margin: '0 auto 24px',
              animation: 'gradientShift 3s ease infinite',
              backgroundSize: '200% 200%',
            }}
          />

          <p
            className="mb-5 mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
              color: 'rgba(255,255,255,0.80)',
              maxWidth: '620px',
              lineHeight: 1.8,
            }}
          >
            {hero_subtext}
          </p>

          {/* CTAs */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <a
              href="#contact"
              className="btn-brand-accent btn-shimmer text-decoration-none d-inline-flex align-items-center gap-2"
              style={{ fontSize: '1rem', padding: '16px 38px', borderRadius: '10px', fontWeight: 700 }}
            >
              <i className="bi bi-calendar-check"></i>
              Get Your Free School Audit
            </a>
            <a
              href="#how-it-works"
              className="btn-brand-outline-white text-decoration-none d-inline-flex align-items-center gap-2"
              style={{ fontSize: '1rem', padding: '16px 32px', borderRadius: '10px' }}
            >
              <i className="bi bi-play-circle-fill"></i>
              See How It Works
            </a>
          </div>
        </div>

        {/* Tiles label */}
        <div className="text-center mb-4">
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Everything your school needs
          </p>
        </div>

        {/* Feature tiles */}
        <div ref={tilesRef} className="row row-cols-2 row-cols-sm-4 g-3 stagger-children justify-content-center">
          {HERO_TILES.map((tile, i) => (
            <div className="col" key={i}>
              <div
                className="fade-up text-center p-3 h-100"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '14px',
                  cursor: 'default',
                  transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,105,34,0.13)';
                  e.currentTarget.style.borderColor = 'rgba(239,105,34,0.45)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 52, height: 52, borderRadius: '13px',
                    background: 'rgba(239,105,34,0.18)',
                    border: '1px solid rgba(239,105,34,0.32)',
                  }}
                >
                  <i className={`bi ${tile.icon}`} style={{ fontSize: '1.45rem', color: 'var(--color-accent)' }}></i>
                </div>
                <p style={{
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: '0.77rem',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  margin: 0,
                  letterSpacing: '0.01em',
                }}>
                  {tile.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="text-center mt-5">
          <a href="#trust" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
            <i className="bi bi-chevron-double-down d-block bounce-anim" style={{ fontSize: '1.3rem' }}></i>
          </a>
        </div>
      </div>

      <style>{`
        /* ── Sun animations ── */
        @keyframes sunCore {
          0%,100% { box-shadow: 0 0 35px 14px rgba(255,215,50,0.75),0 0 90px 35px rgba(255,165,30,0.40),0 0 180px 70px rgba(255,110,10,0.18); transform:scale(1); }
          50%      { box-shadow: 0 0 55px 22px rgba(255,215,50,0.95),0 0 130px 55px rgba(255,165,30,0.60),0 0 260px 100px rgba(255,110,10,0.28); transform:scale(1.10); }
        }
        @keyframes midCorona {
          0%,100% { opacity:0.75; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:1;    transform:translate(-50%,-50%) scale(1.22); }
        }
        @keyframes farCorona {
          0%,100% { opacity:0.55; transform:translate(-50%,-50%) scale(1); }
          50%      { opacity:1;    transform:translate(-50%,-50%) scale(1.35); }
        }
        @keyframes ringPulse {
          0%   { transform:translate(-50%,-50%) scale(1);   opacity:0.8; }
          60%  { transform:translate(-50%,-50%) scale(2.2); opacity:0;   }
          100% { transform:translate(-50%,-50%) scale(2.2); opacity:0;   }
        }
        @keyframes raysA {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes raysB {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        /* ── Lens flare ── */
        @keyframes flare1 {
          0%,100% { opacity:0.25; transform:translate(50%,-50%) scale(1); }
          50%      { opacity:0.85; transform:translate(50%,-50%) scale(1.35); }
        }
        @keyframes flare2 {
          0%,100% { opacity:0.15; transform:translate(50%,-50%) scale(0.9); }
          50%      { opacity:0.65; transform:translate(50%,-50%) scale(1.45); }
        }
        @keyframes flare3 {
          0%,100% { opacity:0.20; transform:translate(50%,-50%) scale(1.05); }
          50%      { opacity:0.55; transform:translate(50%,-50%) scale(0.85); }
        }
        /* ── Photon particles ── */
        @keyframes photon {
          0%   { transform:translate(0,0) scale(1);   opacity:0.95; }
          70%  { opacity:0.5; }
          100% { transform:translate(var(--pdx),var(--pdy)) scale(0); opacity:0; }
        }
        /* ── Light beams ── */
        @keyframes beamPulse {
          0%,100% { opacity:0.4; }
          50%      { opacity:1;   }
        }
        /* ── Panel glint ── */
        @keyframes panelGlint {
          0%,25%,100% { opacity:0; transform:scaleX(0.5); }
          50%          { opacity:1; transform:scaleX(1.2); }
          78%          { opacity:0.25; transform:scaleX(1.05); }
        }
        @keyframes panelGlow {
          0%,100% { opacity:0.4; }
          50%      { opacity:1; }
        }
        /* ── Wide sweep ── */
        @keyframes lightSweep {
          0%   { left:-35%; opacity:0; }
          8%   { opacity:1; }
          88%  { opacity:1; }
          100% { left:140%; opacity:0; }
        }
        @keyframes heroBgZoom {
          0%   { transform: scale(1)    translateX(0px)    translateY(0px); }
          25%  { transform: scale(1.06) translateX(-12px)  translateY(-8px); }
          50%  { transform: scale(1.10) translateX(8px)    translateY(-4px); }
          75%  { transform: scale(1.06) translateX(4px)    translateY(8px); }
          100% { transform: scale(1.04) translateX(-4px)   translateY(4px); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroBgZoom"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
