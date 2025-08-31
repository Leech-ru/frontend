import { InfoLink } from "@/entities/info";

const PHONE_START_WITH = "tel:";
const EMAIL_START_WITH = "mailto:";

export interface ContactInfo {
  value: string;
  disabled: boolean;
}

/**
 * @summary Функция, которая получает телефоны массивом строк и преобразует в строку+ссылку для бэкенда
 */
export function convertPhonesToDto(phones: string[]): InfoLink[] {
  return phones.map(
    (phone): InfoLink => ({
      label: phone,
      href: `tel:${phone}`,
    }),
  );
}

/**
 * @summary Функция, которая преобразует ответ с бэкенда в телефоны компании
 */
export function getPhonesFromDto(infoLinks: InfoLink[]): ContactInfo[] {
  return infoLinks
    .filter((infoLink) => infoLink.href.startsWith(PHONE_START_WITH))
    .map((phone) => ({
      value: phone.label,
      disabled: true,
    }));
}

/**
 * @summary Берет почты массивом строк и преобразует в строку+ссылку для бэкенда
 */
export function convertEmailsToDto(emails: string[]): InfoLink[] {
  return emails.map((email) => ({
    label: email,
    href: `mailto:${email}`,
  }));
}

/**
 * @summary Функция, которая преобразует ответ с бэкенда в почту компании
 */
export function getEmailFromDto(infoLinks: InfoLink[]): ContactInfo {
  return infoLinks
    .filter((infoLink) => infoLink.href.startsWith(EMAIL_START_WITH))
    .map((email) => ({
      value: email.label,
      disabled: true,
    }))[0];
}

/**
 * @summary Функция, которая преобразует ответ с бэкенда в сайты компании
 */
export function getSitesFromDto(infoLinks: InfoLink[]): InfoLink[] {
  return infoLinks.filter(
    (infoLink) =>
      !infoLink.href.startsWith(EMAIL_START_WITH) &&
      !infoLink.href.startsWith(PHONE_START_WITH),
  );
}
