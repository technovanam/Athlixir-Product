"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Step1 } from "./_components/Step1";
import { Step2 } from "./_components/Step2";
import {
  FormState,
  INITIAL_FORM,
  SPORT_CATEGORIES,
  SPORTS_REQUIRING_DOMINANT_HAND,
  calculateAge,
} from "./_components/types";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Auto-dismiss error
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const categories = useMemo(
    () => (form.primarySport ? (SPORT_CATEGORIES[form.primarySport] ?? ["Other"]) : []),
    [form.primarySport],
  );

  const showDominantHand = useMemo(
    () => SPORTS_REQUIRING_DOMINANT_HAND.includes(form.primarySport),
    [form.primarySport],
  );

  const age = useMemo(() => calculateAge(form.dateOfBirth), [form.dateOfBirth]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (key === "dateOfBirth" && value) {
      const ageNum = parseInt(calculateAge(value as string), 10);
      if (!isNaN(ageNum) && ageNum < 16) {
        setError("You must be at least 16 years old.");
        return;
      }
    }
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "primarySport") next.category = "";
      if (key === "state") next.district = "";
      return next;
    });
    setError("");
  }

  function validateStep1(): boolean {
    const checks: [boolean, string][] = [
      [!!form.name.trim(), "Name is required."],
      [!!form.dateOfBirth, "Date of birth is required."],
      [parseInt(age, 10) >= 16, "You must be at least 16 years old."],
      [!!form.gender, "Gender is required."],
      [!!form.nationality, "Nationality is required."],
      [!!form.primarySport, "Primary sport is required."],
      [!!form.category, "Category is required."],
      [!!form.state, "State is required."],
      [!!form.district, "District is required."],
      [!!form.cityTown.trim(), "City / Town is required."],
    ];
    for (const [valid, msg] of checks) {
      if (!valid) { setError(msg); return false; }
    }
    return true;
  }

  async function handleSaveStep1() {
    if (!validateStep1()) return;
    setSaving(true);
    try {
      // TODO: wire up your save/API call here
      await new Promise((r) => setTimeout(r, 1000));
      setStep(2);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleCompleteOnboarding() {
    setSaving(true);
    try {
      // TODO: wire up your save/API call here
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Onboarding complete", form);
    } catch {
      setError("Failed to complete. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
          alt=""
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

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl px-4 md:px-6 relative z-10 flex flex-col max-h-[calc(100vh-4rem)]"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-3 shrink-0">
          <Link href="/">
            <svg width="36" height="36" viewBox="0 0 52 52" className="mb-2">
              <polygon points="26,4 6,48 14,48 26,18" fill="#F97316" />
              <polygon points="26,4 46,48 38,48 26,18" fill="#EA580C" />
              <rect x="14" y="30" width="24" height="5" rx="1" fill="#F97316" />
            </svg>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                Complete Your Athlete Profile
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-0.5">
                Step {step} of 2 · Secured & Verified
              </p>
            </div>
          </div>

          {/* Step progress bar */}
          <div className="flex gap-2 mt-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-500 ${
                  s <= step ? "bg-orange-500 w-12" : "bg-white/10 w-8"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-4xl p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto flex-1"
          onFocus={() => setError("")}
        >
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

          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1
                key="step1"
                form={form}
                age={age}
                categories={categories}
                updateField={updateField}
                saving={saving}
                onNext={handleSaveStep1}
              />
            )}
            {step === 2 && (
              <Step2
                key="step2"
                form={form}
                showDominantHand={showDominantHand}
                updateField={updateField}
                saving={saving}
                onBack={() => setStep(1)}
                onComplete={handleCompleteOnboarding}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
