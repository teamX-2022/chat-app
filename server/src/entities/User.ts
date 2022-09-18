import {prop} from '@typegoose/typegoose'

export class User {
    @prop({required: true})
    firstName: string

    @prop({required: true})
    lastName: string

    @prop({required: true, trim: true, unique: true})
    email!: string

    @prop({required: true, trim: true, unique: true})
    username!: string

    @prop({required: true})
    password!: string

}
