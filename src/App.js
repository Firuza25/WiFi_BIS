import Login from "./Components/auth/login";
import Register from "./Components/auth/register";
import "./App.css"
import Header from "./Components/header";
import Home from "./Components/home";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import WiFiCoverage from "./Components/coveragePages/wiFiCoverage";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/wiFiCoverage",
      element: <WiFiCoverage/>,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;