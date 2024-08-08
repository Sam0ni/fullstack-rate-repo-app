import * as yup from "yup";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
  },
  input: theme.input,
  errorInput: theme.errorInput,
  button: theme.button,
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be between 5 and 30 letters long")
    .max(30, "Username must be between 5 and 30 letters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5 and 30 letters long")
    .max(30, "Password must be between 5 and 30 letters long")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match the password"
    )
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={
          formik.touched.username && formik.errors.username
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.username && formik.errors.username && (
        <Text error="error">{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={
          formik.touched.password && formik.errors.password
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.password && formik.errors.password && (
        <Text error="error">{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Password confirmation"
        secureTextEntry={true}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        style={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text error="error">{formik.errors.passwordConfirmation}</Text>
        )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight="bold" color="white" style={{ textAlign: "center" }}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUpSend] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUpSend({
        username,
        password,
      });
      if (data.createUser.username) {
        const { data } = await signIn({ username, password });
        if (data.authenticate) {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
