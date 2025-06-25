import { useState } from "react";
import { toast } from "react-hot-toast";

const usePublicReviews = (itemId) => {
  const API = `http://localhost:4000/api/public/reviews`; // Endpoint público
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Obtener reseñas existentes
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API}?itemId=${itemId}`);
      if (!response.ok) throw new Error("Error al cargar reseñas");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setError(error.message);
      toast.error("Error al cargar reseñas");
    } finally {
      setLoading(false);
    }
  };

  // Enviar nueva reseña
  const submitReview = async (e) => {
    e.preventDefault();
    
    if (!rating || !comment.trim()) {
      toast.error("Por favor califica y escribe un comentario");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          itemId, // ID del producto/artículo
          itemType: "article" // o "artPiece" según corresponda
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar reseña");
      }

      toast.success("¡Reseña publicada!");
      setRating(0);
      setComment("");
      fetchReviews(); // Actualizar la lista
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      toast.error(error.message || "Error al enviar reseña");
    }
  };

  // Calcular promedio de ratings
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return {
    reviews,
    loading,
    error,
    rating,
    setRating,
    comment,
    setComment,
    submitReview,
    averageRating,
    fetchReviews,
  }
}
export default usePublicReviews