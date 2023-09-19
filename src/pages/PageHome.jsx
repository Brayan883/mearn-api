import ListPosts from "../componets/ListPosts";
import { Col } from "@tremor/react";
import { Grid } from "@tremor/react";
import { FormPost } from "../componets/FormPost";

const PageHome = () => {

  

  return (
    <>
      <div className="container mx-auto h-screen p-4">
        <Grid numItems={1}  numItemsLg={2} className="gap-4"  >
          <Col numColSpan={1}  >
            <FormPost />
          </Col>
          <Col numColSpan={1}>
            {" "}
            <ListPosts />{" "}
          </Col>
        </Grid>
      </div>
    </>
  );
};

export default PageHome;
