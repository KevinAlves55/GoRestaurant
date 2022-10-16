import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "../service/Api";

interface Food {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface FoodContextData {
  food: Food[];
  createFood: (dados: Omit<Food, "id">) => Promise<void>;
  toggleAvailable: (id: number) => void;
  handleDelete: (id: number) => void;
}

const FoodContext = createContext({} as FoodContextData);

interface IFoodProviderProps {
  children: React.ReactNode;
}

export const FoodProvider: React.FC<IFoodProviderProps> = ({ children }) => {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    Api.get("/foods").then(result => {
      setFood(result.data);
    });
  }, []);

  const createFood = async (dados: Omit<Food, "id">) => {
    const response = await Api.post("/foods", {
      dados
    });

    const { food } = response.data;

    setFood([
      ...food,
      food
    ]);
  };

  const toggleAvailable = async (id: number) => {
    const updatedAvailable = [...food];
    const foodExists = updatedAvailable.find((food) => food.id === id);

    const response = await Api.put(`/foods/${id}`, {
      ...foodExists,
      available: !foodExists?.available,
    });

    const newState = food.map(food => {
      if (food.id === id) {
        return response.data;
      } else {
        return food;
      }
    })

    setFood(newState);
  };

  const handleDelete = async (id: number) => {
    await Api.delete(`/foods/${id}`);

    setFood(oldFoods => [
      ...oldFoods.filter(oldFood => oldFood.id !== id)
    ]);
  };

  return (
    <FoodContext.Provider value={{ food, toggleAvailable, createFood, handleDelete }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  return context;
};