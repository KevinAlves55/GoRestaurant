import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './Style';
import { Modal } from '../modal/Modal';
import { Input } from '../input/Input';

interface IFood {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface IAddFood {
  image: string,
  name: string,
  price: string,
  description: string
}

interface IModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (data: IAddFood) => void;
  editingFood: IFood;
}

export const ModalEditFood: React.FC<IModalEditFoodProps> = ({ setIsOpen, handleUpdateFood, isOpen, editingFood }) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: IAddFood) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
