import { Html, Button } from "@react-email/components";

const OtpTemplate = (props) => {
  const { otp } = props;

  return (
    <Html lang="en">
      <Button>{otp}</Button>
    </Html>
  );
};

export default OtpTemplate;
