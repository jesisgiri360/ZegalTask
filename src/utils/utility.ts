import { identityServer } from "@config/url";
import * as jwks from "jwks-rsa";

export const randomString = (length = 32): string => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result: string = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export const stringToBase64 = (data: string) => {
  const base64encoded = Buffer.from(data).toString("base64");
  return base64encoded;
};

export const base64ToString = (data) => {
  const base64decoded = Buffer.from(data, "base64").toString("ascii");
  return base64decoded;
};

export async function getKey(header: any, callback?: any) {
  // const client = jwksClient({ jwksUri: identityServer.jwksUri });
  const client = jwks({ jwksUri: identityServer.jwksUri });
  // client.getSigningKey(header.kid, function (err: Error, key: any) {
  //   const signingKey = key?.publicKey || key?.rsaPublicKey;
  //   callback(null, signingKey);
  // });

  const kid = header.kid;
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();
  return signingKey;
}
