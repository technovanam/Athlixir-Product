"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock, User, ArrowRight, ShieldCheck, Loader2,
  Trophy, Users, Target, Phone, CheckCircle2, X, ChevronRight,
} from "lucide-react";
import { FieldLabel, SectionCard, inputCls, StyledSelect } from "./shared";
import { FormState, BLOOD_GROUPS, NATIONALITIES, INDIAN_STATES } from "./types";

// ---------------------------------------------------------------------------
// Signup Types
// ---------------------------------------------------------------------------
type Role = "athlete" | "coach" | "user";

interface SignupFormData {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: Role;
  otp: string;
}

// ---------------------------------------------------------------------------
// Role config
// ---------------------------------------------------------------------------
const ROLES: { id: Role; label: string; icon: React.ElementType }[] = [
  { id: "athlete", label: "Athlete", icon: Trophy },
  { id: "coach",   label: "Coach",   icon: Target },
  { id: "user",    label: "User",     icon: Users  },
];

// ---------------------------------------------------------------------------
// Signup input class
// ---------------------------------------------------------------------------
const signupInputCls =
  "w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-base";

// ---------------------------------------------------------------------------
// Default export: Signup Page
// ---------------------------------------------------------------------------
export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "athlete",
    otp: "",
  });

  const [error, setError]           = useState<string>("");
  const [loading, setLoading]       = useState<boolean>(false);
  const [otpSent, setOtpSent]       = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [otpError, setOtpError]     = useState<string>("");
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpDigits, setOtpDigits]   = useState<string[]>(["" ,"", "", ""]);
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const set = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSendOtp = async () => {
    if (!formData.phone) return setError("Please enter your phone number first.");
    setOtpLoading(true);
    setOtpError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setOtpSent(true);
      setOtpDigits(["", "", "", ""]);
      set("otp", "");
      setShowOtpModal(true);
    } catch {
      setOtpError("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpDigits.join("");
    if (otp.length < 4) return setOtpError("Enter all 4 digits.");
    setOtpLoading(true);
    setOtpError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPhoneVerified(true);
      setOtpSent(false);
      setShowOtpModal(false);
    } catch {
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!phoneVerified) {
      return setError("Please verify your phone number before continuing.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Persist name so onboarding can auto-fill it
      localStorage.setItem("athlixir_signup_name", formData.fullName);
      if (formData.role === "coach") {
        router.push("/coach/dashboard");
      } else if (formData.role === "user") {
        router.push("/user/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div
            key="otp-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
            >
              <button
                type="button"
                onClick={() => { setShowOtpModal(false); setOtpError(""); }}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Phone size={26} className="text-orange-500" />
                </div>
              </div>

              <h2 className="text-white font-black text-xl uppercase tracking-widest text-center mb-1">Verify Phone</h2>
              <p className="text-gray-500 text-[11px] text-center uppercase tracking-widest mb-6">
                Enter the 4-digit OTP sent to<br />
                <span className="text-orange-400 font-bold">+91 {formData.phone}</span>
              </p>

              <div className="flex justify-center gap-3 mb-4">
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
                      setOtpError("");
                      if (val && i < 3) otpRefs[i + 1].current?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
                        otpRefs[i - 1].current?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
                      const next = ["", "", "", ""];
                      pasted.split("").forEach((ch, idx) => { if (idx < 4) next[idx] = ch; });
                      setOtpDigits(next);
                      otpRefs[Math.min(pasted.length, 3)].current?.focus();
                    }}
                    disabled={otpLoading}
                    suppressHydrationWarning
                    className="w-14 h-14 text-center text-2xl font-black text-white bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 focus:bg-white/8 transition-all"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center mb-4">{otpError}</p>
              )}

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otpLoading || otpDigits.join("").length < 4}
                suppressHydrationWarning
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                {otpLoading ? <Loader2 size={18} className="animate-spin" /> : "Verify OTP"}
              </button>

              <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-4">
                Didn&apos;t receive?{" "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="text-orange-500 font-black hover:text-orange-400 transition-colors"
                >
                  Resend
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
          alt="Athlete Training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-6 lg:left-12 z-20"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-orange-500" size={18} />
          Back to Home
        </Link>
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-175 px-6 relative z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-black text-white mb-2 uppercase text-center leading-tight tracking-[0.05em]">
            Join the Ecosystem
          </h1>
          <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
            Create your verified{" "}
            <span className="text-orange-500 font-bold">digital profile</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          {/* Vertical Role Switcher */}
          <div className="w-full md:w-32 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 flex md:flex-col justify-around md:justify-center p-4 gap-4">
            {ROLES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => set("role", id)}
                suppressHydrationWarning
                className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all flex-1 md:flex-none ${
                  formData.role === id
                    ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <Icon size={24} className="mb-2" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="flex-1 p-8 md:p-10" onFocus={() => setError("")}>

            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                  Full Identity Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={signupInputCls}
                    value={formData.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    required
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                  Phone Number
                </label>
                <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-2xl focus-within:border-orange-500/50 focus-within:bg-white/8 transition-all overflow-hidden">
                  <div className="pl-6 pr-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors shrink-0 border-r border-white/10">
                    <Phone size={18} />
                  </div>
                  <span className="pl-4 pr-1 py-4 text-gray-700 text-base select-none shrink-0">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="XXXXX XXXXX"
                    className="flex-1 bg-transparent py-4 pl-4 pr-4 text-white placeholder:text-gray-700 focus:outline-none text-base"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      set("phone", digits);
                      setPhoneVerified(false);
                      setOtpSent(false);
                      set("otp", "");
                    }}
                    required
                    disabled={loading || phoneVerified}
                    suppressHydrationWarning
                  />
                  <div className="pr-3 flex items-center shrink-0">
                    {phoneVerified ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle2 size={16} className="shrink-0" />
                        Verified
                      </span>
                    ) : formData.phone.length >= 10 ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading || loading}
                        suppressHydrationWarning
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                      >
                        {otpLoading && !otpSent ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : otpSent ? "Resend" : "Verify"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Access Key
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={signupInputCls}
                      value={formData.password}
                      onChange={(e) => set("password", e.target.value)}
                      required
                      disabled={loading}
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Confirm Key
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors">
                      <ShieldCheck size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className={signupInputCls}
                      value={formData.confirmPassword}
                      onChange={(e) => set("confirmPassword", e.target.value)}
                      required
                      disabled={loading}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.5)] flex items-center justify-center gap-3 group mt-6 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Profile
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm font-medium tracking-wide">
          Already an Athlete?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-black hover:text-orange-400 transition-colors uppercase ml-1"
          >
            Access Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Named export: Personal Info Step (used by onboarding/page.tsx)
// ---------------------------------------------------------------------------

interface Step1Props {
  form: FormState;
  age: string;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  saving: boolean;
  onNext: () => void;
}

export function Step1({ form, age, updateField, saving, onNext }: Step1Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateField("profilePhoto", url);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <SectionCard icon={<User size={18} className="text-orange-500" />} title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Name */}
          <div>
            <FieldLabel>
              Full Name{" "}
              <span className="text-orange-500 uppercase font-bold">(auto-filled from signup)</span>
            </FieldLabel>
            <input
              type="text"
              className={`${inputCls} cursor-not-allowed opacity-60`}
              placeholder="John Doe"
              value={form.name}
              readOnly
              tabIndex={-1}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <FieldLabel>
              Date of Birth <span className="text-orange-500">(locked after save)</span>
            </FieldLabel>
            <input
              type="date"
              className={inputCls}
              value={form.dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                const val = e.target.value;
                if (!val) {
                  updateField("dateOfBirth", val);
                  return;
                }
                const [yearStr, month, day] = val.split("-");
                if (!yearStr) return;
                // Clamp year to 4 digits and not beyond current year
                const currentYear = new Date().getFullYear();
                let year = yearStr.slice(0, 4);
                if (year.length === 4 && parseInt(year, 10) > currentYear) {
                  year = String(currentYear);
                }
                updateField("dateOfBirth", `${year}-${month ?? ""}-${day ?? ""}`);
              }}
            />
          </div>

          {/* Age */}
          <div>
            <FieldLabel>Age (auto)</FieldLabel>
            <input
              type="text"
              className={`${inputCls} cursor-not-allowed text-gray-400`}
              value={age}
              readOnly
              placeholder="—"
            />
          </div>

          {/* Gender */}
          <div>
            <FieldLabel>Gender</FieldLabel>
            <StyledSelect
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </StyledSelect>
          </div>

          {/* Nationality */}
          <div>
            <FieldLabel>Nationality</FieldLabel>
            <div className={`${inputCls} cursor-not-allowed opacity-60 flex items-center gap-2`}>
              <span>🇮🇳</span>
              <span>Indian</span>
            </div>
          </div>

          {/* Height */}
          <div>
            <FieldLabel>Height (cm)</FieldLabel>
            <input
             
              min="0"
              className={inputCls}
              placeholder="175"
              value={form.height}
              onChange={(e) => updateField("height", e.target.value)}
            />
          </div>

          {/* Weight */}
          <div>
            <FieldLabel>Weight (kg)</FieldLabel>
            <input
              
              min="0"
              className={inputCls}
              placeholder="70"
              value={form.weight}
              onChange={(e) => updateField("weight", e.target.value)}
            />
          </div>

          {/* Blood Group */}
          <div>
            <FieldLabel>Blood Group</FieldLabel>
            <StyledSelect
              value={form.bloodGroup}
              onChange={(e) => updateField("bloodGroup", e.target.value)}
            >
              <option value="">Select</option>
              {BLOOD_GROUPS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </StyledSelect>
          </div>

          {/* State */}
          <div>
            <FieldLabel>State</FieldLabel>
            <StyledSelect
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
            >
              <option value="">Select</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </StyledSelect>
          </div>

          {/* District */}
          <div>
            <FieldLabel>District</FieldLabel>
            <input
              type="text"
              className={inputCls}
              placeholder="District"
              value={form.district}
              onChange={(e) => updateField("district", e.target.value)}
            />
          </div>

          {/* City / Town */}
          <div>
            <FieldLabel>City / Town</FieldLabel>
            <input
              type="text"
              className={inputCls}
              placeholder="City or town"
              value={form.cityTown}
              onChange={(e) => updateField("cityTown", e.target.value)}
            />
          </div>

          {/* Profile Photo */}
          <div>
            <FieldLabel>Profile Photo</FieldLabel>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={`${inputCls} file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30 cursor-pointer`}
            />
          </div>

        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={saving}
          className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[0_10px_30px_rgba(255,87,34,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save & Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
