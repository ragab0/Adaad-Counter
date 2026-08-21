export type LayoutType = "single" | "two-column" | "three-column" | "auto";
export type ThemeMode = "dark" | "light";

export type AvatarType =
  | "sleepy"
  | "jaabooq"
  | "abu-addad"
  | "moallem-addood"
  | "addadgy";
export type CharacterMood =
  | "idle"
  | "increase"
  | "decrease"
  | "reset"
  | "milestone"
  | "rapid"
  | "bored";

export interface Counter {
  id: string;
  name: string;
  value: number;
  increment: number;
  decrement: number;
  order: number;
  createdAt: number;
}

export interface AppSettings {
  layout: LayoutType;
  selectedMascot: string;
  globalIncrement: number;
  globalDecrement: number;
  floatingMode: boolean;
  theme: ThemeMode;
}

export interface CharacterPower {
  name: string;
  nameAr: string;
  descriptionAr: string;
  iconName: "zap" | "eye" | "bar-chart" | "brain" | "rocket";
}

export interface CharacterAnimations {
  idle: string;
  increase: string;
  decrease: string;
  reset: string;
  milestone: string;
  rapid: string;
  bored: string;
}

export interface CharacterQuotes {
  increase: string;
  decrease: string;
  reset: string;
  milestone: string;
  rapid: string;
  bored: string;
  interaction: string;
}

export interface Mascot {
  id: string;
  name: string;
  color: string;
  avatar: AvatarType;
  mood: string;
  personalityAr: string;
  personalityLabel: string;
  lore: string;
  power: CharacterPower;
  quotes: CharacterQuotes;
  animations: CharacterAnimations;
  milestones: number[];
}
