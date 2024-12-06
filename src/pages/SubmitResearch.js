import React, { useState } from "react";
import { auth, storage, db } from "../firebase-config"; // Asegúrate de que esté correctamente configurado
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const SubmitResearch = () => {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [conclusions, setConclusions] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]); // Estado para almacenar imágenes seleccionadas
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el usuario está autenticado
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to submit research.");
      return;
    }

    // Validar que todos los campos requeridos estén completos
    if (!title || !area || !description || !pdfFile || images.length < 4 || images.length > 6) {
      alert("Please fill out all required fields and upload between 4 and 6 images.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Subir el archivo PDF a Firebase Storage
      const pdfRef = ref(storage, `research/${pdfFile.name}`);
      const pdfUploadTask = uploadBytesResumable(pdfRef, pdfFile);

      const pdfURL = await new Promise((resolve, reject) => {
        pdfUploadTask.on(
          "state_changed",
          null,
          reject,
          () => getDownloadURL(pdfUploadTask.snapshot.ref).then(resolve)
        );
      });

      // Subir imágenes a Firebase Storage
      const imageURLs = await Promise.all(
        images.map(async (image, index) => {
          const imageRef = ref(storage, `research/images/${Date.now()}_${index}_${image.name}`);
          const imageUploadTask = uploadBytesResumable(imageRef, image);
          return new Promise((resolve, reject) => {
            imageUploadTask.on(
              "state_changed",
              null,
              reject,
              () => getDownloadURL(imageUploadTask.snapshot.ref).then(resolve)
            );
          });
        })
      );

      // Guardar los datos de la investigación en Firestore
      await addDoc(collection(db, "research"), {
        title,
        area,
        description,
        conclusions,
        recommendations,
        pdfURL,
        imageURLs, // URLs de las imágenes subidas
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        timestamp: Timestamp.now(),
      });

      alert("Research submitted successfully!");
      setIsSubmitting(false);

      // Reiniciar los campos del formulario
      setTitle("");
      setArea("");
      setDescription("");
      setConclusions("");
      setRecommendations("");
      setPdfFile(null);
      setImages([]);
    } catch (error) {
      console.error("Error submitting research:", error.message);
      alert("Error submitting research: " + error.message);
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      width: "100%",
    },
    textarea: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      width: "100%",
      minHeight: "100px",
    },
    select: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      width: "100%",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#4285f4",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      textAlign: "center",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#357ae8",
    },
    infoText: {
      fontSize: "14px",
      color: "#666",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Submit Research</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Select Area of Interest</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
          <option value="Social Sciences">Social Sciences</option>
          <option value="Engineering">Engineering</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <textarea
          placeholder="Conclusions"
          value={conclusions}
          onChange={(e) => setConclusions(e.target.value)}
          style={styles.textarea}
        />
        <textarea
          placeholder="Recommendations"
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          required
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          required
          style={styles.input}
        />
        <p style={styles.infoText}>Upload between 4 and 6 images</p>
        <button
          type="submit"
          disabled={isSubmitting}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          {isSubmitting ? "Submitting..." : "Submit Research"}
        </button>
      </form>
    </div>
  );
};

export default SubmitResearch;
