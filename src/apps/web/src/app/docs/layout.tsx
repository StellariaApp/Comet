import type { Metadata } from 'next';
import { findDictionary } from '../../utils/findDictionary';
import SideBarDocs from '../../components/complex/sidebars/docs';

type Props = {
  children: React.ReactNode;
};

type MetadataProps = {
  params: {
    path?: string[];
  };
};

export const generateMetadata = (props: MetadataProps) => {
  const { params } = props;
  const { path } = params;

  const getPath = ['', ...(path ?? [])];

  const dictionary = findDictionary(getPath as string[]);

  const title = dictionary?.title ?? 'Docs';
  const description = dictionary?.description ?? 'Docs';

  return {
    title,
    description
  } as Metadata;
};

const RootLayout = (props: Props) => {
  const { children } = props;

  return (
    <main lang="en">
      <SideBarDocs />
      {children}
    </main>
  );
};

export default RootLayout;
