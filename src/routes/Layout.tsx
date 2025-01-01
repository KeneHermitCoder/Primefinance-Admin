import { Container } from "../styles";
import { SideNav } from "../components";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { Notifications, Menu } from "@mui/icons-material";

export default function Layout() {
  const { navigation } = useSelector((state: any) => state);
  // const { data, isLoading, isSuccess, isError, error } = useGetAdminsQuery({
  // 	refetchOnMountOrArgChange: true,
  // });
  const [loading, setLoading] = useState(true);
  const [sideNavVisible, setSideNavVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

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
                  <h1 className='truncate max-w-[120px] md:max-w-[300px]'>{navigation.mainTab}{" "}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Kene Nnakwue</span>
                  <span className="flex items-center justify-center w-9 h-9 bg-green-500 rounded-full">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                  </span>
                </div>
                <span className="mx-3 cursor-pointer">
                  <Notifications />
                </span>
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
