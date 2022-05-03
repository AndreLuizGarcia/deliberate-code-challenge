import React from 'react'

import { SuggestionsCard } from './styles'

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: JSX.Element
}

const SuggestionCard: React.FC<AProps> = ({ children, ...props }) => {
  return <SuggestionsCard {...props}>{children}</SuggestionsCard>
}

export default SuggestionCard
