import SignInModal from './SignInModal';

interface SignInAlertModalProps {
  message: string;
  onSignInSuccess?: () => void;
}

/**
 * SignInAlertModal component
 * @param {string} message - The message to display
 * @param {function} [onSignInSuccess] - Callback function when user signs in
 */
export default function SignInAlertModal({
  message,
  onSignInSuccess,
}: SignInAlertModalProps) {
  return (
    <div
      data-testid="sign-in-alert"
      className="flex flex-col items-center space-y-2"
    >
      <p>{message}</p>
      <SignInModal onSignInSuccess={onSignInSuccess} />
    </div>
  );
}
