import { Pressable, View } from "react-native";
import { CustomText as Text } from "@components/CustomText";
import Contest from "@assets/images/contest.svg";
import Certificate from "@assets/images/certificate.svg";
import Intern from "@assets/images/intern.svg";
import Project from "@assets/images/project.svg";

export const CATEGORY_LABEL: { [key: string]: string } = {
  all: "전체",
  contest: "공모전",
  certificate: "자격증",
  intern: "인턴",
  activity: "대외활동",
  project: "논문/프로젝트",
};
export const SPEC_MENU = Object.entries(CATEGORY_LABEL).map(([k, v]) => {
  return { category: k, label: v };
});
export const SPEC_DATA = [
  {
    id: 1,
    name: "정보처리기사",
    category: "certificate",
    startDate: "2024-03-06",
    endDate: "2024-04-10",
    completed: false,
  },
  {
    id: 2,
    name: "SolidIT 현장실습",
    category: "intern",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: false,
  },
  {
    id: 3,
    name: "ADSP",
    category: "contest",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    id: 4,
    name: "어쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: false,
  },
  {
    id: 5,
    name: "저쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    id: 6,
    name: "저쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
  {
    id: 7,
    name: "저쩌구 논문",
    category: "project",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    completed: true,
  },
];
export const renderIcon = (category: string) => {
  switch (category) {
    case "contest":
      return <Contest />;
    case "certificate":
      return <Certificate />;
    case "intern":
      return <Intern />;
    case "project":
      return <Project />;
  }
};

export interface SpecBase {
  id: number;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}
interface SpecListItemBase {
  item: SpecBase;
  callbackFn?: (id: number) => void;
}
export default function SpecListItem({
  item,
  callbackFn,
}: Readonly<SpecListItemBase>) {
  return (
    <Pressable
      key={item.id}
      className="flex-1 flex-row justify-between items-center gap-[10] border border-[#DEDEDE] p-[16] h-[78] mx-[14] my-[1]"
      style={{ borderRadius: 10 }}
      onPress={() => callbackFn && callbackFn(item.id)}
    >
      <View>
        <View className="flex-row gap-[10] items-center">
          {renderIcon(item.category)}
          <View className="flex-col justify-between">
            <View className="flex-row gap-[7.8] justify-start items-center">
              <Text className="font-[Inter-SemiBold] h-full" size={18}>
                {item.name}
              </Text>
              <Text className="text-[#AEAEB2]" size={10}>
                {CATEGORY_LABEL[item.category]}
              </Text>
            </View>
            <Text className="text-[#636366]" size={12}>
              {item.startDate} ~ {item.endDate}
            </Text>
          </View>
        </View>
      </View>
      <View
        className={`justify-center items-center w-[55] h-[22] ${
          item.completed ? "bg-[#EAF4FF]" : "bg-[#EFEFEF]"
        }`}
        style={{ borderRadius: 4 }}
      >
        <Text
          className={`font-[Inter-SemiBold] ${
            item.completed ? "text-[#0069CF]" : "text-[#9F9F9F]"
          }`}
          size={12}
        >
          {item.completed ? "완료" : "진행중"}
        </Text>
      </View>
    </Pressable>
  );
}
