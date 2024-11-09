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

const categories = [
  { name: "전체", icon: AllIcon },
  { name: "경제", icon: EconomyIcon },
  { name: "정치", icon: PolicyIcon },
  { name: "사회", icon: SocietyIcon },
  { name: "생활/문화", icon: LifeIcon },
  { name: "IT/과학", icon: ITIcon },
  { name: "세계", icon: WorldIcon },
];

const Menubar: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);

  return (
    <S.Container>
      {categories.map((category) => (
        <S.CategoryButton
          key={category.name}
          active={category.name === activeCategory}
          onClick={() => setActiveCategory(category.name)}>
          <Image
            src={category.icon}
            alt={`${category.name} icon`}
            width={16}
            height={16}
          />
          <span>{category.name}</span>
        </S.CategoryButton>
      ))}
    </S.Container>
  );
};

export default Menubar;
