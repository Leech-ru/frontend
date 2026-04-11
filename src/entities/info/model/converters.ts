import { InfoLink } from "../api/info.service.types";

const PHONE_START_WITH = "tel:";
const EMAIL_START_WITH = "mailto:";

export interface ContactInfo {
  value: string;
  disabled: boolean;
}

export function convertPhonesToDto(phones: string[]): InfoLink[] {
  return phones.map(
    (phone): InfoLink => ({
      label: phone,
      href: `tel:${phone}`,
    }),
  );
}

export function getPhonesFromDto(infoLinks: InfoLink[]): ContactInfo[] {
  return infoLinks
    .filter((infoLink) => infoLink.href.startsWith(PHONE_START_WITH))
    .map((phone) => ({
      value: phone.label,
      disabled: true,
    }));
}

export function convertEmailsToDto(emails: string[]): InfoLink[] {
  return emails.map((email) => ({
    label: email,
    href: `mailto:${email}`,
  }));
}

export function getEmailFromDto(infoLinks: InfoLink[]): ContactInfo {
  return infoLinks
    .filter((infoLink) => infoLink.href.startsWith(EMAIL_START_WITH))
    .map((email) => ({
      value: email.label,
      disabled: true,
    }))[0];
}

export function getSitesFromDto(infoLinks: InfoLink[]): InfoLink[] {
  return infoLinks.filter(
    (infoLink) =>
      !infoLink.href.startsWith(EMAIL_START_WITH) &&
      !infoLink.href.startsWith(PHONE_START_WITH),
  );
}
