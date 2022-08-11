import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import React, { useEffect, useState } from 'react'








//  "https://reactfooddata-default-rtdb.firebaseio.com/meals.json"




const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();



    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://reactfooddata-default-rtdb.firebaseio.com/meals.json");
            // const response = await fetch("https://reactfooddata-default-rtdb.firebaseio.com/meals.jsonx");

            console.log("here");

            if (!response.ok) {
                //this is a constructor
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json();
            if (responseData === null) {
                throw new Error('Check your URL');
            }
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };



        fetchMeals().catch((error) => {
            // console.log(error);
            setIsLoading(false);
            //error object by default has a message property
            setHttpError(error.message);
        });


    }, [])





    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }




    const mealsList = meals.map((meal) =>
        <MealItem
            id={meal.id} // this is new! 
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );




    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;








// =================================================================
// BEFORE USING HTTP

// import classes from './AvailableMeals.module.css'
// import Card from '../UI/Card';
// import MealItem from './MealItem/MealItem';








// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];




// //  "https://reactfooddata-default-rtdb.firebaseio.com/meals.json"




// const AvailableMeals = () => {




//     const mealsList = DUMMY_MEALS.map((meal) =>
//         <MealItem
//             id={meal.id} // this is new!
//             key={meal.id}
//             name={meal.name}
//             description={meal.description}
//             price={meal.price}
//         />
//     );




//     return <section className={classes.meals}>
//         <Card>
//             <ul>
//                 {mealsList}
//             </ul>
//         </Card>
//     </section>
// }

// export default AvailableMeals;


