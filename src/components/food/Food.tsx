import { Container } from "./Style";
import { FiEdit3, FiTrash } from 'react-icons/fi';

interface food {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface IFoodProps {
  food: {
    id: number,
    name: string,
    description: string,
    price: string,
    available: boolean,
    image: string
  },
  handleDelete: (id: number) => void;
  toggleAvailable: (id: number) => void;
}

export const Food: React.FC<IFoodProps> = ({ food, handleDelete, toggleAvailable }) => {
  return (
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
            onClick={() => console.log("Clicou em Editar")}
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
  );
};