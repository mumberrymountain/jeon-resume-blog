// 본문 패널 상단의 큰 제목 + 파란 밑줄, 그리고 섹션 제목입니다.

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-6">
        <h2 className="font-serif text-4xl font-bold text-white sm:text-[44px]">
          {title}
        </h2>
        <span className="h-0.5 w-20 rounded-full bg-accent sm:w-40" />
      </div>
      {description && (
        <p className="mt-5 max-w-2xl whitespace-pre-line leading-relaxed text-muted">
          {description}
        </p>
      )}
    </header>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-2xl font-semibold text-white">{children}</h3>
  );
}
