import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the home page
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
