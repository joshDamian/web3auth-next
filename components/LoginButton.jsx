import useWeb3Auth from "../hooks/useWeb3Auth";

function LoginButton() {
  const { login } = useWeb3Auth();
  return (
    <button
      onClick={login}
      className="bg-blue-700 py-3 px-4 rounded-md shadow-lg font-semibold text-base hover:bg-blue-600 hover:ring-blue-400 hover:ring-1 transition-all duration-100"
    >
      Login
    </button>
  );
}

export default LoginButton;
