'use client'

export function ScrollBtn({ id, text }: { id: string, text: string }) {
  const scrollToSection = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className='btn' onClick={() => scrollToSection()}>
      {text}
    </button>
  )
}
