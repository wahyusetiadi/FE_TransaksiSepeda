import React, { useEffect, useState } from "react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { useLocation } from "react-router-dom"; // Untuk mengambil rute saat ini
import { getUser } from "../../../api/api";

export const ContentLayout = ({ children }) => {
  const location = useLocation(); // Mengambil lokasi atau rute saat ini
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        // console.log("Data User:", userData);
        setMessage(
          `Hello, ${userData.username}! Your role is ${userData.role}.`
        );

        // setTimeout(() => {
        //   setMessage('');
        // },1000)
      } catch (error) {
        console.error("Error get User Data:", error);
        throw error;
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full flex h-screen ">
      <div className="w-auto hidden md:block">
        <SideBar loggedInfo={true} user={user?.username} role={user?.role} />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        {/* <div className="w-full">
          <TopBar />
        </div> */}
        <div className="h-full overflow-y-auto max-xl:p-6 md:p-4">
          <div className="w-full h-auto rounded-lg bg-white">
            <div key={location.pathname}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
