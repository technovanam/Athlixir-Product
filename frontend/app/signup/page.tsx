import { Header, Footer } from "@/components/layout";

/**
 * Signup Page
 */
export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Get Started</h1>
          <p className="text-white/70 text-center mb-8">
            Create your Athlixir account and start your journey.
          </p>
          {/* Signup form will be added here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
