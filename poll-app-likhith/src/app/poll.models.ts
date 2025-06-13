export interface Option {
    optionText: string;
    voteCount: number;
}

export interface Poll {
    id: number;
    question: string;
    options: Option[];
}
