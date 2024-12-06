import React from "react";
import { db } from "./firebase-config"; // Asegúrate de que esta ruta sea correcta
import { collection, addDoc } from "firebase/firestore";

const SeedData = () => {
  const seedData = async () => {
    const researchCollection = collection(db, "research");

    const data = [
      {
        title: "The Impact of Climate Change",
        area: "Environmental Science",
        description: "An in-depth analysis of how climate change affects biodiversity and ecosystems globally.",
        conclusions: "Urgent action is required to mitigate the adverse effects of climate change.",
        recommendations: "Implement renewable energy sources and reduce greenhouse gas emissions.",
        pdfURL: "https://example.com/research/climate_change.pdf",
        imageURLs: [
          "https://example.com/images/climate1.jpg",
          "https://example.com/images/climate2.jpg"
        ],
        authorId: "user123",
        authorName: "Alice Johnson",
        timestamp: new Date("2023-01-01")
      },
      {
        title: "Advancements in Artificial Intelligence",
        area: "Computer Science",
        description: "This research explores the recent advancements in AI, focusing on natural language processing and machine learning.",
        conclusions: "AI technologies have the potential to revolutionize industries but require ethical considerations.",
        recommendations: "Promote transparency and establish clear guidelines for AI use.",
        pdfURL: "https://example.com/research/ai_advancements.pdf",
        imageURLs: [
          "https://example.com/images/ai1.jpg",
          "https://example.com/images/ai2.jpg"
        ],
        authorId: "user456",
        authorName: "Bob Smith",
        timestamp: new Date("2023-01-02")
      },
      {
        title: "Quantum Computing: The Next Frontier",
        area: "Physics",
        description: "A comprehensive overview of quantum computing and its implications for cryptography and problem-solving.",
        conclusions: "Quantum computing is still in its early stages but shows immense potential.",
        recommendations: "Invest in quantum research and develop educational programs for the technology.",
        pdfURL: "https://example.com/research/quantum_computing.pdf",
        imageURLs: [
          "https://example.com/images/quantum1.jpg",
          "https://example.com/images/quantum2.jpg",
          "https://example.com/images/quantum3.jpg"
        ],
        authorId: "user789",
        authorName: "Charlie Davis",
        timestamp: new Date("2023-01-03")
      }
    ];

    try {
      for (const doc of data) {
        await addDoc(researchCollection, doc);
      }
      alert("Data seeded successfully!");
    } catch (error) {
      console.error("Error seeding data:", error.message);
    }
  };

  return (
    <div>
      <h1>Seed Data to Firestore</h1>
      <button onClick={seedData}>Seed Data</button>
    </div>
  );
};

export default SeedData;
