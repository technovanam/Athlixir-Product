"use client";

import { motion } from "framer-motion";
import { User, ChevronRight, Loader2 } from "lucide-react";
import { FieldLabel, SectionCard, inputCls } from "./shared";
import { FormState, SPORTS_LIST, NATIONALITIES, INDIAN_STATES } from "./types";

interface Step1Props {
  form: FormState;
  age: string;
  categories: string[];
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  saving: boolean;
  onNext: () => void;
}

export function Step1({ form, age, categories, updateField, saving, onNext }: Step1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <SectionCard icon={<User size={18} className="text-orange-500" />} title="Basic Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Name */}
          <div>
            <FieldLabel>Full Name (from signup)</FieldLabel>
            <input
              type="text"
              className={inputCls}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
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
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
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
            />
          </div>

          {/* Gender */}
          <div>
            <FieldLabel>Gender</FieldLabel>
            <select
              className={inputCls}
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Nationality */}
          <div>
            <FieldLabel>Nationality</FieldLabel>
            <select
              className={inputCls}
              value={form.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
            >
              <option value="">Select</option>
              {NATIONALITIES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Primary Sport */}
          <div>
            <FieldLabel>
              Primary Sport <span className="text-orange-500">(change limit)</span>
            </FieldLabel>
            <select
              className={inputCls}
              value={form.primarySport}
              onChange={(e) => updateField("primarySport", e.target.value)}
            >
              <option value="">Select sport</option>
              {SPORTS_LIST.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          {categories.length > 0 && (
            <div>
              <FieldLabel>Category ({form.primarySport})</FieldLabel>
              <select
                className={inputCls}
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* State */}
          <div>
            <FieldLabel>State</FieldLabel>
            <select
              className={inputCls}
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
            >
              <option value="">Select</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
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
