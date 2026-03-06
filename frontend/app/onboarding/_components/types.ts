// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

export const SPORTS_LIST = [
  "Athletics", "Badminton", "Basketball", "Boxing", "Chess", "Cricket",
  "Cycling", "Football", "Golf", "Gymnastics", "Hockey", "Judo", "Kabaddi",
  "Kho-Kho", "Rowing", "Shooting", "Swimming", "Table Tennis", "Tennis",
  "Volleyball", "Weightlifting", "Wrestling", "Yoga",
] as const;

export const SPORT_CATEGORIES: Record<string, string[]> = {
  Athletics: ["Running", "Hurdles", "Jumping"],
  Swimming: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "Individual Medley"],
  Cricket: ["Batting", "Bowling", "Wicket Keeping", "All-Rounder"],
  Football: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
  Badminton: ["Singles", "Doubles", "Mixed Doubles"],
  Tennis: ["Singles", "Doubles", "Mixed Doubles"],
  Boxing: [
    "Light Flyweight", "Flyweight", "Bantamweight", "Featherweight", "Lightweight",
    "Welterweight", "Middleweight", "Super Middleweight", "Light Heavyweight", "Heavyweight",
  ],
  Wrestling: ["Freestyle", "Greco-Roman"],
  Shooting: ["Rifle", "Pistol", "Shotgun"],
  Cycling: ["Road", "Track", "Mountain Bike", "BMX"],
};

export const SPORTS_REQUIRING_DOMINANT_HAND = [
  "Badminton", "Tennis", "Table Tennis", "Cricket", "Baseball",
  "Boxing", "Fencing", "Golf", "Shooting",
];

export const CURRENT_LEVELS = [
  { value: "school", label: "School Level" },
  { value: "district", label: "District Level" },
  { value: "state", label: "State Level" },
  { value: "national", label: "National Level" },
  { value: "international", label: "International Level" },
  { value: "professional", label: "Professional" },
];

export const PREFERRED_TRAINING_TYPES = [
  "Individual Coaching", "Group Training", "Online Coaching",
  "Academy Training", "Self-Training", "Hybrid",
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const DISABILITY_CATEGORIES = [
  "Visual Impairment", "Hearing Impairment", "Physical Disability",
  "Intellectual Disability", "Other",
];

export const NATIONALITIES = ["India", "Other"];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Chandigarh", "Ladakh", "Jammu & Kashmir", "Puducherry",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function calculateAge(dob: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 ? String(age) : "";
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FormState {
  // Step 1
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  state: string;
  district: string;
  cityTown: string;
  profilePhoto: string;
  height: string;
  weight: string;
  bloodGroup: string;
  // Step 2
  primarySport: string;
  category: string;
  dominantHand: string;
  disabilityStatus: "no" | "yes";
  disabilityCategory: string;
  yearsOfExperience: string;
  currentLevel: string;
  currentAcademy: string;
  currentCoach: string;
  secondarySports: string;
  preferredTrainingType: string;
}

export const INITIAL_FORM: FormState = {
  name: "", dateOfBirth: "", gender: "", nationality: "Indian",
  state: "", district: "", cityTown: "",
  profilePhoto: "", height: "", weight: "", bloodGroup: "",
  primarySport: "Athletics", category: "", dominantHand: "", disabilityStatus: "no",
  disabilityCategory: "", yearsOfExperience: "",
  currentLevel: "", currentAcademy: "", currentCoach: "",
  secondarySports: "", preferredTrainingType: "",
};
