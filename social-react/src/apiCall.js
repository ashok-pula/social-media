import axios from "axios";

export const loginCall = async (usercredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "http://127.0.0.1:8800/api/auth/login",
      usercredentials
    );
    console.log(res.data);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};
