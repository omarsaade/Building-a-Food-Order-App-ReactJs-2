import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import React, { useState, useEffect } from 'react';
// "https://reactfood-c6f5e-default-rtdb.firebaseio.com/food.json"




const AvailableMeals = () => {
    const [data, setData] = useState([]);




    const fetchMoviesHandler = async () => {

        try {
            const response = await fetch("https://reactfood-c6f5e-default-rtdb.firebaseio.com/food.json");
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            // console.log(data);
            setData(data);



        } catch (error) {
            // setError(error.message);
        }
    }


    useEffect(() => {
        fetchMoviesHandler();
    }, [])



    const mealsList = data.map((meal) =>
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