import { useNavigate } from "react-router-dom";
import BlurBox from "../components/BlurBox";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <BlurBox>
      <h1 className="text-black">The page you are looking for could not be found</h1>
      <button className="text-blue-500" onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    </BlurBox>
  );
};

export default PageNotFound;
