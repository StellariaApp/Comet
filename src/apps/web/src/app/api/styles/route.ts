import { Styles } from '../../../store/styles';

export type InputStyles = {
  styles: string;
};
export const POST = async (request: Request) => {
  const { styles } = (await request.json()) as InputStyles;
  Styles.set('styles', styles);
  return Response.json({
    styles: Styles.get('styles')
  });
};
