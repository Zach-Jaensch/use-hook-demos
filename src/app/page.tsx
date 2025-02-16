"use client";

import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { UserProvider } from "./_components/user-context";
import { User } from "./_components/user";
import { Team } from "./_components/team";

function fallbackRender({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-red-600">{error.message}</pre>
    </div>
  );
}

async function getTeam() {
  const url = "/api/team";
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${url}: ${res.statusText}`);
    }
    return res.json();
  });
}

export default function Home() {
  // const [team, setTeam] = useState<Promise<{ id: number; name: string }>>(
  //   new Promise(() => {})
  // );
  // useEffect(() => {
  //   setTeam(getTeam);
  // }, []);
  return (
    <UserProvider>
      <main className="p-4 flex flex-col items-center justify-center space-y-4 h-screen">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense fallback={<p>Loading...</p>}>
            <User />
            {/* <Team team={team} /> */}
          </Suspense>
        </ErrorBoundary>
      </main>
    </UserProvider>
  );
}
