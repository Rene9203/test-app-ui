export class PagedResult<TEntity> {
  constructor(public data: Array<TEntity> = [],
              public page: number = null,
              public pagesCount: number = null) {
  }
}
