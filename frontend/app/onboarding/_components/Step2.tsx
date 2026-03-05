"use client";

import { motion } from "framer-motion";
import { Ruler, Award, Target, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { FieldLabel, SectionCard, inputCls } from "./shared";
import {
  FormState,
  CURRENT_LEVELS,
  PREFERRED_TRAINING_TYPES,
  BLOOD_GROUPS,
  DISABILITY_CATEGORIES,
} from "./types";

interface Step2Props {
  form: FormState;
  showDominantHand: boolean;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  saving: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export function Step2({
  form,
  showDominantHand,
  updateField,
  saving,
  onBack,
  onComplete,
}: Step2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Physical & Basic */}
        <SectionCard icon={<Ruler size={18} className="text-orange-500" />} title="Physical & Basic">
          <div className="grid grid-cols-2 gap-4">

            <div>
              <FieldLabel>Height (cm)</FieldLabel>
              <input
                type="number"
                min="0"
                className={inputCls}
                placeholder="175"
                value={form.height}
                onChange={(e) => updateField("height", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Weight (kg)</FieldLabel>
              <input
                type="number"
                min="0"
                className={inputCls}
                placeholder="70"
                value={form.weight}
                onChange={(e) => updateField("weight", e.target.value)}
              />
            </div>

            {showDominantHand && (
              <div className="col-span-2">
                <FieldLabel>Dominant Hand</FieldLabel>
                <select
                  className={inputCls}
                  value={form.dominantHand}
                  onChange={(e) => updateField("dominantHand", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                </select>
              </div>
            )}

            <div className="col-span-2">
              <FieldLabel>Disability Status</FieldLabel>
              <div className="flex gap-6 mb-2">
                {(["no", "yes"] as const).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="disabilityStatus"
                      value={opt}
                      checked={form.disabilityStatus === opt}
                      onChange={() => updateField("disabilityStatus", opt)}
                      className="accent-orange-500"
                    />
                    <span className="text-white text-sm capitalize">{opt}</span>
                  </label>
                ))}
              </div>
              {form.disabilityStatus === "yes" && (
                <select
                  className={inputCls}
                  value={form.disabilityCategory}
                  onChange={(e) => updateField("disabilityCategory", e.target.value)}
                >
                  <option value="">Select category</option>
                  {DISABILITY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="col-span-2">
              <FieldLabel>Blood Group (optional)</FieldLabel>
              <select
                className={inputCls}
                value={form.bloodGroup}
                onChange={(e) => updateField("bloodGroup", e.target.value)}
              >
                <option value="">Select (optional)</option>
                {BLOOD_GROUPS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

          </div>
        </SectionCard>

        {/* Experience */}
        <SectionCard icon={<Award size={18} className="text-orange-500" />} title="Experience">
          <div className="grid gap-4">

            <div>
              <FieldLabel>Years of Experience</FieldLabel>
              <input
                type="number"
                min="0"
                className={inputCls}
                placeholder="e.g. 5"
                value={form.yearsOfExperience}
                onChange={(e) => updateField("yearsOfExperience", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Current Level</FieldLabel>
              <select
                className={inputCls}
                value={form.currentLevel}
                onChange={(e) => updateField("currentLevel", e.target.value)}
              >
                <option value="">Select</option>
                {CURRENT_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel>Current Academy (optional)</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="Academy name"
                value={form.currentAcademy}
                onChange={(e) => updateField("currentAcademy", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Current Coach (optional)</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="Coach name"
                value={form.currentCoach}
                onChange={(e) => updateField("currentCoach", e.target.value)}
              />
            </div>

          </div>
        </SectionCard>

        {/* Preferences */}
        <SectionCard icon={<Target size={18} className="text-orange-500" />} title="Preferences">
          <div className="grid gap-4">

            <div>
              <FieldLabel>Secondary Sports (optional)</FieldLabel>
              <input
                type="text"
                className={inputCls}
                placeholder="e.g. Athletics, Swimming"
                value={form.secondarySports}
                onChange={(e) => updateField("secondarySports", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Preferred Training Type (optional)</FieldLabel>
              <select
                className={inputCls}
                value={form.preferredTrainingType}
                onChange={(e) => updateField("preferredTrainingType", e.target.value)}
              >
                <option value="">Select (optional)</option>
                {PREFERRED_TRAINING_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

          </div>
        </SectionCard>

      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          type="button"
          onClick={onComplete}
          disabled={saving}
          className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[0_10px_30px_rgba(255,87,34,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Complete Profile
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
