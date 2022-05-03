import React from 'react'

import AutoCompleteSearchBar from '../../components/AutoCompleteSearchBar'
import Header from '../../components/Header'
import { Grid, Wrapper } from '../../styles/globalStyles'
import { Main } from './styles'

export default function Home() {
  return (
    <Wrapper>
      <Grid>
        <Header />
        <Main>
          <h1>
            My Health <span>Finder</span>
          </h1>
          <h2>
            <span>Your portal</span> for health-related resources. <br />
            Find prevention topics, dietary and physical activity guidelines,
            and other health resources.
          </h2>
        </Main>
        <AutoCompleteSearchBar />
      </Grid>
    </Wrapper>
  )
}
