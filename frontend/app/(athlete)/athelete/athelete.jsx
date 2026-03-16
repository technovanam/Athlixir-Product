"use client";

import { useState } from "react";
import {
  DollarSign,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Users,
  Target,
  ArrowUpRight,
} from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Sponsorship", "Government Grant", "Private Fund", "Scholarship", "Brand Deal"];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "National Sports Excellence Fund",
    org: "Ministry of Youth Affairs & Sports",
    category: "Government Grant",
    amount: "₹5,00,000",
    deadline: "2026-04-30",
    status: "Open",
    sport: "All Sports",
    level: "National",
    description:
      "A merit-based government grant for grassroots athletes showing exceptional performance at district or state level competitions.",
    tags: ["Merit-based", "Grassroots", "Annual"],
    featured: true,
    logo: "🏛️",
  },
  {
    id: 2,
    title: "Pro Athlete Brand Ambassador",
    org: "Athlixir × NikeX",
    category: "Brand Deal",
    amount: "₹2,40,000 / yr",
    deadline: "2026-03-31",
    status: "Open",
    sport: "Track & Field, Football",
    level: "State+",
    description:
      "Represent our brand at regional and national events. Includes gear sponsorship, social media collaboration, and a performance bonus.",
    tags: ["Gear", "Social Media", "Performance Bonus"],
    featured: true,
    logo: "👟",
  },
  {
    id: 3,
    title: "Women in Sports Scholarship",
    org: "Athlixir Foundation",
    category: "Scholarship",
    amount: "₹1,20,000",
    deadline: "2026-05-15",
    status: "Open",
    sport: "All Sports",
    level: "All Levels",
    description:
      "Full scholarship covering coaching fees and competition expenses for female athletes aged 14–24 from economically weaker sections.",
    tags: ["Women Only", "EWS", "Coaching"],
    featured: false,
    logo: "🎓",
  },
  {
    id: 4,
    title: "Rural Talent Development Grant",
    org: "District Sports Authority",
    category: "Government Grant",
    amount: "₹80,000",
    deadline: "2026-04-10",
    status: "Closing Soon",
    sport: "Wrestling, Kabaddi, Athletics",
    level: "District",
    description:
      "Financial support for rural athletes to access coaching, equipment, and travel to national-level competitions.",
    tags: ["Rural", "Equipment", "Travel"],
    featured: false,
    logo: "🌾",
  },
  {
    id: 5,
    title: "HealthFirst Athlete Sponsorship",
    org: "HealthFirst Pvt Ltd",
    category: "Sponsorship",
    amount: "₹3,60,000 / yr",
    deadline: "2026-06-01",
    status: "Open",
    sport: "Cricket, Badminton, Tennis",
    level: "State+",
    description:
      "Nutrition and wellness brand looking for dedicated athletes for long-term partnership. Includes supplement supply, kit allowance, and travel support.",
    tags: ["Nutrition", "Kit", "Long-term"],
    featured: true,
    logo: "💊",
  },
  {
    id: 6,
    title: "Olympic Dreams Private Fund",
    org: "JSW Sports Foundation",
    category: "Private Fund",
    amount: "Up to ₹20,00,000",
    deadline: "2026-07-15",
    status: "Open",
    sport: "Olympic Sports",
    level: "National",
    description:
      "Comprehensive support package for athletes targeting Olympic and Asian Games qualification, including world-class coaching and international travel.",
    tags: ["Olympic", "Elite", "International"],
    featured: true,
    logo: "🏅",
  },
];

const STATS = [
  { label: "Total Opportunities", value: "124", icon: Target, color: "var(--primary)" },
  { label: "Avg. Grant Value", value: "₹3.2L", icon: TrendingUp, color: "var(--success)" },
  { label: "Applications Open", value: "48", icon: Clock, color: "var(--info)" },
  { label: "Athletes Funded", value: "2,800+", icon: Users, color: "var(--chart-5)" },
];

const STATUS_COLORS = {
  Open: { bg: "var(--success-soft)", text: "var(--success-text)", dot: "var(--success)" },
  "Closing Soon": { bg: "var(--warning-soft)", text: "var(--warning)", dot: "var(--warning)" },
  Closed: { bg: "var(--error-soft)", text: "var(--error-text)", dot: "var(--error)" },
};

const CATEGORY_COLORS = {
  "Government Grant": "var(--info)",
  "Brand Deal": "var(--primary)",
  Scholarship: "var(--chart-5)",
  Sponsorship: "var(--success)",
  "Private Fund": "var(--chart-4)",
  All: "var(--text-muted)",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysLeft(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Expired";
  if (diff === 0) return "Today";
  return `${diff}d left`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ stat }) {
  return (
    <div style={s.statCard}>
      <div
        style={{
          ...s.statIcon,
          background: `color-mix(in srgb, ${stat.color} 14%, transparent)`,
          border: `1px solid color-mix(in srgb, ${stat.color} 28%, transparent)`,
        }}
      >
        <stat.icon size={20} style={{ color: stat.color }} />
      </div>
      <div>
        <p style={s.statValue}>{stat.value}</p>
        <p style={s.statLabel}>{stat.label}</p>
      </div>
    </div>
  );
}

function OpportunityCard({ item, saved, onToggleSave }) {
  const statusStyle = STATUS_COLORS[item.status] || STATUS_COLORS.Open;
  const catColor = CATEGORY_COLORS[item.category] || "var(--primary)";
  const days = daysLeft(item.deadline);

  return (
    <div style={{ ...s.card, border: item.featured ? `1px solid color-mix(in srgb, ${catColor} 35%, transparent)` : "1px solid var(--border-subtle)" }}>
      {/* Glow */}
      <div style={{ ...s.cardGlow, background: catColor }} />

      {/* Top row */}
      <div style={s.cardTop}>
        <div style={s.cardLogoWrap}>
          <span style={{ fontSize: "24px" }}>{item.logo}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={s.cardMeta}>
            <span
              style={{
                ...s.categoryBadge,
                background: `color-mix(in srgb, ${catColor} 14%, transparent)`,
                color: catColor,
                border: `1px solid color-mix(in srgb, ${catColor} 28%, transparent)`,
              }}
            >
              {item.category}
            </span>
            {item.featured && (
              <span style={s.featuredBadge}>
                <Star size={10} style={{ color: "var(--chart-4)" }} /> Featured
              </span>
            )}
          </div>
          <h3 style={s.cardTitle}>{item.title}</h3>
          <p style={s.cardOrg}>{item.org}</p>
        </div>

        {/* Save */}
        <button
          style={s.saveBtn}
          onClick={() => onToggleSave(item.id)}
          title={saved ? "Unsave" : "Save"}
        >
          {saved ? (
            <BookmarkCheck size={18} style={{ color: "var(--primary)" }} />
          ) : (
            <Bookmark size={18} style={{ color: "var(--text-muted)" }} />
          )}
        </button>
      </div>

      {/* Description */}
      <p style={s.cardDesc}>{item.description}</p>

      {/* Tags */}
      <div style={s.tagRow}>
        {item.tags.map((tag) => (
          <span key={tag} style={s.tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div style={s.cardFooter}>
        <div style={s.cardInfoRow}>
          {/* Amount */}
          <div style={s.infoChip}>
            <DollarSign size={13} style={{ color: "var(--success)" }} />
            <span style={{ color: "var(--success)", fontWeight: 700 }}>{item.amount}</span>
          </div>

          {/* Deadline */}
          <div style={s.infoChip}>
            <Clock size={13} style={{ color: "var(--text-muted)" }} />
            <span style={{ color: days === "Expired" ? "var(--error)" : "var(--text-muted)" }}>
              {days}
            </span>
          </div>

          {/* Status */}
          <div
            style={{
              ...s.statusChip,
              background: statusStyle.bg,
              color: statusStyle.text,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "var(--radius-full)",
                background: statusStyle.dot,
                flexShrink: 0,
              }}
            />
            {item.status}
          </div>
        </div>

        {/* Apply button */}
        <button style={s.applyBtn}>
          Apply Now <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Sport & Level chips */}
      <div style={s.sportRow}>
        <span style={s.sportChip}>
          <Globe size={11} style={{ color: "var(--text-muted)" }} /> {item.sport}
        </span>
        <span style={s.sportChip}>
          <Award size={11} style={{ color: "var(--text-muted)" }} /> {item.level}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SponsorshipFundingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState(new Set());
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = OPPORTUNITIES.filter((o) => {
    const matchCat = activeCategory === "All" || o.category === activeCategory;
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.org.toLowerCase().includes(search.toLowerCase()) ||
      o.sport.toLowerCase().includes(search.toLowerCase());
    const matchSaved = showSavedOnly ? saved.has(o.id) : true;
    return matchCat && matchSearch && matchSaved;
  });

  return (
    <div style={s.root}>
      {/* ── Page Header ── */}
      <div style={s.pageHeader}>
        <div>
          <div style={s.headerBadge}>
            <Zap size={13} style={{ color: "var(--primary)" }} />
            <span style={s.headerBadgeText}>Funding Hub</span>
          </div>
          <h1 style={s.pageTitle}>Sponsorship & Funding</h1>
          <p style={s.pageSubtitle}>
            Discover grants, sponsorships, and funding opportunities curated for your sport and level.
          </p>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={s.statsRow}>
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={s.filtersBar}>
        {/* Search */}
        <div style={s.searchWrap}>
          <Search size={16} style={s.searchIcon} />
          <input
            type="text"
            placeholder="Search by title, org, or sport…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
        </div>

        {/* Category pills */}
        <div style={s.categoryPills}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const color = CATEGORY_COLORS[cat] || "var(--text-muted)";
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...s.categoryPill,
                  background: isActive
                    ? `color-mix(in srgb, ${color} 18%, transparent)`
                    : "var(--surface-1)",
                  color: isActive ? color : "var(--text-muted)",
                  border: isActive
                    ? `1px solid color-mix(in srgb, ${color} 38%, transparent)`
                    : "1px solid var(--border-default)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Saved toggle */}
        <button
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          style={{
            ...s.savedToggle,
            background: showSavedOnly ? "var(--primary-soft)" : "var(--surface-1)",
            color: showSavedOnly ? "var(--primary)" : "var(--text-muted)",
            border: showSavedOnly
              ? "1px solid rgba(255,87,34,0.3)"
              : "1px solid var(--border-default)",
          }}
        >
          <BookmarkCheck size={15} />
          Saved ({saved.size})
        </button>
      </div>

      {/* ── Results Info ── */}
      <div style={s.resultsInfo}>
        <span style={s.resultsCount}>
          {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"} found
        </span>
        {activeCategory !== "All" && (
          <button style={s.clearFilter} onClick={() => setActiveCategory("All")}>
            Clear filter ×
          </button>
        )}
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length > 0 ? (
        <div style={s.grid}>
          {filtered.map((item) => (
            <OpportunityCard
              key={item.id}
              item={item}
              saved={saved.has(item.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      ) : (
        <div style={s.emptyState}>
          <AlertCircle size={40} style={{ color: "var(--text-muted)", marginBottom: "var(--space-16)" }} />
          <p style={s.emptyTitle}>No opportunities found</p>
          <p style={s.emptyDesc}>Try adjusting your filters or search term.</p>
          <button
            style={s.resetBtn}
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
              setShowSavedOnly(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Apply CTA Banner ── */}
      <div style={s.ctaBanner}>
        <div style={s.ctaGlow} />
        <div style={s.ctaContent}>
          <CheckCircle2 size={22} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <div>
            <p style={s.ctaTitle}>Can't find the right opportunity?</p>
            <p style={s.ctaDesc}>
              Submit your athlete profile and get personally matched with sponsors, grants, and funding partners.
            </p>
          </div>
        </div>
        <button style={s.ctaBtn}>
          Get Matched <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s = {
  root: {
    color: "var(--text-main)",
    fontFamily: "var(--font-primary)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-32)",
  },

  /* Header */
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "var(--space-16)",
  },

  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-8)",
    background: "var(--primary-soft)",
    border: "1px solid rgba(255,87,34,0.22)",
    borderRadius: "var(--radius-full)",
    padding: "var(--space-4) var(--space-12)",
    marginBottom: "var(--space-12)",
  },

  headerBadgeText: {
    fontSize: "var(--fs-micro)",
    fontWeight: 700,
    color: "var(--primary)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },

  pageTitle: {
    fontSize: "var(--fs-h1)",
    fontWeight: 700,
    letterSpacing: "var(--ls-hero)",
    color: "var(--text-main)",
    textTransform: "uppercase",
    margin: 0,
  },

  pageSubtitle: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
    margin: "var(--space-8) 0 0 0",
    lineHeight: "var(--lh-relaxed)",
    maxWidth: "520px",
  },

  /* Stats */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "var(--space-16)",
  },

  statCard: {
    background: "var(--surface-1)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-20) var(--space-24)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },

  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "var(--radius-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  statValue: {
    fontSize: "var(--fs-h3)",
    fontWeight: 700,
    color: "var(--text-main)",
    margin: 0,
    lineHeight: 1,
  },

  statLabel: {
    fontSize: "var(--fs-micro)",
    color: "var(--text-muted)",
    margin: "var(--space-4) 0 0 0",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },

  /* Filters */
  filtersBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-12)",
    alignItems: "center",
  },

  searchWrap: {
    position: "relative",
    minWidth: "260px",
    flex: "1 1 260px",
    maxWidth: "380px",
  },

  searchIcon: {
    position: "absolute",
    left: "var(--space-16)",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
    pointerEvents: "none",
  },

  searchInput: {
    width: "100%",
    background: "var(--surface-1)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-lg)",
    padding: "10px var(--space-16) 10px 44px",
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-main)",
    fontFamily: "var(--font-primary)",
    outline: "none",
    boxSizing: "border-box",
  },

  categoryPills: {
    display: "flex",
    gap: "var(--space-8)",
    flexWrap: "wrap",
  },

  categoryPill: {
    borderRadius: "var(--radius-full)",
    padding: "var(--space-8) var(--space-16)",
    fontSize: "var(--fs-micro)",
    fontWeight: 700,
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 280ms ease",
    fontFamily: "var(--font-primary)",
  },

  savedToggle: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-8)",
    borderRadius: "var(--radius-full)",
    padding: "var(--space-8) var(--space-16)",
    fontSize: "var(--fs-micro)",
    fontWeight: 700,
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 280ms ease",
    fontFamily: "var(--font-primary)",
  },

  /* Results info */
  resultsInfo: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },

  resultsCount: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
  },

  clearFilter: {
    fontSize: "var(--fs-micro)",
    color: "var(--primary)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-primary)",
    fontWeight: 700,
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    padding: 0,
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "var(--space-24)",
  },

  /* Card */
  card: {
    position: "relative",
    background: "var(--surface-1)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-24)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-16)",
    overflow: "hidden",
    transition: "transform 280ms ease, box-shadow 280ms ease",
  },

  cardGlow: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "120px",
    height: "120px",
    borderRadius: "var(--radius-full)",
    opacity: 0.06,
    filter: "blur(40px)",
    pointerEvents: "none",
  },

  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-16)",
  },

  cardLogoWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-lg)",
    background: "var(--surface-2)",
    border: "1px solid var(--border-default)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "22px",
  },

  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-8)",
    marginBottom: "var(--space-4)",
    flexWrap: "wrap",
  },

  categoryBadge: {
    fontSize: "var(--fs-legal)",
    fontWeight: 700,
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    padding: "2px 10px",
    borderRadius: "var(--radius-full)",
  },

  featuredBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "var(--fs-legal)",
    fontWeight: 700,
    color: "var(--chart-4)",
    background: "var(--warning-soft)",
    border: "1px solid rgba(245,158,11,0.28)",
    borderRadius: "var(--radius-full)",
    padding: "2px 10px",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },

  cardTitle: {
    fontSize: "var(--fs-h5)",
    fontWeight: 700,
    color: "var(--text-main)",
    margin: 0,
    lineHeight: "var(--lh-snug)",
  },

  cardOrg: {
    fontSize: "var(--fs-micro)",
    color: "var(--text-muted)",
    margin: "var(--space-4) 0 0 0",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },

  saveBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "var(--space-4)",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },

  cardDesc: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-secondary)",
    margin: 0,
    lineHeight: "var(--lh-body)",
  },

  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-8)",
  },

  tag: {
    fontSize: "var(--fs-legal)",
    color: "var(--text-muted)",
    background: "var(--surface-2)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-full)",
    padding: "2px 10px",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    fontWeight: 600,
  },

  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "var(--space-12)",
    paddingTop: "var(--space-16)",
    borderTop: "1px solid var(--border-subtle)",
  },

  cardInfoRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    flexWrap: "wrap",
  },

  infoChip: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-4)",
    fontSize: "var(--fs-body-sm)",
    fontWeight: 600,
  },

  statusChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-8)",
    borderRadius: "var(--radius-full)",
    padding: "3px 10px",
    fontSize: "var(--fs-legal)",
    fontWeight: 700,
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },

  applyBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-8)",
    background: "var(--primary)",
    color: "var(--text-inverse)",
    border: "none",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-8) var(--space-20)",
    fontSize: "var(--fs-body-sm)",
    fontWeight: 700,
    letterSpacing: "var(--ls-button)",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-primary)",
    boxShadow: "0 4px 14px rgba(255,87,34,0.3)",
    transition: "all 280ms ease",
  },

  sportRow: {
    display: "flex",
    gap: "var(--space-8)",
    flexWrap: "wrap",
  },

  sportChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-4)",
    fontSize: "var(--fs-legal)",
    color: "var(--text-muted)",
  },

  /* Empty state */
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-80) var(--space-24)",
    background: "var(--surface-1)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-xl)",
    textAlign: "center",
  },

  emptyTitle: {
    fontSize: "var(--fs-h4)",
    fontWeight: 700,
    color: "var(--text-main)",
    margin: 0,
  },

  emptyDesc: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
    margin: "var(--space-8) 0 var(--space-24) 0",
  },

  resetBtn: {
    background: "var(--surface-2)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-12) var(--space-24)",
    fontSize: "var(--fs-body-sm)",
    fontWeight: 700,
    color: "var(--text-main)",
    cursor: "pointer",
    fontFamily: "var(--font-primary)",
    letterSpacing: "var(--ls-button)",
    textTransform: "uppercase",
  },

  /* CTA Banner */
  ctaBanner: {
    position: "relative",
    background: "var(--surface-1)",
    border: "1px solid rgba(255,87,34,0.22)",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-32)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-24)",
    flexWrap: "wrap",
    overflow: "hidden",
  },

  ctaGlow: {
    position: "absolute",
    left: "-60px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "200px",
    height: "200px",
    background: "var(--primary)",
    borderRadius: "var(--radius-full)",
    opacity: 0.06,
    filter: "blur(60px)",
    pointerEvents: "none",
  },

  ctaContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-16)",
    flex: 1,
  },

  ctaTitle: {
    fontSize: "var(--fs-h5)",
    fontWeight: 700,
    color: "var(--text-main)",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "var(--ls-heading)",
  },

  ctaDesc: {
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-muted)",
    margin: "var(--space-8) 0 0 0",
    lineHeight: "var(--lh-relaxed)",
    maxWidth: "480px",
  },

  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-8)",
    background: "var(--primary)",
    color: "var(--text-inverse)",
    border: "none",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-16) var(--space-32)",
    fontSize: "var(--fs-body-sm)",
    fontWeight: 700,
    letterSpacing: "var(--ls-button)",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "var(--font-primary)",
    boxShadow: "0 4px 20px rgba(255,87,34,0.35)",
    flexShrink: 0,
  },
};
