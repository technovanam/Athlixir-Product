import { Header, Footer } from "@/components/layout";

/**
 * Features Page
 */
export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6">Features</h1>
          <p className="text-white/70">
            Discover the powerful features that make Athlixir the ultimate athlete platform.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
