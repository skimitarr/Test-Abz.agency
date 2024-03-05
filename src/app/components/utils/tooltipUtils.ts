import { MouseEvent} from "react";

export const handleMouseEnter = (event: MouseEvent<HTMLParagraphElement>, text: string) => {
  const containerWidth = event.currentTarget.clientWidth;
  const textWidth = getTextWidth(text, event.currentTarget.style.font || '16px Times New Roman');

  if (textWidth > containerWidth) {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = text;

    // Позиционируем элемент относительно текущего элемента
    const rect = event.currentTarget.getBoundingClientRect();
    tooltipElement.style.position = 'fixed';
    tooltipElement.style.top = `${rect.bottom}px`;
    tooltipElement.style.left = `${rect.left + rect.width / 2 - textWidth / 2}px`;

    // Проверяем, выходит ли элемент за пределы экрана
    const bodyWidth = document.body.clientWidth;
    const tooltipRight = rect.left + rect.width / 2  + textWidth / 2 ;
    if (tooltipRight > bodyWidth) {
      tooltipElement.style.left = `${bodyWidth - textWidth *1.3}px`;
    }

    // Проверяем, выходит ли элемент за пределы экрана слева
    const tooltipLeft = rect.left + rect.width / 2 - textWidth / 2;
    if (tooltipLeft < 0) {
      tooltipElement.style.left = '0';
    }

    document.body.appendChild(tooltipElement);
  }
};

  // Функция для получения ширины текста
  const getTextWidth = (text: string, font: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      const font = '16px Times New Roman';
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
    return 0;
  };

// Удаление всплывающей подсказки при уходе мыши
export const handleMouseLeave = () => {
  const tooltipElement = document.querySelector('.tooltip');
  if (tooltipElement) {
    tooltipElement.remove();
  }
};
