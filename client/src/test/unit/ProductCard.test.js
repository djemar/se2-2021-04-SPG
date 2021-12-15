import React from 'react';
import { render, screen } from '@testing-library/react';
import TimeContextProvider from '../../context/TimeContext';
import UserContextProvider from '../../context/UserContext';
import ProductCard from '../../components/common/ProductCard/ProductCard';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('ProductCard', () => {
  test('renders ProductCard component not for preview', () => {
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
        <TimeContextProvider>
          <UserContextProvider>
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
            />
          </UserContextProvider>
        </TimeContextProvider>
      </Router>
    );

    screen.debug()
    expect(screen.getByText(/product0/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/btn-add/i));
  });

  test('renders ProductCard component for preview', () => {
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
          preview={true}
          flagAddOrEdit={true}
        />
      </Router>
    );

    screen.debug()
    expect(screen.getByText(/product0/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/btn-edit/i));
  });
});
