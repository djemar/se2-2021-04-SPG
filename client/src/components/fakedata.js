const products = [
  {
    id: 'p0',
    name: 'product0',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend risus quis ligula facilisis feugiat. Praesent turpis leo, efficitur sed lectus a, vulputate facilisis ipsum. Quisque accumsan placerat nisl, at.',
    quantity_available: '10',
    price: '€5.00',
    unit: 'kg',
  },
  {
    id: 'p1',
    name: 'product1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend risus quis ligula facilisis feugiat. Praesent turpis leo, efficitur sed lectus a, vulputate facilisis ipsum. Quisque accumsan placerat nisl, at.',
    quantity_available: '15',
    price: '€6.00',
    unit: 'kg',
  },
];

const categories = [
  { id: 'c0', name: 'All products', product: [products[0], products[1]] },
  {
    id: 'c1',
    name: 'Fruit & vegetable',
    product: [
      products[0],
      products[1],
      products[0],
      products[1],
      products[0],
      products[1],
      products[0],
      products[1],
    ],
  },
  { id: 'c2', name: 'Dairy', product: [products[0], products[1]] },
  { id: 'c3', name: 'Meat & cured meat', product: [products[0], products[1]] },
  { id: 'c4', name: 'Bread & sweets', product: [products[1]] },
  { id: 'c5', name: 'Other foods', product: [products[1]] },
  { id: 'c6', name: 'Drinks', product: [products[1]] },
  { id: 'c7', name: 'Gastronomy', product: [products[1]] },
];

export { categories };
