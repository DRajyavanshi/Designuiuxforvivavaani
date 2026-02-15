import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Interview } from "./pages/Interview";
import { Results } from "./pages/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "upload", Component: Upload },
      { path: "interview/:sessionId", Component: Interview },
      { path: "results/:sessionId", Component: Results },
    ],
  },
]);
