import sceneryImg from "../../assets/scenery.png";

import "./index.scss";

interface SceneryProps {
  props: React.ClassAttributes<HTMLImageElement>;
}
export const SceneryComponent = ({ props }: SceneryProps) => (
  <div>
    <img {...props} className="clouds" src={sceneryImg} alt="" />
  </div>
);
