import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePublicDataCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/public/categories/"); // Endpoint publico
      if (!response.ok) throw new Error("Error al cargar categorías");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
      toast.error("Error al cargar el catálogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicCategories();
  }, []);

  return { categories, loading, error, refetch: fetchPublicCategories };
};

export default usePublicDataCategories;