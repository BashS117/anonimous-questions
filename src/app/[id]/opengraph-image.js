import { ImageResponse } from 'next/server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


// Route segment config
export const runtime = 'edge' ;

 
export const contentType = 'image/png';

const supabase = createServerComponentClient({ cookies });


 
// Image generation
export default async function Image({params: {id}}) {
      console.log("id",id)
      const  {data:Question}  = await supabase.from("questions").select().eq("id",id).single();

  
   console.log("texto",Question)

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>Questioncy</div>
        <div>question</div>
      </div>
    ),
    // ImageResponse options
    {
         width: 1200,
        height: 630,
    }
  )
}