export interface IDataElement {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type Data = IDataElement[];

export interface ICardItemProps {
  character: IDataElement | ICustomDataElement;
  onClick?: VoidFunction;
  showFullInfo: boolean;
}

export interface ICardListProps {
  characters: Data | CustomData;
}

export interface ILocalStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
  getAll(): Record<string, string>;
}

export interface IFormValues {
  name: string;
  status: boolean;
  species: string;
  gender: boolean;
  birthday: string;
  avatar: FileList;
  agreement: boolean;
}

export interface IButtonProps {
  classes: {
    container: string;
    button: string;
    message?: string;
  };
  type: 'button' | 'reset' | 'submit';
  buttonText: string;
  isDisabled?: boolean;
  showMessage?: boolean;
  message?: string;
  onClick?: VoidFunction;
}

export interface ICustomDataElement {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  birthDate: string;
  avatar: string;
}

export type CustomData = ICustomDataElement[];

export interface IFormProps {
  addNewCard: (card: ICustomDataElement) => void;
}

export enum Numbers {
  Zero = 0,
  One,
  Two,
  Four = 4,
}

export interface ISearchBarProps {
  updateMainPageState: (serachParameter?: string) => Promise<void>;
}

export interface IDataFromApi {
  info: {
    count: number | null;
    pages: number;
    next: string | null;
    prev: number | null;
  };
  results: Data;
}

export interface IRequestParameters {
  name: string;
  page: number;
}

export type PortalProps = {
  children: React.ReactNode;
};

export type VoidFunction = () => void;
