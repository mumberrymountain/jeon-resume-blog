import { site } from "@/config/site";
import { assetUrl } from "@/lib/asset";
import { MailIcon, MapPinIcon, SocialIcon } from "@/components/Icons";

// 왼쪽 프로필 카드: 사진, 이름, 역할, 소셜 링크, 연락처
export function Sidebar() {
  const initials = site.name.slice(0, 2);

  const contacts = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      icon: <MailIcon className="h-5 w-5 text-[#fd7590]" />,
    },
    {
      label: "Location",
      value: site.location,
      href: undefined,
      icon: <MapPinIcon className="h-5 w-5 text-[#6ab5b9]" />,
    },
  ];

  return (
    <aside className="rounded-[20px] bg-panel px-6 py-8 text-center lg:sticky lg:top-[7.5rem] lg:mt-24 lg:pt-0">
      <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-[20px] bg-surface text-4xl font-semibold text-accent lg:-mt-24 lg:h-[200px] lg:w-[200px]">
        {site.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={assetUrl(site.avatar)}
            alt={site.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <h1 className="mt-6 font-serif text-2xl font-bold text-white">{site.name}</h1>
      <p className="mt-3 inline-block rounded-md bg-surface px-4 py-2 text-sm text-white/80">
        {site.role}
      </p>

      <div className="mt-5 flex justify-center gap-3">
        {site.socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface transition-colors hover:bg-accent"
          >
            <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
          </a>
        ))}
        <a
          href={`mailto:${site.email}`}
          aria-label="Email"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-white transition-colors hover:bg-accent"
        >
          <MailIcon className="h-[18px] w-[18px]" />
        </a>
      </div>

      <dl className="mt-8 hidden rounded-2xl bg-surface p-6 text-left lg:block">
        {contacts.map((c, i) => (
          <div
            key={c.label}
            className={`flex items-center gap-4 py-3.5 ${
              i < contacts.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-panel shadow-md">
              {c.icon}
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-muted">{c.label}</dt>
              <dd className="break-all text-sm text-white">
                {c.href ? (
                  <a href={c.href} className="hover:text-accent">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  );
}
