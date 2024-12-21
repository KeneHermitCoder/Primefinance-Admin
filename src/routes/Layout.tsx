import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";
import { ResponsiveContext } from "../context/responsiveContext";
import "../styles/navigation.style.css";
// eslint-disable-next-line
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { images } from "../constants";
import {
  tabSwitch,
  childTabSwitch,
  mainTabSwitch,
  subTabSwitch,
} from "../features/navigation/navigationSlice";
import {
  Container,
  Header,
  Group,
  Dir,
  ProfileGroup,
  Profile,
  SearchGroup,
  Search,
  Searchicon,
  Main,
  AppComponent,
} from "../styles";
import {
  Accordion,
  AccordionContainer,
  AccordionLink,
  Navigation,
} from "../styles";
import {
  CurrencyExchange,
  Home,
  Logout,
  Money,
  Notifications,
  Settings,
} from "@mui/icons-material";
import { Button } from "@mui/material";

export const siteTitle = "Yoris Admin";

const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "green",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const selectState = (state) => state;

export default function Layout({
  children,
}: {
  children?: React.ReactNode;
  home?: boolean;
  store?: boolean;
}) {
  const { navigation } = useSelector(selectState);
  const dispatch = useDispatch();
  const { ww } = useContext(ResponsiveContext);
  // const { data, isLoading, isSuccess, isError, error } = useGetAdminsQuery({
  // 	refetchOnMountOrArgChange: true,
  // });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const locArray = location.pathname
    .split("/")
    .filter((item) => item !== "" && item);
  useEffect(() => {
    console.log(location, locArray);
    navigate(location.pathname);
    if (locArray.length < 2 && locArray.length > 0) {
      dispatch(tabSwitch(`${locArray[0]}`));
      dispatch(mainTabSwitch(`${locArray[0]}`));
    } else if (locArray.length > 1) {
      dispatch(tabSwitch(`${locArray[0]}`));
      dispatch(childTabSwitch(`${locArray[1]}`));
      dispatch(mainTabSwitch(`${locArray[0]}`));
      dispatch(subTabSwitch(`${locArray[1]}`));
    } else {
      dispatch(tabSwitch("dashboard"));
      dispatch(mainTabSwitch("dashboard"));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const tabDecoration = (index: number) => (
    <div
      className={`w-[5px] ${
        navigation.tabs[index].bool ? "bg-white" : ""
      } rounded-r-lg mr-4`}
    ></div>
  );

  useEffect(() => {
    console.log({ navigation });
  }, []);
  return (
    <Container>
      {loading ? (
        <CircleLoader
          color={"#c3ad60"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <div className="flex h-screen">
            <nav className="bg-[#089C48] w-[220px] flex flex-col h-full overflow-hidden">
              <Link
                to="/"
                className="flex items-center p-4 py-6 pl-10 text-white font-semibold"
              >
                PrimeFinance
              </Link>
              <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                  <div className="flex pl-[2px]">
                    {tabDecoration(0)}
                    <Link
                      // to="/"
                      onClick={() => {
                        dispatch(tabSwitch("dashboard"));
                        dispatch(mainTabSwitch("dashboard"));
                      }}
                      className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm"
                    >
                      <Home fontSize="small" />
                      <span>Dashboard</span>
                    </Link>
                  </div>
                  <div className="flex pl-[2px]">
                    {tabDecoration(1)}
                    <Link
                      // to="/loans"
                      onClick={() => {
                        dispatch(tabSwitch("loans"));
                        dispatch(mainTabSwitch("loans"));
                      }}
                      className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm"
                    >
                      <CurrencyExchange fontSize="small" />
                      <span>Loan</span>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex pl-[2px]">
                    {tabDecoration(2)}
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm"
                    >
                      <Settings fontSize="small" />
                      <span>Settings</span>
                    </Link>
                  </div>
                  <div className="flex pl-[2px]">
                    <div className="w-[5px] rounded-r-lg mr-4"></div>
                    <Link
                      to="/logout"
                      className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm"
                    >
                      <Logout fontSize="small" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
            <div className="flex flex-col w-full h-full overflow-y-hidden bg-gray-200">
              <header className="flex items-center bg-white w-full p-4">
                <div className="flex items-center text-[#089C48] text-xl mr-auto">
                  {navigation.mainTab}{" "}
                </div>
                <div className="flex items-center gap-2">
                  <span>Kene Nnakwue</span>
                  <span className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                  </span>
                </div>
                <button type="button" className="mx-3">
                  <Notifications />
                </button>
              </header>
              <main className="p-4 h-full overflow-y-scroll">
                {/* {children} */}
                <Outlet />
              </main>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
