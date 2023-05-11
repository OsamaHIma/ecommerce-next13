"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
export default Providers;
