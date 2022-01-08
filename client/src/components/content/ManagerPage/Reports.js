import './Reports.css';
import { useEffect, useState } from 'react';
import Page from '../../misc/Page';
import 'react-datepicker/dist/react-datepicker.css';

import Breadcrumbs from '../../misc/Breadcrumbs';
import UnretrievedFoodReport from './UnretrievedFoodReport';

export const Reports = ({ ...props }) => {
  const { categories } = props;

  const [selectedReport, setSelectedReport] = useState('Unretrieved food');

  return (
    <>
      <Page title={'Reports - ' + selectedReport}>
        <UnretrievedFoodReport categories={categories} />
      </Page>
    </>
  );
};

export default Reports;
