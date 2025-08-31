export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Hours {
  open: string;
  close: string;
}

export interface ScheduleEntry {
  weekday: Weekday;
  hours: Hours;
}

export interface InfoLink {
  label: string;
  href: string;
}

export interface CorporationInfo {
  heading: string;
  description: string;
  fluid?: boolean;
  schedule?: ScheduleEntry[];
  links?: InfoLink[];
}

export interface UpdateInfoRequest {
  heading?: string;
  description?: string;
  fluid?: boolean;
  schedule?: ScheduleEntry[];
  links?: InfoLink[];
}
