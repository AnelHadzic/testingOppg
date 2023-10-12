import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUser from "../CreateUser";

// At dataen blir sendt
const mockBruker = {
  userId: 1,
  brukernavn: "Anelh",
  passord: "test123",
};

// TESTER KOMPONENT, OG SER OG OM RENDERER INPUT FIELDS OG BUTTON
describe("komponenten renderer nødvendig data ", () => {
  it("renderer form", () => {
    // ARRANGE
    render(<CreateUser />);
    // ACT
    const form = screen.getByRole("form");
    // ASSERT
    expect(form).toBeInTheDocument();
  });

  it("renderer input for brukernavn", () => {
    render(<CreateUser />);

    const usernameInput = screen.getByTestId("brukernavn");
    expect(usernameInput).toBeInTheDocument();
  });

  it("renderer input for passord", () => {
    render(<CreateUser />);

    const passwordInput = screen.getByTestId("passord");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renderer input for confirm passord", () => {
    render(<CreateUser />);

    const confirmPassword = screen.getByTestId("confirm_passord");
    expect(confirmPassword).toBeInTheDocument();
  });

  it("renderer input for submit knapp", () => {
    render(<CreateUser />);

    const submitButton = screen.getByTestId("submit_button");
    expect(submitButton).toBeInTheDocument();
  });
});

// BRUKERNAVN VALIDERING
describe("Validates username input field", () => {
  // Her sjekker jeg først og fremst om det er mulig å endre input til username
  // Dermed har jeg REGEX test validering i selve appen. Utfører tester for å se om bruker får error hvis brukernavn ikke oppfyller kravene.
  // Brukernavn må starte med en bokstav, må være mellom 4 og 24 characters.

  it("should be able to change input field", () => {
    render(<CreateUser />);

    const usernameInput = screen.getByTestId("brukernavn") as HTMLInputElement;
    const testValue = "test";

    fireEvent.change(usernameInput, { target: { value: testValue } });
    expect(usernameInput.value).toBe(testValue);
  });

  it("should show an error if username doesn't fit requirements", () => {
    render(<CreateUser />);

    const usernameInput = screen.getByTestId("brukernavn") as HTMLInputElement;
    const testValue = "ane";

    fireEvent.change(usernameInput, { target: { value: testValue } });

    const submitButton = screen.getByTestId("submit_button");
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByTestId("error_username");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not show an error if username does fit the requirements", () => {
    render(<CreateUser />);

    const usernameInput = screen.getByTestId("brukernavn") as HTMLInputElement;
    const testValue = "Anelh2000";

    fireEvent.change(usernameInput, { target: { value: testValue } });

    const submitButton = screen.getByTestId("submit_button");
    fireEvent.click(submitButton);

    const error = screen.queryByTestId("error_username");
    expect(error).not.toBeInTheDocument();
  });
});

// PASSORD VALIDERING
describe("Validates password input field", () => {
  // Sjekk om onChange faktisk endrer value til passord.
  // Passordet må minst ha en lowercase, en uppercase, et tall, og en special character: !, @, #, $, %, og må være mellom 8 og 24 characters.

  it("should be able to change password input field", () => {
    render(<CreateUser />);

    const passordInput = screen.getByTestId("passord") as HTMLInputElement;
    const testValue = "test";

    fireEvent.change(passordInput, { target: { value: testValue } });
    expect(passordInput.value).toBe(testValue);
  });

  it("should show an error if password doesn't fit requirements", () => {
    render(<CreateUser />);

    const passordInput = screen.getByTestId("passord") as HTMLInputElement;
    const testValue = "Test123";

    fireEvent.change(passordInput, { target: { value: testValue } });

    const submitButton = screen.getByTestId("submit_button");
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByTestId("error_password");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not show an error if password fits the requirements", () => {
    render(<CreateUser />);

    const passordInput = screen.getByTestId("passord") as HTMLInputElement;
    const testValue = "Test123!";

    fireEvent.change(passordInput, { target: { value: testValue } });

    const submitButton = screen.getByTestId("submit_button");
    fireEvent.click(submitButton);

    const error = screen.queryByTestId("error_password");
    expect(error).not.toBeInTheDocument();
  });
});

// CONFIRM PASSORD VALIDERING

// DATA BLIR SENDT

// For en eller annen grunn, så kan den ikke starte API handleren, har en console for å sjekke der, men funker ikke. Har prøvd nå i 3 timer å løse det, men det fungerer fortsatt ikke. Så her må jeg evt. få tilbakemelding på hva som feilet.
describe("Testing API", () => {
  it("should recieve data to the post request", async () => {
    render(<CreateUser />);

    const usernameInput = screen.getByTestId("brukernavn") as HTMLInputElement;
    const usernameValue = "Anelh2000";
    fireEvent.change(usernameInput, { target: { value: usernameValue } });

    const passordInput = screen.getByTestId("passord") as HTMLInputElement;
    const passwordValue = "Test123!";
    fireEvent.change(passordInput, { target: { value: passwordValue } });

    const submitButton = screen.getByTestId("submit_button");

    fireEvent.click(submitButton);
    const success = await screen.findByTestId("success_status");
    expect(success).toBeInTheDocument();
  });
});
