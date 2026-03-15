import type {Metadata} from 'next';
import { Manrope, Sora } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppMobileHeader } from '@/components/app-mobile-header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ControlTowerGuide } from '@/components/control-tower-guide';
import { hasConfiguredAiKey } from '@/ai/config';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pmo-sultan.vercel.app'),
  title: {
    default: 'Salam PMO | Control Tower',
    template: '%s | Salam PMO Control Tower',
  },
  description: 'Customer delivery operations control tower for portfolio health, service activation, and revenue protection.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Salam PMO | Control Tower',
    description: 'Customer delivery operations control tower for portfolio health, service activation, and revenue protection.',
    url: 'https://pmo-sultan.vercel.app',
    siteName: 'Salam PMO Control Tower',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAiConfigured = hasConfiguredAiKey();

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${manrope.variable} ${sora.variable} dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('control-tower-theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (error) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#app-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <TooltipProvider delayDuration={300}>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <div className="print-hidden">
                <AppSidebar />
              </div>
              <SidebarInset className="flex w-full flex-col overflow-hidden">
                <div className="print-hidden">
                  <AppMobileHeader />
                </div>
                <div id="app-content" className="flex flex-1 flex-col overflow-y-auto">
                  <div className="flex-1">
                    {children}
                  </div>
                  <footer className="print-hidden mt-8 border-t border-border/20">
                    <div className="mx-auto max-w-[1600px] px-5 py-3.5 md:px-8">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[11px] text-muted-foreground/60">
                          Salam PMO Control Tower &middot; Customer Delivery Operations
                        </p>
                        <p className="text-[11px] text-muted-foreground/68">
                          Operating data is illustrative. Directionally aligned with enterprise PMO workflows.
                        </p>
                      </div>
                    </div>
                  </footer>
                </div>
              </SidebarInset>
            </div>
            <div className="print-hidden">
              <ControlTowerGuide isAiConfigured={isAiConfigured} />
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
