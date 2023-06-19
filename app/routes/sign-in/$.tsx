// ** Clerk Signin Import
import { SignIn } from "@clerk/remix";
import { LinksFunction } from "@remix-run/node";

// ** Styles Import
import styles from "~/styles/sign-in.css"

// Import styles
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
]

export default function SignInPage() {
  return (
    <div className="container">
      <div className="mt-[50px]">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
