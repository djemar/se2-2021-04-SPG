import { Card } from 'react-bootstrap';
import Breadcrumbs from '../../misc/Breadcrumbs';
import './Orders.css';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import API from '../../../API';

export const ProductsList = ({ ...props }) => {
  const { products_and_qnt } = props;

  const [loading, setLoading] = useState(false);

  if (products_and_qnt === undefined) setLoading(true);

  function mapOrderProducts() {
    if (products_and_qnt && products_and_qnt.length > 0)
      return products_and_qnt.map((prod_and_qnt, index) => (
        <>
          <tr>
            <td className="text-center">{prod_and_qnt.prod}</td>
            <td className="text-center">{prod_and_qnt.qnt}</td>
          </tr>
        </>
      ));
  }

  return (
    <Table borderless responsive="md" striped>
      <thead>
        <tr>
          <th className="text-center">Product ID</th>
          <th className="text-center">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <h3>Please wait, we're loading these products...</h3>
        ) : (
          mapOrderProducts()
        )}
      </tbody>
    </Table>
  );
};

export default ProductsList;
