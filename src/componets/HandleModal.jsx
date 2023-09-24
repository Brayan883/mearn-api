/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Card, Input, Modal } from "react-daisyui";
import { UseQuery } from "../hooks/UseQuerys";

export const HandleModal = ({ modal, handleToggleModal, DataUpdate }) => {
  const [posts, setPosts] = useState(DataUpdate.current);
  const { updatePost  } = UseQuery()
  const handleSubmit = (e) => {
    e.preventDefault();    
    updatePost.mutate(posts);
    handleToggleModal();
  };
  
  return (
    <>
      <Modal open={modal} className=" max-w-2xl  ">
        <Modal.Header className="flex  justify-between ">
          {" "}
          <div className="">
            <h3 className="text-2xl text-blue-500">Editar Posts</h3>
          </div>{" "}
          <div className="">
            <Button
              size="sm"
              variant="outline"
              color="error"
              onClick={() => handleToggleModal()}
            >
              {" "}
              Cerrar{" "}
            </Button>
          </div>{" "}
        </Modal.Header>
        <Modal.Body>
          <Card className="w-full  shadow-xl hover:-translate-y-1 transition-all ease-out">
            <Card.Body>
              <form onSubmit={handleSubmit} className="p-2">
                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Input
                    className="w-full"
                    type="text"
                    name="title"
                    value={posts.title}
                    onChange={(e) =>    {
                      setPosts({ ...posts, title: e.target.value });
                    }   }
                    placeholder="agregar titulo "
                  />
                </div>
                <div className="flex w-full  component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Input
                    className="w-full h-20"
                    type="text"
                    name="content"
                    value={posts.content}
                    onChange={(e) => {
                      setPosts({ ...posts, content: e.target.value });
                    }}
                    placeholder="agregar descripcion"
                  />
                </div>
                <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                  <Button
                    type="submit"
                    className="w-full"
                    variant="outline"
                    color="success"
                    disabled={updatePost.isLoading}
                  >
                    {
                      updatePost.isLoading ? "Editando..." : "Editar"
                    }
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
