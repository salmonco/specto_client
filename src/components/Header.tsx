import { Pressable, View } from "react-native";
import { CustomText as Text } from "../components/CustomText";
import Close from "../../assets/images/close.svg";

interface HeaderBase {
  label: string;
  closeCallbackFn: () => void;
  rightText?: string;
  rightCallbackFn?: () => void;
}
function Header({
  label,
  closeCallbackFn,
  rightText,
  rightCallbackFn,
}: Readonly<HeaderBase>) {
  return (
    <View className="flex-row items-center py-[10] px-[20] border-b border-b-[#ECEBEB]">
      <View className="flex-1">
        <Pressable onPress={closeCallbackFn}>
          <Close className="w-[19] h-[19]" />
        </Pressable>
      </View>
      <View className="flex-1 items-center">
        <Text>{label}</Text>
      </View>
      <View className="flex-1 items-end">
        <Pressable onPress={rightCallbackFn}>
          <Text className="text-[#0094FF]">{rightText ?? ""}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Header;
