import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Salam PMO | Control Tower',
  description: 'Executive Command Center for Director Customer PMO at Salam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <TooltipProvider delayDuration={300}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-col w-full overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {children}
                <footer className="mt-8 border-t border-border/30 bg-card/35">
                  <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-3 px-5 py-4 md:px-8 lg:flex-row lg:items-center">
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium tracking-wide text-foreground/96">
                        Designed and built by Sultan Albuqami
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/82">
                        Product concept, executive KPI design, UX structure, and implementation for a telecom customer delivery control tower.
                      </p>
                    </div>
                    <p className="max-w-xl text-[11px] leading-relaxed text-muted-foreground/88 lg:text-right">
                      Prepared as an executive interview demonstration using illustrative operating data, representative labels, and simulated delivery scenarios.
                    </p>
                  </div>
                </footer>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
