"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { User, ChevronRight, Loader2 } from "lucide-react";
import { FieldLabel, SectionCard, inputCls, StyledSelect } from "./shared";
import { FormState, BLOOD_GROUPS, INDIAN_STATES } from "./types";

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
              className={`${inputCls} file:mr-3 file:py-1 file:px-3 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30 cursor-pointer`}
            />
          </div>

        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={saving}
          className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-md text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save & Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
