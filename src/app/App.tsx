import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertNotifications } from "../features/appNotification/AlertNotifications";
import { GameJump } from "../features/gameJump/GameJump";
import { setupStore } from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={setupStore()}>
        <Routes>
          <Route path="/" element={<GameJump />} />
        </Routes>
        <AlertNotifications />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
