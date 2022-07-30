import { useAppSelector } from "../../app/hooks";
import "./Counter.scss";
import { counterSelector } from "./counterSlice";

export const Counter = () => {
  const counter = useAppSelector(counterSelector);
  return (
    <>
      <div className="counter-container">
        <div className="counter-header">
          <h1 className="counter">{counter}</h1>
        </div>
      </div>
    </>
  );
};
