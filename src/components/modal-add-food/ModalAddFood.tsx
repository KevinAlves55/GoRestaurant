import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './Style';
import { Modal } from '../modal/Modal';
import { Input } from '../input/Input';
import { FormHandles } from '@unform/core';

interface AddFood {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: AddFood) => void
}


export const ModalAddFood: React.FC<ModalAddFoodProps> = ({ isOpen, setIsOpen, handleAddFood }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: AddFood) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
}