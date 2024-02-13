import { AlreadyLoggedCard } from "@/components/organisms/AlreadyLoggedCard";
import { SignUpForm } from "@/components/organisms/signUpForm";
import { getSession } from "@/lib/auth.guard";

export default function SignUp() {
  const session = getSession();

  if (session) {
    return (
      <section>
        <AlreadyLoggedCard />
      </section>
    );
  }
  return (
    <section>
      <SignUpForm />
    </section>
  );
}
