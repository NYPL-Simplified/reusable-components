

export interface LibraryData {
  uuid?: string;
  name?: string;
  short_name?: string;
  settings?: {
    [key: string]: string | string[];
  };
}

export interface LibrarySettingField {
  key: string;
  label: string;
  required?: boolean;
}

export interface LibrariesData {
  libraries: LibraryData[];
  settings?: LibrarySettingField[];
}

export interface LibraryWithSettingsData {
  short_name: string;
  [key: string]: string;
}

export interface SettingData {
  key: string;
  label: string;
  description?: string;
  default?: string | string[];
  required?: boolean;
  randomizable?: boolean;
  type?: string;
  options?: SettingData[];
}
