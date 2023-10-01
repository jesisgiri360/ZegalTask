import slugify from "slugify";

export const slugifyValue = (value: string): string => {
  return slugify(value, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
};
