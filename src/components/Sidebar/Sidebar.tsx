import React from "react";
import { useRecoilState } from "recoil";
import { activeCategoryState } from "../../atoms/activeCategoryState";
import * as S from "./Sidebar.style";
import Economy from "@public/category/economy.png";
import It from "@public/category/it.png";
import Life from "@public/category/life.png";
import Policy from "@public/category/policy.png";
import World from "@public/category/world.png";
import Society from "@public/category/society.png";
import Image from "next/image";
import { CategoryType, reverseCategoryMap } from "../../types/category";

import EconomySvg from "@public/category/economy.svg";

const categoryMapping = {
  경제: CategoryType.ECONOMY,
  정치: CategoryType.POLITICS,
  사회: CategoryType.SOCIETY,
  "생활/문화": CategoryType.LIFESTYLE_CULTURE,
  "IT/과학": CategoryType.IT_SCIENCE,
  세계: CategoryType.WORLD,
};

const categories = [
  { name: "경제", icon: Economy },
  { name: "정치", icon: Policy },
  { name: "사회", icon: Society },
  { name: "생활/문화", icon: Life },
  { name: "IT/과학", icon: It },
  { name: "세계", icon: World },
];

interface SideBarProps {
  onCategorySelect?: (category: CategoryType) => void;
  selectedCategory?: CategoryType | null;
}

const SideBar: React.FC<SideBarProps> = ({ onCategorySelect, selectedCategory }) => {
  const [activeCategory, setActiveCategory] = useRecoilState(activeCategoryState);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);

    // 만약 onCategorySelect prop이 있다면 호출
    if (onCategorySelect && categoryName in categoryMapping) {
      const categoryType = categoryMapping[categoryName as keyof typeof categoryMapping];
      onCategorySelect(categoryType);
    }
  };

  // 카테고리가 활성화되었는지 체크하는 함수
  const isCategoryActive = (categoryName: string): boolean => {
    if (categoryName === activeCategory) {
      return true;
    }

    if (selectedCategory && categoryName in categoryMapping) {
      const categoryType = categoryMapping[categoryName as keyof typeof categoryMapping];
      return categoryType === selectedCategory;
    }

    return false;
  };

  return (
    <>
      {categories.map((category) => (
        <S.NavItem key={category.name} active={isCategoryActive(category.name)} onClick={() => handleCategoryClick(category.name)}>
          <Image src={category.icon} alt={`${category.name} icon`} />
          <div style={{ width: "10px" }}></div>
          <span>{category.name}</span>
        </S.NavItem>
      ))}
    </>
  );
};

export default SideBar;
