import React, { useEffect } from "react";
import BodyTitle from "./bodyTitle";
import RecipeCards from "./recipeCards";
import { dummyData } from "./dummyData";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../services/firebaseConfig";
import instance from "../../../services/axiosConfig";

const HomeBody = () => {

  let allData = [];

  useEffect(() => {
    const writeData = async() => {
      // I NEYDEN KUCUK OLACAK ??
      for( let i = 10; i < 30; i += 10) {
        instance.get(`recipe?query=soup&offset=${i}`).then(
          response => {
            console.log(response.data);
            allData = allData.concat(response.data);
            console.log('THIS IS THE LENGTH OF ALLDATA: ' + allData.length);
          }
        ).catch(
          error => {
            console.error('Error fetching data: ', error)
          }
        );
        console.log(allData);
      }
      
    }
    writeData();
      {/* 
      try {
        const docRef = await addDoc(collection(firestore, "recipes"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    */}
  }, 
  []);

  return (
    <div className="p-8 flex flex-col gap-12">
      <BodyTitle />
      <div className="grid gap-x-16 gap-y-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
        {dummyData.map((item) => (
          <RecipeCards title={item.title} photoURL={item.photoURL} price={item.price} quantity={item.quantity}/>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
