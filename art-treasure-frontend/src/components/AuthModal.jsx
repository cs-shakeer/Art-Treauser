import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles, ShieldCheck } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess, onRegisterSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickDemo = (userChoice) => {
    if (userChoice === 'elena') {
      setUserName('art_master');
      setPassword('Master@123');
    } else {
      setUserName('cyber_artisan');
      setPassword('Cyber@123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await onLoginSuccess({ userName, password });
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.message || 'Invalid username or password.');
        }
      } else {
        const res = await onRegisterSuccess({
          userName,
          fullName,
          email,
          mobile: mobile || `+1${Date.now().toString().slice(-9)}`,
          password,
          profileImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          isProfessional
        });
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.message || 'Registration failed. User may already exist.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="neu-flat max-w-md w-full bg-[var(--surface-color)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative my-auto max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="neu-button absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full text-gray-400 hover:text-red-500 p-0"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab switch */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="neu-pressed-sm p-1 rounded-xl sm:rounded-2xl flex w-full max-w-xs gap-1.5">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`flex-1 neu-button py-2 text-xs font-bold rounded-lg sm:rounded-xl ${
                mode === 'login' ? 'neu-button-primary' : ''
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 neu-button py-2 text-xs font-bold rounded-lg sm:rounded-xl ${
                mode === 'register' ? 'neu-button-primary' : ''
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Demo Fast Login Pills */}
        {mode === 'login' && (
          <div className="mb-4 sm:mb-5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl neu-pressed-sm flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="text-gray-400 font-medium flex items-center gap-1 text-[11px] sm:text-xs">
              <Sparkles className="w-3 h-3 text-amber-500" /> Fast Demo:
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('elena')}
                className="neu-button px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-indigo-500 rounded-lg"
              >
                Elena
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('kaelen')}
                className="neu-button px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-cyan-500 rounded-lg"
              >
                Kaelen
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-3.5 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="art_enthusiast"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="neu-input pl-9"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Elena Rostova"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="neu-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="elena@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="neu-input pl-9"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+1 555-0192"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="neu-input pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="proArtist"
                  checked={isProfessional}
                  onChange={(e) => setIsProfessional(e.target.checked)}
                  className="cursor-pointer"
                />
                <label htmlFor="proArtist" className="text-xs text-gray-600 dark:text-gray-300 cursor-pointer flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  Register as Professional Creator
                </label>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neu-input pl-9"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="neu-button neu-button-primary w-full py-2.5 sm:py-3 text-xs sm:text-sm font-bold mt-3 rounded-xl"
          >
            {isLoading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Art Treasure' : 'Join as Creator'}
          </button>
        </form>
      </div>
    </div>
  );
}
