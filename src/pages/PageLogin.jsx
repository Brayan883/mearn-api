import { useMutation } from "react-query";
import { Login } from "../services/auth";
import { useStore } from "../store/Store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Theme } from "react-daisyui";
import { AxiosError } from "axios";

const PageLogin = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation(({ email, password }) =>
    Login({ email, password })
  );

  const addToken = useStore((state) => state.addToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = Object.fromEntries(new FormData(e.target));
      const data = await loginMutation.mutateAsync({ email, password });
      if (data) {
        addToken({ token: data.token });
        window.localStorage.setItem("IsUser", true);
        window.localStorage.setItem("StartTime", new Date().getTime());
        navigate("/home");
      } else {
        throw new Error("Error fetching data");
      }
      e.target.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.errors)) {
          const { errors } = error.response.data;
          errors.forEach((errorMessage) => {
            toast.error(errorMessage.message);
          });
          return;
        } else {
          toast.error(error.response?.data.message || error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Theme dataTheme="light">
        <div className="grid place-items-center h-screen   bg-[url('https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')]  bg-cover bg-no-repeat bg-center">
          <Card className="w-full max-w-lg bg-slate-800 shadow border border-slate-800">
            <Card.Body>
              <Card.Title
                tag={"h1"}
                className="mx-auto text-center text-3xl text-white"
              >
                Login
              </Card.Title>
              <form onSubmit={handleSubmit} className="p-2">
                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Input
                    dataTheme="dark"
                    className="w-full"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Input
                    dataTheme="dark"
                    className="w-full bg-none text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Button type="submit" variant="outline" color="success">
                    {loginMutation.isLoading ? "Ingresando..." : "Login"}
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Theme>
    </>
  );
};

export default PageLogin;
