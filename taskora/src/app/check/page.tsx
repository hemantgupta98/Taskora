/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "../..//components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../..//components/ui/select";
import { api } from "../../lib/socket"; // axios instance

type PlanStatus = "todo" | "progress" | "done";

interface Plan {
  _id: string;
  name: string;
  work: string;
  startDate: number;
  dueDate: number;
  status: PlanStatus;
}

type Mode = "createplans" | "viewplans" | "backlogplans";

export default function PlansPage() {
  const [mode, setMode] = useState<Mode>("viewplans");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // FETCH PLANS (MODE BASED)
  // -----------------------------
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res =
          mode === "backlogplans"
            ? await api.get("/plans/backlog")
            : await api.get("/plans");

        setPlans(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch plans");
      } finally {
        setLoading(false);
      }
    };

    if (mode !== "createplans") {
      fetchPlans();
    }
  }, [mode]);

  // -----------------------------
  // STATUS UPDATE HANDLER
  // -----------------------------
  const updateStatus = async (plan: Plan, value: PlanStatus) => {
    const today = new Date();
    const due = new Date(plan.dueDate);
    const diffDays = Math.floor(
      (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (value === "done" && diffDays > 1) {
      toast.error("This plan is overdue. You cannot mark it as done.");
      return;
    }

    try {
      await api.patch(`/plans/update-status/${plan._id}`, {
        status: value,
      });

      setPlans((prev) =>
        prev.map((p) => (p._id === plan._id ? { ...p, status: value } : p)),
      );

      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex gap-3">
        <Button
          variant={mode === "viewplans" ? "default" : "outline"}
          onClick={() => setMode("viewplans")}
        >
          View Plans
        </Button>
        <Button
          variant={mode === "backlogplans" ? "default" : "outline"}
          onClick={() => setMode("backlogplans")}
        >
          Backlog
        </Button>
        <Button
          variant={mode === "createplans" ? "default" : "outline"}
          onClick={() => setMode("createplans")}
        >
          Create Plan
        </Button>
      </div>

      {/* CONTENT */}
      {loading && <p className="text-muted-foreground">Loading...</p>}

      {/* CREATE PLANS */}
      {mode === "createplans" && (
        <div className="border rounded-lg p-6 text-center">
          <p className="text-muted-foreground">
            👉 Your create plan form goes here
          </p>
        </div>
      )}

      {/* VIEW PLANS */}
      {mode === "viewplans" && (
        <div className="grid md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div key={plan._id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">{plan.name}</h3>
              <p>{plan.work}</p>
              <p>
                <b>Start:</b> {new Date(plan.startDate).toDateString()}
              </p>
              <p>
                <b>Due:</b> {new Date(plan.dueDate).toDateString()}
              </p>

              {/* STATUS DROPDOWN */}
              <Select
                value={plan.status}
                onValueChange={async (value: PlanStatus) => {
                  const today = new Date();
                  const due = new Date(plan.dueDate);
                  const diffDays = Math.floor(
                    (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
                  );

                  if (value === "done" && diffDays > 1) {
                    toast.error(
                      "This plan is overdue. You cannot mark it as done.",
                    );
                    return;
                  }

                  try {
                    await api.patch(`/plans/update-status/${plan._id}`, {
                      status: value,
                    });

                    // ✅ Update UI instantly
                    setPlans((prev) =>
                      prev.map((p) =>
                        p._id === plan._id ? { ...p, status: value } : p,
                      ),
                    );

                    toast.success("Status updated");
                  } catch (err: any) {
                    toast.error(
                      err?.response?.data?.message || "Failed to update status",
                    );
                  }
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      {/* BACKLOG PLANS (READ ONLY) */}
      {mode === "backlogplans" && (
        <div className="grid md:grid-cols-2 gap-4">
          {plans.length === 0 && (
            <p className="text-muted-foreground">🎉 No backlog plans!</p>
          )}

          {plans.map((plan) => (
            <div key={plan._id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-red-500">{plan.name}</h3>
              <p>{plan.work}</p>
              <p>
                <b>Start:</b> {new Date(plan.startDate).toDateString()}
              </p>
              <p>
                <b>Due:</b> {new Date(plan.dueDate).toDateString()}
              </p>
              <p className="text-sm text-muted-foreground">⚠ Overdue Plan</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
