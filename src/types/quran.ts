export interface Verse {
  number: number;
  text: string;
  juz?: number;
  page?: number;
  hizb?: number;
  rub?: number;
  manzil?: number;
  ruku?: number;
  sajda?: boolean | string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Makki" | "Madani";
  numberOfAyahs: number;
  verses: Verse[];
  bismillahPre?: boolean;
}

export interface QuranReadingPrefs {
  fontSize: number;
  lineHeight: number;
  theme: "light" | "dark" | "sepia";
  readingWidth: "narrow" | "medium" | "wide";
  showVerseNumbers: boolean;
}
