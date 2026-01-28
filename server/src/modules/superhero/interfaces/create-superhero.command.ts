export interface createSuperheroCommand {
  nickname: string;
  realName: string;
  originDescription: string;
  catchPhrase: string;
  superpowers: string[]; // array of superpower ids
  newSuperpowers: string[]; // array of new superpower values
  images: []; // array of image names
}
