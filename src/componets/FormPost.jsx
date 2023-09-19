import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { Text } from "@tremor/react";
import { Card } from "@tremor/react";
import { useMutation } from "react-query";
import { useStore } from "../store/Store";
import { toast } from "sonner";

export const FormPost = () => {
  const refreshToken = useStore((state) => state.refreshToken);
  const AddPosts = useMutation(({ titulo, descripcion }) =>
    refreshToken().post("api/v1/posts", { titulo, descripcion })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { titulo, descripcion } = Object.fromEntries(
        new FormData(e.target)
      );      
       AddPosts.mutateAsync({ titulo, descripcion });
      e.target.reset();
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
      <form onSubmit={handleSubmit} className="">
        <Card>
          <Text className="text-center text-3xl mb-3">
            {" "}
            Agregar un nuevo post{" "}
          </Text>
          <div className="mb-4">
            <TextInput
              type="text"
              name="titulo"
              id=""
              placeholder="Titulo"
            ></TextInput>
          </div>
          <div className="mb-4">
            <TextInput
              type="text"
              name="descripcion"
              id=""
              placeholder="descripcion"
              className="h-20"
            ></TextInput>
          </div>
          <div className="">
            <Button type="submit" className="w-full">
              Agregar
            </Button>
          </div>
        </Card>
      </form>
      {
        
      }
    </>
  );
};
