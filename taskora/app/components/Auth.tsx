import AuthForm from "../components/ui/AuthForm";
import Image from "next/image";
import { ModeToggle } from "./modetoggle";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6  dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 p-10">
          <div>
            <Image src="/logo.png" alt="logo" height={50} width={50} />
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
