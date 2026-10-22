import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageTitle } from "@/components/PageTitle";
import { MailIcon, MapPinIcon, SocialIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `${site.name}에게 연락할 수 있는 이메일과 링크입니다.`,
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

export default function ContactPage() {
  const items = [
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
    ...site.socials.map((s) => ({
      label: s.label,
      value: s.href.replace(/^https?:\/\//, ""),
      href: s.href,
      icon: <SocialIcon label={s.label} className="h-5 w-5" />,
    })),
  ];

  return (
    <div className="space-y-10">
      <PageTitle title="Contact" description="편하게 연락 주세요." />

      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-panel shadow-md">
              {item.icon}
            </span>
            <div className="min-w-0">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-0.5 break-all font-medium text-white">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
