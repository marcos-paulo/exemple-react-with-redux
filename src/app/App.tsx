import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppNotification } from "../features/appNotification/AppNotification";
import { GameJump } from "../features/gameJump/GameJump";
import { setupStore } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={setupStore()}>
        <Routes>
          <Route path="/" element={<GameJump />} />
        </Routes>
        <AppNotification />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
