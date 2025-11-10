import React from "react";

export default function HomePage() {
  return (
    <>
      {/*TELA INICIAL */}
      <div className="flex flex-col justify-center items-center bg-[#FAF9F6]">

        <div className="relative w-full py-20 md:py-0 md:h-[550px] overflow-hidden">

          {/* Imagem de fundo */}
          <img
            src="https://i.imgur.com/QX46BaC.png"
            alt="Exemplo"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Conteúdo */}
          <div className="relative z-10 p-10 text-center text-white">
            <h2 className="text-4xl font-bold leading-tight drop-shadow-md">
              TRANSFORME-SE
            </h2>

            <p className="mt-3 text-lg opacity-100 drop-shadow">
              Desbloqueie o seu potencial
            </p>

            <button className="mt-10 px-8 py-3 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full text-white text-lg font-semibold hover:opacity-90 transition-all">
              COMECE HOJE!
            </button>
          </div>
        </div>

        {/* MENU SEI LÁ */}
        <section className="px-12 py-10 text-center text-black">
          <h3 className="text-xl font-semibold mb-6">NOSSOS TREINOS E AULAS</h3>

          <div className="flex justify-center gap-3">
            {[1, 2, 3].map((n) => (
              <img
                key={n}
                src={`/aulas/${n}.png`}
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
              />
            ))}
          </div>

          <p className="text-[22px] opacity-70 mt-5 max-w-lg mx-auto leading-relaxed">
            A comunidade Up Body cresce todos os dias, com pessoas que acreditam no poder da evolução pessoal!
          </p>
        </section>

      </div>

      {/* COMO FUNCIONA */}
      <div className="w-full bg-[#FAF9F6] rounded-t-3xl md:pt-5 flex flex-col justify-center items-center">
        <div className="w-full md:my-10 p-5 justify-center">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-shadow-md">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">

            {/* CARD 1 */}
            <div className="bg-white grid grid-cols-3 rounded-2xl border border-slate-400 shadow-md">
              <div className="bg-[#27292D] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://ik.imagekit.io/Disturbedmoss/City%20driver-rafiki.svg"
                  alt="Treino"
                  className="aspect-auto w-28"
                />
              </div>
              <div className="col-span-2 p-4">
                <h3 className="md:text-xl font-bold">Download gratuito</h3>
                <p className="text-[#3d3d3d]">Baixe o aplicativo ou acesse o site</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white grid grid-cols-3 rounded-2xl border border-slate-400 shadow-md">
              <div className="bg-[#27292D] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://ik.imagekit.io/Disturbedmoss/Navigation-pana%20(1).svg"
                  alt="Passageiros"
                  className="aspect-auto w-28"
                />
              </div>
              <div className="col-span-2 p-4">
                <h3 className="md:text-xl font-bold">Planos personalizados</h3>
                <p className="text-[#3d3d3d]">Escolha o plano que mais se encaixa com seu objetivo atual</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white grid grid-cols-3 rounded-2xl border border-slate-400 shadow-md">
              <div className="bg-[#27292D] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://ik.imagekit.io/Disturbedmoss/Car%20driving-pana.svg"
                  alt="Carros andando"
                  className="aspect-auto w-28"
                />
              </div>
              <div className="col-span-2 p-4">
                <h3 className="md:text-xl font-bold">Pagamento simplificado</h3>
                <p className="text-[#3d3d3d]">Selecione o plano de pagamento: mensal, semestral ou anual</p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white grid grid-cols-3 rounded-2xl border border-slate-400 shadow-md">
              <div className="bg-[#27292D] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://ik.imagekit.io/Disturbedmoss/Globalization-pana.svg"
                  alt="Conexão global"
                  className="aspect-auto w-28"
                />
              </div>
              <div className="col-span-2 p-4">
                <h3 className="md:text-xl font-bold">Junte-se à comunidade UP BODY</h3>
                <p className="text-[#3d3d3d]">+ de 1000 usuários se exercitando todos os dias</p>
              </div>
            </div>
          </div>
        </div>

        {/* POR QUE USAR */}
        <div className="w-full bg-[#6EA87C] py-12 md:px-6 text-white">
            <h2 className="text-4xl font-extrabold mb-12 text-white text-center text-shadow-md">
              Por que usar?
            </h2>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 shadow-xl rounded-2xl transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl">
                <h3 className="text-xl font-bold mb-2 text-[#468A57] truncate">
                  Parcerias
                </h3>
                <p className="text-gray-700">
                  Descubra estúdios, academias e atividades para a sua saúde.
                </p>
              </div>

              <div className="bg-white p-6 shadow-xl rounded-2xl transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl">
                <h3 className="text-xl font-bold mb-2 text-[#468A57]">
                  Economia e conveniência
                </h3>
                <p className="text-gray-700">
                  Sem taxas de adesão ou cancelamento. 
                </p>
              </div>

              <div className="bg-white p-6 shadow-xl rounded-2xl transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl">
                <h3 className="text-xl font-bold mb-2 text-[#468A57] truncate">
                  Flexibilidade total
                </h3>
                <p className="text-gray-700">
                  Pause ou faça um upgrade do seu plano quando quiser.
                </p>
              </div>

              <div className="bg-white p-6 shadow-xl rounded-2xl transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl">
                <h3 className="text-xl font-bold mb-2 text-[#468A57] truncate">
                  Acompanhe seu progresso
                </h3>
                <p className="text-gray-700">
                  Publique ou encontre seu trajeto exatamente quando precisar.
                </p>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
