import AuthForm from "../components/ui/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-pink-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 p-10">
          <img src="/network.png" alt="Illustration" className="max-w-sm" />
        </div>

        {/* Right Auth Form */}
        <AuthForm />
      </div>
    </div>
  );
}
