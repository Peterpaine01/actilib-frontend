import profile from "../assets/profile.png";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogoProfile = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Profile");
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
          objectFit: "cover",
        }}
        source={profile}
      />
    </TouchableOpacity>
  );
};

export default LogoProfile;
