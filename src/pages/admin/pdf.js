import React from 'react';
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import moment from 'moment';

function InvoicePDF({ data }) {
  return (
    <button>
    <PDFDownloadLink document={<InvoiceDocument data={data} />} fileName="invoice.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  </button>
  );
}

function InvoiceDocument({ data }) {
  return (
    <Document>
      <Page>
        <View>
          <Text>User Name: {data.userFirstName}</Text>
          <Text>Vehicle Name: {data.vehicleModelName}</Text>
          <Text>Vehicle Price/Hr: Rs.{data.vehiclePricePerHour}</Text>
          <Text>From Date: {moment(data.fromDate).format('DD/MM/YYYY')}</Text>
          <Text>From Time: {moment(data.fromTime,'HH:mm:ss').format('hh:mm A')}</Text>
          <Text>To Date: {moment(data.toDate).format('DD/MM/YYYY')}</Text>
          <Text>To Time: {moment(data.toTime,'HH:mm:ss').format('hh:mm A')}</Text>
          <Text>Base Amount: Rs.{data.amount}</Text>
          <Text>Penalties: Rs.{data.costForPenalties}</Text>
          <Text>Tax: Rs.{data.taxAndOthers}</Text>
          <Text>Total Amount: Rs.{data.totalAmount}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDF;