import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import AutoCompleteSearchBar from '../../components/AutoCompleteSearchBar'
import Header from '../../components/Header'
import myhealthfinderApi from '../../services/myhealthfinderApi'
import { Grid, Wrapper } from '../../styles/globalStyles'
import { Category, CategoryResponse } from '../../types/Category'
import { Resource, TopicSearch } from '../../types/TopicSearch'
import {
  FilterGroup,
  HeaderWrapper,
  ListGroup,
  ListWrapper,
  ResultCard,
  Title
} from './styles'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<Resource[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const keyword = searchParams.get('keyword') || ''
  const categoryId = searchParams.get('categoryId') || ''
  const topicId = searchParams.get('topicId') || ''

  const title = keyword ? `"${keyword}"` : 'your search'

  useEffect(() => {
    async function getResults() {
      setIsLoading(true)
      setResults([])

      try {
        const keywordParam = keyword ? `&keyword=${keyword}` : ''
        const categoryIdParam = categoryId ? `&categoryId=${categoryId}` : ''
        const topicIdParam = topicId ? `&topicId=${topicId}` : ''
        const { data } = await myhealthfinderApi.get<TopicSearch>(
          `/topicsearch.json?${keywordParam}${categoryIdParam}${topicIdParam}`
        )
        setResults(data.Result.Resources.Resource)
      } catch (error) {
        console.error(
          'Something went wrong. Check the logs to get more details'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getResults()
  }, [keyword, categoryId, topicId])

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await myhealthfinderApi.get<CategoryResponse>(
          '/itemlist.json?type=category'
        )
        setCategories(data.Result.Items.Item)
      } catch (error) {
        console.error(
          'Something went wrong. Check the logs to get more details'
        )
      }
    }

    getCategories()
  }, [])

  function handleCheckBox(
    isCheckboxChecked: boolean,
    categoryIdToParam: string
  ) {
    if (isCheckboxChecked) {
      const newParam = categoryId
        ? `${categoryId},${categoryIdToParam}`
        : categoryIdToParam

      setSearchParams({
        categoryId: newParam,
        keyword,
        topicId
      })

      return
    }

    if (!isCheckboxChecked) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const newParam = categoryId!
        .split(',')
        .filter((id) => id !== categoryIdToParam)
        .join(',')
      setSearchParams({
        categoryId: newParam,
        keyword,
        topicId
      })
    }
  }

  const isChecked = (id: string) => {
    const arrOfCategories = categoryId ? categoryId.split(',') : []

    return arrOfCategories.find(
      (categoriesIdInParams) => categoriesIdInParams === id
    )
      ? true
      : false
  }

  return (
    <Wrapper>
      <Grid>
        <HeaderWrapper>
          <Header />
          <AutoCompleteSearchBar />
        </HeaderWrapper>
        <Title>
          The results for <span>{title}</span> are here
        </Title>
        {isLoading && <h3>Loading ...</h3>}
        {results.length === 0 && isLoading === false && (
          <h3>There are no results for your search</h3>
        )}
        <ListWrapper>
          {categories.length !== 0 && !isLoading && (
            <FilterGroup>
              <span>Filter by category:</span>
              {categories.map((category, index) => (
                <label key={category.Id + index}>
                  <input
                    type="checkbox"
                    id={category.Id}
                    checked={isChecked(category.Id)}
                    onChange={(e) =>
                      handleCheckBox(e.target.checked, category.Id)
                    }
                  />
                  {category.Title}
                </label>
              ))}
            </FilterGroup>
          )}

          <ListGroup>
            {results.map((result) => (
              <ResultCard key={result.Id}>
                <div>
                  <img
                    src={result.ImageUrl}
                    alt={result.ImageAlt}
                    title={result.ImageAlt}
                    width={200}
                    height={134}
                  />
                  <div>
                    <span>Title: {result.Title}</span>
                    <span>Categories: {result.Categories}</span>
                    <ul>
                      Related Items:
                      {result.RelatedItems.RelatedItem.map(
                        (relatedItem, index) => (
                          <a key={relatedItem.Id} href={relatedItem.Url}>
                            {index !== 0 ? ', ' : ''}
                            {relatedItem.Title}
                          </a>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {result.Sections.section.map((section, index) => (
                  <details key={index}>
                    <summary>
                      {section.Title || 'Click here to learn more'}
                    </summary>
                    <p dangerouslySetInnerHTML={{ __html: section.Content }} />
                  </details>
                ))}
              </ResultCard>
            ))}
          </ListGroup>
        </ListWrapper>
      </Grid>
    </Wrapper>
  )
}
