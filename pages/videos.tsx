import Billboard from "components/Billboard";
import InfoModal from "components/InfoModal";
import MovieList from "components/MovieList";
import VidNav from "components/VidNav";
import useFavorites from "hooks/useFavorites";
import useInfoModal from "hooks/useInfoModal";
import useMovieList from "hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

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
