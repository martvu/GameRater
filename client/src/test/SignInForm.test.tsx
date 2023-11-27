import { SignInForm } from "@/components/SignInForm";
import { allMocks } from "@/mocks/mockQueries";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { vi } from "vitest";


const onCloseMock = vi.fn();

const renderSignInForm = () => {
  return (
    render(
    <MockedProvider mocks={allMocks} addTypename={false}>
      <RecoilRoot>
        <SignInForm onClose={onCloseMock} />
      </RecoilRoot>
    </MockedProvider>
    )
  );
};
describe('SignInForm Component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = renderSignInForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    renderSignInForm();
    expect(document.querySelector('form')).toBeInTheDocument();
    expect(document.querySelector('input[name="username"]')).toBeInTheDocument();
    expect(document.querySelector('button[type="submit"]')).toBeInTheDocument();
  });

  it('signs in', async () => {
    renderSignInForm();
    await userEvent.type(screen.getByLabelText('Username'), 'testuser{enter}');
    expect(onCloseMock).toHaveBeenCalled();
  });
});