// @flow

type OrderBy = 'createdAt_DESC' | 'createdAt_ASC'

export type HistoryQueryParameter = {
  first: number,
  orderBy: OrderBy
}
