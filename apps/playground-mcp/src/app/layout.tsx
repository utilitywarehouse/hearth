import type { Metadata } from 'next';
import './globals.css';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';

export const metadata: Metadata = {
  title: 'Hearth MCP Playground',
  description: 'A playground for exploring Hearth MCP.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
