import Image from 'next/image'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';







// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://kogezxjfuixqqiarnnxo.supabase.co'
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

// async function getQuestions(){
//   const questions= await supabase.from("questions").select('*')
//   .then(({data})=>console.log("data kjshfdk",data) )
//   ;


//   return questions;
// }

// fetch('https://kogezxjfuixqqiarnnxo.supabase.co/rest/v1/Questions?select=*')
// .then(res=> console.log(res))

// const  QUESTIONS = [
//   {
//     id:1,
//     text: "¿'Que es la pala?"
//   },
//   {
//     id:2,
//     text: "¿'Que es la palanca?"
//   },
//   {
//     id:3,
//     text: "¿'Que es la palanca?"
//   },
//   {
//     id:4,
//     text: "¿'Que es la palanca?"
//   }
// ];



const supabase = createServerComponentClient({ cookies });



export default async function Home() {

  const { data: Questions } = await supabase.from("questions").select();



  

  async function handleSubmit(formData) {
    'use server'
    // ...
    // console.log("VALO: ", formData.get("question"))
    const question = formData.get("question");
    await supabase.from("questions").insert({text: question});
  
  
    revalidatePath("/");
  
  
  }
  
  // const questions= await getQuestions();
  
   
  
  

  return (
    <div className='grid gap-8'>
      <form className='grid gap-4' action={handleSubmit}>
        <section className="grid">
          <p className='bg-pink-500 text-white p-4 rounded-t-lg text-xl font-medium'>Questioncy</p>
          <input name='question' className='bg-white p-4 text-black rounded-b-lg text-xl' placeholder='Me pregunto si...'>{ }</input>
        </section>
        <button type='submit' className='bg-pink-500 text-white rounded-lg p-4 text-jg hover:bg-pink-600 transition-colors w-full'>Enviar pregunta</button>

      </form>

      <hr className='border-b border-pink-500 mt-1 mb-1 opacity-30' />

      <article className='grid  grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 items-start'>
        {Questions?.map((question) =>
          <section key={question.id} className="grid">
            <p className='bg-pink-500 text-white p-4 rounded-t-lg text-xl font-medium'>Questioncy</p>
            <p className='bg-white p-4 text-black rounded-b-lg text-xl'>{question.text}</p>


          </section>
        )}
      </article>
    </div>
  )
}
