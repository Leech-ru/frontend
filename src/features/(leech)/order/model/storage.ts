import { LEECH_ORDER_FORM_VALUE_LOCAL_STORAGE_KEY } from "../config";

export const getLeechOrderFormValue = <T extends object>(): T | null => {
  try {
    const item = localStorage.getItem(LEECH_ORDER_FORM_VALUE_LOCAL_STORAGE_KEY);

    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T | null;
  } catch {
    return null;
  }
};

export const saveLeechOrderFormValue = <T extends object>(value: T): void => {
  try {
    localStorage.setItem(
      LEECH_ORDER_FORM_VALUE_LOCAL_STORAGE_KEY,
      JSON.stringify(value),
    );
  } catch {}
};

export const clearLeechOrderFormValue = (): void => {
  try {
    localStorage.removeItem(LEECH_ORDER_FORM_VALUE_LOCAL_STORAGE_KEY);
  } catch {}
};
