import { AlreadyLoggedCard } from "@/components/organisms/AlreadyLoggedCard";
import { LoginForm } from "@/components/organisms/loginForm";
import { getSession } from "@/lib/auth.guard";

const Login = () => {
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
      <LoginForm />
    </section>
  );
};

export default Login;
