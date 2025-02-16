import { use } from "react";
import { UserContext } from "./user-context";

export function User() {
  const userPromise = use(UserContext);
  if (!userPromise) {
    throw new Error("User promise is undefined");
  }
  const user = use(userPromise);
  if (!user) {
    throw new Error("User is undefined");
  }

  return (
    <div>
      <h1>Name: {user.name}</h1>
      <p>Phrase: {user.phrase}</p>
    </div>
  );
}
