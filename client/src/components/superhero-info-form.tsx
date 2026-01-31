import { TextArea, TextField } from "@adobe/react-spectrum";
import { SuperheroInfo } from "../common/types/superhero";

export type SuperheroInfoFormParams = {
  data: SuperheroInfo;
  onInfoChanged: (info: SuperheroInfo) => void;
  onBlur: () => void;
};

export function SuperheroInfoForm({
  data,
  onInfoChanged,
  onBlur,
}: SuperheroInfoFormParams) {
  return (
    <>
      <TextField
        label="Nickname"
        name="nickname"
        value={data.nickname}
        onChange={(value) => onInfoChanged({ ...data, nickname: value })}
        onBlur={onBlur}
      />

      <TextField
        label="Real name"
        name="realName"
        value={data.realName}
        onChange={(value) => onInfoChanged({ ...data, realName: value })}
        onBlur={onBlur}
      />
      <TextArea
        label={"Origin description"}
        name="originDescription"
        value={data.originDescription}
        onChange={(value) =>
          onInfoChanged({ ...data, originDescription: value })
        }
        onBlur={onBlur}
      />
      <TextArea
        label={"Catch phrase"}
        name="catchPhrase"
        value={data.catchPhrase}
        onChange={(value) => onInfoChanged({ ...data, catchPhrase: value })}
        onBlur={onBlur}
      />
    </>
  );
}
