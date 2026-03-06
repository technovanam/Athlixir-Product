"use client";

import { motion } from "framer-motion";
import { Ruler, Award, Target, ChevronLeft, ChevronRight, Loader2, Star } from "lucide-react";
import { FieldLabel, SectionCard, inputCls, StyledSelect } from "./shared";
import { FormState, CURRENT_LEVELS, PREFERRED_TRAINING_TYPES, DISABILITY_CATEGORIES, SPORT_CATEGORIES, SPORTS_LIST } from "./types";

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

        {/* Specialization */}
        <SectionCard icon={<Star size={18} className="text-orange-500" />} title="Specialization">
          <p className="text-gray-500 text-xs mb-3">Defines the athlete&apos;s specialization.</p>
          <div className="grid gap-4">

            <div>
              <FieldLabel>Primary Sport</FieldLabel>
              <StyledSelect
                value={form.primarySport}
                onChange={(e) => updateField("primarySport", e.target.value)}
              >
                <option value="">Select sport</option>
                {SPORTS_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </StyledSelect>
            </div>

            <div>
              <FieldLabel>Category</FieldLabel>
              <StyledSelect
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                disabled={!form.primarySport}
              >
                <option value="">Select category</option>
                {(SPORT_CATEGORIES[form.primarySport] ?? []).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </StyledSelect>
            </div>

            <div>
              <FieldLabel>Athlete Level</FieldLabel>
              <StyledSelect
                value={form.currentLevel}
                onChange={(e) => updateField("currentLevel", e.target.value)}
              >
                <option value="">Select level</option>
                {CURRENT_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </StyledSelect>
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
              <StyledSelect
                value={form.currentLevel}
                onChange={(e) => updateField("currentLevel", e.target.value)}
              >
                <option value="">Select</option>
                {CURRENT_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </StyledSelect>
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
              <StyledSelect
                value={form.preferredTrainingType}
                onChange={(e) => updateField("preferredTrainingType", e.target.value)}
              >
                <option value="">Select (optional)</option>
                {PREFERRED_TRAINING_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </StyledSelect>
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
