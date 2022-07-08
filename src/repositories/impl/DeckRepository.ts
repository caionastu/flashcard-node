import { IDeck } from '../../entitites/IDeck'
import { Deck } from '../../resources/schemas/DeckSchema'
import { IDeckRepository } from '../IDeckRepository'

class DeckRepository implements IDeckRepository {
  async findById(id: String): Promise<IDeck> {
    return await Deck.findById(id)
  }

  async findAllByUserId(userId: String): Promise<IDeck[]> {
    return await Deck.find({ userId: userId })
  }

  async save(iDeck: IDeck): Promise<IDeck> {
    const deck = await Deck.create(iDeck)
    return await deck.save()
  }

  async deleteById(id: string): Promise<void> {
    await Deck.deleteOne({ _id: id })
  }

  async existsById(id: string): Promise<boolean> {
    const count = await Deck.count({ _id: id })
    return count == 0
  }
}

export default new DeckRepository()
