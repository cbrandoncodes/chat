export function getNameInitials(name: string) {
  const [firstName, lastName] = name.split(" ");

  return `${firstName.charAt(0).toUpperCase()}${lastName?.charAt(0)?.toUpperCase() || ""}`;
}

export function formatEmail(email: string) {
  const formattedEmail = email.toLowerCase();

  if (formattedEmail.length <= 20) {
    return formattedEmail;
  }

  const [localPart, domain] = formattedEmail.split("@");

  if (!domain) {
    return formattedEmail;
  }

  const maxLocalLength = 11;
  const truncatedLocal = localPart.slice(0, maxLocalLength);

  return `${truncatedLocal}...@${domain}`;
}
