import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ArticleDetail() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();

  useEffect(() => {
    let ignore = false;

    async function getData() {
      setLoading(true);

      const docRef = doc(db, "articles", params.id);
      const docSnap = await getDoc(docRef);

      if (ignore) return;
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        setArticle(null);
      }
      setLoading(false);
    }
    getData();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  function jsx_article() {
    if (loading) {
      return <h3>Loading...</h3>;
    }
    if (article === null) {
      return <h3>Artikel tidak ada</h3>;
    }
    return (
      <>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </>
    );
  }
  return <Container className="mt-3">{jsx_article()}</Container>;
}

export default ArticleDetail;
