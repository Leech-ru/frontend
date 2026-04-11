export interface FooterItem {
  title: string;
  routerLink?: string;
}

export interface FooterSection {
  title: string;
  items: FooterItem[];
}

export interface FooterContent {
  sections: FooterSection[];
  contacts: Contacts;
}

export interface Contacts {
  tel: string;
  email: string;
}

export interface FooterSocial {
  title: string;
  icon: string;
  link: string;
}
