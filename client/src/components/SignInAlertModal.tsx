import SignInModal from './SignInModal';

interface SignInAlertModalProps {
  message: string;
  onSignInSuccess: () => void;
}

export default function SignInAlertModal({ message, onSignInSuccess }: SignInAlertModalProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p>{message}</p>
      <SignInModal onSignInSuccess={onSignInSuccess} />
    </div>
  );
}
