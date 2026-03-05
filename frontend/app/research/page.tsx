import { Header, Footer } from "@/components/layout";

/**
 * Research Page
 */
export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6">Research</h1>
          <p className="text-white/70">
            Explore our cutting-edge research in sports analytics and athlete performance.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
