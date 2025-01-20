import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
  language: "en" | "es";
}

const initialState: UIState = {
  theme: "light",
  language: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<"en" | "es">) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
