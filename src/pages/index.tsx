// tsrsfc

import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <>
      <h1>Home page</h1>
      <h2>{session?.user?.first_name} - {session?.user?.last_name}</h2>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </>
  );
};

export default Index;



