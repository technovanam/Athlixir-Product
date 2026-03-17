"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, KeyRound, Loader2, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";

// step: "phone" → "otp" → "password"
type Step = "phone" | "otp" | "password";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState<string>("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Step 1 → send OTP
  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setOtpDigits(["", "", "", "", "", ""]);
      setStep("otp");
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 → verify OTP
  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 6) return setError("Please enter all 6 digits.");
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep("password");
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 → reset password
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) return setError("Password must be at least 6 characters.");
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-10">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80"
          alt="Athlete Preparing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back to Login */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-6 lg:left-12 z-20"
      >
        <Link
          href="/login"
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-primary" size={18} />
          Back to Portal
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-120 px-6 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <polygon points="26,4 6,48 14,48 26,18" fill="#FF5722" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#E64A19" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#FF5722" />
            </svg>
          </Link>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">
            Reset Access
          </h1>
          <p className="text-secondary text-center text-[10px] font-black uppercase tracking-[0.3em]">
            Recover your{" "}
            <span className="text-primary font-bold">Secure Athlete Key</span>
          </p>
        </div>

        {/* Card */}
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── STEP 1: Phone ── */}
          {step === "phone" && (
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                  Phone Number
                </label>
                <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 focus-within:bg-white/8 transition-all overflow-hidden">
                  <div className="pl-6 pr-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors shrink-0 border-r border-white/10">
                    <Phone size={18} />
                  </div>
                  <span className="pl-4 pr-1 py-4 text-muted text-base select-none shrink-0">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="XXXXX XXXXX"
                    className="flex-1 bg-transparent py-4 pl-4 pr-4 text-white placeholder:text-muted focus:outline-none text-base"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || phone.length < 10}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-[0_10px_30px_rgba(255,87,34,0.25)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.4)] flex items-center justify-center gap-3 group uppercase tracking-widest text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Reset My Key
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "otp" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Phone (locked) */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-secondary text-sm font-bold">+91 {phone}</span>
              </div>

              {/* OTP label */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4 text-center">
                  Enter 6-digit OTP sent to your number
                </p>
                <div className="flex justify-center gap-3">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const next = [...otpDigits];
                        next[i] = val;
                        setOtpDigits(next);
                        setError("");
                        if (val && i < 5) otpRefs[i + 1].current?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
                          otpRefs[i - 1].current?.focus();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
                        const next = ["", "", "", "", "", ""];
                        pasted.split("").forEach((ch, idx) => { if (idx < 6) next[idx] = ch; });
                        setOtpDigits(next);
                        otpRefs[Math.min(pasted.length, 5)].current?.focus();
                      }}
                      disabled={loading}
                      suppressHydrationWarning
                      className="w-11 h-11 text-center text-xl font-black text-white bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:bg-white/8 transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading || otpDigits.join("").length < 6}
                suppressHydrationWarning
                className="w-full py-4 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : (
                  <>Verify OTP <CheckCircle2 size={18} /></>
                )}
              </button>

              <p className="text-center text-disabled text-[10px] uppercase tracking-widest">
                Didn&apos;t receive?{" "}
                <button
                  type="button"
                  onClick={() => { setStep("phone"); setError(""); }}
                  className="text-primary font-black hover:text-primary-hover transition-colors"
                >
                  Change Number
                </button>
                {" · "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-primary font-black hover:text-primary-hover transition-colors disabled:opacity-40"
                >
                  Resend
                </button>
              </p>
            </motion.div>
          )}

          {/* ── STEP 3: New Password ── */}
          {step === "password" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Verified badge */}
              <div className="flex items-center gap-3 bg-success/10 border border-success/20 rounded-2xl px-6 py-4 mb-6">
                <CheckCircle2 size={18} className="text-success shrink-0" />
                <span className="text-success text-sm font-black uppercase tracking-widest">
                  +91 {phone} — Verified
                </span>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    New Password
                  </label>
                  <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 focus-within:bg-white/8 transition-all overflow-hidden">
                    <div className="pl-6 pr-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors shrink-0">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showNew ? "text" : "password"}
                      placeholder="Min 6 characters"
                      className="flex-1 bg-transparent py-4 pr-4 text-white placeholder:text-muted focus:outline-none text-base"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={loading}
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="pr-5 text-muted hover:text-secondary transition-colors shrink-0"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 focus-within:bg-white/8 transition-all overflow-hidden">
                    <div className="pl-6 pr-4 flex items-center pointer-events-none text-muted group-focus-within:text-primary transition-colors shrink-0">
                      <KeyRound size={18} />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="flex-1 bg-transparent py-4 pr-4 text-white placeholder:text-muted focus:outline-none text-base"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="pr-5 text-muted hover:text-secondary transition-colors shrink-0"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-[0_10px_30px_rgba(255,87,34,0.25)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.4)] flex items-center justify-center gap-3 group uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Save New Key
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

        </div>

        <p className="mt-12 text-center text-disabled text-[10px] font-bold uppercase tracking-[0.2em]">
          Secured by Athlixir Forge &copy; 2024
        </p>
      </motion.div>
    </div>
  );
}

