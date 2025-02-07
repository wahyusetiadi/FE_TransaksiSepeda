import React, { useState } from "react";
import ImageSide from "../../assets/image/1213.png";
import Logo1 from "../../assets/logo1.svg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import logo from '../../assets/logo.svg'
import Cookies from "js-cookie";
// import { login } from "../../api/api";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(username, password);

      if (response && response.data) {
        localStorage.setItem("token", response.data);
        console.log(response.data);
        
        // Cookies.set("token", response.data);
        navigate("/dashboard");
        // navigate("/");
        console.log("response", response.data);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Username atau password salah");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white h-dvh flex items-center justify-center">
      {/* <div className="w-[40%] bg-cyan-600 h-dvh">
        <img src={ImageSide} />
      </div> */}

      <div className="md:w-[600px] max-md:w-[300px] py-20 max-md:py-8 max-md:px-4 border bg-slate-100 rounded-lg flex flex-col items-center justify-center">
        <div className="mb-6 w-full flex gap-4 items-center justify-center">
          <img src={logo} className="w-32 max-md:w-40" />
          <div className="w-fit flex flex-col items-start justify-stretch text-start text-5xl font-bold text-orange-500">
            <p>GMJ</p>
            <p>Bike Shop</p>
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

          <div className="w-full flex justify-center text-base max-md:text-sm text-white mt-8">
            <button
              type="submit"
              className="p-2 w-full bg-orange-600 hover:bg-orange-700 rounded-full"
            >
              Login
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
