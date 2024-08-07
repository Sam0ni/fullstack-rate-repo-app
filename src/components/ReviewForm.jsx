import * as yup from "yup";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useReview from "../hooks/useReview";

const initialValues = {
  ownerUsername: "",
  repositoryName: "",
  rating: "",
  review: "",
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
  ownerUsername: yup
    .string()
    .required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .integer()
    .min(0, "Number must be between 0 and 100")
    .max(100, "Number must be between 0 and 100")
    .required("Rating is required"),
  review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerUsername}
        onChangeText={formik.handleChange("ownerUsername")}
        style={
          formik.touched.ownerUsername && formik.errors.ownerUsername
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.ownerUsername && formik.errors.ownerUsername && (
        <Text error="error">{formik.errors.ownerUsername}</Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        style={
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text error="error">{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        style={
          formik.touched.rating && formik.errors.rating
            ? styles.errorInput
            : styles.input
        }
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text error="error">{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        style={styles.input}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontWeight="bold" color="white" style={{ textAlign: "center" }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [reviewSend] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerUsername, repositoryName, rating, review } = values;

    try {
      const { data } = await reviewSend({
        ownerName: ownerUsername,
        rating: parseInt(rating),
        repositoryName,
        text: review,
      });
      console.log(data);
      if (data.createReview.repositoryId) {
        navigate(`/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewForm onSubmit={onSubmit} />;
};

export default Review;
