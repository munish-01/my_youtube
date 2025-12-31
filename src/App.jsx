import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    // all these children will be shown inside Body.jsx where we have used <Outlet />
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      }
    ]
  }
]);

function App() {
  return (
    <Provider store={store}>
    <div>
      <Head />
      <RouterProvider router={appRouter} />
      {/*
       * head
       * body
       * shidebar
       *   menuitems
       * mainContainer
       *   buttonList
       *   videoContanier
       *     videoCard
       */}
    </div>
    </Provider>
  );
}

export default App;
