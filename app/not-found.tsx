import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
      <div className="space-y-4 max-w-md">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          404 &bull; Page Not Found
        </span>
        <h1 className="font-serif text-4xl font-bold">System Endpoint Missing</h1>
        <p className="font-mono text-xs text-muted-foreground">
          The requested route does not exist or has been relocated within the architecture.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-mono text-xs font-semibold hover:bg-accent hover:text-white transition-colors"
          >
            Return to Root System &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
