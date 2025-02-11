import React, { useEffect, useState } from "react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { useLocation } from "react-router-dom"; // Untuk mengambil rute saat ini
import { getUser } from "../../../api/api";
import { ClipLoader } from "react-spinners"; // Import spinner loading

export const ContentLayout = ({ children }) => {
  const location = useLocation(); // Mengambil lokasi atau rute saat ini
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // State untuk menunjukkan loading

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Menyatakan bahwa data sedang dimuat
      try {
        const userData = await getUser();
        setUser(userData);
        setMessage(
          `Hello, ${userData.username}! Your role is ${userData.role}.`
        );
      } catch (error) {
        console.error("Error get User Data:", error);
      } finally {
        setLoading(false); // Data selesai dimuat, set loading ke false
      }
    };
    fetchUser();
  }, [location]); // Memantau perubahan route

  return (
    <div className="w-full flex h-screen">
      <div className="w-auto hidden md:block">
        <SideBar loggedInfo={true} user={user?.username} role={user?.role} />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        {/* <div className="w-full">
          <TopBar />
        </div> */}
        
        <div className="h-full overflow-y-auto max-xl:p-6 md:p-4">
          <div className="w-full h-auto rounded-lg bg-white">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <ClipLoader color="#EA580C" size={50} />
              </div>
            ) : (
              <div key={location.pathname}>{children}</div> // Menampilkan konten setelah loading selesai
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
