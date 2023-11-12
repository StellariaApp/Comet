import { Styles } from '../../../store/styles';

export type InputStyles = {
  styles: string[];
};
export const POST = async (request: Request) => {
  const { styles } = (await request.json()) as InputStyles;
  styles.forEach((style) => {
    Styles.set(style, style);
  });
  return Response.json({
    styles: Array.from(Styles.values())
  });
};
