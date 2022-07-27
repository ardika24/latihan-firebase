import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function getData() {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "articles"));

      if (!ignore) return;

      const articleDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      setArticles(articleDocs);

      setLoading(false);
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container className="mt-3">
      <Row className="g-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          articles.map((article) => (
            <Col key={article.id} className="g-3">
              <Card body>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Home;
