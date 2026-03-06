export default function DashboardPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--color-background)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--fs-hero-l)",
          fontWeight: "var(--fw-bold)",
          color: "var(--color-text-primary)",
        }}
      >
        Dashboard Page
      </h1>
    </div>
  );
}
