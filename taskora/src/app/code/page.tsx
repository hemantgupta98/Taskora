"use client";

import { useState, useEffect } from "react";
import Github from "../../components/layout/github";
import { toast, Toaster } from "sonner";

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

export default function ContactsTable() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "https://taskora-88w5.onrender.com";

  const loginWithGithub = () => {
    const oauthUrl = `${API_URL}/api/github/login`;
    const popup = window.open(oauthUrl, "github_oauth", "width=600,height=700");

    if (!popup) {
      window.location.href = oauthUrl;
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/github/repos`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setRepos(data.repos || []);
          setGithubConnected(true);
          setLoading(false);
          clearInterval(interval);
          try {
            popup.close();
          } catch (e) {
            console.log(e);
          }
        }
      } catch (err) {
        console.log(err);
        return toast.error("error");
      }

      if (popup.closed) {
        clearInterval(interval);
      }
    }, 1500);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/github/repos`, {
          credentials: "include",
        });

        if (res.status === 401) {
          // Not connected
          setGithubConnected(false);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setRepos(data.repos);
        setGithubConnected(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [API_URL]);

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-5">
        {!githubConnected && !loading && (
          <button
            onClick={loginWithGithub}
            className="mb-4 flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            <Github
              open={false}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            Connect GitHub
          </button>
        )}
        <Toaster position="top-center" richColors />

        {loading && <p>Loading GitHub data...</p>}
        {githubConnected && repos.length === 0 && (
          <p className="text-gray-500">No repositories found</p>
        )}

        {githubConnected && (
          <div className="grid gap-4 mb-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="rounded-md border p-4 hover:bg-gray-50"
              >
                <h3 className="font-semibold">{repo.name}</h3>
                <p className="text-sm text-gray-600">
                  {repo.description || "No description"}
                </p>

                <div className="mt-2 text-sm">
                  ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-sm text-violet-600"
                >
                  Open on GitHub →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
