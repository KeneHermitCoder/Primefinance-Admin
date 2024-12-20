import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainTab: "Dashboard Management",
  subTab: "",
  tabs: [
    {
      id: "dashBoard",
      name: "Dashboard management",
      bool: true,
      children: [],
    },
    {
      id: "store",
      name: "Store Management",
      bool: false,
      children: [
        {
          id: "brands",
          name: "Brand",
          bool: false,
        },
        {
          id: "products",
          name: "Product",
          bool: false,
        },
        {
          id: "customers",
          name: "Customer",
          bool: false,
        },
        {
          id: "business-reg",
          name: "Buisness Registration",
          bool: false,
        },
        {
          id: "order-review",
          name: "Review",
          bool: false,
        },
        {
          id: "add-brand",
          name: "Add Brand",
          bool: false,
        },
        {
          id: "change",
          name: "Change Details",
          bool: false,
        },
      ],
    },
    {
      id: "social",
      name: "Social Management",
      bool: false,
      children: [
        {
          id: "user-accounts",
          name: "User Accounts",
          bool: false,
        },
        {
          id: "report",
          name: "Reports",
          bool: false,
        },
      ],
    },
    {
      id: "logistics",
      name: "Logistics Management",
      bool: false,
      children: [
        {
          id: "local",
          name: "Local logistics",
          bool: false,
        },
        {
          id: "international",
          name: "International Logistics",
          bool: false,
        },
        {
          id: "franchise",
          name: "Franchise Management",
          bool: false,
        },
        {
          id: "schedule-shipping",
          name: "Schedule Shipping",
          bool: false,
        },
        {
          id: "riders",
          name: "Riders",
          bool: false,
        },
      ],
    },
    {
      id: "finance",
      name: "Finance Management",
      bool: false,
      children: [],
    },
    {
      id: "staff",
      name: "Staff Management",
      bool: false,
      children: [],
    },
    {
      id: "event",
      name: "Event Management",
      bool: false,
      children: [],
    },
    {
      id: "hotel",
      name: "Hotel Management",
      bool: false,
      children: [
        {
          id: "bookings",
          name: "Bookings",
          bool: false,
        },
      ],
    },
    {
      id: "verifier",
      name: "Verifier Management",
      bool: false,
      children: [
        {
          id: "accepted",
          name: "Accepted Verification",
          bool: false,
        },
        {
          id: "pending",
          name: "Pending Verification",
          bool: false,
        },
        {
          id: "location",
          name: "Verifier Location",
          bool: false,
        },
        {
          id: "business",
          name: "Verifier Business",
          bool: false,
        },
      ],
    },
  ],
};
/**
 * navigationSlice - manages the navigation state of the app
 * intitialState: add new state here
 * reducers: add new functions to handle navigation state here
 *
 */
const navigationsSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    tabSwitch(state, action) {
      const tabId = action.payload;
          state.tabs.forEach((tab) => {
          // @ts-ignore
        tab.id === tabId ? (tab.bool = true) : (tab.bool = false);
        tab.children.forEach((childTab) => (childTab.bool = false));
      });
    },
    childTabSwitch(state, action) {
      const childTabId = action.payload;
      state.tabs.forEach((tab) => {
        tab.children.forEach((childTab) => {
          if (childTab.id === childTabId) {
            childTab.bool = true;
            tab.bool = false;
          } else {
            childTab.bool = false;
          }
        });
      });
    },
    mainTabSwitch(state, action) {
      state.tabs.forEach((item) => {
        if (item.id === action.payload) state.mainTab = item.name;
      });
      state.subTab = "";
    },
    subTabSwitch(state, action) {
      state.tabs.forEach((tab) => {
        tab.children.forEach((childTab) => {
          if (childTab.id === action.payload) state.subTab = childTab.name;
        });
      });
    },
  },
});

export const { tabSwitch, childTabSwitch, mainTabSwitch, subTabSwitch } = navigationsSlice.actions;
export default navigationsSlice.reducer;