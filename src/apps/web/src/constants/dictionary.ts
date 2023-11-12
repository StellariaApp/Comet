export type DictionaryItem = {
  id: string;
  title: string;
  description?: string;
  path?: string;
  slug?: string;
  icon?: string;
  paths?: DictionaryItem[];
};

export const Dictionary = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Get started with the basics',
    path: '',
    paths: [
      {
        id: 'getting-started-introduction',
        title: 'Introduction',
        description: 'Introduction to the project',
        path: '/introduction'
      },
      {
        id: 'getting-started-installation',
        title: 'Installation',
        description: 'Installation guide',
        path: '/installation'
      },
      {
        id: 'getting-started-theming',
        title: 'Theming',
        description: 'Theming guide',
        path: '/theming'
      },
      {
        id: 'getting-started-components',
        title: 'Components',
        description: 'Components guide',
        path: '/components'
      },
      {
        id: 'getting-started-changelog',
        title: 'Changelog',
        description: 'Changelog of the project',
        path: '/changelog'
      },

      {
        id: 'getting-started-faq',
        title: 'FAQ',
        description: 'Frequently asked questions',
        path: '/faq'
      }
    ]
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Installation guide',
    path: '/installation',
    paths: [
      {
        id: 'installation-nextjs',
        title: 'NextJS',
        description: 'Installation guide for NextJS',
        path: '/nextjs'
      }
    ]
  },
  {
    id: 'theming',
    title: 'Theming',
    description: 'Theming guide',
    path: '/theming',
    paths: [
      {
        id: 'theming-nextjs',
        title: 'NextJS',
        description: 'Theming guide for NextJS',
        path: '/nextjs'
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    description: 'Components guide',
    path: '/components',
    paths: [
      {
        id: 'components-accordion',
        title: 'Accordion',
        description: 'Accordion component',
        path: '/accordion'
      },
      {
        id: 'components-button',
        title: 'Button',
        description: 'Button component',
        path: '/button'
      },
      {
        id: 'components-toast',
        title: 'Toast',
        description: 'Toast component',
        path: '/toast'
      }
    ]
  }
] as DictionaryItem[];
