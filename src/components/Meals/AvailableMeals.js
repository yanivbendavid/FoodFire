import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const req = await fetch(
        "https://reactdemo-7f6f1-default-rtdb.firebaseio.com/meals.json",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await req.json();
      const list = [];
      for (const key in data) {
        list.push(data[key]);
      }
      setMeals(list);
      setIsLoading(false);
    };
    fetching().catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="lds-hourglass centerLoading"></div>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
