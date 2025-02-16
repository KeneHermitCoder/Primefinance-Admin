import { Container } from "../styles";
import { SideNav } from "../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { Menu, AccountCircle } from "@mui/icons-material";
// import { Notifications } from "@mui/icons-material";
import useLocalStorage from "../features/hooks/useLocalStorage";

export default function Layout() {
  const { navigation } = useSelector((state: any) => state);
  const [loading, setLoading] = useState(true);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: '',
    profilePhoto: '',
  });

  useEffect(() => {
    const adminDetails = useLocalStorage('get', 'adminDetails');
    setAdminInfo({ 
      name: `${adminDetails?.user_metadata?.first_name || ''} ${adminDetails?.user_metadata?.surname || ''}`, 
      profilePhoto: adminDetails?.user_metadata?.profilePhoto || '' 
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  return (
    <Container>
      {loading ? (
        <CircleLoader
          color={"#14ae5c"}
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "auto auto",
            borderColor: "green",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <div className="flex h-screen">
            <div
              className={`fixed h-screen z-50 lg:relative lg:z-auto ${
                sideNavVisible ? "block" : "hidden"
              } lg:block`}
            >
              <SideNav toggleSideNav={toggleSideNav} visible={sideNavVisible} />
            </div>
            <div className="flex flex-col w-full h-full overflow-y-hidden bg-[#f2f5f8]">
              <header className="flex items-center bg-white w-full p-4">
                <div className="flex items-center text-gray-600 text-xl mr-auto">
                  <button
                    className="lg:hidden mr-4"
                    onClick={toggleSideNav}
                    aria-label="Toggle navigation"
                  >
                    <Menu />
                  </button>
                  <h1 className="truncate max-w-[120px] md:max-w-[300px]">{navigation.mainTab}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{adminInfo.name}</span>
                  <span className="flex items-center justify-center w-9 h-9 bg-green-500 rounded-full">
                    {adminInfo.profilePhoto ? (
                      <img
                        src={adminInfo.profilePhoto}
                        alt="Admin profile"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <AccountCircle className="w-8 h-8 text-white" />
                    )}
                  </span>
                </div>
                {/* <span className="mx-3 cursor-pointer">
                  <Notifications />
                </span> */}
              </header>
              <main className="p-4 h-full overflow-y-scroll">
                <Outlet />
              </main>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}