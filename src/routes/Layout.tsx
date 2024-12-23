import "../styles/navigation.style.css";
import { Container, } from "../styles";
import { SideNav, } from "../components";
import { useSelector, } from "react-redux";
import { Outlet, } from "react-router-dom";
import { useState, useEffect, } from "react";
import { Notifications, } from "@mui/icons-material";
import CircleLoader from "react-spinners/CircleLoader";


const override = {
  display: "block",
  margin: "auto auto",
  borderColor: "green",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Layout() {
  const { navigation, } = useSelector((state: any) => state);
  // const { data, isLoading, isSuccess, isError, error } = useGetAdminsQuery({
  // 	refetchOnMountOrArgChange: true,
  // });
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  return (
    <Container>
      {loading ? (
        <CircleLoader
          color={"#14ae5c"}
          loading={loading}
          // @ts-expect-error - @types/react-spinners is not up to date
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
            <div className="flex h-screen">
              <SideNav />
            <div className="flex flex-col w-full h-full overflow-y-hidden bg-[#f2f5f8]">
              <header className="flex items-center bg-white w-full p-4">
                <div className="flex items-center text-gray-600 text-xl mr-auto">
                  {navigation.mainTab}{" "}
                </div>
                <div className="flex items-center gap-2">
                  <span className='text-xs text-gray-600'>Kene Nnakwue</span>
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
