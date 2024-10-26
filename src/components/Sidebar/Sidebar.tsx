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

import EconomySvg from "@public/category/economy.svg";

const categories = [
  { name: "경제", icon: Economy },
  { name: "정치", icon: Policy },
  { name: "사회", icon: Society },
  { name: "생활/문화", icon: Life },
  { name: "IT/과학", icon: It },
  { name: "세계", icon: World },
];

const SideBar: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);

  return (
    <>
      {categories.map((category) => (
        <S.NavItem
          key={category.name}
          active={category.name === activeCategory}
          onClick={() => setActiveCategory(category.name)}>
          <Image src={category.icon} alt={`${category.name} icon`} />
          <span>{category.name}</span>
        </S.NavItem>
      ))}
    </>
  );
};

export default SideBar;
