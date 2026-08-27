import bcrypt from "bcryptjs"

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}

export { hashPassword, verifyPassword }
