import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.h1`
  span {
    color: white;
  }
`

export const ListGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`

export const ResultCard = styled.div`
  display: flex;
  flex-direction: column;

  background: white;

  border-radius: 5px;

  padding: 8px;

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 5px 0px 0px 0px;

    margin-right: 16px;
    margin-bottom: 16px;
  }

  > div {
    display: flex;

    div {
      display: flex;
      flex-direction: column;

      gap: 8px;
    }
  }

  p {
    ol,
    ul {
      list-style-position: inside;
    }
  }

  details + details {
    margin-top: 8px;
  }
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 16px;

  label {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;

    input {
      margin-right: 8px;
    }
  }
`

export const ListWrapper = styled.div`
  display: flex;

  margin-top: 16px;
`
