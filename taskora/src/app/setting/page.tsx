"use client";
import SettingsTabs from "../components/SettingTab";
import ProfileForm from "../components/ui/ProfileForm";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <SettingsTabs />

      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
