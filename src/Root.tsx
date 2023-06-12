import React from "react";
import { useRecoilState } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { isDartState } from "./Atoms/atoms";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import { ThemeProvider } from "styled-components";

const client = new QueryClient();

function Root() {
  const [isDark, setIsDark] = useRecoilState(isDartState);
  return (
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={isDark ? darkTheme : darkTheme}>
          <GlobalStyle />
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default Root;
