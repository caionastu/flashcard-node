describe('some new test suite', () => {
  it('should run a new test suite', () => {
    console.log('new test')
    expect(true).toBe(true)
  })

  // jest.mock('../src/repositories/impl/DeckRepository')

  // const mocked = jest.mocked(DeckRepository, true)

  // it('should run a new test suite with Deck Service', () => {
  //   const deck: IDeck = {
  //     _id: ulid(),
  //     title: 'test title',
  //     userId: ulid(),
  //     description: 'test description'
  //   }

  //   mocked.findAllByUserId.mockResolvedValue([deck])

  //   mocked.findAllByUserId(deck.userId)

  //   expect(mocked).toHaveBeenCalledWith(deck.userId)
  // })
})
