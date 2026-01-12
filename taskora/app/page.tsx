/* eslint-disable @typescript-eslint/no-explicit-any */
import TeamCard from "./components/teamcard";

export default function Home() {
  return (
    <>
      <TeamCard member={{} as any} />
    </>
  );
}
