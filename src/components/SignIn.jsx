import { useFormik } from "formik";
import Text from "./Text";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
  },
  text: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 3,
  },
  errorInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    borderRadius: 3,
  },
  button: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: "#0366d6",
    borderRadius: 3,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is a required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
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
        style={!formik.errors.username ? styles.input : styles.errorInput}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red", paddingLeft: 10 }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry={true}
        style={!formik.errors.password ? styles.input : styles.errorInput}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red", paddingLeft: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight="bold" color="white" style={{ textAlign: "center" }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
