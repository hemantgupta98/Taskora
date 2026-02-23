"use client";

import { Briefcase, User } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { api } from "../../lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type ProfileForm = {
  name: string;
  email: string;
  username: string;
  contact: string;
  address: string;
  bio: string;
};

const initialProfileState: ProfileForm = {
  name: "",
  email: "",
  username: "",
  contact: "",
  address: "",
  bio: "",
};

export default function SettingsTabs() {
  const [mode, setMode] = useState<"Profile" | "Workspace">("Profile");
  const [form, setForm] = useState<ProfileForm>(initialProfileState);
  const [initialForm, setInitialForm] =
    useState<ProfileForm>(initialProfileState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me");
      const profile = {
        name: res.data?.data?.name || "",
        email: res.data?.data?.email || "",
        username: res.data?.data?.username || "",
        contact: res.data?.data?.contact || "",
        address: res.data?.data?.address || "",
        bio: res.data?.data?.bio || "",
      };

      setForm(profile);
      setInitialForm(profile);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChangeField = (field: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setForm(initialForm);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      const payload = {
        username: form.username,
        contact: form.contact,
        address: form.address,
        bio: form.bio,
      };

      const res = await api.patch("/auth/me", payload);
      const updatedProfile = {
        name: res.data?.data?.name || form.name,
        email: res.data?.data?.email || form.email,
        username: res.data?.data?.username || form.username,
        contact: res.data?.data?.contact || form.contact,
        address: res.data?.data?.address || form.address,
        bio: res.data?.data?.bio || form.bio,
      };

      setForm(updatedProfile);
      setInitialForm(updatedProfile);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="flex w-full flex-wrap gap-3 rounded-lg border bg-white p-3 shadow-xl sm:w-fit sm:gap-6 sm:p-4">
        <button
          onClick={() => setMode("Profile")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${
            mode === "Profile" ? "ring-1 ring-blue-400" : "border"
          }`}
        >
          <User className="p-1" />
          Profile
        </button>

        <button
          onClick={() => setMode("Workspace")}
          className={`flex items-center gap-1 rounded-md p-2 shadow-xl ${
            mode === "Workspace" ? "ring-1 ring-blue-400" : "border"
          }`}
        >
          <Briefcase className="p-1" />
          Workspace
        </button>
      </div>

      <div className="m-3 rounded-2xl p-4 shadow-2xl sm:m-5 sm:p-5">
        {mode === "Profile" && (
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Basic information
            </h1>
            <p className="text-sm text-gray-400">
              Manage your personal profile details
            </p>

            {loading ? (
              <p className="pt-8 text-sm text-gray-500">Loading profile...</p>
            ) : (
              <form onSubmit={handleSave}>
                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="text-md font-semibold text-gray-500">
                    Full Name
                    <Input value={form.name} disabled readOnly />
                  </label>

                  <label className="text-md font-semibold text-gray-500">
                    Email
                    <Input value={form.email} type="email" disabled readOnly />
                  </label>

                  <label className="text-md mt-5 font-semibold text-gray-500">
                    User Name
                    <Input
                      value={form.username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeField("username", e.target.value)
                      }
                      placeholder="Enter username"
                    />
                  </label>

                  <label className="text-md mt-5 font-semibold text-gray-500">
                    Phone Number
                    <Input
                      value={form.contact}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeField("contact", e.target.value)
                      }
                      placeholder="Enter phone number"
                    />
                  </label>

                  <label className="text-md font-semibold text-gray-500 md:col-span-2">
                    Address
                    <Input
                      value={form.address}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeField("address", e.target.value)
                      }
                      placeholder="Enter address"
                    />
                  </label>

                  <label className="text-md font-semibold text-gray-500 md:col-span-2">
                    Bio
                    <Input
                      value={form.bio}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeField("bio", e.target.value)
                      }
                      placeholder="Write a short bio"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-10">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-sm bg-gray-300 p-2 font-semibold text-white shadow-xl disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-sm bg-blue-500 p-2 font-semibold text-white shadow-xl disabled:opacity-60 sm:w-40"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {mode === "Workspace" && (
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Workspace Settings
            </h1>

            <div className="my-6 h-px bg-gray-200" />

            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
              <h1 className="text-xl font-semibold text-black">Time zone</h1>

              <Select>
                <SelectTrigger className="w-full md:w-62.5">
                  <SelectValue placeholder="Time Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India – UTC +05:30</SelectItem>
                  <SelectItem value="Singapore">
                    Singapore – UTC +08:00
                  </SelectItem>
                  <SelectItem value="UAE">UAE – UTC +04:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const Input = forwardRef<HTMLInputElement, any>(
  ({ icon, className, ...props }, ref) => (
    <div className="flex items-center gap-3 rounded-lg border px-4 py-3">
      {icon && <span className="text-gray-400">{icon}</span>}
      <input
        ref={ref}
        {...props}
        className={`w-full text-sm outline-none ${className || ""}`}
      />
    </div>
  ),
);

Input.displayName = "Input";
