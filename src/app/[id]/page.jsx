import Image from 'next/image'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from 'next/link';


const supabase = createServerComponentClient({ cookies });



export default async function Question({params: {id}}) {


   const  {data:Question}  = await supabase.from("questions").select().eq("id",id).single();


  return (
  
   <article className='grid gap-4'>
    <Link href="/" > ← Volver atrás</Link>
     <section  className="grid">
    <p className='bg-pink-500 text-white p-4 rounded-t-lg text-xl font-medium'>Questioncy</p>
    <p className='bg-white p-10 text-black rounded-b-lg text-xl'>{Question.text}</p>
  </section>
   </article>
  )
}
