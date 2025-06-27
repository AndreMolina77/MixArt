import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const usePublicDataArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublicArticles = async () => {
    try {
      console.log('📦 Fetching articles from API...')
      const response = await fetch("http://localhost:4000/api/public/articles") // Endpoint publico
      console.log('📦 Articles response status:', response.status)
      if (!response.ok) throw new Error("Error al cargar artículos")
      const data = await response.json()
      console.log('📦 Articles data received:', data)
      setArticles(data)
    } catch (error) {
      console.error('📦 Articles error:', error)
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