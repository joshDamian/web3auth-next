import Head from "next/head";
import AccountDashboard from "../components/Account";
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";
import NetWorth from "../components/NetWorth";
import useWeb3Auth from "../hooks/useWeb3Auth";

export default function Home() {
  const { isAuthenticated } = useWeb3Auth();

  const loggedInView = (
    <>
      <NetWorth />
      <AccountDashboard />
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <div className="pt-24 flex justify-center">
      <LoginButton />
    </div>
  );

  return (
    <>
      <Head>
        <title>TixHive - Web3Auth Account manager</title>
      </Head>
      <Header />
      <main className="py-8 lg:py-8 px-5 lg:px-8 xl:px-12 max-w-[1512px] mx-auto">
        {isAuthenticated ? loggedInView : unloggedInView}
      </main>
      <footer className="footer"></footer>
    </>
  );
}
