import React from "react";

export default function HomePage() {
  return (
    <>
      {/*Tela inicial */}
      <div className="flex flex-col justify-center items-center bg-[url('https://img.freepik.com/fotos-gratis/cimento-velho-grunge_74190-7100.jpg')]">
        <div className="relative w-full py-20 md:py-0 md:h-[550px] overflow-hidden">
          {/* Imagem de fundo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-75"
          >
            <source
              className="grayscale"
              src="https://i.imgur.com/k9xbWLP.mp4"
              type="video/mp4"
            />
          </video>

          {/* Conteúdo */}
          <div className="pt-30 pl-10  text-white">
            <h2 className="text-5xl font-bold drop-shadow-md">TRANSFORME-SE</h2>

            <p className="mt-3 text-2xl opacity-100 drop-shadow">
              Sua evolução começa aqui. Transforme esforço em resultado.
            </p>
          </div>
        </div>

        {/* Comunidade */}
        <section className="py-16 text-center">
          <h3 className="pt-5 text-4xl font-bold mb-8">
            O que dizem nossos usuários
          </h3>

          <div className="pt-10 grid text-2xl md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            <div className="bg-orange-400/50 border-3 flex flex-col justify-between text-slate-800 rounded-2xl p-10">
              <p>“Vivo mais saudável e com mais energia!”</p>
              <span className="block font-bold mt-3">Ana S.</span>
            </div>
            <div className="bg-yellow-300/50 flex flex-col justify-between text-slate-800 border-3 rounded-2xl shadow p-10">
              <p>“O Up Body mudou a minha rotina! Uso todos os dias!”</p>
              <span className="block font-bold mt-3">Roger P.</span>
            </div>
            <div className="bg-green-600/50 flex flex-col justify-between text-slate-800  border-3 rounded-2xl shadow p-10">
              <p>“Hoje treino mais e gasto menos. Estou feliz e satisfeito.”</p>
              <span className="block font-bold mt-3">Paulo R.</span>
            </div>
            <div className="bg-blue-400/30 flex flex-col justify-between rounded-2xl border-3 text-slate-800  p-10">
              <p>“Simples, intuitivo e motivador. Abrace essa ideia também!”</p>
              <span className="block font-bold mt-3">Letícia T.</span>
            </div>
          </div>

          <p className="p-10 text-[30px] opacity-70 mt-5 text-black mx-auto leading-relaxed">
            A comunidade Up Body cresce todos os dias, com pessoas que acreditam
            no poder da evolução pessoal!
          </p>
        </section>
      </div>

      {/* COMO FUNCIONA */}
      <div className="w-full mx-auto  md:pt-2 flex flex-col justify-center items-center bg-[url('https://ik.imagekit.io/Disturbedmoss/O5X8IS0.jpg?updatedAt=1763149658683')]">
        <div className="w-4/5 md:my-10 p-5 justify-center">
          <h3 className="text-4xl font-bold mb-8 text-center text-white text-shadow-md">
            {" "}
            Como funciona{" "}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
            {/* CARD 1 */}
            <div className="flex items-center gap-6 rounded-2xl border-4 border-yellow-500 shadow-md ">
              <div className="flex justify-center md:h-48 lg:w-29 bg-[#ffffff] items-center rounded-l-xl">
                <img
                  src="https://i.imgur.com/J6KHpTD.png"
                  alt="Download"
                  className="w-22 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl font-bold text-white">
                  Download gratuito
                </h3>
                <p className="text-gray-400 text-2xl">
                  Baixe o aplicativo ou acesse o site.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className=" flex items-center gap-6 rounded-2xl border-4 border-fuchsia-700 shadow-md">
              <div className="bg-[#ffffff] flex h-48 w-40 justify-center items-center rounded-l-xl">
                <img
                  src="https://i.imgur.com/LBuikzh.png"
                  alt="Planos"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl text-white font-bold ">
                  Planos personalizados
                </h3>
                <p className="text-gray-400 text-2xl">
                  Escolha o plano que mais se encaixa com seu objetivo atual.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="flex items-center gap-6 rounded-2xl border-4 border-blue-800 shadow-md">
              <div className="bg-[#ffffff] h-48 w-40 md:h-56 md:w-43 flex justify-center items-center rounded-l-xl">
                <img
                  src="https://i.imgur.com/4rVue9Q.png"
                  alt="Pagamento"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl text-white font-bold">
                  Pagamento simplificado
                </h3>
                <p className="text-gray-400 text-2xl">
                  Selecione o plano de pagamento: mensal, semestral ou anual.
                </p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="flex items-center gap-6 rounded-2xl border-4 border-emerald-700 shadow-md">
              <div className="bg-[#ffffff] flex h-56 w-34 justify-center items-center rounded-l-xl">
                <img
                  src="https://i.imgur.com/99lO3Kv.png"
                  alt="Comunidade"
                  className="w-26 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl text-white font-bold">
                  Junte-se à comunidade Up Body
                </h3>
                <p className="text-gray-400 text-2xl">
                  + de 1000 usuários se exercitando todos os dias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vantagens */}
      <div className="w-full bg-radial-[at_87%_75%] from-white to-zinc-500 to-75% py-30 px-6 text-white">
        <h2 className="text-4xl font-bold mb-8 text-center text-shadow-md">
          Vantagens
        </h2>

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] max-w-screen-xl mx-auto">
          {[
            {
              title: "Parcerias",
              desc: "Descubra estúdios, academias e atividades, online ou presencial.",
              color: "#107100",
            },
            {
              title: "Economia e conveniência",
              desc: "Sem taxas adicionais e/ou multa por cancelamento.",
              color: "#0000FD",
            },
            {
              title: "Flexibilidade total",
              desc: "Pause ou mude seu plano quando quiser. Sem burocracia.",
              color: "#57417F",
            },
            {
              title: "Acompanhe seu progresso",
              desc: "Seu histórico de treinos e IMC atual.",
              color: "#B93A6F",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.03]"
            >
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
