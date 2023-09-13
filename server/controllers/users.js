
import User from '../models/User.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

export const googleSignin = async (req, res) => {

  const { tokens } = await oAuth2Client.getToken(req.body.data); // exchange code for tokens
  console.log(tokens);
  oAuth2Client.setCredentials({ tokens });

  const result = await verifyToken(tokens?.id_token);
  console.log(result);
  const { name, email, picture, sub, iss, email_verified } = result;

  if (email_verified) {
    const existingUser = await User.findOne({ _id: sub });
    try {
      if (!existingUser) {

        const newUser = await User.create({ _id: sub, name, email, imgUrl: picture });

        res.status(201).json({user: newUser, token: tokens?.access_token})
      }
      else {
        res.status(200).json({user: existingUser, token: tokens?.access_token})
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  else {
    return res.status(400).json({ message: "Google login failed try again" });
  }
}

export const verifyToken = async (id_token) => {
  try {
    const result = await oAuth2Client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = result.getPayload();
    return payload;
  } catch (error) {
    console.log(error);
  }
}