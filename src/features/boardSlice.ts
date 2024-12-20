import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tabs: [
		{
			id: "mission",
			bool: true,
		},
		{
			id: "vision",
			bool: true,
		},
		{
			id: "values",
			bool: true,
		},
	],
};

const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
/**
 * Toggles the boolean value of tabs within the state by setting
 * the tab with the matching id to true and others to false.
 *
 * @param state - The current state of the tabs.
 * @param action - Contains the payload with the id of the tab to activate.
 */

        // @ts-expect-error
		tabSwitch(state: any, action: any) {
			const tabId = action.payload;
            state.tabs.forEach((tab: { id: string; bool: boolean }) => {
                // @ts-expect-error
				tab.id === tabId ? (tab.bool = true) : (tab.bool = false);
			});
		},
	},
});

export const { tabSwitch } = boardSlice.actions;

export default boardSlice.reducer;