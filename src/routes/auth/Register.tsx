import { images } from "../../constants";
import { Reveal } from "../../components";
import { useState, useEffect } from "react";
import { RootState } from "../../features";
import { AuthAPI } from "../../features/auth";
import { useDispatch, useSelector, } from "react-redux";
import { Link, useLocation, useNavigate, } from "react-router-dom";

export function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const { isLoading, error, success, } = useSelector((state: RootState) => state.auth);

  const { isLoading, success, } = useSelector((state: RootState) => state.auth);

  const [adminDetails, setAdminDetails] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateAdminDetails = (
    propToChange: "name" | "email" | "password" | "phone" | "surname",
    value: string
  ) => {
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [propToChange]: value,
    }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (adminDetails.password !== confirmPassword)
      throw new Error("Password not matching");

    // @ts-ignore
    dispatch(new AuthAPI().register(adminDetails));
  };

  useEffect(() => {
    const prevPage = location.state?.from?.pathname || "/";
    if (success === true)
      navigate("/", { state: { from: { pathname: prevPage } } });
  }, [success]);

  return (
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
            <label htmlFor="surname" className="hidden">
              Surname
            </label>
            <input
              onChange={(e) => updateAdminDetails("surname", e.target.value)}
              value={adminDetails.surname}
              type="text"
              id="surname"
              placeholder="Surname"
              required
              autoComplete="false"
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
          <div>
            <label htmlFor="phone" className="hidden">
              Phone
            </label>
            <input
              onChange={(e) => updateAdminDetails("phone",e.target.value)}
              value={adminDetails.phone}
              type="tel"
              id="phone"
              placeholder="Phone"
              required
              autoComplete="false"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>

          <div className="mt-4">
            <button
              // type="button"
              type="submit"
              className="flex items-center justify-center w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-[#089C48] font-inter text-white text-base font-medium leading-[19.36px] text-center underline-offset-0"
            >
              {
                isLoading
                  ? <span className='flex h-6 w-6 animate-spin rounded-full border-b-2 border-white'></span>
                  : "Register"
              }
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
}
