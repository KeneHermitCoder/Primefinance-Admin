import "../styles/navigation.style.css";


import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tabSwitch, mainTabSwitch, } from "../features/navigation/navigationSlice";
import {
  Home,
  Money,
  Logout,
  Settings,
  Notifications,
  CatchingPokemon,
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
    {
      link: "/escrow",
      tab: "escrow",
      title: "Escrow",
      icon: <CatchingPokemon />,
    },
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

export default function SideNav() {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigation } = useSelector((state: { navigation: any }) => state);
  const tabDecoration = (index: number) => (
    <div
      className={`w-[5px] ${
        navigation.tabs[index].bool ? "bg-white" : ""
      } rounded-r-lg mr-4`}
    ></div>
  );

  return (
    <nav className="bg-[#089C48] w-[300px] flex flex-col h-full overflow-hidden">
      <Link
        to="/"
        onClick={() => {
          dispatch(tabSwitch('dashboard'));
          dispatch(mainTabSwitch('dashboard'));
        }}
        className="flex items-center p-4 py-6 pl-10 text-white font-semibold"
      >
        PrimeFinance
      </Link>
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
                <Link
                  to={item.link}
                  onClick={() => {
                    dispatch(tabSwitch(item.tab));
                    dispatch(mainTabSwitch(item.tab));
                  }}
                  className="flex items-center gap-2 w-full p-4 py-4 text-white font-normal text-sm"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}