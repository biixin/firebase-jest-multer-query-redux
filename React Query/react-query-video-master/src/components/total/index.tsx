import React from "react";
import "./styles.scss";
import { useQuery } from "react-query";

type Response = { total: number };

const TotalArticles = () => {
  const { isLoading, error, data } = useQuery<Response>("articles-total", () =>
    fetch("http://localhost:8081/articles-total").then((data) => data.json())
  );

  if (isLoading) {
    return "Carregando...";
  }
  if (error) {
    return "Error!";
  }

  return (
    <div className="total">
      <strong>{data?.total}</strong>
      <p>Articles</p>
    </div>
  );
};

export default TotalArticles;
