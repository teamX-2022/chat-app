import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../entities/User";
import { FriendRequest } from "../entities/FriendRequest";
import { Message } from "../entities/Message";
import { Conversation } from "../entities/Conversation";
import { Friend } from "../entities/Friend";
import { Member } from "../entities/Member";

export const UserModel = getModelForClass(User);
export const FriendRequestModel = getModelForClass(FriendRequest);
export const MessageModel = getModelForClass(Message);
export const ConversationModel = getModelForClass(Conversation);
export const FriendModel = getModelForClass(Friend);
export const MemberModel = getModelForClass(Member);
