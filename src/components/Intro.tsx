"use client";

import { useEffect, useRef, useState } from "react";

// 첫 진입 인트로: 터미널에 명령어가 타이핑되고, 결과가 출력된 뒤 본문으로 넘어갑니다.
// 재생 여부는 layout <head>의 인라인 스크립트가 html[data-intro]로 먼저 정해 둡니다.
// (세션당 한 번, prefers-reduced-motion이면 생략)

const COMMAND = "kubectl get engineer jeon-insoo";
const TYPE_START = 350; // 타이핑 시작(ms)
const TYPE_SPEED = 38; // 글자당(ms)
const TYPE_END = TYPE_START + COMMAND.length * TYPE_SPEED;
const SHOW_TABLE = TYPE_END + 250;
const SHOW_STATUS = SHOW_TABLE + 500;
const LEAVE_AT = SHOW_STATUS + 650;
const LEAVE_DURATION = 700;

const TABLE = [
  ["NAME", "ROLE", "STATUS", "READY"],
  ["jeon-insoo", "DevOps/SRE", "Running", "1/1"],
];
const WIDTHS = [13, 13, 10, 5];

function row(cells: string[]) {
  return cells.map((c, i) => c.padEnd(WIDTHS[i])).join("");
}

export function Intro({ name }: { name: string }) {
  const [done, setDone] = useState(false);
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState(0); // 0: 타이핑, 1: 표 출력, 2: 상태 출력
  const timers = useRef<number[]>([]);

  const clearTimers = () => timers.current.forEach(clearTimeout);

  const finish = () => {
    document.documentElement.dataset.intro = "done";
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    setDone(true);
  };

  const leave = () => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;
    clearTimers();
    root.dataset.intro = "leave";
    timers.current = [window.setTimeout(finish, LEAVE_DURATION)];
  };

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") {
      setDone(true);
      return;
    }
    const t: number[] = [];
    for (let i = 1; i <= COMMAND.length; i++) {
      t.push(window.setTimeout(() => setTyped(i), TYPE_START + i * TYPE_SPEED));
    }
    t.push(window.setTimeout(() => setStage(1), SHOW_TABLE));
    t.push(window.setTimeout(() => setStage(2), SHOW_STATUS));
    t.push(window.setTimeout(leave, LEAVE_AT));
    timers.current = t;
    return clearTimers;
  }, []);

  if (done) return null;

  const typing = typed < COMMAND.length;

  return (
    <div className="intro" onClick={leave} aria-hidden>
      <div className="intro__term">
        <div className="intro__bar">
          <span className="bg-[#ff5f57]" />
          <span className="bg-[#febc2e]" />
          <span className="bg-[#28c840]" />
          <p>{name.toLowerCase().replace(/\s+/g, "")}@devops: ~</p>
        </div>
        <pre className="intro__body">
          <span className="text-accent">$ </span>
          {COMMAND.slice(0, typed)}
          {stage === 0 && <span className={`intro__cursor ${typing ? "is-typing" : ""}`} />}
          {stage >= 1 && (
            <span className="intro__out">
              {"\n"}
              <span className="text-muted">{row(TABLE[0])}</span>
              {"\n"}
              {TABLE[1].map((c, i) => (
                // STATUS 칸만 초록색
                <span key={i} className={i === 2 ? "text-[#28c840]" : undefined}>
                  {c.padEnd(WIDTHS[i])}
                </span>
              ))}
            </span>
          )}
          {stage >= 2 && (
            <span className="intro__out">
              {"\n\n"}
              <span className="text-[#28c840]">✓</span> resume deployed — opening...
            </span>
          )}
        </pre>
      </div>
    </div>
  );
}
