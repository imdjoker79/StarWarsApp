export type Language =
  | {code: 'id'; name: 'Indonesia'}
  | {code: 'en'; name: 'English'};

export interface TranslatableText {
  en: string;
  id: string;
}

export interface SignProps {
  email: string;
  password: string;
}
export interface SignUpProps {
  email: string;
  firstName: string;
  lasName: string;
  password: string;
  jobTitle: string;
}
