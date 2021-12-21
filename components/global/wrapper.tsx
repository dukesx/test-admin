/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { supabase } from "../../lib/initSupabase";
import { useRouter } from "next/router";

const Wrapper = (props) => {
  var session = supabase.auth.session();
  const router = useRouter();
  // useEffect(() => {
  //   if (session) {
  //     router.pathname == "/" ? router.push("/admin") : null;
  //   } else {
  //   }
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     console.log(event);
  //     if (session && session.user) {
  //       router.push("/admin");
  //     }

  //     if (!session) {
  //       router.push("/");
  //     }
  //   });
  // }, [session]);
  return props.children;
};

export default Wrapper;
