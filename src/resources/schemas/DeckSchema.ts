import { model, Model, Schema } from 'mongoose'
import { IDeck } from '../../entitites/IDeck'

const DeckSchema = new Schema<IDeck>({
  userId: {
    type: String,
    required: [true, 'User id is required'],
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
})

export const Deck: Model<IDeck> = model<IDeck>('Deck', DeckSchema)
