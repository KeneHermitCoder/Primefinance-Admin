import { images } from "../../constants";
import { Reveal } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useContext, useEffect } from "react";

export function Register() {
  // const dispatch = useDispatch();
  const location = useLocation();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const isLoading = false;

  const updateAdminDetails = (
    propToChange: "name" | "email" | "password",
    value: string
  ) => {
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [propToChange]: value,
    }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      console.log(adminDetails);
      if (adminDetails.password !== confirmPassword)
        throw new Error("Password not matching");
      setSuccess(true);
    } catch (err: any) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  useEffect(() => {
    const prevPage = location.state?.from?.pathname || "/";
    if (success === true) window.location.href = prevPage;
  }, [success]);

  const content = isLoading ? (
    // <DefaultLoader loading={isLoading} />
    <>Default Loader</>
  ) : (
    <Reveal>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
        <div className="py-5 flex flex-col items-center">
          <img src={images.logoPNG} alt="logo" className="w-[100px] hidden" />
          <h1 className="text-xl font-normal text-gray-600">
            Admin Panel - Register
          </h1>
        </div>
        <form
          onSubmit={handleRegister}
          className="w-[517px] flex flex-col gap-[20px]"
        >
          <div>
            <label htmlFor="name" className="hidden">
              Name
            </label>
            <input
              onChange={(e) => updateAdminDetails("name", e.target.value)}
              value={adminDetails.name}
              type="text"
              id="name"
              placeholder="Name"
              required
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div>
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              onChange={(e) => updateAdminDetails("email", e.target.value)}
              value={adminDetails.email}
              type="email"
              id="email"
              placeholder="Email"
              required
              autoComplete="false"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div>
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <input
              onChange={(e) => updateAdminDetails("password", e.target.value)}
              value={adminDetails.password}
              type="password"
              id="password"
              placeholder="Password"
              required
              autoComplete="false"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="hidden">
              Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
              autoComplete="false"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div className='mt-4'>
            <button
              type="button"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-[#089C48] font-inter text-white text-base font-medium leading-[19.36px] text-center underline-offset-0"
            >
              Register
            </button>
          </div>
        </form>
        <div className="w-1/3 flex items-center justify-center gap-2 py-8">
          <p>Already have an account?</p>
          <Link to="/login" className="text-[#089C48] underline">
            Login
          </Link>
        </div>
      </div>
    </Reveal>
  );

  return content;
}
