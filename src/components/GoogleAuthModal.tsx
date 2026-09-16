import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  setAuthUser,
  blankPassport,
  emptyPerson,
  savePassport,
  isEmailRegistered,
  clearDatabase,
  type AuthUser,
  type Passport,
} from '../utils/storage';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';

interface GoogleAuthProps {
  initialMode?: 'signup' | 'login' | 'unified';
  onSuccess?: (user: AuthUser) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const GoogleSvg = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const GoogleAuthCard: React.FC<GoogleAuthProps> = ({
  initialMode = 'unified',
  onSuccess,
  onClose,
  isModal = false,
}) => {
  const navigate = useNavigate();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectAccount = (name: string, email: string) => {
    setLoading(true);
    setTimeout(() => {
      const isAlreadyRegistered = isEmailRegistered(email.trim().toLowerCase());

      const user: AuthUser = {
        id: `goog_${Date.now()}`,
        name: name.trim() || 'Research Scholar',
        email: email.trim().toLowerCase(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || 'scholar')}`,
        isNewUser: !isAlreadyRegistered,
      };

      setAuthUser(user);

      if (!isAlreadyRegistered) {
        // Keep leader information completely blank as requested
        const updatedPassport: Passport = {
          ...blankPassport(),
          registered: false,
          people: [emptyPerson()],
        };
        savePassport(updatedPassport);
      }

      setLoading(false);

      if (onSuccess) {
        onSuccess(user);
      } else {
        if (isAlreadyRegistered) {
          navigate('/dashboard');
        } else {
          navigate('/register');
        }
      }
    }, 80);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErr = false;
    if (!customName.trim()) {
      setNameError('Full name is required.');
      hasErr = true;
    } else {
      setNameError('');
    }

    if (!customEmail.trim()) {
      setEmailError('Email address is required.');
      hasErr = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customEmail.trim())) {
      setEmailError('Please enter a valid email address.');
      hasErr = true;
    } else {
      setEmailError('');
    }

    if (hasErr) return;

    handleSelectAccount(customName.trim(), customEmail.trim().toLowerCase());
  };

  return (
    <div
      className={`relative bg-[#FCF9F2] border-2 border-[#C8B89A] rounded-2xl p-5 sm:p-7 shadow-2xl text-[#0A2A5E] ${
        isModal ? 'max-w-md w-full mx-auto animate-in fade-in zoom-in-95 duration-200' : ''
      }`}
      style={{
        boxShadow: '0 20px 40px -15px rgba(10, 42, 94, 0.25), 0 0 0 1px rgba(200, 184, 154, 0.4)',
      }}
    >
      {/* Decorative corner postage accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C8B89A]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C8B89A]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C8B89A]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C8B89A]" />

      {/* Close button if in modal */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#0A2A5E] p-2 rounded-full hover:bg-black/5 transition-colors z-10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Pill Badge */}
      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0A2A5E]/10 border border-[#C8B89A] text-[10px] font-bold tracking-widest text-[#0A2A5E] uppercase">
          ✦ VIKAS 2026 REGISTRATION
        </span>
      </div>

      {/* Header Info */}
      <div className="text-center mb-5">
        <h3 className="font-display text-2xl font-bold text-[#0A2A5E] leading-tight">
          Sign In with Google
        </h3>
        <p className="text-xs text-[#5A5A7A] mt-1.5 max-w-sm mx-auto leading-relaxed">
          Sign in to continue to VIKAS 2026. Registered scholars redirect to Dashboard; new participants proceed to registration.
        </p>
      </div>

      {/* Clean Google Sign In Form */}
      <form onSubmit={handleCustomSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0A2A5E] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Atharva Satish Kadam"
            value={customName}
            onChange={(e) => {
              setCustomName(e.target.value);
              if (nameError) setNameError('');
            }}
            className={`w-full px-3 py-2.5 text-base sm:text-xs rounded-lg border min-h-[44px] ${
              nameError ? 'border-red-500 bg-red-50/30 ring-1 ring-red-400' : 'border-[#C8B89A] bg-white'
            } text-[#0A2A5E] focus:outline-none focus:ring-2 focus:ring-[#0A2A5E]`}
          />
          {nameError && <p className="text-[11px] text-red-600 mt-1 font-semibold">{nameError}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0A2A5E]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Use personal email ID
            </span>
          </div>
          <input
            type="email"
            placeholder="Enter personal email (e.g. name@gmail.com)"
            value={customEmail}
            onChange={(e) => {
              setCustomEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
            className={`w-full px-3 py-2.5 text-base sm:text-xs rounded-lg border min-h-[44px] ${
              emailError ? 'border-red-500 bg-red-50/30 ring-1 ring-red-400' : 'border-[#C8B89A] bg-white'
            } text-[#0A2A5E] focus:outline-none focus:ring-2 focus:ring-[#0A2A5E]`}
          />
          {emailError && <p className="text-[11px] text-red-600 mt-1 font-semibold">{emailError}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#0A2A5E] hover:bg-[#082046] text-white text-sm sm:text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-2 min-h-[48px]"
        >
          <GoogleSvg className="w-4 h-4 bg-white rounded-full p-0.5" />
          <span>
            {initialMode === 'signup'
              ? 'Sign Up with Google'
              : isEmailRegistered(customEmail.trim().toLowerCase())
              ? 'Sign In & Open Dashboard'
              : 'Continue with Google'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {loading && (
        <div className="mt-4 p-2.5 bg-blue-50/80 border border-blue-200 text-blue-900 rounded-xl text-xs text-center font-medium animate-pulse flex items-center justify-center gap-2">
          <GoogleSvg className="w-4 h-4 animate-spin" />
          <span>Authenticating account...</span>
        </div>
      )}

      {/* Security note & Clean Database */}
      <div className="mt-5 pt-3 border-t border-[#C8B89A]/40 flex flex-col items-center justify-center gap-1.5 text-[11px] text-[#5A5A7A]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#138808]" />
          <span>Official IEEE SLRTCE Secure Authentication</span>
        </div>
        <button
          type="button"
          onClick={() => {
            clearDatabase();
            window.location.href = '/register';
          }}
          className="text-[10px] text-gray-400 hover:text-red-600 transition-colors underline cursor-pointer min-h-[44px] inline-flex items-center"
        >
          Clean Database (Reset to 0 Registered IDs)
        </button>
      </div>
    </div>
  );
};

export default GoogleAuthCard;
