import { useEffect, useRef } from 'react'
import { demoAccount } from '../auth'

type DashboardPageProps = {
  onLogout: () => void
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    document.title = '대시보드 | Playwright 로그인 실습'
    heading.current?.focus()
  }, [])

  return (
    <main className="dashboard-layout">
      <section className="card dashboard-card" aria-labelledby="dashboard-title">
        <p className="success-label">로그인 성공</p>
        <h1 id="dashboard-title" tabIndex={-1} ref={heading}>대시보드</h1>
        <p className="muted">테스트 계정으로 로그인했습니다.</p>
        <dl className="session-details">
          <dt>이메일</dt>
          <dd>{demoAccount.email}</dd>
        </dl>
        <button className="primary-button" type="button" onClick={onLogout}>로그아웃</button>
      </section>
    </main>
  )
}
