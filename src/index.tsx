import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import routers from "./routes/main";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <RouterProvider router={routers} />
    </RecoilRoot>
  </>
);
