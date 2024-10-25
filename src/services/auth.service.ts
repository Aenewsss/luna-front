class AuthService {
    async register(data: any) {
        return (await fetch('/api/auth/register', { method: 'POST', body: data })).json()
    }
    async signin(data: any) {
        return (await fetch('/api/auth/', { method: 'POST', body: data })).json()
    }
    async forgotPassword(data: any) {
        return (await fetch('/api/auth/', { method: 'POST', body: data })).json()
    }
}

const authService = new AuthService()
export default authService