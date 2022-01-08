import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MyShopImages from '../../components/common/MyShop/MyShopImages';

describe('MyShopImages', () => {
  test('renders MyShopImages component', () => {
    render(
      <MyShopImages show={true} setUrl={() => true} setShow={() => false} />
    );

    //screen.debug();
    userEvent.click(screen.getByLabelText(/button-details-Apples/i));
    expect(screen.getByText(/Apples/i)).toBeInTheDocument();
  });
});
