export interface ICard {
  _id?: string
  deckId: string
  content: string
  createdAt: Date
  lastVisit: LastVisit
  notes?: string
  visitCount: number
}

export interface LastVisit {
  date: Date
  difficulty: Difficulties
  nextVisit: Date
}

export enum Difficulties {
  NEW = 'NEW',
  EASY = 'EASY',
  MODERATE = 'MODERATE',
  HARD = 'HARD'
}
