import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '8px 14px',
  lineHeight: 1.5,
  backgroundColor: '#222',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#222',
    borderColor: '#222',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#222',
    borderColor: '#222',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default function PageNotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <div className="w-96 flex justify-center items-center flex-col gap-6">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl text-slate-300 text-center">
          The page you are looking for doesn't exist or has been moved. Please go back to the homepage.
        </p>
        <BootstrapButton variant="contained" size="large" disableRipple>
          Go back home
        </BootstrapButton>
      </div>
    </div>
  );
}
