import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prisma from "lib/prisma";
import serverAuth from "lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     try {
          if (req.method === "POST") {
               const { currentUser } = await serverAuth(req, res);
               console.log(currentUser);
               const { movieId } = req.body;

               const existingMovie = await prisma.movie.findUnique({
                    where: {
                         id: movieId,
                    },
               });

               if (!existingMovie) {
                    throw new Error("Invalid ID");
               }

               const user = await prisma.user.update({
                    where: {
                         email: currentUser.email || "",
                    },
                    data: {
                         favoriteIds: {
                              push: movieId,
                         },
                    },
               });

               return res.status(200).json(user);
          }

          if (req.method === "DELETE") {
               const { currentUser } = await serverAuth(req, res);
               const { movieId } = req.body;
               const existingMovie = await prisma.movie.findUnique({
                    where: {
                         id: movieId,
                    },
               });

               if (!existingMovie) {
                    throw new Error("invalid ID");
               }
               const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

               const updatedUser = await prisma.user.update({
                    where: {
                         email: currentUser.email || "",
                    },
                    data: {
                         favoriteIds: updatedFavoriteIds,
                    },
               });

               return res.status(200).json(updatedUser);
          }

          return res.status(405).end();
     } catch (error: any) {
          console.log(error);
          return res.status(400).json({ error: error.message });
     }
}
