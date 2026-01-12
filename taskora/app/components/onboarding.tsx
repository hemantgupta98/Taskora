import Image from "next/image";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full text-center">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <Image
            src="/onboarding-illustration.png"
            alt="Taskora onboarding illustration"
            width={320}
            height={220}
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Welcome to Taskora! Let&apos;s Get Started.
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
          Taskora helps you manage projects and collaborate with your team
          effectively. Create your first project or import existing data to
          kickstart your journey.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">
            Create Your First Project
          </button>
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
            Import Sample Data
          </button>
        </div>

        {/* Secondary Links */}
        <div className="text-sm text-gray-500 space-y-3">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
          <Link
            href="/dashboard"
            className="block text-blue-600 hover:underline"
          >
            Continue to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
