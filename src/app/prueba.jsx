import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Prueba() {
  const supabase = createServerComponentClient({ cookies });

  const { data: Questions } = await supabase.from("questions").select();

  return (
    <ul className="my-auto text-foreground">
      {Questions?.map((question) => (
        <li key={question.id}>{question.text}</li>
      ))}
    </ul>
  );
}