import React, { useEffect, useState } from "react";
import BodyTitle from "./bodyTitle";
import RecipeCards from "./recipeCards";
import { dummyData } from "./dummyData";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../../services/firebaseConfig";

const HomeBody = () => {
  let temp = [];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "recipes"));

        querySnapshot.forEach((doc) => {
          temp = temp.concat(doc.data());
        })
        setData(temp);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(data);
  }, []);
  
  return (
    <div className="p-8 flex flex-col gap-12">
      <BodyTitle />
      <div className="grid gap-x-16 gap-y-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
        {
          data.map((item) => (
            <RecipeCards
              title={item.first}
              photoURL={item.photoURL ?? ''}
              price={item.price}
              quantity={item.quantity}
              />
          ))
        }
      </div>
    </div>
  );
};

export default HomeBody;
