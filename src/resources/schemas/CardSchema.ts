import { model, Model, Schema } from 'mongoose'
import { ICard } from '../../entitites/ICard'

const CardSchema = new Schema<ICard>({
  deckId: {
    type: String,
    required: [true, 'DeckId is required']
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  lastVisit: {
    date: {
      type: Date,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    nextVisit: {
      type: Date,
      required: true
    }
  },
  notes: {
    type: String
  },
  visitCount: {
    type: Number,
    required: true
  }
})

export const Card: Model<ICard> = model<ICard>('Card', CardSchema)
