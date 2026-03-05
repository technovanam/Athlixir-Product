import { Header, Footer } from "@/components/layout";

/**
 * About Page
 */
export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
          <p className="text-white/70">
            Learn more about Athlixir and our mission to empower athletes.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
