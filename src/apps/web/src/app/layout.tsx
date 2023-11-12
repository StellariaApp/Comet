import { SetupSuperNova, StyleRegistry } from '@stellaria/supernova';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import themes from '../themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Turborepo',
  description: 'Generated by create turbo'
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = (props: Props) => {
  const { children } = props;

  return (
    <html lang="en">
      <body className={inter.className}>
        <SetupSuperNova default="light" themes={themes} />
        <StyleRegistry>{children}</StyleRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
