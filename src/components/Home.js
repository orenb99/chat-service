import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
function Home({ user, loading }) {
  const history = useHistory();
  useEffect(() => {
    if (!loading) {
      if (user) history.push("/profile");
      else history.push("/sign-up");
    }
  }, [loading]);
  return (
    <div className="home-page">
      <h1 className="headline">Loading...</h1>
    </div>
  );
}

export default Home;
