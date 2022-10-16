import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './Style';
import { Modal } from '../modal/Modal';
import { Input } from '../input/Input';
import { useFood } from '../../hooks/useFoods';

interface food {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

interface IModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const ModalAddFood: React.FC<IModalAddFoodProps> = ({ isOpen, setIsOpen }) => {
  const { createFood } = useFood();
  const formRef = useRef<FormHandles>(null);

  const handleCreateNewFood = async () => {
    const dados = formRef.current?.getData();
    await createFood(dados);
  };

  return (
    <Modal modalStatus={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleCreateNewFood}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};