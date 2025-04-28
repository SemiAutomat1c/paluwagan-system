// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
  {
    id: 1,
    name: "John Doe",
    email: "admin@example.com",
    password: "password123", // In a real app, this would be hashed
  },
]

export interface LoginCredentials {
  email: string
  password: string
}

export async function authenticateUser({ email, password }: LoginCredentials) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user with matching email
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password")
  }

  // Return user data (excluding password)
  const { password: _, ...userData } = user
  return userData
}

export function validateEmail(email: string) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

export function validatePassword(password: string) {
  return password.length >= 8
} 