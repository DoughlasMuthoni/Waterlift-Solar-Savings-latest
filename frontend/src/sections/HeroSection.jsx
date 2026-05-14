import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSettings } from '../context/SettingsContext';
import heroBg from '../assets/picture/hero-section-image.png';

const HERO_TILES = [
  { icon: 'bi-cash-stack',     label: 'No Upfront Costs' },
  { icon: 'bi-piggy-bank',     label: 'Savings Every Month' },
  { icon: 'bi-headset',        label: '24/7 Support' },
  { icon: 'bi-phone',          label: 'Mobile Monitoring' },
  { icon: 'bi-tools',          label: 'All Maintenance Included' },
  { icon: 'bi-shield-check',   label: 'Completion Certificate' },
  { icon: 'bi-calendar-check', label: 'Month-to-Month Contract' },
];

const TILE_TOP_BARS = [
  'linear-gradient(90deg, #262161, #3730a3)',
  'linear-gradient(90deg, #EF6922, #f5883f)',
  'linear-gradient(90deg, #262161, #EF6922)',
  'linear-gradient(90deg, #EF6922, #262161)',
  'linear-gradient(90deg, #3730a3, #262161)',
  'linear-gradient(90deg, #f5883f, #EF6922)',
  'linear-gradient(90deg, #262161, #EF6922)',
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
      {/* Static background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(26,23,69,0.42) 0%, rgba(38,33,97,0.36) 45%, rgba(15,14,46,0.50) 100%)',
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

      {/* ═══ ☀️  SUN ANIMATION ═══ */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>

        {/* Sun anchor (top-right) */}
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

          {/* Outer ring pulses */}
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

          {/* Sun core */}
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

        {/* Photon particles streaming from sun */}
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i * 137.5) % 360;
          const rad = angle * Math.PI / 180;
          const dx = Math.round(Math.cos(rad) * (100 + (i % 4) * 50));
          const dy = Math.round(Math.sin(rad) * (80 + (i % 5) * 60) + 60);
          const size = 2 + (i % 3);
          const delay = i * 0.28;
          const g = 180 + (i % 4) * 18;
          const b = Math.min(30 + i * 8, 200);
          return (
            <div key={i} style={{
              position: 'absolute',
              top: '7%', right: '11%',
              width: size, height: size,
              borderRadius: '50%',
              background: `rgba(255,${g},${b},0.9)`,
              boxShadow: `0 0 ${size * 2}px rgba(255,200,60,0.6)`,
              animation: `photon 1s ease-out infinite ${delay}s`,
              '--pdx': `${dx}px`,
              '--pdy': `${dy}px`,
            }} />
          );
        })}

        {/* Light beams radiating from sun */}
        {[
          { rotate: 32, h: '62%', opacity: 0.38, delay: '0s'   },
          { rotate: 18, h: '50%', opacity: 0.22, delay: '0.8s' },
          { rotate: 48, h: '45%', opacity: 0.18, delay: '1.6s' },
        ].map((bm, i) => (
          <div key={i} style={{
            position: 'absolute', top: '7%', right: '11%',
            width: 3, height: bm.h,
            background: `linear-gradient(to bottom, rgba(255,225,70,${bm.opacity}) 0%, transparent 100%)`,
            transformOrigin: 'top right',
            transform: `rotate(${bm.rotate}deg)`,
            animation: `beamPulse 4s ease-in-out infinite ${bm.delay}`,
            borderRadius: 4,
            filter: 'blur(3px)',
          }} />
        ))}

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

          {/* Headline */}
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
              color: 'rgba(255,255,255,0.85)',
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
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Everything your school needs
          </p>
        </div>

        {/* Feature tiles — sharp white cards */}
        <div ref={tilesRef} className="row row-cols-2 row-cols-sm-4 g-3 stagger-children justify-content-center align-items-stretch">
          {HERO_TILES.map((tile, i) => (
            <div className="col d-flex" key={i}>
              <div
                className="fade-up text-center p-3 w-100"
                style={{
                  position: 'relative',
                  background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #262161, #EF6922) border-box',
                  border: '1.5px solid transparent',
                  borderRadius: '14px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)',
                  cursor: 'default',
                  overflow: 'hidden',
                  transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.28), 0 4px 12px rgba(239,105,34,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)';
                }}
              >
                {/* Top colour bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '3px',
                  background: TILE_TOP_BARS[i % TILE_TOP_BARS.length],
                  borderRadius: '14px 14px 0 0',
                }} />

                {/* Icon box */}
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 52, height: 52, borderRadius: '13px',
                    background: 'rgba(239,105,34,0.10)',
                    border: '1.5px solid rgba(239,105,34,0.28)',
                  }}
                >
                  <i className={`bi ${tile.icon}`} style={{ fontSize: '1.45rem', color: 'var(--color-accent)' }}></i>
                </div>

                <p style={{
                  color: 'var(--color-primary)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
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
          <a href="#trust" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
            <i className="bi bi-chevron-double-down d-block bounce-anim" style={{ fontSize: '1.3rem' }}></i>
          </a>
        </div>
      </div>

      <style>{`
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
        @keyframes photon {
          0%   { transform:translate(0,0) scale(1);   opacity:0.95; }
          70%  { opacity:0.5; }
          100% { transform:translate(var(--pdx),var(--pdy)) scale(0); opacity:0; }
        }
        @keyframes beamPulse {
          0%,100% { opacity:0.4; }
          50%      { opacity:1;   }
        }
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </section>
  );
}
