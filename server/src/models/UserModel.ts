import { getModelForClass } from "@typegoose/typegoose";
import { User } from "../entities/User";

export default getModelForClass(User)