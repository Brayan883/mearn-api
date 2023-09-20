import ListPosts from "../componets/ListPosts";
import { FormPost } from "../componets/FormPost";
import { Badge, Button, Dropdown, Indicator, Navbar } from "react-daisyui";

const PageHome = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="p-4">
          <Navbar className="shadow-md">
            <Navbar.Start>
              <Dropdown>
                <Button tag="label" color="ghost" shape="circle" tabIndex={0}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </Button>
                <Dropdown.Menu className="menu-sm w-52 mt-3 z-[1]">
                  <Dropdown.Item>Homepage</Dropdown.Item>
                  <Dropdown.Item>Portfolio</Dropdown.Item>
                  <Dropdown.Item>About</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Start>
            <Navbar.Center>
              <Button tag="a" color="ghost" className="normal-case text-xl">
                daisyUI
              </Button>
            </Navbar.Center>
            <Navbar.End className="navbar-end">
              <Button color="ghost" shape="circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
              <Button color="ghost" shape="circle">
                <Indicator>
                  <Badge
                    size="xs"
                    color="primary"
                    className={Indicator.Item.className()}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </Indicator>
              </Button>
            </Navbar.End>
          </Navbar>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 gap-2  ">
          <div className="col-span-1">
            <FormPost />
          </div>
          <div className="col-span-1">
            <ListPosts />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHome;
