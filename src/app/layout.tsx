export const metadata = {
  title: 'Next.js AI Study Assistant',
  description: 'A project to study and build AI applications using Next.js',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}