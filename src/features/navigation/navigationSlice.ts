import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  mainTab: string;
  subTab: string;
  tabs: {
    id: string;
    name: string;
    bool: boolean;
    children: {
      id: string;
      name: string;
      bool: boolean;
    }[];
  }[];
} = {
  mainTab: "Dashboard",
  subTab: "",
  tabs: [
    {
      id: "dashboard",
      name: "Dashboard",
      bool: true,
      children: [],
    },
    {
      id: "loans",
      name: "Loans Management",
      bool: false,
      children: [
        // {
        //   id: "",
        //   name: "Brand",
        //   bool: false,
        // },
      ],
    },
    {
      id: "transactions",
      name: "Transactions Management",
      bool: false,
      children: [],
    },
    // {
    //   id: "escrow",
    //   name: "Escrow Management",
    //   bool: false,
    //   children: [],
    // },
    {
      id: "bills",
      name: "Bills Management",
      bool: false,
      children: [],
    },
    {
      id: "users",
      name: "Users Management",
      bool: false,
      children: [],
    },
    {
      id: "admins",
      name: "Admins Management",
      bool: false,
      children: [],
    },
    // {
    //   id: "notifications",
    //   name: "Notifications Management",
    //   bool: false,
    //   children: [],
    // },
    {
      id: "settings",
      name: "Settings",
      bool: false,
      children: [],
    },
    {
      id: "logout",
      name: "Logout",
      bool: false,
      children: [],
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
        // tab.id === tabId ? (tab.bool = true) : (tab.bool = false);
        tab.bool = tab.id === tabId ? true : false;
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