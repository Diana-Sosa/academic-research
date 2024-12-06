import React, { useEffect, useState } from "react";
import { db } from "../firebase-config"; // Asegúrate de que esta ruta sea correcta
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde Firestore al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "research"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResearchData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching research data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtext: {
      fontSize: "18px",
      color: "#555",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    listItem: {
      background: "#f9f9f9",
      margin: "10px 0",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    researchTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    researchDetails: {
      fontSize: "14px",
      marginBottom: "5px",
    },
    pdfLink: {
      color: "#007bff",
      textDecoration: "none",
    },
    image: {
      width: "100px",
      height: "auto",
      marginRight: "10px",
      borderRadius: "4px",
    },
    imageContainer: {
      display: "flex",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bienvenido a Investigación Académica</h1>
        <p style={styles.subtext}>Explora, investiga y comparte conocimiento.</p>
      </div>

      {loading ? (
        <p>Loading research data...</p>
      ) : (
        <div>
          {researchData.length > 0 ? (
            <ul style={styles.list}>
              {researchData.map((research) => (
                <li key={research.id} style={styles.listItem}>
                  <h2 style={styles.researchTitle}>{research.title}</h2>
                  <p style={styles.researchDetails}>
                    <strong>Area:</strong> {research.area}
                  </p>
                  <p style={styles.researchDetails}>{research.description}</p>
                  <p style={styles.researchDetails}>
                    <strong>Author:</strong> {research.authorName}
                  </p>
                  <a
                    href={research.pdfURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.pdfLink}
                  >
                    View Research PDF
                  </a>
                  {research.imageURLs && research.imageURLs.length > 0 && (
                    <div style={styles.imageContainer}>
                      {research.imageURLs.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Research ${research.title} - Image ${index + 1}`}
                          style={styles.image}
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No research data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
