import { GetServerSidePropsContext, NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

import NavBar from "components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
     const session = await getServerSession(context.req, context.res, authOptions);

     if (session) {
          return {
               redirect: {
                    destination: "/",
                    permanent: false,
               },
          };
     }

     return {
          props: {},
     };
}
export default function Home() {
     return (
          <>
               <NavBar />
          </>
     );
}
