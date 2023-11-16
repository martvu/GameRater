import SignInModal from './SignInModal';

export default function SignInAlertModal({ message }: { message: string }) {
  return (
    <div data-testid="sign-in-alert" className="flex flex-col items-center space-y-2">
      <p>{message}</p>
      <SignInModal />
    </div>
  );
}
