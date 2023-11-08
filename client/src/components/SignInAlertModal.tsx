import SignInModal from './SignInModal';

export default function SignInAlertModal({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p>{message}</p>
      <SignInModal />
    </div>
  );
}
