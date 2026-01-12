import TeamCard, { TeamMember } from "./teamcard";

const members: TeamMember[] = [
  {
    name: "Alice Johnson",
    role: "Product Manager",
    email: "alice.j@taskora.com",
    phone: "+1 555-123-4567",
    image: "https://i.pravatar.cc/150?img=1",
    status: "online",
  },
  {
    name: "Bob Williams",
    role: "Software Engineer",
    email: "bob.w@taskora.com",
    phone: "+1 555-987-6543",
    image: "https://i.pravatar.cc/150?img=2",
    status: "away",
  },
  {
    name: "Charlie Brown",
    role: "UX Designer",
    email: "charlie.b@taskora.com",
    phone: "+1 555-111-2222",
    image: "https://i.pravatar.cc/150?img=3",
    status: "offline",
  },
  {
    name: "Diana Prince",
    role: "Quality Assurance",
    email: "diana.p@taskora.com",
    phone: "+1 555-333-4444",
    image: "https://i.pravatar.cc/150?img=4",
    status: "online",
  },
  {
    name: "Eve Adams",
    role: "Scrum Master",
    email: "eve.a@taskora.com",
    phone: "+1 555-555-6666",
    image: "https://i.pravatar.cc/150?img=5",
    status: "offline",
  },
];

export default function TeamPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Team Management</h1>

        <div className="flex gap-3">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            Invite Member
          </button>
          <button className="border px-4 py-2 rounded-lg">
            Bulk Assign Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <TeamCard key={member.email} member={member} />
        ))}
      </div>
    </>
  );
}
