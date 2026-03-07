import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سلام PMO | برج المراقبة',
  description: 'منصة القيادة التنفيذية لمدير مكتب إدارة مشاريع العملاء في شركة سلام',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-col w-full overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
