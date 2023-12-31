import { type } from 'os';
import { Channel } from './Channel';
import { UserType } from './User';

export type Invitation = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isReceiverOnline: boolean;
    status: string;
    sender: UserType;
    senderId: number;
    receiver: UserType;
    receiverId: number;
    channel: Channel;
    channelId: number;
    isGame: boolean;
    roomName: string | null;
};

export type FriendRequest = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isReceiverOnline: boolean;
    status: string;
    sender: UserType;
    senderId: number;
    receiver: UserType;
    receiverId: number;
};

export type gameinvitdata = {
    roomName: string;
    id : number;
}
