import Image from 'next/image'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';





const supabase = createServerComponentClient({ cookies });



export default async function Home() {


  const { data: Questions } = await supabase.from("questions").select();

  async function handleSubmit(formData) {
    'use server'
    // ...
    // console.log("VALO: ", formData.get("question"))
    const question = formData.get("question");
    const id = Date.now().toString();
    await supabase.from("questions").insert({text: question, id});

    revalidatePath("/");
    redirect(`/${id}`);
  
  
  }
  

  
  

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

          <Link  key={question.id} className="grid" href={`/${question.id}`}>
            <p className='bg-pink-500 text-white p-4 rounded-t-lg text-xl font-medium'>Questioncy</p>
            <p className='bg-white p-4 text-black rounded-b-lg text-xl'>{question.text}</p>
          </Link>

        )}
      </article>
    </div>
  )
}
