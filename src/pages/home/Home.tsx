import React from "react";

export default function HomePage() {
  return (
    <>
      {/*Tela inicial */}
      <div className="flex flex-col justify-center items-center bg-[url(https://i.imgur.com/pW2jhT9.png)]">

        <div className="relative w-full py-20 md:py-0 md:h-[550px] overflow-hidden">

        {/* Imagem de fundo */}
        <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        >
        <source src="https://i.imgur.com/k9xbWLP.mp4" type="video/mp4" />
        </video>

          {/* Conteúdo */}
          <div className="pt-30 pl-10  text-white">
            <h2 className="text-5xl font-bold drop-shadow-md">
              TRANSFORME-SE
            </h2>

            <p className="mt-3 text-2xl opacity-100 drop-shadow">
              Sua evolução começa aqui.
              Transforme esforço em resultado.
            </p>
          </div>
        </div>

        {/* Comunidade */}
         <section className="py-16 text-center">
           <h3 className="pt-5 text-4xl font-bold mb-8">O que dizem nossos usuários</h3>

        <div className="pt-10 grid text-2xl md:grid-cols-4 gap-6 px-6 md:px-20">
       <div className="bg-amber-500 rounded-2xl shadow p-10">
      <p>“Vivo mais saudável e com mais energia!”</p>
      <span className="block font-bold mt-3">Ana S.</span>
        </div>
       <div className="bg-yellow-300 rounded-2xl shadow p-10">
      <p>“O Up Body mudou a minha rotina! Uso todos os dias!”</p>
      <span className="block font-bold mt-3">Roger P.</span>
        </div>
       <div className="bg-emerald-600 rounded-2xl shadow p-10">
      <p>“Hoje treino mais e gasto menos. Estou feliz e satisfeito.”</p>
      <span className="block font-bold mt-3">Paulo R.</span>
    </div>
    <div className="bg-blue-500 rounded-2xl shadow p-10">
      <p>“Simples, intuitivo e motivador. Abrace essa ideia também!”</p>
      <span className="block font-bold mt-3">Letícia T.</span>
        </div>
         </div>
      
          <p className="p-10 text-[30px] opacity-70 mt-5  mx-auto leading-relaxed">
            A comunidade Up Body cresce todos os dias, com pessoas que acreditam no poder da evolução pessoal!
          </p>
        </section>

      </div>

      {/* COMO FUNCIONA */}
      <div className="w-4/5 mx-auto border-t-4 border-dashed border-red-500 md:pt-2 flex flex-col justify-center items-center">
        <div className="w-4/5 md:my-10 p-5 justify-center">
          <h3 className="text-4xl font-bold mb-8 text-center text-shadow-md"> Como funciona </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">

            {/* CARD 1 */}
            <div className="flex items-center gap-6 rounded-2xl border-4 border-yellow-500 shadow-md ">
              <div className="flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://i.imgur.com/J6KHpTD.png"
                  alt="Download"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl font-bold">Download gratuito</h3>
                <p className="text-[#3d3d3d] text-2xl">Baixe o aplicativo ou acesse o site</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white flex items-center gap-6 rounded-2xl border-4 border-fuchsia-700 shadow-md">
              <div className="bg-[#ffffff] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://i.imgur.com/LBuikzh.png"
                  alt="Planos"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl font-bold ">Planos personalizados</h3>
                <p className="text-[#3d3d3d] text-2xl">Escolha o plano que mais se encaixa com seu objetivo atual</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white flex items-center gap-6 rounded-2xl border-4 border-blue-800 shadow-md">
              <div className="bg-[#ffffff] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://i.imgur.com/4rVue9Q.png"
                  alt="Pagamento"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl font-bold">Pagamento simplificado</h3>
                <p className="text-[#3d3d3d] text-2xl">Selecione o plano de pagamento: mensal, semestral ou anual</p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white flex items-center gap-6 rounded-2xl border-4 border-emerald-700 shadow-md">
              <div className="bg-[#ffffff] flex justify-center items-center rounded-l-2xl">
                <img
                  src="https://i.imgur.com/99lO3Kv.png"
                  alt="Comunidade"
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="justify-center flex flex-col">
                <h3 className="text-2xl font-bold">Junte-se à comunidade Up Body</h3>
                <p className="text-[#3d3d3d] text-2xl">+ de 1000 usuários se exercitando todos os dias</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vantagens */}
        <div className="mb-10 w-full bg-[#3d3d3d] py-30 px-6 text-white mt-16">
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
              <div key={index} className="bg-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.03]">
                <h3 className="text-2xl font-bold mb-2" style={{ color: item.color }}>
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
