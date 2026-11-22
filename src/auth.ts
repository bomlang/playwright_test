export const demoAccount = {
  email: 'tester@example.com',
  password: 'Test1234!',
}

export type Credentials = {
  email: string
  password: string
}

export type FieldErrors = Partial<Record<keyof Credentials, string>>

export function validateCredentials({ email, password }: Credentials): FieldErrors {
  const errors: FieldErrors = {}

  if (!email.trim()) {
    errors.email = '이메일을 입력해 주세요.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = '올바른 이메일 형식을 입력해 주세요.'
  }

  if (!password) {
    errors.password = '비밀번호를 입력해 주세요.'
  }

  return errors
}

export async function authenticate({ email, password }: Credentials): Promise<boolean> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 650))
  return email.trim().toLowerCase() === demoAccount.email && password === demoAccount.password
}
