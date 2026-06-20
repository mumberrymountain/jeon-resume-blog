import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        404
      </p>
      <h2 className="text-3xl font-bold">페이지를 찾을 수 없습니다.</h2>
      <p className="text-muted">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link
        href="/"
        className="rounded-lg bg-accent/15 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/25"
      >
        About으로 돌아가기
      </Link>
    </div>
  );
}
