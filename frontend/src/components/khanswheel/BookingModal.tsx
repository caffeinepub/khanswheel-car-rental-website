import { useState } from 'react';
import { Vehicle, vehicles } from '../../data/vehicles';
import PlacesAutocomplete from './PlacesAutocomplete';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicle: Vehicle | null;
}

const addons = [
  { id: 'gps', label: 'GPS Navigation', price: 199, unit: '/day', icon: 'fa-map-location-dot' },
  { id: 'childseat', label: 'Child Seat', price: 149, unit: '/day', icon: 'fa-baby' },
  { id: 'extradriver', label: 'Extra Driver', price: 299, unit: '/day', icon: 'fa-user-plus' },
  { id: 'insurance', label: 'Travel Insurance', price: 399, unit: '/trip', icon: 'fa-shield-halved' },
];

const paymentMethods = [
  { id: 'gpay', label: 'Google Pay', group: 'upi', icon: 'fa-google' },
  { id: 'phonepe', label: 'PhonePe', group: 'upi', icon: 'fa-mobile-screen' },
  { id: 'paytm', label: 'Paytm', group: 'upi', icon: 'fa-wallet' },
  { id: 'card', label: 'Debit / Credit Card', group: 'card', icon: 'fa-credit-card' },
  { id: 'netbanking', label: 'Net Banking', group: 'netbanking', icon: 'fa-building-columns' },
  { id: 'emi', label: 'EMI (No Cost)', group: 'emi', icon: 'fa-calendar-check' },
];

const steps = ['Trip Details', 'Select Car', 'Add-ons', 'Your Details', 'Payment'];

export default function BookingModal({ isOpen, onClose, preselectedVehicle }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip' | 'hourly'>('oneway');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const today = new Date().toISOString().slice(0, 16);
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 16);
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(preselectedVehicle);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const validateStep = () => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!pickup.trim()) errs.pickup = 'Enter pickup location';
      if (!drop.trim()) errs.drop = 'Enter drop location';
      if (!pickupDate) errs.pickupDate = 'Select pickup date';
    }
    if (step === 2 && !selectedVehicle) errs.vehicle = 'Please select a vehicle';
    if (step === 4) {
      if (!name.trim()) errs.name = 'Name is required';
      if (!phone.trim()) errs.phone = 'Phone is required';
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
      if (!idType) errs.idType = 'Select ID type';
      if (!idNumber.trim()) errs.idNumber = 'ID number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step === 5) {
      const ref = 'KW' + Date.now().toString().slice(-8).toUpperCase();
      setBookingRef(ref);
      setStep(6);
      return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const days = Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000));
  const basePrice = selectedVehicle ? selectedVehicle.pricePerDay * days : 0;
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const a = addons.find(x => x.id === id);
    if (!a) return sum;
    return sum + (a.unit === '/day' ? a.price * days : a.price);
  }, 0);
  const gst = Math.round((basePrice + addonTotal) * 0.18);
  const total = basePrice + addonTotal + gst;

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: `1.5px solid ${hasError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
    background: 'rgba(255,255,255,0.07)', color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none',
    boxSizing: 'border-box',
  });

  const placesInputStyle: React.CSSProperties = {
    padding: '11px 14px', borderRadius: 8,
    background: 'rgba(255,255,255,0.07)',
    fontFamily: 'Inter, sans-serif', fontSize: 14,
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, overflowY: 'auto',
    }}>
      <div style={{
        background: '#0d1f3c', borderRadius: 20,
        border: '1px solid rgba(245,166,35,0.2)',
        width: '100%', maxWidth: 680,
        maxHeight: '95vh', overflow: 'auto',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky', top: 0, background: '#0d1f3c', zIndex: 10,
        }}>
          <div>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFFFFF', margin: 0 }}>
              {step === 6 ? 'Booking Confirmed!' : 'Book Your Car'}
            </h2>
            {step < 6 && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>
                Step {step} of 5: {steps[step - 1]}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 22 }}
            aria-label="Close booking modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Progress Bar */}
        {step < 6 && (
          <div style={{ padding: '16px 28px 0' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{
                    height: 4, borderRadius: 2,
                    background: i < step ? '#F5A623' : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s',
                  }} />
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 10,
                    color: i < step ? '#F5A623' : 'rgba(255,255,255,0.3)',
                    marginTop: 4, textAlign: 'center',
                  }}>
                    {s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '24px 28px' }}>
          {/* Step 1: Trip Details */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 4 }}>
                {(['oneway', 'roundtrip', 'hourly'] as const).map(type => (
                  <button key={type} onClick={() => setTripType(type)} style={{
                    flex: 1, padding: '8px', border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                    background: tripType === type ? '#F5A623' : 'transparent',
                    color: tripType === type ? '#0A1628' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.2s',
                  }}>
                    {type === 'oneway' ? 'One Way' : type === 'roundtrip' ? 'Round Trip' : 'Hourly'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Pickup Location */}
                <div style={{ position: 'relative' }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>
                    Pickup Location *
                  </label>
                  <PlacesAutocomplete
                    value={pickup}
                    onChange={val => { setPickup(val); if (errors.pickup) setErrors(e => ({ ...e, pickup: '' })); }}
                    placeholder="Search pickup place..."
                    hasError={!!errors.pickup}
                    inputStyle={placesInputStyle}
                    dropdownBg="#0d1f3c"
                  />
                  {errors.pickup && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.pickup}</p>}
                </div>

                {/* Drop Location */}
                <div style={{ position: 'relative' }}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>
                    Drop Location *
                  </label>
                  <PlacesAutocomplete
                    value={drop}
                    onChange={val => { setDrop(val); if (errors.drop) setErrors(e => ({ ...e, drop: '' })); }}
                    placeholder="Search drop place..."
                    hasError={!!errors.drop}
                    inputStyle={placesInputStyle}
                    dropdownBg="#0d1f3c"
                  />
                  {errors.drop && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.drop}</p>}
                </div>

                {/* Pickup Date */}
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>Pickup Date & Time *</label>
                  <input type="datetime-local" value={pickupDate} min={today} onChange={e => setPickupDate(e.target.value)} style={{ ...inputStyle(!!errors.pickupDate), colorScheme: 'dark' }} />
                  {errors.pickupDate && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.pickupDate}</p>}
                </div>

                {/* Return Date */}
                {tripType !== 'hourly' && (
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>Return Date & Time</label>
                    <input type="datetime-local" value={returnDate} min={pickupDate} onChange={e => setReturnDate(e.target.value)} style={{ ...inputStyle(false), colorScheme: 'dark' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Select Car */}
          {step === 2 && (
            <div>
              {errors.vehicle && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#ef4444', marginBottom: 12 }}>{errors.vehicle}</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {vehicles.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px', borderRadius: 12, cursor: 'pointer',
                      border: `2px solid ${selectedVehicle?.id === v.id ? '#F5A623' : 'rgba(255,255,255,0.1)'}`,
                      background: selectedVehicle?.id === v.id ? 'rgba(245,166,35,0.08)' : 'rgba(255,255,255,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: v.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`fa-solid ${v.icon}`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 22 }} aria-label={v.name}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#FFFFFF' }}>{v.name}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{v.seats} Seats · {v.fuel} · AC</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#F5A623' }}>₹{v.pricePerDay.toLocaleString('en-IN')}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>/day</div>
                    </div>
                    {selectedVehicle?.id === v.id && (
                      <i className="fa-solid fa-circle-check" style={{ color: '#F5A623', fontSize: 20 }} aria-label="Selected"></i>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Enhance your journey with these optional add-ons:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {addons.map(addon => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px', borderRadius: 12, cursor: 'pointer',
                      border: `2px solid ${selectedAddons.includes(addon.id) ? '#F5A623' : 'rgba(255,255,255,0.1)'}`,
                      background: selectedAddons.includes(addon.id) ? 'rgba(245,166,35,0.08)' : 'rgba(255,255,255,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(245,166,35,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`fa-solid ${addon.icon}`} style={{ color: '#F5A623', fontSize: 18 }} aria-label={addon.label}></i>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>{addon.label}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#F5A623' }}>₹{addon.price}{addon.unit}</div>
                    </div>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      border: `2px solid ${selectedAddons.includes(addon.id) ? '#F5A623' : 'rgba(255,255,255,0.3)'}`,
                      background: selectedAddons.includes(addon.id) ? '#F5A623' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {selectedAddons.includes(addon.id) && <i className="fa-solid fa-check" style={{ color: '#0A1628', fontSize: 11 }} aria-label="Selected"></i>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Running Total */}
              <div style={{ background: 'rgba(245,166,35,0.08)', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Base ({days} day{days > 1 ? 's' : ''})</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {addonTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Add-ons</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>₹{addonTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>GST (18%)</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14, color: '#FFFFFF' }}>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(245,166,35,0.2)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>Total</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 20, color: '#F5A623' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personal Details */}
          {step === 4 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                <input type="text" placeholder="Rajesh Kumar" value={name} onChange={e => setName(e.target.value)} style={inputStyle(!!errors.name)} />
                {errors.name && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.name}</p>}
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>Phone (+91) *</label>
                <input type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle(!!errors.phone)} />
                {errors.phone && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.phone}</p>}
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>Email *</label>
                <input type="email" placeholder="rajesh@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(!!errors.email)} />
                {errors.email && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.email}</p>}
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>ID Type *</label>
                <select value={idType} onChange={e => setIdType(e.target.value)} style={{ ...inputStyle(!!errors.idType), appearance: 'none' as const }}>
                  <option value="" style={{ background: '#0d1f3c' }}>Select ID</option>
                  <option value="aadhaar" style={{ background: '#0d1f3c' }}>Aadhaar Card</option>
                  <option value="pan" style={{ background: '#0d1f3c' }}>PAN Card</option>
                  <option value="passport" style={{ background: '#0d1f3c' }}>Passport</option>
                  <option value="dl" style={{ background: '#0d1f3c' }}>Driving Licence</option>
                </select>
                {errors.idType && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.idType}</p>}
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>ID Number *</label>
                <input type="text" placeholder="XXXX XXXX XXXX" value={idNumber} onChange={e => setIdNumber(e.target.value)} style={inputStyle(!!errors.idNumber)} />
                {errors.idNumber && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#ef4444', marginTop: 4 }}>{errors.idNumber}</p>}
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div>
              {/* Booking Summary */}
              <div style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: '#F5A623', marginBottom: 12 }}>Booking Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>PICKUP</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{pickup || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>DROP</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{drop || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>VEHICLE</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{selectedVehicle?.name || '—'}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>DURATION</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{days} day{days > 1 ? 's' : ''}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(245,166,35,0.15)', marginTop: 12, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#FFFFFF' }}>Total Amount</span>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 22, color: '#F5A623' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>Select Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {paymentMethods.map(pm => (
                  <div
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                      border: `1.5px solid ${paymentMethod === pm.id ? '#F5A623' : 'rgba(255,255,255,0.1)'}`,
                      background: paymentMethod === pm.id ? 'rgba(245,166,35,0.08)' : 'rgba(255,255,255,0.03)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className={`fa-brands ${pm.icon}`} style={{ color: paymentMethod === pm.id ? '#F5A623' : 'rgba(255,255,255,0.5)', fontSize: 18, width: 22, textAlign: 'center' }} aria-label={pm.label}></i>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: paymentMethod === pm.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)', flex: 1 }}>{pm.label}</span>
                    {paymentMethod === pm.id && <i className="fa-solid fa-circle-check" style={{ color: '#F5A623', fontSize: 16 }} aria-label="Selected"></i>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <i className="fa-solid fa-check" style={{ color: '#22c55e', fontSize: 36 }} aria-label="Success"></i>
              </div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 22, color: '#FFFFFF', marginBottom: 8 }}>Booking Confirmed!</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
                Your booking has been confirmed. We'll send details to your email.
              </p>
              <div style={{
                background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
                borderRadius: 12, padding: '16px 24px', display: 'inline-block', marginBottom: 24,
              }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>BOOKING REFERENCE</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: '#F5A623', letterSpacing: 2 }}>{bookingRef}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24, textAlign: 'left' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>PICKUP</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{pickup}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px' }}>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>DROP</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#FFFFFF' }}>{drop}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                  color: '#0A1628', border: 'none', borderRadius: 10,
                  padding: '12px 32px', fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700, fontSize: 15, cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 6 && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 28px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                color: step === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
                borderRadius: 8, padding: '10px 20px',
                fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: step === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }} aria-label="Back"></i>
              Back
            </button>
            <button
              onClick={handleNext}
              style={{
                background: 'linear-gradient(135deg, #F5A623, #e8941a)',
                color: '#0A1628', border: 'none', borderRadius: 8,
                padding: '10px 24px', fontFamily: 'Poppins, sans-serif',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {step === 5 ? 'Confirm & Pay' : 'Continue'}
              <i className="fa-solid fa-arrow-right" aria-label="Next"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
