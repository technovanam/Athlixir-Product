"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ArrowUp,
  ChevronDown,
  ShieldCheck,
  BadgeDollarSign,
  HeartHandshake
} from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Sponsorship", "Government Grant", "Private Fund", "Scholarship", "Brand Deal"];

const OPPORTUNITIES = [
  {
    id: 1,
    title: "Global Sprint Fund",
    org: "Athlixir Global",
    category: "Elite Tier",
    amount: "$25,000 / yr",
    numericAmount: 25000,
    deadline: "2026-10-30",
    status: "Open",
    sport: "Track & Field",
    country: "Global",
    level: "Elite",
    utilization: 65,
    description: "Focusing on short-distance runners with international ranking aspirations. Covers training and travel expenses.",
    tags: ["High Performance", "Elite Tier"],
    featured: true,
    logo: "⚡",
    img: "https://images.unsplash.com/photo-1541534741688-6078c65b5a33?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Aquatic Excellence Grant",
    org: "SwimPro Collective",
    category: "Developmental",
    amount: "$10,000 / yr",
    numericAmount: 10000,
    deadline: "2026-12-31",
    status: "Rolling Basis",
    sport: "Swimming",
    country: "USA",
    level: "Collegiate",
    utilization: 40,
    description: "Supporting collegiate swimmers transitioning to professional circuits. Includes access to state-of-the-art facilities.",
    tags: ["Developmental", "Facility Access"],
    featured: true,
    logo: "🌊",
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Pedal Pro Gear Program",
    org: "CycleForce Gear",
    category: "Equipment Only",
    amount: "Gear + Tech Support",
    numericAmount: 0,
    deadline: "2026-11-15",
    status: "Open",
    sport: "Cycling",
    country: "Global",
    level: "Pro",
    utilization: 22,
    description: "Partnering with leading manufacturers to provide top-tier aerodynamic gear and bike maintenance for road cyclists.",
    tags: ["Equipment", "Technical Support"],
    featured: true,
    logo: "🚲",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  },
];

const STATS = [
  { label: "Sponsorships", value: 142, prefix: "", suffix: "", icon: Award, color: "var(--info)", sub: "FOUND" },
  { label: "Per Athlete", value: 12500, prefix: "$", suffix: "k", icon: TrendingUp, color: "var(--success)", sub: "AVG GRANT" },
  { label: "Applications", value: 28, prefix: "", suffix: "", icon: Clock, color: "var(--info)", sub: "OPEN" },
  { label: "Athletes Found", value: 850, prefix: "", suffix: "+", icon: Users, color: "var(--chart-5)", sub: "IMPACT" },
  { label: "Funding Amount", value: 4200000, prefix: "$", suffix: "M", icon: BadgeDollarSign, color: "#FF5722", sub: "TOTAL" },
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

function AnimatedCounter({ value, duration = 2, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  const format = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
    if (num >= 100000) return (num / 100000).toFixed(1) + "L";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <span>
      {prefix}
      {format(count)}
      {suffix}
    </span>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ stat }) {
  const isOpenApps = stat.sub === "OPEN";
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, boxShadow: isOpenApps ? "0 20px 40px rgba(255,87,34,0.4)" : "0 20px 40px rgba(0,0,0,0.4)" }}
      style={{
        ...s.statCard,
        background: isOpenApps ? "#FF5722" : "rgba(255,255,255,0.03)",
        border: isOpenApps ? "none" : "1px solid rgba(255,255,255,0.08)",
        flex: "0 0 240px",
      }}
    >
      <div style={{ ...s.statIcon, background: isOpenApps ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)" }}>
        <stat.icon size={22} style={{ color: isOpenApps ? "white" : stat.color }} />
      </div>
      <div>
        <div style={{ ...s.statSubLabel, color: isOpenApps ? "rgba(255,255,255,0.8)" : "var(--text-muted)" }}>{stat.sub}</div>
        <h3 style={{ ...s.statValue, color: isOpenApps ? "white" : "white" }}>
          <AnimatedCounter 
            value={stat.value === 4200000 ? 4.2 : stat.value === 12500 ? 12.5 : stat.value} 
            prefix={stat.prefix} 
            suffix={stat.suffix} 
            duration={2.5}
          />
        </h3>
        <p style={{ ...s.statLabel, color: isOpenApps ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>{stat.label}</p>
      </div>
    </motion.div>
  );
}

function OpportunityCard({ item }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      viewport={{ once: true }}
      style={s.card}
    >
      <div style={s.cardImgWrap}>
        <img src={item.img} alt={item.title} style={s.cardImg} />
        <div style={s.cardImgOverlay} />
        <div style={s.cardTypeBadge}>
          {item.category.toUpperCase()}
        </div>
      </div>

      <div style={s.cardBody}>
        <h3 style={s.cardTitle}>{item.title}</h3>
        <p style={s.cardDesc}>{item.description}</p>
        
        <div style={s.cardFooter}>
          <div style={s.cardValueWrap}>
            <span style={s.cardValueLabel}>ANNUAL VALUE</span>
            <span style={s.cardValueLine}>{item.amount}</span>
          </div>
          <div style={s.cardDeadlineWrap}>
            <span style={s.cardDeadlineLabel}>DEADLINE</span>
            <span style={s.cardDeadlineLine}>{item.deadline === "Rolling Basis" ? "Rolling" : "Oct 30"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalScrollWrapper({ children, title, subtitle }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth || 1));
    }
  };

  useEffect(() => {
    checkScroll();
  }, [children]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div style={s.scrollWrapperContainer}>
      {(title || subtitle) && (
        <div style={s.scrollWrapperHeader}>
          <div>
            {title && <h2 style={s.scrollWrapperTitle}>{title}</h2>}
            {subtitle && <p style={s.scrollWrapperSubtitle}>{subtitle}</p>}
          </div>
          <div style={s.scrollControls}>
            <button 
              onClick={() => scroll('left')} 
              disabled={!canScrollLeft}
              style={{ ...s.scrollBtn, opacity: canScrollLeft ? 1 : 0.3 }}
            >
              <ArrowUp size={16} style={{ transform: 'rotate(-90deg)' }} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              disabled={!canScrollRight}
              style={{ ...s.scrollBtn, opacity: canScrollRight ? 1 : 0.3 }}
            >
              <ArrowUp size={16} style={{ transform: 'rotate(90deg)' }} />
            </button>
          </div>
        </div>
      )}
      
      <div 
        ref={scrollRef} 
        onScroll={checkScroll} 
        style={s.scrollContent}
      >
        <div style={s.scrollInner}>
          {children}
        </div>
      </div>

      <div style={s.scrollDots}>
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            style={{
              ...s.scrollDot,
              background: Math.abs(scrollProgress - (i / 2)) < 0.25 ? "#FF5722" : "rgba(255,255,255,0.1)",
              width: Math.abs(scrollProgress - (i / 2)) < 0.25 ? "20px" : "6px",
            }} 
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SponsorshipFundingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={s.root} ref={rootRef}>
      {/* ── Header ── */}
      <div style={s.centeredHeader}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={s.globalHubBadge}
        >
          GLOBAL FUNDING HUB
        </motion.div>
        <h1 style={s.pageTitleCentered}>
          Fueling the Future of <br />
          <span style={{ color: "#FF5722" }}>Performance</span>
        </h1>
      </div>

      {/* ── Split Layout Split Scrolling ── */}
      <div style={s.layoutSplitContent}>
        <div style={s.layoutSplitLeft}>
          <HorizontalScrollWrapper 
            title={<>Global <span style={{ color: "#FF5722" }}>Metrics</span></>}
            subtitle="Real-time performance distribution"
          >
            {STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} />
            ))}
          </HorizontalScrollWrapper>
        </div>

        <div style={s.layoutSplitRight}>
          <HorizontalScrollWrapper 
            title={<>Featured <span style={{ color: "#FF5722" }}>Programs</span></>}
            subtitle="Curated opportunities for you"
          >
            {OPPORTUNITIES.map((item) => (
              <OpportunityCard key={item.id} item={item} />
            ))}
          </HorizontalScrollWrapper>
        </div>
      </div>

      {/* ── The Next Evolution ── */}
      <section style={s.evolutionSection}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={s.evolutionCard}
        >
          <span style={s.evolutionBadge}>STITCH FOR ATHLETICS</span>
          <h2 style={s.evolutionTitle}>
            THE NEXT <span style={{ color: "#FF5722" }}>EVOLUTION</span>
          </h2>
          <p style={s.evolutionDesc}>
            Access global liquidity and institutional-grade sponsorship pipelines 
            directly through our decentralized performative infrastructure. 
            Leveling the playing field for the world's most talented athletes.
          </p>
          <div style={s.evolutionActions}>
            <div style={s.launchPill}>LAUNCHING JAN 1 2027</div>
            <button style={s.earlyAccessBtn}>GET EARLY ACCESS</button>
          </div>
        </motion.div>
      </section>

      {/* ── Support & Impact ── */}
      <section style={s.supportSectionCustom}>
        <div style={s.supportCardCustom}>
          <div style={s.supportLeftCustom}>
            <h2 style={s.supportTitleCustom}>
              Support the <br />
              <span style={{ color: "#FF5722" }}>Journey</span>
            </h2>
            <p style={s.supportTextCustom}>
              Help us bridge the gap between pure talent and peak performance. 
              Our ecosystem transforms contributions into direct athletic impact.
            </p>
          </div>
          <div style={s.supportRightCustom}>
            <div style={s.paymentGridCustom}>
              <div style={s.paymentLogoCustom}>VISA</div>
              <div style={s.paymentLogoCustom}>MC</div>
              <div style={s.paymentLogoCustom}>PAYPAL</div>
              <div style={s.paymentLogoCustom}>USDT</div>
            </div>
          </div>
        </div>

        <div style={s.impactFooterCustom}>
          <span style={s.impactBadgeCustom}>TOTAL IMPACT</span>
          <h2 style={s.impactValueCustom}>5,400+</h2>
          <div style={s.impactUnderline} />
          <p style={s.impactLabelCustom}>Active athletes receiving global support from local contributors.</p>
        </div>
      </section>

      <footer style={s.siteFooter}>
        <h3 style={s.footerLogo}>ATHLIXIR</h3>
        <p style={s.footerCopyright}>© 2024 Athlixir Platform. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, background: "#FF5722" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            style={s.scrollTopBtn}
          >
            <ArrowUp size={20} style={{ color: "white" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s = {
  root: {
    background: "#000000",
    color: "#ffffff",
    fontFamily: "var(--font-primary)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-24)",
    paddingBottom: "var(--space-80)",
    overflowX: "hidden",
    minHeight: "100vh",
  },

  centeredHeader: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-12)",
    marginTop: "var(--space-48)",
    marginBottom: "var(--space-32)",
    maxWidth: "900px",
    margin: "var(--space-48) auto var(--space-32)",
  },

  globalHubBadge: {
    padding: "4px 16px",
    background: "rgba(255, 87, 34, 0.05)",
    border: "1px solid rgba(255, 87, 34, 0.3)",
    color: "#FF5722",
    borderRadius: "var(--radius-full)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  },

  pageTitleCentered: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 850,
    lineHeight: 1.05,
    color: "#ffffff",
    margin: "var(--space-8) 0",
  },

  scrollWrapperContainer: {
    width: "100%",
    marginBottom: "var(--space-32)",
  },

  scrollWrapperHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "var(--space-16)",
  },

  scrollWrapperTitle: {
    fontSize: "var(--fs-sm)",
    fontWeight: 800,
    color: "#ffffff",
    margin: 0,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  scrollWrapperSubtitle: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: "2px",
  },

  scrollControls: {
    display: "flex",
    gap: "var(--space-8)",
  },

  scrollBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "var(--radius-sm)",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  scrollContent: {
    width: "100%",
    overflowX: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    paddingBottom: "var(--space-12)",
    display: "block",
  },

  scrollInner: {
    display: "flex",
    gap: "var(--space-12)",
    minWidth: "max-content",
  },

  scrollDots: {
    display: "flex",
    gap: "4px",
    marginTop: "var(--space-8)",
  },

  scrollDot: {
    height: "2px",
    borderRadius: "var(--radius-full)",
    transition: "all 0.3s ease",
  },

  layoutSplitContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--space-24)",
    padding: "0 var(--space-24)",
    marginBottom: "var(--space-64)",
    width: "100%",
    boxSizing: "border-box",
  },

  layoutSplitLeft: {
    width: "100%",
    minWidth: 0, // Critical for horizontal scroll in grid
  },

  layoutSplitRight: {
    width: "100%",
    minWidth: 0, // Critical for horizontal scroll in grid
  },

  statCard: {
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-16) var(--space-20)",
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
    transition: "all 0.3s ease",
    cursor: "default",
  },

  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "var(--radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statSubLabel: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "2px",
  },

  statValue: {
    fontSize: "var(--fs-h3)",
    fontWeight: 800,
    margin: 0,
    lineHeight: 1,
  },

  statLabel: {
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginTop: "2px",
  },

  card: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },

  cardImgWrap: {
    position: "relative",
    height: "180px",
    overflow: "hidden",
  },

  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(1) brightness(0.8)",
    transition: "all 0.5s ease",
  },

  cardImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent, #000000)",
  },

  cardTypeBadge: {
    position: "absolute",
    top: "var(--space-16)",
    left: "var(--space-16)",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    color: "#ffffff",
    fontSize: "8px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "var(--radius-sm)",
    letterSpacing: "0.5px",
  },

  cardBody: {
    padding: "var(--space-20)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-12)",
  },

  cardTitle: {
    fontSize: "var(--fs-body)",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
  },

  cardDesc: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.4,
    height: "4.2em",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "var(--space-8)",
  },

  cardValueWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },

  cardValueLabel: {
    fontSize: "7px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.5px",
  },

  cardValueLine: {
    fontSize: "var(--fs-sm)",
    fontWeight: 800,
    color: "#FF5722",
  },

  cardDeadlineWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    textAlign: "right",
  },

  cardDeadlineLabel: {
    fontSize: "7px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.5px",
  },

  cardDeadlineLine: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#ffffff",
  },

  evolutionSection: {
    padding: "0 var(--space-24)",
    marginBottom: "var(--space-80)",
  },

  evolutionCard: {
    background: "#ffffff",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-64)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-24)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
  },

  evolutionBadge: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#000000",
    letterSpacing: "2px",
    background: "rgba(0,0,0,0.05)",
    padding: "6px 16px",
    borderRadius: "var(--radius-full)",
  },

  evolutionTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 900,
    color: "#000000",
    lineHeight: 1,
    margin: 0,
  },

  evolutionDesc: {
    fontSize: "var(--fs-body)",
    color: "rgba(0,0,0,0.5)",
    lineHeight: 1.6,
    maxWidth: "600px",
  },

  evolutionActions: {
    display: "flex",
    gap: "var(--space-16)",
    marginTop: "var(--space-12)",
    alignItems: "center",
  },

  launchPill: {
    padding: "10px 24px",
    border: "1px solid #FF5722",
    color: "#FF5722",
    fontSize: "var(--fs-xs)",
    fontWeight: 800,
    borderRadius: "var(--radius-full)",
  },

  earlyAccessBtn: {
    padding: "12px 32px",
    background: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--fs-sm)",
    fontWeight: 800,
    cursor: "pointer",
  },

  supportSectionCustom: {
    padding: "0 var(--space-24)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-80)",
  },

  supportCardCustom: {
    background: "#121212",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-64)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.05)",
  },

  supportLeftCustom: {
    flex: 1,
  },

  supportTitleCustom: {
    fontSize: "var(--fs-h2)",
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1.1,
  },

  supportTextCustom: {
    fontSize: "var(--fs-body)",
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.6,
    maxWidth: "400px",
    marginTop: "var(--space-16)",
  },

  supportRightCustom: {
    flex: 0.8,
  },

  paymentGridCustom: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "var(--space-20)",
  },

  paymentLogoCustom: {
    background: "rgba(255,255,255,0.03)",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 800,
    color: "rgba(255,255,255,0.1)",
    borderRadius: "var(--radius-lg)",
    letterSpacing: "2px",
  },

  impactFooterCustom: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--space-20)",
    paddingBottom: "var(--space-80)",
  },

  impactBadgeCustom: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#FF5722",
    letterSpacing: "2px",
  },

  impactValueCustom: {
    fontSize: "clamp(3rem, 12vw, 8rem)",
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 0.8,
  },

  impactUnderline: {
    width: "120px",
    height: "8px",
    background: "#FF5722",
    borderRadius: "var(--radius-full)",
    marginTop: "-10px",
  },

  impactLabelCustom: {
    fontSize: "var(--fs-body-sm)",
    color: "rgba(255,255,255,0.4)",
    maxWidth: "340px",
    lineHeight: 1.5,
  },

  siteFooter: {
    padding: "var(--space-48) 0",
    textAlign: "center",
    borderTop: "1px solid var(--border-subtle)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "var(--space-80)",
  },

  footerLogo: {
    fontSize: "var(--fs-h4)",
    fontWeight: 900,
    letterSpacing: "4px",
    color: "var(--text-main)",
  },

  footerCopyright: {
    fontSize: "12px",
    color: "var(--text-muted)",
  },

  scrollTopBtn: {
    position: "fixed",
    bottom: "var(--space-32)",
    right: "var(--space-32)",
    width: "48px",
    height: "48px",
    borderRadius: "var(--radius-full)",
    background: "#FF5722",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(255,87,34,0.3)",
    zIndex: 100,
  },
};
