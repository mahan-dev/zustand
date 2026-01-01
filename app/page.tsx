import App from "@/components/templates/BearNames";
import MyComponent from "@/components/templates/TestComponent";
import FetchLists from "@/templates/FetchLists";
import Home from "@/templates/Home";

const page = () => {
  return (
    <div>
      {/* <Home /> */}
      {/* <FetchLists /> */}
      <App />
      <MyComponent />
    </div>
  );
};

export default page;
