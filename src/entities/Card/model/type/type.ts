import {MRT_RowData} from "material-react-table";

export interface AllCardsI {
    id: number;
    word: string;
    translation: string;
    example: string;
    category: string;
    difficulty: number;
    audio: string;
    image: string;
    isFront: boolean;
}

export interface CardsState extends MRT_RowData {
    cards: MRT_RowData[] ;
    setCards: (cards: MRT_RowData[] ) => void
    setWord: (word: string) => void
    setTranslation: (translation: string) => void
    setExample: (example: string) => void
    setCategory: (category: string) => void
    setDifficulty: (difficulty: number) => void
    setAudio: (audio: string) => void
    setImage: (image: string) => void
    setIsFront: (isFront: boolean) => void
}

export interface CardsActions {
    setCards: (cards: AllCardsI) => void
    setWord: (word: string) => void
    etTranslation: (translation: string) => void
    setExample: (example: string) => void
    setCategory: (category: string) => void
    setDifficulty: (difficulty: number) => void
    setAudio: (audio: string) => void
    setImage: (image: string) => void
    setIsFront: (isFront: boolean) => void

}