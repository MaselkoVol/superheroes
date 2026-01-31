import { FieldErrors } from "./error";
import { Image } from "./image";
import { Superpower } from "./superpower";

export type SuperheroShort = {
  id: string;
  nickname: string;
  imageId: string;
  imagePath: string;
};

export type SuperheroShortMetadata = {
  page: number;
  limit: number;
  total: number;
};

export type SuperheroShortResponse = {
  data: SuperheroShort[];
  metadata: SuperheroShortMetadata;
};

export type GetSuperheroesParams = {
  nickname?: string;
  superpowers?: string[];
  page: number;
  limit: number;
};

export type SuperheroesControl = {
  nickname: string;
  page: number;
  limit: number;
  onNicknameChanged: (nickname: string) => void;
  onPageChanged: (page: number) => void;
};

export type SuperheroInfo = {
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
};

export type SuperheroInfoControl = {
  data: SuperheroInfo;
  errors: FieldErrors;
  validate: () => boolean;
  onInfoChanged: (info: SuperheroInfo) => void;
  onBlur: () => void;
};

export type createSuperheroPayload = {
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  images: File[];
  superpowerIds: string[];
  newSuperpowers: string[];
};

export type Superhero = {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowers: Superpower[];
  images: Image[];
};

export type DeleteSuperheroControl = {
  onDeleted: () => void;
  isDeleting: boolean;
  error: Error | null;
};

export type updateSuperheroPayload = {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  imageIds: string[];
  newImages: File[];
  superpowerIds: string[];
  newSuperpowers: string[];
};
