import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../components/SignIn';

test('calls onSubmit with correct arguments', async () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<SignInForm onSubmit={onSubmit} />);

  fireEvent.changeText(getByTestId('usernameField'), 'kalle');
  fireEvent.changeText(getByTestId('passwordField'), 'password');
  fireEvent.press(getByTestId('submitButton'));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
