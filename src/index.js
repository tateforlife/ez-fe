import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import download from 'downloadjs';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

// const pdf = require('pdf-lib');
// const { PDFDocument } = pdf;

// async function modifyPdf() {
//     const url = 'http://127.0.0.1:10000/pdf'
//     const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
//     const pdfDoc = await PDFDocument.load(existingPdfBytes)
//     const form = pdfDoc.getForm()
//     const usernameField = form.getTextField('dropoffdate2')
//     usernameField.setText('20.02.2001 12:00')
//     form.flatten();

//     const pdfBytes = await pdfDoc.save()
//     // download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
// }

// modifyPdf();

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
