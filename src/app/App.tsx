import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Counter } from "../features/counter/Counter";
import { AppNotification } from "../features/appNotification/AppNotification";
import { setupStore } from "./store";
import { GameJump } from "../features/gameJump/GameJump";

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
