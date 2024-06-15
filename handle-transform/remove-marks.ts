import { kebabCase } from "lodash";

export const removeMarks = (input: string): string => {
  const normalized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const withoutSpecialChars = normalized.replace(/[^\w\s]/gi, "");
  const result = withoutSpecialChars.toLowerCase();

  return kebabCase(result);
};
