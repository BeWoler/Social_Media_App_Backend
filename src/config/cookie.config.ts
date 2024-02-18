import { CookieOptions } from "express";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 1);

export const cookieConfig: CookieOptions = {
  expires: expirationDate,
  sameSite: 'strict',
  httpOnly: false,
};
