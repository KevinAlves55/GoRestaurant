import { useState, useEffect } from "react";
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Header } from "../../components/header/Header";
import { Api } from "../../service/Api";
import { Container, FoodsContainer } from "./Style";

interface IFood {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export const Dashboard: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [foodProps, setFoodProps] = useState<IFood[]>([]);

  useEffect(() => {
    Api.get("http://localhost:3001/foods").then(result => {
      setFoodProps(result.data);
    });
  }, [setFoodProps]);

  const handleDelete = async (id: number) => {

  };

  const handleEdit = (food: IFood) => {

  };

  const toggleAvailable = async (id: number) => {
    await Api.put(`/foods/${id}`, {
      ...foodProps,
      available: !isAvailable,
    });
  };

  return (
    <>
      <Header openModal={() => console.log("Oi")} />

      <FoodsContainer data-testid="foods-list">
        {foodProps.map(food => (
          <Container key={food.id} available={isAvailable}>
            <header>
              <img src={food.image} alt={food.name} />
            </header>
            <section className="body">
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <p className="price">
                R$ <b>{food.price}</b>
              </p>
            </section>
            <section className="footer">
              <div className="icon-container">
                <button
                  type="button"
                  className="icon"
                  onClick={() => handleEdit(food)}
                  data-testid={`edit-food-${food.id}`}
                >
                  <FiEdit3 size={20} />
                </button>

                <button
                  type="button"
                  className="icon"
                  onClick={() => handleDelete(food.id)}
                  data-testid={`remove-food-${food.id}`}
                >
                  <FiTrash size={20} />
                </button>
              </div>

              <div className="availability-container">
                <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

                <label htmlFor={`available-switch-${food.id}`} className="switch">
                  <input
                    id={`available-switch-${food.id}`}
                    type="checkbox"
                    checked={isAvailable}
                    onChange={() => toggleAvailable(food.id)}
                    data-testid={`change-status-food-${food.id}`}
                  />
                  <span className="slider" />
                </label>
              </div>
            </section>
          </Container>
        ))}
      </FoodsContainer>
    </>
  );
};