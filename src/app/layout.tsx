import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Next.js AI Study Assistant',
  description: 'A project to study and build AI applications using Next.js',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}