import { Web3AuthProvider } from "../context/Web3AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3AuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Component {...pageProps} />
    </Web3AuthProvider>
  );
}

export default MyApp;
