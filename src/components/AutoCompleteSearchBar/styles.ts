import styled from 'styled-components'

export const AutoCompleteSearchWrapper = styled.div`
  width: 100%;
  max-width: 570px;

  position: relative;
`

export const AutoCompleteSearch = styled.div`
  border: 1px solid #5479f7;
  border-radius: 5px;

  display: flex;
  height: 50px;

  input {
    width: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;

    text-indent: 8px;
  }

  button {
    background: #ffff;
    border: none;
    border: 1px solid #007cff82;
    border-radius: 0px 5px 5px 0px;

    width: 245px;
    color: #5479f7;

    cursor: pointer;
  }
`

export const SuggestionsContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 4px;
`
