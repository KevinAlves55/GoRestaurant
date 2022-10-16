import { BrowserRouter } from "react-router-dom";
import { FoodProvider } from "./hooks/useFoods";
import { AppRoutes } from "./routes";
import GlobalStyle from "./styles/Global";

export const App = () => {
  return (
    <FoodProvider>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />
      </BrowserRouter>
    </FoodProvider>
  );
};