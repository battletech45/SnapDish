import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_RECIPE_API_KEY
    }
});

{/* 
const [data, setData] = useState(null);

  useEffect(() => {
    instance.get('italian wedding soup').then(
      response => {
        setData(response.data);
        console.log(data);
      }
    ).catch(
      error => {
        console.error('Error fetching data: ', error)
      }
    );
  }, []);
*/}

export default instance;