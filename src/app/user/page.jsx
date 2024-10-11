"use client";
import { useSession } from "next-auth/react";

const User = () => {
 
  const { data: session } = useSession();
 
  
  return (
    <>
      <div className="flex justify-between items-start p-4">
        <div className="text-lg">{session?.user?.email || session?.user?.id}</div>
       
      </div>
     
    </>
  );
};

export default User;

/**/
