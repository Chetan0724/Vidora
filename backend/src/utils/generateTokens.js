const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const generateAccessAndRefreshTokens = async (user, res) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    res.cookie("refreshToken", refreshToken, cookieOptions);
    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating access and refresh tokens"
    );
  }
};
