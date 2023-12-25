// Change source when logo is updated
import Logo from "../assets/logo_actilib.svg";
import { Image } from "react-native";

const LogoTitle = () => {
  return (
    <Logo
      style={{
        width: 200,
        height: 35,
        resizeMode: "cover",
      }}
    />
  );
};

export default LogoTitle;
