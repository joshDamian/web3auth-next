import Image from "next/image";
import { useState, useEffect } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";

export default function Header() {
  const { getUserInfo, isAuthenticated, login } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function init() {
      let userInfo = await getUserInfo();
      console.log(userInfo);
      setUserInfo(userInfo);
    }
    if (isAuthenticated) init();
  }, [isAuthenticated]);

  return (
    <header className="py-5 lg:py-7 border-b w-full border-slate-700 px-5 lg:px-8 max-w-[1512px] mx-auto flex items-center justify-between">
      <h3 className="text-xl text-white md:text-2xl lg:text-3xl font-bold">TixHive Wallet Manager</h3>
      <nav>
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center">
              <Image
                height={50}
                alt="profile"
                width={50}
                src={userInfo?.profileImage || "https://i.pravatar.cc/300"}
                className="rounded-full"
              />
              <div className="ml-3 hidden md:inline">
                <h3 className="text-base">{userInfo?.name}</h3>
                <h3 className="text-base">{userInfo?.email}</h3>
              </div>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-blue-700 py-3 px-4 rounded-md shadow-lg font-semibold text-base hover:bg-blue-600 hover:ring-blue-400 hover:ring-1 transition-all duration-100"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
