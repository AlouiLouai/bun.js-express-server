'use client';
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);
  // Set mounted to true after the client is loaded
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR issues by not rendering on the server
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
