/* eslint-disable react/prop-types */
import { Button, Card, Input } from "react-daisyui";
import { UseQuery } from "../hooks/UseQuerys";

export const FormPost = () => {
  const { AddPosts } = UseQuery();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, published } = Object.fromEntries(
      new FormData(e.target)
    );
    AddPosts.mutate({ title, content, published });
    e.target.reset();
  };

  return (
    <>
      <div className="">
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
