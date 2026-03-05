import { Header, Footer } from "@/components/layout";

/**
 * Contact Page
 */
export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-white/70">
            Get in touch with our team. We&apos;d love to hear from you.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
