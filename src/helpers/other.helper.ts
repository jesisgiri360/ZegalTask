// import * as CryptoJS from "crypto-js";
// import * as chance from "chance";
// import * as jwt from "jsonwebtoken";
// import * as SshPK from "sshpk";
// import * as dateFns from "date-fns";
// import { format } from "date-fns";
// import { DEFAULTS, HASHING, secret_key } from "src/config/CONSTANTS";
// import RunTimeException from "src/exceptions/RunTimeException";
// import * as bcrypt from "bcrypt";
// import { getConnectionManager } from "typeorm";
// import axios from "axios";
// import _ from "lodash";
// import qs from "qs";

// export const validateData = (
//   issueAuthorityTypeCode: string,
//   issueOfficeTypeCode: number
// ) => {
//   const authorityTypeCode = parseInt(issueAuthorityTypeCode);

//   //authority type code  for district, province and state
//   const arr = [1, 2, 4];
//   if (arr.includes(authorityTypeCode) && !issueOfficeTypeCode) {
//     throw new RunTimeException(400, "cannotProceed", "Office Type is Required");
//   }
// };

// export const encrypt = (data: any): string => {
//   const payload = typeof data === "object" ? JSON.stringify(data) : data;
//   return CryptoJS.AES.encrypt(payload, secret_key).toString();
// };

// export const decrypt = (data: string, secretKey?: string): any => {
//   const bytes = CryptoJS.AES.decrypt(data, secretKey || secret_key);
//   const originalText = bytes.toString(CryptoJS.enc.Utf8);
//   return originalText;
// };

// export const hashPassword = async (password: string, userSalt?: string) => {
//   const salt = await bcrypt.genSalt(HASHING.SALTROUNDS);

//   const hashedPassword = await bcrypt.hash(password, userSalt || salt);

//   return { hashedPassword, salt: userSalt || salt };
// };

// export const comparePassword = async (
//   userInputPassword: string,
//   passwordFromDB: string
// ) => {
//   return await bcrypt.compare(userInputPassword, passwordFromDB);
// };

// export const generateRandomString = (
//   prefix: string,
//   length: number
// ): string => {
//   return `${prefix.toUpperCase()}-${chance().string({
//     alpha: true,
//     numeric: true,
//     casing: "upper",
//     length: length,
//   })}`;
// };
// export const generateRandomUUID = (): string => {
//   return chance().guid({ version: 5 });
// };

// export const generateRandomNumber = (length: number): number => {
//   return Math.floor(
//     Math.pow(10, length - 1) +
//       Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
//   );
// };

// export const signJwt = (data: any) => {
//   return jwt.sign(data, secret_key);
// };

// export const parseFilters = (params: PaginationInterface) => {
//   const { PAGINATION } = DEFAULTS;
//   const { page: pages, size, sort } = params;
//   const page = pages && !isNaN(pages) ? Math.abs(pages) : PAGINATION.page;
//   const limit = size && !isNaN(size) ? Math.abs(size) : PAGINATION.size;
//   const sortVal: "DESC" | "ASC" = sort
//     ? sort === "desc"
//       ? "DESC"
//       : "ASC"
//     : "DESC";
//   const offset = (page - 1) * limit;
//   return { page, limit, offset, sortVal };
// };

// export const getFileExtension = (fileName: string) => {
//   return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
// };

// // export const imageSizeFilter = (req, file): { fileSize: number } => {
// //   console.log(req.body.docTypeId);
// //   return { fileSize: 1 };
// // };
// export const imageFileFilter = (req, file, callback) => {
//   callback(null, true);
// };

// // export const tokenDataToSave = (tokenData: TokenData): TokenDataToSave => {
// //   return {
// //     customerCode: tokenData.customerCode,
// //     tranUserId: +tokenData.userId,
// //     status: 0,
// //   };
// // };

// export const getPaginatedResponse = (
//   count: any,
//   data: any,
//   paginationParams: PaginationParams,
//   escapePg?: boolean
// ) => {
//   const { limit, offset } = paginationParams;
//   const total = !isNaN(count)
//     ? count
//     : count?.length
//     ? parseInt(count[0].count)
//     : 0;
//   let totalPages = Math.ceil(total / limit);
//   let hasNext = total - offset > limit;
//   if (escapePg) {
//     totalPages = 1;
//     hasNext = false;
//   }
//   return {
//     records: data,
//     totalRecords: total,
//     totalPages: totalPages,
//     hasNext,
//   };
// };

// export const requestThirdPartyAPI = (
//   url: string,
//   headers: any | null,
//   body: any,
//   requestMethod: string
// ): any => {
//   try {
//     const Options: any = headers
//       ? {
//           method: requestMethod && requestMethod === "POST" ? "POST" : "GET",
//           url: url,
//           data: body,
//           headers: headers,
//         }
//       : {
//           method: requestMethod && requestMethod === "POST" ? "POST" : "GET",
//           url: url,
//           data: body,
//           headers: { "content-type": "application/json" },
//         };
//     if (
//       headers &&
//       _.has(headers, "Content-Type") &&
//       headers["Content-Type"].includes("x-www-form-urlencoded")
//     )
//       Options.data = qs.stringify(Options.data);
//     return new Promise((resolve, reject) => {
//       axios(Options)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
