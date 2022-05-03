export type Item = {
  Type: 'Category' | 'Topic'
  Id: string
  Title: string
  ParentId: number
  TranslationId: string
}

export type ItemList = {
  Result: {
    Error: string
    Total: number
    Query: {
      ApiVersion: string
      ApiType: string
      TopicId: string | null
      ToolId: string | null
      CategoryId: string | null
      PopulationId: string | null
      Keyword: string | null
      Who: string | null
      Age: string | null
      Sex: string | null
      Pregnant: string | null
      TobaccoUse: string | null
      SexuallyActive: string | null
      Category: string | null
      Lang: string
      Type: string | null
      ReturnType: string
      Callback: string | null
      HealthfinderPage: string | null
      APiType: string
    }
    Language: string
    Items: {
      Item: Array<Item>
    }
  }
}
