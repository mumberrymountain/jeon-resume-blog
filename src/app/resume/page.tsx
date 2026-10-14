import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import {
  intro,
  experiences,
  certifications,
  contributions,
  skills,
  education,
  type Skill,
} from "@/config/resume";
import { assetUrl } from "@/lib/asset";
import { MailIcon, SocialIcon } from "@/components/Icons";
import { PrintButton } from "./PrintButton";

// 이력서 PDF 내보내기용 페이지입니다.
// 내용은 전부 config/resume.ts · config/site.ts에서 가져오므로,
// Experience · Skills · Contributions 등에 항목을 추가하면 PDF에도 자동으로 반영됩니다.
// 페이지 나눔은 항목 단위(break-inside: avoid)로 처리해 항목 수가 늘어도 레이아웃이 깨지지 않습니다.

// 인쇄 대화상자의 기본 파일명이 됩니다.
export const metadata: Metadata = {
  title: { absolute: `${site.name}_${site.nameEn.replace(/\s+/g, "")}_Resume` },
  robots: { index: false },
};

// 직접 진입 시 인트로 오버레이용 스크롤 잠금이 걸리지 않도록 합니다.
const skipIntroScript = `document.documentElement.dataset.intro="skip"`;

/** `code` 표기를 <code>로 바꿉니다. */
function withInlineCode(text: string) {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-slate-100 px-1 font-mono text-[0.9em] text-slate-700">
        {part}
      </code>
    ) : (
      part
    )
  );
}

/** 카테고리 앞의 이모지를 떼어냅니다. (예: "🐳 Container" → "Container") */
function stripEmoji(text: string) {
  return text.replace(/^[^\p{L}\p{N}]+/u, "");
}

/** https:// 를 뗀 짧은 URL 표기 */
function shortUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** "2026.06.15 ~ " 처럼 종료일이 없으면 재직/유효 중으로 봅니다. */
function splitPeriod(period: string) {
  const [start, end] = period.split("~").map((s) => s?.trim() ?? "");
  return { start, end, ongoing: period.includes("~") && !end };
}

function Section({
  index,
  title,
  subtitle,
  children,
}: {
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-9">
      <div className="resume-heading flex items-center gap-3">
        <span className="font-mono text-[11px] font-semibold text-accent">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-[15px] font-bold uppercase tracking-[0.18em] text-slate-900">
          {title}
        </h2>
        <span className="text-[12px] text-slate-400">{subtitle}</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SkillChip({ item }: { item: Skill }) {
  const src = item.image
    ? assetUrl(item.image)
    : item.icon
      ? `https://cdn.simpleicons.org/${item.icon}/${item.color}`
      : undefined;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-[3px] text-[11.5px] font-medium text-slate-700">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-3.5 w-3.5 shrink-0 rounded-[2px] object-contain" />
      )}
      {item.name}
    </span>
  );
}

export default function ResumePage() {
  const links = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon className="h-3.5 w-3.5 text-accent" />,
    },
    ...site.socials.map((s) => ({
      label: s.label,
      value: shortUrl(s.href),
      href: s.href,
      icon: <SocialIcon label={s.label} color="0f172a" className="h-3.5 w-3.5" />,
    })),
  ];

  // 섹션 순서는 이 배열 순서를 따릅니다. 비어 있는 섹션은 번호 없이 빠집니다.
  const sections = [
    skills.length > 0 && {
      title: "Skills",
      subtitle: "기술 스택",
      body: (
        <div className="divide-y divide-slate-100">
          {skills.map((group) => (
            <div
              key={group.category}
              className="resume-item grid grid-cols-[44mm_1fr] items-start gap-3 py-2 first:pt-0 last:pb-0"
            >
              <p className="pt-[3px] text-[12px] font-semibold text-slate-800">
                {stripEmoji(group.category)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <SkillChip key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    experiences.length > 0 && {
      title: "Experience",
      subtitle: "경력",
      body: (
        <div className="space-y-7">
          {experiences.map((exp) => {
            const { start, end, ongoing } = splitPeriod(exp.period);
            return (
              // grid 대신 절대 배치한 기간 열 + 들여쓴 본문으로 구성해야 페이지 경계에서 자연스럽게 나뉩니다.
              <div key={`${exp.company}-${exp.period}`} className="relative" style={{ paddingLeft: "calc(30mm + 1.25rem)" }}>
                <div className="absolute left-0 top-0 w-[30mm] pt-0.5 text-[11.5px] leading-snug text-slate-500">
                  <p className="font-medium text-slate-700">{start}</p>
                  <p>~ {end || "현재"}</p>
                  {ongoing && (
                    <span className="mt-1.5 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10.5px] font-semibold text-accent">
                      재직 중
                    </span>
                  )}
                </div>
                <div className="border-l-2 border-slate-100 pl-5">
                  <div className="resume-keep">
                    <h3 className="text-[16px] font-bold text-slate-900">{exp.company}</h3>
                    <p className="text-[12px] font-medium text-accent">{exp.role}</p>
                    {exp.description && (
                      <p className="mt-1.5 text-slate-600">{exp.description}</p>
                    )}
                  </div>
                  <ul className="mt-3.5 space-y-3">
                    {exp.highlights.map((item) => (
                      <li key={item.text} className="resume-item">
                        <p className="relative font-semibold text-slate-900">
                          <span className="absolute -left-[25px] top-[0.5em] h-2 w-2 rounded-full border-2 border-accent bg-white" />
                          {item.text}
                        </p>
                        {item.sub && item.sub.length > 0 && (
                          <ul className="mt-1 space-y-0.5">
                            {item.sub.map((s) => (
                              <li key={s} className="flex gap-2 text-slate-600">
                                <span className="mt-[0.65em] h-px w-2 shrink-0 bg-slate-400" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    certifications.length > 0 && {
      title: "Certifications",
      subtitle: "자격증",
      body: (
        <div className="grid grid-cols-2 gap-2.5">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="resume-item flex items-center gap-3 rounded-lg border border-slate-200 p-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-slate-50">
                {cert.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={assetUrl(cert.image)}
                    alt=""
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <span className="text-[11px] font-bold text-slate-400">CERT</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-semibold leading-snug text-slate-900">
                  {cert.name}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {[cert.issuer, cert.period && splitPeriod(cert.period).start]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    contributions.length > 0 && {
      title: "Open Source",
      subtitle: "오픈소스 기여",
      body: (
        <ul className="space-y-3">
          {contributions.map((c) => (
            <li
              key={`${c.project}-${c.pr}`}
              className="resume-item border-l-2 border-accent/60 pl-3.5"
            >
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-slate-900">{c.project}</span>
                {c.prUrl ? (
                  <a href={c.prUrl} className="text-[11.5px] font-medium text-accent">
                    PR {c.pr} · {shortUrl(c.prUrl)}
                  </a>
                ) : (
                  <span className="text-[11.5px] font-medium text-accent">PR {c.pr}</span>
                )}
              </p>
              <p className="mt-0.5 text-slate-700">{withInlineCode(c.description)}</p>
              {c.detail && c.detail.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {c.detail.map((d, i) => (
                    <li key={i} className="flex gap-2 text-slate-600">
                      <span className="mt-[0.65em] h-px w-2 shrink-0 bg-slate-400" />
                      <span>{withInlineCode(d)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ),
    },
    education.length > 0 && {
      title: "Education",
      subtitle: "학력",
      body: (
        <ul className="space-y-2">
          {education.map((edu) => (
            <li
              key={edu.school}
              className="resume-item grid grid-cols-[30mm_1fr] gap-5"
            >
              <span className="text-[11.5px] text-slate-500">{edu.period}</span>
              <p>
                <span className="font-semibold text-slate-900">{edu.school}</span>
                <span className="ml-2 text-slate-600">{edu.degree}</span>
              </p>
            </li>
          ))}
        </ul>
      ),
    },
  ].filter((s) => !!s);

  return (
    <div className="resume-root min-h-screen bg-slate-200 py-8 print:bg-white print:py-0">
      <script dangerouslySetInnerHTML={{ __html: skipIntroScript }} />

      {/* 화면 전용 툴바 */}
      <div className="mx-auto mb-4 flex max-w-[210mm] items-center justify-between px-4 print:hidden">
        <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
          ← 블로그로 돌아가기
        </Link>
        <PrintButton />
      </div>

      {/* A4 용지 */}
      <article className="resume-paper mx-auto max-w-[210mm] bg-white px-[16mm] py-[14mm] text-[12.5px] leading-relaxed text-slate-700 shadow-lg print:max-w-none print:p-0 print:shadow-none">
        {/* Header */}
        <header className="flex items-start gap-7">
          {(site.avatarPrint || site.avatar) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={assetUrl(site.avatarPrint || site.avatar)}
              alt={site.name}
              className="h-[38mm] w-[30mm] shrink-0 rounded-lg object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
              {site.nameEn}
            </p>
            <h1 className="mt-1 text-[30px] font-bold leading-tight text-slate-900">
              {site.name}
            </h1>
            <p className="mt-0.5 text-[14px] font-medium text-slate-500">{site.role}</p>
            <span className="mt-3 block h-[3px] w-12 rounded-full bg-accent" />
            <ul className="mt-3 space-y-1 text-[12px]">
              {links.map((l) => (
                <li key={l.label} className="flex items-center gap-2">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                    {l.icon}
                  </span>
                  <a href={l.href} className="text-slate-700 hover:underline">
                    {l.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <p className="mt-6 whitespace-pre-line rounded-r-lg border-l-[3px] border-accent bg-slate-50 px-4 py-3 text-slate-700">
          {intro}
        </p>

        {sections.map((s, i) => (
          <Section key={s.title} index={i + 1} title={s.title} subtitle={s.subtitle}>
            {s.body}
          </Section>
        ))}
      </article>
    </div>
  );
}
