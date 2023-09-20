/* eslint-disable react/prop-types */

import { toast } from "sonner";
import { useStore } from "../store/Store";
import { useQuery } from "react-query";
import { Button, Card, Loading, Table } from "react-daisyui";

const ListNotPosts = () => {
  return (
    <>
      <div className="p-4">
        <Card className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out"  >
          <Card.Body>
            <Card.Title className="mx-auto" >List Not Posts</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const ListTable = ({ data }) => {
  return (
    <>
      <div className="p-4">
        <Card  className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out" >
          <Card.Title className="p-4" >  Listado de post </Card.Title>
          <Card.Body>
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <span />
                  <span>Id</span>
                  <span>Titulo</span>
                  <span>Descripcion</span>
                  <span>Opciones</span>
                </Table.Head>

                <Table.Body>
                  {data?.map((item) => (
                    <Table.Row key={item.id}>
                      <span></span>
                      <span>{item.id}</span>
                      <span>{item.title}</span>
                      <span>{item.content}</span>
                      <span className="flex gap-2">
                        <Button size="sm" variant="outline" color="info">Editar</Button>
                        <Button size="sm" variant="outline" color="error">Eliminar</Button>
                      </span>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
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
        .then((response) => response?.data?.posts);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(postList?.data)

  return (    
    <>
      {!postList.isLoading && postList?.data.length > 0 && (
        <ListTable data={postList?.data} />
      )}
      {postList.isLoading && (
        <>
          {" "}
          <div className="flex justify-center p-5 ">
            <Loading size="lg" variant="bars" />
          </div>
        </>
      )}
      {!postList.isLoading && postList?.data?.length === 0 && (
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
