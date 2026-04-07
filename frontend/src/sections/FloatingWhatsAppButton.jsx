import { useSettings } from '../context/SettingsContext';

export default function FloatingWhatsAppButton() {
  const { whatsapp } = useSettings();
  return (
    <>
      <a
        href={`https://wa.me/${whatsapp}?text=Hi%20Waterlift%20Solar%2C%20I%27m%20interested%20in%20solar%20for%20my%20school.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Waterlift Solar on WhatsApp"
        className="whatsapp-float d-flex align-items-center justify-content-center"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          fontSize: '1.6rem',
          zIndex: 9999,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.12)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
        }}
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      <style>{`
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .whatsapp-float {
          animation: wa-pulse 2.5s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-float { animation: none; }
        }
      `}</style>
    </>
  );
}
