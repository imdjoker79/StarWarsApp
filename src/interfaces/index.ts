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

export interface AuthInitialState extends LoaderData {
  status?: number;
  data: DataUserItem;
  error: undefined | any;
}

export interface DataUserItem {
  id?: string | any;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  jobTitle?: string;
  imageUrl?: string;
  groupId?: string[];
}

export interface RegisterBodyProps extends DataUserItem {
  confirmPassword?: string;
}

export interface LabelsProps {
  slices: {
    pieCentroid: string;
    labelCentroid: string;
    data: PieChartData;
  }[];
}

export interface DataUser extends LoaderData {
  status?: number;
  message?: string | any;
  data: DataUserItem[];
}

export interface LoaderData {
  isLoading?: boolean;
}

export interface GroupBodyProps extends LoaderData {
  body: DataGroupItem;
}

export interface memberGroupBodyProps extends LoaderData {
  id: number; // id group
  member: DataUserItem;
}

export interface DataGroup extends LoaderData {
  status: number;
  message: string | any;
  data: DataGroupItem[];
}

export interface DataGroupItem {
  id: string | any;
  title: string;
  description: string;
  member: DataUserItem[];
}

export interface UpdateGroupIdBodyProps {
  idUser: string;
  idGroup: string;
}
