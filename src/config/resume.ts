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

export type SkillGroup = {
  category: string;
  items: string[];
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

export const intro = `지속적으로 기여하고 만들어가는 DevOps/SRE 엔지니어입니다.
흥미 본위가 아닌 전략적 기술 선택을 고민합니다.
Prometheus, Node Exporter, OpenTofu 등 다양한 CNCF 프로젝트에 관심을 두고 오픈소스 기여 활동을 이어가고 있습니다.`;

export const skills: SkillGroup[] = [
  {
    category: "DevOps / CI & CD",
    items: ["Docker", "Kubernetes", "GitLab CI/CD", "GitHub Actions", "ArgoCD", "Terraform", "Ansible", "Jenkins"],
  },
  {
    category: "Monitoring & Observability",
    items: ["Prometheus", "Grafana", "Loki"],
  },
  {
    category: "Programming Languages",
    items: ["Bash", "Go", "Python", "Java"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Spring Data JPA"],
  },
  {
    category: "Database",
    items: ["MySQL", "Redis"],
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
    role: "EC솔루션연구소 아키텍쳐링 파트 · DevOps",
    period: "2026.06.15 ~ ",
    highlights: [],
  },
  {
    company: "(주) 소프트인",
    role: "시트개발팀 · DevOps",
    period: "2023.04.23 ~ 2026.05.31",
    highlights: [
      {
        text: "사내 GitLab 서버 Docker 환경 기반 재구축 및 성능 개선",
        sub: [
          "기존 서버를 GitLab 및 GitLab Runner를 포함한 Docker Compose 기반으로 재구축하여 인프라 표준화 및 유지보수성 개선",
          "과도한 메모리 점유의 원인인 Puma worker 수 기본값(20)으로 파악, 실사용 트래픽에 맞게 3으로 조정하여 모니터링 스택 최적화와 함께 메모리 81% 절감 (18GB → 3.3GB)",
        ],
      },
      {
        text: "서버 디스크 풀(Full) 장애 대응 및 재발 방지 체계 구축",
        sub: [
          "디스크 사용률 100% 도달로 인한 서버 다운 장애 발생 원인 분석 및 복구",
          "Prometheus + Alertmanager 기반 서버 모니터링 시스템 구축",
          "node_exporter 설치 및 연동으로 호스트 메트릭 수집 체계 구성 (디스크 90% 초과 / 가용 메모리 15% 미만 / 디스크 I/O 대기율 80% 초과 임계값 기반 PromQL Alert Rule 설계)",
          "cAdvisor 연동으로 컨테이너 메트릭 수집 체계 구성 (CPU 80% 초과 2분 지속 / 메모리 서버 전체의 50% 초과 2분 지속 / 컨테이너 다운 1분 지속 기반 Alert Rule 설계로 호스트·컨테이너 이중 감시 체계 구성)",
          "nginx-prometheus-exporter 연동으로 nginx 메트릭 수집 — Active 커넥션·RPS·드롭 커넥션 실시간 수집으로 커넥션 폭증 이상 징후 감지 체계 구성",
          "Grafana 대시보드 구축, 호스트 및 컨테이너 메트릭 시각화, 서버 상태 실시간 모니터링 환경 구성",
          "Alertmanager 사내 이메일 및 Microsoft Teams Webhook 라우팅 설정으로 임계치 초과 시 개발팀 다중 채널 자동 알림 연동, 장애 사전 감지 체계 확립",
          "GitLab CI/CD 파이프라인 구축으로 모니터링 설정 변경 사항 자동 배포 체계 구성 (promtool 기반 Alert Rule·Config 문법·유효성 검증)",
        ],
      },
      {
        text: "SSH 브루트포스 공격으로 인한 서비스 장애 대응 및 보안 강화",
        sub: [
          "Grafana 대시보드에서 CPU 사용률 100% 급등 및 메모리 사용률 이상 징후 포착, 로그 분석을 통해 SSH 브루트포스 공격을 원인으로 규명 및 서비스 복구",
          "fail2ban 도입으로 일정 횟수 이상 인증 실패 시 자동 IP 차단 정책 적용, 재발 방지",
          "운영 EC2 보안그룹을 점검하여 사내 IP에서만 SSH 접근 허용하도록 인바운드 규칙 재정비",
        ],
      },
      {
        text: "WordPress 컨테이너 메모리 폭증 장애 대응 및 보안 강화",
        sub: [
          "Grafana 대시보드에서 새벽 시간대 WordPress 컨테이너 메모리 350MiB → 1.17GiB 급증 이상 징후 포착",
          "docker logs 및 nginx 액세스 로그 분석을 통해 외부 자동화 스캐너의 백업파일 열기 공격(.zip, .sql 등), PHP 웹쉘 탐색 시도를 원인으로 규명",
          "nginx 설정 강화로 공격 표면 축소 — 민감 파일 확장자(.zip, .sql, .env 등) 및 숨김 파일 접근 차단 / limit_req_zone 기반 로그인 페이지 및 일반 요청 Rate Limiting 적용 / uploads 디렉토리 PHP 실행 차단으로 웹쉘 업로드 후 실행 방지",
        ],
      },
      {
        text: "AWS 콘솔 관리 인프라 Terraform 마이그레이션",
        sub: [
          "기존 AWS 콘솔로 수동 관리되던 인프라를 terraform import 블록을 활용해 Terraform 코드로 마이그레이션, 인프라 형상 관리 체계 전환",
          "Terraform tfstate를 GitLab 내장 HTTP Backend로 관리하여 별도 S3·외부 스토리지 없이 상태 파일 중앙화 및 팀 협업 환경 구성",
        ],
      },
      {
        text: "GitLab CI/CD 기반 AI 코드 리뷰 자동화 도입",
        sub: [
          "CodeRabbit 도입을 우선 검토하였으나 셀프호스팅 GitLab 환경에서의 제약으로 인해 오픈소스 기반의 PR-Agent로 대안 선정",
          "GitLab CI/CD 파이프라인에 PR-Agent를 연동하여 Merge Request 생성 시 자동으로 코드 리뷰, 변경 사항 요약, 개선 제안이 수행되도록 구성",
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
