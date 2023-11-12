'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { DictionaryItem } from '../../../constants/dictionary';
import { Dictionary } from '../../../constants/dictionary';

const SideBarDocs = () => {
  return (
    <div>
      {Dictionary.map((e) => (
        <SideBarItem key={e.id} item={e} depth={0} />
      ))}
    </div>
  );
};

type SideBarDocsProps = {
  item: DictionaryItem;
  parent?: DictionaryItem;
  depth: number;
};

const SideBarItem = (props: SideBarDocsProps) => {
  const { item, depth, parent } = props;
  const pathname = usePathname();
  const subPaths = item.paths ?? [];

  const fullPath = `/docs${parent?.path ?? ''}${item.path}`;
  const isPath = pathname === fullPath && parent;

  return (
    <div style={{ paddingLeft: `${depth * 10}px` }}>
      <Link href={fullPath} style={{ color: isPath ? '#ce2525' : '#ffffff' }}>
        {item.title}
      </Link>
      {subPaths.length > 0 &&
        subPaths.map((e) => (
          <SideBarItem
            key={item.id + e.id}
            parent={item}
            item={e}
            depth={depth + 1}
          />
        ))}
    </div>
  );
};

export default SideBarDocs;
