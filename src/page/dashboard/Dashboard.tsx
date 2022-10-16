import { useState, useEffect } from "react";
import { Food } from "../../components/food/Food";
import { Header } from "../../components/header/Header";
import { ModalAddFood } from "../../components/modal-add-food/ModalAddFood";
import { useFood } from "../../hooks/useFoods";
import { Api } from "../../service/Api";
import { FoodsContainer } from "./Style";

export const Dashboard: React.FC = () => {
  const { food, handleDelete, toggleAvailable } = useFood();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(true);
  };

  const onRequestModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={isOpenModal}
        setIsOpen={onRequestModal}
      />

      <FoodsContainer data-testid="foods-list">
        {food.map(food => (
          <Food key={food.id} food={food} handleDelete={handleDelete} toggleAvailable={toggleAvailable} />
        ))}
      </FoodsContainer>
    </>
  );
};