import { site } from "@/config/site";
import { assetUrl } from "@/lib/asset";
import {
  intro,
  skills,
  experiences,
  education,
  certifications,
} from "@/config/resume";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          About
        </p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
        {site.name}
        </h2>
        <p className="mt-4 max-w-2xl whitespace-pre-line leading-relaxed text-muted">
          {intro}
        </p>
      </header>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <p className="mb-3 text-sm font-medium text-muted">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-bg px-2.5 py-1 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Experience</h3>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.period}`}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <h4 className="text-lg font-semibold">{exp.company}</h4>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-muted">{exp.role}</span>
                <span className="text-sm text-muted">{exp.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{exp.description}</p>
              <ul className="mt-4 space-y-3">
                {exp.highlights.map((item) => (
                  <li key={item.text}>
                    <span className="flex items-start gap-2 text-sm font-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item.text}
                    </span>
                    {item.sub && item.sub.length > 0 && (
                      <ul className="mt-1.5 space-y-1 pl-5">
                        {item.sub.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-2 text-sm text-muted"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-border" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Education</h3>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-border bg-surface p-5"
            >
              <div>
                <h4 className="font-semibold">{edu.school}</h4>
                <p className="text-sm text-muted">{edu.degree}</p>
              </div>
              <span className="text-sm text-muted">{edu.period}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Certifications</h3>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-surface p-5"
              >
                <div className="flex items-center gap-4">
                  {cert.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={assetUrl(cert.image)}
                      alt={cert.name}
                      className="h-12 w-12 shrink-0 object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    {cert.issuer && (
                      <p className="text-sm text-muted">{cert.issuer}</p>
                    )}
                  </div>
                </div>
                {cert.period && (
                  <span className="text-sm text-muted">{cert.period}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
