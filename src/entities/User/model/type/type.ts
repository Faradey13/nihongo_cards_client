

export interface IUser {
    id: number;
    email: string;
    isActivated: boolean;
    name?: string;
    avatar?: string;
    banned?: boolean;
    banReason?: string;
    lastLessonDate?: Date;
    newLimit: number;
    oldLimit: number;
    timeForCard?: number;
    roles: string

}

