import { IDeck } from '../../entitites/IDeck'

export class DeckResponse {
  readonly id: string
  readonly title: string
  readonly userId: string
  readonly description?: string

  constructor(id: string, title: string, userId: string, description?: string) {
    this.id = id
    this.title = title
    this.userId = userId
    this.description = description
  }

  static from(deck: IDeck): DeckResponse {
    return new DeckResponse(deck._id, deck.title, deck.userId, deck.description)
  }
}
