import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
    test('renders input and button', () => {
        render(<SearchBar onSearch={() => {}} />); // Render the SearchBar component

        const inputElement = screen.getByPlaceholderText(/Enter username/i);
        const buttonElement = screen.getByText(/Search/i);

        expect(inputElement).toBeInTheDocument(); // Check if input is in the document
        expect(buttonElement).toBeInTheDocument(); // Check if button is in the document
    });

    test('calls onSearch with the input value when button is clicked', () => {
        const mockOnSearch = jest.fn(); // Create a mock function
        render(<SearchBar onSearch={mockOnSearch} />); // Render the SearchBar component

        const inputElement = screen.getByPlaceholderText(/Enter username/i);
        const buttonElement = screen.getByText(/Search/i);

        fireEvent.change(inputElement, { target: { value: 'haidar' } }); // Simulate typing in the input
        fireEvent.click(buttonElement); // Simulate clicking the button

        expect(mockOnSearch).toHaveBeenCalledWith('haidar'); // Check if onSearch was called with the correct value
    });

    test('disables input and button when isLoading is true', () => {
        render(<SearchBar onSearch={() => {}} isLoading={true} />); // Render with loading state

        const inputElement = screen.getByPlaceholderText(/Enter username/i);
        const buttonElement = screen.getByText(/Search/i);

        expect(inputElement).toBeDisabled(); // Check if input is disabled
        expect(buttonElement).toBeDisabled(); // Check if button is disabled
    });
});
