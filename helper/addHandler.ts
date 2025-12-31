import axios from "axios";

import { BASE_URL } from "@/api/api";
import { FormState, FormStatus } from "@/types/helper/type";

const addHandler = async (
  prevState: FormStatus,
  formData: FormData
): Promise<FormState> => {
  const form = Object.fromEntries(formData.entries());
  console.log(form);

  //   await fetch(`${BASE_URL}posts`);
  try {
    const { data }: FormState = await axios.post(`${BASE_URL}posts`, form);
    // const { data }: FormState = res.data;

    return {
      error: null,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "something wen't wrong";

    return {
      ...prevState,
      error: errorMessage,
    };
  }
};

export { addHandler };
