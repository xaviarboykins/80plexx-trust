import Billboard from "components/Billboard";
import InfoModal from "components/InfoModal";
import MovieList from "components/MovieList";
import VidNav from "components/VidNav";
import useFavorites from "hooks/useFavorites";
import useInfoModal from "hooks/useInfoModal";
import useMovieList from "hooks/useMovieList";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
     const session = await getServerSession(context.req, context.res, authOptions);

     if (session) {
          return {
               redirect: {
                    destination: "/videos",
                    permanent: false,
               },
          };
     }

     return {
          props: {},
     };
}

export default function Videos() {
     const { data: movies = [] } = useMovieList();
     const { data: favorites = [] } = useFavorites();
     const { isOpen, closeModal } = useInfoModal();
     return (
          <>
               <InfoModal visible={isOpen} onClose={closeModal} />
               <VidNav />
               <Billboard />
               <div className="pb-40">
                    <MovieList title="Trending Now" data={movies} />
                    <MovieList title="My List" data={favorites} />
               </div>
          </>
     );
}
