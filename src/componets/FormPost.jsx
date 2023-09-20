/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "react-query";
import { useStore } from "../store/Store";
import { toast } from "sonner";
import { Button, Card, Input } from "react-daisyui";
import { AxiosError } from "axios";

export const FormPost = () => {
  const queryClient = useQueryClient();
  const refreshToken = useStore((state) => state.refreshToken);

  const AddPosts = useMutation({    
    mutationFn: async ({ title, content, published }) => {
      await new Promise((resolve) => setTimeout(resolve, 9000));
      return refreshToken()
        .post("api/v1/posts", { title, content, published })
        .then((response) => response?.data);
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["list_post"],
      });

      const prevData = queryClient.getQueryData(["list_post"]);

      queryClient.setQueryData(["list_post"], (oldData) => {
        const newCommentToAdd = structuredClone(data);        
        newCommentToAdd.preview = true;
        if (oldData == null) return [newCommentToAdd];        
        return [...oldData, {  id:window.crypto.randomUUID(), ...newCommentToAdd, }];
      });

      return {
        prevData,
      };
    },
    onError: (error, variables, context) => {
      if (context?.prevData != null) {
        queryClient.setQueryData(["list_post"], context.prevData);
      }
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data.errors)) {
          const { errors } = error.response.data;
          errors.forEach((errorMessage) => {
            toast.error(errorMessage.message);
          });
          return;
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Post agregado correctamente");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["list_post"],
      });
    },   
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, published } = Object.fromEntries(
      new FormData(e.target)
    );
    AddPosts.mutate({ title, content , published });
    e.target.reset();
  };

  return (
    <>
      <div className="p-4">
        <Card className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out">
          <Card.Body>
            <Card.Title
              tag={"h1"}
              className="w-full px-5 text-2xl text-emerald-600"
            >
              Agregar Posts
            </Card.Title>
            <form onSubmit={handleSubmit} className="p-2">
              <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                <Input
                  className="w-full"
                  type="text"
                  name="title"
                  placeholder="agregar titulo "
                />
              </div>
              <div className="flex w-full  component-preview p-4 items-center justify-center gap-2 font-sans">
                <Input
                  className="w-full h-20"
                  type="text"
                  name="content"
                  placeholder="agregar descripcion"
                />
              </div>
              <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                <Button
                  type="submit"
                  disabled={AddPosts.isLoading}
                  className="w-full"
                  variant="outline"
                  color="success"
                >
                  {AddPosts.isLoading ? "Enviando..." : "Agregar"}
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
