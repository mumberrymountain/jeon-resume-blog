import type { Metadata } from "next";
import { contributions } from "@/config/resume";

export const metadata: Metadata = {
  title: "Contributions",
};

function renderInlineCode(text: string) {
  return text.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-bg px-1.5 py-0.5 text-xs font-mono">$1</code>'
  );
}

export default function ContributionsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-lg font-medium uppercase tracking-widest text-accent">
          Contributions
        </p>
      </header>

      <section className="space-y-6">
        <div className="space-y-4">
          {contributions.map((c) => (
            <article
              key={c.pr}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {c.projectUrl ? (
                    <a
                      href={c.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold text-accent hover:underline"
                    >
                      {c.project}
                    </a>
                  ) : (
                    <span className="text-lg font-semibold">{c.project}</span>
                  )}
                </div>
                {c.prUrl ? (
                  <a
                    href={c.prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-bg px-2.5 py-1 text-sm font-medium text-accent hover:underline"
                  >
                    {c.pr}
                  </a>
                ) : (
                  <span className="rounded-md bg-bg px-2.5 py-1 text-sm font-medium text-accent">
                    {c.pr}
                  </span>
                )}
              </div>

              <p
                className="mt-3 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderInlineCode(c.description) }}
              />

              {c.detail && c.detail.length > 0 && (
                <ul className="mt-3 space-y-2 border-t border-border pt-3">
                  {c.detail.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span dangerouslySetInnerHTML={{ __html: renderInlineCode(item) }} />
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
