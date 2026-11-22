# Playwright 로그인 실습

웹·앱 QA 직무 전환을 준비하며 로그인 테스트 케이스를 설계하고 Playwright를 학습할 수 있는 React + TypeScript + Vite 프로젝트입니다. React Router로 로그인과 대시보드 경로를 관리하고 일반 CSS를 사용합니다.

**이 프로젝트는 브라우저에서 동작하는 모의 인증입니다.** 아래 계정 정보가 소스 코드에 공개되어 있고 로그인 상태는 React 메모리에만 유지됩니다. 새로고침하면 상태가 초기화됩니다. 백엔드, 데이터베이스, 외부 인증 서비스는 사용하지 않습니다. 실제 서비스에 인증 코드나 계정 정보를 재사용하지 마세요.

## 실행 방법

Node.js 22.12 이상(권장)과 npm이 필요합니다.

```sh
git clone https://github.com/bomlang/playwright_test.git
cd playwright_test
npm ci
npm run dev
```

터미널에 표시된 주소(기본값 `http://localhost:5173`)를 엽니다.

| 명령 | 용도 |
| --- | --- |
| `npm run lint` | 코드 린트 |
| `npm run build` | TypeScript 검사 및 프로덕션 빌드 |
| `npm run preview` | 빌드 결과를 로컬에서 미리 보기 |

## 테스트 계정

| 필드 | 값 |
| --- | --- |
| 이메일 | `tester@example.com` |
| 비밀번호 | `Test1234!` |

## 주요 파일

| 파일 | 역할 |
| --- | --- |
| `src/App.tsx` | 로그인 상태 관리와 React Router 경로 제어 |
| `src/pages/LoginPage.tsx` | 로그인 폼, 입력값 오류, 비밀번호 토글, 제출 중 상태 |
| `src/pages/DashboardPage.tsx` | 로그인 계정 표시 및 로그아웃 |
| `src/auth.ts` | 테스트 계정, 입력값 검증, 지연이 있는 모의 인증 |
| `src/index.css` | 반응형 배치와 키보드 초점 스타일 |
| [docs/requirements.md](docs/requirements.md) | 기능별 기대 동작과 접근성 이름 |

초기 버전에는 Playwright 테스트 코드가 포함되어 있지 않습니다. 요구사항 명세서를 바탕으로 테스트 케이스를 설계할 수 있습니다.
