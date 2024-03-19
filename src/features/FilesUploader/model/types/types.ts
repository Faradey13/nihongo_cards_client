export interface UploadedFiles {
    name: string;
    type: string;
}
export interface Card {
    word: string;
    translation: string;
    example: string;
    category: string;
    difficulty: number;
    audio: File |null;
    image: File| null;
}