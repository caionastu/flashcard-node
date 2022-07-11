import { ICard } from '../../entitites/ICard'
import { Card } from '../../resources/schemas/CardSchema'
import { ICardRepository } from '../ICardRepository'

class CardRepository implements ICardRepository {
  async findAllByDeckId(deckId: string): Promise<ICard[]> {
    return await Card.find({ deckId })
  }

  async findById(id: string): Promise<ICard> {
    return await Card.findById(id)
  }

  async save(iCard: ICard): Promise<ICard> {
    const card = await Card.create(iCard)
    return await card.save()
  }

  async deleteById(id: string): Promise<void> {
    await Card.deleteOne({ _id: id })
  }

  async deleteByDeckId(deckId: string): Promise<void> {
    await Card.deleteMany({ deckId })
  }
}

export default new CardRepository()
