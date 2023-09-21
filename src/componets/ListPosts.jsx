/* eslint-disable react/prop-types */
import { Button, Card, Loading, Table } from "react-daisyui";
import { UseQuery } from "../hooks/UseQuerys";
import { HandleModal } from "./HandleModal";
import { useState } from "react";
import { useRef } from "react";

const ListNotPosts = () => {
  return (
    <>
      <div className="p-4">
        <Card className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out">
          <Card.Body>
            <Card.Title className="mx-auto">List Not Posts</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const ListTable = ({ data }) => {
  const { deletePost } = UseQuery();
  const [ShowModal, SetShowModal] = useState(false);
  const DataUpdate = useRef({});
  const handleToggleModal = () => {
    SetShowModal(!ShowModal);
  };

  return (
    <>
      <div className="p-4">
        <Card className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out">
          <Card.Title className="p-4"> Listado de post </Card.Title>
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
                        <Button
                          size="sm"
                          onClick={() => {
                            DataUpdate.current = item;
                            handleToggleModal();
                          }}
                          variant="outline"
                          color="info"
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={
                            deletePost.isLoading &&
                            item.id === deletePost.data?.id
                          }
                          onClick={() => deletePost.mutate(item.id)}
                          color="error"
                        >
                          {deletePost.isLoading &&
                          item.id === deletePost.data?.id
                            ? "Eliminando..."
                            : "Eliminar"}
                        </Button>
                      </span>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
      {ShowModal && (
        <HandleModal
          DataUpdate={DataUpdate}
          modal={ShowModal}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
};

const ListPosts = () => {
  const { postList } = UseQuery();
  return (
    <>
      {!postList.isLoading && postList?.data?.length > 0 && (
        <ListTable data={postList?.data} />
      )}
      {postList.isLoading && (
        <>
          <div className="flex justify-center p-5 ">
            <Loading size="lg" variant="bars" />
          </div>
        </>
      )}
      {!postList.isLoading && postList?.data?.length === 0 && <ListNotPosts />}
    </>
  );
};

export default ListPosts;
