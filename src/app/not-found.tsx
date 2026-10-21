import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center pt-24">
      <div className="container-x text-center">
        <p className="text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-[-0.07em]">
          4<span className="serif-i font-normal text-muted">0</span>4
        </p>
        <p className="mt-4 text-lg text-muted">This page took a wrong turn. Let&apos;s get you back.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/work" variant="outline" icon={false}>See my work</Button>
        </div>
      </div>
    </section>
  );
}
