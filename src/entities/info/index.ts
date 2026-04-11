export { InfoService } from "./api/info.service";
export type {
  CorporationInfo,
  Hours,
  InfoLink,
  ScheduleEntry,
  UpdateInfoRequest,
  Weekday,
} from "./api/info.service.types";
export { CONTACT_SERVICES } from "./config/contact.config";
export type {
  ContactService,
  ContactServiceLink,
  ContactServiceSchedule,
} from "./model/contact.model";
export {
  convertEmailsToDto,
  convertPhonesToDto,
  getEmailFromDto,
  getPhonesFromDto,
  getSitesFromDto,
  type ContactInfo,
} from "./model/converters";
export { InfoStore } from "./store/info.store";
