import StatCard from "../../components/layout/Startcard";
import BarChart from "../../components/layout/barchart";
import DonutChart from "../../components/layout/donutchart";
import SectionCard from "../../components/layout/sectioncard";
import { api } from "../../lib/socket";

export default function DashboardPage() {
  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-6">
        Kanban Project Management Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Project"
          actual="50"
          planned="85"
          percent={78}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          actual="£150,000"
          planned="£200,000"
          percent={75}
          color="blue"
        />
        <StatCard
          title="Total Cost"
          actual="£40,000"
          planned="£170,000"
          percent={41}
          color="yellow"
        />
        <StatCard
          title="Total Margin"
          actual="£13,000"
          planned="£30,000"
          percent={41}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Project by Status">
          <BarChart
            labels={[
              "In Progress",
              "Completed",
              "Planned",
              "On Hold",
              "Cancelled",
            ]}
            values={[16, 10, 6, 20, 5]}
          />
        </SectionCard>

        <SectionCard title="Project by Due Date">
          <DonutChart
            data={[
              { label: "On Time", value: 41, color: "green" },
              { label: "Due", value: 11, color: "blue" },
              { label: "Over Due", value: 10, color: "yellow" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Workload">
          <DonutChart
            data={[
              { label: "Underutilised", value: 13, color: "blue" },
              { label: "Healthy", value: 85, color: "green" },
              { label: "Overutilised", value: 3, color: "yellow" },
            ]}
          />
        </SectionCard>

        <SectionCard title="Project by Project Manager">
          <BarChart
            horizontal
            labels={["James", "Sophia", "Sean", "Jim", "Lucy"]}
            values={[32, 21, 16, 18, 10]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
