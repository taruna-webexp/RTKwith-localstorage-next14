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
 
  const { data: session, status } = useSession();
  console.log("userdata", session);
 
  
  return (
    <>
      <div className="flex justify-between items-start p-4">
        <div className="text-lg">{session?.user?.email || session?.user?.id}</div>
       
      </div>
     
    </>
  );
};

export default Welcome;

/**/
