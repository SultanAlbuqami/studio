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
                <footer className="border-t border-border/30 mt-8">
                  <div className="max-w-[1600px] mx-auto px-5 py-4 md:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-[11px] text-muted-foreground/50">
                      Designed and built by Sultan Albuqami
                    </p>
                    <p className="text-[11px] text-muted-foreground/40">
                      Demo environment · Illustrative operating data and representative labels for interview demonstration purposes
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
