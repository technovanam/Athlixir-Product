import { Header, Footer } from "@/components/layout";

/**
 * Login Page
 */
export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Login</h1>
          <p className="text-white/70 text-center mb-8">
            Sign in to your Athlixir account.
          </p>
          {/* Login form will be added here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
