import { createToken, sendRefreshToken } from './../utils/auth';
import { UserAuthPayload } from './../types/UserAuthPayload';
import express from 'express';
import { verify, Secret } from 'jsonwebtoken';
import UserModel from '../models/UserModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];
    if (!refreshToken) return res.sendStatus(401);

    try {
        const decodedUser = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as UserAuthPayload;
        const existingUser = await UserModel.findOne({ _id: decodedUser.userId });

        if (!existingUser || existingUser.tokenVersion !== decodedUser.tokenVersion) return res.sendStatus(401);

        sendRefreshToken(res, existingUser);

        return res.json({
            success: true,
            accessToken: createToken('accessToken', existingUser),
        });
    } catch (error) {
        console.log('ERROR REFRESHING TOKEN', error);
        return res.sendStatus(403);
    }
});
export default router;
