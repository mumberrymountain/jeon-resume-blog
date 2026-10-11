import { PageTitle, SectionTitle } from "@/components/PageTitle";
import { assetUrl } from "@/lib/asset";
import {
  intro,
  strengths,
  skills,
  experiences,
  education,
  certifications,
} from "@/config/resume";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <PageTitle title="About" description={intro} />

      {/* Strengths */}
      <section className="space-y-4">
        <SectionTitle>Strengths</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {strengths.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {item.label}
              </p>
              <p className="mt-2 font-semibold leading-snug text-white">
                {item.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.proof}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <SectionTitle>Skills</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <p className="mb-3 text-sm font-medium text-muted">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    style={{
                      backgroundColor: `#${item.color}`,
                      color: item.textColor ? `#${item.textColor}` : undefined,
                    }}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm"
                  >
                    {(item.image || item.icon) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          item.image
                            ? assetUrl(item.image)
                            : `https://cdn.simpleicons.org/${item.icon}/white`
                        }
                        alt=""
                        className={`h-3.5 w-3.5 ${item.image ? "rounded-sm" : ""}`}
                      />
                    )}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.period}`}
              className="rounded-2xl border border-border bg-surface p-5"
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
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl border border-border bg-surface p-5"
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
          <SectionTitle>Certifications</SectionTitle>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-surface p-5"
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
