import { useEffect, useRef, useState, useCallback } from 'react';

interface AutocompletePrediction {
  description: string;
  place_id: string;
}

interface AutocompleteService {
  getPlacePredictions: (
    request: { input: string; componentRestrictions?: { country: string } },
    callback: (predictions: AutocompletePrediction[] | null, status: string) => void
  ) => void;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          AutocompleteService: new () => AutocompleteService;
          PlacesServiceStatus: { OK: string };
        };
      };
    };
  }
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  inputStyle?: React.CSSProperties;
  dropdownBg?: string;
  id?: string;
}

export default function PlacesAutocomplete({
  value,
  onChange,
  placeholder = 'Enter location',
  hasError = false,
  inputStyle = {},
  dropdownBg = '#0d1f3c',
  id,
}: PlacesAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const autocompleteServiceRef = useRef<AutocompleteService | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Google Maps AutocompleteService when available
  const initService = useCallback(() => {
    if (window.google?.maps?.places?.AutocompleteService && !autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }
  }, []);

  useEffect(() => {
    initService();
    // Poll until Google Maps loads (in case script loads after component mounts)
    const interval = setInterval(() => {
      if (window.google?.maps?.places?.AutocompleteService) {
        initService();
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [initService]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback((input: string) => {
    if (!input.trim() || input.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (!autocompleteServiceRef.current) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    autocompleteServiceRef.current.getPlacePredictions(
      { input, componentRestrictions: { country: 'in' } },
      (predictions, status) => {
        setIsLoading(false);
        if (status === window.google?.maps?.places?.PlacesServiceStatus?.OK && predictions) {
          setSuggestions(predictions);
          setShowDropdown(true);
        } else {
          setSuggestions([]);
          setShowDropdown(false);
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 250);
  };

  const handleSelect = (description: string) => {
    onChange(description);
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex].description);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const baseInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.1)',
    border: `1px solid ${hasError ? '#ef4444' : 'rgba(255,255,255,0.2)'}`,
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
    ...inputStyle,
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true);
        }}
        placeholder={placeholder}
        autoComplete="off"
        style={baseInputStyle}
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      />
      {isLoading && (
        <div style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          <i className="fa-solid fa-circle-notch fa-spin" style={{ color: '#F5A623', fontSize: 13 }} aria-label="Loading suggestions"></i>
        </div>
      )}
      {showDropdown && suggestions.length > 0 && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: dropdownBg,
            border: '1px solid rgba(245,166,35,0.3)',
            borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 9999,
            listStyle: 'none',
            margin: 0,
            padding: '4px 0',
            maxHeight: 240,
            overflowY: 'auto',
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.place_id}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(s.description)}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: i === activeIndex ? '#F5A623' : 'rgba(255,255,255,0.85)',
                background: i === activeIndex ? 'rgba(245,166,35,0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                transition: 'background 0.15s',
                borderBottom: i < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <i
                className="fa-solid fa-location-dot"
                style={{ color: '#F5A623', fontSize: 13, marginTop: 2, flexShrink: 0 }}
                aria-hidden="true"
              />
              <span style={{ lineHeight: 1.4 }}>{s.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
