"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1305&auto=format&fit=crop"
          alt="stadium"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Back Button */}
      <div className="absolute top-10 left-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest"
        >
          <ArrowRight className="rotate-180 text-orange-500" size={18} />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-130 px-6"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">

          <div className="mb-4">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <polygon points="26,4 6,48 14,48 26,18" fill="#F97316" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#EA580C" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#F97316" />
            </svg>
          </div>

          <h1 className="text-4xl font-black text-white uppercase">
            Access Portal
          </h1>

          <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-2">
            Secured Athlixir <span className="text-orange-500">Data Gate</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-[0_0_60px_rgba(0,0,0,0.6)]">

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-gray-500">
                Athlete ID / Email
              </label>

              <div className="relative">
                <Mail className="absolute left-5 top-5 text-gray-500" size={20} />

                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">

              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Key Access
                </label>

                <Link
                  href="/reset-password"
                  className="text-xs text-orange-500 font-bold uppercase hover:text-orange-400"
                >
                  Reset Key?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-5 top-5 text-gray-500" size={20} />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Verify Identity
                  <ArrowRight size={20} />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-gray-500 text-sm">
          New Athlete?{" "}
          <Link
            href="/signup"
            className="text-orange-500 font-bold hover:text-orange-400 uppercase"
          >
            Build Profile
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
