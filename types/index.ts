export type Vision = {
  id: string
  title: string
}

export type Goal = {
  id: string
  title: string
  visionId?: string
}

export type Task = {
  id: string
  title: string
  goalId: string
  isDone: boolean
}

export type TodayTask = {
  taskId: string
  date: string
}
