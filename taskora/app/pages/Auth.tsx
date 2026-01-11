import AuthForm from "../components/ui/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-10">
          <img src="/network.png" alt="Illustration" className="max-w-sm" />
        </div>

        {/* Right Auth Form */}
        <AuthForm />
      </div>
    </div>
  );
}
