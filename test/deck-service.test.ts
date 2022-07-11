describe('some new test suite', () => {
  it('should run a new test suite', () => {
    console.log('new test')
    expect(true).toBe(true)
  })

  it('should fail', () => {
    console.log('new test')
    expect(true).toBe(false)
  })
})
