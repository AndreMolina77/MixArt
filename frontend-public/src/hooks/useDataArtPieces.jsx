import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePublicDataArtPieces = () => {
  const [artPieces, setartPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicArtPieces = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/public/artpieces/"); // Endpoint publico
      if (!response.ok) throw new Error("Error al cargar piezas de arte");
      const data = await response.json();
      setartPieces(data);
    } catch (error) {
      setError(error.message);
      toast.error("Error al cargar el catálogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicArtPieces();
  }, []);

  return { artPieces, loading, error, refetch: fetchPublicArtPieces };
};

export default usePublicDataArtPieces;