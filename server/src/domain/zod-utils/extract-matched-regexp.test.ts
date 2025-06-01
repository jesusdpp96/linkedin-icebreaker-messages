import { describe, it, expect } from '@jest/globals'
import { z } from 'zod'
import { extractMatchedRegexp } from './extract-matched-regexp'

describe('extractMatchedRegexp', () => {
  const linkedinProfileRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9%-]+\/?/
  const rules = z.string().regex(linkedinProfileRegex)

  const validUrls = [
    'https://www.linkedin.com/in/johndoe/',
    'https://www.linkedin.com/in/john-doe/',
    'https://linkedin.com/in/jane-doe-12345',
    'https://www.linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239/',
  ]

  const invalidUrls = [
    'https://linkedin.com/company/google',
    'https://www.linkedin.com/',
    'https://linkedin.com/in/',
    'https://example.com/in/johndoe',
    'https://linkedin.com/',
  ]

  const childUrlsWithQueries = [
    {
      input: 'https://www.linkedin.com/in/johndoe/recent-activity/',
      expected: 'https://www.linkedin.com/in/johndoe/',
    },
    {
      input: 'https://www.linkedin.com/in/john-doe-12345/recent-activity/comments/',
      expected: 'https://www.linkedin.com/in/john-doe-12345/',
    },
    {
      input: 'https://linkedin.com/in/jane-doe-12345?trk=public_profile',
      expected: 'https://linkedin.com/in/jane-doe-12345',
    },
    {
      input:
        'https://www.linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239/recent-activity/comments/',
      expected: 'https://www.linkedin.com/in/jes%C3%BAs-david-p%C3%A9rez-p%C3%A9rez-2b654b239/',
    },
  ]

  it('should extract the matched part of valid LinkedIn profile URLs', () => {
    validUrls.forEach(url => {
      const result = extractMatchedRegexp(rules, url)
      expect(result).toBe(url.match(linkedinProfileRegex)?.[0])
    })
  })

  it('should return the original value for invalid LinkedIn profile URLs', () => {
    invalidUrls.forEach(url => {
      const result = extractMatchedRegexp(rules, url)
      expect(result).toBe(url)
    })
  })

  it('should extract the matched part of child URLs or URLs with queries', () => {
    childUrlsWithQueries.forEach(({ input, expected }) => {
      const result = extractMatchedRegexp(rules, input)
      expect(result).toBe(expected)
    })
  })

  it('should return the original value if the input is not a string', () => {
    const nonStringValues = [null, undefined, 123, {}, []]
    nonStringValues.forEach(value => {
      const result = extractMatchedRegexp(rules, value as unknown as string)
      expect(result).toBe(value)
    })
  })

  it('should return the original value if no regex is defined in the rules', () => {
    const noRegexRules = z.string()
    const result = extractMatchedRegexp(noRegexRules, 'https://www.linkedin.com/in/johndoe/')
    expect(result).toBe('https://www.linkedin.com/in/johndoe/')
  })
})
