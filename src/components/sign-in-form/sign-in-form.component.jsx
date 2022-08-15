import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button from "../button/button.compenent";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import { async } from "@firebase/util";

const defaultSignInFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [signInFormFields, setSignInFormFields] = useState(
    defaultSignInFormFields
  );

  const resetFormFields = () => {
    setSignInFormFields(defaultSignInFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFormFields({ ...signInFormFields, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, password } = signInFormFields;
    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      console.log("Logged In Successfully");
      console.log(user);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.error(error);
      }
    }
  };

  const { email, password } = signInFormFields;

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
