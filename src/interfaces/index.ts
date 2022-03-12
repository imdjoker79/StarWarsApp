import {PieChartData} from 'react-native-svg-charts';

export type Language =
  | {code: 'id'; name: 'Indonesia'}
  | {code: 'en'; name: 'English'};

export interface TranslatableText {
  en: string;
  id: string;
}

export interface AuthProps {
  email?: string;
  password?: string;
}

export interface AuthInitialState extends loaderData {
  status?: number;
  data: DataUserItem;
  error: undefined | any;
}

export interface DataUserItem {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  jobTitle?: string;
  imageUrl?: string;
}

export interface RegisterBodyProps extends DataUserItem {
  confirmPassword: string;
}

export interface LabelsProps {
  slices: {
    pieCentroid: string;
    labelCentroid: string;
    data: PieChartData;
  }[];
}

export interface DataUser extends loaderData {
  status: number;
  message?: string | any;
  data: DataUserItem[];
}

export interface loaderData {
  isLoading: boolean;
}
