"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import {
  LayoutDashboard,
  Activity,
  Flame,
  Trophy,
  Briefcase,
  GraduationCap,
  Calendar,
  MessageSquare,
  DollarSign,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Performance Log", href: "/athelete/performance", icon: Activity },
  { name: "Injury & Recovery", href: "/athelete/injury", icon: Flame },
  { name: "Leaderboard", href: "/athelete/leaderboard", icon: Trophy },
  { name: "Opportunities", href: "/athelete/opportunities", icon: Briefcase },
  { name: "Academy Locator", href: "/athelete/academies", icon: GraduationCap },
  { name: "Events", href: "/athelete/events", icon: Calendar },
  { name: "Messages", href: "/athelete/messages", icon: MessageSquare },
  { name: "Sponsorship / Funding", href: "/athelete", icon: DollarSign },
  { name: "Settings", href: "/athelete/settings", icon: Settings },
];

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div style={st.root}>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={styles.sidebar}
        style={{
          ...st.sidebar,
          width: sidebarOpen ? "var(--sidebar-width)" : "72px",
        }}
      >
        {/* Collapse Toggle */}
        <button
          className={styles.collapseBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={st.collapseBtn}
          title={sidebarOpen ? "Collapse" : "Expand"}
        >
          <ChevronRight
            size={14}
            style={{
              color: "var(--text-inverse)",
              transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform var(--transition-base)",
            }}
          />
        </button>

        {/* Logo */}
        <div style={st.logoArea}>
          <div style={st.logoBadge}>
            <span style={st.logoLetter}>A</span>
          </div>
          {sidebarOpen && <span style={st.brandName}>Athlixir</span>}
        </div>

        {/* Nav */}
        <nav style={st.nav} className={styles.nav}>
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={styles.navLink}
                title={!sidebarOpen ? link.name : ""}
                style={{
                  ...st.navLink,
                  background: isActive ? "var(--primary)" : "transparent",
                  color: isActive ? "var(--text-main)" : "var(--text-muted)",
                  boxShadow: isActive
                    ? "0 4px 20px rgba(255,87,34,0.25)"
                    : "none",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                }}
              >
                <link.icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && (
                  <span style={st.navLinkText}>{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Wrapper ── */}
      <div style={st.mainWrapper}>
        {/* Top Navbar */}
        <header style={st.topbar}>
          <div style={st.topbarLeft}>
            {/* Hamburger — hidden on lg by CSS module */}
            <button
              className={styles.mobileMenuBtn}
              style={st.iconBtn}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Search — visible md+ via CSS module */}
            <div className={styles.searchWrap}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "var(--space-16)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search Ecosystem..."
                className={styles.searchInput}
                style={st.searchInput}
              />
            </div>
          </div>

          <div style={st.topbarRight}>
            {/* Bell */}
            <button className={styles.bellBtn} style={st.iconBtn}>
              <Bell size={18} />
              <span style={st.bellDot} />
            </button>

            {/* Avatar */}
            <div style={st.avatarWrap}>
              <div style={st.avatarInfo}>
                <p style={st.avatarName}>Athlete</p>
                <div style={st.avatarMeta}>
                  <CheckCircle2 size={10} style={{ color: "var(--primary)" }} />
                  <span style={st.avatarRole}>My Profile</span>
                </div>
              </div>
              <div style={st.avatarRing}>
                <div style={st.avatarInner}>A</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className={styles.content}
          style={st.content}
        >
          {children}
        </main>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div style={st.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <aside
            style={st.mobileSidebar}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={st.mobileHeader}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "var(--space-12)" }}
              >
                <div style={st.logoBadge}>
                  <span style={st.logoLetter}>A</span>
                </div>
                <span style={st.brandName}>Athlixir</span>
              </div>
              <button style={st.iconBtn} onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <nav style={{ ...st.nav, padding: 0, gap: "var(--space-4)" }}>
              {SIDEBAR_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      ...st.navLink,
                      background: isActive ? "var(--primary)" : "transparent",
                      color: isActive ? "var(--text-main)" : "var(--text-muted)",
                    }}
                  >
                    <link.icon size={20} style={{ flexShrink: 0 }} />
                    <span style={st.navLinkText}>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}

const st: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--background)",
    color: "var(--text-main)",
    fontFamily: "var(--font-primary)",
  },
  sidebar: {
    flexDirection: "column",
    background: "rgba(15,15,15,0.65)",
    borderRight: "1px solid var(--border-subtle)",
    position: "sticky",
    top: 0,
    height: "100vh",
    transition: "width var(--transition-toggle)",
    backdropFilter: "blur(16px)",
    flexShrink: 0,
    zIndex: 40,
    overflowY: "auto",
  },
  collapseBtn: {
    position: "absolute",
    top: "var(--space-32)",
    right: "-12px",
    zIndex: 50,
    width: "24px",
    height: "24px",
    background: "var(--primary)",
    borderRadius: "var(--radius-full)",
    border: "2px solid var(--background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 0 14px rgba(255,87,34,0.45)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    padding: "var(--space-24) var(--space-20)",
    borderBottom: "1px solid var(--border-subtle)",
    overflow: "hidden",
  },
  logoBadge: {
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-md)",
    background: "var(--primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 0 16px rgba(255,87,34,0.35)",
  },
  logoLetter: {
    fontWeight: "bold",
    fontSize: "var(--fs-h5)",
    color: "var(--text-inverse)",
  },
  brandName: {
    fontWeight: "bold",
    fontSize: "var(--fs-h6)",
    color: "var(--text-main)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  nav: {
    flex: 1,
    padding: "var(--space-16) var(--space-12)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-4)",
    overflowY: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    padding: "var(--space-12) var(--space-16)",
    borderRadius: "var(--radius-lg)",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: "all var(--transition-fast)",
    textDecoration: "none",
  },
  navLinkText: {
    fontSize: "var(--fs-body-sm)",
    fontWeight: "600",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mainWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: "100vh",
  },
  topbar: {
    height: "var(--navbar-height)",
    background: "rgba(10,10,10,0.6)",
    borderBottom: "1px solid var(--border-subtle)",
    backdropFilter: "blur(16px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 var(--space-24)",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    zIndex: 30,
  },
  topbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-16)",
  },
  iconBtn: {
    background: "var(--surface-1)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-md)",
    padding: "var(--space-8)",
    color: "var(--text-muted)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "all var(--transition-fast)",
  },
  searchInput: {
    background: "var(--surface-1)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-lg)",
    padding: "10px var(--space-24) 10px 44px",
    width: "280px",
    fontSize: "var(--fs-body-sm)",
    color: "var(--text-main)",
    fontFamily: "var(--font-primary)",
  },
  bellDot: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "7px",
    height: "7px",
    background: "var(--primary)",
    borderRadius: "var(--radius-full)",
    border: "2px solid var(--background)",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-12)",
    paddingLeft: "var(--space-16)",
    borderLeft: "1px solid var(--border-default)",
    cursor: "pointer",
  },
  avatarInfo: {
    textAlign: "right",
  },
  avatarName: {
    fontSize: "var(--fs-body-sm)",
    fontWeight: "700",
    color: "var(--text-main)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: 1,
  },
  avatarMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "var(--space-4)",
    marginTop: "4px",
  },
  avatarRole: {
    fontSize: "var(--fs-legal)",
    fontWeight: "700",
    color: "var(--text-muted)",
    letterSpacing: "var(--ls-caps)",
    textTransform: "uppercase",
  },
  avatarRing: {
    width: "38px",
    height: "38px",
    borderRadius: "var(--radius-md)",
    background: "linear-gradient(135deg, var(--primary), #FF8A50)",
    padding: "1.5px",
    flexShrink: 0,
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    borderRadius: "var(--radius-md)",
    background: "var(--surface-2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "var(--fs-body-sm)",
    color: "var(--primary)",
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    padding: "var(--space-40) var(--space-32)",
    overflow: "auto",
  },
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background: "var(--overlay)",
    backdropFilter: "blur(4px)",
    display: "flex",
  },
  mobileSidebar: {
    width: "280px",
    background: "var(--surface-1)",
    borderRight: "1px solid var(--border-default)",
    display: "flex",
    flexDirection: "column",
    padding: "var(--space-24)",
    height: "100%",
    overflowY: "auto",
  },
  mobileHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "var(--space-32)",
  },
};
