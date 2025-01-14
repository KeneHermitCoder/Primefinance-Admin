import "../styles/navigation.style.css";

import { AuthAPI } from "../features/auth";
import { getAccessToken } from "../features";
import { useNavigate } from "react-router-dom";
import { SlideInAlertDialog } from "./dialogs";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  tabSwitch,
  mainTabSwitch,
} from "../features/navigation/navigationSlice";
import {
  Home,
  Money,
  Clear,
  Logout,
  Settings,
  Notifications,
  // CatchingPokemon,
  CurrencyBitcoin,
  Person3Outlined,
  CurrencyExchange,
} from "@mui/icons-material";

const navData = [
  [
    {
      link: "/",
      tab: "dashboard",
      title: "Dashboard",
      icon: <Home />,
    },
    {
      link: "/loans",
      tab: "loans",
      title: "Loans",
      icon: <Money />,
    },
    {
      link: "/transactions",
      tab: "transactions",
      title: "Transactions",
      icon: <CurrencyExchange />,
    },
    // {
    //   link: "/escrow",
    //   tab: "escrow",
    //   title: "Escrow",
    //   icon: <CatchingPokemon />,
    // },
    {
      link: "/bills",
      tab: "bills",
      title: "Bills",
      icon: <CurrencyBitcoin />,
    },
    {
      link: "/users",
      tab: "users",
      title: "Users",
      icon: <Person3Outlined />,
    },
    {
      link: "/notifications",
      tab: "notifications",
      title: "Notifications",
      icon: <Notifications />,
    },
  ],
  [
    {
      link: "/settings",
      tab: "settings",
      title: "Settings",
      icon: <Settings />,
    },
    {
      link: "/logout",
      tab: "logout",
      title: "Logout",
      icon: <Logout />,
    },
  ],
];

export default function SideNav({
  visible,
  toggleSideNav,
}: {
  visible: boolean;
  toggleSideNav: () => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidenavRef = useRef<HTMLDivElement>(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  // @ts-ignore
	const { isLoading, error, success } = useSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigation } = useSelector((state: { navigation: any }) => state);
  const tabDecoration = (index: number) => (
    <div
      className={`w-[5px] ${
        navigation.tabs[index].bool ? "bg-white" : ""
      } rounded-r-lg mr-4`}
    ></div>
  );

  const handleNavigation = (link: string, tab: string) => {
    if (tab !== "logout") {
      dispatch(tabSwitch(tab));
      dispatch(mainTabSwitch(tab));
      navigate(link, { state: { from: { pathname: location.pathname } } });
      toggleSideNav();
    } else setLogoutModalOpen(true);
  }

  const handleCancelLogout = async () => {
    setLogoutModalOpen(false);
  };
  const handleLogout = async () => {
    // @ts-ignore
    dispatch(new AuthAPI().logout(getAccessToken()));
    setLogoutModalOpen(false);
    // navigate("/login", { state: { from: { pathname: location.pathname } } });
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidenavRef.current &&
        !sidenavRef.current.contains(event.target as Node)
      ) {
        toggleSideNav();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, toggleSideNav]);

  return (
    <>
      <SlideInAlertDialog
        open={logoutModalOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        acceptText="Logout"
        rejectText="Cancel"
        handleOpen={toggleSideNav}
        acceptAction={handleLogout}
        rejectAction={handleCancelLogout}
        acceptActionInProgress={isLoading}
      />
      <nav
        ref={sidenavRef}
        className={`bg-[#089C48] w-[300px] flex flex-col h-full overflow-hidden sidenav fixed z-50 lg:relative lg:z-auto ${
          visible ? "sidenav-visible" : "sidenav-hidden"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div
            onClick={() => handleNavigation("/", "dashboard")}
            className="flex items-center p-4 py-6 pl-10 text-white font-semibold text-sm cursor-pointer"
          >
            PrimeFinance
          </div>
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={toggleSideNav}
          >
            <Clear />
          </button>
        </div>
        <div className="flex flex-col h-full justify-between">
          {navData.map((items, index) => (
            <div key={`side-nav-${index}`} className="flex flex-col">
              {items.map((item, currentIndex) => (
                <div
                  key={`side-nav-${item.tab}-${index}-${currentIndex}`}
                  className="flex pl-[2px]"
                >
                  {tabDecoration(
                    index !== navData.length - 1
                      ? index + currentIndex
                      : navData[index - 1].length - 1 + currentIndex + 1
                  )}
                  <div
                    onClick={() => handleNavigation(item.link, item.tab)}
                    className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm cursor-pointer"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
