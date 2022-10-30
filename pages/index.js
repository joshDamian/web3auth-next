import Head from "next/head";
import AccountDashboard from "../components/Account";
import Header from "../components/Header";
import useWeb3Auth from "../hooks/useWeb3Auth";

export default function Home() {
  const { login, logout, sendTransaction, getPrivateKey, signMessage, isAuthenticated } = useWeb3Auth();

  const loggedInView = (
    <>
      <AccountDashboard />
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <>
      <Head>
        <title>TixHive - Web3Auth Account manager</title>
      </Head>
      <Header />
      <main className="py-8 lg:py-10 px-5 lg:px-8 max-w-[1512px] mx-auto">
        {isAuthenticated ? loggedInView : unloggedInView}
      </main>
      <footer className="footer"></footer>
    </>
  );
}
