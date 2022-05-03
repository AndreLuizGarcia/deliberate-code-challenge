export type Resource = {
  Type: string
  Id: string
  Title: string
  TranslationId: string
  TranslationTitle: string
  Categories: string
  Populations: string
  MyHFTitle: string
  MyHFDescription: string
  MyHFCategory: string
  MyHFCategoryHeading: string
  LastUpdate: string
  ImageUrl: string
  ImageAlt: string
  AccessibleVersion: string
  RelatedItems: {
    RelatedItem: Array<{
      Type: string
      Id: string
      Title: string
      Url: string
    }>
  }
  Sections: {
    section: Array<{
      Title: string | null
      Description: string | null
      Content: string
    }>
  }
  MoreInfoItems: string | null
  HealthfinderLogo: string
  HealthfinderUrl: string
}

export type TopicSearch = {
  Result: {
    Error: string
    Language: string
    Total: number
    Query: {
      ApiVersion: string
      ApiType: string
      TopicId: string
      ToolId: string
      CategoryId: string
      PopulationId: string
      Keyword: string
      Who: string
      Age: string
      Sex: string
      Pregnant: string
      TobaccoUse: string
      SexuallyActive: string
      Category: string
      Lang: string
      Type: string
      ReturnType: string
      Callback: string
      HealthfinderPage: string
    }
    Resources: {
      Resource: Resource[]
    }
  }
}
