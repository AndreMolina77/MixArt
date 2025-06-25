import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePublicDataArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicArticles = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/public/articles/") // Endpoint publico
      if (!response.ok) throw new Error("Error al cargar artículos")
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      setError(error.message)
      toast.error("Error al cargar el catálogo")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPublicArticles()
  }, [])
  return { articles, loading, error, refetch: fetchPublicArticles }
}
export default usePublicDataArticles