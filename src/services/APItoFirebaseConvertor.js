/* 
let allData = [];

  const generateRandomPrice = (min, max) => {
    const price = (Math.random() * (max - min) + min).toFixed(2);
    return parseFloat(price); // Convert to floating-point number
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const fetchData = async (offset) => {
      try {
        const response = await instance.get(
          `recipe?query=o&offset=${offset}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; // Rethrow the error to be caught later
      }
    };

    const writeData = async () => {
      try {
        const promises = [];

        for (let i = 10; i <= 100; i += 10) {
          promises.push(fetchData(i));
        }

        const results = await Promise.all(promises);

        // Concatenate results into allData
        allData = allData.concat(...results);

        console.log("ALLDATA: ", allData);

        for (let i = 0; i < allData.length; i++) {
          try {
            const docRef = await addDoc(collection(firestore, "recipes"), {
              first: allData[i]["title"],
              last: allData[i]["ingredients"],
              servings: allData[i]["servings"],
              price: generateRandomPrice(10, 100),
              quantity: getRandomInt(1, 50),
              instructions: allData[i]["instructions"],
            });
            console.log("Document written with ID: ", docRef.id);
            console.log('ITEM COUNT: ' + i);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      } catch (error) {
        console.error("Error in writeData: ", error);
      }
    };

    writeData();
  }, []); // Empty dependency array to run once on mount

*/