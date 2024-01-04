import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import NavBar from "components/NavBar";

export async function getServerSideProps(context: NextPageContext) {
     try {
          const session = await getSession(context);
          if (!session) {
               return {
                    redirect: {
                         destination: "/auth",
                         permanent: false,
                    },
               };
          }
          return { props: {} };
     } catch (error) {
          console.error("Error getting session:", error);
          return { props: {} };
     }
}
export default function Home() {
     return (
          <>
               <NavBar />
          </>
     );
}
