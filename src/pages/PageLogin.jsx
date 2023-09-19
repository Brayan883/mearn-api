import { Button } from "@tremor/react";
import { Card, TextInput, Metric, Grid, Col } from "@tremor/react";
import { useMutation } from "react-query";
import { Login } from "../services/auth";
import { useStore } from "../store/Store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
      if (data) addToken({ token: data.token });
      e.target.reset();
      navigate("/home");      
    } catch (error) {
      if (Array.isArray(error?.response?.data?.errors)) {
        const { errors } = error.response.data;
        errors.forEach((errorMessage) => {
          toast.error(errorMessage.message);
        });
        return;
      }
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <Grid numItems={2} className="">
        <Col numColSpan={2} className="hidden lg:block">
          <form onSubmit={handleSubmit} className="">
            <div
              className="rounded-none h-screen grid place-items-center 
            bg-[url('https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80')]  bg-cover bg-no-repeat bg-center"
              style={{}}
            >
              <Card className="max-w-lg">
                <Metric className="" color="white">
                  Login
                </Metric>
                <div className="mt-4">
                  <TextInput
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                  />
                </div>
                <div className="mt-4">
                  <TextInput
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    variant="secondary"
                    color="emerald"
                    type="submit"
                    disabled={loginMutation.isLoading}
                  >
                    {loginMutation.isLoading ? "Enviando..." : "Iniciar sesión"}
                  </Button>
                </div>
              </Card>
            </div>
          </form>
        </Col>
      </Grid>
    </>
  );
};

export default PageLogin;
