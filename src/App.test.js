import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from './App';

test('search input filters succulents by name', () => {
  render(<App />);
  const searchInput = screen.getByLabelText(/Search By Name/i);
  fireEvent.change(searchInput, { target: { value: 'Opuntia' } });

  const succulentCards = screen.queryAllByText(/Opuntia microdasys/i);
  expect(succulentCards.length).toBeGreaterThan(0);
});

test('category dropdown filters succulents by category', async () => {
  render(<App />);
  const categoryDropdown = await screen.findByLabelText(/Category/i);
  userEvent.click(categoryDropdown);

  const cactaceaeOption = await screen.findByText('Cactaceae', {}, { timeout: 5000 });
  userEvent.click(cactaceaeOption);
  await waitFor(() => {
    const succulentCards = screen.queryAllByText(/Opuntia microdasys/i);
    expect(succulentCards.length).toBeGreaterThan(0);
  });
});

test('clear button resets category filter', async () => {
  render(<App />);
  const categoryDropdown = await screen.findByLabelText(/Category/i);
  userEvent.click(categoryDropdown);
  const cactaceaeOption = await screen.findByText('Cactaceae');
  userEvent.click(cactaceaeOption);
  const clearButton = screen.getByText(/Clear/i);
  userEvent.click(clearButton);

  await waitFor(() => {
    expect(categoryDropdown.value).toBe('' || undefined);
  });
});
