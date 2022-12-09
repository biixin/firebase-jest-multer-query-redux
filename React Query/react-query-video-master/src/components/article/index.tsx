import React, { useState } from "react";
import { ArticleType } from "../../types/article";
import ArticleForm from "./form";
import { useMutation, useQueryClient } from "react-query";

import "./styles.scss";

const Article = (article: ArticleType) => {
  const { title, content } = article;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const client = useQueryClient(); // atualizar keys

  const handleClickEdit = () => setIsFormVisible(true);

  const deleteMutation = useMutation(
    (id: string) =>
      fetch(`http://localhost:8081/articles/${id}`, {
        method: "DELETE",
      }),
    {
      onSucess: () => {
        client.invalidateQueries(["articles"]);
        client.invalidateQueries(["articles-total"]);
      },
      onError: () => {
        console.log("ERROR: ");
      },
    }
  );

  const handleClickRemove = () => {
    deleteMutation.mutate(article.id);
  };

  if (deleteMutation?.isLoading) {
    return <p>Apagando Artigo...</p>;
  }

  if (isFormVisible) {
    return <ArticleForm onClose={() => setIsFormVisible(false)} {...article} />;
  }

  return (
    <div className="article">
      <div className="left">
        <strong>{title}</strong>
        <p>{content}</p>
      </div>

      <div className="right">
        <button type="button" onClick={handleClickEdit}>
          Editar
        </button>
        <button type="button" onClick={handleClickRemove}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Article;
