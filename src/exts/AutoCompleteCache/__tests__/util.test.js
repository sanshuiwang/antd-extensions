import { uniqArray, differenceArray, delay } from '../util'

describe('AutoCompleteCache/util', () => {
  describe('delay("string", 800), first param is not function', () => {
    it('first param is not function', () => {
      try {
        delay('string', 800)
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError)
        expect(error.message).toBe('Expected a function')
      }
    })
  })

  describe('delay(function), return line', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    it('delay(function), setTimeout', () => {
      const callback = jest.fn()

      const timer = delay(callback)

      expect(timer).toBeDefined()

      // 在这个时间点，定时器的回调不应该被执行
      expect(callback).not.toBeCalled()

      // “快进”时间使得所有定时器回调被执行
      jest.runAllTimers()

      // 现在回调函数应该被调用了,并且被执行了一次
      expect(callback).toBeCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('delay(function,time), setTimeout', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    it('delay(function,time), setTimeout', () => {
      const callback = jest.fn()

      const timer = delay(callback, 1000)

      expect(timer).toBeDefined()

      // 在这个时间点，定时器的回调不应该被执行
      expect(callback).not.toBeCalled()

      // “快进”时间使得所有定时器回调被执行
      jest.runAllTimers()

      // 现在回调函数应该被调用了,并且被执行了一次
      expect(callback).toBeCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('uniqArray(["a", "b","a",2, 3, 2, true, true, false])', () => {
    it('should equal ["a", "b", 2, 3,true,false]', () => {
      expect(uniqArray(['a', 'b', 'a', 2, 3, 2, true, true, false])).toEqual(['a', 'b', 2, 3, true, false])
    })
  })

  describe('uniqArray(null)', () => {
    it('should equal null', () => {
      expect(uniqArray(null)).toBeNull()
    })
  })

  describe('differenceArray(["a", " ", 2, true, false, null, undefined,],[" ", true, false, null, undefined])', () => {
    it('should equal ["a", 2]', () => {
      expect(
        differenceArray(['a', ' ', 2, true, false, null, undefined], [' ', true, false, null, undefined])
      ).toEqual(['a', 2])
    })
  })

  describe('differenceArray(null)', () => {
    it('should equal null', () => {
      expect(differenceArray(null)).toBeNull()
    })
  })
})
