import { useState } from "react";
import { Mail } from "lucide-react";

const forget = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mode, setMode] = useState<"forget" | "login">("forget");

  return (
    <>
      {/* FORGET PASSWORD */}
      {mode === "forget" && (
        <form className="space-y-4">
          <input placeholder="Enter your email" type="email">
            hiii
          </input>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold"
          >
            Send Reset Link
          </button>

          <div
            onClick={() => setMode("login")}
            className="text-center text-sm text-blue-500 cursor-pointer"
          >
            Back to Login
          </div>
        </form>
      )}
    </>
  );
};

export default forget;
