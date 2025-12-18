import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";

import {
  main,
  container,
  logo,
  tertiary,
  secondary,
  buttonContainer,
  button,
  paragraph,
  linkText,
  link,
} from "./styles";

interface MagicLinkEmailProps {
  magicLink?: string;
  name?: string;
}

const logoUrl = "https://ik.imagekit.io/to7rbsdcz/logo.svg";

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img src={logoUrl} width="80" height="80" alt="Chat" style={logo} />
        <Text style={tertiary}>Welcome to Chat</Text>
        <Heading style={secondary}>
          Click the magic link below to sign in to your Chat account
        </Heading>
        <Section style={buttonContainer}>
          <Link href={magicLink} style={button}>
            Sign in to App
          </Link>
        </Section>
        <Text style={paragraph}>
          You can also copy and paste this link into your browser:
        </Text>
        <Text style={linkText}>{magicLink}</Text>
        <Text style={paragraph}>Not expecting this email?</Text>
        <Text style={paragraph}>
          Contact{" "}
          <Link href="mailto:support@chat.com" style={link}>
            support@chat.com
          </Link>{" "}
          if you did not request this link.
        </Text>
      </Container>
    </Body>
  </Html>
);

MagicLinkEmail.PreviewProps = {
  magicLink: "https://chat.com/auth/magic-link?token=abc123xyz",
};

export default MagicLinkEmail;
