export interface IQuestions {
    idQuestion: number;
    nameQuestion: string;
    answers: IAnswers[];
}

export interface IAnswers {
    idAnswer: number;
    nameAnswer: string;
}
