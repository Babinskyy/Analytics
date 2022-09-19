import { IonSpinner } from "@ionic/react";

type ContainerProps = {
  height: number;
  width?: number;
}

const LoaderContainer: React.FC<ContainerProps> = ({ height, width }) => {
  return (
    <div style={{
      width: width ? width + "px" : "100%",
      height: height + "px",
      position: "relative"
    }}>
      <IonSpinner name="crescent" style={{
      position: "absolute",
      right: "calc(50% - 14px)",
      top: "calc(50% - 14px)",
      width: "100px",
      height: "100px",
      color: "rgb(82, 96, 255)"
    }} />
    </div>
  );
};

export default LoaderContainer;
