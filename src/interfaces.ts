export interface LibraryData {
  uuid: string;
  name: string;
  short_name: string;
  id: number;
  registry_stage: string;
  library_stage: string;
}

export interface LibrariesData {
  libraries: LibraryData[];
}
