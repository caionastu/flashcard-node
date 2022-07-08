import { IDeck } from '../entitites/IDeck'

export interface IDeckRepository {
  findById(id: String): Promise<IDeck>
  findAllByUserId(userId: String): Promise<IDeck[]>
  save(deck: IDeck): Promise<IDeck>
  deleteById(id: string): Promise<void>
  existsById(id: string): Promise<boolean>
}
