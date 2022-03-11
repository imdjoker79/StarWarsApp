import {PieChartData} from 'react-native-svg-charts';

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
export interface DataUserItem {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  jobTitle?: string;
  imageUrl?: string;
}

export interface LabelsProps {
  slices: {
    pieCentroid: string;
    labelCentroid: string;
    data: PieChartData;
  }[];
}
