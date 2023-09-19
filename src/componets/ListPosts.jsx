/* eslint-disable react/prop-types */
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Title,
  Text,
  Metric,
} from "@tremor/react";
import { toast } from "sonner";
import { useStore } from "../store/Store";
import { useQuery } from "react-query";
import { Button } from "@tremor/react";
import { Badge } from "@tremor/react";

const ListNotPosts = () => {
  return (
    <>
      <Text color="emerald" className="text-center text-3xl">
        <Metric color="emerald"> No hay post </Metric>
      </Text>
    </>
  );
};

const ListTable = ({ data }) => {
  return (
    <>
      <Card>
        <Title >Lista de posts</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell>Titulo</TableHeaderCell>
              <TableHeaderCell>Descripcion</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Text color="emerald"  >{item.title}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.content}</Text>
                </TableCell>
                <TableCell className="">
                  <Card className="relative flex gap-2 justify-center">
                    <Badge
                      className=" absolute z-40 -top-3 -right-3  "
                      color={item.published ? "emerald" : "rose"}
                    >
                      {" "}
                      {item.published ? "Activo" : "Inactivo"}{" "}
                    </Badge>
                    <Button size="sm" color="blue">
                      {" "}
                      Editar{" "}
                    </Button>
                    <Button size="sm" color="red">
                      {" "}
                      Eliminar{" "}
                    </Button>
                  </Card>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

const ListPosts = () => {
  const refreshToken = useStore((state) => state.refreshToken);
  const postList = useQuery(
    "list_post",
    () => {
      return refreshToken()
        .get("api/v1/posts")
        .then((response) => response?.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      {!postList.isLoading && postList.data?.posts?.length > 0 && (
        <ListTable data={postList?.data?.posts} />
      )}
      {postList.isLoading && (
        <>
          {" "}
          <Text className="text-center">Cargando...</Text>{" "}
        </>
      )}
      {!postList.isLoading && postList?.data?.posts?.length === 0 && (
        <ListNotPosts />
      )}
      {!postList.isLoading && postList.isError && (
        <>
          {" "}
          {toast.error(
            postList.error.message.includes("401")
              ? "sesion expirada"
              : postList.error.message
          )}{" "}
        </>
      )}
    </>
  );
};

export default ListPosts;
