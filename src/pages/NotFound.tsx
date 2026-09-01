import { Link } from "react-router-dom";
import { ArrowLeft, AlertOctagon } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { GridBackground } from "@/components/primitives/GridBackground";
import { Glow } from "@/components/primitives/Glow";
import { Logo } from "@/components/primitives/Logo";

export function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center px-6">
      <GridBackground />
      <Glow size="lg" className="-top-32 left-1/2 -translate-x-1/2" />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mono inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-rose-300">
          <AlertOctagon className="h-3.5 w-3.5" />
          task failed · route not found
        </div>
        <div className="mt-6 flex justify-center">
          <Logo size={32} />
        </div>
        <h1 className="headline mt-6 text-balance text-5xl font-semibold text-white sm:text-6xl">
          404.
          <br />
          <span className="gradient-text-accent">No such path.</span>
        </h1>
        <p className="mt-4 text-balance text-white/60">
          Omnix looked for this route, but the environment does not contain it.
          You can head back to the surface and try again.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button leadingIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to home
            </Button>
          </Link>
          <Link to="/#architecture">
            <Button variant="secondary">Open the architecture</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
