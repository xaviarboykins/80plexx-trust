import Input from "components/Input";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { ChangeEvent, useCallback, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
     try {
          const session = await getSession(context);
          if (session) {
               return {
                    redirect: {
                         destination: "/",
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

const Auth = () => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const [variant, setVariant] = useState("login");
     const router = useRouter();

     const login = useCallback(async () => {
          try {
               await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: "/",
               });
               router.push("/");
          } catch (error) {
               console.log(error);
          }
     }, [email, password, router]);

     const register = useCallback(async () => {
          try {
               await axios.post("/api/register", {
                    email,
                    name,
                    password,
               });

               login();
          } catch (error) {
               console.log(error);
          }
     }, [email, name, password, login]);

     function changeInput(ev: ChangeEvent<HTMLInputElement>) {
          switch (ev.target.name) {
               case "Username":
                    setName(ev.target.value);
                    break;
               case "Email":
                    setEmail(ev.target.value);
                    break;
               case "Password":
                    setPassword(ev.target.value);
                    break;

               default:
                    break;
          }
     }

     const toggleVariant = useCallback(() => {
          setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"));
     }, []);

     return (
          <div className="relative h-full w-full bg-[url('/images/80plexx2-modified.png')]  bg-no-repeat bg-center bg-fixed bg-cover">
               <div className="bg-black w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5">
                         <img src="/images/80plogo2.png" alt="Logo" className="h-8" />
                    </nav>
                    <div className="flex justify-center">
                         <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                              <h2 className="text-white text-4xl mb-8 font-semibold">
                                   {variant === "login" ? "Sign in" : "Register"}
                              </h2>
                              <div className="flex flex-col gap-4">
                                   {variant === "register" && (
                                        <Input
                                             label="Username"
                                             onChange={changeInput}
                                             id="username"
                                             type="text"
                                             value={name}
                                        />
                                   )}

                                   <Input label="Email" onChange={changeInput} id="email" type="email" value={email} />
                                   <Input
                                        label="Password"
                                        onChange={changeInput}
                                        id="password"
                                        type="password"
                                        value={password}
                                   />
                              </div>

                              <button
                                   onClick={variant === "login" ? login : register}
                                   className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                              >
                                   {variant === "login" ? "Login" : "Sign up"}
                              </button>
                              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                   <div
                                        onClick={() => signIn("google", { callbackUrl: "/" })}
                                        className="
                                   w-10
                                   h-10
                                   bg-white
                                   rounded-full
                                   flex
                                   items-center
                                   justify-center
                                   cursor-pointer
                                   hover:opacity-80
                                   transition
                                   "
                                   >
                                        <FcGoogle size={30} />
                                   </div>
                                   <div
                                        onClick={() => signIn("github", { callbackUrl: "/" })}
                                        className="
                                   w-10
                                   h-10
                                   bg-white
                                   rounded-full
                                   flex
                                   items-center
                                   justify-center
                                   cursor-pointer
                                   hover:opacity-80
                                   transition
                                   "
                                   >
                                        <FaGithub size={30} />
                                   </div>
                              </div>
                              <p className="text-neutral-500 text-center mt-12">
                                   {variant === "login" ? "Not a Member?" : "Already have an account?"}
                                   {variant === "login" ? (
                                        <span
                                             onClick={toggleVariant}
                                             className="text-white ml-1 hover:underline cursor-pointer"
                                        >
                                             Create an account
                                        </span>
                                   ) : (
                                        <span
                                             onClick={toggleVariant}
                                             className="text-white ml-1 hover:underline cursor-pointer"
                                        >
                                             Sign in
                                        </span>
                                   )}
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Auth;
