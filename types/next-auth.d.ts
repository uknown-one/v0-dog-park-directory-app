declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
    }
    accessToken: string
  }

  interface JWT {
    role: string
    accessToken: string
    id: string
  }
}
