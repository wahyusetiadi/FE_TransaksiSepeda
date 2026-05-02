import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import logo from "../../assets/logo.svg";

const shouldShowDemoAccount = () => {
  const demoFlag = import.meta.env.VITE_SHOW_DEMO_CREDENTIALS;
  if (demoFlag === "true") return true;
  if (demoFlag === "false") return false;

  const flag = import.meta.env.VITE_USE_MOCK;
  if (flag === "true") return true;
  if (flag === "false") return false;

  const baseUrl = import.meta.env.VITE_BASE_URL;
  return !baseUrl;
};

const DEMO_ACCOUNTS = [
  { label: "Owner", username: "owner", password: "owner" },
  { label: "Admin", username: "admin", password: "admin" },
];

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const doLogin = async (u, p) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(u, p);

      if (response && response.data) {
        localStorage.setItem("token", response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Username atau password salah");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doLogin(username, password);
  };

  const handleDemoLogin = async (account) => {
    setUsername(account.username);
    setPassword(account.password);
    await doLogin(account.username, account.password);
  };

  const handleUseDemo = (account) => {
    setUsername(account.username);
    setPassword(account.password);
  };

  return (
    <div className="w-full h-dvh bg-[url('/authBg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      {/* <div className="w-[40%] bg-cyan-600 h-dvh">
        <img src={ImageSide} />
      </div> */}

      <div className="md:w-[600px] max-md:w-[300px] py-20 max-md:py-8 max-md:px-4 border bg-slate-100 rounded-lg flex flex-col items-center justify-center">
        <div className="mb-6 w-full flex gap-4 items-center justify-center">
          <img src={logo} className="w-32 max-md:w-40" />
          <div className="w-fit flex flex-col items-start justify-stretch text-start text-5xl font-bold text-orange-500">
            <p>E-Bike</p>
            <p>Management</p>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="text-center w-full">
            <h1 className="font-bold text-2xl max-md:text-lg">
              Masuk ke Akun Anda
            </h1>
            <p className="text-gray-600 text-base max-md:text-sm">
              Masukkan Username dan Password untuk login!
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-6 text-base max-md:text-sm">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              required
              type="text"
              placeholder="Masukkan Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4 text-base max-md:text-sm">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-2 rounded"
            />
          </div>

          {/* <div className="w-full flex justify-end text-xs mt-1">
            <a href="">Lupa Passord?</a>
          </div> */}

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {shouldShowDemoAccount() && (
            <div className="mt-6 mb-4 p-3 rounded border border-orange-200 bg-orange-50 text-sm">
              <p className="font-semibold text-orange-700">Akun demo</p>

              <div className="mt-3 grid gap-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.username}
                    className="flex items-center justify-between gap-2 rounded bg-white/60 px-3 py-2 border border-orange-100"
                  >
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-orange-800">
                        {acc.label}
                      </p>
                      <p className="text-[11px] text-orange-800/80">{`${acc.username} / ${acc.password}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex justify-center text-base max-md:text-sm text-white mt-8">
            <button
              type="submit"
              disabled={loading}
              className="p-2 w-full bg-orange-600 hover:bg-orange-700 rounded-full"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>

          {/* <div className="w-full flex justify-center text-base mt-2">
            <p>Belum Punya Akun?</p>
            <a href="" className="font-bold">
              Hubungi Admin
            </a>
          </div> */}
        </form>
      </div>
    </div>
  );
};
