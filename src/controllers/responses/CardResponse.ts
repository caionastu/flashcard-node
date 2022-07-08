import { ICard, LastVisit } from '../../entitites/ICard'

export class CardResponse {
  readonly id: string
  readonly deckId: string
  readonly content: string
  readonly createdAt: Date
  readonly lastVisit: LastVisit
  readonly notes: string
  readonly visitCount: number

  constructor(
    id: string,
    deckId: string,
    content: string,
    createdAt: Date,
    lastVisit: LastVisit,
    notes: string,
    visitCount: number
  ) {
    this.id = id
    this.deckId = deckId
    this.content = content
    this.createdAt = createdAt
    this.lastVisit = lastVisit
    this.notes = notes
    this.visitCount = visitCount
  }

  static from(card: ICard): CardResponse {
    return new CardResponse(
      card._id,
      card.deckId,
      card.content,
      card.createdAt,
      card.lastVisit,
      card.notes,
      card.visitCount
    )
  }
}
