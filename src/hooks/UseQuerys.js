import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStore } from "../store/Store";
import { toast } from "sonner";
export const UseQuery = () => {
  const queryClient = useQueryClient();
  const refreshToken = useStore((state) => state.refreshToken);

  const deletePost = useMutation({
    mutationFn: async (id) => {
      return refreshToken()
        .delete(`api/v1/posts/${id}`)
        .then((response) => response?.data);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["list_post"],
      });
      const prevData = queryClient.getQueryData(["list_post"]);
      queryClient.setQueryData(["list_post"], (oldData) => {
        return oldData.filter((product) => product.id !== id);
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
          toast.error(error.response?.data.message || error.message);
        }
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Post eliminado correctamente");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["list_post"],
      });
    },
  });

  const postList = useQuery({
    queryKey: ["list_post"],
    queryFn: async () => {
      return refreshToken()
        .get("api/v1/posts")
        .then((response) => response?.data?.posts);
    },
    refetchOnWindowFocus: false,
    onError: (error) => {
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
    },
  });

  const AddPosts = useMutation({
    mutationFn: async ({ title, content, published }) => {
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
        return [
          ...oldData,
          {
            id: window.crypto.randomUUID(),
            ...newCommentToAdd,
          },
        ];
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
          toast.error(error.response?.data.message || error.message);
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

  const updatePost = useMutation({
    mutationFn: async ({ id, title, content, published }) => {
      return refreshToken()
        .patch(`api/v1/posts/${id}`, { title, content, published })
        .then((response) => response?.data);
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["list_post"],
      });
      const prevData = queryClient.getQueryData(["list_post"]);
      queryClient.setQueryData(["list_post"], (oldData) => {
        return oldData.map((post) => {
          if (post.id === data.id) {
            return { ...post, ...data };
          }
          return post;
        });
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
          toast.error(error.response?.data.message || error.message);
        }
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Post actualizado correctamente");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["list_post"],
      });
    },
  });

  return {
    deletePost,
    postList,
    AddPosts,
    updatePost,
  };
};
