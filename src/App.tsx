import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import GlobalStyle from "./styles/Global";

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppRoutes />
    </BrowserRouter>
  );
};