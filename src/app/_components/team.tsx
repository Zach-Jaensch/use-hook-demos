import { use } from "react";

export function Team({
  team: teamPromise,
}: {
  team: Promise<{ id: number; name: string }>;
}) {
  const team = use(teamPromise);
  if (!team) {
    throw new Error("Team is undefined");
  }

  return (
    <div>
      <h1>Team: {team.name}</h1>
    </div>
  );
}
