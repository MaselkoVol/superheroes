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
