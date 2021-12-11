import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
import { React } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard/ProductCard';

jest.mock('axios');

beforeEach(() => {
  MockDate.set('2021-12-11T11:20:06.196Z');
});

afterEach(() => {
  MockDate.reset();
  jest.resetAllMocks();
});

describe('ProductCard', () => {
  test('Product card clicks', async () => {
    const addedProduct = {
      product_id: 0,
      name: 'product0',
      ref_farmer: 'user',
      description: 'Lorem Ipsum',
      availability: 10,
      price: 5,
      unit_of_measure: '1 kg',
    };
    render(
      <Router>
        <ProductCard
          key={addedProduct.product_id}
          pid={addedProduct.product_id}
          fid={addedProduct.ref_famer}
          name={addedProduct.name}
          price={addedProduct.price}
          description={addedProduct.description}
          //   category={addedProduct.category}
          unit={addedProduct.unit_of_measure}
          //   img={addedProduct.image_path}
          availability={addedProduct.availability}
          basketProducts={[
            {
              pid: 0,
              name: 'product0',
              fid: 'user',
              description: 'Lorem Ipsum',
              availability: 10,
              price: 5,
              unit_of_measure: '1 kg',
            },
          ]}
          preview={false}
          setBasketProducts={() => {
            return true;
          }}
          setAnimateBasket={() => {
            return true;
          }}
        />
      </Router>
    );

    expect(screen.getByText(/product0/i)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/btn-plus/i));
    userEvent.click(screen.getByLabelText(/btn-plus/i));
    userEvent.click(screen.getByLabelText(/btn-minus/i));
    userEvent.click(screen.getByLabelText(/btn-add-to-basket/i));
  });
  test('Product card clicks empty basket', async () => {
    const addedProduct = {
      product_id: 0,
      name: 'product0',
      ref_farmer: 'user',
      description: 'Lorem Ipsum',
      availability: 10,
      price: 5,
      unit_of_measure: '1 kg',
    };
    render(
      <Router>
        <ProductCard
          key={addedProduct.product_id}
          pid={addedProduct.product_id}
          fid={addedProduct.ref_famer}
          name={addedProduct.name}
          price={addedProduct.price}
          description={addedProduct.description}
          //   category={addedProduct.category}
          unit={addedProduct.unit_of_measure}
          //   img={addedProduct.image_path}
          availability={addedProduct.availability}
          basketProducts={[]}
          preview={false}
          setBasketProducts={() => {
            return true;
          }}
          setAnimateBasket={() => {
            return true;
          }}
        />
      </Router>
    );

    expect(screen.getByText(/product0/i)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/btn-plus/i));
    userEvent.click(screen.getByLabelText(/btn-plus/i));
    userEvent.click(screen.getByLabelText(/btn-minus/i));
    userEvent.click(screen.getByLabelText(/btn-add-to-basket/i));
  });
});
