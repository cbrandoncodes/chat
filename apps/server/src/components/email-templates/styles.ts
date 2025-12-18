const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  marginTop: "20px",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "68px 0 130px",
};

const logo = {
  margin: "0 auto",
};

const tertiary = {
  color: "#1E9980",
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  height: "16px",
  letterSpacing: "0",
  lineHeight: "16px",
  margin: "20px 8px 12px 8px",
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
};

const secondary = {
  color: "#000",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "24px",
  marginBottom: "0",
  marginTop: "8px",
  textAlign: "center" as const,
};

const buttonContainer = {
  margin: "32px auto 28px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#1E9980",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "20px",
  padding: "12px 24px",
  textDecoration: "none",
  textAlign: "center" as const,
};

const linkText = {
  color: "#1E9980",
  fontSize: "12px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  wordBreak: "break-all" as const,
  margin: "4px 0 20px 0",
  padding: "0 20px",
  textAlign: "center" as const,
};

const paragraph = {
  color: "#444",
  fontSize: "15px",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  letterSpacing: "0",
  lineHeight: "23px",
  padding: "0 40px",
  margin: "4px 0",
  textAlign: "center" as const,
};

const link = {
  color: "#444",
  textDecoration: "underline",
};

export {
  main,
  container,
  logo,
  tertiary,
  secondary,
  buttonContainer,
  button,
  linkText,
  paragraph,
  link,
};
