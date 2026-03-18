"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Search, MapPin, Phone, Star, Globe,
  CheckCircle2, Info, Clock, Users, X, ChevronRight, Award, Dumbbell, ChevronDown, Filter
} from "lucide-react";

const AcademyMap = dynamic(() => import("./AcademyMap"), { ssr: false });

const SPORTS_OPTIONS = ["All", "Football", "Cricket", "Swimming", "Athletics", "Badminton", "Basketball", "Tennis", "Boxing"];

const ACADEMIES = [
  {
    id: 1, name: "Chennai Football Academy", location: "Velachery, Chennai", state: "Tamil Nadu",
    sport: "Football", rating: 4.8, reviews: 124, coaches: 8, students: 280,
    specialty: "Advanced Tactical Training", facilities: ["Turf Ground", "Gym", "Video Analysis Room"],
    timing: "6:00 AM – 8:00 PM", fees: "₹8,000/month", contact: "+91 98765 43210",
    website: "https://example.com", verified: true, emoji: "⚽", coords: [12.9716, 80.2209],
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80",
    description: "One of the top football academies in South India with FIFA-certified coaches and modern training infrastructure."
  },
  {
    id: 2, name: "Aqua Champions Swimming Club", location: "MG Road, Pune", state: "Maharashtra",
    sport: "Swimming", rating: 4.9, reviews: 89, coaches: 5, students: 150,
    specialty: "Olympic Standard Coaching", facilities: ["50m Pool", "Diving Pool", "Strength Lab"],
    timing: "5:00 AM – 9:00 PM", fees: "₹6,500/month", contact: "+91 87654 32109",
    website: "https://example.com", verified: true, emoji: "🏊", coords: [18.5204, 73.8567],
    image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80",
    description: "National-level swimming academy producing state and national champions since 2010."
  },
  {
    id: 3, name: "Bangalore Athletics Centre", location: "Whitefield, Bangalore", state: "Karnataka",
    sport: "Athletics", rating: 4.7, reviews: 210, coaches: 12, students: 340,
    specialty: "Sprint & Biomechanics Training", facilities: ["400m Synthetic Track", "Gym", "Physio Centre"],
    timing: "5:30 AM – 7:30 PM", fees: "₹5,000/month", contact: "+91 76543 21098",
    website: "https://example.com", verified: true, emoji: "🏃", coords: [12.9698, 77.7499],
    image: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=800&q=80",
    description: "Premier athletics training centre with SAI-affiliated coaches and international-standard track facilities."
  },
  {
    id: 4, name: "MCA Cricket Academy", location: "Wankhede, Mumbai", state: "Maharashtra",
    sport: "Cricket", rating: 4.9, reviews: 315, coaches: 15, students: 420,
    specialty: "Batting & Pace Bowling", facilities: ["Indoor Nets", "Bowling Machine", "Match Simulator"],
    timing: "6:00 AM – 6:00 PM", fees: "₹12,000/month", contact: "+91 65432 10987",
    website: "https://example.com", verified: true, emoji: "🏏", coords: [18.9388, 72.8258],
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    description: "One of Mumbai's most prestigious cricket academies with BCCI-certified coaching staff and world-class net facilities."
  },
  {
    id: 5, name: "Coimbatore Badminton Hub", location: "RS Puram, Coimbatore", state: "Tamil Nadu",
    sport: "Badminton", rating: 4.6, reviews: 98, coaches: 6, students: 190,
    specialty: "Singles & Doubles Strategy", facilities: ["6 Indoor Courts", "Fitness Centre", "Recovery Room"],
    timing: "5:00 AM – 9:00 PM", fees: "₹4,500/month", contact: "+91 54321 09876",
    website: "https://example.com", verified: true, emoji: "🏸", coords: [11.0168, 76.9558],
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description: "Ranked among top 10 badminton academies in Tamil Nadu. Known for producing district and state level players."
  },
  {
    id: 6, name: "Delhi Basketball School", location: "Dwarka, New Delhi", state: "Delhi",
    sport: "Basketball", rating: 4.5, reviews: 67, coaches: 4, students: 120,
    specialty: "Youth Development Program", facilities: ["Indoor Court", "Outdoor Court", "Gym"],
    timing: "6:00 AM – 8:00 PM", fees: "₹7,000/month", contact: "+91 43210 98765",
    website: "https://example.com", verified: false, emoji: "🏀", coords: [28.5921, 77.0460],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    description: "Fast-growing basketball academy with focus on fundamentals, agility training, and competitive match exposure."
  },
  {
    id: 7, name: "Hyderabad Tennis Academy", location: "Hitec City, Hyderabad", state: "Telangana",
    sport: "Tennis", rating: 4.7, reviews: 143, coaches: 7, students: 200,
    specialty: "Clay & Hard Court Training", facilities: ["4 Clay Courts", "2 Hard Courts", "Pro Shop"],
    timing: "5:30 AM – 8:30 PM", fees: "₹10,000/month", contact: "+91 32109 87654",
    website: "https://example.com", verified: true, emoji: "🎾", coords: [17.4435, 78.3772],
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
    description: "AITA-recognized tennis academy with professional clay and hard court surfaces and experienced coaches."
  },
  {
    id: 8, name: "Champions Boxing Gym", location: "T. Nagar, Chennai", state: "Tamil Nadu",
    sport: "Boxing", rating: 4.4, reviews: 56, coaches: 3, students: 85,
    specialty: "Amateur & Competitive Boxing", facilities: ["Boxing Ring", "Heavy Bags", "Speed Bags", "Cardio Zone"],
    timing: "6:00 AM – 9:00 PM", fees: "₹3,500/month", contact: "+91 21098 76543",
    website: "https://example.com", verified: true, emoji: "🥊", coords: [13.0418, 80.2341],
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
    description: "Well-known boxing gym with national-level trainers, producing multiple state boxing champions."
  },
];

const EVENTS = [
  { id: 1, name: "Chennai Super League Football", sport: "Football", location: "Nehru Stadium, Chennai", date: "Jan 18, 2026", type: "Tournament", color: "#FF5722", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=200&q=80" },
  { id: 2, name: "Mumbai Swimming Championship", sport: "Swimming", location: "Shivaji Park Pool, Mumbai", date: "Feb 2, 2026", type: "Championship", color: "#3B82F6", image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=200&q=80" },
  { id: 3, name: "Bangalore Athletics Open", sport: "Athletics", location: "Kanteerava Stadium, Bangalore", date: "Feb 14, 2026", type: "Open Meet", color: "#F59E0B", image: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=200&q=80" },
  { id: 4, name: "All India Cricket U-19 Cup", sport: "Cricket", location: "Wankhede Stadium, Mumbai", date: "Mar 1, 2026", type: "Cup", color: "#22C55E", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=200&q=80" },
  { id: 5, name: "South India Badminton Open", sport: "Badminton", location: "Jawaharlal Nehru Indoor, Chennai", date: "Mar 10, 2026", type: "Open", color: "#A855F7", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=200&q=80" },
  { id: 6, name: "Delhi Basketball League", sport: "Basketball", location: "Thyagaraj Sports Complex, Delhi", date: "Mar 22, 2026", type: "League", color: "#14B8A6", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=200&q=80" },
];

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";

const SPORT_EMOJIS = { All: "🏅", Football: "⚽", Cricket: "🏏", Swimming: "🏊", Athletics: "🏃", Badminton: "🏸", Basketball: "🏀", Tennis: "🎾", Boxing: "🥊" };

function SportDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
          open ? "bg-primary/10 border-primary/50 text-white" : "bg-white/[0.06] border-white/[0.08] text-gray-300 hover:border-white/20 hover:text-white"
        }`}
      >
        <Filter size={14} className={open ? "text-primary" : "text-gray-400"} />
        <span>{SPORT_EMOJIS[value]} {value}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180 text-primary" : "text-gray-400"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/[0.08] bg-[#161616] shadow-lg z-50 overflow-hidden py-1"
          >
            {SPORTS_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { onChange(s); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  value === s
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="text-base">{SPORT_EMOJIS[s]}</span>
                {s}
                {value === s && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AcademyModal({ academy, onClose }) {
  if (!academy) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl my-8"
      >
        <div className="h-56 relative overflow-hidden rounded-t-2xl">
          <img src={academy.image} alt={academy.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
          <button type="button" onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/80">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-5 -mt-8 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{academy.name}</h2>
              {academy.verified && <CheckCircle2 size={18} className="text-primary" />}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {academy.location}, {academy.state}
            </p>
          </div>
          <p className="text-sm text-gray-300">{academy.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Rating", value: academy.rating, colored: false },
              { label: "Coaches", value: academy.coaches, colored: false },
              { label: "Students", value: academy.students, colored: false },
              { label: "Fees", value: academy.fees, colored: true },
            ].map(({ label, value, colored }) => (
              <div key={label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
                <p className={`text-lg font-bold ${colored ? "text-primary" : "text-white"}`}>{value}</p>
                <p className="text-[10px] text-gray-500 uppercase">{label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Specialty</p>
            <p className="text-sm text-white/90">{academy.specialty}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Facilities</p>
            <div className="flex flex-wrap gap-2">
              {academy.facilities.map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs text-gray-300 flex items-center gap-1">
                  <Dumbbell size={12} className="text-primary" /> {f}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Timing</p>
              <p className="text-white/90 flex items-center gap-1"><Clock size={14} /> {academy.timing}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Sport</p>
              <p className="text-white/90">{academy.sport}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5 flex items-center justify-center gap-2">
              <Phone size={16} /> Call
            </button>
            <button type="button" className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5 flex items-center justify-center gap-2">
              <Globe size={16} /> Website
            </button>
            <button type="button" className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2">
              Enquire Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AcademyLocatorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [detailId, setDetailId] = useState(null);
  const [eventDetailId, setEventDetailId] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);

  // Events filtered by same sport chip + search query
  const filteredEvents = useMemo(() => {
    return EVENTS.filter((e) => {
      if (sportFilter !== "All" && e.sport !== sportFilter) return false;
      if (searchQuery && !(e.name + " " + e.sport + " " + e.location).toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [sportFilter, searchQuery]);

  // Academies filtered by sport chip + search query
  const filtered = useMemo(() => {
    return ACADEMIES.filter((a) => {
      if (sportFilter !== "All" && a.sport !== sportFilter) return false;
      if (searchQuery && !(a.name + " " + a.location + " " + a.sport + " " + a.state).toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [searchQuery, sportFilter]);

  const detailAcademy = detailId ? ACADEMIES.find((a) => a.id === detailId) : null;

  // When event clicked, find matching academy by sport
  const detailEvent = eventDetailId ? EVENTS.find((e) => e.id === eventDetailId) : null;
  const eventLinkedAcademy = detailEvent ? ACADEMIES.find((a) => a.sport === detailEvent.sport) : null;

  const handleSearchChange = useCallback(async (val) => {
    setSearchQuery(val);
    if (val.length < 3) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      if (data[0]) setSearchLocation([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    } catch (_) {}
  }, []);

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
          <GraduationCap size={28} className="text-primary" />
          Academy Locator
        </h1>
        <p className="text-sm text-gray-500 mt-1">Find verified sports academies and training centres near you</p>
      </header>

      {/* Search & Filters — controls both events panel + academy cards + map */}
      <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search by academy name, city or sport..."
              className={inputClass + " pl-9"}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <SportDropdown value={sportFilter} onChange={setSportFilter} />
        </div>
        <p className="text-xs text-gray-500 mt-3">{filtered.length} academies · {filteredEvents.length} events found</p>
      </section>

      {/* Academy Cards + Map row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — Academy Cards */}
        <div className="lg:col-span-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-500">
              No academies found matching your search. Try a different sport or keyword.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((aca, i) => (
                <motion.div
                  key={aca.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col hover:border-primary/20 transition-all group cursor-pointer"
                  onClick={() => setDetailId(aca.id)}
                >
                  <div className="h-44 relative overflow-hidden">
                    <img src={aca.image} alt={aca.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/90 text-white">{aca.sport}</span>
                      {aca.verified && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-white text-sm">{aca.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {aca.location}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{aca.specialty}</p>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="text-sm font-semibold text-white">{aca.rating}</span>
                        <span className="text-xs text-gray-500">({aca.reviews})</span>
                      </div>
                      <span className="text-xs text-primary font-medium">{aca.fees}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.06] text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users size={12} /> {aca.students} students</span>
                      <span className="flex items-center gap-1"><Award size={12} /> {aca.coaches} coaches</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Map only */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: 320, position: "relative", isolation: "isolate", zIndex: 0 }}>
            <div style={{ width:"100%", height:"100%" }}>
              <AcademyMap academies={filtered} onMarkerClick={(id) => setDetailId(id)} searchLocation={searchLocation} />
            </div>
          </div>
        </div>

      </div>

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0"><Info size={20} /></div>
        <p className="text-xs text-blue-400/80">Can't find your academy? Contact our support team to suggest a listing or register your training centre.</p>
      </div>

      {/* Event click → show matching academy modal */}
      <AnimatePresence>
        {detailEvent && eventLinkedAcademy && (
          <AcademyModal academy={eventLinkedAcademy} onClose={() => setEventDetailId(null)} />
        )}
      </AnimatePresence>

      {/* Academy card / map marker click → show academy modal */}
      <AnimatePresence>
        {detailAcademy && (
          <AcademyModal academy={detailAcademy} onClose={() => setDetailId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
