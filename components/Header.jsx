import Image from "next/image";
import { useState, useEffect } from "react";
import useWeb3Auth from "../hooks/useWeb3Auth";
import LoginButton from "./LoginButton";

export default function Header() {
  const { getUserInfo, isAuthenticated } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function init() {
      let userInfo = await getUserInfo();
      setUserInfo(userInfo);
    }
    if (isAuthenticated) {
      init();
    }
  }, [isAuthenticated]);

  return (
    <header className="py-5 lg:pt-7 lg:pb-0 border-b lg:border-0 w-full border-slate-700 px-5 lg:px-8 xl:px-12 max-w-[1512px] mx-auto flex items-center justify-between">
      <h3 className="text-xl text-white md:text-3xl lg:text-4xl font-extrabold">
        <span className="text-red-500 hidden lg:inline">Wallet</span> X
      </h3>
      {isAuthenticated && (
        <div className="flex justify-center">
          <select
            defaultValue={"0x89"}
            className="rounded-full w-full md:min-w-[200px] border-slate-600 border bg-transparent pl-3 pr-5 py-2"
          >
            <option value={"0x89"}>Polygon</option>
          </select>
        </div>
      )}
      <nav>
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center">
              <Image
                height={50}
                alt="profile"
                width={50}
                src={userInfo?.profileImage ?? "https://i.pravatar.cc/300"}
                className="rounded-full"
              />
              <div className="ml-3 hidden md:inline">
                <h3 className="text-base">{userInfo?.name}</h3>
                <h3 className="text-base">{userInfo?.email}</h3>
              </div>
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  );
}
