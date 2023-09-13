import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import CopyQuestionToClipboard from './copy-to-clipboard';

const supabaseUrl = 'https://kogezxjfuixqqiarnnxo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl,supabaseKey)


export default async function Question({params: {id}}) {

  let { data: Question, error } = await supabase
  .from('Questions')
  .select("*")
  .eq("id",id)
  .single()

  return (
  
   <article className='grid gap-4'>
    
    <Link href="/" > ← Volver atrás</Link>
     <section  className="grid">
    <p className='bg-pink-500 text-white p-4 rounded-t-lg text-xl font-medium'>Questioncy</p>
    <p className='bg-white p-10 text-black rounded-b-lg text-xl'>{Question.text}</p>
  </section>
  <CopyQuestionToClipboard/>
   </article>
  )
}
