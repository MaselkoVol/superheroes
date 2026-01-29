export interface CreateSuperheroCommand {
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowerIds?: string[]; // array of superpower ids
  newSuperpowers?: string[]; // array of new superpower values
  imagePaths: string[]; // array of image names
}

export interface UpdateSuperheroCommand {
  id: string;
  nickname?: string;
  realName?: string;
  originDescription?: string;
  catchPhrase?: string;
  superpowerIds?: string[];
  newSuperpowers?: string[];
  imageIds?: string[];
  newImagePaths?: string[];
}

export interface DeleteSuperheroCommand {
  id: string;
}

export interface FindOneSuperheroCommand {
  id: string;
}

export interface FindManySuperheroesCommand {
  nickname?: string;
  superpowers?: string[];
  page: number;
  limit: number;
}
