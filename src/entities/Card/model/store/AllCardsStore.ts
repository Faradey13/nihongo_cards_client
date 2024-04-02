import {create} from "zustand";
import {AllCardsI, CardsState} from "@/entities/Card/model/type/type";
import {MRT_RowData} from "material-react-table";


const useCardsStore = create<CardsState>((set) => ({

    cards: {
        id: 0,
        word: '',
        translation: '',
        example: '',
        category: '',
        difficulty: 0,
        audio: '',
        image: '',
        isFront: false
    } ,
    setCards: (cards: MRT_RowData[]) => set((state) => ( { ...state, cards})),
    setWord: (word: string) => set((state) => ( { ...state, cards: { ...state.cards, word }})),
    setTranslation: (translation: string) => set((state) => ({ ...state, cards: { ...state.cards, translation   } })),
    setExample: (example: string) => set((state) => ( { ...state, cards: { ...state.cards, example }})),
    setCategory: (category: string) => set((state) => ({ ...state, cards: { ...state.cards, category } })),
    setDifficulty: (difficulty: number) => set((state) => ( { ...state, cards: { ...state.cards, difficulty } })),
    setAudio: (audio: string) => set((state) => ({ ...state, cards: { ...state.cards, audio  } })),
    setImage: (image: string) => set((state) => ({ ...state, cards: { ...state.cards, image }})),
    setIsFront: (isFront: boolean) => set((state) => ( { ...state, cards: { ...state.cards, isFront }})),

}));

export default useCardsStore;