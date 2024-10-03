"use client";
import { useSession } from "next-auth/react";
import LogoutButton from "../../component/shared/form/LogoutButton";
import { useEffect, useState } from "react";
import { errorMsg, successMsg } from "../../component/Toastmsg/toaster";
import userDetail from "@/services/UserDetail";
import {
  Box,
  Grid,
} from "@mui/material";

const Welcome = () => {
  const [userData, setUserData] = useState();
  const { data: session, status } = useSession();
  console.log("userdata", session);
  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try { 
          const dataUser = await userDetail.getAllUser();
          setUserData(dataUser);
        } catch (error) {
          errorMsg(error?.message);
        }
      }
    };

    fetchUser();
  }, [session]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-start p-4">
        <div className="text-lg">{session?.user?.email || session?.user?.id}</div>
       
      </div>
      <div>
        {userData?.length > 0 ? (
          userData.map((item) => (
            <Grid item xs={6} key={item.id}>
              <Box border={1} padding={2} borderRadius={1}>
                <div key={item.id}>
                  <p>{item.full_name}</p>
                </div>
              </Box>
            </Grid>
          ))
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </>
  );
};

export default Welcome;

/**/
