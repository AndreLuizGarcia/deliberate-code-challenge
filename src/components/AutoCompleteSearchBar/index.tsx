import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import myhealthfinderApi from '../../services/myhealthfinderApi'
import { Resource, TopicSearch } from '../../types/TopicSearch'
import SuggestionCard from '../SuggestionCard'
import {
  AutoCompleteSearchWrapper,
  AutoCompleteSearch,
  SuggestionsContainer
} from './styles'

export default function AutoCompleteSearchBar() {
  const [searchValue, setSearchValue] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<Resource[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (searchValue === '') {
      setSuggestions([])
      return
    }

    async function getSuggestions() {
      try {
        const { data } = await myhealthfinderApi.get<TopicSearch>(
          `/topicSearch.json?keyword=${searchValue}`
        )

        setSuggestions(data.Result.Resources.Resource.slice(0, 9))
      } catch (error) {
        console.error(
          'Something went wrong. Check the logs to get more details'
        )
      }
    }

    const timeoutId = setTimeout(() => {
      if (searchValue !== '') {
        getSuggestions()
      }
    }, 1500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchValue])

  function hanldeInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleInputOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    if (e?.relatedTarget?.localName === 'a') return
    setSuggestions([])
  }

  function handleOnSubmit() {
    navigate(`/search?keyword=${searchValue}`)
    setSearchValue('')
    setSuggestions([])
  }

  return (
    <AutoCompleteSearchWrapper>
      <AutoCompleteSearch>
        <input
          placeholder="Type your search here"
          onChange={hanldeInputOnChange}
          onBlur={handleInputOnBlur}
          value={searchValue}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            const ENTER = 'Enter'
            const target = event.target as HTMLInputElement
            if (event.key === ENTER && target.value) {
              handleOnSubmit()
            }
          }}
        />
        <button onClick={handleOnSubmit}>Search for more results</button>
      </AutoCompleteSearch>
      <SuggestionsContainer>
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.Id}
            href={`/search?topicId=${suggestion.Id}`}
            className="suggestionCard"
          >
            <>
              <img
                src={suggestion.ImageUrl}
                alt={suggestion.ImageAlt}
                width={50}
                loading="eager"
              />
              <span title={suggestion.Title}>{suggestion.Title}</span>
            </>
          </SuggestionCard>
        ))}
      </SuggestionsContainer>
    </AutoCompleteSearchWrapper>
  )
}
