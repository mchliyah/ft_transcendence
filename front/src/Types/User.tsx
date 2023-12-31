import { FriendRequest } from './Invitation';

export type UserType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    isEmailConfirmed: boolean;
    username: string;
    hash: string;
    avatar: string;
    login: string;
    isPasswordRequired: boolean;
    is2FaEnabled: boolean;
    twoFaSecret: string;
    is2FaVerified: boolean;
    status: string;
    blocked: UserType[];
    matchnumber: number;
    matchwin: number;
    matchlose: number;
    win_rate: number;
    lp: number;
    g_rank: number;
    sentFriendRequests: FriendRequest[];
};
