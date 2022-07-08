import { ICard } from '../entitites/ICard'

export interface ICardRepository {
  findAllByDeckId(deckId: string): Promise<ICard[]>
  findById(id: string): Promise<ICard>
  save(card: ICard): Promise<ICard>
  deleteByDeckId(deckId: string): Promise<void>
  deleteById(id: string): Promise<void>
}
