import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RouteLoadingShell() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-5 py-6 md:px-8 md:py-8">
      <section className="command-hero space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-40 rounded-full bg-white/10" />
          <Skeleton className="h-7 w-20 rounded-full bg-white/10" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-36 bg-white/10" />
          <Skeleton className="h-10 w-[min(32rem,100%)] bg-white/10" />
          <Skeleton className="h-4 w-[min(44rem,100%)] bg-white/10" />
          <Skeleton className="h-4 w-[min(36rem,100%)] bg-white/10" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-[1.25rem] border border-white/8 bg-background/28 px-4 py-3.5"
            >
              <Skeleton className="h-3 w-24 bg-white/10" />
              <Skeleton className="mt-3 h-4 w-40 bg-white/10" />
              <Skeleton className="mt-2 h-4 w-28 bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="executive-card">
            <CardContent className="space-y-3 p-4">
              <Skeleton className="h-3 w-24 bg-white/10" />
              <Skeleton className="h-8 w-28 bg-white/10" />
              <Skeleton className="h-3 w-36 bg-white/10" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="executive-card">
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-5 w-56 bg-white/10" />
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-[1rem] border border-white/10 bg-background/25 p-4"
              >
                <Skeleton className="h-4 w-48 bg-white/10" />
                <Skeleton className="mt-3 h-3 w-full bg-white/10" />
                <Skeleton className="mt-2 h-3 w-11/12 bg-white/10" />
                <Skeleton className="mt-2 h-3 w-8/12 bg-white/10" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="executive-card">
          <CardContent className="space-y-4 p-5">
            <Skeleton className="h-5 w-40 bg-white/10" />
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-[1rem] border border-white/10 bg-background/25 p-3"
              >
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="mt-2 h-3 w-3/4 bg-white/10" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
