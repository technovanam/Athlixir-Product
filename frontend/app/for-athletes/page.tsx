import { Header, Footer } from "@/components/layout";

/**
 * For Athletes Page
 */
export default function ForAthletesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6">For Athletes</h1>
          <p className="text-white/70">
            Resources and tools designed specifically for athletes to track and improve performance.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
