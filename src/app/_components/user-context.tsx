"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const UserContext = createContext<
  | Promise<
      | {
          id: number;
          name: string;
          phrase: string;
        }
      | undefined
    >
  | undefined
>(undefined);

async function getUser() {
  const url = "/api/user";
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`${url}: ${res.statusText}`);
    }
    return res.json();
  });
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<
    Promise<{
      id: number;
      name: string;
      phrase: string;
    }>
  >(new Promise(() => {}));
  useEffect(() => {
    setUser(getUser);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
