import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ResponsiveContext } from "../../context/responsiveContext";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import { BasicHeader, FlexCard, PositioningBox } from "../../styles";
import { IconButton } from "@mui/material";
import { Undo, ChevronRight } from '@mui/icons-material';

import {
  tabSwitch,
  childTabSwitch,
  mainTabSwitch,
  subTabSwitch,
} from "../../features/navigation/navigationSlice";


const Brands = () => {
  const { ww } = useContext(ResponsiveContext);
	const navigate = useNavigate();
  const dispatch = useDispatch();
	const viewStores = () => {
	  navigate('/store/add-brand');
	}

  useEffect(() => {
    dispatch(childTabSwitch("brands"));
  }, []);

  return (
    <FlexCard ww={ww} p='0' direction='column'>
      <PositioningBox ww={ww} position='relative' >
        <PositioningBox ww={ww} position='absolute' top='3' left='0.3' zIndex={20} >
          <FlexCard ww={ww} p='0' align='center'>
            <Link
              to={`/store`}
              onClick={() => {
                dispatch(tabSwitch("store"));
              }}
              style={{ display: "flex", alignItems: "center", color: "#c3ad60" }}
            >
              <IconButton
                aria-label={`navigate-back-to-event-page`} size="large" sx={{ color: "#c3ad60" }}
              >
                <Undo fontSize="large" />
              </IconButton>
              <BasicHeader ww={ww} p="0" fontWeight="500" fontSize="22" style={{ color: "#C3AD60" }} >
                Brands
              </BasicHeader>
              <ChevronRight sx={{ fontSize: ww(27), paddingTop: ww(0.4)}} />
            </Link>
          </FlexCard>
        </PositioningBox>
      </PositioningBox>
    </FlexCard>
  );
};

export default Brands;