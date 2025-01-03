import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

import { title } from "@/components/primitives";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center h-[90vh] justify-center gap-4 py-8 md:py-10 md:px-0 px-8">
        <h2
          className={title({
            size: "md",
            className: "font-bold text-center text-white",
          })}
        >
          GitRoast🔥
        </h2>
        <TypeAnimation
          sequence={[
            "What does your GitHub bio really say?",
            1000,
            "Is it a masterpiece or a disaster?",
            2000,
            "Let GitRoast give you the verdict.",
            2000,
            "Your bio, roasted and toasted.",
            2000,
          ]}
          wrapper="span"
          speed={75}
          role="heading"
          className="text-xl text-center text-red-300 font-medium"
        />

        <p className="text-white text-lg md:text-xl text-center max-w-4xl mt-3 mb-5 leading-relaxed">
          GitRoast takes your GitHub bio and turns it into the ultimate roast.
          Drop your username, and we'll turn your bio into a hot, crispy comedy
          roast. Perfect for laughs, some self-reflection, or roasting your
          fellow devs—your GitHub presence will never be the same! 🔥😂
        </p>

        <Button
          size="lg"
          color="danger"
          radius="sm"
          role="button"
          className="font-semibold"
          onClick={() => {
            navigate("/roastme");
          }}
          onTouchStart={() => {
            navigate("/roastme");
          }}
        >
          🔥 Turn Up the Heat!
        </Button>
      </section>
    </DefaultLayout>
  );
}
