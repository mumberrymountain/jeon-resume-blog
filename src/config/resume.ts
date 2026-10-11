// About 페이지(이력서 통합)에서 사용하는 데이터입니다.

export type HighlightItem = {
  text: string;
  sub?: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description?: string;
  highlights: HighlightItem[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export type Skill = {
  name: string;
  /** simple-icons 슬러그 (https://simpleicons.org). 없으면 로고 없이 표시 */
  icon?: string;
  /** public 폴더의 로고 이미지 경로. icon보다 우선 */
  image?: string;
  /** 배지 배경색 (# 없는 hex) */
  color: string;
  /** 배지 글자색 (# 없는 hex). 기본은 흰색 */
  textColor?: string;
};

export type SkillGroup = {
  category: string;
  items: Skill[];
};

export type Strength = {
  /** 카드 상단의 짧은 키워드 */
  label: string;
  /** 한 문장 강점 선언 */
  headline: string;
  /** 근거가 되는 실적 */
  proof: string;
};

export type Certification = {
  name: string;
  issuer?: string;
  period?: string;
  link?: string;
  image?: string;
};

export type Contribution = {
  project: string;
  projectUrl?: string;
  description: string;
  detail?: string[];
  pr: string;
  prUrl?: string;
};

export const intro = `원인을 끝까지 파고들어 숫자로 증명하는 DevOps/SRE 엔지니어입니다.
배포 파이프라인 51% 단축, 서버 메모리 81% 절감처럼 측정 가능한 개선을 만들고, 도구의 버그를 만나면 Prometheus·OpenTofu 등 CNCF 프로젝트에 직접 수정을 기여해 왔습니다.
흥미 본위가 아닌 전략적 기술 선택으로, 같은 문제가 반복되지 않는 구조를 만듭니다.`;

export const strengths: Strength[] = [
  {
    label: "Measurable Impact",
    headline: "병목을 찾아 숫자로 증명합니다",
    proof:
      "배포 파이프라인 51% 단축 · GitLab 서버 메모리 81% 절감 · 컨테이너 보안 점검 53.8점 → 74점",
  },
  {
    label: "Open Source",
    headline: "쓰는 도구의 버그를 소스까지 파고들어 고칩니다",
    proof:
      "Prometheus · node_exporter · OpenTofu · fastexcel 버그 수정, Helm v4 문서 한국어 번역",
  },
  {
    label: "Root Cause",
    headline: "증상에서 멈추지 않고 근본 원인과 재발 방지까지 갑니다",
    proof:
      "iptables 버그로 인한 K3s 노드 부하 규명 · GPU 드라이버 불일치 장애 복구 · AWS 보안 사고 추적 후 실시간 탐지 체계 구축. 분석 과정은 블로그에 공개",
  },
  {
    label: "Observability",
    headline: "Metric · Log · Trace 전 영역을 설계합니다",
    proof:
      "Prometheus · Grafana · Loki · Tempo · OpenTelemetry로 AI 에이전트 워크플로우를 노드 단위까지 추적",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "🐳 Container & Orchestration",
    items: [
      { name: "Docker", icon: "docker", color: "2496ED" },
      { name: "Kubernetes", icon: "kubernetes", color: "326CE5" },
      { name: "Helm", icon: "helm", color: "0F1689" },
      { name: "Kustomize", icon: "kubernetes", color: "326CE5" },
      { name: "Istio", icon: "istio", color: "466BB0" },
    ],
  },
  {
    category: "🔄 CI/CD & GitOps",
    items: [
      { name: "GitLab CI/CD", icon: "gitlab", color: "FC6D26" },
      { name: "GitHub Actions", icon: "githubactions", color: "2088FF" },
      { name: "Jenkins", icon: "jenkins", color: "D24939" },
      { name: "ArgoCD", icon: "argo", color: "EF7B4D" },
    ],
  },
  {
    category: "📦 Infrastructure as Code",
    items: [
      { name: "Terraform", icon: "terraform", color: "7B42BC" },
      { name: "Ansible", icon: "ansible", color: "EE0000" },
    ],
  },
  {
    category: "🤖 MLOps",
    items: [
      { name: "MLflow", icon: "mlflow", color: "0194E2" },
      { name: "DVC", icon: "dvc", color: "945DD6" },
      { name: "KServe", icon: "kubernetes", color: "326CE5" },
      { name: "Kubeflow", image: "/image/kubeflow.svg", color: "0B2A6B" },
    ],
  },
  {
    category: "📊 Monitoring & Observability",
    items: [
      { name: "Prometheus", icon: "prometheus", color: "E6522C" },
      { name: "Grafana", icon: "grafana", color: "F46800" },
      { name: "Loki", icon: "grafana", color: "F5A800" },
      { name: "Tempo", icon: "grafana", color: "F46800" },
      { name: "OpenTelemetry", icon: "opentelemetry", color: "425CC7" },
      { name: "HolmesGPT", image: "/image/holmesgpt.png", color: "56F5CA", textColor: "11383A" },
    ],
  },
  {
    category: "🚀 Programming Languages",
    items: [
      { name: "Go", icon: "go", color: "00ADD8" },
      { name: "Python", icon: "python", color: "3776AB" },
      { name: "Bash", icon: "gnubash", color: "4EAA25" },
      { name: "Java", icon: "openjdk", color: "ED8B00" },
    ],
  },
  {
    category: "⚙️ Backend",
    items: [
      { name: "Spring Boot", icon: "springboot", color: "6DB33F" },
      { name: "FastAPI", icon: "fastapi", color: "009688" },
    ],
  },
  {
    category: "🗄️ Database",
    items: [
      { name: "MySQL", icon: "mysql", color: "4479A1" },
      { name: "Redis", icon: "redis", color: "DC382D" },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    period: "2025.12.20 ~ ",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    image: "/aws-solutions-architect.png",
  },
  {
    name: "HashiCorp Certified: Terraform Associate (004)",
    issuer: "HashiCorp",
    period: "2026.03.07 ~",
    link: "https://www.hashicorp.com/certifications/terraform-associate",
    image: "/terraform-associate.png",
  },
  {
    name: "SQL 개발자 (SQLD)",
    issuer: "한국데이터산업진흥원",
    period: "2024.09.20 ~",
  },
];

export const contributions: Contribution[] = [
  {
    project: "opentofu",
    projectUrl: "https://github.com/opentofu/opentofu",
    description: "`tofu init -backend=false` 실행 시 암호화된 로컬 state 파일을 불필요하게 읽고 복호화를 시도하는 현상 수정",
    pr: "#4077",
    prUrl: "https://github.com/opentofu/opentofu/pull/4077",
  },
  {
    project: "prometheus",
    projectUrl: "https://github.com/prometheus/prometheus",
    description: "`tracing.client_type: http` 와 `insecure: true` 함께 사용시 프로메테우스 실행할 때 에러나는 현상 수정",
    pr: "#18454",
    prUrl: "https://github.com/prometheus/prometheus/pull/18454",
  },
  {
    project: "node_exporter",
    projectUrl: "https://github.com/prometheus/node_exporter",
    description: "`--collector.diskstats.device-include` 단독 사용 시 device-exclude 기본값과의 충돌로 패닉이 발생하는 현상 수정",
    pr: "#3603",
    prUrl: "https://github.com/prometheus/node_exporter/pull/3603",
  },
];

export const experiences: Experience[] = [
  {
    company: "(주) 플래티어",
    role: "AI 솔루션연구소 아키텍쳐 엔지니어링 파트 · DevOps",
    period: "2026.06.15 ~ ",
    description:
      "기업용 AI 에이전트 솔루션(XGEN)이 안정적으로 동작하도록 서버 인프라를 구축·운영하고, 문제를 빨리 찾아낼 수 있는 모니터링 체계를 만들고 있습니다.",
    highlights: [
      {
        text: "배포 파이프라인 실행 시간 51% 단축 (9분 36초 → 4분 44초)",
        sub: [
          "단계별 소요 시간을 분석해, 매번 평균 6분 53초를 쓰면서도 결과물을 아무도 사용하지 않던 빌드 단계를 찾아 제거 (Jenkins, Nexus)",
          "공유 설정을 쓰는 모든 프로젝트에 기능 영향 없이 한 번에 적용. 오래된 결과물로 빌드될 위험이 있는 부분은 판단해 제외",
        ],
      },
      {
        text: "AI 에이전트 서비스의 지연·실패 원인 추적 체계 구축",
        sub: [
          "서비스 간 요청 흐름을 추적하는 시스템을 도입하고(OpenTelemetry, Jaeger), 기술별 제약을 비교해 구성 방식을 선정",
          "\"어느 단계가 느렸는지, 어디서 실패했는지\"를 AI 워크플로우의 단계별로 확인할 수 있게 확장하고, 대시보드와 장애 경보를 구성 (Grafana Tempo)",
        ],
      },
      {
        text: "서버 장애 원인 규명 및 재발 방지",
        sub: [
          "쿠버네티스 서버의 CPU·메모리 부하 장애를 도구 버그(iptables)로 규명해 해결 (K3s)",
          "자동 업데이트로 GPU 드라이버가 어긋나 AI 모델 서빙이 멈춘 장애를 복구하고, 재발 방지책으로 자동 업데이트를 중단",
        ],
      },
      {
        text: "단일 서버 구조를 이중화(HA)해 서비스 중단 위험 감소",
        sub: [
          "Redis·Qdrant를 단일 구성에서 이중화로 전환. 애플리케이션 코드 수정 없이 프록시(HAProxy)가 정상 서버로만 요청을 보내도록 구성",
        ],
      },
      {
        text: "클라우드 보안 사고 대응 및 실시간 탐지 체계 구축 (AWS)",
        sub: [
          "회사 홈페이지가 스팸 사이트로 연결되던 사고의 원인을 감사 로그로 추적해 복구하고, 과도하게 부여된 계정 권한을 최소 권한 원칙으로 재정비",
          "위협 탐지 시 팀 메신저(Teams)로 즉시 알림이 가도록 구성 (GuardDuty). 도입 직후 개발 DB에 대한 악성 IP 접근 시도도 탐지",
        ],
      },
      {
        text: "컨테이너 보안 점검 점수 53.8점 → 74점 개선",
        sub: [
          "고객사 보안 점검에서 기준 미달이던 서버에 컨테이너 격리·권한 제한 등 보안 설정을 적용 (Docker). 서비스에 영향을 주는 항목은 제외하고 적용",
        ],
      },
    ],
  },
  {
    company: "(주) 소프트인",
    role: "DevOps",
    period: "2023.04.23 ~ 2026.05.31",
    description: "사내 개발 서버와 AWS 인프라의 운영·모니터링·보안을 담당했습니다.",
    highlights: [
      {
        text: "사내 코드 저장소(GitLab) 서버 메모리 81% 절감 (18GB → 3.3GB)",
        sub: [
          "서버를 Docker Compose로 재구축해 관리 방식을 표준화하고, 과다 점유의 원인이던 설정(Puma worker 수 20 → 3)을 실사용량에 맞게 조정",
        ],
      },
      {
        text: "서버 다운 장애를 계기로 모니터링·알림 체계 구축",
        sub: [
          "디스크 100%로 서버가 멈춘 원인을 분석·복구하고, 서버·컨테이너·웹서버 상태를 상시 수집해 임계치를 넘으면 이메일과 Teams로 개발팀에 자동 알림 (Prometheus, Alertmanager, Grafana)",
          "모니터링 설정 변경도 자동 검증·배포되도록 CI/CD를 구성",
        ],
      },
      {
        text: "외부 공격 2건 대응 및 방어 강화",
        sub: [
          "SSH 무차별 대입 공격으로 인한 CPU 급등을 로그 분석으로 규명, 반복 실패 IP 자동 차단 및 접속 허용 IP를 사내로 제한 (fail2ban)",
          "WordPress 서버의 메모리 폭증이 외부 자동 스캐너 공격임을 규명, 민감 파일 접근 차단과 요청 횟수 제한 적용 (nginx)",
        ],
      },
      {
        text: "수동 관리하던 AWS 인프라를 코드로 전환 (Terraform)",
        sub: [
          "콘솔로 직접 관리하던 인프라를 코드로 옮겨 변경 이력과 형상을 관리하고, 상태 파일은 기존 GitLab에 중앙 보관해 추가 비용 없이 팀이 함께 사용",
        ],
      },
      {
        text: "AI 코드 리뷰 자동화 도입",
        sub: [
          "상용 도구(CodeRabbit)가 사내 환경에 맞지 않아 오픈소스(PR-Agent)로 대안을 선정, 병합 요청 시 자동으로 리뷰·요약·개선 제안이 달리도록 연동",
        ],
      },
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: "홍익대학교",
    degree: "법학 학사",
    period: "2017.03 - 2021.02",
  },
];
