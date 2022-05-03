import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AutoCompleteSearchBar from '../../components/AutoCompleteSearchBar'
import Header from '../../components/Header'
import myhealthfinderApi from '../../services/myhealthfinderApi'
import { Grid, Wrapper } from '../../styles/globalStyles'
import { Item, ItemList } from '../../types/ItemList'
import { HeaderWrapper, OrderedList, Title } from './styles'

export default function Categories() {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Array<Item>>([])
  const type = {
    Category: 'categoryId',
    Topic: 'topicId'
  }

  useEffect(() => {
    setIsLoading(true)
    async function getCategories() {
      try {
        const { data } = await myhealthfinderApi.get<ItemList>('/itemlist.json')
        setCategories(data.Result.Items.Item)
      } catch (error) {
        console.error(
          'Something went wrong. Check the logs to get more details'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getCategories()
  }, [])

  return (
    <Wrapper>
      <Grid>
        <HeaderWrapper>
          <Header />
          <AutoCompleteSearchBar />
        </HeaderWrapper>
        <Title>
          Here you can check <span> all available categories</span>
        </Title>
        <OrderedList>
          {isLoading && <h3>Loading ...</h3>}
          {categories.length === 0 && isLoading === false && (
            <h3>There are no results for your search</h3>
          )}
          {categories.map((item, index) => {
            return (
              <li key={item.Id + index}>
                <Link to={`/search?${type[item.Type]}=${item.Id}`}>
                  {item.Title}
                </Link>
              </li>
            )
          })}
        </OrderedList>
      </Grid>
    </Wrapper>
  )
}
