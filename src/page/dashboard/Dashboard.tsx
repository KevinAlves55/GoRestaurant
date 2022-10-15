import { useState, useEffect } from "react";
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Header } from "../../components/header/Header";
import { ModalAddFood } from "../../components/modal-add-food/ModalAddFood";
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
  const [foodProps, setFoodProps] = useState<IFood[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    Api.get("/foods").then(result => {
      setFoodProps(result.data);
    });
  }, [setFoodProps]);

  const toggleModal = () => {
    setIsOpenModal(true);
  };

  const onRequestModal = () => {
    setIsOpenModal(false);
  };

  const handleDelete = async (id: number) => {
    await Api.delete(`/foods/${id}`);

    setFoodProps(oldFoods => [
      ...oldFoods.filter(oldFood => oldFood.id !== id)
    ]);
  };

  const handleEdit = (food: IFood) => {

  };

  const toggleAvailable = async (id: number) => {
    const updatedAvailable = [...foodProps];
    const foodExists = updatedAvailable.find((food) => food.id === id);

    const response = await Api.put(`/foods/${id}`, {
      ...foodExists,
      available: !foodExists?.available,
    });

    const newState = foodProps.map(food => {
      if (food.id === id) {
        return response.data;
      } else {
        return food;
      }
    })

    setFoodProps(newState);
  };

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={isOpenModal}
        setIsOpen={onRequestModal}
      />

      <FoodsContainer data-testid="foods-list">
        {foodProps.map(food => (
          <Container key={food.id} available={food.available}>
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
                <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

                <label htmlFor={`available-switch-${food.id}`} className="switch">
                  <input
                    id={`available-switch-${food.id}`}
                    type="checkbox"
                    checked={food.available}
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