import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import { authenticate, demoAccount, validateCredentials } from '../auth'
import type { Credentials, FieldErrors } from '../auth'

type LoginPageProps = {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const submitting = useRef(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = '로그인 | Playwright 로그인 실습'
    heading.current?.focus()
  }, [])

  function updateField(field: keyof Credentials, value: string) {
    setCredentials((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setLoginError('')
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return

    const nextErrors = validateCredentials(credentials)
    setErrors(nextErrors)
    setLoginError('')

    if (nextErrors.email || nextErrors.password) {
      const firstInvalidField = nextErrors.email ? emailInput : passwordInput
      firstInvalidField.current?.focus()
      return
    }

    submitting.current = true
    setPending(true)
    try {
      if (await authenticate(credentials)) {
        onLogin()
      } else {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } finally {
      submitting.current = false
      setPending(false)
    }
  }

  return (
    <main className="login-layout">
      <section className="intro" aria-labelledby="practice-title">
        <span className="intro-label">QA 자동화 실습</span>
        <h2 id="practice-title">로그인 흐름을<br /> 테스트해 보세요</h2>
        <p>입력값 검증부터 로그인과 로그아웃까지, 로그인 기능의 주요 동작을 확인할 수 있습니다.</p>
        <div className="demo-account">
          <h3>테스트 계정</h3>
          <dl>
            <div><dt>이메일</dt><dd>{demoAccount.email}</dd></div>
            <div><dt>비밀번호</dt><dd>{demoAccount.password}</dd></div>
          </dl>
        </div>
      </section>

      <section className="card" aria-labelledby="login-title">
        <h1 id="login-title" tabIndex={-1} ref={heading}>로그인</h1>
        <p className="muted">테스트 계정으로 로그인해 보세요.</p>
        <form noValidate onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">이메일</label>
            <input
              id="email" name="email" type="email" autoComplete="username" required
              placeholder="tester@example.com" ref={emailInput} value={credentials.email}
              readOnly={pending} aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(event) => updateField('email', event.target.value)}
            />
            <div className="field-error" id="email-error" aria-live="polite">{errors.email}</div>
          </div>

          <div className="field">
            <label htmlFor="password">비밀번호</label>
            <div className="password-row">
              <input
                id="password" name="password" type={showPassword ? 'text' : 'password'}
                autoComplete="current-password" required ref={passwordInput} value={credentials.password}
                readOnly={pending} aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                onChange={(event) => updateField('password', event.target.value)}
              />
              <button className="toggle-button" type="button" aria-controls="password"
                aria-pressed={showPassword} aria-label="비밀번호 표시"
                onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? '숨기기' : '표시'}
              </button>
            </div>
            <div className="field-error" id="password-error" aria-live="polite">{errors.password}</div>
          </div>

          <div className="login-error" role="alert">{loginError}</div>
          <button className="primary-button" type="submit" aria-label="로그인" disabled={pending}>
            {pending ? '로그인 중…' : '로그인'}
          </button>
          <div className="sr-only" role="status">{pending ? '로그인 요청을 처리하고 있습니다.' : ''}</div>
        </form>
      </section>
    </main>
  )
}
