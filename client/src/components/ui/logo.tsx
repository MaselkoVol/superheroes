import {
  DimensionValue,
  Flex,
  Image,
  SpectrumImageProps,
} from "@adobe/react-spectrum";
import logoAsset from "../../assets/logo.png";

export type LogoProps = Omit<SpectrumImageProps, "src"> & {
  size?: DimensionValue;
};

export default function Logo({ size, ...props }: LogoProps) {
  return (
    <Flex width={size} height={size}>
      <Image
        objectFit="contain"
        alt="Logo"
        {...props}
        src={logoAsset}
        width="100%"
        height="100%"
      />
    </Flex>
  );
}
