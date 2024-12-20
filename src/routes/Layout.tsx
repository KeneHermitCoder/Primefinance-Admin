import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircleLoader from "react-spinners/CircleLoader";
import { ResponsiveContext } from "../context/responsiveContext";
import "../styles/navigation.style.css";
// eslint-disable-next-line
import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  home,
  store,
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
      dispatch(tabSwitch("dashBoard"));
      dispatch(mainTabSwitch("dashBoard"));
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
          <Header ww={ww} style={{}}>
            <Group ww={ww}>
              <img
                src={images.yoris}
                alt=""
                style={{ height: ww(80), width: ww(80) }}
              />
              <Dir style={{ marginLeft: ww(150) }}>
                {navigation.mainTab}{" "}
                <img
                  src={images.arrowRight}
                  alt=""
                  style={{ height: ww(24), width: ww(24) }}
                />{" "}
                {navigation.subTab}
              </Dir>
            </Group>
            <ProfileGroup>
              <Profile ww={ww}>
                <SearchGroup>
                  <Search ww={ww} type="text" placeholder="Search" />
                  <Searchicon>
                    <img
                      src={images.search}
                      alt=""
                      style={{ height: ww(24), width: ww(24) }}
                    />
                  </Searchicon>
                </SearchGroup>
                <img
                  src={images.notification}
                  alt=""
                  style={{ height: ww(32), width: ww(32) }}
                />
                <img
                  src={images.profile}
                  alt=""
                  style={{ height: ww(32), width: ww(32) }}
                />
              </Profile>
            </ProfileGroup>
          </Header>
          <Main ww={ww}>
            <Navigation style={{ width: ww(320) }}>
              <Accordion ww={ww}>
                <AccordionContainer ww={ww}>
                  {
                    <AccordionLink
                      ww={ww}
                      to="/"
                      style={{
                        background: navigation.tabs[0].bool && "#c3ad60",
                        color: navigation.tabs[0].bool && "#000",
                        border: !navigation.tabs[0].bool && "none",
                      }}
                      onClick={() => {
                        dispatch(tabSwitch("dashBoard"));
                        dispatch(mainTabSwitch("dashBoard"));
                      }}
                    >
                      Dashboard Management
                    </AccordionLink>
                  }
                </AccordionContainer>
              </Accordion>
            </Navigation>

            {home ? (
              <AppComponent style={{ padding: ww(40) }}>
                <Outlet />
              </AppComponent>
            ) : (
              <AppComponent style={{ padding: ww(40) }}>
                <Outlet />
              </AppComponent>
            )}
          </Main>
        </>
      )}
    </Container>
  );
}
