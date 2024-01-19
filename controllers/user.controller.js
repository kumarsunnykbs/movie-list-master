import Users from "@/models/user.modal";

export const loginUser = async (req, res) => {
  const userData = req;
  let resultData = {};
  const result = await Users.find({ email: userData.email });
  console.log("=============");
  console.log(userData, result);
  console.log("=============");
  if (
    result.length &&
    result[0].email === userData.email &&
    result[0].password === userData.password
  ) {
    resultData = {
      status: 200,
      message: "Login Successfully.",
      userDetails: result[0],
    };
  } else if (result.length && result[0].password !== userData.password) {
    resultData = {
      status: 401,
      message: "Incorrect password, Please check your password",
      userDetails: {},
    };
  } else if (!result.length) {
    resultData = { status: 400, message: "User not found.", userDetails: {} };
  } else {
    resultData = {
      status: 400,
      message: "Something wrong please check spelling.",
      userDetails: {},
    };
  }
  return resultData;
};
