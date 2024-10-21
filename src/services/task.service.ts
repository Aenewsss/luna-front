class TaskService {
    async register(data: any) {
        console.log(data)
        return (await fetch('/api/task', { method: 'POST', body: data })).json()
    }
}

const taskService = new TaskService()
export default taskService