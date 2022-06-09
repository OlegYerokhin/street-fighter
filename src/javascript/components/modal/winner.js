import { showModal } from "./modal";

export function showWinnerModal(fighter) {
  const element = {
    title: `${fighter.name} won!`,
    onClose: () => {
      location.reload();
    }
  }
  
  showModal(element);
}
