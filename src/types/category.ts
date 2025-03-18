export enum CategoryType {
  ALL = "ALL",
  ECONOMY = "ECONOMY",
  POLITICS = "POLITICS",
  SOCIETY = "SOCIETY",
  LIFESTYLE_CULTURE = "LIFESTYLE_CULTURE",
  IT_SCIENCE = "IT_SCIENCE",
  WORLD = "WORLD",
}

export const CategoryMap: Record<CategoryType, string> = {
  [CategoryType.ALL]: "전체",
  [CategoryType.ECONOMY]: "경제",
  [CategoryType.POLITICS]: "정치",
  [CategoryType.SOCIETY]: "사회",
  [CategoryType.LIFESTYLE_CULTURE]: "생활/문화",
  [CategoryType.IT_SCIENCE]: "IT/과학",
  [CategoryType.WORLD]: "세계",
};

export const reverseCategoryMap: Record<string, CategoryType> = {
  전체: CategoryType.ALL,
  경제: CategoryType.ECONOMY,
  정치: CategoryType.POLITICS,
  사회: CategoryType.SOCIETY,
  "생활/문화": CategoryType.LIFESTYLE_CULTURE,
  "IT/과학": CategoryType.IT_SCIENCE,
  세계: CategoryType.WORLD,
};
