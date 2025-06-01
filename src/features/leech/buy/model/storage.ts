import { LEECH_BUY_FORM_VALUE_LOCAL_STORAGE_KEY } from "../config";

export const getLeechBuyFormValue = <T extends object>(): T | null => {
  const item = localStorage.getItem(LEECH_BUY_FORM_VALUE_LOCAL_STORAGE_KEY);

  if (item === null) {
    return null;
  }

  return JSON.parse(item) as T | null;
};

export const saveLeechBuyFormValue = <T extends object>(value: T): void => {
  localStorage.setItem(
    LEECH_BUY_FORM_VALUE_LOCAL_STORAGE_KEY,
    JSON.stringify(value),
  );
};

export const clearLeechBuyFormValue = (): void => {
  localStorage.removeItem(LEECH_BUY_FORM_VALUE_LOCAL_STORAGE_KEY);
};
