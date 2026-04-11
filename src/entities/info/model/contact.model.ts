export interface ContactServiceLink {
  label: string;
  href: string;
}

export interface ContactServiceSchedule {
  days: string[];
  hours: {
    open: string;
    close: string;
  };
}

export interface ContactService {
  icon: string;
  heading: string;
  schedule?: ContactServiceSchedule[];
  links?: ContactServiceLink[];
  description: string;
  fluid?: boolean | null | undefined;
}
