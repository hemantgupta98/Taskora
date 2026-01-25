import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SocialButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50">
      {label === "Google" ? <FcGoogle size={20} /> : <Github size={18} />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
