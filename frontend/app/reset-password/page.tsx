"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, KeyRound, Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate sending reset email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch {
      setError("Could not find an athlete profile with this email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80"
          alt="Athlete Preparing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back to Login */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-6 lg:left-12 z-20"
      >
        <Link
          href="/login"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-orange-500" size={18} />
          Back to Portal
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[480px] px-6 relative z-10"
      >
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="flex flex-col items-center mb-10">
              <Link href="/" className="mb-4">
                <svg width="52" height="52" viewBox="0 0 52 52">
                  <polygon points="26,4 6,48 14,48 26,18" fill="#F97316" />
                  <polygon points="26,4 46,48 38,48 26,18" fill="#EA580C" />
                  <rect x="14" y="30" width="24" height="5" rx="1" fill="#F97316" />
                </svg>
              </Link>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">
                Reset Access
              </h1>
              <p className="text-gray-400 text-center text-[10px] font-black uppercase tracking-[0.3em]">
                Recover your{" "}
                <span className="text-orange-500 font-bold">Secure Athlete Key</span>
              </p>
            </div>

            {/* Reset Card */}
            <div
              className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onFocus={() => setError("")}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Registered ID / Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-600 group-focus-within:text-orange-500 transition-colors">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.08] transition-all text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.5)] flex items-center justify-center gap-3 group uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Recovery Link
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/30">
              <KeyRound size={40} className="text-orange-500" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
              Check Your Inbox
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
              We&apos;ve sent an encrypted recovery link to <br />
              <span className="text-white font-bold">{email}</span>.<br />
              Please follow the instructions to reset your key
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-xs hover:text-orange-400 transition-colors"
            >
              Return to Portal <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}

        <p className="mt-12 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          Secured by Athlixir Forge &copy; 2024
        </p>
      </motion.div>
    </div>
  );
}
