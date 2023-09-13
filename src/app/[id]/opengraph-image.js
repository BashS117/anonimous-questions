import { ImageResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kogezxjfuixqqiarnnxo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)



// Route segment config
export const runtime = 'edge';


export const contentType = 'image/png';




// Image generation
export default async function Image({ params: { id } }) {
  console.log("id", id)
  let { data: Question, error } = await supabase
    .from('Questions')
    .select("*")
    .eq("id", id)
    .single()

  console.log("texto", Question)

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: "column",
        }}
      >
        <div style={{
          backgroundColor: "hotpink",
          color: "white",
          display: 'flex',
          alignItems: "center",
          justifyContent: "center"
        }} >
          <p>Questioncy</p>
        </div>

        <div style={{
          flex:1,
          display: 'flex',
          alignItems: "center",
          justifyContent: "center"
        }}  >
          <p style={{
            paddingLeft: '30px',
            paddingRight: '30px',
            
          }}>          {Question.text}
          </p>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      width: 1200,
      height: 630,
    }
  )
}