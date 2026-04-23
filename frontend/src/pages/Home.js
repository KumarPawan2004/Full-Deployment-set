import { useEffect } from "react";

function Home() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return <h1>Welcome to Home Page 🎉</h1>;
}

export default Home;