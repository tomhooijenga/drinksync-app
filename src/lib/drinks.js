export const categories = [{
  icon: 'beer-large',
  name: 'Beer'
}, {
  icon: 'wine',
  name: 'Wine'
}, {
  icon: 'cocktail',
  name: 'Cocktail'
}, {
  icon: 'shot',
  name: 'Spirit'
}, {
  icon: 'beer-bottle',
  name: 'Other'
}]

export const defaultDrinks = [{
  key: 'beer',
  name: 'Beer',
  volume: 200,
  percentage: 5,
  category: categories[0]
}, {
  key: 'wine',
  name: 'Wine',
  volume: 100,
  percentage: 12,
  category: categories[1]
}, {
  key: 'shot',
  name: 'Shot',
  volume: 40,
  percentage: 40,
  category: categories[3]
}]
