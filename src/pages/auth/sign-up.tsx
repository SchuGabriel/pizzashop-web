import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  function handleSignUp(data: SignUpForm) {
    try {
      toast.success("Restaurente cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (err) {
      toast.error("Erro ao logar.");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <Button asChild className="absolute top-8 right-8" variant={"ghost"}>
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="p-8">
        <div className="flex w-[358px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Finalizar cadastro
            </Button>

            <p className="text sm: text-muted-foreground p-6 text-center leading-relaxed">
              Ao continuar, você concorda com nossos{" "}
              <a href="" className="underline underline-offset-4">
                termos de serviço{" "}
              </a>{" "}
              e{" "}
              <a href="" className="underline underline-offset-4">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
