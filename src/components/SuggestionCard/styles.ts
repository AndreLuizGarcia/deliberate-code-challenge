import styled from 'styled-components'

export const SuggestionsCard = styled.a`
  display: flex;
  align-items: center;
  height: 40px;

  background-color: white;
  border: 1px solid #007cff82;
  border-radius: 5px;

  text-decoration: none;
  color: black;
  font-weight: 400;

  img {
    width: 100%;
    max-width: 50px;
    height: auto;
    margin-right: 8px;
    height: 100%;
    border-radius: 5px;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  }

  :hover {
    background-color: #fafafafa;
  }
`
