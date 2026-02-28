import { Vehicle } from '../../data/vehicles';

interface CompareBarProps {
  compareList: Vehicle[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  compareModalOpen: boolean;
  onCloseCompare: () => void;
}

const compareAttributes = [
  { key: 'pricePerDay', label: 'Price/Day', format: (v: Vehicle) => `₹${v.pricePerDay.toLocaleString('en-IN')}` },
  { key: 'seats', label: 'Seats', format: (v: Vehicle) => `${v.seats} Seats` },
  { key: 'fuel', label: 'Fuel Type', format: (v: Vehicle) => v.fuel },
  { key: 'ac', label: 'AC', format: (v: Vehicle) => v.ac ? '✓ Yes' : '✗ No' },
  { key: 'bootSpace', label: 'Boot Space', format: (v: Vehicle) => v.bootSpace },
  { key: 'driverAvailable', label: 'Driver Available', format: (v: Vehicle) => v.driverAvailable ? '✓ Yes' : '✗ No' },
];

export default function CompareBar({ compareList, onRemove, onCompare, compareModalOpen, onCloseCompare }: CompareBarProps) {
  if (compareList.length === 0) return null;

  return (
    <>
      {/* Sticky Compare Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
        background: '#0A1628', borderTop: '2px solid #F5A623',
        padding: '12px 24px', boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#F5A623', whiteSpace: 'nowrap' }}>
            Compare ({compareList.length}/3):
          </span>
          <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap' }}>
            {compareList.map(v => (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
                borderRadius: 8, padding: '6px 12px',
              }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{v.name}</span>
                <button
                  onClick={() => onRemove(v.id)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1 }}
                  aria-label={`Remove ${v.name} from compare`}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
          {compareList.length >= 2 && (
            <button
              onClick={onCompare}
              style={{
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                color: '#0A1628', border: 'none', borderRadius: 8,
                padding: '10px 24px', fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Compare Now
            </button>
          )}
        </div>
      </div>

      {/* Compare Modal */}
      {compareModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <div style={{
            background: '#0d1f3c', borderRadius: 20,
            border: '1px solid rgba(245,166,35,0.3)',
            maxWidth: 900, width: '100%', maxHeight: '90vh',
            overflow: 'auto', padding: 32,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, color: '#FFFFFF' }}>
                Vehicle Comparison
              </h2>
              <button
                onClick={onCloseCompare}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 22 }}
                aria-label="Close comparison"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Feature</th>
                    {compareList.map(v => (
                      <th key={v.id} style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{
                          width: 60, height: 60, borderRadius: 10, margin: '0 auto 8px',
                          background: v.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <i className={`fa-solid ${v.icon}`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 24 }} aria-label={v.name}></i>
                        </div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>{v.name}</div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{v.model}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareAttributes.map((attr, i) => (
                    <tr key={attr.key} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                      <td style={{ padding: '14px 16px', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{attr.label}</td>
                      {compareList.map(v => (
                        <td key={v.id} style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: attr.key === 'pricePerDay' ? '#F5A623' : '#FFFFFF' }}>
                          {attr.format(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
