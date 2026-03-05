"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail, Lock, User, ArrowRight, ShieldCheck, Loader2,
  Trophy, Users, Target,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Role = "athlete" | "coach" | "user";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

// ---------------------------------------------------------------------------
// Role config
// ---------------------------------------------------------------------------

const ROLES: { id: Role; label: string; icon: React.ElementType }[] = [
  { id: "athlete", label: "Athlete", icon: Trophy },
  { id: "coach",   label: "Coach",   icon: Target },
  { id: "user",    label: "Fan",     icon: Users  },
];

// ---------------------------------------------------------------------------
// Shared input class
// ---------------------------------------------------------------------------

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-base";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "athlete",
  });

  const [error, setError]     = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Auto-dismiss error after 5 s
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const set = <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      // TODO: replace with real auth / API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

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
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <svg width="44" height="44" viewBox="0 0 52 52" className="mb-3 scale-125">
              <polygon points="26,4 6,48 14,48 26,18" fill="#F97316" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#EA580C" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#F97316" />
            </svg>
          </Link>

          <h1 className="text-4xl font-black text-white mb-2 uppercase text-center leading-tight tracking-[0.05em]">
            Join the Ecosystem
          </h1>
          <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
            Create your verified{" "}
            <span className="text-orange-500 font-bold">digital profile</span>
          </p>
        </div>

        {/* Card */}
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

            {/* Error banner */}
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
                    className={inputCls}
                    value={formData.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    required
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                  Secure Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className={inputCls}
                    value={formData.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                    disabled={loading}
                    suppressHydrationWarning
                  />
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
                      className={inputCls}
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
                      className={inputCls}
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

        {/* Footer link */}
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
