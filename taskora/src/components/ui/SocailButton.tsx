import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SocialButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-50"
    >
      {label === "Google" ? <FcGoogle size={20} /> : <Github size={18} />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
