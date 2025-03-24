import React from "react";
import { useRecoilState } from "recoil";
import { activeCategoryState } from "../../atoms/activeCategoryState";
import * as S from "./Menubar.style";
import EconomyIcon from "@public/category/economy.png";
import PolicyIcon from "@public/category/policy.png";
import SocietyIcon from "@public/category/society.png";
import LifeIcon from "@public/category/life.png";
import ITIcon from "@public/category/it.png";
import WorldIcon from "@public/category/world.png";
import AllIcon from "@public/category/all.png";
import Image from "next/image";
import { CategoryType, MenubarCategoryMap, reverseCategoryMap } from "../../types/category";

const categories = [
  { name: CategoryType.ALL, displayName: MenubarCategoryMap[CategoryType.ALL], icon: AllIcon },
  { name: CategoryType.ECONOMY, displayName: MenubarCategoryMap[CategoryType.ECONOMY], icon: EconomyIcon },
  { name: CategoryType.POLITICS, displayName: MenubarCategoryMap[CategoryType.POLITICS], icon: PolicyIcon },
  { name: CategoryType.SOCIETY, displayName: MenubarCategoryMap[CategoryType.SOCIETY], icon: SocietyIcon },
  { name: CategoryType.LIFESTYLE_CULTURE, displayName: MenubarCategoryMap[CategoryType.LIFESTYLE_CULTURE], icon: LifeIcon },
  { name: CategoryType.IT_SCIENCE, displayName: MenubarCategoryMap[CategoryType.IT_SCIENCE], icon: ITIcon },
  { name: CategoryType.WORLD, displayName: MenubarCategoryMap[CategoryType.WORLD], icon: WorldIcon },
];

const Menubar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useRecoilState(activeCategoryState);

  const handleCategoryClick = (category: CategoryType) => {
    setActiveCategory(MenubarCategoryMap[category]);
  };

  return (
    <S.Container>
      {categories.map((category) => (
        <S.CategoryButton
          key={category.name}
          active={MenubarCategoryMap[category.name] === activeCategory}
          onClick={() => handleCategoryClick(category.name)}
        >
          <Image src={category.icon} alt={`${category.displayName} icon`} width={16} height={16} />
          <span>{category.displayName}</span>
        </S.CategoryButton>
      ))}
    </S.Container>
  );
};

export default Menubar;
