'use client';


export default function CopyQuestionToClipboard ()  {
async function handleClick(){
    const image=await fetch(`${location.pathname}/opengraph`);
    await navigator.clipboard.writeText(location.href);
}
console.log(location.pathname)
  return (
  <button 
  onClick={handleClick}
  type='button' 
  className='bg-pink-500 text-white 
  rounded-lg p-4 text-jg hover:bg-pink-600 
  transition-colors w-full'>
    Copiar al portapapeles 
    </button>
  );

}