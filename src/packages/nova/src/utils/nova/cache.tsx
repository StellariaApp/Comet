import CONFIG from '../../config';
import NovaClient from './client';

export type PropsCacheServer = {
  style_id: string;
  api_key: string;
};

export type Style = {
  name: string;
  style: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

const GetStyles = async (props: PropsCacheServer) => {
  const { style_id, api_key } = props;
  if (!style_id || !api_key) return null;

  const res = await fetch(CONFIG?.GET_URL(`/style/${style_id}`), {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': api_key
    },
    cache: 'no-cache'
  });
  const styles = (await res.json()) as Style;
  return styles;
};

export const NovaCache = async (props: PropsCacheServer) => {
  const { style_id, api_key } = props;
  if (!style_id || !api_key) return null;

  const style = await GetStyles(props);

  return (
    <>
      <style
        id={style?.id}
        data-emotion="nova"
        dangerouslySetInnerHTML={{ __html: style?.style ?? '' }}
      />
      <NovaClient props={props} style={style} />
    </>
  );
};
