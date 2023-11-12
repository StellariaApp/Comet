import { iconsBrands } from '../../assets/icons/brands';
import { iconsRegular } from '../../assets/icons/regular';
import { iconsSolid } from '../../assets/icons/solid';

type Icon = [
  width: number,
  height: number,
  paths: [number, string][],
  unicode: string,
  svgPathData: string
];

export type EnumIconType = 'brands' | 'regular' | 'solid';
export type EnumIcon =
  | keyof typeof iconsBrands
  | keyof typeof iconsRegular
  | keyof typeof iconsSolid;

const Icons = {
  brands: iconsBrands,
  regular: iconsRegular,
  solid: iconsSolid
};

export const getIcon = (type?: EnumIconType, name?: EnumIcon) => {
  const iconType = Icons[type ?? 'solid'] as unknown as Record<string, Icon>;
  const icon = iconType[name ?? 'trash-alt'];
  const [width, height, _, __, svgPathData] = icon;

  const viewBox = `0 0 ${width} ${height}`;

  const path = <path d={svgPathData} />;

  return {
    viewBox,
    paths: path
  };
};
