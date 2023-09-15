import { useQuery } from "react-query";
import { toast } from "sonner";
import UseToken from "../hooks/UseToken";

const PageHome = () => {
  const list_post = async () => {
    const instance = UseToken();
    const reponde = await instance.get("api/v1/posts");
    return reponde.data;
  };

  const { data, isLoading, isError, error } = useQuery("list_post", list_post, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="">
        <ul>
          {!isLoading &&
            !isError &&
            data.length > 0 &&
            data?.map((post) => <li key={post.id}>{post.title}</li>)}
          {isLoading && <li>Cargando...</li>}
          {!isLoading && !isError && data?.length === 0 && <> No hay posts </>}
          {!isLoading && isError && <>{error.message}</>}
        </ul>
      </div>
    </>
  );
};

export default PageHome;
